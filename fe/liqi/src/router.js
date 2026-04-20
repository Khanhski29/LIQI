import HomePage from "./pages/users/homePage";
import ProfilePage from "./pages/users/profilePage";
import ProductsPage from "./pages/users/productsPage";
import MaterLayout from "./pages/users/theme/materLayout";
import { ROUTERS } from "./utils/router";
import { Routes, Route } from "react-router-dom";



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
        }
    ]

    return (
        <MaterLayout>
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