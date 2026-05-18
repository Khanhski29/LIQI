import { memo, useState, useEffect } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import { useCreateProductUS, useGetProductForEditUS, useUpdateProductUS } from "api/homepage";

const initialProduct = {
    product_code: "",
    price: "",
    description: "",
    img: "",
    username_account: "",
    password_account: "",
    status: "available",
};

const AddProduct = () => {
    const { id } = useParams();
    const isEditMode = !!id;

    const [product, setProduct] = useState(initialProduct);
    const [isUploading, setIsUploading] = useState(false);

    const { data: productForEdit } = useGetProductForEditUS(id);

    useEffect(() => {
        if (productForEdit) {
            setProduct({
                product_code: productForEdit.product_code || "",
                price: productForEdit.price || "",
                description: productForEdit.description || "",
                img: productForEdit.img || "",
                username_account: productForEdit.username_account || "",
                password_account: productForEdit.password_account || "",
                status: productForEdit.status || "available",
            });
        }
    }, [productForEdit]);

    const { mutate: createProduct } = useCreateProductUS({
        onSuccess: () => {
            alert("Thêm sản phẩm thành công");
            setProduct(initialProduct);
        }
    });

    const { mutate: updateProduct } = useUpdateProductUS({
        onSuccess: () => {
            alert("Cập nhật sản phẩm thành công");
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "liqi_upload");
        formData.append("folder", "liqi/accounts");

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/drgoaizrr/image/upload`,
                { method: "POST", body: formData }
            );

            const data = await response.json();

            if (data.secure_url) {
                setProduct((prev) => ({ ...prev, img: data.secure_url }));
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Lỗi khi tải ảnh lên Cloudinary");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isUploading) return alert("Đang tải ảnh, vui lòng đợi giây lát!");
        if (!product.img) return alert("Vui lòng chọn và đợi ảnh tải lên xong!");

        const payload = { ...product, price: Number(product.price) };

        if (isEditMode) {
            updateProduct({ id, data: payload });
        } else {
            createProduct(payload);
        }
    };

    const handleReset = () => {
        if (isEditMode && productForEdit) {
            setProduct({
                product_code: productForEdit.product_code || "",
                price: productForEdit.price || "",
                description: productForEdit.description || "",
                img: productForEdit.img || "",
                username_account: productForEdit.username_account || "",
                password_account: productForEdit.password_account || "",
                status: productForEdit.status || "available",
            });
        } else {
            setProduct(initialProduct);
        }
    };

    return (
        <div className="add__product">

            <form className="add__product-form" onSubmit={handleSubmit}>

                <div className="add__product-group">
                    <label>Ảnh sản phẩm</label>
                    <input type="file" accept="image/*" onChange={handleImage} />
                </div>

                {product.img && (
                    <div className="add__product-preview">
                        <img src={product.img} alt="preview" />
                    </div>
                )}

                <div className="add__product-group">
                    <label>ID sản phẩm</label>
                    <input
                        className="input--string"
                        type="text"
                        name="product_code"
                        value={product.product_code}
                        onChange={handleChange}
                        placeholder="VD: VIP0001"
                    />
                </div>

                <div className="add__product-group">
                    <label>Giá sản phẩm</label>
                    <input
                        className="input--string"
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="VD: 999000"
                    />
                </div>

                <div className="add__product-group">
                    <label>Mô tả</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="add__product-group">
                    <label>Username acc</label>
                    <input
                        className="input--string"
                        type="text"
                        name="username_account"
                        value={product.username_account}
                        onChange={handleChange}
                        placeholder="username game"
                    />
                </div>

                <div className="add__product-group">
                    <label>Password acc</label>
                    <input
                        className="input--string"
                        type="text"
                        name="password_account"
                        value={product.password_account}
                        onChange={handleChange}
                        placeholder="password game"
                    />
                </div>

                <div className="add__product-group">
                    <label>Trạng thái</label>
                    <select
                        name="status"
                        value={product.status}
                        onChange={handleChange}
                    >
                        <option value="available">Available</option>
                        <option value="reserved">Reserved</option>
                        <option value="sold">Sold</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={isUploading}
                    style={{ marginLeft: "200px" }}
                    className="add__product-submit"
                >
                    {isUploading ? "Đang xử lý..." : isEditMode ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
                </button>

                <button
                    type="button"
                    onClick={handleReset}
                    style={{ marginLeft: "20px" }}
                    className="add__product-submit"
                >
                    Làm mới
                </button>

            </form>

        </div>
    );
};

export default memo(AddProduct);
