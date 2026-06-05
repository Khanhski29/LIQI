import axios from "api/axios";

const payParams = ({ key }) => {
    const params = {};
    if (key) params.key = key;
    return params;
};

export const getInstallmentScheduleAPI = async ({ token, key }) => {
    return await axios({
        url: `installments/pay/${token}`,
        method: "GET",
        params: payParams({ key }),
    });
};

export const createInstallmentPaymentAPI = async ({ token, key }) => {
    return await axios({
        url: `installments/pay/${token}/create-payment`,
        method: "POST",
        params: payParams({ key }),
    });
};

export const getInstallmentPaymentStatusAPI = async ({ token, key }) => {
    return await axios({
        url: `installments/pay/${token}/status`,
        method: "GET",
        params: payParams({ key }),
    });
};

export const markInstallmentPaidAPI = async (scheduleId, note) => {
    return await axios({
        url: `installments/schedules/${scheduleId}/mark-paid`,
        method: "POST",
        data: { note },
    });
};

export const revokeInstallmentOrderAPI = async (orderId) => {
    return await axios({
        url: `orders/${orderId}/installment/revoke`,
        method: "POST",
    });
};
