import { Navigate } from "react-router-dom";
import { ROUTERS } from "utils/router";
import { isAdminLoggedIn } from "utils/authStorage";

const ProtectedAdminRoute = ({ children }) => {
    if (!isAdminLoggedIn()) {
        return <Navigate to={ROUTERS.ADMIN.LOGIN} replace />;
    }

    return children;
};

export default ProtectedAdminRoute;
