<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InstallmentSchedule extends Model
{
    protected $fillable = [
        'order_id',
        'period',
        'amount',
        'due_date',
        'grace_until',
        'payment_token',
        'status',
        'paid_at',
        'reminder_t3_sent_at',
        'reminder_t2_sent_at',
        'reminder_t1_sent_at',
        'due_sent_at',
        'grace_t1_sent_at',
        'grace_t2_sent_at',
    ];

    protected function casts(): array
    {
        return [
            'amount'              => 'decimal:2',
            'due_date'            => 'date',
            'grace_until'         => 'date',
            'paid_at'             => 'datetime',
            'reminder_t3_sent_at' => 'datetime',
            'reminder_t2_sent_at' => 'datetime',
            'reminder_t1_sent_at' => 'datetime',
            'due_sent_at'         => 'datetime',
            'grace_t1_sent_at'    => 'datetime',
            'grace_t2_sent_at'    => 'datetime',
        ];
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function isPayable(): bool
    {
        if ($this->status === 'paid' || $this->status === 'revoked') {
            return false;
        }

        $order = $this->order;

        if ($order->installment_status !== 'active') {
            return false;
        }

        $today = now()->startOfDay();

        return $today->greaterThanOrEqualTo($this->due_date)
            && $today->lessThanOrEqualTo($this->grace_until);
    }

    public function payUrl(): string
    {
        $frontend = rtrim(env('FRONTEND_URL', 'http://localhost:3000'), '/');

        return "{$frontend}/tra-gop/thanh-toan/{$this->payment_token}";
    }
}
