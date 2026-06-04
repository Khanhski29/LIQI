<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('login is rate limited after five attempts per minute', function () {
    User::factory()->create([
        'email'    => 'user@example.com',
        'password' => 'password123',
        'role'     => 'user',
        'status'   => 'active',
    ]);

    for ($i = 0; $i < 5; $i++) {
        $this->postJson('/api/auth/login', [
            'email'    => 'user@example.com',
            'password' => 'wrong-password',
        ])->assertStatus(422);
    }

    $this->postJson('/api/auth/login', [
        'email'    => 'user@example.com',
        'password' => 'wrong-password',
    ])->assertStatus(429);
});

test('register is rate limited after five attempts per minute', function () {
    for ($i = 0; $i < 5; $i++) {
        $this->postJson('/api/auth/register', [
            'name'     => 'User '.$i,
            'email'    => 'user'.$i.'@example.com',
            'password' => 'password123',
        ])->assertCreated();
    }

    $this->postJson('/api/auth/register', [
        'name'     => 'Blocked User',
        'email'    => 'blocked@example.com',
        'password' => 'password123',
    ])->assertStatus(429);
});
