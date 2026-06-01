<?php

namespace App\Services;

class InstallmentService
{
    private const TERM_FEES = [
        1  => 0,
        3  => 0.03,
        6  => 0.05,
        9  => 0.07,
        12 => 0.08,
    ];

    public static function calc(float|int|string $price, int $months, int $downPaymentPct): array
    {
        $base = (float) $price;
        $fee  = self::TERM_FEES[$months] ?? 0;

        $upfront    = (int) ceil($base * $downPaymentPct / 100);
        $monthlyFee = (int) ceil($base * $fee);
        $monthly    = (int) ceil(($base - $upfront) / $months) + $monthlyFee;
        $total      = (int) ceil(($monthly * $months) + $upfront);

        return [
            'total'      => $total,
            'upfront'    => $upfront,
            'monthly'    => $monthly,
            'fee'        => $fee,
            'monthlyFee' => $monthlyFee,
        ];
    }
}
