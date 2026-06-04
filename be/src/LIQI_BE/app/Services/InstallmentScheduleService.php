<?php

namespace App\Services;

use App\Models\InstallmentSchedule;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Support\Str;

class InstallmentScheduleService
{
    public const GRACE_DAYS = 2;

    public function __construct(private OrderCredentialService $credentialService) {}

    public function activateAfterUpfrontPaid(Order $order): void
    {
        if ($order->payment_type !== 'installment' || ! $order->installment_months) {
            return;
        }

        $startedAt = now();
        $anchorDay = (int) $startedAt->day;

        $order->update([
            'installment_status'     => 'active',
            'installment_anchor_day' => $anchorDay,
            'installment_started_at' => $startedAt,
        ]);

        for ($period = 1; $period <= $order->installment_months; $period++) {
            $dueDate    = $this->calcDueDate($startedAt, $anchorDay, $period);
            $graceUntil = $dueDate->copy()->addDays(self::GRACE_DAYS);

            InstallmentSchedule::create([
                'order_id'       => $order->id,
                'period'         => $period,
                'amount'         => $order->installment_monthly,
                'due_date'       => $dueDate->toDateString(),
                'grace_until'    => $graceUntil->toDateString(),
                'payment_token'  => Str::random(64),
                'status'         => 'pending',
            ]);
        }
    }

    public function calcDueDate(Carbon $startDate, int $anchorDay, int $monthOffset): Carbon
    {
        $target  = $startDate->copy()->startOfDay()->addMonths($monthOffset);
        $lastDay = $target->copy()->endOfMonth()->day;
        $day     = min($anchorDay, $lastDay);

        return $target->day($day)->startOfDay();
    }

    public function markPeriodPaid(
        InstallmentSchedule $schedule,
        string $paidSource = 'payos',
        ?int $markedByUserId = null,
        ?string $markNote = null,
    ): void {
        $schedule->update([
            'status'            => 'paid',
            'paid_at'           => now(),
            'paid_source'       => $paidSource,
            'marked_by_user_id' => $markedByUserId,
            'mark_note'         => $markNote,
        ]);

        $order = $schedule->order;

        $remaining = InstallmentSchedule::where('order_id', $order->id)
            ->whereIn('status', ['pending', 'overdue'])
            ->count();

        if ($remaining === 0) {
            $order->update(['installment_status' => 'completed']);
        }
    }

    public function markOverdueSchedules(): int
    {
        return InstallmentSchedule::query()
            ->where('status', 'pending')
            ->whereDate('grace_until', '<', now()->toDateString())
            ->whereHas('order', fn ($q) => $q->where('installment_status', 'active'))
            ->update(['status' => 'overdue']);
    }

    public function revokeOrder(Order $order): void
    {
        $this->credentialService->purge($order);

        $order->update(['installment_status' => 'defaulted']);

        InstallmentSchedule::where('order_id', $order->id)
            ->whereIn('status', ['pending', 'overdue'])
            ->update(['status' => 'revoked']);

        if ($order->product) {
            $order->product->update(['status' => 'available']);
        }
    }
}
