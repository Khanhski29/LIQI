<x-mail::message>
# Nhắc thanh toán trả góp

Xin chào **{{ $customerName }}**,

@if(in_array($reminderType, ['t3', 't2', 't1']))
Đơn hàng **#{{ $orderId }}** – kỳ **{{ $period }}/{{ $totalPeriods }}** sẽ đến hạn vào **{{ $dueDate }}**.

**Số tiền cần trả:** {{ $amount }} VNĐ

Vui lòng chuẩn bị thanh toán đúng hạn. Bạn có thể xem chi tiết tại link bên dưới (thanh toán được mở từ ngày **{{ $dueDate }}**).
@elseif($reminderType === 'due')
**Hôm nay** là hạn trả kỳ **{{ $period }}/{{ $totalPeriods }}** của đơn **#{{ $orderId }}**.

**Số tiền:** {{ $amount }} VNĐ

Vui lòng thanh toán ngay qua link bên dưới.
@else
Kỳ **{{ $period }}/{{ $totalPeriods }}** đơn **#{{ $orderId }}** đã quá hạn.

**Số tiền:** {{ $amount }} VNĐ  
**Hạn chót (grace):** {{ $graceUntil }}

@if($reminderType === 'grace_2')
⚠️ Đây là ngày cuối cùng trong thời gian gia hạn. Sau ngày này shop sẽ xem xét **thu hồi acc** nếu chưa nhận được thanh toán.
@else
Vui lòng thanh toán sớm qua link bên dưới.
@endif
@endif

<x-mail::button :url="$payUrl">
@if($canPayNow)
Thanh toán kỳ này
@else
Xem chi tiết kỳ trả góp
@endif
</x-mail::button>

Trân trọng,<br>
**Đội ngũ LiQi Shop**
</x-mail::message>
