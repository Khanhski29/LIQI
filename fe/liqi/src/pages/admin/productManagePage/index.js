import { memo } from "react";
import "./style.scss";

import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { useLocation, useNavigate } from "react-router-dom";

import ProductList from "../productList";
import AddProduct from "../addProduct";

import { ROUTERS } from "utils/router";

const ProductManagePage = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const getCurrentTab = () => {

        const searchParams = new URLSearchParams(location.search);
        const type = searchParams.get("type");

        if ((location.pathname.includes("them-san-pham")) || location.pathname.includes("sua-san-pham")) {
            return 3;
        }

        if (type === "stock") {
            return 1;
        }

        if (type === "sold") {
            return 2;
        }

        return 0;
    };

    const handleChangeTab = (index) => {

        switch (index) {

            case 0:
                navigate(ROUTERS.ADMIN.PRODUCT_MANAGER);
                break;

            case 1:
                navigate(`${ROUTERS.ADMIN.PRODUCT_MANAGER}?type=stock`);
                break;

            case 2:
                navigate(`${ROUTERS.ADMIN.PRODUCT_MANAGER}?type=sold`);
                break;

            case 3:
                navigate(ROUTERS.ADMIN.PRODUCT_MANAGER_ADD);
                break;

            default:
                navigate(ROUTERS.ADMIN.PRODUCT_MANAGER);
        }
    };

    return (

        <div className="product__manage">

            <h1 className="title_manage">
                Quản Lý Sản Phẩm
            </h1>

            <Tabs
                className="product__tab"
                selectedIndex={getCurrentTab()}
                onSelect={handleChangeTab}
            >

                <TabList className="product__tab-list">

                    <Tab
                        className="product__tab-list-item"
                        selectedClassName="react-tabs__tab--selected"
                    >
                        Tất cả sản phẩm
                    </Tab>

                    <Tab
                        className="product__tab-list-item"
                        selectedClassName="react-tabs__tab--selected"
                    >
                        Sản phẩm tồn kho
                    </Tab>

                    <Tab
                        className="product__tab-list-item"
                        selectedClassName="react-tabs__tab--selected"
                    >
                        Sản phẩm đã bán
                    </Tab>

                    <Tab
                        className="product__tab-list-item"
                        selectedClassName="react-tabs__tab--selected"
                    >
                        Thêm/Sửa sản phẩm
                    </Tab>

                </TabList>

                <TabPanel className="product__tab-panel">
                    <ProductList />
                </TabPanel>

                <TabPanel className="product__tab-panel">
                    <ProductList />
                </TabPanel>

                <TabPanel className="product__tab-panel">
                    <ProductList />
                </TabPanel>

                <TabPanel className="product__tab-panel">
                    <AddProduct />
                </TabPanel>

            </Tabs>

        </div>
    )
};

export default memo(ProductManagePage);