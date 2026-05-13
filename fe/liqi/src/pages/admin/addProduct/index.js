import { memo, useState } from "react";
import "./style.scss";
import { useCreateProductUS } from "api/homepage";

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

    const [product, setProduct] = useState(initialProduct);

    const { mutate: createProduct } = useCreateProductUS({
        onSuccess: () => {
            alert("Thêm sản phẩm thành công");
            setProduct(initialProduct);
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            setProduct({
                ...product,
                img: URL.createObjectURL(file)
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        createProduct({
            ...product,
            price: Number(product.price)
        });
    };

    const handleReset = () => {
        setProduct(initialProduct);
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
                    style={{ marginLeft: "200px" }}
                    className="add__product-submit"
                >
                    Thêm sản phẩm
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