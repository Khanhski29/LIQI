import { memo, useMemo, useState, useEffect, useRef } from "react";
import "./style.scss";
import Title from "../theme/title";
import { formatter } from 'utils/formatter';
import { useLocation, useNavigate, useParams} from "react-router-dom";
import Breadcrumb from "../theme/breadcrumb";
import { IoDiamond } from "react-icons/io5";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { GrContactInfo } from "react-icons/gr";
import { ROUTERS } from "utils/router";
import { useGetProductUS } from "api/homepage";


const ProductPage = () => {

    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    



    const { id } = useParams();
    const { data: product, isLoading, error } = useGetProductUS(id);
    console.log(product);


    const location = useLocation();

    const { min, max, page } = location.state || {};

    return (
        <div className="container wide product">
            <Title name="Chi Tiết Sản Phẩm"/>
            <Breadcrumb name="Chi tiết sản phẩm" id={id} min={min} max={max} page={page} />

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
                    <p className="price">{formatter(product?.price)}</p>
                    <div className="option__1 option">
                        <button className="btn-l">Trả góp</button>
                        <button className="btn-l">Trả tất</button>
                    </div>

                    <div className="option__2 option">
                        <button className="btn-l">3 tháng</button>
                        <button className="btn-l">6 tháng</button>
                        <button className="btn-l">9 tháng</button>
                    </div>

                    <button className="buy btn-l" onClick={() => navigate(ROUTERS.USER.CHECKOUT)}>Mua Ngay</button>

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

                <div className="about col lg-12">
                    <p>Chi tiết thông tin</p>
                    <p>{product?.description}</p>
                </div>
            </div>

        </div>
    )

};

export default memo(ProductPage);