import { useQuery } from "@tanstack/react-query";
import { getProductAPI, getProductsAPI } from "./request";
import { optionUseQuery } from "utils/common";

export const useGetProductsUS = (option) => {
    return useQuery({
        queryKey: ["getProductsAPI"],
        queryFn: () => getProductsAPI(),
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