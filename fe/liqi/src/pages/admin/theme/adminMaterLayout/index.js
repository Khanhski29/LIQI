import { memo } from "react";
import Footer from "pages/users/theme/footer";
import { useLocation } from "react-router-dom";
import { ROUTERS } from "utils/router";
 
const AdminMaterLayout = ({children, ...props}) => {

    const location = useLocation();

    const isLoginPage = location.pathname.startsWith(ROUTERS.ADMIN.LOGIN);

    return (
    <div {...props}>
        {children}

        { !isLoginPage && <Footer/> }
    </div>
    ) 
    
}

export default memo(AdminMaterLayout);