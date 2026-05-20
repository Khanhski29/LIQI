import { useMutation, useQuery } from "@tanstack/react-query";
import { createOrderAPI, getOrderStatusAPI, getOrdersAPI } from "./request";

export const useGetOrdersUS = (params, option) => {
    return useQuery({
        queryKey: ["getOrdersAPI", params],
        queryFn: () => getOrdersAPI(params),
        retry: 0,
        ...option,
    });
};

export const useCreateOrderUS = (option) => {
    return useMutation({
        mutationFn: (data) => createOrderAPI(data),
        ...option,
    });
};

export const useOrderStatusUS = (id, cancelToken, option) => {
    return useQuery({
        queryKey: ["orderStatus", id],
        queryFn: () => getOrderStatusAPI(id, cancelToken),
        enabled: !!id && !!cancelToken,
        refetchInterval: 3000,
        retry: 0,
        ...option,
    });
};
