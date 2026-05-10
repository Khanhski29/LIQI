import { memo } from "react";
import "./style.scss";
import img1 from 'components/IMG_20260420_142143-7h.webp';

const ProductList = () => {

    const data = [
        {
            img: img1,
            id: "VIP001",
            price: 200000,
            sold: "false",
        },
        {
            img: img1,
            id: "VIP004",
            price: 300000,
            sold: "true",
        },
        {
            img: img1,
            id: "VIP009",
            price: 800000,
            sold: "true",
        }
    ]


    return (

        <div className="product__list">
            {
                data.map((item) => {
                    <div className="product__card-item">
                        <img src={item.img} className="product__card-item-img"/>
                        <p className="product__card-item-id">{item.id}</p>
                        <p className="product__card-item-price">{item.price}</p>
                        <p className="product__card-item-sold">{item.sold}</p>
                    </div>
                })
            }
        </div>
    )    
};

export default memo(ProductList);