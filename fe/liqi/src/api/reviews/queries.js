import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getReviewsAPI,
    createReviewAPI,
    checkReviewEligibilityAPI,
    getManageReviewsAPI,
    updateReviewVisibilityAPI,
} from "./request";
import { optionUseQuery } from "utils/common";

export const useGetReviewsUS = (params, option) => {
    return useQuery({
        queryKey: ["reviews", params],
        queryFn: () => getReviewsAPI(params),
        ...optionUseQuery,
        ...option,
    });
};

export const useCreateReviewUS = (option) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => createReviewAPI(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
            queryClient.invalidateQueries({ queryKey: ["manageReviews"] });
        },
        ...option,
    });
};

export const useReviewEligibilityUS = (orderId, option) => {
    return useQuery({
        queryKey: ["reviewEligibility", orderId],
        queryFn: () => checkReviewEligibilityAPI(orderId),
        enabled: !!orderId && !!localStorage.getItem("auth_token"),
        ...optionUseQuery,
        ...option,
    });
};

export const useGetManageReviewsUS = (params, option) => {
    return useQuery({
        queryKey: ["manageReviews", params],
        queryFn: () => getManageReviewsAPI(params),
        ...optionUseQuery,
        ...option,
    });
};

export const useUpdateReviewVisibilityUS = (option) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, is_visible }) => updateReviewVisibilityAPI(id, is_visible),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["manageReviews"] });
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
        ...option,
    });
};
