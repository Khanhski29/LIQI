import HomePage from "./pages/users/homePage";
import ProfilePage from "./pages/users/profilePage";
import ProductsPage from "./pages/users/productsPage";
import ProductPage from "./pages/users/productPage";
import MaterLayout from "./pages/users/theme/materLayout";
import { ROUTERS, ADMIN_PATH } from "./utils/router";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ServicePage from "pages/users/servicePage";
import CheckoutPage from "pages/users/checkoutPage";
import LoginAdminPage from "pages/admin/loginPage";
import AdminMaterLayout from 'pages/admin/theme/adminMaterLayout';
import OrderManagePage from "pages/admin/orderManagePage";
import ProductManagePage from "pages/admin/productManagePage";
import ProtectedAdminRoute from "pages/admin/protectedRoute";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

const renderUserRouter = () => {
    const userRouters = [
        { path: ROUTERS.USER.HOME,     component: <HomePage /> },
        { path: ROUTERS.USER.PROFILE,  component: <ProfilePage /> },
        { path: ROUTERS.USER.PRODUCTS, component: <ProductsPage /> },
        { path: ROUTERS.USER.PRODUCT,  component: <ProductPage /> },
        { path: ROUTERS.USER.SERVICE,  component: <ServicePage /> },
        { path: ROUTERS.USER.CHECKOUT, component: <CheckoutPage /> },
    ];

    return (
        <MaterLayout>
            <ScrollToTop />
            <Routes>
                {userRouters.map((item, key) => (
                    <Route key={key} path={item.path} element={item.component} />
                ))}
            </Routes>
        </MaterLayout>
    );
};

const renderAdminRouter = () => {
    const protectedRouters = [
        { path: ROUTERS.ADMIN.ORDERMANAGER,                      component: <OrderManagePage /> },
        { path: ROUTERS.ADMIN.PRODUCT_MANAGER,                   component: <ProductManagePage /> },
        { path: ROUTERS.ADMIN.PRODUCT_MANAGER_ADD,               component: <ProductManagePage /> },
        { path: `${ROUTERS.ADMIN.PRODUCT_MANAGER_EDIT}/:id`,     component: <ProductManagePage /> },
    ];

    return (
        <AdminMaterLayout>
            <ScrollToTop />
            <Routes>
                {/* /quan-tri và /quan-tri/ redirect về trang đăng nhập */}
                <Route path={ADMIN_PATH} element={<Navigate to={ROUTERS.ADMIN.LOGIN} replace />} />

                {/* Trang login không cần bảo vệ */}
                <Route path={ROUTERS.ADMIN.LOGIN} element={<LoginAdminPage />} />

                {/* Các trang admin cần đăng nhập */}
                {protectedRouters.map((item, key) => (
                    <Route
                        key={key}
                        path={item.path}
                        element={
                            <ProtectedAdminRoute>
                                {item.component}
                            </ProtectedAdminRoute>
                        }
                    />
                ))}
            </Routes>
        </AdminMaterLayout>
    );
};

const RouterCustom = () => {
    const location = useLocation();
    const isAdminRouters = location.pathname.startsWith(ADMIN_PATH);

    return isAdminRouters ? renderAdminRouter() : renderUserRouter();
};

export default RouterCustom;
