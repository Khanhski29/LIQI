import { memo, useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { formatter } from "utils/formatter";
import Title from "../theme/title";
import {
    useCreateInstallmentPaymentUS,
    useGetInstallmentScheduleUS,
    useInstallmentPaymentStatusUS,
} from "api/installments";
import "../paymentPage/style.scss";

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

const InstallmentPayPage = () => {
    const { token } = useParams();
    const [searchParams] = useSearchParams();
    const paidRedirect = searchParams.get("paid") === "1";

    const [paymentInfo, setPaymentInfo] = useState(null);
    const [timeLeft, setTimeLeft] = useState(5 * 60);
    const timerRef = useRef(null);

    const { data: schedule, isLoading, error } = useGetInstallmentScheduleUS(token);

    const { mutate: createPayment, isPending: isCreating } = useCreateInstallmentPaymentUS({
        onSuccess: (data) => setPaymentInfo(data),
    });

    const { data: statusData } = useInstallmentPaymentStatusUS(token, {
        refetchInterval: (data) => (data?.status === "paid" ? false : paymentInfo ? 3000 : false),
    });

    useEffect(() => {
        if (statusData?.status === "paid" || paidRedirect) {
            clearInterval(timerRef.current);
        }
    }, [statusData, paidRedirect]);

    useEffect(() => {
        if (!paymentInfo) return undefined;

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [paymentInfo]);

    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        return `${m}:${s}`;
    };

    if (isLoading) {
        return (
            <div className="payment-page container wide">
                <p className="payment-page__error">Đang tải...</p>
            </div>
        );
    }

    if (error || !schedule) {
        return (
            <div className="payment-page container wide">
                <p className="payment-page__error">Không tìm thấy kỳ trả góp.</p>
            </div>
        );
    }

    if (statusData?.status === "paid" || paidRedirect) {
        return (
            <div className="payment-page container wide">
                <div className="payment-page__box">
                    <Title name="Thanh toán thành công" />
                    <p>Kỳ {schedule.period}/{schedule.total_periods} đã được thanh toán.</p>
                </div>
            </div>
        );
    }

    if (schedule.status === "revoked" || schedule.installment_status === "defaulted") {
        return (
            <div className="payment-page container wide">
                <p className="payment-page__error">Kỳ trả góp này đã bị thu hồi. Vui lòng liên hệ shop.</p>
            </div>
        );
    }

    if (!paymentInfo) {
        return (
            <div className="payment-page container wide">
                <div className="payment-page__box">
                    <Title name="Thanh toán trả góp" />
                    <p>Đơn #{schedule.order_id} · Kỳ {schedule.period}/{schedule.total_periods}</p>
                    <p>Số tiền: <strong>{formatter(schedule.amount)}</strong></p>
                    <p>Hạn trả: {schedule.due_date} (grace đến {schedule.grace_until})</p>

                    {!schedule.can_pay ? (
                        <p className="payment-page__error">
                            Chưa đến hạn thanh toán. Vui lòng quay lại từ ngày {schedule.due_date}.
                        </p>
                    ) : (
                        <button
                            className="btn-l"
                            disabled={isCreating}
                            onClick={() => createPayment(token)}
                        >
                            {isCreating ? "Đang tạo mã QR..." : "Tạo mã QR thanh toán"}
                        </button>
                    )}
                </div>
            </div>
        );
    }

    const bankName = BANK_NAME_MAP[paymentInfo.bin] || `Bank (${paymentInfo.bin})`;

    return (
        <div className="payment-page container wide">
            <div className="payment-page__box">
                <h2 className="payment-page__title">
                    Kỳ {schedule.period}/{schedule.total_periods} – Quét mã QR
                </h2>

                <div className="payment-page__qr">
                    <QRCodeSVG value={paymentInfo.qr_code} size={220} level="M" />
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
                        <strong className="payment-page__amount">{formatter(paymentInfo.amount)}</strong>
                    </div>
                    <div className="payment-page__info__row">
                        <span>Nội dung CK</span>
                        <strong className="payment-page__desc">{paymentInfo.description}</strong>
                    </div>
                </div>

                <div className="payment-page__status">
                    <span className="payment-page__spinner" />
                    Đang chờ thanh toán...
                </div>

                <div className={`payment-page__countdown ${timeLeft <= 60 ? "payment-page__countdown--warn" : ""}`}>
                    Hết hạn sau: <strong>{formatTime(timeLeft)}</strong>
                </div>
            </div>
        </div>
    );
};

export default memo(InstallmentPayPage);
