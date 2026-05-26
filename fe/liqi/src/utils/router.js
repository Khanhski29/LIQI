export const ADMIN_PATH = "/quan-tri";

export const ROUTERS = {
    USER : {
        HOME: "",
        PRODUCTS: "/cua-hang",
        PRODUCT: "/cua-hang/chi-tiet-acc/:id",
        SERVICE: "dich-vu",
        PROFILE: "/profile-user",
        LOGIN: "/dang-nhap",
        REGISTER: "/dang-ky",
        CHECKOUT: "/thanh-toan/:id",
        PAYMENT: "/thanh-toan-qr/:orderId",
        ORDER_SUCCESS: "/dat-hang-thanh-cong/:orderId",
        ORDER_FAIL: "/thanh-toan-that-bai/:orderId",
        TERMS: "/dieu-khoan-su-dung",
        PRIVACY: "/chinh-sach-bao-mat",
        SUPPORT: "/lien-he",
    },
    ADMIN : {
        LOGIN: `${ADMIN_PATH}/dang-nhap`,
        ORDERMANAGER: `${ADMIN_PATH}/quan-ly-don-hang`,
        PRODUCT_MANAGER: `${ADMIN_PATH}/quan-ly-san-pham`,
        PRODUCT_MANAGER_ADD: `${ADMIN_PATH}/quan-ly-san-pham/them-san-pham`,
        PRODUCT_MANAGER_EDIT: `${ADMIN_PATH}/quan-ly-san-pham/sua-san-pham`,
        REVIEW_MANAGER: `${ADMIN_PATH}/quan-ly-danh-gia`,
        LOGOUT: `${ADMIN_PATH}/dang-xuat`
    }


}