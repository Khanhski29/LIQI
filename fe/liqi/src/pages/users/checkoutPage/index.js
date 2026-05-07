import { memo, useState } from "react";
import "./style.scss";
import Title from "../theme/title";
import { formatter } from "utils/formatter";
import img1 from "../../../components/IMG_20260420_142143-7h.webp";

const CheckoutPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="checkout container wide">
            <Title name="Thanh Toán"/>
            <div className="row ">
                {/* thông tin acc */}
                <div className="info col lg-6">
                    <p className="info__title">Thông tin acc</p>
                    
                    <div className="row infomation">
                        <div className="img col lg-4"> 
                            <img src={img1} 
                                onClick={() => setSelectedImage(img1)} 
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
                        <p className="col lg-2">ID</p>
                        <p className="col lg-2">{formatter(200000)}</p>
                    </div>
                </div>

                {/* hình thức thanh toán  */}
                <div className="form col lg-6">
                    <p className="form__title">Hình thức</p>
                    
                    <div className="formality">
                        <div className="option__1 option">
                            <button className="btn-l">Trả góp</button>
                            <button className="btn-l">Trả tất</button>
                        </div>

                        <div className="option__2 option">
                            <button className="btn-l">3 tháng</button>
                            <button className="btn-l">6 tháng</button>
                            <button className="btn-l">9 tháng</button>
                        </div>
                        <p className="">Mọi thông tin trả góp sẽ được gửi qua email của bạn.</p>
                    </div>

                </div>


                {/* thông tin thanh toán */}
                <div className="info__user col lg-12">
                    <p className="info__user__title">Thông tin thanh toán</p>
                    
                    <div className="form__user row">
                        <div className="col lg-4">
                            <input type="text" name="name" placeholder="Nhập họ tên"/>
                        </div>

                        <div className="col lg-4">
                            <input type="tel" name="phone" placeholder="Số điện thoại"/>
                        </div>

                        <div className="col lg-4">
                            <input type="email" name="email" placeholder="Nhập email"/>
                        </div>
                    </div>
                </div>
                
                <div className="button__payment col lg-12">
                    <button className="btn-l ">Đặt Hàng</button>
                </div>

            </div>
        </div>
    );
};

export default memo(CheckoutPage);