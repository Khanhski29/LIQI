import { Navigate } from "react-router-dom";
import { ROUTERS } from "utils/router";

const ProtectedAdminRoute = ({ children }) => {
    const token = localStorage.getItem("auth_token");
    const user = JSON.parse(localStorage.getItem("auth_user") || "null");

    if (!token || user?.role !== "admin") {
        return <Navigate to={ROUTERS.ADMIN.LOGIN} replace />;
    }

    return children;
};

export default ProtectedAdminRoute;
