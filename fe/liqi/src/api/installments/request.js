import axios from "api/axios";

export const getInstallmentScheduleAPI = async (token) => {
    return await axios({
        url: `installments/pay/${token}`,
        method: "GET",
    });
};

export const createInstallmentPaymentAPI = async (token) => {
    return await axios({
        url: `installments/pay/${token}/create-payment`,
        method: "POST",
    });
};

export const getInstallmentPaymentStatusAPI = async (token) => {
    return await axios({
        url: `installments/pay/${token}/status`,
        method: "GET",
    });
};

export const markInstallmentPaidAPI = async (scheduleId) => {
    return await axios({
        url: `installments/schedules/${scheduleId}/mark-paid`,
        method: "POST",
    });
};

export const revokeInstallmentOrderAPI = async (orderId) => {
    return await axios({
        url: `orders/${orderId}/installment/revoke`,
        method: "POST",
    });
};
