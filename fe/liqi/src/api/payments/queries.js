import { useMutation } from "@tanstack/react-query";
import { createPaymentAPI, cancelPaymentAPI } from "./request";

export const useCreatePaymentUS = (option) => {
    return useMutation({
        mutationFn: (data) => createPaymentAPI(data),
        ...option,
    });
};

export const useCancelPaymentUS = (option) => {
    return useMutation({
        mutationFn: (data) => cancelPaymentAPI(data),
        ...option,
    });
};
