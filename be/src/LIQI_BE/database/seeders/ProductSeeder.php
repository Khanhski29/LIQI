<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'product_code' => 'VIP0001',
                'price' => 200000,
                'description' => 'ngộ không tề thiên võ thánh, raz siêu việt, nak lôi quang, butter cửu thiên, nak vệ thần...',
                'img' => 'https://www.riotgames.com/darkroom/2880/e69e5ec20508361cd841bc66730f4797:91defcf7338317d027d54743c3aaee02/110322-xbox-pass-1920x1080-article.png',
                'username_account' => 'khanh0123',
                'password_account' => 'shopliqi1',
                'status' => 'available'
            ],

            [
                'product_code' => 'VIP0002',
                'price' => 210000,
                'description' => 'full skin nakroth, florentino tinh hệ, allain nguyệt tộc...',
                'img' => 'https://www.riotgames.com/darkroom/2880/e69e5ec20508361cd841bc66730f4797:91defcf7338317d027d54743c3aaee02/110322-xbox-pass-1920x1080-article.png',
                'username_account' => 'khanh0124',
                'password_account' => 'shopliqi2',
                'status' => 'available'
            ],

            [
                'product_code' => 'VIP0003',
                'price' => 220000,
                'description' => 'violet thần long, yena thứ nguyên, tulen chí tôn...',
                'img' => 'https://www.riotgames.com/darkroom/2880/e69e5ec20508361cd841bc66730f4797:91defcf7338317d027d54743c3aaee02/110322-xbox-pass-1920x1080-article.png',
                'username_account' => 'khanh0125',
                'password_account' => 'shopliqi3',
                'status' => 'available'
            ],

            [
                'product_code' => 'VIP0004',
                'price' => 230000,
                'description' => 'nakroth siêu việt, murad chí tôn, richter codex...',
                'img' => 'https://www.riotgames.com/darkroom/2880/e69e5ec20508361cd841bc66730f4797:91defcf7338317d027d54743c3aaee02/110322-xbox-pass-1920x1080-article.png',
                'username_account' => 'khanh0126',
                'password_account' => 'shopliqi4',
                'status' => 'available'
            ],

            [
                'product_code' => 'VIP0005',
                'price' => 240000,
                'description' => 'full tướng, nhiều skin ss hữu hạn, rank tinh anh...',
                'img' => 'https://www.riotgames.com/darkroom/2880/e69e5ec20508361cd841bc66730f4797:91defcf7338317d027d54743c3aaee02/110322-xbox-pass-1920x1080-article.png',
                'username_account' => 'khanh0127',
                'password_account' => 'shopliqi5',
                'status' => 'available'
            ],

            [
                'product_code' => 'VIP0006',
                'price' => 250000,
                'description' => 'acc nhiều skin collab, butterfly hữu hạn...',
                'img' => 'https://www.riotgames.com/darkroom/2880/e69e5ec20508361cd841bc66730f4797:91defcf7338317d027d54743c3aaee02/110322-xbox-pass-1920x1080-article.png',
                'username_account' => 'khanh0128',
                'password_account' => 'shopliqi6',
                'status' => 'available'
            ],

            [
                'product_code' => 'VIP0007',
                'price' => 260000,
                'description' => 'full ngọc, nhiều tướng rank, skin limited...',
                'img' => 'https://www.riotgames.com/darkroom/2880/e69e5ec20508361cd841bc66730f4797:91defcf7338317d027d54743c3aaee02/110322-xbox-pass-1920x1080-article.png',
                'username_account' => 'khanh0129',
                'password_account' => 'shopliqi7',
                'status' => 'available'
            ],

            [
                'product_code' => 'VIP0008',
                'price' => 270000,
                'description' => 'nakroth quán quân, raz bão tố, yena wave...',
                'img' => 'https://www.riotgames.com/darkroom/2880/e69e5ec20508361cd841bc66730f4797:91defcf7338317d027d54743c3aaee02/110322-xbox-pass-1920x1080-article.png',
                'username_account' => 'khanh0130',
                'password_account' => 'shopliqi8',
                'status' => 'available'
            ],

            [
                'product_code' => 'VIP0009',
                'price' => 280000,
                'description' => 'acc vip nhiều skin đẹp, rank cao...',
                'img' => 'https://www.riotgames.com/darkroom/2880/e69e5ec20508361cd841bc66730f4797:91defcf7338317d027d54743c3aaee02/110322-xbox-pass-1920x1080-article.png',
                'username_account' => 'khanh0131',
                'password_account' => 'shopliqi9',
                'status' => 'available'
            ],

            [
                'product_code' => 'VIP0010',
                'price' => 290000,
                'description' => 'full tướng đấu rank, skin hiếm...',
                'img' => 'https://www.riotgames.com/darkroom/2880/e69e5ec20508361cd841bc66730f4797:91defcf7338317d027d54743c3aaee02/110322-xbox-pass-1920x1080-article.png',
                'username_account' => 'khanh0132',
                'password_account' => 'shopliqi10',
                'status' => 'available'
            ],

            [
                'product_code' => 'VIP0011',
                'price' => 300000,
                'description' => 'acc có nhiều skin ss mùa giải...',
                'img' => 'https://www.riotgames.com/darkroom/2880/e69e5ec20508361cd841bc66730f4797:91defcf7338317d027d54743c3aaee02/110322-xbox-pass-1920x1080-article.png',
                'username_account' => 'khanh0133',
                'password_account' => 'shopliqi11',
                'status' => 'available'
            ],

            [
                'product_code' => 'VIP0012',
                'price' => 310000,
                'description' => 'full ngọc lvl 3, nhiều skin sss...',
                'img' => 'https://www.riotgames.com/darkroom/2880/e69e5ec20508361cd841bc66730f4797:91defcf7338317d027d54743c3aaee02/110322-xbox-pass-1920x1080-article.png',
                'username_account' => 'khanh0134',
                'password_account' => 'shopliqi12',
                'status' => 'available'
            ],

            [
                'product_code' => 'VIP0013',
                'price' => 320000,
                'description' => 'skin thần tượng âm nhạc, codex vip...',
                'img' => 'https://www.riotgames.com/darkroom/2880/e69e5ec20508361cd841bc66730f4797:91defcf7338317d027d54743c3aaee02/110322-xbox-pass-1920x1080-article.png',
                'username_account' => 'khanh0135',
                'password_account' => 'shopliqi13',
                'status' => 'available'
            ],

            [
                'product_code' => 'VIP0014',
                'price' => 330000,
                'description' => 'acc chiến liên quân rank cao thủ...',
                'img' => 'https://www.riotgames.com/darkroom/2880/e69e5ec20508361cd841bc66730f4797:91defcf7338317d027d54743c3aaee02/110322-xbox-pass-1920x1080-article.png',
                'username_account' => 'khanh0136',
                'password_account' => 'shopliqi14',
                'status' => 'available'
            ],

            [
                'product_code' => 'VIP0015',
                'price' => 340000,
                'description' => 'acc nhiều skin biến về hữu hạn...',
                'img' => 'https://www.riotgames.com/darkroom/2880/e69e5ec20508361cd841bc66730f4797:91defcf7338317d027d54743c3aaee02/110322-xbox-pass-1920x1080-article.png',
                'username_account' => 'khanh0137',
                'password_account' => 'shopliqi15',
                'status' => 'available'
            ],

            [
                'product_code' => 'VIP0016',
                'price' => 350000,
                'description' => 'allain thần mặt trời, butterfly siêu phẩm...',
                'img' => 'https://www.riotgames.com/darkroom/2880/e69e5ec20508361cd841bc66730f4797:91defcf7338317d027d54743c3aaee02/110322-xbox-pass-1920x1080-article.png',
                'username_account' => 'khanh0138',
                'password_account' => 'shopliqi16',
                'status' => 'available'
            ],

            [
                'product_code' => 'VIP0017',
                'price' => 360000,
                'description' => 'acc vip full skin xạ thủ...',
                'img' => 'https://www.riotgames.com/darkroom/2880/e69e5ec20508361cd841bc66730f4797:91defcf7338317d027d54743c3aaee02/110322-xbox-pass-1920x1080-article.png',
                'username_account' => 'khanh0139',
                'password_account' => 'shopliqi17',
                'status' => 'available'
            ],

            [
                'product_code' => 'VIP0018',
                'price' => 370000,
                'description' => 'murad đặc dị, tulen đông êm đềm...',
                'img' => 'https://www.riotgames.com/darkroom/2880/e69e5ec20508361cd841bc66730f4797:91defcf7338317d027d54743c3aaee02/110322-xbox-pass-1920x1080-article.png',
                'username_account' => 'khanh0140',
                'password_account' => 'shopliqi18',
                'status' => 'available'
            ],

            [
                'product_code' => 'VIP0019',
                'price' => 380000,
                'description' => 'acc full đấu sĩ, nhiều skin cực hiếm...',
                'img' => 'https://www.riotgames.com/darkroom/2880/e69e5ec20508361cd841bc66730f4797:91defcf7338317d027d54743c3aaee02/110322-xbox-pass-1920x1080-article.png',
                'username_account' => 'khanh0141',
                'password_account' => 'shopliqi19',
                'status' => 'available'
            ],

            [
                'product_code' => 'VIP0020',
                'price' => 390000,
                'description' => 'acc liên quân vip, nhiều skin hữu hạn...',
                'img' => 'https://www.riotgames.com/darkroom/2880/e69e5ec20508361cd841bc66730f4797:91defcf7338317d027d54743c3aaee02/110322-xbox-pass-1920x1080-article.png',
                'username_account' => 'khanh0142',
                'password_account' => 'shopliqi20',
                'status' => 'available'
            ],
            [
                'product_code' => 'VIP0021',
                'price' => 390000,
                'description' => 'acc liên quân vip, nhiều skin hữu hạn...',
                'img' => 'https://www.riotgames.com/darkroom/2880/e69e5ec20508361cd841bc66730f4797:91defcf7338317d027d54743c3aaee02/110322-xbox-pass-1920x1080-article.png',
                'username_account' => 'khanh0142',
                'password_account' => 'shopliqi20',
                'status' => 'sold'
            ],
        ];



        DB::table('products')->insert($products);
    }
}
