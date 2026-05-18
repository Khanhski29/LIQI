<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'provider',
        'amount',
        'payment_link',
        'payos_order_code',
        'transaction_id',
        'status',
        'raw_response',
    ];

    protected function casts(): array
    {
        return [
            'amount'       => 'decimal:2',
            'raw_response' => 'array',
        ];
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
