<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'name'       => 'required|string|max:100',
            'phone'      => 'required|string|max:20',
            'email'      => 'required|email|max:100',
        ]);

        $product = Product::findOrFail($validated['product_id']);

        if ($product->status !== 'available') {
            return response()->json([
                'message' => 'Sản phẩm này đã được bán hoặc đang được đặt chỗ.',
            ], 409);
        }

        $order = DB::transaction(function () use ($validated, $product) {
            $order = Order::create([
                'user_id'                    => null,
                'product_id'                 => $product->id,
                'snapshot_user_name'         => $validated['name'],
                'snapshot_phone'             => $validated['phone'],
                'snapshot_email'             => $validated['email'],
                'snapshot_img'               => $product->img,
                'snapshot_price'             => $product->price,
                'snapshot_username_account'  => $product->username_account,
                'snapshot_password_account'  => $product->password_account,
                'payment_status'             => 'pending',
                'cancel_token'               => Str::random(64),
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

    public function status(Request $request, string $id)
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
            DB::transaction(function () use ($order) {
                $order->update(['payment_status' => 'cancel']);
                $order->product?->update(['status' => 'available']);
                if ($order->payment) {
                    $order->payment->update(['status' => 'failed']);
                }
            });

            return response()->json([
                'payment_status' => 'cancel',
            ]);
        }

        return response()->json([
            'payment_status' => $order->payment_status,
        ]);
    }
}
