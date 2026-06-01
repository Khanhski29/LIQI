<?php

namespace App\Console\Commands;

use App\Mail\InstallmentReminderMail;
use App\Models\InstallmentSchedule;
use App\Services\InstallmentScheduleService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendInstallmentReminders extends Command
{
    protected $signature = 'installments:send-reminders';

    protected $description = 'Gửi mail nhắc trả góp và đánh dấu quá hạn';

    public function handle(InstallmentScheduleService $service): int
    {
        $today = now()->startOfDay();

        $service->markOverdueSchedules();

        $reminders = [
            ['field' => 'reminder_t3_sent_at', 'offset' => 3,  'type' => 't3'],
            ['field' => 'reminder_t2_sent_at', 'offset' => 2,  'type' => 't2'],
            ['field' => 'reminder_t1_sent_at', 'offset' => 1,  'type' => 't1'],
            ['field' => 'due_sent_at',         'offset' => 0,  'type' => 'due'],
            ['field' => 'grace_t1_sent_at',    'offset' => -1, 'type' => 'grace_1'],
            ['field' => 'grace_t2_sent_at',    'offset' => -2, 'type' => 'grace_2'],
        ];

        foreach ($reminders as $reminder) {
            $targetDate = $today->copy()->addDays($reminder['offset'])->toDateString();

            $schedules = InstallmentSchedule::query()
                ->with('order')
                ->whereNull($reminder['field'])
                ->where('status', 'pending')
                ->whereDate('due_date', $targetDate)
                ->whereHas('order', fn ($q) => $q
                    ->where('payment_type', 'installment')
                    ->where('installment_status', 'active')
                )
                ->get();

            foreach ($schedules as $schedule) {
                Mail::to($schedule->order->snapshot_email)
                    ->queue(new InstallmentReminderMail($schedule, $reminder['type']));

                $schedule->update([$reminder['field'] => now()]);
            }
        }

        $this->info('Installment reminders processed.');

        return self::SUCCESS;
    }
}
