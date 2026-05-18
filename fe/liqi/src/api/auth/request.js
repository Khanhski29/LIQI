import axios from "api/axios";

const END_POINT = {
    LOGIN:  'auth/login',
    LOGOUT: 'auth/logout',
    ME:     'auth/me',
};

export const loginAPI = async (data) => {
    return await axios({
        url: END_POINT.LOGIN,
        method: "POST",
        data,
    });
};

export const logoutAPI = async () => {
    return await axios({
        url: END_POINT.LOGOUT,
        method: "POST",
    });
};

export const getMeAPI = async () => {
    return await axios({
        url: END_POINT.ME,
        method: "GET",
    });
};
