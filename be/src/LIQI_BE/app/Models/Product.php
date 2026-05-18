<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_code',
        'price',
        'description',
        'img',
        'username_account',
        'password_account',
        'status',
    ];

    protected $hidden = [
        'username_account',
        'password_account',
    ];

    protected $table = 'products';


    public function setPasswordAccountAttribute($value)
    {
        $this->attributes['password_account'] =
            Crypt::encryptString($value);
    }

    public function getPasswordAccountAttribute($value)
    {
        try {
            return Crypt::decryptString($value);
        } catch (\Exception $e) {
            return $value;
        }
    }

}
