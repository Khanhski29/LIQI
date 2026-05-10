
import { memo } from 'react';
import "./style.scss"
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTERS } from "../../../../utils/router";
import React from "react";

const AdminSidebar = ({children, ...props}) =>{
    const location = useLocation();
    const navigate = useNavigate();
    
    const navItems = [
        {
            path: ROUTERS.ADMIN.ORDERMANAGER,
            label: "Quản Lý Đơn Hàng",
            onClick: () => navigate(ROUTERS.ADMIN.ORDERMANAGER),
        },
        {
            path: ROUTERS.ADMIN.PRODUCT_MANAGER,
            label: "Quản Lý Sản Phẩm",
            onClick: () => navigate(ROUTERS.ADMIN.PRODUCT_MANAGER),
        },
        {
            path: ROUTERS.ADMIN.LOGOUT,
            label: "Đăng Xuất",
            onClick: () => {},
        }
    ]


    return (
        <div className='sidebar' {...props}>
            <nav className='admin__sidebar'>
            {
                navItems.map(({path, label, onClick}) => (
                    <div 
                    key={path}
                    className={`admin__sidebar-item 
                    ${location.pathname.startsWith(path) ? "admin__sidebar-item--active" : ""}`}
                    onClick={onClick}>
                        <span>{label}</span>
                    </div>
                ))
            }
            </nav>
        </div>
    )
    
}

export default memo(AdminSidebar);