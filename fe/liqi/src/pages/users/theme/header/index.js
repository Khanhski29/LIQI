
import { memo } from 'react';
import "./style.scss"
import { Link } from 'react-router-dom'

const Header = () =>{
    return <div className="header__top">
        <div className='row'>
            <div className='col-6 header__top_left'>
                <ul>
                    <li>
                        <Link to={""} >
                            LOGO
                        </Link>
                    </li>

                    <li>
                        <Link to={""} >
                            Giới Thiệu
                        </Link>
                    </li>

                    <li>
                        <Link to={""} >
                            Cửa Hàng
                        </Link>
                    </li>

                    <li>
                        <Link to={""} >
                            Dịch Vụ
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='col-6 header__top_right'>
                <ul>
                    <li>
                        <Link to={""} >
                            Đăng Nhập
                        </Link>
                    </li>
                    <li>
                        <Link to={""} >
                            Đăng Ký
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
}

export default memo(Header);