<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Services\InstallmentService;
use App\Services\OrderCancellationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Sanctum\PersonalAccessToken;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id'                   => 'required|integer|exists:products,id',
            'name'                         => 'required|string|max:100',
            'phone'                        => 'required|string|max:20',
            'email'                        => 'required|email|max:100',
            'payment_type'                 => 'nullable|in:full,installment',
            'installment_months'           => 'required_if:payment_type,installment|integer|in:1,3,6,9,12',
            'installment_down_payment_pct' => 'required_if:payment_type,installment|integer|in:30,50,70',
        ]);

        $paymentType = $validated['payment_type'] ?? 'full';

        $product = Product::findOrFail($validated['product_id']);

        if ($product->status !== 'available') {
            return response()->json([
                'message' => 'Sản phẩm này đã được bán hoặc đang được đặt chỗ.',
            ], 409);
        }

        // Detect user từ Bearer token nếu có (route là public nhưng hỗ trợ optional auth)
        $userId = null;
        if ($bearerToken = $request->bearerToken()) {
            $pat = PersonalAccessToken::findToken($bearerToken);
            if ($pat && $pat->tokenable_type === \App\Models\User::class) {
                $userId = $pat->tokenable_id;
            }
        }

        $order = DB::transaction(function () use ($validated, $product, $userId, $paymentType) {
            $payAmount          = $product->price;
            $installmentMonths  = null;
            $installmentPct     = null;
            $installmentMonthly = null;
            $installmentTotal   = null;

            if ($paymentType === 'installment') {
                $installment = InstallmentService::calc(
                    $product->price,
                    $validated['installment_months'],
                    $validated['installment_down_payment_pct']
                );

                $payAmount          = $installment['upfront'];
                $installmentMonths  = $validated['installment_months'];
                $installmentPct     = $validated['installment_down_payment_pct'];
                $installmentMonthly = $installment['monthly'];
                $installmentTotal   = $installment['total'];
            }

            $order = Order::create([
                'user_id'                      => $userId,
                'product_id'                   => $product->id,
                'snapshot_user_name'           => $validated['name'],
                'snapshot_phone'               => $validated['phone'],
                'snapshot_email'               => $validated['email'],
                'snapshot_img'                 => $product->img,
                'snapshot_price'               => $product->price,
                'payment_type'                 => $paymentType,
                'pay_amount'                   => $payAmount,
                'installment_months'           => $installmentMonths,
                'installment_down_payment_pct' => $installmentPct,
                'installment_monthly'          => $installmentMonthly,
                'installment_total'            => $installmentTotal,
                'payment_status'               => 'pending',
                'cancel_token'                 => Str::random(64),
            ]);

            $product->update(['status' => 'reserved']);

            return $order;
        });

        return response()->json([
            'message'      => 'Đặt hàng thành công',
            'order_id'     => $order->id,
            'cancel_token' => $order->cancel_token,
        ], 201);
    }

    public function index(Request $request)
    {
        $status      = $request->query('status');
        $paymentType = $request->query('payment_type');
        $installmentStatus = $request->query('installment_status');
        $perPage = 15;

        $query = Order::with(['product', 'installmentSchedules'])
            ->orderBy('created_at', 'desc');

        if ($status) {
            $query->where('payment_status', $status);
        }

        if ($paymentType) {
            $query->where('payment_type', $paymentType);
        }

        if ($installmentStatus) {
            $query->where('installment_status', $installmentStatus);
        }

        $orders = $query->paginate($perPage);

        $data = $orders->map(function ($order) {
            $paidPeriods = $order->installmentSchedules
                ->where('status', 'paid')
                ->count();

            $nextSchedule = $order->installmentSchedules
                ->whereIn('status', ['pending', 'overdue'])
                ->sortBy('period')
                ->first();

            return [
                'id'                         => $order->id,
                'product_code'               => $order->product?->product_code,
                'snapshot_img'               => $order->snapshot_img,
                'snapshot_price'             => $order->snapshot_price,
                'payment_status'             => $order->payment_status,
                'payment_type'               => $order->payment_type,
                'installment_status'         => $order->installment_status,
                'installment_months'         => $order->installment_months,
                'installment_down_payment_pct' => $order->installment_down_payment_pct,
                'installment_monthly'        => $order->installment_monthly,
                'installment_paid_periods'   => $paidPeriods,
                'installment_next_due'       => $nextSchedule?->due_date?->format('Y-m-d'),
                'installment_next_amount'    => $nextSchedule?->amount,
                'installment_next_status'    => $nextSchedule?->status,
                'user_name'                  => $order->snapshot_user_name,
                'user_phone'                 => $order->snapshot_phone,
                'user_email'                 => $order->snapshot_email,
                'created_at'                 => $order->created_at?->format('Y-m-d H:i:s'),
            ];
        });

        return response()->json([
            'data'         => $data,
            'current_page' => $orders->currentPage(),
            'last_page'    => $orders->lastPage(),
            'total'        => $orders->total(),
        ]);
    }

    public function status(Request $request, string $id, OrderCancellationService $cancellationService)
    {
        $order = Order::with('payment', 'product')->findOrFail($id);

        if ($order->cancel_token !== $request->query('cancel_token')) {
            return response()->json(['message' => 'Không có quyền thực hiện thao tác này.'], 403);
        }

        // Tự hủy nếu đơn pending quá 5 phút
        if (
            $order->payment_status === 'pending' &&
            $order->created_at->diffInMinutes(now()) >= 5
        ) {
            $cancellationService->cancelPendingOrder($order, 'Hết hạn thanh toán');

            return response()->json([
                'payment_status' => 'cancel',
            ]);
        }

        return response()->json([
            'payment_status' => $order->payment_status,
        ]);
    }

    public function myOrders(Request $request)
    {
        $perPage = 10;
        $userId  = $request->user()->id;

        $orders = Order::with(['product', 'credential', 'installmentSchedules'])
            ->where('user_id', $userId)
            ->where('payment_status', 'done')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        $installmentOrders = Order::with(['product', 'credential', 'installmentSchedules'])
            ->where('user_id', $userId)
            ->where('payment_status', 'done')
            ->where('payment_type', 'installment')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn ($order) => $this->mapMyOrder($order));

        $data = $orders->map(fn ($order) => $this->mapMyOrder($order));

        return response()->json([
            'data'               => $data,
            'installment_orders' => $installmentOrders,
            'current_page'       => $orders->currentPage(),
            'last_page'          => $orders->lastPage(),
            'total'              => $orders->total(),
        ]);
    }

    private function mapMyOrder(Order $order): array
    {
        $isDone = $order->payment_status === 'done';

        $paidPeriods = $order->installmentSchedules
            ->where('status', 'paid')
            ->count();

        $nextSchedule = $order->installmentSchedules
            ->whereIn('status', ['pending', 'overdue'])
            ->sortBy('period')
            ->first();

        $payload = [
            'id'               => $order->id,
            'product_code'     => $order->product?->product_code,
            'snapshot_img'     => $order->snapshot_img,
            'snapshot_price'   => $order->snapshot_price,
            'payment_status'   => $order->payment_status,
            'payment_type'     => $order->payment_type,
            'created_at'       => $order->created_at?->format('Y-m-d H:i:s'),
            'username_account' => $isDone ? $order->credential?->username : null,
            'password_account' => $isDone ? $order->credential?->password : null,
        ];

        if ($order->payment_type === 'installment') {
            $payload['installment'] = [
                'status'           => $order->installment_status,
                'months'           => $order->installment_months,
                'down_payment_pct' => $order->installment_down_payment_pct,
                'monthly'          => $order->installment_monthly,
                'paid_periods'     => $paidPeriods,
                'next_period'      => $nextSchedule ? [
                    'period'          => $nextSchedule->period,
                    'amount'          => $nextSchedule->amount,
                    'due_date'        => $nextSchedule->due_date->format('d/m/Y'),
                    'grace_until'     => $nextSchedule->grace_until->format('d/m/Y'),
                    'schedule_status' => $nextSchedule->status,
                    'payment_token'   => $nextSchedule->payment_token,
                    'can_pay'         => $nextSchedule->isPayable(),
                ] : null,
            ];
        }

        return $payload;
    }
}
