import { memo } from "react";
import "./style.scss";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import ReviewList from "../reviewList";

const ReviewManagePage = () => {
    return (
        <div className="review__manage">
            <h1 className="title_manage">Quản Lý Đánh Giá</h1>
            <Tabs className="review__tab">
                <TabList className="review__tab-list">
                    <Tab className="review__tab-list-item">Chờ duyệt</Tab>
                    <Tab className="review__tab-list-item">Đang hiển thị</Tab>
                    <Tab className="review__tab-list-item">Tất cả</Tab>
                </TabList>

                <TabPanel className="review__tab-panel">
                    <ReviewList status="pending" />
                </TabPanel>

                <TabPanel className="review__tab-panel">
                    <ReviewList status="visible" />
                </TabPanel>

                <TabPanel className="review__tab-panel">
                    <ReviewList />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default memo(ReviewManagePage);
