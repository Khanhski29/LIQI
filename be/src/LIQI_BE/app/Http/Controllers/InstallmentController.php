<?php

namespace App\Http\Controllers;

use App\Models\InstallmentSchedule;
use App\Models\Payment;
use App\Services\InstallmentScheduleService;
use Illuminate\Http\Request;
use PayOS\PayOS;

class InstallmentController extends Controller
{
    private PayOS $payOS;

    public function __construct(private InstallmentScheduleService $scheduleService)
    {
        $this->payOS = new PayOS(
            env('PAYOS_CLIENT_ID'),
            env('PAYOS_API_KEY'),
            env('PAYOS_CHECKSUM_KEY'),
        );
    }

    public function show(string $token)
    {
        $schedule = InstallmentSchedule::with('order.product')
            ->where('payment_token', $token)
            ->firstOrFail();

        $order = $schedule->order;

        return response()->json([
            'period'          => $schedule->period,
            'total_periods'   => $order->installment_months,
            'amount'          => (int) $schedule->amount,
            'due_date'        => $schedule->due_date->format('d/m/Y'),
            'grace_until'     => $schedule->grace_until->format('d/m/Y'),
            'status'          => $schedule->status,
            'installment_status' => $order->installment_status,
            'can_pay'         => $schedule->isPayable(),
            'product_code'    => $order->product?->product_code,
            'order_id'        => $order->id,
        ]);
    }

    public function createPayment(string $token)
    {
        $schedule = InstallmentSchedule::with('order')
            ->where('payment_token', $token)
            ->firstOrFail();

        if (! $schedule->isPayable()) {
            return response()->json([
                'message' => 'Kỳ trả góp này chưa đến hạn hoặc không thể thanh toán.',
            ], 422);
        }

        $order = $schedule->order;

        Payment::where('installment_schedule_id', $schedule->id)
            ->where('status', 'pending')
            ->update(['status' => 'failed']);

        $payosOrderCode = (int) (now()->timestamp . str_pad((string) $schedule->id, 3, '0', STR_PAD_LEFT));

        $amount = (int) $schedule->amount;

        $paymentData = [
            'orderCode'   => $payosOrderCode,
            'amount'      => $amount,
            'description' => 'LIQI TG ' . $order->id . 'K' . $schedule->period,
            'returnUrl'   => rtrim(env('FRONTEND_URL', 'http://localhost:3000'), '/')
                . '/tra-gop/thanh-toan/' . $token . '?paid=1',
            'cancelUrl'   => rtrim(env('FRONTEND_URL', 'http://localhost:3000'), '/')
                . '/tra-gop/thanh-toan/' . $token,
            'buyerName'   => $order->snapshot_user_name,
            'buyerEmail'  => $order->snapshot_email,
            'buyerPhone'  => $order->snapshot_phone,
        ];

        $response = $this->payOS->createPaymentLink($paymentData);

        Payment::create([
            'order_id'                => $order->id,
            'installment_schedule_id' => $schedule->id,
            'provider'                => 'payos',
            'amount'                  => $amount,
            'payment_link'            => $response['checkoutUrl'],
            'payos_order_code'        => (string) $payosOrderCode,
            'status'                  => 'pending',
        ]);

        return response()->json([
            'qr_code'        => $response['qrCode'],
            'amount'         => $response['amount'],
            'description'    => $response['description'],
            'account_number' => $response['accountNumber'],
            'account_name'   => $response['accountName'],
            'bin'            => $response['bin'],
            'period'         => $schedule->period,
        ]);
    }

    public function status(string $token)
    {
        $schedule = InstallmentSchedule::where('payment_token', $token)->firstOrFail();

        return response()->json([
            'status'               => $schedule->status,
            'installment_status'   => $schedule->order->installment_status,
            'paid_at'              => $schedule->paid_at?->format('Y-m-d H:i:s'),
        ]);
    }

    public function markPaid(Request $request, int $id)
    {
        $schedule = InstallmentSchedule::with('order')->findOrFail($id);

        if ($schedule->status === 'paid') {
            return response()->json(['message' => 'Kỳ này đã được thanh toán.'], 409);
        }

        if ($schedule->status === 'revoked') {
            return response()->json(['message' => 'Kỳ này đã bị thu hồi.'], 409);
        }

        $this->scheduleService->markPeriodPaid($schedule);

        return response()->json(['message' => 'Đã ghi nhận thanh toán kỳ ' . $schedule->period]);
    }

    public function revokeOrder(Request $request, int $orderId)
    {
        $order = \App\Models\Order::with('product')->findOrFail($orderId);

        if ($order->payment_type !== 'installment' || $order->installment_status !== 'active') {
            return response()->json(['message' => 'Đơn hàng không thể thu hồi.'], 422);
        }

        $this->scheduleService->revokeOrder($order);

        return response()->json(['message' => 'Đã xác nhận back acc.']);
    }
}
