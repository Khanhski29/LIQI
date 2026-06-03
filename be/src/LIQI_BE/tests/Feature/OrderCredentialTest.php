<?php

use App\Models\Order;
use App\Models\OrderCredential;
use App\Models\Product;
use App\Models\User;
use App\Services\OrderCancellationService;
use App\Services\OrderCredentialService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

function makeAvailableProduct(array $overrides = []): Product
{
    return Product::create(array_merge([
        'product_code'     => 'TEST' . uniqid(),
        'price'            => 100000,
        'description'      => 'test product',
        'img'              => 'https://example.com/img.png',
        'username_account' => 'gameuser',
        'password_account' => 'secret123',
        'status'           => 'available',
    ], $overrides));
}

test('creating order does not store game credentials', function () {
    $product = makeAvailableProduct();

    $response = $this->postJson('/api/orders', [
        'product_id' => $product->id,
        'name'       => 'Test User',
        'phone'      => '0900000000',
        'email'      => 'buyer@example.com',
    ]);

    $response->assertCreated();
    expect(OrderCredential::count())->toBe(0);

    $order = Order::find($response->json('order_id'));
    expect($order)->not->toBeNull();
    expect($order->payment_status)->toBe('pending');
    expect($order->credential)->toBeNull();
});

test('deliver stores encrypted credentials and clears product secrets', function () {
    $product = makeAvailableProduct();
    $order = Order::create([
        'product_id'         => $product->id,
        'snapshot_user_name' => 'Test User',
        'snapshot_phone'     => '0900000000',
        'snapshot_email'     => 'buyer@example.com',
        'snapshot_img'       => $product->img,
        'snapshot_price'     => $product->price,
        'payment_status'     => 'pending',
        'cancel_token'       => str_repeat('a', 64),
    ]);

    app(OrderCredentialService::class)->deliver($order, $product->fresh());

    $credential = OrderCredential::where('order_id', $order->id)->first();
    expect($credential)->not->toBeNull();
    expect($credential->username)->toBe('gameuser');
    expect($credential->password)->toBe('secret123');

    $rawPassword = DB::table('order_credentials')
        ->where('order_id', $order->id)
        ->value('password');
    expect($rawPassword)->not->toBe('secret123');

    $product->refresh();
    expect($product->username_account)->toBe('[delivered]');
    expect($product->password_account)->toBe('');
});

test('my orders returns credentials for paid orders', function () {
    $user = User::factory()->create();
    $product = makeAvailableProduct();
    $order = Order::create([
        'user_id'            => $user->id,
        'product_id'         => $product->id,
        'snapshot_user_name' => 'Test User',
        'snapshot_phone'     => '0900000000',
        'snapshot_email'     => 'buyer@example.com',
        'snapshot_img'       => $product->img,
        'snapshot_price'     => $product->price,
        'payment_status'     => 'done',
        'cancel_token'       => str_repeat('b', 64),
    ]);

    OrderCredential::create([
        'order_id'     => $order->id,
        'username'     => 'gameuser',
        'password'     => 'secret123',
        'delivered_at' => now(),
    ]);

    Sanctum::actingAs($user);

    $response = $this->getJson('/api/orders/my');

    $response->assertOk();
    expect($response->json('data.0.username_account'))->toBe('gameuser');
    expect($response->json('data.0.password_account'))->toBe('secret123');
});

test('cancel pending order removes credentials if any exist', function () {
    $product = makeAvailableProduct();
    $order = Order::create([
        'product_id'         => $product->id,
        'snapshot_user_name' => 'Test User',
        'snapshot_phone'     => '0900000000',
        'snapshot_email'     => 'buyer@example.com',
        'snapshot_img'       => $product->img,
        'snapshot_price'     => $product->price,
        'payment_status'     => 'pending',
        'cancel_token'       => str_repeat('c', 64),
    ]);

    OrderCredential::create([
        'order_id'     => $order->id,
        'username'     => 'gameuser',
        'password'     => 'secret123',
        'delivered_at' => now(),
    ]);

    app(OrderCancellationService::class)->cancelPendingOrder($order);

    expect(OrderCredential::where('order_id', $order->id)->exists())->toBeFalse();
    expect($order->fresh()->payment_status)->toBe('cancel');
    expect($product->fresh()->status)->toBe('available');
});
