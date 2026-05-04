import { memo, useMemo, useState, useEffect, useRef } from "react";
import "./style.scss";
import img1 from "../../../components/IMG_20260420_142143-7h.webp";
import Title from "../theme/title";
import { formatter } from 'utils/formatter';
import { useLocation, useParams} from "react-router-dom";
import Breadcrumb from "../theme/breadcrumb";



const ProductPage = () => {

    const { id } = useParams();
    const location = useLocation();

    const { min, max, page } = location.state || {};

    return (
        <div className="container wide product">
            <Title name="Chi Tiết Sản Phẩm"/>
            <Breadcrumb name="Chi tiết sản phẩm" id={id} min={min} max={max} page={page} />

            <div className="product__detail row">
                <div className="img col lg-6">
                    {/* <img src={img1}/> */}
                </div>
                
                <div className="detail col lg-6">
                    <p className="name">{id}</p>
                    <p className="price">{formatter(200000)}</p>
                    <div className="option__1 option">
                        <button>Trả góp</button>
                        <button>Trả tất</button>
                    </div>

                    <div className="option__2 option">
                        <button>3 tháng</button>
                        <button>6 tháng</button>
                        <button>9 tháng</button>
                    </div>

                    <button className="buy btn-l">Mua Ngay</button>

                    <div className="box__service row">
                        <div className="item col lg-6">
                            <p>Đặt uy tín lên hàng đầu</p>
                        </div>

                        <div className="item col lg-6">
                            <p>Hỗ trợ 24/7</p>
                            <p>Liên hệ: 0123456789</p>
                        </div>
                        
                        <div className="item col lg-6">
                            <p>Hoàn tiền nếu gặp vấn đề</p>
                            <p>Trải nghiệm dịch vụ tốt nhất</p>
                        </div>

                        <div className="item col lg-6">
                            <p>Thay thông tin nhanh chóng</p>
                            <p>Thay mail, đổi số, đổi avt</p>
                        </div>
                    </div>

                </div>

                <div className="about col lg-12">
                    <p>Chi tiết thông tin</p>
                    <p>Chi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tihi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tihi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tihi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tihi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tihi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tihi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tihi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tihi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tihi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tihi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tinChi tiết thông tin</p>
                </div>
            </div>

        </div>
    )

};

export default memo(ProductPage);