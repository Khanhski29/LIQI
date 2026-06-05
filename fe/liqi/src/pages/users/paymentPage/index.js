import { memo, useEffect, useState, useRef } from "react";
import "./style.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { formatter } from "utils/formatter";
import { ROUTERS } from "utils/router";
import { useOrderStatusUS } from "api/orders";
import { useCancelPaymentUS } from "api/payments";
import Title from "../theme/title";

const BANK_NAME_MAP = {
    "970422": "MB Bank",
    "970436": "Vietcombank",
    "970415": "Vietinbank",
    "970418": "BIDV",
    "970405": "Agribank",
    "970432": "VPBank",
    "970423": "TPBank",
    "970407": "Techcombank",
};

const PaymentPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const paymentInfo = location.state?.paymentInfo;
    const cancelToken = paymentInfo?.cancel_token;

    const TIMEOUT = 5 * 60;
    const [timeLeft, setTimeLeft] = useState(TIMEOUT);
    const timerRef = useRef(null);

    const navigateToFail = () => {
        navigate(`/thanh-toan-that-bai/${orderId}`, { replace: true, state: { cancelToken } });
    };

    const { mutate: cancelPayment } = useCancelPaymentUS({
        onSettled: () => navigateToFail(),
    });

    const { data: statusData } = useOrderStatusUS(
        orderId,
        cancelToken,
        {
            refetchInterval: (data) => {
                if (data?.payment_status === "done" || data?.payment_status === "cancel") {
                    return false;
                }
                return 3000;
            },
        }
    );

    useEffect(() => {
        if (statusData?.payment_status === "done") {
            clearInterval(timerRef.current);
            navigate(`/dat-hang-thanh-cong/${orderId}`, { replace: true });
        }
        if (statusData?.payment_status === "cancel") {
            clearInterval(timerRef.current);
            navigate(`/thanh-toan-that-bai/${orderId}`, { replace: true, state: { cancelToken } });
        }
    }, [statusData, orderId, navigate]);

    // Countdown timer
    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        cancelPayment({ order_id: Number(orderId), cancel_token: cancelToken });
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [orderId]);

    const handleCancel = () => {
        clearInterval(timerRef.current);
        cancelPayment({ order_id: Number(orderId), cancel_token: cancelToken });
    };

    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        return `${m}:${s}`;
    };

    if (!paymentInfo) {
        return (
            <div className="payment-page container wide">
                <p className="payment-page__error">Không tìm thấy thông tin thanh toán.</p>
            </div>
        );
    }

    const bankName = BANK_NAME_MAP[paymentInfo.bin] || `Bank (${paymentInfo.bin})`;

    return (
        <div className="payment-page container wide">
            <div className="payment-page__box">
                <h2 className="payment-page__title">Quét mã QR để thanh toán</h2>
                {/* <Title name="Quét mã QR để thanh toán" /> */}

                <div className="payment-page__qr">
                    <QRCodeSVG
                        value={paymentInfo.qr_code}
                        size={220}
                        level="M"
                    />
                </div>

                <div className="payment-page__info">
                    <div className="payment-page__info__row">
                        <span>Ngân hàng</span>
                        <strong>{bankName}</strong>
                    </div>
                    <div className="payment-page__info__row">
                        <span>Số tài khoản</span>
                        <strong>{paymentInfo.account_number}</strong>
                    </div>
                    <div className="payment-page__info__row">
                        <span>Tên tài khoản</span>
                        <strong>{paymentInfo.account_name}</strong>
                    </div>
                    <div className="payment-page__info__row">
                        <span>Số tiền</span>
                        <strong className="payment-page__amount">
                            {formatter(paymentInfo.amount)}
                        </strong>
                    </div>
                    <div className="payment-page__info__row">
                        <span>Nội dung CK</span>
                        <strong className="payment-page__desc">
                            {paymentInfo.description}
                        </strong>
                    </div>
                </div>

                <div className="payment-page__status">
                    <span className="payment-page__spinner" />
                    Đang chờ thanh toán...
                </div>

                <div className={`payment-page__countdown ${timeLeft <= 60 ? "payment-page__countdown--warn" : ""}`}>
                    Hết hạn sau: <strong>{formatTime(timeLeft)}</strong>
                </div>

                <button
                    className="btn-l payment-page__cancel"
                    onClick={handleCancel}
                >
                    Hủy đơn hàng
                </button>
            </div>
        </div>
    );
};

export default memo(PaymentPage);
