<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use PayOS\PayOS;

class OrderCancellationService
{
    public function __construct(private OrderCredentialService $credentialService) {}

    public function cancelPendingOrder(Order $order, string $reason = 'Khách hàng hủy đơn hàng'): bool
    {
        if ($order->payment_status !== 'pending') {
            return false;
        }

        $order->loadMissing('payment', 'product');
        $payosOrderCode = $order->payment?->payos_order_code;

        DB::transaction(function () use ($order) {
            $this->credentialService->purge($order);
            $order->update(['payment_status' => 'cancel']);
            $order->product?->update(['status' => 'available']);

            if ($order->payment && $order->payment->status === 'pending') {
                $order->payment->update(['status' => 'failed']);
            }
        });

        if ($payosOrderCode) {
            $this->cancelPayOsPaymentLink($payosOrderCode, $reason);
        }

        return true;
    }

    private function cancelPayOsPaymentLink(string $payosOrderCode, string $reason): void
    {
        try {
            $payOS = new PayOS(
                env('PAYOS_CLIENT_ID'),
                env('PAYOS_API_KEY'),
                env('PAYOS_CHECKSUM_KEY'),
            );

            $payOS->cancelPaymentLink((int) $payosOrderCode, $reason);
        } catch (\Exception $e) {
            Log::warning('PayOS cancel payment link failed', [
                'payos_order_code' => $payosOrderCode,
                'reason'           => $reason,
                'error'            => $e->getMessage(),
            ]);
        }
    }
}
