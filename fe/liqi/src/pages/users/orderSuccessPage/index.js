import { memo, useEffect, useState } from "react";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTERS } from "utils/router";
import { useReviewEligibilityUS } from "api/reviews";
import ReviewModal from "pages/users/theme/reviewModal";

const OrderSuccessPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [showReviewModal, setShowReviewModal] = useState(false);

    const isLoggedIn = !!localStorage.getItem("auth_token");

    const { data: eligibility } = useReviewEligibilityUS(orderId, {
        enabled: isLoggedIn,
    });

    useEffect(() => {
        if (eligibility?.can_review) {
            setShowReviewModal(true);
        }
    }, [eligibility]);

    return (
        <>
            <div className="order-result container wide">
                <div className="order-result__box">
                    <div className="order-result__icon success">✓</div>
                    <h2>Đặt hàng thành công!</h2>
                    <p>Cảm ơn bạn đã mua hàng tại LIQI Shop.</p>
                    <p className="order-result__id">Mã đơn hàng: <strong>#{orderId}</strong></p>
                    <p>Thông tin tài khoản đã được gửi qua email của bạn.</p>
                    <button
                        className="btn-l"
                        onClick={() => navigate(ROUTERS.USER.PRODUCTS)}
                    >
                        Tiếp tục mua hàng
                    </button>
                </div>
            </div>

            {showReviewModal && (
                <ReviewModal
                    orderId={orderId}
                    onClose={() => setShowReviewModal(false)}
                />
            )}
        </>
    );
};

export default memo(OrderSuccessPage);
