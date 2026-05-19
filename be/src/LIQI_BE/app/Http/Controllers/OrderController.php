<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
            ]);

            $product->update(['status' => 'reserved']);

            return $order;
        });

        return response()->json([
            'message'  => 'Đặt hàng thành công',
            'order_id' => $order->id,
        ], 201);
    }
}
