import { useMutation } from "@tanstack/react-query";
import { createOrderAPI } from "./request";

export const useCreateOrderUS = (option) => {
    return useMutation({
        mutationFn: (data) => createOrderAPI(data),
        ...option,
    });
};
