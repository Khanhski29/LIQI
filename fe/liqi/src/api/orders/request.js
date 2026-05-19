import axios from "api/axios";

const END_POINT = {
    ORDERS: 'orders',
};

export const createOrderAPI = async (data) => {
    return await axios({
        url: END_POINT.ORDERS,
        method: "POST",
        data,
    });
};
