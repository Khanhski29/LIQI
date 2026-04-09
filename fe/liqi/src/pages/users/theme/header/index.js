
import { memo } from 'react';
import "./style.scss"
import { Link } from 'react-router-dom'
import { ROUTERS } from "../../../../utils/router";
import React, { useState } from "react";

const Header = () =>{

    const [menus, setMenus] = useState([
        {
            name: "Giới Thiệu",
            path: ROUTERS.USER.HOME
        },
        {
            name: "Cửa Hàng",
            path: ROUTERS.USER.PRODUCTS
        },
        {
            name: "Dịch Vụ",
            path: ROUTERS.USER.SERVICE
        }
    ]);



    return (
        <div className='container wide header__top'>
            <div className='row'>
                {/* logo */}
                <div className='col lg-1 md-1 sm-4 header__logo'>
                    <Link to="">LOGO</Link>
                </div>

                {/* menu */}
                <div className='col lg-5 md-5 sm-4'>
                    <nav className='header__menu'>
                        <ul className='row no-gutters'>
                            {menus?.map((menu, menuKey) => (
                                <li key={menuKey} className='col lg-4 md-4 sm-0'>
                                    <Link to={menu?.path} > {menu?.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* authentication */}
                <div className='col lg-6 md-6 sm-4 header__authentication'>
                    <ul className='row no-gutters'>
                        <li className='col lg-o-6 lg-3 md-o-5 md-3 sm-12'>
                            <Link to="#" >Đăng Nhập</Link>
                        </li>
                        <li className='col lg-3 md-3 sm-0'>
                            <Link to="#" >Đăng Ký</Link>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default memo(Header);