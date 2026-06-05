import axios from "axios";
import { clearActiveSession, getActiveAuthToken } from "utils/authStorage";
import { ROUTERS, ADMIN_PATH } from "utils/router";

const baseURL = process.env.REACT_APP_API_URI;
const timeout = +process.env.REACT_APP_API_TIMEOUT || 20000;

const axiosInstance = axios.create({
    baseURL,
    timeout,
});

axiosInstance.interceptors.request.use(
    function (config) {
        if (!(config.data instanceof FormData)) {
            config.headers["Content-Type"] = "application/json";
        }

        const token = getActiveAuthToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        if (response.data) {
            return response.data;
        }
        return response;
    },
    function (error) {
        const status = error?.response?.status;
        const hadToken = !!error?.config?.headers?.Authorization;
        const url = error?.config?.url || "";
        const isAuthEndpoint =
            url.includes("auth/login") ||
            url.includes("auth/register") ||
            url.includes("auth/logout");

        if (status === 401 && hadToken && !isAuthEndpoint) {
            const pathname = window.location.pathname;
            clearActiveSession(pathname);

            const onLoginPage =
                pathname === ROUTERS.USER.LOGIN ||
                pathname === ROUTERS.USER.REGISTER ||
                pathname === ROUTERS.ADMIN.LOGIN;

            if (!onLoginPage) {
                const loginPath = pathname.startsWith(ADMIN_PATH)
                    ? ROUTERS.ADMIN.LOGIN
                    : ROUTERS.USER.LOGIN;
                window.location.replace(loginPath);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
