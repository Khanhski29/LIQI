import { memo, useEffect, useState } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";

import img1 from 'components/IMG_20260420_142143-7h.webp';

const AddProduct = () => {

    const { id } = useParams();

    const isEdit = !!id;

    // giả lập data
    const productData = [
        {
            id: "VIP001",
            price: 200000,
            description: "Acc VIP 001",
            sold: false,
            img: img1
        },
        {
            id: "VIP004",
            price: 300000,
            description: "Acc VIP 004",
            sold: true,
            img: img1
        }
    ];

    const initialProduct = {
        id: "",
        price: "",
        description: "",
        sold: false,
        img: ""
    };

    const [product, setProduct] = useState(initialProduct);

    // load dữ liệu khi edit
    useEffect(() => {

        if (isEdit) {

            const foundProduct = productData.find(
                (item) => item.id === id
            );

            if (foundProduct) {
                setProduct(foundProduct);
            }
        }

    }, [id]);

    const handleReset = () => {

        // edit thì reset về data cũ
        if (isEdit) {

            const foundProduct = productData.find(
                (item) => item.id === id
            );

            if (foundProduct) {
                setProduct(foundProduct);
            }

            return;
        }

        // add thì reset trắng
        setProduct(initialProduct);
    };

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

        if (isEdit) {

            console.log("Cập nhật sản phẩm:", product);

            // call api update ở đây

        } else {

            console.log("Thêm sản phẩm:", product);

            // call api thêm ở đây
        }
    };

    return (

        <div className="add__product">

            <form
                className="add__product-form"
                onSubmit={handleSubmit}
            >

                <div className="add__product-group">
                    <label>Ảnh sản phẩm</label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                    />
                </div>

                {
                    product.img && (
                        <div className="add__product-preview">
                            <img
                                src={product.img}
                                alt="preview"
                            />
                        </div>
                    )
                }

                <div className="add__product-group">

                    <label>ID sản phẩm</label>

                    <input
                        className="input--string"
                        type="text"
                        name="id"
                        placeholder="VD: VIP0001"
                        value={product.id}
                        onChange={handleChange}
                    />

                </div>

                <div className="add__product-group">

                    <label>Giá sản phẩm</label>

                    <input
                        className="input--string"
                        type="number"
                        name="price"
                        placeholder="VD: 999000"
                        value={product.price}
                        onChange={handleChange}
                    />

                </div>

                <div className="add__product-group">

                    <label>Mô tả sản phẩm</label>

                    <textarea
                        name="description"
                        placeholder="Nhập mô tả..."
                        value={product.description}
                        onChange={handleChange}
                    />

                </div>

                <button
                    type="submit"
                    style={{ marginLeft: "200px" }}
                    className="add__product-submit"
                >
                    {
                        isEdit
                            ? "Cập nhật sản phẩm"
                            : "Thêm sản phẩm"
                    }
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