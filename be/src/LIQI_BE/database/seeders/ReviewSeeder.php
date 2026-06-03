<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use App\Services\OrderCredentialService;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        if (User::where('email', 'reviewer1@liqi.test')->exists()) {
            return;
        }

        $samples = [
            [
                'user' => ['name' => 'Minh Tuấn', 'email' => 'reviewer1@liqi.test', 'phone' => '0901234561'],
                'product_code' => 'VIP0001',
                'content' => 'Mua acc nhanh, giao trong 3 phút. Skin đúng như mô tả, đăng nhập ok luôn. Shop uy tín!',
                'is_visible' => true,
                'days_ago' => 1,
            ],
            [
                'user' => ['name' => 'Hoàng Anh', 'email' => 'reviewer2@liqi.test', 'phone' => '0901234562'],
                'product_code' => 'VIP0002',
                'content' => 'Acc full skin Nakroth như shop quảng cáo. Hỗ trợ đổi pass nhanh, rất hài lòng lần mua đầu.',
                'is_visible' => true,
                'days_ago' => 3,
            ],
            [
                'user' => ['name' => 'Thanh Hà', 'email' => 'reviewer3@liqi.test', 'phone' => '0901234563'],
                'product_code' => 'VIP0003',
                'content' => 'Giá hợp lý so với acc có nhiều skin SS. Giao acc đúng hẹn, không phải chờ lâu.',
                'is_visible' => true,
                'days_ago' => 5,
            ],
            [
                'user' => ['name' => 'Quốc Bảo', 'email' => 'reviewer4@liqi.test', 'phone' => '0901234564'],
                'product_code' => 'VIP0004',
                'content' => 'Acc Murad Chí Tôn đẹp, rank ổn. Shop tư vấn nhiệt tình trước khi mua.',
                'is_visible' => true,
                'days_ago' => 7,
            ],
            [
                'user' => ['name' => 'Ngọc Linh', 'email' => 'reviewer5@liqi.test', 'phone' => '0901234565'],
                'product_code' => 'VIP0005',
                'content' => 'Lần thứ 2 mua ở LIQI rồi, lần nào cũng giao nhanh. Acc full tướng chơi rank ngon.',
                'is_visible' => true,
                'days_ago' => 10,
            ],
            [
                'user' => ['name' => 'Đức Phú', 'email' => 'reviewer6@liqi.test', 'phone' => '0901234566'],
                'product_code' => 'VIP0006',
                'content' => 'Skin collab đẹp thật, acc sạch không bị khóa. Recommend shop cho ae cần acc vip.',
                'is_visible' => true,
                'days_ago' => 12,
            ],
            [
                'user' => ['name' => 'Huyền Trang', 'email' => 'reviewer7@liqi.test', 'phone' => '0901234567'],
                'product_code' => 'VIP0007',
                'content' => 'Mua acc tặng em trai, shop hướng dẫn đăng nhập chi tiết. Em chơi được ngay.',
                'is_visible' => true,
                'days_ago' => 14,
            ],
            [
                'user' => ['name' => 'Văn Hùng', 'email' => 'reviewer8@liqi.test', 'phone' => '0901234568'],
                'product_code' => 'VIP0008',
                'content' => 'Acc Nak Quán Quân đúng y chang ảnh. Thanh toán xong là có acc, không phải đợi.',
                'is_visible' => false,
                'days_ago' => 2,
            ],
            [
                'user' => ['name' => 'Kim Chi', 'email' => 'reviewer9@liqi.test', 'phone' => '0901234569'],
                'product_code' => 'VIP0009',
                'content' => 'Shop phản hồi inbox nhanh. Acc rank cao, skin đẹp, đáng đồng tiền.',
                'is_visible' => false,
                'days_ago' => 4,
            ],
            [
                'user' => ['name' => 'Trung Kiên', 'email' => 'reviewer10@liqi.test', 'phone' => '0901234570'],
                'product_code' => 'VIP0010',
                'content' => 'Acc full tướng đấu rank mượt. Cảm ơn shop, sẽ ủng hộ thêm lần sau.',
                'is_visible' => false,
                'days_ago' => 6,
            ],
        ];

        foreach ($samples as $sample) {
            $user = User::firstOrCreate(
                ['email' => $sample['user']['email']],
                [
                    'name'     => $sample['user']['name'],
                    'phone'    => $sample['user']['phone'],
                    'password' => Hash::make('password'),
                    'role'     => 'user',
                    'status'   => 'active',
                ]
            );

            $product = Product::where('product_code', $sample['product_code'])->first();
            if (! $product) {
                continue;
            }

            $orderCreatedAt = Carbon::now()->subDays($sample['days_ago']);
            $reviewCreatedAt = $orderCreatedAt->copy()->addHour();

            $order = Order::create([
                'user_id'            => $user->id,
                'product_id'         => $product->id,
                'snapshot_user_name' => $user->name,
                'snapshot_phone'     => $user->phone,
                'snapshot_email'     => $user->email,
                'snapshot_img'       => $product->img,
                'snapshot_price'     => $product->price,
                'payment_status'     => 'done',
                'created_at'         => $orderCreatedAt,
                'updated_at'         => $orderCreatedAt,
            ]);

            app(OrderCredentialService::class)->deliver($order, $product);
            $product->update(['status' => 'sold']);

            Review::create([
                'order_id'    => $order->id,
                'user_id'     => $user->id,
                'author_name' => $user->name,
                'content'     => $sample['content'],
                'is_visible'  => $sample['is_visible'],
                'created_at'  => $reviewCreatedAt,
                'updated_at'  => $reviewCreatedAt,
            ]);
        }
    }
}
