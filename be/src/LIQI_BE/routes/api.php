<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

// Auth
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me',     [AuthController::class, 'me']);
    });
});

// Public: người dùng xem shop
Route::get('/products',      [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// Public: đặt hàng (guest checkout)
Route::post('/orders', [OrderController::class, 'store']);

// Payments
Route::post('/payments/create',   [PaymentController::class, 'create']);
Route::post('/payments/webhook',  [PaymentController::class, 'webhook']);
Route::post('/payments/cancel',   [PaymentController::class, 'cancel']);

// Protected: chỉ admin
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/products/{id}/edit',  [ProductController::class, 'edit']);
    Route::post('/products',           [ProductController::class, 'store']);
    Route::put('/products/{id}',       [ProductController::class, 'update']);
    Route::delete('/products/{id}',    [ProductController::class, 'destroy']);

    Route::apiResource('categories', CategoryController::class);
});
