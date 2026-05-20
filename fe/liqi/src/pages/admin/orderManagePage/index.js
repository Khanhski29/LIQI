import { memo } from "react";
import "./style.scss";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import OrderList from "../orderList";


const OrderManagePage = () => {
    return (
        <div className="order__manage">
            <h1 className="title_manage">Quản Lý Đơn Hàng</h1>
            <Tabs className="order__tab">

                <TabList className="order__tab-list">
                    <Tab className="order__tab-list-item">Tất cả đơn hàng</Tab>
                    <Tab className="order__tab-list-item">Chờ giao dịch</Tab>
                    <Tab className="order__tab-list-item">Cần hoàn tiền</Tab>
                    <Tab className="order__tab-list-item">Đơn hàng trả góp</Tab>
                </TabList>

                <TabPanel className="order__tab-panel">
                    <OrderList />
                </TabPanel>

                <TabPanel className="order__tab-panel">
                    <OrderList status="pending" />
                </TabPanel>

                <TabPanel className="order__tab-panel">
                    <OrderList status="refund_needed" />
                </TabPanel>

                <TabPanel className="order__tab-panel">
                    <h1>Đang phát triển</h1>
                </TabPanel>

            </Tabs>
        </div>
    )
};

export default memo(OrderManagePage);
