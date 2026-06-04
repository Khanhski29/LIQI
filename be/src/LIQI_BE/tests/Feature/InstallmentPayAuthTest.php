<?php

use App\Models\InstallmentSchedule;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Services\InstallmentPayAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

function makeInstallmentSchedule(array $orderOverrides = []): InstallmentSchedule
{
    $product = Product::create([
        'product_code'     => 'TG' . uniqid(),
        'price'            => 1000000,
        'description'      => 'test',
        'img'              => 'https://example.com/img.png',
        'username_account' => 'user',
        'password_account' => 'pass',
        'status'           => 'sold',
    ]);

    $order = Order::create(array_merge([
        'product_id'             => $product->id,
        'snapshot_user_name'     => 'Buyer',
        'snapshot_phone'         => '0900000000',
        'snapshot_email'         => 'buyer@example.com',
        'snapshot_img'           => $product->img,
        'snapshot_price'         => $product->price,
        'payment_type'           => 'installment',
        'payment_status'         => 'done',
        'installment_months'     => 3,
        'installment_monthly'    => 300000,
        'installment_status'     => 'active',
        'cancel_token'           => str_repeat('a', 64),
    ], $orderOverrides));

    return InstallmentSchedule::create([
        'order_id'      => $order->id,
        'period'        => 1,
        'amount'        => 300000,
        'due_date'      => now()->toDateString(),
        'grace_until'   => now()->addDays(2)->toDateString(),
        'payment_token' => str_repeat('b', 64),
        'status'        => 'pending',
    ]);
}

test('installment pay rejects token-only access', function () {
    $schedule = makeInstallmentSchedule();
    $token    = $schedule->payment_token;

    $this->getJson("/api/installments/pay/{$token}")
        ->assertForbidden();
});

test('installment pay accepts valid email key', function () {
    $schedule = makeInstallmentSchedule();
    $token    = $schedule->payment_token;
    $key      = InstallmentPayAuth::emailKey($token, 'buyer@example.com');

    $this->getJson("/api/installments/pay/{$token}?key=".urlencode($key))
        ->assertOk()
        ->assertJsonPath('period', 1);
});

test('installment pay accepts matching email', function () {
    $schedule = makeInstallmentSchedule();
    $token    = $schedule->payment_token;

    $this->getJson("/api/installments/pay/{$token}?email=".urlencode('buyer@example.com'))
        ->assertOk();
});

test('installment pay accepts order owner via bearer token', function () {
    $user = User::factory()->create(['email' => 'owner@example.com']);
    $schedule = makeInstallmentSchedule([
        'user_id'        => $user->id,
        'snapshot_email' => 'owner@example.com',
    ]);
    $token = $schedule->payment_token;
    $plainToken = $user->createToken('test')->plainTextToken;

    $this->withToken($plainToken)
        ->getJson("/api/installments/pay/{$token}")
        ->assertOk();
});

test('installment pay rejects wrong email key', function () {
    $schedule = makeInstallmentSchedule();
    $token    = $schedule->payment_token;

    $this->getJson("/api/installments/pay/{$token}?key=invalid")
        ->assertForbidden();
});

test('pay url includes email key', function () {
    $schedule = makeInstallmentSchedule();
    $url      = $schedule->payUrl();

    expect($url)->toContain('?key=');
    expect($url)->toContain($schedule->payment_token);

    parse_str(parse_url($url, PHP_URL_QUERY), $query);
    expect(InstallmentPayAuth::verifyKey(
        $schedule->payment_token,
        'buyer@example.com',
        $query['key'] ?? '',
    ))->toBeTrue();
});
