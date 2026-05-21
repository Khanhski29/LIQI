<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

// Auth
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout',          [AuthController::class, 'logout']);
        Route::get('/me',               [AuthController::class, 'me']);
        Route::post('/change-password', [AuthController::class, 'changePassword']);
    });
});

// Public: người dùng xem shop
Route::get('/products',      [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// Public: đặt hàng (guest checkout)
Route::post('/orders',              [OrderController::class, 'store']);
Route::get('/orders/{id}/status',   [OrderController::class, 'status']);

// Payments
Route::post('/payments/create',   [PaymentController::class, 'create']);
Route::post('/payments/webhook',  [PaymentController::class, 'webhook']);
Route::post('/payments/cancel',   [PaymentController::class, 'cancel']);

// Protected: user đã đăng nhập
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/orders/my', [OrderController::class, 'myOrders']);
});

// Protected: chỉ admin
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/orders', [OrderController::class, 'index']);

    Route::get('/products/{id}/edit',  [ProductController::class, 'edit']);
    Route::post('/products',           [ProductController::class, 'store']);
    Route::put('/products/{id}',       [ProductController::class, 'update']);
    Route::delete('/products/{id}',    [ProductController::class, 'destroy']);

    // Route::apiResource('categories', CategoryController::class); // Chưa sử dụng
});
