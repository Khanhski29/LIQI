<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderCredential;
use App\Models\Product;

class OrderCredentialService
{
    public function deliver(Order $order, Product $product): OrderCredential
    {
        $credential = OrderCredential::updateOrCreate(
            ['order_id' => $order->id],
            [
                'username'     => $product->username_account,
                'password'     => $product->password_account,
                'delivered_at' => now(),
            ]
        );

        $product->update([
            'username_account' => '[delivered]',
            'password_account' => '',
        ]);

        return $credential;
    }

    public function purge(Order $order): void
    {
        $order->credential?->delete();
    }
}
