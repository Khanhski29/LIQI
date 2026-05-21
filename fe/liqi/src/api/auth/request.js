import axios from "api/axios";

const END_POINT = {
    REGISTER:        'auth/register',
    LOGIN:           'auth/login',
    LOGOUT:          'auth/logout',
    ME:              'auth/me',
    CHANGE_PASSWORD: 'auth/change-password',
};

export const registerAPI = async (data) => {
    return await axios({
        url: END_POINT.REGISTER,
        method: "POST",
        data,
    });
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

export const changePasswordAPI = async (data) => {
    return await axios({
        url: END_POINT.CHANGE_PASSWORD,
        method: "POST",
        data,
    });
};
