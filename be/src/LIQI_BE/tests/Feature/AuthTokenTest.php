<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('login revokes previous bearer tokens', function () {
    $user = User::factory()->create([
        'email'    => 'user@example.com',
        'password' => 'password123',
        'role'     => 'user',
        'status'   => 'active',
    ]);

    $first = $this->postJson('/api/auth/login', [
        'email'    => 'user@example.com',
        'password' => 'password123',
    ])->assertOk()->json('token');

    $second = $this->postJson('/api/auth/login', [
        'email'    => 'user@example.com',
        'password' => 'password123',
    ])->assertOk()->json('token');

    $this->withToken($first)->getJson('/api/auth/me')->assertStatus(401);
    $this->withToken($second)->getJson('/api/auth/me')->assertOk();
});

test('expired sanctum token is rejected', function () {
    config(['sanctum.expiration' => 1]);

    $user = User::factory()->create([
        'email'    => 'user@example.com',
        'password' => 'password123',
        'role'     => 'user',
        'status'   => 'active',
    ]);

    $token = $this->postJson('/api/auth/login', [
        'email'    => 'user@example.com',
        'password' => 'password123',
    ])->assertOk()->json('token');

    $this->travel(2)->minutes();

    $this->withToken($token)->getJson('/api/auth/me')->assertStatus(401);
});

test('change password revokes old token and returns a new one', function () {
    $user = User::factory()->create([
        'email'    => 'user@example.com',
        'password' => 'oldpass123',
        'role'     => 'user',
        'status'   => 'active',
    ]);

    $oldToken = $user->createToken('auth_token')->plainTextToken;

    $response = $this->withToken($oldToken)->postJson('/api/auth/change-password', [
        'current_password' => 'oldpass123',
        'new_password'     => 'newpass123',
    ]);

    $response->assertOk()->assertJsonStructure(['token']);
    $newToken = $response->json('token');

    $this->app['auth']->forgetGuards();

    $this->withToken($oldToken)->getJson('/api/auth/me')->assertStatus(401);
    $this->withToken($newToken)->getJson('/api/auth/me')->assertOk();
});
