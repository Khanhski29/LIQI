export const ADMIN_PATH = "/quan-tri";

export const ROUTERS = {
    USER : {
        HOME: "",
        PRODUCTS: "/cua-hang",
        PRODUCT: "/cua-hang/chi-tiet-acc/:id",
        SERVICE: "dich-vu",
        PROFILE: "profile-user",
        CHECKOUT: "/thanh-toan"
    },
    ADMIN : {
        LOGIN: `${ADMIN_PATH}/dang-nhap`,
        ORDERMANAGER: `${ADMIN_PATH}/quan-ly-don-hang`,
        PRODUCT_MANAGER: `${ADMIN_PATH}/quan-ly-san-pham`,
        LOGOUT: `${ADMIN_PATH}/dang-xuat`
    }


}