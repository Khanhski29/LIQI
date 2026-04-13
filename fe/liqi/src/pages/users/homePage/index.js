import { memo } from "react";
import "./style.scss"

const HomePage = () => {
    return (
        
        <div className="container wide homepage">
            <div className="slider">
                
            </div>

            <div className="content">
                <div className="container block block1">
                    <div className="row">
                        <div className="col lg-8 text">
                            <p>Tại Sao Là LiQi Shop</p>
                            <p>-Mức giá hợp lý để sở hữu skin hot nhất</p>
                            <p>-Đổi thông tin an toàn cho khách</p>
                            <p>-dịch vụ trả góp, trả trước 50% là log acc chơi</p>
                            <button>Mua Ngay</button>
                        </div>
                        <div className="col lg-4 picture">
                            <img src="https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/1d62a3751be9d7abfce84da8ca89be7d79f07fed-1232x1232.png?accountingTag=VAL&auto=format&fit=fill&q=80&w=1232"></img>
                        </div>
                    </div>
                </div>
                
                <div className="container block block2">
                    <div className="row">
                        <div className="col lg-4 picture">
                            <img src="https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/1d62a3751be9d7abfce84da8ca89be7d79f07fed-1232x1232.png?accountingTag=VAL&auto=format&fit=fill&q=80&w=1232"></img>
                        </div>
                        <div className="col lg-8 text">
                            <p>Shop có thu lại acc không ?</p>
                            <p>-Tất nhiên là có</p>
                            <p>-Thu lại acc giá tốt trên 50%</p>
                            <button>Bán Ngay</button>
                        </div>
                        
                    </div>
                </div>

                <div className="container block block3">
                    <div className="row">
                        <div className="col lg-8 text">
                            <p>Hợp tác với chúng tôi</p>
                            <p>-Trở thành người bán acc</p>
                            <p>-Có hỗ trợ bảo kê uy tín</p>
                            <p>-Giới thiệu khách hàng và nhận hoa hồng</p>
                            <button>Đăng Ký Ngay</button>
                        </div>
                        <div className="col lg-4 picture">
                            <img src="https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/1d62a3751be9d7abfce84da8ca89be7d79f07fed-1232x1232.png?accountingTag=VAL&auto=format&fit=fill&q=80&w=1232"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
   
}

export default memo(HomePage);