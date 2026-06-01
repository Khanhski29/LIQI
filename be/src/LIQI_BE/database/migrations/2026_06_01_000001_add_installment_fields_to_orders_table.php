<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->enum('payment_type', ['full', 'installment'])->default('full')->after('snapshot_price');
            $table->decimal('pay_amount', 10, 2)->nullable()->after('payment_type');
            $table->unsignedTinyInteger('installment_months')->nullable()->after('pay_amount');
            $table->unsignedTinyInteger('installment_down_payment_pct')->nullable()->after('installment_months');
            $table->decimal('installment_monthly', 10, 2)->nullable()->after('installment_down_payment_pct');
            $table->decimal('installment_total', 10, 2)->nullable()->after('installment_monthly');
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn([
                'payment_type',
                'pay_amount',
                'installment_months',
                'installment_down_payment_pct',
                'installment_monthly',
                'installment_total',
            ]);
        });
    }
};
