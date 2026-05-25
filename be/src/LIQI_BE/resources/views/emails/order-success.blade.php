<x-mail::message>
# Thanh toán thành công!

Xin chào **{{ $customerName }}**,

Cảm ơn bạn đã mua hàng tại **LiQi Shop**. Đơn hàng **#{{ $orderId }}** của bạn đã được xác nhận thanh toán thành công với số tiền **{{ $price }} VNĐ**.

---

## Thông tin tài khoản game

Dưới đây là thông tin đăng nhập tài khoản bạn đã mua. Vui lòng liên hệ với hỗ trợ để **đổi mật khẩu ngay**.

<x-mail::panel>
**Tên đăng nhập:** `{{ $usernameAccount }}`

**Mật khẩu:** `{{ $passwordAccount }}`
</x-mail::panel>

> ⚠️ **Lưu ý bảo mật:** Không chia sẻ thông tin này cho bất kỳ ai. LiQi Shop sẽ **không chịu trách nhiệm** nếu tài khoản bị mất do bạn tự tiết lộ thông tin.

---

Nếu có bất kỳ vấn đề gì, hãy liên hệ với chúng tôi qua [Website](http://localhost:3000) hoặc [Fanpage Facebook](https://facebook.com).

Trân trọng,<br>
**Đội ngũ LiQi Shop**
</x-mail::message>
