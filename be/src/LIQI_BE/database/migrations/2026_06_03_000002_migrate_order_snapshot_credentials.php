<?php

use App\Models\Order;
use App\Models\OrderCredential;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Order::query()
            ->where('payment_status', 'done')
            ->whereNotNull('snapshot_password_account')
            ->orderBy('id')
            ->each(function (Order $order) {
                OrderCredential::query()->updateOrCreate(
                    ['order_id' => $order->id],
                    [
                        'username'     => $order->snapshot_username_account ?? '',
                        'password'     => $order->snapshot_password_account,
                        'delivered_at' => $order->updated_at ?? now(),
                    ]
                );
            });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['snapshot_username_account', 'snapshot_password_account']);
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('snapshot_username_account', 100)->nullable();
            $table->string('snapshot_password_account', 100)->nullable();
        });

        OrderCredential::query()
            ->with('order')
            ->orderBy('id')
            ->each(function (OrderCredential $credential) {
                $credential->order?->update([
                    'snapshot_username_account' => $credential->username,
                    'snapshot_password_account' => $credential->password,
                ]);
            });
    }
};
