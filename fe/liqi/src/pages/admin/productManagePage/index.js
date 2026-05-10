import { memo } from "react";
import "./style.scss";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import ProductList from "../productList";




const ProductManagePage = () => {
    return (

        <div className="product__manage">
            <h1 className="title_manage">Quản Lý Sản Phẩm</h1>
            <Tabs className="product__tab">

                <TabList className="product__tab-list">
                    <Tab className="product__tab-list-item">Tất cả sản phẩm</Tab>
                    <Tab className="product__tab-list-item">Sản phẩm tồn kho</Tab>
                    <Tab className="product__tab-list-item">Sản phẩm đã bán</Tab>

                    <Tab className="product__tab-list-item">Thêm sản phẩm</Tab>
                </TabList>


                <TabPanel className="product__tab-panel">
                    <ProductList/>
                </TabPanel>

                <TabPanel className="product__tab-panel">
                    <ProductList/>
                </TabPanel>
                
                <TabPanel className="product__tab-panel">
                    <ProductList/>
                </TabPanel>

                <TabPanel className="product__tab-panel">
                    <ProductList/>
                </TabPanel>

            </Tabs>
        </div>
    )    
};

export default memo(ProductManagePage);