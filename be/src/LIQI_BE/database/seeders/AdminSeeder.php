<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@liqi.vn'],
            [
                'name'     => 'admin',
                'phone'    => null,
                'password' => Hash::make('Kkhanh29.'),
                'role'     => 'admin',
                'status'   => 'active',
            ]
        );
    }
}
