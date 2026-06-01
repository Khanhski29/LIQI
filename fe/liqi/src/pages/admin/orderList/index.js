import { memo, useState } from "react";
import "./style.scss";
import { formatter } from "utils/formatter";
import { useSearchParams } from "react-router-dom";
import { useGetOrdersUS } from "api/orders";
import { revokeInstallmentOrderAPI } from "api/installments/request";

const STATUS_LABEL = {
    pending:       { text: "Chờ thanh toán", cls: "status--pending" },
    done:          { text: "Đã thanh toán",  cls: "status--done" },
    cancel:        { text: "Đã hủy",         cls: "status--cancel" },
    refund_needed: { text: "Cần hoàn tiền",  cls: "status--refund" },
};

const INSTALLMENT_STATUS_LABEL = {
    active:    { text: "Đang trả góp", cls: "status--pending" },
    completed: { text: "Hoàn tất",     cls: "status--done" },
    defaulted: { text: "Đã back acc",  cls: "status--cancel" },
};

const OrderList = ({ status, paymentType, installmentStatus, showInstallmentActions }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [actionMsg, setActionMsg] = useState("");

    const page = Number(searchParams.get("page")) || 1;

    const { data, isLoading, error, refetch } = useGetOrdersUS({
        page,
        status,
        payment_type: paymentType,
        installment_status: installmentStatus,
    });

    const orders     = data?.data         || [];
    const totalPages = data?.last_page    || 1;

    const getPagination = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }
        if (page <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
        if (page >= totalPages - 3)
            return [1, "...", totalPages-4, totalPages-3, totalPages-2, totalPages-1, totalPages];
        return [1, "...", page-2, page-1, page, page+1, page+2, "...", totalPages];
    };

    if (isLoading) return <p className="order__list__msg">Đang tải...</p>;
    if (error)     return <p className="order__list__msg">Lỗi tải dữ liệu, vui lòng thử lại.</p>;
    if (!orders.length) return <p className="order__list__msg">Chưa có đơn hàng nào.</p>;

    const handleRevoke = async (orderId) => {
        if (!window.confirm("Xác nhận back acc cho đơn này?")) return;
        try {
            await revokeInstallmentOrderAPI(orderId);
            setActionMsg("Đã back acc.");
            refetch();
        } catch {
            setActionMsg("Thao tác thất bại.");
        }
    };

    return (
        <div className="order__list">
            {actionMsg && <p className="order__list__msg">{actionMsg}</p>}
            {orders.map((item) => {
                const statusInfo = STATUS_LABEL[item.payment_status] || { text: item.payment_status, cls: "" };
                const instInfo = INSTALLMENT_STATUS_LABEL[item.installment_status];
                const isInstallment = item.payment_type === "installment";
                const paymentLabel = isInstallment
                    ? `Trả góp ${item.installment_paid_periods || 0}/${item.installment_months || 0} kỳ`
                    : "Trả hết";

                return (
                    <div key={item.id} className="order__card-item">
                        <img
                            src={item.snapshot_img}
                            alt={item.product_code}
                            onClick={() => setSelectedImage(item.snapshot_img)}
                            className="order__card-item-img"
                        />
                        {selectedImage && (
                            <div className="overlay__card" onClick={() => setSelectedImage(null)}>
                                <img
                                    src={selectedImage}
                                    className="overlay__card-img"
                                    onClick={(e) => e.stopPropagation()}
                                    alt="preview"
                                />
                            </div>
                        )}
                        <p className="order__card-item--g order__card-item-id">#{item.id}</p>
                        <p className="order__card-item--g order__card-item-id">{item.product_code}</p>
                        <p className="order__card-item--g order__card-item-price">{formatter(item.snapshot_price)}</p>

                        <p className="order__card-item--g order__card-item-user">{item.user_name}</p>
                        <p className="order__card-item--g order__card-item-user">{item.user_phone}</p>
                        <p className="order__card-item--g order__card-item-user">{item.user_email}</p>

                        <p className="order__card-item--g order__card-item-type">{paymentLabel}</p>
                        {isInstallment && instInfo && (
                            <p className={`order__card-item--g order__card-item-status ${instInfo.cls}`}>
                                {instInfo.text}
                            </p>
                        )}
                        {isInstallment && item.installment_next_due && (
                            <p className="order__card-item--g order__card-item-user">
                                Kỳ tiếp: {formatter(item.installment_next_amount)} · {item.installment_next_due}
                                {item.installment_next_status === "overdue" && " (quá hạn)"}
                            </p>
                        )}
                        {showInstallmentActions && item.installment_status === "active" && item.installment_next_status === "overdue" && (
                            <button
                                type="button"
                                className="order__card-item-revoke"
                                onClick={() => handleRevoke(item.id)}
                            >
                                Back acc
                            </button>
                        )}
                        <p className="order__card-item--g order__card-item-time">{item.created_at}</p>
                        <p className={`order__card-item--g order__card-item-status ${statusInfo.cls}`}>
                            {statusInfo.text}
                        </p>
                    </div>
                );
            })}

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

export default memo(OrderList);
