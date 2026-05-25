<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index(Request $request)
    {
        $perPage = 10;

        $reviews = Review::where('is_visible', true)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        $data = $reviews->map(fn (Review $review) => $this->formatPublicReview($review));

        return response()->json([
            'data'         => $data,
            'current_page' => $reviews->currentPage(),
            'last_page'    => $reviews->lastPage(),
            'total'        => $reviews->total(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|integer|exists:orders,id',
            'content'  => 'required|string|min:10|max:500',
        ]);

        $user  = $request->user();
        $order = Order::findOrFail($validated['order_id']);

        if ($order->user_id !== $user->id) {
            return response()->json(['message' => 'Bạn không có quyền đánh giá đơn hàng này.'], 403);
        }

        if ($order->payment_status !== 'done') {
            return response()->json(['message' => 'Chỉ có thể đánh giá đơn hàng đã thanh toán thành công.'], 422);
        }

        if (Review::where('order_id', $order->id)->exists()) {
            return response()->json(['message' => 'Bạn đã đánh giá đơn hàng này rồi.'], 409);
        }

        $review = Review::create([
            'order_id'    => $order->id,
            'user_id'     => $user->id,
            'author_name' => $user->name,
            'content'     => $validated['content'],
            'is_visible'  => false,
        ]);

        return response()->json([
            'message' => 'Cảm ơn bạn! Đánh giá sẽ hiển thị sau khi được duyệt.',
            'data'    => $this->formatPublicReview($review),
        ], 201);
    }

    public function eligibility(Request $request, string $id)
    {
        $order = Order::findOrFail($id);
        $user  = $request->user();

        if ($order->user_id !== $user->id) {
            return response()->json(['can_review' => false]);
        }

        if ($order->payment_status !== 'done') {
            return response()->json(['can_review' => false]);
        }

        if (Review::where('order_id', $order->id)->exists()) {
            return response()->json(['can_review' => false]);
        }

        return response()->json(['can_review' => true]);
    }

    public function manage(Request $request)
    {
        $status  = $request->query('status');
        $perPage = 15;

        $query = Review::with('order')->orderBy('created_at', 'desc');

        if ($status === 'pending') {
            $query->where('is_visible', false);
        } elseif ($status === 'visible') {
            $query->where('is_visible', true);
        }

        $reviews = $query->paginate($perPage);

        $data = $reviews->map(function (Review $review) {
            return [
                'id'           => $review->id,
                'order_id'     => $review->order_id,
                'author_name'  => $review->author_name,
                'content'      => $review->content,
                'is_visible'   => $review->is_visible,
                'created_at'   => $review->created_at?->format('Y-m-d H:i:s'),
            ];
        });

        return response()->json([
            'data'         => $data,
            'current_page' => $reviews->currentPage(),
            'last_page'    => $reviews->lastPage(),
            'total'        => $reviews->total(),
        ]);
    }

    public function updateVisibility(Request $request, string $id)
    {
        $validated = $request->validate([
            'is_visible' => 'required|boolean',
        ]);

        $review = Review::findOrFail($id);
        $review->update(['is_visible' => $validated['is_visible']]);

        return response()->json([
            'message' => $validated['is_visible'] ? 'Đã duyệt đánh giá.' : 'Đã ẩn đánh giá.',
            'data'    => [
                'id'         => $review->id,
                'is_visible' => $review->is_visible,
            ],
        ]);
    }

    private function formatPublicReview(Review $review): array
    {
        return [
            'id'          => $review->id,
            'author_name' => $review->author_name,
            'content'     => $review->content,
            'created_at'  => $review->created_at?->format('Y-m-d H:i:s'),
        ];
    }
}
