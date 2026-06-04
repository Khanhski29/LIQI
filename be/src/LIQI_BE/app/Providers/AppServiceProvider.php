<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('auth', function (Request $request) {
            $email = strtolower((string) $request->input('email', ''));

            return [
                Limit::perMinute(5)->by($request->ip()),
                Limit::perMinute(5)->by($email !== '' ? $email : $request->ip().':no-email'),
            ];
        });

        RateLimiter::for('installment-pay', function (Request $request) {
            $token = (string) $request->route('token');

            return [
                Limit::perMinute(10)->by($request->ip()),
                Limit::perMinute(3)->by('installment-pay:'.$token),
            ];
        });
    }
}
