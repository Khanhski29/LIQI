import { memo, useState } from "react";
import "./style.scss";

const AddProduct = () => {

    const initialProduct = {
        id: "",
        price: "",
        description: "",
        sold: false,
        img: ""
    };
    const [product, setProduct] = useState(initialProduct);

    const handleReset = () => {
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

        if(file){

            setProduct({
                ...product,
                img: URL.createObjectURL(file)
            });
        }
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log(product);
    };

    return (
        <div className="add__product">

            <form className="add__product-form" onSubmit={handleSubmit}>

                <div className="add__product-group">
                    <label>Ảnh sản phẩm</label>
                    <input type="file" accept="image/*" onChange={handleImage}/>
                </div>
                {
                    product.img && (
                        <div className="add__product-preview">
                            <img src={product.img} alt="preview"/>
                        </div>
                    )
                }
                <div className="add__product-group">
                    <label>ID sản phẩm</label>
                    <input className="input--string" type="text" name="id" placeholder="VD: VIP0001" value={product.id} onChange={handleChange}/>
                </div>
                <div className="add__product-group">
                    <label>Giá sản phẩm</label>
                    <input className="input--string" type="number" name="price" placeholder="VD: 999000" value={product.price} onChange={handleChange}/>
                </div>

                <div className="add__product-group">
                    <label>Mô tả sản phẩm</label>
                    <textarea  name="description" placeholder="Nhập mô tả..." value={product.description} onChange={handleChange}/>
                </div>

                <button type="submit" style={{marginLeft: "200px"}} className="add__product-submit">Thêm sản phẩm</button>
                <button type="button" onClick={handleReset} style={{marginLeft: "20px"}} className="add__product-submit">Làm mới</button>
            </form>

        </div>
    );
};

export default memo(AddProduct);