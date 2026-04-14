
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
                <div className='col lg-1 md-1 lmd-1 sm-4 header__logo'>
                    <Link to="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="39" viewBox="0 0 33 39" fill="none">
                            <g filter="url(#filter0_d_210_180)">
                            <path d="M16.7116 9.25911H9.48485V23.4696C9.48485 24.8192 9.78426 25.9528 10.3831 26.8704C10.9819 27.7611 11.853 28.5574 12.9962 29.2591H7.40255C6.53153 29.2591 5.71494 29.0972 4.95279 28.7733C4.21786 28.4494 3.56459 28.0175 2.99298 27.4777C2.44859 26.9109 2.01308 26.2632 1.68644 25.5344C1.35981 24.7787 1.19649 23.969 1.19649 23.1053V7.19433C1.19649 6.35762 1.35981 5.5614 1.68644 4.80567C2.01308 4.04993 2.44859 3.40216 2.99298 2.86235C3.56459 2.29555 4.21786 1.8502 4.95279 1.52631C5.71494 1.20243 6.53153 1.04049 7.40255 1.04049H18.7939C19.6377 1.04049 20.4407 1.20243 21.2029 1.52631C21.965 1.8502 22.6183 2.29555 23.1627 2.86235C23.7343 3.40216 24.1834 4.04993 24.51 4.80567C24.8367 5.5614 25 6.35762 25 7.19433V23.1053C25 24.6977 24.4828 26.0607 23.4485 27.1943L25 31H15.6092L14.7518 28.9352C13.3909 28.4764 12.3429 27.7072 11.608 26.6275C10.873 25.5209 10.5056 24.2794 10.5056 22.9028V21.0405H16.7116V9.25911Z" fill="white"/>
                            <path d="M12.7589 29.2591H7.20606C6.33503 29.2591 5.51845 29.0972 4.7563 28.7733C4.02137 28.4494 3.3681 28.0175 2.79649 27.4777C2.2521 26.9109 1.81659 26.2632 1.48995 25.5344C1.16332 24.7787 1 23.969 1 23.1053V1H9.28836V23.3482C9.28836 24.7517 9.56055 25.9123 10.1049 26.83C10.6766 27.7476 11.5612 28.5574 12.7589 29.2591ZM21.7005 29.2591H16.311C15.5216 29.2591 14.7595 29.0972 14.0246 28.7733C13.3169 28.4224 12.6908 27.9771 12.1464 27.4372C11.602 26.8974 11.1529 26.2767 10.799 25.5749C10.4724 24.8462 10.3091 24.0904 10.3091 23.3077V21.0405H21.7005V29.2591Z" fill="#C8AA6E"/>
                            <path d="M9.78809 0.5V0.540039H18.7939C19.7036 0.54004 20.5733 0.715733 21.3984 1.06641C22.2192 1.41523 22.9298 1.89762 23.5234 2.51562H23.5225C24.1376 3.10097 24.6197 3.79981 24.9688 4.60742C25.3229 5.42683 25.5 6.29054 25.5 7.19434V23.1055C25.5 24.7072 25.0084 26.1091 24.0264 27.29L25.4629 30.8115L25.7441 31.5H15.2754L15.1475 31.1914L14.5527 29.7588H7.20605C6.27137 29.7588 5.38772 29.5849 4.56055 29.2334L4.55469 29.2305C3.7687 28.8841 3.06711 28.4207 2.45312 27.8408L2.44434 27.833L2.43555 27.8242C1.85078 27.2154 1.38293 26.5195 1.0332 25.7393L1.03125 25.7324C0.67631 24.9111 0.500026 24.0338 0.5 23.1055V0.5H9.78809ZM14.4785 29.582L14.4287 29.4619C14.3101 29.4235 14.1924 29.3808 14.0752 29.335L14.4785 29.582ZM10.5859 26.2256C10.6519 26.3518 10.7215 26.4744 10.7979 26.5918L11.0166 26.8955C11.0422 26.9287 11.0702 26.9602 11.0967 26.9932C10.9118 26.7492 10.742 26.4932 10.5859 26.2256ZM9.98438 20.54H16.2119V9.75879H9.98438V20.54Z" stroke="white"/>
                            </g>
                            <defs>
                            <filter id="filter0_d_210_180" x="0" y="0" width="32.4875" height="39" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="3" dy="4"/>
                            <feGaussianBlur stdDeviation="1.5"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_210_180"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_210_180" result="shape"/>
                            </filter>
                            </defs>
                        </svg>
                    </Link>
                </div>

                {/* menu */}
                <div className='col lg-5 md-5 lmd-8 sm-4'>
                    <nav className='header__menu'>
                        <ul className='row no-gutters'>
                            {menus?.map((menu, menuKey) => (
                                <li key={menuKey} className='col lg-4 md-4 lmd-3 sm-0'>
                                    <Link to={menu?.path} > {menu?.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* authentication */}
                <div className='col lg-6 md-6 lmd-3 sm-4 header__authentication'>
                    <ul className='row no-gutters'>
                        <li className='col lg-o-6 lg-3 md-o-5 md-3 lmd-12 sm-12'>
                            <Link to="#" >Đăng Nhập</Link>
                        </li>
                        <li className='col lg-3 md-3 lmd-0 sm-0'>
                            <Link to="#" >Đăng Ký</Link>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default memo(Header);