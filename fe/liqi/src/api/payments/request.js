import axios from "api/axios";

const END_POINT = {
    CREATE: 'payments/create',
    CANCEL: 'payments/cancel',
};

export const createPaymentAPI = async (data) => {
    return await axios({
        url: END_POINT.CREATE,
        method: "POST",
        data,
    });
};

export const cancelPaymentAPI = async (data) => {
    return await axios({
        url: END_POINT.CANCEL,
        method: "POST",
        data,
    });
};
