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
        'snapshot_username_account',
        'snapshot_password_account',
        'payment_status',
    ];

    protected function casts(): array
    {
        return [
            'snapshot_price' => 'decimal:2',
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
        return $this->hasOne(Payment::class);
    }
}
