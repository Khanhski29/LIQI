import { memo, useState } from "react";
import "./style.scss";
import { formatter } from "utils/formatter";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTERS } from "utils/router";
import { useGetProductsUS } from "api/homepage";

const ProductList = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    const itemsPerPage = 15;

    const [searchParams, setSearchParams] = useSearchParams();


    const type = searchParams.get("type");
    const { data  } = useGetProductsUS({type});

    const page = Number(searchParams.get("page")) || 1;
    const startIndex =
        (page - 1) * itemsPerPage;

    const endIndex =
        startIndex + itemsPerPage;

    const currentProducts =
        data?.slice(startIndex, endIndex);

    const totalPages =
        Math.ceil(data?.length / itemsPerPage);




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

        <div className="product__list">
            {
                currentProducts?.map((item) => (
                    <div className="product__card-item">
                        <img src={item.img} onClick={() => setSelectedImage(item.img)} className="product__card-item-img" />
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
                        <p className="product__card-item-id">{item.product_code}</p>
                        <p className="product__card-item-price">{formatter(item.price)}</p>
                        <p className={`product__card-item-sold
                            ${item.status === "sold"  ? "product__card-item-sold--true" : ""}
                            `}>{item.status === "sold" ? "đã bán" : "chưa bán"}</p>

                        {
                            type == "stock" && (
                                <button
                                    className="edit-btn"
                                    onClick={() =>
                                        navigate(`${ROUTERS.ADMIN.PRODUCT_MANAGER_EDIT}/${item.id}`)
                                    }
                                >
                                    Sửa
                                </button>
                            )
                        }
                    </div>
                ))
            }

            <div className="pagination">
                <button disabled={page === 1} onClick={() => setSearchParams({ type, page: page - 1 })}>{"<"}</button>
                {getPagination().map((item, index) =>
                    item === "..." ? (
                        <span key={index}>...</span>
                    ) : (
                        <button key={index} className={
                            page === item ? "active" : ""
                        } onClick={() => setSearchParams({ type, page: item })} >{item}</button>
                    ))}
                <button disabled={page === totalPages} onClick={() => setSearchParams({ type, page: page + 1 })}>{">"}</button>
            </div>
        </div>
    )
};

export default memo(ProductList);