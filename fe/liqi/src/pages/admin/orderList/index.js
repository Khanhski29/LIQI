import { memo, useState } from "react";
import "./style.scss";
import img1 from 'components/IMG_20260420_142143-7h.webp';
import { formatter } from "utils/formatter";
import { useSearchParams } from "react-router-dom";

const OrderList = () => {
    const [selectedImage, setSelectedImage] = useState(null);


    const itemsPerPage = 15;

    const [searchParams, setSearchParams] = useSearchParams();
    
    const data = [
        {
            id_order: "ORDER1",
            id_acc: "VIP001",
            img: img1,
            price: 200000,
            status: "pending",
            type: "trả hết",
            time: "2026-05-12 14:30:45",

            id_user: "U001",
            user_name: "Nguyen A",
            user_phone: "0123456789",
            user_email: "user@gmail.com"
        },
        {
            id_order: "ORDER1",
            id_acc: "VIP001",
            img: img1,
            price: 200000,
            status: "pending",
            type: "trả hết",
            time: "2026-05-12 14:30:45",

            id_user: "U001",
            user_name: "Nguyen A",
            user_phone: "0123456789",
            user_email: "user@gmail.com"
        },
        {
            id_order: "ORDER1",
            id_acc: "VIP001",
            img: img1,
            price: 200000,
            status: "pending",
            type: "trả hết",
            time: "2026-05-12 14:30:45",

            id_user: "U001",
            user_name: "Nguyen A",
            user_phone: "0123456789",
            user_email: "user@gmail.com"
        },
        {
            id_order: "ORDER1",
            id_acc: "VIP001",
            img: img1,
            price: 200000,
            status: "pending",
            type: "trả hết",
            time: "2026-05-12 14:30:45",

            id_user: "U001",
            user_name: "Nguyen A",
            user_phone: "0123456789",
            user_email: "user@gmail.com"
        },
        {
            id_order: "ORDER1",
            id_acc: "VIP001",
            img: img1,
            price: 200000,
            status: "pending",
            type: "trả hết",
            time: "2026-05-12 14:30:45",

            id_user: "U001",
            user_name: "Nguyen A",
            user_phone: "0123456789",
            user_email: "user@gmail.com"
        },
        {
            id_order: "ORDER1",
            id_acc: "VIP001",
            img: img1,
            price: 200000,
            status: "pending",
            type: "trả hết",
            time: "2026-05-12 14:30:45",

            id_user: "U001",
            user_name: "Nguyen A",
            user_phone: "0123456789",
            user_email: "user@gmail.com"
        },
        {
            id_order: "ORDER1",
            id_acc: "VIP001",
            img: img1,
            price: 200000,
            status: "pending",
            type: "trả hết",
            time: "2026-05-12 14:30:45",

            id_user: "U001",
            user_name: "Nguyen A",
            user_phone: "0123456789",
            user_email: "user@gmail.com"
        },
        {
            id_order: "ORDER1",
            id_acc: "VIP001",
            img: img1,
            price: 200000,
            status: "pending",
            type: "trả hết",
            time: "2026-05-12 14:30:45",

            id_user: "U001",
            user_name: "Nguyen A",
            user_phone: "0123456789",
            user_email: "user@gmail.com"
        },
        {
            id_order: "ORDER1",
            id_acc: "VIP001",
            img: img1,
            price: 200000,
            status: "pending",
            type: "trả hết",
            time: "2026-05-12 14:30:45",

            id_user: "U001",
            user_name: "Nguyen A",
            user_phone: "0123456789",
            user_email: "user@gmail.com"
        },
        {
            id_order: "ORDER1",
            id_acc: "VIP001",
            img: img1,
            price: 200000,
            status: "pending",
            type: "trả hết",
            time: "2026-05-12 14:30:45",

            id_user: "U001",
            user_name: "Nguyen A",
            user_phone: "0123456789",
            user_email: "user@gmail.com"
        },
        {
            id_order: "ORDER1",
            id_acc: "VIP001",
            img: img1,
            price: 200000,
            status: "pending",
            type: "trả hết",
            time: "2026-05-12 14:30:45",

            id_user: "U001",
            user_name: "Nguyen A",
            user_phone: "0123456789",
            user_email: "user@gmail.com"
        },
        {
            id_order: "ORDER1",
            id_acc: "VIP001",
            img: img1,
            price: 200000,
            status: "pending",
            type: "trả hết",
            time: "2026-05-12 14:30:45",

            id_user: "U001",
            user_name: "Nguyen A",
            user_phone: "0123456789",
            user_email: "user@gmail.com"
        },
        {
            id_order: "ORDER1",
            id_acc: "VIP001",
            img: img1,
            price: 200000,
            status: "pending",
            type: "trả hết",
            time: "2026-05-12 14:30:45",

            id_user: "U001",
            user_name: "Nguyen A",
            user_phone: "0123456789",
            user_email: "user@gmail.com"
        },
        {
            id_order: "ORDER1",
            id_acc: "VIP001",
            img: img1,
            price: 200000,
            status: "pending",
            type: "trả hết",
            time: "2026-05-12 14:30:45",

            id_user: "U001",
            user_name: "Nguyen A",
            user_phone: "0123456789",
            user_email: "user@gmail.com"
        },
        {
            id_order: "ORDER1",
            id_acc: "VIP001",
            img: img1,
            price: 200000,
            status: "pending",
            type: "trả hết",
            time: "2026-05-12 14:30:45",

            id_user: "U001",
            user_name: "Nguyen A",
            user_phone: "0123456789",
            user_email: "user@gmail.com"
        },
        {
            id_order: "ORDER1",
            id_acc: "VIP001",
            img: img1,
            price: 200000,
            status: "pending",
            type: "trả hết",
            time: "2026-05-12 14:30:45",

            id_user: "U001",
            user_name: "Nguyen A",
            user_phone: "0123456789",
            user_email: "user@gmail.com"
        },
        {
            id_order: "ORDER1",
            id_acc: "VIP001",
            img: img1,
            price: 200000,
            status: "pending",
            type: "trả hết",
            time: "2026-05-12 14:30:45",

            id_user: "U001",
            user_name: "Nguyen A",
            user_phone: "0123456789",
            user_email: "user@gmail.com"
        },

    ]

    const page = Number(searchParams.get("page")) || 1; 
    const startIndex =
        (page - 1) * itemsPerPage;

    const endIndex =
        startIndex + itemsPerPage;

    const currentProducts =
        data.slice(startIndex, endIndex);

    const totalPages =
        Math.ceil(data.length / itemsPerPage);
        

    

    const getPagination = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }

            return pages;
        }

        if (page <= 4) {
            pages.push(1, 2, 3, 4, 5, "...", totalPages);
            return pages;
        }

        if (page >= totalPages - 3) {
            pages.push(
                1,
                "...",
                totalPages - 4,
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages
            );

            return pages;
        }
        pages.push(
            1,
            "...",
            page - 2,
            page - 1,
            page,
            page + 1,
            page + 2,
            "...",
            totalPages
        );

        return pages;
    };

    return (

        <div className="order__list">
            {
                currentProducts.map((item) => (
                    <div className="order__card-item">
                        <img src={item.img} onClick={() => setSelectedImage(item.img)} className="order__card-item-img"/>
                        {selectedImage && (
                            <div 
                                className="overlay__card"
                                onClick={() => setSelectedImage(null)}
                            >
                                <img 
                                src={selectedImage} 
                                className="overlay__card-img"
                                onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        )}
                        <p className="order__card-item--g order__card-item-id">{item.id_order}</p>
                        <p className="order__card-item--g order__card-item-id">{item.id_acc}</p>
                        <p className="order__card-item--g order__card-item-price">{formatter(item.price)}</p>

                        <p className="order__card-item--g order__card-item-user">{item.id_user}</p>
                        <p className="order__card-item--g order__card-item-user">{item.user_name}</p>
                        <p className="order__card-item--g order__card-item-user">{item.user_phone}</p>
                        <p className="order__card-item--g order__card-item-user">{item.user_email}</p>
                        
                        <p className="order__card-item--g order__card-item-type">{item.type}</p>
                        <p className="order__card-item--g order__card-item-time">{item.time}</p>
                        <p className="order__card-item--g order__card-item-status">{item.status}</p>
                        


                    </div>
                ))
            }

            <div className="pagination">
                <button disabled={page === 1} onClick={() => setSearchParams({page: page - 1})}>{"<"}</button>
                    {getPagination().map((item, index) => 
                        item === "..." ? (
                            <span key={index}>...</span>
                            ) : (
                            <button key={index} className={
                            page === item ? "active" : ""
                            } onClick={()=> setSearchParams({page: item})} >{item}</button>
                    ))}            
                <button disabled={page === totalPages} onClick={() => setSearchParams({page: page + 1})}>{">"}</button>
            </div>
        </div>
    )    
};

export default memo(OrderList);