import { memo } from "react";
import "./style.scss";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import ProductList from "../productList";




const ProductListPage = () => {
    return (

        <div className="product__manage">
            <h1 className="title_manage">Quản Lý Sản Phẩm</h1>
            <Tabs className="product__tab">

                <TabList className="product__tab-list">
                    <Tab className="product__tab-list-item">Tất cả sản phẩm</Tab>

                    <Tab className="product__tab-list-item">Thêm sản phẩm</Tab>
                </TabList>


                <TabPanel className="product__tab-panel">
                    <ProductList/>
                </TabPanel>

                <TabPanel className="product__tab-panel">
                    46
                </TabPanel>

            </Tabs>
        </div>
    )    
};

export default memo(ProductListPage);