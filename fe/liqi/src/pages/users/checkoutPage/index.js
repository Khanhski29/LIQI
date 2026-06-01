import { memo, useMemo, useState } from "react";
import "./style.scss";
import Title from "../theme/title";
import { formatter } from "utils/formatter";
import { calcInstallment } from "utils/installment";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useGetProductUS } from "api/homepage";
import { useCreateOrderUS } from "api/orders";
import { useCreatePaymentUS } from "api/payments";

const PAYMENT_TYPES = {
    FULL: "full",
    INSTALLMENT: "installment",
};

const CheckoutPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const paymentSelection = location.state?.payment ?? { type: PAYMENT_TYPES.FULL };

    const authUser = (() => {
        try { return JSON.parse(localStorage.getItem("auth_user")); } catch { return null; }
    })();
    const isLoggedIn = !!localStorage.getItem("auth_token") && authUser?.role === "user";

    const { data: product, isLoading, error } = useGetProductUS(id);

    const isInstallment = paymentSelection.type === PAYMENT_TYPES.INSTALLMENT;

    const installment = useMemo(() => {
        if (!isInstallment || !product?.price) return null;
        return calcInstallment(
            product.price,
            paymentSelection.months,
            paymentSelection.downPayment
        );
    }, [isInstallment, product?.price, paymentSelection.months, paymentSelection.downPayment]);

    const [selectedImage, setSelectedImage] = useState(null);
    const [form, setForm] = useState({
        name:  isLoggedIn ? (authUser?.name  || "") : "",
        phone: isLoggedIn ? (authUser?.phone || "") : "",
        email: isLoggedIn ? (authUser?.email || "") : "",
    });
    const [formError, setFormError] = useState("");

    const { mutate: createPayment, isPending: isCreatingPayment } = useCreatePaymentUS({
        onSuccess: (data) => {
            navigate(`/thanh-toan-qr/${data.order_id}`, {
                state: { paymentInfo: data },
            });
        },
        onError: () => {
            setFormError("Tạo link thanh toán thất bại, vui lòng thử lại.");
        },
    });

    const { mutate: createOrder, isPending: isCreatingOrder } = useCreateOrderUS({
        onSuccess: (data) => {
            createPayment({
                order_id:     data.order_id,
                cancel_token: data.cancel_token,
            });
        },
        onError: (error) => {
            const msg =
                error?.response?.data?.message ||
                "Đặt hàng thất bại, vui lòng thử lại.";
            setFormError(msg);
        },
    });

    const isPending = isCreatingOrder || isCreatingPayment;

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");

        if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
            setFormError("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        createOrder({
            product_id: Number(id),
            name: form.name.trim(),
            phone: form.phone.trim(),
            email: form.email.trim(),
            payment_type: paymentSelection.type,
            ...(isInstallment && installment && {
                installment_months: paymentSelection.months,
                installment_down_payment_pct: paymentSelection.downPayment,
                installment_upfront: installment.upfront,
                installment_monthly: installment.monthly,
                installment_total: installment.total,
            }),
        });
    };

    if (isLoading) {
        return (
            <div className="checkout container wide">
                <Title name="Thanh Toán" />
                <p className="checkout__loading">Đang tải thông tin sản phẩm...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="checkout container wide">
                <Title name="Thanh Toán" />
                <p className="checkout__error">Không tìm thấy sản phẩm. Vui lòng thử lại.</p>
            </div>
        );
    }

    return (
        <div className="checkout container wide">
            <Title name="Thanh Toán" />
            <div className="row">
                {/* Thông tin acc */}
                <div className="info col lg-6 md-6 lmd-12 sm-12">
                    <p className="checkout__sub__title">Thông tin acc</p>

                    <div className="row infomation">
                        <div className="img col lg-4 md-6 lmd-6 sm-6">
                            <img
                                src={product.img}
                                alt={product.product_code}
                                onClick={() => setSelectedImage(product.img)}
                                style={{ cursor: "pointer" }}
                            />

                            {selectedImage && (
                                <div
                                    className="overlay"
                                    onClick={() => setSelectedImage(null)}
                                >
                                    <img
                                        src={selectedImage}
                                        className="overlay-img"
                                        onClick={(e) => e.stopPropagation()}
                                        alt="preview"
                                    />
                                </div>
                            )}
                        </div>

                        <p className="col lg-2 md-2 lmd-2 sm-12">#{product.product_code}</p>
                        <p className="price col lg-2 md-2 lmd-2 sm-12">{formatter(installment.upfront)}</p>
                    </div>
                </div>

                <div className="checkout__option col lg-6 md-6 lmd-12 sm-12">
                    <div className="checkout__option__container">
                        <p className="checkout__sub__title">Hình thức</p>
                        <div className="checkout__payment-info">
                            <p className="checkout__payment-type">
                                {isInstallment ? "Trả góp" : "Trả hết"}
                            </p>
                            {isInstallment && installment ? (
                                <div className="checkout__installment-detail">
                                    <p className="checkout__installment-term">
                                        {paymentSelection.months} tháng · Trả trước {paymentSelection.downPayment}%
                                    </p>
                                    <div className="checkout__price-line">
                                        <span>Trả trước</span>
                                        <strong>{formatter(installment.upfront)}</strong>
                                    </div>
                                    <div className="checkout__price-line">
                                        <span>Hàng tháng trả</span>
                                        <strong>{formatter(installment.monthly)}</strong>
                                    </div>
                                </div>
                            ) : (
                                <p className="checkout__full-price">{formatter(product.price)}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Thông tin thanh toán */}
                <div className="info__user col lg-12 md-12 lmd-12 sm-12">
                    <p className="checkout__sub__title">Thông tin thanh toán</p>

                    <form onSubmit={handleSubmit}>
                        <div className="form__user row">
                            <div className="col lg-4 md-4 lmd-4 sm-12">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nhập họ tên"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col lg-4 md-4 lmd-4 sm-12">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Số điện thoại"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col lg-4 md-4 lmd-4 sm-12">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Nhập email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {formError && (
                            <p className="checkout__form__error">{formError}</p>
                        )}

                        <div className="button__payment col lg-12 md-12 lmd-12 sm-12">
                            <button
                                type="submit"
                                className="btn-l"
                                disabled={isPending}
                            >
                                {isPending
                                    ? "Đang đặt hàng..."
                                    : isInstallment
                                        ? "Thanh toán"
                                        : "Đặt Hàng"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default memo(CheckoutPage);
