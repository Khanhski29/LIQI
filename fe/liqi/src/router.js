import HomePage from "./pages/users/homePage";
import ProfilePage from "./pages/users/profilePage";
import ProductsPage from "./pages/users/productsPage";
import ProductPage from "./pages/users/productPage";
import MaterLayout from "./pages/users/theme/materLayout";
import { ROUTERS } from "./utils/router";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


const renderUserRouter = () => {
    const userRouters = [
        {
            path: ROUTERS.USER.HOME,
            component: <HomePage/>
        },
        {
            path: ROUTERS.USER.PROFILE,
            component: <ProfilePage/>
        },
        {
            path: ROUTERS.USER.PRODUCTS,
            component: <ProductsPage/>
        },
        {
            path: ROUTERS.USER.PRODUCT,
            component: <ProductPage/>
        }
    ]

    return (
        <MaterLayout>
            <ScrollToTop />
            <Routes>
            {
                userRouters.map((item, key) => (
                    <Route key={key} path={item.path} element={item.component} />
                ))
            } 
            </Routes>
        </MaterLayout>
    )

}
 
 const RouterCustom = () => {
    return renderUserRouter();
 }


 export default RouterCustom;