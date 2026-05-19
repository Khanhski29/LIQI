export const ADMIN_PATH = "/quan-tri";

export const ROUTERS = {
    USER : {
        HOME: "",
        PRODUCTS: "/cua-hang",
        PRODUCT: "/cua-hang/chi-tiet-acc/:id",
        SERVICE: "dich-vu",
        PROFILE: "profile-user",
        CHECKOUT: "/thanh-toan/:id",
        ORDER_SUCCESS: "/dat-hang-thanh-cong/:orderId",
        ORDER_FAIL: "/thanh-toan-that-bai/:orderId"
    },
    ADMIN : {
        LOGIN: `${ADMIN_PATH}/dang-nhap`,
        ORDERMANAGER: `${ADMIN_PATH}/quan-ly-don-hang`,
        PRODUCT_MANAGER: `${ADMIN_PATH}/quan-ly-san-pham`,
        PRODUCT_MANAGER_ADD: `${ADMIN_PATH}/quan-ly-san-pham/them-san-pham`,
        PRODUCT_MANAGER_EDIT: `${ADMIN_PATH}/quan-ly-san-pham/sua-san-pham`,
        LOGOUT: `${ADMIN_PATH}/dang-xuat`
    }


}