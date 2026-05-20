import axios from "api/axios";

const END_POINT = {
    ORDERS: 'orders',
};

export const getOrdersAPI = async (params) => {
    return await axios({
        url: END_POINT.ORDERS,
        method: "GET",
        params,
    });
};

export const createOrderAPI = async (data) => {
    return await axios({
        url: END_POINT.ORDERS,
        method: "POST",
        data,
    });
};

export const getOrderStatusAPI = async (id, cancelToken) => {
    return await axios({
        url: `${END_POINT.ORDERS}/${id}/status`,
        method: "GET",
        params: { cancel_token: cancelToken },
    });
};
