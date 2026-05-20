import axios from "api/axios";

const END_POINT = {
    PRODUCTS: 'products',
};

export const getProductsAPI = async(params) => {
    return await axios({
        url: END_POINT.PRODUCTS,
        method: "GET",
        params
    });
}

export const getProductAPI = async (id, params) => {
    return await axios({
        url: `${END_POINT.PRODUCTS}/${id}`,
        method: "GET",
        params
    });
};

export const createProductAPI = async (data) => {
    return await axios({
        url: END_POINT.PRODUCTS,
        method: "POST",
        data,
    });
};

export const getProductForEditAPI = async (id) => {
    return await axios({
        url: `${END_POINT.PRODUCTS}/${id}/edit`,
        method: "GET",
    });
};

export const updateProductAPI = async ({ id, data }) => {
    return await axios({
        url: `${END_POINT.PRODUCTS}/${id}`,
        method: "PUT",
        data,
    });
};

export const deleteProductAPI = async (id) => {
    return await axios({
        url: `${END_POINT.PRODUCTS}/${id}`,
        method: "DELETE",
    });
};
