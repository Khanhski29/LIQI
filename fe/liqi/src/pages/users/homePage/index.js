import { memo } from "react";
import "./style.scss"

import img1 from '../../../components/pictures/p1.png';
import img2 from '../../../components/pictures/p2.png';
import img3 from '../../../components/pictures/p3.png';
import card1 from '../../../components/pictures/slide/gojo.jpg';
import card2 from '../../../components/pictures/slide/hay.jpg';
import card3 from '../../../components/pictures/slide/nak.jpg';
import card4 from '../../../components/pictures/slide/tel.jpg';
import card5 from '../../../components/pictures/slide/tv.jpg';
import card6 from '../../../components/pictures/slide/tulen.jpg';
import card7 from '../../../components/pictures/slide/nk.jpg';


const HomePage = () => {
    return (
        
        <div className="container wide homepage">
            <div className="slider">
                <div className="slider__track">
                    <div className="card"><img src={card1}/></div>
                    <div className="card"><img src={card2}/></div>
                    <div className="card"><img src={card3}/></div>
                    <div className="card"><img src={card4}/></div>
                    <div className="card"><img src={card5}/></div>
                    <div className="card"><img src={card6}/></div>
                    <div className="card"><img src={card7}/></div>
                    {/*  */}
                    <div className="card"><img src={card1}/></div>
                    <div className="card"><img src={card2}/></div>
                    <div className="card"><img src={card5}/></div>
                    <div className="card"><img src={card3}/></div>
                    <div className="card"><img src={card6}/></div>
                    <div className="card"><img src={card4}/></div>
                    <div className="card"><img src={card7}/></div>
                    
                </div>

                
                <div className="slider__text">
                    <p>LiQi Shop</p>
                    <p>Shop acc liên quân uy tín - giá rẻ - an toàn. Đa dạng lựa chọn, tìm acc theo yêu cầu, giao lưu lên đời và trả góp 0%.</p>
                </div>
            </div>

            <div className="content">
                <div className="container block block1">
                    <div className="row">
                        <div className="col lg-8 md-6 lmd-6 sm-8 text">
                            <p>Tại Sao Là LiQi Shop</p>
                            <p>-Mức giá hợp lý để sở hữu skin hot nhất</p>
                            <p>-Đổi thông tin an toàn cho khách</p>
                            <p>-dịch vụ trả góp, trả trước 50% là log acc chơi</p>
                            <button className="btn-l">Mua Ngay</button>
                        </div>
                        <div className="col lg-4 md-6 lmd-6 sm-4 picture">
                            <img src={img2} />
                        </div>
                    </div>
                </div>
                
                <div className="container block block2">
                    <div className="row">
                        <div className="col lg-4 md-6 lmd-6 sm-4 picture">
                            <img src={img1} />
                        </div>
                        <div className="col lg-8 md-6 lmd-6 sm-8 text">
                            <p>Shop có thu lại acc không ?</p>
                            <p>-Tất nhiên là có</p>
                            <p>-Thu lại acc giá tốt trên 50%</p>
                            <button className="btn-l">Bán Ngay</button>
                        </div>
                        
                    </div>
                </div>

                <div className="container block block3">
                    <div className="row">
                        <div className="col lg-8 md-6 lmd-6 sm-8 text">
                            <p>Hợp tác với chúng tôi</p>
                            <p>-Trở thành người bán acc</p>
                            <p>-Có hỗ trợ bảo kê uy tín</p>
                            <p>-Giới thiệu khách hàng và nhận hoa hồng</p>
                            <button className="btn-l">Đăng Ký Ngay</button>
                        </div>
                        <div className="col lg-4 md-6 lmd-6 sm-4 picture">
                            <img src={img3} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )   
   
}

export default memo(HomePage);