import { memo } from 'react';
import "./style.scss"
import { Link } from 'react-router-dom';
import { FaFacebook , FaTiktok , FaYoutube , FaInstagram , FaPhoneFlip , FaClock , FaMapLocationDot } from "react-icons/fa6";
import { SiZalo } from "react-icons/si";

const Footer = () =>{
    return (
        <div className='container wide footer__bot'>
            <div className='row'>
                <div className='col lg-4'>
                    <div className='row footer__left'>
                        <div className='col lg-12 logo'>LOGO</div>
                        <div className='col lg-12 social'>
                            <ul className='row'>
                                <li className='col lg-1'>
                                    <Link to=""> <FaFacebook /> </Link>
                                </li>

                                <li className='col lg-1'>
                                    <Link to=""> <FaTiktok/> </Link>
                                </li>

                                <li className='col lg-1'>
                                    <Link to=""> <SiZalo/> </Link>
                                </li>

                                <li className='col lg-1'>
                                    <Link to=""> <FaYoutube/> </Link>
                                </li>

                                <li className='col lg-1'>
                                    <Link to=""> <FaInstagram/> </Link>
                                </li>
                                
                            </ul>
                        </div>
                        <div className='col lg-12 para'>prod@0.1.1 <br/>© 2026 LiQi Studio, LLC</div>
                    </div>
                </div>
                <div className='col lg-8'>
                    <div className='row footer__right'>

                        <div className='col lg-4'>
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

                        <div className='col lg-4'>
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
                
                        <div className='col lg-4'>
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
            </div>
        </div>
    )
}

export default memo(Footer);