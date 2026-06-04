<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('installment_schedules', function (Blueprint $table) {
            $table->enum('paid_source', ['payos', 'admin_manual'])
                ->nullable()
                ->after('paid_at');
            $table->foreignId('marked_by_user_id')
                ->nullable()
                ->after('paid_source')
                ->constrained('users')
                ->nullOnDelete();
            $table->string('mark_note', 500)->nullable()->after('marked_by_user_id');
        });
    }

    public function down(): void
    {
        Schema::table('installment_schedules', function (Blueprint $table) {
            $table->dropConstrainedForeignId('marked_by_user_id');
            $table->dropColumn(['paid_source', 'mark_note']);
        });
    }
};
