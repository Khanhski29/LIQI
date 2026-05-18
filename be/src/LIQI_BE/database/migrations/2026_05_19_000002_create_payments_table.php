<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();

            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();

            $table->enum('provider', ['payos'])->default('payos');

            $table->decimal('amount', 10, 2);

            $table->text('payment_link')->nullable();

            $table->string('payos_order_code', 100)->unique()->nullable();
            $table->string('transaction_id', 100)->nullable();

            $table->enum('status', ['pending', 'success', 'failed'])->default('pending');

            $table->json('raw_response')->nullable();

            $table->index('order_id');
            $table->index('payos_order_code');
            $table->index('status');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
