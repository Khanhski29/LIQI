import { memo } from "react";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTERS } from "utils/router";

const OrderSuccessPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    return (
        <div className="order-result container wide">
            <div className="order-result__box">
                <div className="order-result__icon success">✓</div>
                <h2>Đặt hàng thành công!</h2>
                <p>Cảm ơn bạn đã mua hàng tại LIQI Shop.</p>
                <p className="order-result__id">Mã đơn hàng: <strong>#{orderId}</strong></p>
                <p>Thông tin tài khoản sẽ được gửi qua email của bạn sau khi thanh toán được xác nhận.</p>
                <button
                    className="btn-l"
                    onClick={() => navigate(ROUTERS.USER.PRODUCTS)}
                >
                    Tiếp tục mua hàng
                </button>
            </div>
        </div>
    );
};

export default memo(OrderSuccessPage);
