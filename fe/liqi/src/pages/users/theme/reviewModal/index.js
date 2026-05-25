import { memo, useState } from "react";
import "./style.scss";
import { useCreateReviewUS } from "api/reviews";

const ReviewModal = ({ orderId, onClose }) => {
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { mutate: submitReview, isPending } = useCreateReviewUS({
        onSuccess: (res) => {
            setSuccess(res?.message || "Gửi đánh giá thành công!");
            setError("");
            setTimeout(onClose, 2000);
        },
        onError: (err) => {
            setError(err?.response?.data?.message || "Gửi đánh giá thất bại.");
            setSuccess("");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (content.trim().length < 10) {
            setError("Đánh giá cần ít nhất 10 ký tự.");
            return;
        }

        submitReview({ order_id: Number(orderId), content: content.trim() });
    };

    return (
        <div className="review-modal-overlay" onClick={onClose}>
            <div className="review-modal" onClick={(e) => e.stopPropagation()}>
                <button className="review-modal__close" onClick={onClose} aria-label="Đóng">×</button>

                <h3>Chia sẻ trải nghiệm của bạn</h3>
                <p className="review-modal__hint">
                    Cảm ơn bạn đã mua hàng! Đánh giá sẽ hiển thị sau khi admin duyệt.
                </p>

                <form onSubmit={handleSubmit}>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Viết đánh giá của bạn (tối thiểu 10 ký tự)..."
                        maxLength={500}
                        rows={5}
                        disabled={isPending || !!success}
                    />
                    <p className="review-modal__count">{content.length}/500</p>

                    {error   && <p className="review-modal__msg review-modal__msg--error">{error}</p>}
                    {success && <p className="review-modal__msg review-modal__msg--success">{success}</p>}

                    <div className="review-modal__actions">
                        <button type="button" className="review-modal__skip" onClick={onClose} disabled={isPending}>
                            Bỏ qua
                        </button>
                        <button type="submit" className="btn-l" disabled={isPending || !!success}>
                            {isPending ? "Đang gửi..." : "Gửi đánh giá"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default memo(ReviewModal);
