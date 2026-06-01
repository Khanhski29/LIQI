<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderSuccessMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Order $order) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '[LiQi Shop] Thanh toán thành công – Thông tin tài khoản game',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.order-success',
            with: [
                'customerName'    => $this->order->snapshot_user_name,
                'orderId'         => $this->order->id,
                'price'           => number_format($this->order->pay_amount ?? $this->order->snapshot_price, 0, ',', '.'),
                'usernameAccount' => $this->order->snapshot_username_account,
                'passwordAccount' => $this->order->snapshot_password_account,
                'isInstallment'   => $this->order->payment_type === 'installment',
                'installmentMonths' => $this->order->installment_months,
                'downPaymentPct'  => $this->order->installment_down_payment_pct,
                'monthlyAmount'   => number_format($this->order->installment_monthly ?? 0, 0, ',', '.'),
            ],
        );
    }
}
