import { memo } from "react";
import "../orderSuccessPage/style.scss";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTERS } from "utils/router";
import { useCancelPaymentUS } from "api/payments";
import { useEffect } from "react";

const OrderFailPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const { mutate: cancelPayment } = useCancelPaymentUS();

    useEffect(() => {
        if (orderId) {
            cancelPayment({ order_id: Number(orderId) });
        }
    }, [orderId]);

    return (
        <div className="order-result container wide">
            <div className="order-result__box">
                <div className="order-result__icon fail">✕</div>
                <h2>Thanh toán thất bại</h2>
                <p>Đơn hàng của bạn đã bị hủy hoặc thanh toán không thành công.</p>
                {orderId && (
                    <p className="order-result__id">Mã đơn hàng: <strong>#{orderId}</strong></p>
                )}
                <p>Bạn có thể thử lại hoặc liên hệ hỗ trợ.</p>
                <button
                    className="btn-l"
                    onClick={() => navigate(ROUTERS.USER.PRODUCTS)}
                >
                    Quay lại cửa hàng
                </button>
            </div>
        </div>
    );
};

export default memo(OrderFailPage);
