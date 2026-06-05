<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;

class CloudinaryService
{
    public function uploadImage(UploadedFile $file, string $folder = 'liqi/accounts'): string
    {
        $cloudName = (string) config('services.cloudinary.cloud_name');
        $apiKey = (string) config('services.cloudinary.api_key');
        $apiSecret = (string) config('services.cloudinary.api_secret');

        if ($cloudName === '' || $apiKey === '' || $apiSecret === '') {
            throw new \RuntimeException('Cloudinary chưa được cấu hình.');
        }

        $timestamp = time();
        $paramsToSign = [
            'folder' => $folder,
            'timestamp' => $timestamp,
        ];

        ksort($paramsToSign);
        $signaturePayload = collect($paramsToSign)
            ->map(fn ($value, $key) => "{$key}={$value}")
            ->implode('&').$apiSecret;
        $signature = sha1($signaturePayload);

        $response = Http::asMultipart()
            ->attach('file', fopen($file->getRealPath(), 'r'), $file->getClientOriginalName())
            ->post("https://api.cloudinary.com/v1_1/{$cloudName}/image/upload", [
                'api_key' => $apiKey,
                'timestamp' => (string) $timestamp,
                'signature' => $signature,
                'folder' => $folder,
            ]);

        if (! $response->successful()) {
            throw new \RuntimeException('Upload Cloudinary thất bại.');
        }

        $url = $response->json('secure_url');
        if (! is_string($url) || $url === '') {
            throw new \RuntimeException('Cloudinary không trả về URL ảnh.');
        }

        return $url;
    }
}
