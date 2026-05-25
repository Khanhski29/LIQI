import { memo, useState } from "react";
import "./style.scss";
import { useGetReviewsUS } from "api/reviews";

const ReviewsSection = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading } = useGetReviewsUS({ page });

    const reviews = data?.data || [];

    return (
        <section className="reviews-section">
            <h3 className="reviews-section__title">Đánh giá từ khách hàng</h3>

            {isLoading && <p className="reviews-section__msg">Đang tải...</p>}

            {!isLoading && reviews.length === 0 && (
                <p className="reviews-section__msg">Chưa có đánh giá nào.</p>
            )}

            <div className="reviews-section__list">
                {reviews.map((review) => (
                    <div key={review.id} className="reviews-section__card">
                        <div className="reviews-section__card-header">
                            <strong>{review.author_name}</strong>
                            <span>{review.created_at}</span>
                        </div>
                        <p className="reviews-section__card-content">{review.content}</p>
                    </div>
                ))}
            </div>

            {data?.last_page > 1 && (
                <div className="reviews-section__pagination">
                    <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>{"<"}</button>
                    <span>{page} / {data.last_page}</span>
                    <button disabled={page === data.last_page} onClick={() => setPage((p) => p + 1)}>{">"}</button>
                </div>
            )}
        </section>
    );
};

export default memo(ReviewsSection);
