<?php

namespace App\Http\Controllers;

use App\Services\CloudinaryService;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function storeImage(Request $request, CloudinaryService $cloudinary)
    {
        $validated = $request->validate([
            'file' => ['required', 'image', 'max:5120'],
        ]);

        try {
            $url = $cloudinary->uploadImage($validated['file']);
        } catch (\RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], 502);
        }

        return response()->json(['url' => $url]);
    }
}
