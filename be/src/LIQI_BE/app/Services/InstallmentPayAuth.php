<?php

namespace App\Services;

use App\Models\InstallmentSchedule;
use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class InstallmentPayAuth
{
    public static function normalizeEmail(string $email): string
    {
        return strtolower(trim($email));
    }

    public static function emailKey(string $token, string $email): string
    {
        $payload = $token.'|'.self::normalizeEmail($email);

        return hash_hmac('sha256', $payload, (string) config('app.key'));
    }

    public static function verifyKey(string $token, string $email, string $key): bool
    {
        return hash_equals(self::emailKey($token, $email), $key);
    }

    public static function resolveUser(Request $request): ?User
    {
        if ($user = $request->user()) {
            return $user instanceof User ? $user : null;
        }

        $bearerToken = $request->bearerToken();
        if (! $bearerToken) {
            return null;
        }

        $pat = PersonalAccessToken::findToken($bearerToken);
        if (! $pat || $pat->tokenable_type !== User::class) {
            return null;
        }

        $user = $pat->tokenable;

        return $user instanceof User ? $user : null;
    }

    public static function authorize(Request $request, InstallmentSchedule $schedule): bool
    {
        $order = $schedule->order;
        $token = $schedule->payment_token;
        $email = (string) $order->snapshot_email;

        $user = self::resolveUser($request);
        if ($user && $order->user_id && (int) $order->user_id === (int) $user->id) {
            return true;
        }

        $key = $request->query('key') ?? $request->input('key');
        if (is_string($key) && $key !== '' && self::verifyKey($token, $email, $key)) {
            return true;
        }

        return false;
    }
}
