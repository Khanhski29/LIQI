import { useMutation } from "@tanstack/react-query";
import { loginAPI, logoutAPI } from "./request";

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
