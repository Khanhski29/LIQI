import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProductAPI, getProductAPI, getProductsAPI, updateProductAPI } from "./request";
import { optionUseQuery } from "utils/common";

export const useGetProductsUS = (params, option) => {
    return useQuery({
        queryKey: ["getProductsAPI", params],
        queryFn: () => getProductsAPI(params),
        retry: 0,
        optionUseQuery,
        ...option

    })
};

export const useGetProductUS = (id, option) => {
    return useQuery({
        queryKey: ["getProductAPI", id],

        queryFn: () => getProductAPI(id),

        enabled: !!id,

        retry: 0,

        optionUseQuery,

        ...option
    });
};

export const useCreateProductUS = (option) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => createProductAPI(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["getProductsAPI"],
            });
        },

        ...option,
    });
};


