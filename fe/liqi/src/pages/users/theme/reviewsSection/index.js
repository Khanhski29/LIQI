import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./style.scss";
import { useGetReviewsUS } from "api/reviews";

const REVIEW_LIMIT = 8;

const ReviewsSection = () => {
    const trackRef = useRef(null);
    const [isSliderReady, setIsSliderReady] = useState(false);
    const { data, isLoading, error, refetch } = useGetReviewsUS({ page: 1 });

    const reviews = useMemo(() => (data?.data || []).slice(0, REVIEW_LIMIT), [data]);

    const sliderTrack = useMemo(
        () => (reviews.length > 1 ? [...reviews, ...reviews] : reviews),
        [reviews]
    );

    const restartSliderAnimation = useCallback(() => {
        if (!trackRef.current) return;

        const track = trackRef.current;
        track.style.animation = "none";
        void track.offsetHeight;
        track.style.animation = "";
    }, []);

    useEffect(() => {
        setIsSliderReady(reviews.length > 1);
    }, [reviews]);

    useEffect(() => {
        if (!isSliderReady) return;
        restartSliderAnimation();
    }, [isSliderReady, restartSliderAnimation]);

    useEffect(() => {
        const onVisibilityChange = () => {
            if (document.visibilityState === "visible" && isSliderReady) {
                restartSliderAnimation();
            }
        };

        document.addEventListener("visibilitychange", onVisibilityChange);
        return () => document.removeEventListener("visibilitychange", onVisibilityChange);
    }, [isSliderReady, restartSliderAnimation]);

    const trackClassName = useMemo(
        () => `reviews-section__track${isSliderReady ? " reviews-section__track--ready" : ""}`,
        [isSliderReady]
    );

    return (
        <section className="reviews-section">
            <h3 className="reviews-section__title">Đánh giá từ khách hàng</h3>

            {isLoading && <p className="reviews-section__msg">Đang tải...</p>}

            {error && (
                <div className="reviews-section__msg">
                    <p>Không tải được đánh giá.</p>
                    <button type="button" className="btn-l" onClick={() => refetch()}>
                        Thử lại
                    </button>
                </div>
            )}

            {!isLoading && !error && reviews.length === 0 && (
                <p className="reviews-section__msg">Chưa có đánh giá nào.</p>
            )}

            {!isLoading && !error && reviews.length > 0 && (
                <div className="reviews-section__slider">
                    <div className={trackClassName} ref={trackRef}>
                        {sliderTrack.map((review, index) => (
                            <div key={`${review.id}-${index}`} className="reviews-section__card">
                                <div className="reviews-section__card-header">
                                    <strong>{review.author_name}</strong>
                                    <span>{review.created_at}</span>
                                </div>
                                <p className="reviews-section__card-content">{review.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default memo(ReviewsSection);
