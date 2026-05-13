import { memo, useMemo, useRef } from "react";
import "./style.scss";
import Title from "../theme/title";
import { formatter } from 'utils/formatter';
import { generatePath, Link, useSearchParams } from "react-router-dom";
import { ROUTERS } from "utils/router";
import { useGetProductsUS } from "api/homepage";

const ProductsPage = () => {

    const { data: products } = useGetProductsUS();
    console.log("products", products);
    

    const boxRef = useRef();
    const setActive = (btn) => {
        const buttons = boxRef.current.querySelectorAll("button");

        buttons.forEach(item => item.classList.remove("active"));

        btn.classList.add("active");
    }

    //chia trang
    const [searchParams, setSearchParams] = useSearchParams();
    const limit = 6;
    const minPrice = Number(searchParams.get("min")) || 0;
    const maxPrice = Number(searchParams.get("max")) || 9999999;
    const page = Number(searchParams.get("page")) || 1;


    const filteredProducts = useMemo(() => {
        return products?.filter(
            (item) =>
                item.status === "available" &&
                Number(item.price) >= minPrice &&
                Number(item.price) <= maxPrice
        );
    }, [products, minPrice, maxPrice]);

    const totalPages = Math.ceil(
        filteredProducts?.length / limit
    );

    const currentProducts = useMemo(() => {
        const start = (page - 1) * limit;
        const end = start + limit;

        return filteredProducts?.slice(start, end);
    }, [filteredProducts, page]);

    const getPagination = () => {
        if (totalPages === 0) return [];
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
        <div className="products container wide">

            <Title name="Của Hàng" />



            <div className="row">
                <div ref={boxRef} className="product__left col lg-2 md-2 lmd-12 sm-12">
                    <button className="active" onClick={(e) => {
                        setSearchParams({ min: 0, max: 9999999999, page: 1 });
                        setActive(e.target);
                    }}>Tất Cả</button>

                    <button onClick={(e) => {
                        setSearchParams({ min: 0, max: 1000000, page: 1 });
                        setActive(e.target);
                    }}>{"<1000"}</button>

                    <button onClick={(e) => {
                        setSearchParams({ min: 1000000, max: 2000000, page: 1 });
                        setActive(e.target);
                    }}>1000-2000</button>

                    <button onClick={(e) => {
                        setSearchParams({ min: 2000000, max: 3000000, page: 1 });
                        setActive(e.target);
                    }}>2000-3000</button>

                    <button onClick={(e) => {
                        setSearchParams({ min: 3000000, max: 10000000, page: 1 });
                        setActive(e.target);
                    }}>3000-10000</button>


                </div>

                <div className="product__right col lg-10 md-10 lmd-12 sm-12">
                    <div className="row">
                        <div className="items col lg-12 md-12 lmd-12 sm-12">
                            <div className="row">
                                {
                                    currentProducts?.map((item) => (
                                        <div className="col lg-4 md-4 lmd-6 sm-12" key={item.id}>
                                            <Link to={generatePath(ROUTERS.USER.PRODUCT, { id: item.id })}
                                                state={{
                                                    min: minPrice,
                                                    max: maxPrice,
                                                    page: page
                                                }}
                                            >
                                                <div className="item">
                                                    <img src={item.img} alt={item.id} />
                                                    <div className="item__about">
                                                        <div>
                                                            <p className="id">
                                                                {item.product_code}
                                                            </p>

                                                            <p className="price">
                                                                {formatter(item.price)}
                                                            </p>
                                                        </div>

                                                        <p className="description">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="pagination col lg-12 md-12 lmd-12 sm-12">
                            <button disabled={page === 1} onClick={() => setSearchParams({ min: minPrice, max: maxPrice, page: page - 1 })}>{"<"}</button>

                            {
                                getPagination().map((item, index) =>
                                    item === "..." ? (
                                        <span key={index}>...</span>
                                    ) : (
                                        <button key={index} className={
                                            page === item ? "active" : ""
                                        } onClick={() => setSearchParams({ min: minPrice, max: maxPrice, page: item })} >{item}</button>
                                    )
                                )
                            }
                            <button disabled={page === totalPages} onClick={() => setSearchParams({ min: minPrice, max: maxPrice, page: page + 1 })}>{">"}</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default memo(ProductsPage);