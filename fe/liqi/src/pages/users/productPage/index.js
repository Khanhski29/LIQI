import { memo, useMemo, useState, useEffect, useRef } from "react";
import "./style.scss";
import Title from "../theme/title";
import { formatter } from 'utils/formatter';
import { calcInstallment } from 'utils/installment';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../theme/breadcrumb";
import { IoDiamond } from "react-icons/io5";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { GrContactInfo } from "react-icons/gr";
import { ROUTERS } from "utils/router";
import { useGetProductUS } from "api/homepage";
import ReviewsSection from "../theme/reviewsSection";


const PAYMENT_TYPES = {
    FULL: "full",
    INSTALLMENT: "installment",
};

const MONTH_OPTIONS = [1, 3, 6, 9, 12];
const DOWN_PAYMENT_OPTIONS = [30, 50, 70];

const ProductPage = () => {

    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [paymentType, setPaymentType] = useState(PAYMENT_TYPES.FULL);
    const [months, setMonths] = useState(3);
    const [downPayment, setDownPayment] = useState(50);

    const { id } = useParams();
    const { data: product, isLoading, error } = useGetProductUS(id);

    const isInstallment = paymentType === PAYMENT_TYPES.INSTALLMENT;

    const installment = useMemo(
        () => calcInstallment(product?.price, months, downPayment),
        [product?.price, months, downPayment]
    );

    const handleBuyNow = () => {
        navigate(`/thanh-toan/${id}`, {
            state: {
                payment: isInstallment
                    ? {
                        type: PAYMENT_TYPES.INSTALLMENT,
                        months,
                        downPayment,
                        upfront: installment.upfront,
                        monthly: installment.monthly,
                    }
                    : { type: PAYMENT_TYPES.FULL },
            },
        });
    };



    const location = useLocation();

    const { min, max, page, code } = location.state || {};

    return (
        <div className="container wide product">
            <Title name="Chi Tiết Sản Phẩm" />
            <Breadcrumb name="Chi tiết sản phẩm" id={id} min={min} max={max} page={page} code={code} />

            <div className="product__detail row no-gutters">
                <div className="img col lg-8 md-8 lmd-12 sm-12">
                    <img src={product?.img}
                        onClick={() => setSelectedImage(product?.img)}
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
                            />
                        </div>
                    )}

                </div>

                <div className="detail col lg-4 md-4 lmd-12 sm-12">
                    <p className="name">#{product?.product_code}</p>

                    <div className="option option__1">
                        <button
                            type="button"
                            className={`btn-l${paymentType === PAYMENT_TYPES.FULL ? " active" : ""}`}
                            onClick={() => setPaymentType(PAYMENT_TYPES.FULL)}
                        >
                            Trả hết
                        </button>
                        <button
                            type="button"
                            className={`btn-l${paymentType === PAYMENT_TYPES.INSTALLMENT ? " active" : ""}`}
                            onClick={() => setPaymentType(PAYMENT_TYPES.INSTALLMENT)}
                        >
                            Trả góp
                        </button>
                    </div>

                    <div className={`option option__2${!isInstallment ? " option--dimmed" : ""}`}>
                        {MONTH_OPTIONS.map((m) => (
                            <button
                                key={m}
                                type="button"
                                className={`btn-l${months === m ? " active" : ""}`}
                                onClick={() => setMonths(m)}
                                disabled={!isInstallment}
                            >
                                {m} tháng
                            </button>
                        ))}
                    </div>

                    <div className={`option option__3${!isInstallment ? " option--dimmed" : ""}`}>
                        {DOWN_PAYMENT_OPTIONS.map((pct) => (
                            <button
                                key={pct}
                                type="button"
                                className={`btn-l${downPayment === pct ? " active" : ""}`}
                                onClick={() => setDownPayment(pct)}
                                disabled={!isInstallment}
                            >
                                {pct}%
                            </button>
                        ))}
                    </div>

                    {isInstallment ? (
                        <div className="price-row">
                            <p className="price">{formatter(installment.upfront)}</p>
                            <p className="price-monthly">
                                <span>Trả hàng tháng</span>
                                <strong>{formatter(installment.monthly)}</strong>
                            </p>
                        </div>
                    ) : (
                        <p className="price">{formatter(product?.price)}</p>
                    )}

                    <button className="buy btn-l" onClick={handleBuyNow}>
                        {isInstallment ? "Thanh toán" : "Mua ngay"}
                    </button>


                </div>


                <div className="col lg-12 md-12 lmd-12 sm-12">
                    <div className="box__service row no-gutters">
                        <div className="item col lg-6 md-6 lmd-2 sm-6">
                            <IoDiamond />
                            <div>
                                <p>Đặt uy tín lên hàng đầu</p>
                            </div>
                        </div>

                        <div className="item col lg-6 md-6 lmd-2 sm-6">
                            <RiCustomerService2Fill />
                            <div>
                                <p>Hỗ trợ 24/7</p>
                                {/* <p>Liên hệ: 0123456789</p> */}
                            </div>
                        </div>

                        <div className="item col lg-6 md-6 lmd-2 sm-6">
                            <FaMoneyBillTransfer />
                            <div>
                                <p>Hoàn tiền nếu gặp vấn đề</p>
                                {/* <p>Trải nghiệm dịch vụ tốt nhất</p> */}
                            </div>
                        </div>

                        <div className="item col lg-6 md-6 lmd-2 sm-6">
                            <GrContactInfo />
                            <div>
                                <p>Thay thông tin nhanh chóng</p>
                                {/* <p>Thay mail, đổi số, đổi avt</p> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about col lg-12 md-12 lmd-12 sm-12">
                    <p>Chi tiết thông tin</p>
                    <p>{product?.description}</p>
                </div>
            </div>

            <ReviewsSection />
        </div>
    )

};

export default memo(ProductPage);