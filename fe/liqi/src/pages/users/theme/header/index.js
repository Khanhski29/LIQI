
import { memo } from 'react';
import "./style.scss"
import { Link } from 'react-router-dom'

const Header = () =>{
    return (
        <div className='container wide header__top'>
            <div className='row'>
                <div className='col lg-6 md-6 header__top_left'>
                    <ul className='row'>
                        <li className='col lg-3 md-3'><a>LOGO</a></li>
                        <li className='col lg-3 md-3'><a>Giới Thiệu</a></li>
                        <li className='col lg-3 md-3'><a>Cửa Hàng</a></li>
                        <li className='col lg-3 md-3'><a>Dịch Vụ</a></li>
                    </ul>
                </div>

                <div className='col lg-6 md-6 header__top_right'>
                    <ul className='row'>
                        <li className='col lg-o-6 lg-3 md-3 md-o-6'><a>Đăng Nhập</a></li>
                        <li className='col lg-3 md-3'><a>Đăng Ký</a></li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default memo(Header);