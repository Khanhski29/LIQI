<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use PayOS\PayOS;

class PaymentController extends Controller
{
    private PayOS $payOS;

    public function __construct()
    {
        $this->payOS = new PayOS(
            env('PAYOS_CLIENT_ID'),
            env('PAYOS_API_KEY'),
            env('PAYOS_CHECKSUM_KEY'),
        );
    }

    public function create(Request $request)
    {
        $request->validate([
            'order_id' => 'required|integer|exists:orders,id',
        ]);

        $order = Order::findOrFail($request->order_id);

        if ($order->payment_status !== 'pending') {
            return response()->json(['message' => 'Đơn hàng này đã được xử lý.'], 409);
        }

        // Mã đơn PayOS phải là số nguyên dương
        $payosOrderCode = time();

        $paymentData = [
            'orderCode'   => $payosOrderCode,
            'amount'      => (int) $order->snapshot_price,
            'description' => 'LIQI ' . $order->id,
            'returnUrl'   => env('PAYOS_RETURN_URL') . '/' . $order->id,
            'cancelUrl'   => env('PAYOS_CANCEL_URL') . '/' . $order->id,
            'buyerName'   => $order->snapshot_user_name,
            'buyerEmail'  => $order->snapshot_email,
            'buyerPhone'  => $order->snapshot_phone,
        ];

        $response = $this->payOS->createPaymentLink($paymentData);

        Payment::create([
            'order_id'         => $order->id,
            'provider'         => 'payos',
            'amount'           => $order->snapshot_price,
            'payment_link'     => $response['checkoutUrl'],
            'payos_order_code' => (string) $payosOrderCode,
            'status'           => 'pending',
        ]);

        return response()->json([
            'payment_url'    => $response['checkoutUrl'],
            'qr_code'        => $response['qrCode'],
            'order_code'     => $response['orderCode'],
            'amount'         => $response['amount'],
            'description'    => $response['description'],
            'account_number' => $response['accountNumber'],
            'account_name'   => $response['accountName'],
            'bin'            => $response['bin'],
            'order_id'       => $order->id,
        ]);
    }

    public function webhook(Request $request)
    {
        $body = $request->all();

        // PayOS Dashboard gửi payload test với orderCode = 123
        if (isset($body['data']['orderCode']) && $body['data']['orderCode'] === 123) {
            return response()->json(['message' => 'ok']);
        }

        try {
            $data = $this->payOS->verifyPaymentWebhookData($body);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Invalid signature'], 400);
        }

        $orderCode = $data['orderCode'] ?? null;
        $status    = $data['code'] ?? null;  // '00' = thành công

        $payment = Payment::where('payos_order_code', (string) $orderCode)->first();

        if (! $payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        if ($status === '00') {
            $payment->update([
                'status'         => 'success',
                'transaction_id' => $data['transactionDateTime'] ?? null,
                'raw_response'   => $data,
            ]);

            $payment->order->update(['payment_status' => 'done']);
            $payment->order->product->update(['status' => 'sold']);
        } else {
            $payment->update([
                'status'       => 'failed',
                'raw_response' => $data,
            ]);

            $payment->order->update(['payment_status' => 'cancel']);
            $payment->order->product->update(['status' => 'available']);
        }

        return response()->json(['message' => 'ok']);
    }

    public function cancel(Request $request)
    {
        $request->validate([
            'order_id' => 'required|integer|exists:orders,id',
        ]);

        $order = Order::with('payment', 'product')->findOrFail($request->order_id);

        if ($order->payment_status === 'pending') {
            $order->update(['payment_status' => 'cancel']);
            $order->product->update(['status' => 'available']);

            if ($order->payment) {
                $order->payment->update(['status' => 'failed']);
            }
        }

        return response()->json(['message' => 'Đã hủy đơn hàng.']);
    }
}
