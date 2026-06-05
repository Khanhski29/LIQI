import axios from "api/axios";

export const uploadImageAPI = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return await axios({
        url: "uploads/image",
        method: "POST",
        data: formData,
    });
};
