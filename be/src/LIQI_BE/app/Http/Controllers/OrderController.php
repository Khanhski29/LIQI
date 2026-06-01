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
                'snapshot_username_account'    => $product->username_account,
                'snapshot_password_account'    => $product->password_account,
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
        $status = $request->query('status');
        $perPage = 15;

        $query = Order::with('product')
            ->orderBy('created_at', 'desc');

        if ($status) {
            $query->where('payment_status', $status);
        }

        $orders = $query->paginate($perPage);

        $data = $orders->map(function ($order) {
            return [
                'id'             => $order->id,
                'product_code'   => $order->product?->product_code,
                'snapshot_img'   => $order->snapshot_img,
                'snapshot_price' => $order->snapshot_price,
                'payment_status' => $order->payment_status,
                'user_name'      => $order->snapshot_user_name,
                'user_phone'     => $order->snapshot_phone,
                'user_email'     => $order->snapshot_email,
                'created_at'     => $order->created_at?->format('Y-m-d H:i:s'),
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

        $orders = Order::where('user_id', $request->user()->id)
            ->where('payment_status', 'done')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        $data = $orders->map(function ($order) {
            $isDone = $order->payment_status === 'done';

            return [
                'id'              => $order->id,
                'snapshot_img'    => $order->snapshot_img,
                'snapshot_price'  => $order->snapshot_price,
                'payment_status'  => $order->payment_status,
                'created_at'      => $order->created_at?->format('Y-m-d H:i:s'),
                'username_account' => $isDone ? $order->snapshot_username_account : null,
                'password_account' => $isDone ? $order->snapshot_password_account : null,
            ];
        });

        return response()->json([
            'data'         => $data,
            'current_page' => $orders->currentPage(),
            'last_page'    => $orders->lastPage(),
            'total'        => $orders->total(),
        ]);
    }
}
