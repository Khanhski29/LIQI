<?php

use App\Models\InstallmentSchedule;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Services\InstallmentScheduleService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

function makeInstallmentOrderWithSchedule(): array
{
    $product = Product::create([
        'product_code'     => 'TG' . uniqid(),
        'price'            => 1000000,
        'description'      => 'test',
        'img'              => 'https://example.com/img.png',
        'username_account' => 'u',
        'password_account' => 'p',
        'status'           => 'sold',
    ]);

    $order = Order::create([
        'product_id'              => $product->id,
        'payment_type'            => 'installment',
        'payment_status'          => 'done',
        'installment_status'      => 'active',
        'installment_months'      => 3,
        'installment_monthly'     => 100000,
        'installment_total'       => 300000,
        'installment_anchor_day'  => 1,
        'installment_started_at'  => now(),
        'snapshot_user_name'      => 'Buyer',
        'snapshot_phone'          => '0900000000',
        'snapshot_email'          => 'buyer@example.com',
        'snapshot_img'            => $product->img,
        'snapshot_price'          => $product->price,
        'cancel_token'            => str_repeat('a', 64),
    ]);

    $schedule = InstallmentSchedule::create([
        'order_id'      => $order->id,
        'period'        => 1,
        'amount'        => 100000,
        'due_date'      => now()->subDay()->toDateString(),
        'grace_until'   => now()->addDay()->toDateString(),
        'payment_token' => str_repeat('b', 64),
        'status'        => 'pending',
    ]);

    return [$order, $schedule];
}

test('admin mark paid requires note and stores audit fields', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    [, $schedule] = makeInstallmentOrderWithSchedule();

    Sanctum::actingAs($admin);

    $this->postJson("/api/installments/schedules/{$schedule->id}/mark-paid", [])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['note']);

    $this->postJson("/api/installments/schedules/{$schedule->id}/mark-paid", [
        'note' => 'CK 100k 04/06 ref FT999',
    ])->assertOk();

    $schedule->refresh();
    expect($schedule->status)->toBe('paid');
    expect($schedule->paid_source)->toBe('admin_manual');
    expect($schedule->marked_by_user_id)->toBe($admin->id);
    expect($schedule->mark_note)->toBe('CK 100k 04/06 ref FT999');
});

test('payos path sets paid_source payos without admin fields', function () {
    [, $schedule] = makeInstallmentOrderWithSchedule();

    app(InstallmentScheduleService::class)->markPeriodPaid($schedule);

    $schedule->refresh();
    expect($schedule->paid_source)->toBe('payos');
    expect($schedule->marked_by_user_id)->toBeNull();
    expect($schedule->mark_note)->toBeNull();
});

test('non admin cannot mark paid', function () {
    $user = User::factory()->create(['role' => 'user']);
    [, $schedule] = makeInstallmentOrderWithSchedule();

    Sanctum::actingAs($user);

    $this->postJson("/api/installments/schedules/{$schedule->id}/mark-paid", [
        'note' => 'Should not work at all',
    ])->assertForbidden();
});
