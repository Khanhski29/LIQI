<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        if (! app()->environment('local')) {
            return;
        }

        $email = env('ADMIN_EMAIL');
        $password = env('ADMIN_PASSWORD');

        if (blank($email) || blank($password)) {
            $this->command?->warn('ADMIN_EMAIL và ADMIN_PASSWORD phải được cấu hình trong .env — bỏ qua AdminSeeder.');

            return;
        }

        User::firstOrCreate(
            ['email' => $email],
            [
                'name'     => 'admin',
                'phone'    => null,
                'password' => Hash::make($password),
                'role'     => 'admin',
                'status'   => 'active',
            ]
        );
    }
}
