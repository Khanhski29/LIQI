import { useQuery } from "@tanstack/react-query";
import { getProductsAPI } from "./request";
import { optionUseQuery } from "utils/common";

export const useGetProductsUS = (option) => {
    return useQuery({
        queryKey: ["getProductsAPI"],
        queryFn: getProductsAPI,
        retry: 0,
        optionUseQuery,
        ...option

    })
};