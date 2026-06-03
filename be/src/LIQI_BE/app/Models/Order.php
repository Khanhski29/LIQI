<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
        'snapshot_user_name',
        'snapshot_phone',
        'snapshot_email',
        'snapshot_img',
        'snapshot_price',
        'payment_type',
        'pay_amount',
        'installment_months',
        'installment_down_payment_pct',
        'installment_monthly',
        'installment_total',
        'installment_status',
        'installment_anchor_day',
        'installment_started_at',
        'payment_status',
        'cancel_token',
    ];

    protected function casts(): array
    {
        return [
            'snapshot_price'      => 'decimal:2',
            'pay_amount'          => 'decimal:2',
            'installment_monthly' => 'decimal:2',
            'installment_total'   => 'decimal:2',
            'installment_started_at' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class)->whereNull('installment_schedule_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function installmentSchedules()
    {
        return $this->hasMany(InstallmentSchedule::class)->orderBy('period');
    }

    public function credential()
    {
        return $this->hasOne(OrderCredential::class);
    }
}
