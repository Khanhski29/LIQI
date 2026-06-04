import { useMutation, useQuery } from "@tanstack/react-query";
import {
    createInstallmentPaymentAPI,
    getInstallmentPaymentStatusAPI,
    getInstallmentScheduleAPI,
} from "./request";

export const useGetInstallmentScheduleUS = (auth, options = {}) => {
    const { token, key, email } = auth || {};

    return useQuery({
        queryKey: ["installment-schedule", token, key, email],
        queryFn: () => getInstallmentScheduleAPI({ token, key, email }),
        enabled: !!token && (options.enabled ?? true),
        retry: (failureCount, err) => {
            if (err?.response?.status === 403) return false;
            return failureCount < 2;
        },
        ...options,
    });
};

export const useCreateInstallmentPaymentUS = (options = {}) => {
    return useMutation({
        mutationFn: (auth) => createInstallmentPaymentAPI(auth),
        ...options,
    });
};

export const useInstallmentPaymentStatusUS = (auth, options = {}) => {
    const { token, key, email } = auth || {};

    return useQuery({
        queryKey: ["installment-payment-status", token, key, email],
        queryFn: () => getInstallmentPaymentStatusAPI({ token, key, email }),
        enabled: !!token && (options.enabled ?? true),
        retry: (failureCount, err) => {
            if (err?.response?.status === 403) return false;
            return failureCount < 2;
        },
        ...options,
    });
};
