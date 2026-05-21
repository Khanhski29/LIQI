import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loginAPI, logoutAPI, registerAPI, getMeAPI, changePasswordAPI } from "./request";
import axios from "api/axios";
import { optionUseQuery } from "utils/common";

export const useRegisterUS = (option) => {
    return useMutation({
        mutationFn: (data) => registerAPI(data),
        ...option,
    });
};

export const useLoginUS = (option) => {
    return useMutation({
        mutationFn: (data) => loginAPI(data),
        ...option,
    });
};

export const useLogoutUS = (option) => {
    return useMutation({
        mutationFn: () => logoutAPI(),
        ...option,
    });
};

export const useChangePasswordUS = (option) => {
    return useMutation({
        mutationFn: (data) => changePasswordAPI(data),
        ...option,
    });
};

export const useMyOrdersUS = (params, option) => {
    return useQuery({
        queryKey: ["myOrders", params],
        queryFn: () => axios({ url: "orders/my", method: "GET", params }),
        enabled: !!localStorage.getItem("auth_token"),
        retry: 0,
        ...optionUseQuery,
        ...option,
    });
};
