<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->enum('installment_status', ['active', 'completed', 'defaulted'])
                ->nullable()
                ->after('installment_total');
            $table->unsignedTinyInteger('installment_anchor_day')->nullable()->after('installment_status');
            $table->timestamp('installment_started_at')->nullable()->after('installment_anchor_day');
        });

        Schema::create('installment_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
            $table->unsignedTinyInteger('period');
            $table->decimal('amount', 10, 2);
            $table->date('due_date');
            $table->date('grace_until');
            $table->string('payment_token', 64)->unique();
            $table->enum('status', ['pending', 'paid', 'overdue', 'revoked'])->default('pending');
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('reminder_t3_sent_at')->nullable();
            $table->timestamp('reminder_t2_sent_at')->nullable();
            $table->timestamp('reminder_t1_sent_at')->nullable();
            $table->timestamp('due_sent_at')->nullable();
            $table->timestamp('grace_t1_sent_at')->nullable();
            $table->timestamp('grace_t2_sent_at')->nullable();
            $table->timestamps();

            $table->unique(['order_id', 'period']);
            $table->index(['status', 'due_date']);
        });

        Schema::table('payments', function (Blueprint $table) {
            $table->foreignId('installment_schedule_id')
                ->nullable()
                ->after('order_id')
                ->constrained('installment_schedules')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->dropConstrainedForeignId('installment_schedule_id');
        });

        Schema::dropIfExists('installment_schedules');

        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn([
                'installment_status',
                'installment_anchor_day',
                'installment_started_at',
            ]);
        });
    }
};
