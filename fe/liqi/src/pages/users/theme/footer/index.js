import { memo } from 'react';
import "./style.scss"
import { Link } from 'react-router-dom';
import { FaFacebook , FaTiktok , FaYoutube , FaInstagram , FaPhoneFlip , FaClock , FaMapLocationDot } from "react-icons/fa6";
import { SiZalo } from "react-icons/si";

const Footer = () =>{
    return (
        <footer className='container wide footer__bot'>
            <div className='row'>
                <div className='col lg-4 md-4 lmd-12 sm-12'>
                    <div className='row lmd-jcenter sm-jcenter footer__left'>
                        <div className='col lg-3 md-3 lmd-3 sm-3  logo'>LOGO</div>
                        <div className='col lg-12 md-12 lmd-12 sm-12 social'>
                            <ul className='row lmd-jcenter sm-jcenter'>
                                <li className='col lg-1 md-1 lmd-1 sm-2'>
                                    <Link to=""> <FaFacebook /> </Link>
                                </li>

                                <li className='col lg-1 md-1 lmd-1 sm-2'>
                                    <Link to=""> <FaTiktok/> </Link>
                                </li>

                                <li className='col lg-1 md-1 lmd-1 sm-2'>
                                    <Link to=""> <SiZalo/> </Link>
                                </li>

                                <li className='col lg-1 md-1 lmd-1 sm-2'>
                                    <Link to=""> <FaYoutube/> </Link>
                                </li>

                                <li className='col lg-1 md-1 lmd-1 sm-2'>
                                    <Link to=""> <FaInstagram/> </Link>
                                </li>
                                
                            </ul>
                        </div>
                        <div className='col lg-3 md-3 lmd-3 sm-3'>
                            <p>
                                prod@0.1.1 <br/>© 2026 KhanhSki
                            </p>
                        </div>
                    </div>
                </div>
                <div className='col lg-8 md-8 lmd-12 sm-12'>
                    <div className='row footer__right lmd-jcenter sm-jcenter'>

                        <div className='col lg-4 md-4 lmd-4 sm-12'>
                            <span className='title'>Công Ty</span>
                            <ul>
                                <li>
                                    <Link to="" ><FaPhoneFlip/>Điện thoại: 0329675037</Link>
                                </li>

                                <li>
                                    <Link to="" ><FaClock/>Giờ hỗ trợ: 09:00 - 22:00</Link>
                                </li>
                                
                                <li>
                                    <Link to="" ><FaMapLocationDot/>Địa chỉ: Hà Nội</Link>
                                </li>
                            </ul>
                        </div>

                        <div className='col lg-4 md-4 lmd-4 sm-12'>
                            <span className='title'>Luật</span>
                            <ul>
                                <li>
                                    <Link to="" >Chính sách bảo mật</Link>
                                </li>

                                <li>
                                    <Link to="" >Điều khoản sử dụng</Link>
                                </li>
                            </ul>
                        </div>
                
                        <div className='col lg-4 md-4 lmd-4 sm-12'>
                            <span className='title'>Liên Hệ</span>
                            <ul>
                                <li>
                                    <Link to="" >Hỗ trợ khách hàng</Link>
                                </li>

                                <li>
                                    <Link to="" >Hợp tác với chúng tôi</Link>
                                </li>

                                <li>
                                    <Link to="" >Báo cáo sự cố</Link>
                                </li>
                            </ul>
                        </div>


                    </div>
                </div>

                <div className='footer__bot__about lg-12 md-12 lmd-12 sm-12 '>
                    <p>LiQi không liên kết với bất kỳ trò chơi hoặc công ty trò chơi nào. Tất cả sản phẩm ở đây đều được chọn lọc và được bảo kê chọn đời.</p>
                    <p>Shop LiQi Bán Acc Liên Quân Uy tín - Giá Rẻ - An toàn - Tự động. Ở đây có bán acc, thu acc, nạp game, trả góp, giao lưu lên đời, tìm acc theo yêu cầu...</p>
                </div>
            </div>

            
        </footer>
    )
}

export default memo(Footer);