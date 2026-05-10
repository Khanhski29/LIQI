import { memo } from "react";
import { useLocation } from "react-router-dom";
import { ROUTERS } from "utils/router";
import AdminSidebar from "../adminSidebar";
 
const AdminMaterLayout = ({children, ...props}) => {

    const location = useLocation();

    const isLoginPage = location.pathname.startsWith(ROUTERS.ADMIN.LOGIN);

    return (
    <div {...props}>
        { !isLoginPage && <AdminSidebar/> }
        {children}

    </div>
    ) 
    
}

export default memo(AdminMaterLayout);