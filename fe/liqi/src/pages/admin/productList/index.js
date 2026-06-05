import { memo, useState } from "react";
import "./style.scss";
import { formatter } from "utils/formatter";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTERS } from "utils/router";
import { useGetProductsUS, useDeleteProductUS } from "api/homepage";

const ProductList = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const navigate = useNavigate();

    const itemsPerPage = 15;

    const [searchParams, setSearchParams] = useSearchParams();

    const type = searchParams.get("type");
    const { data, isLoading, error, refetch } = useGetProductsUS({ type });

    const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProductUS({
        onError: (error) => {
            alert(error?.response?.data?.message || "Xoá sản phẩm thất bại.");
        },
    });

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

    if (isLoading) {
        return (
            <div className="product__list">
                <p className="product__list-status">Đang tải...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product__list">
                <p className="product__list-status product__list-status--error">
                    Không tải được danh sách sản phẩm.
                </p>
                <button type="button" className="edit-btn" onClick={() => refetch()}>
                    Thử lại
                </button>
            </div>
        );
    }

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

                        {type === "stock" && (
                            <button
                                className="edit-btn"
                                onClick={() =>
                                    navigate(`${ROUTERS.ADMIN.PRODUCT_MANAGER_EDIT}/${item.id}`)
                                }
                            >
                                Sửa
                            </button>
                        )}

                        {(type === "stock" || type === "sold") && (
                            <button
                                className="delete-btn"
                                onClick={() => setConfirmDeleteId(item.id)}
                            >
                                Xoá
                            </button>
                        )}
                    </div>
                ))
            }

            {confirmDeleteId && (
                <div className="confirm-overlay" onClick={() => setConfirmDeleteId(null)}>
                    <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
                        <p>Bạn có chắc muốn xoá sản phẩm này không?</p>
                        <div className="confirm-dialog__actions">
                            <button
                                className="btn-confirm-delete"
                                disabled={isDeleting}
                                onClick={() => {
                                    deleteProduct(confirmDeleteId);
                                    setConfirmDeleteId(null);
                                }}
                            >
                                Xoá
                            </button>
                            <button
                                className="btn-confirm-cancel"
                                onClick={() => setConfirmDeleteId(null)}
                            >
                                Huỷ
                            </button>
                        </div>
                    </div>
                </div>
            )}

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