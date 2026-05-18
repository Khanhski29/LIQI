<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();

            // Snapshot thông tin user tại thời điểm đặt hàng
            $table->string('snapshot_user_name', 100)->nullable();
            $table->string('snapshot_phone', 20)->nullable();
            $table->string('snapshot_email', 100)->nullable();

            // Snapshot thông tin sản phẩm tại thời điểm đặt hàng
            $table->string('snapshot_img')->nullable();
            $table->decimal('snapshot_price', 10, 2)->nullable();
            $table->string('snapshot_username_account', 100)->nullable();
            $table->string('snapshot_password_account', 100)->nullable();

            $table->enum('payment_status', ['pending', 'done', 'cancel'])->default('pending');

            $table->index('user_id');
            $table->index('product_id');
            $table->index('payment_status');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
