import { memo } from "react";
import "./style.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTERS } from "utils/router";



const OrderManagePage = () => {
    return (

        <div className="order__manage">
            <h1>quan lys don hang day</h1>
        </div>
    )    
};

export default memo(OrderManagePage);