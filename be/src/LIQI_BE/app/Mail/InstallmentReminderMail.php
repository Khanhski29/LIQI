<?php

namespace App\Mail;

use App\Models\InstallmentSchedule;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InstallmentReminderMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public InstallmentSchedule $schedule,
        public string $reminderType,
    ) {}

    public function envelope(): Envelope
    {
        $subjects = [
            't3'      => '[LiQi Shop] Nhắc trả góp – còn 3 ngày đến hạn',
            't2'      => '[LiQi Shop] Nhắc trả góp – còn 2 ngày đến hạn',
            't1'      => '[LiQi Shop] Nhắc trả góp – còn 1 ngày đến hạn',
            'due'     => '[LiQi Shop] Hôm nay đến hạn trả góp',
            'grace_1' => '[LiQi Shop] Quá hạn trả góp 1 ngày',
            'grace_2' => '[LiQi Shop] Quá hạn trả góp 2 ngày – sắp bị thu hồi acc',
        ];

        return new Envelope(
            subject: $subjects[$this->reminderType] ?? '[LiQi Shop] Nhắc trả góp',
        );
    }

    public function content(): Content
    {
        $order = $this->schedule->order;

        return new Content(
            markdown: 'emails.installment-reminder',
            with: [
                'customerName' => $order->snapshot_user_name,
                'orderId'      => $order->id,
                'period'       => $this->schedule->period,
                'totalPeriods' => $order->installment_months,
                'amount'       => number_format($this->schedule->amount, 0, ',', '.'),
                'dueDate'      => $this->schedule->due_date->format('d/m/Y'),
                'graceUntil'   => $this->schedule->grace_until->format('d/m/Y'),
                'payUrl'       => $this->schedule->payUrl(),
                'reminderType' => $this->reminderType,
                'canPayNow'    => in_array($this->reminderType, ['due', 'grace_1', 'grace_2'], true),
            ],
        );
    }
}
