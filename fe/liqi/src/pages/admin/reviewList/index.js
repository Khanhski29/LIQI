import { memo, useState } from "react";
import "./style.scss";
import { useSearchParams } from "react-router-dom";
import { useGetManageReviewsUS, useUpdateReviewVisibilityUS } from "api/reviews";

const ReviewList = ({ status }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    const { data, isLoading, error } = useGetManageReviewsUS({ page, status });
    const { mutate: updateVisibility, isPending } = useUpdateReviewVisibilityUS();

    const reviews    = data?.data      || [];
    const totalPages = data?.last_page || 1;

    const getPagination = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }
        if (page <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
        if (page >= totalPages - 3)
            return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        return [1, "...", page - 2, page - 1, page, page + 1, page + 2, "...", totalPages];
    };

    if (isLoading) return <p className="review__list__msg">Đang tải...</p>;
    if (error)     return <p className="review__list__msg">Lỗi tải dữ liệu, vui lòng thử lại.</p>;
    if (!reviews.length) return <p className="review__list__msg">Chưa có đánh giá nào.</p>;

    return (
        <div className="review__list">
            {reviews.map((item) => (
                <div key={item.id} className="review__card-item">
                    <p className="review__card-item--g review__card-item-id">#{item.id}</p>
                    <p className="review__card-item--g review__card-item-order">Đơn #{item.order_id}</p>
                    <p className="review__card-item--g review__card-item-author">{item.author_name}</p>
                    <p className="review__card-item--g review__card-item-content">{item.content}</p>
                    <p className="review__card-item--g review__card-item-time">{item.created_at}</p>
                    <p className={`review__card-item--g review__card-item-status ${item.is_visible ? "status--visible" : "status--pending"}`}>
                        {item.is_visible ? "Đang hiển thị" : "Chờ duyệt"}
                    </p>
                    <div className="review__card-item-actions">
                        {!item.is_visible && (
                            <button
                                className="btn-approve"
                                disabled={isPending}
                                onClick={() => updateVisibility({ id: item.id, is_visible: true })}
                            >
                                Duyệt
                            </button>
                        )}
                        {item.is_visible && (
                            <button
                                className="btn-hide"
                                disabled={isPending}
                                onClick={() => updateVisibility({ id: item.id, is_visible: false })}
                            >
                                Ẩn
                            </button>
                        )}
                    </div>
                </div>
            ))}

            <div className="pagination">
                <button disabled={page === 1} onClick={() => setSearchParams({ page: page - 1 })}>{"<"}</button>
                {getPagination().map((item, index) =>
                    item === "..." ? (
                        <span key={index}>...</span>
                    ) : (
                        <button
                            key={index}
                            className={page === item ? "active" : ""}
                            onClick={() => setSearchParams({ page: item })}
                        >
                            {item}
                        </button>
                    )
                )}
                <button disabled={page === totalPages} onClick={() => setSearchParams({ page: page + 1 })}>{">"}</button>
            </div>
        </div>
    );
};

export default memo(ReviewList);
