import { useMutation, useQuery } from "@tanstack/react-query";
import {
    createInstallmentPaymentAPI,
    getInstallmentPaymentStatusAPI,
    getInstallmentScheduleAPI,
} from "./request";

export const useGetInstallmentScheduleUS = (token, options = {}) => {
    return useQuery({
        queryKey: ["installment-schedule", token],
        queryFn: () => getInstallmentScheduleAPI(token),
        enabled: !!token,
        ...options,
    });
};

export const useCreateInstallmentPaymentUS = (options = {}) => {
    return useMutation({
        mutationFn: (token) => createInstallmentPaymentAPI(token),
        ...options,
    });
};

export const useInstallmentPaymentStatusUS = (token, options = {}) => {
    return useQuery({
        queryKey: ["installment-payment-status", token],
        queryFn: () => getInstallmentPaymentStatusAPI(token),
        enabled: !!token,
        ...options,
    });
};
