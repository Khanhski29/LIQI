import axios from "api/axios";

export const getReviewsAPI = async (params) => {
    return await axios({ url: "reviews", method: "GET", params });
};

export const createReviewAPI = async (data) => {
    return await axios({ url: "reviews", method: "POST", data });
};

export const checkReviewEligibilityAPI = async (orderId) => {
    return await axios({ url: `orders/${orderId}/review-eligibility`, method: "GET" });
};

export const getManageReviewsAPI = async (params) => {
    return await axios({ url: "reviews/manage", method: "GET", params });
};

export const updateReviewVisibilityAPI = async (id, is_visible) => {
    return await axios({ url: `reviews/${id}/visibility`, method: "PATCH", data: { is_visible } });
};
