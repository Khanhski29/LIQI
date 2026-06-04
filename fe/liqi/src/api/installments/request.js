import axios from "api/axios";

const payParams = ({ token, key, email }) => {
    const params = {};
    if (key) params.key = key;
    if (email) params.email = email;
    return params;
};

export const getInstallmentScheduleAPI = async ({ token, key, email }) => {
    return await axios({
        url: `installments/pay/${token}`,
        method: "GET",
        params: payParams({ token, key, email }),
    });
};

export const createInstallmentPaymentAPI = async ({ token, key, email }) => {
    return await axios({
        url: `installments/pay/${token}/create-payment`,
        method: "POST",
        params: payParams({ token, key, email }),
    });
};

export const getInstallmentPaymentStatusAPI = async ({ token, key, email }) => {
    return await axios({
        url: `installments/pay/${token}/status`,
        method: "GET",
        params: payParams({ token, key, email }),
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
