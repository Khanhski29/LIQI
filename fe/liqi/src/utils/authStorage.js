import { ADMIN_PATH } from "utils/router";

const LEGACY_TOKEN_KEY = "auth_token";
const LEGACY_USER_KEY = "auth_user";

export const USER_TOKEN_KEY = "user_auth_token";
export const USER_USER_KEY = "user_auth_user";
export const ADMIN_TOKEN_KEY = "admin_auth_token";
export const ADMIN_USER_KEY = "admin_auth_user";

let legacyMigrated = false;

function migrateLegacyAuth() {
    if (legacyMigrated) return;
    legacyMigrated = true;

    const legacyToken = localStorage.getItem(LEGACY_TOKEN_KEY);
    const legacyUserRaw = localStorage.getItem(LEGACY_USER_KEY);
    if (!legacyToken || !legacyUserRaw) return;

    let user = null;
    try {
        user = JSON.parse(legacyUserRaw);
    } catch {
        localStorage.removeItem(LEGACY_TOKEN_KEY);
        localStorage.removeItem(LEGACY_USER_KEY);
        return;
    }

    const isAdmin = user?.role === "admin";
    const tokenKey = isAdmin ? ADMIN_TOKEN_KEY : USER_TOKEN_KEY;
    const userKey = isAdmin ? ADMIN_USER_KEY : USER_USER_KEY;

    if (!localStorage.getItem(tokenKey)) {
        localStorage.setItem(tokenKey, legacyToken);
        localStorage.setItem(userKey, legacyUserRaw);
    }

    localStorage.removeItem(LEGACY_TOKEN_KEY);
    localStorage.removeItem(LEGACY_USER_KEY);
}

function parseUser(raw) {
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

export function isAdminPath(pathname = window.location.pathname) {
    return pathname.startsWith(ADMIN_PATH);
}

export function getUserToken() {
    migrateLegacyAuth();
    return localStorage.getItem(USER_TOKEN_KEY);
}

export function getUserAuth() {
    migrateLegacyAuth();
    return parseUser(localStorage.getItem(USER_USER_KEY));
}

export function setUserSession(token, user) {
    localStorage.setItem(USER_TOKEN_KEY, token);
    localStorage.setItem(USER_USER_KEY, JSON.stringify(user));
}

export function clearUserSession() {
    localStorage.removeItem(USER_TOKEN_KEY);
    localStorage.removeItem(USER_USER_KEY);
}

export function isUserLoggedIn() {
    const user = getUserAuth();
    return !!getUserToken() && user?.role === "user";
}

export function getAdminToken() {
    migrateLegacyAuth();
    return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function getAdminAuth() {
    migrateLegacyAuth();
    return parseUser(localStorage.getItem(ADMIN_USER_KEY));
}

export function setAdminSession(token, user) {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
    localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
}

export function clearAdminSession() {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);
}

export function isAdminLoggedIn() {
    const user = getAdminAuth();
    return !!getAdminToken() && user?.role === "admin";
}

/** Token gửi kèm API theo trang hiện tại (shop vs quản trị). */
export function getActiveAuthToken(pathname = window.location.pathname) {
    migrateLegacyAuth();
    return isAdminPath(pathname) ? getAdminToken() : getUserToken();
}
