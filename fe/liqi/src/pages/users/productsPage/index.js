import { memo, useMemo, useState, useEffect, useRef } from "react";
import "./style.scss";
import img1 from "../../../components/IMG_20260420_142143-7h.webp";
import Title from "../theme/title";

const ProductsPage = () => {

    const products = useMemo(
        () =>
            Array.from({ length: 300 }, (_, index) => ({
                img: img1,
                id: `VIP${String(index + 1).padStart(4, "0")}`,
                price: 300000 + index * 10000,
                description: "Tu len tân thần, Nak vệ thần...Tu len tân thần, Nak vệ thần...Tu len tân thần, Nak vệ thần...Tu len tân thần, Nak vệ thần...Tu len tân thần, Nak vệ thần...Tu len tân thần, Nak vệ thần...Tu len tân thần, Nak vệ thần...Tu len tân thần, Nak vệ thần...Tu len tân thần, Nak vệ thần...Tu len tân thần, Nak vệ thần...Tu len tân thần, Nak vệ thần..."
            })),
        []
    );

    const boxRef = useRef();
    const setActive = (btn) => {
        const buttons = boxRef.current.querySelectorAll("button");

        buttons.forEach(item => item.classList.remove("active"));

        btn.classList.add("active");
    }

    //chia trang
    const [page, setPage] = useState(1);
    const limit = 6;
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);


    const filteredProducts = useMemo(() => {
        return products.filter(
            (item) =>
                item.price >= minPrice &&
                item.price <= maxPrice
        );
    }, [products, minPrice, maxPrice]);

    useEffect(() => {
        setPage(1);
    }, [minPrice, maxPrice]);
    
    const totalPages = Math.ceil(
        filteredProducts.length / limit
    );

    const currentProducts = useMemo(() => {
        const start = (page - 1) * limit;
        const end = start + limit;

        return filteredProducts.slice(start, end);
    }, [filteredProducts, page]);

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
        <div className="products container wide">

            <Title name="Của Hàng"/>



            <div className="row">
                <div ref={boxRef} className="product__left col lg-2 md-2 lmd-12 sm-12">
                    <button onClick={(e)=>{
                        setMinPrice(0);
                        setMaxPrice(Infinity);
                        setActive(e.target);
                    }}>Tất Cả</button>

                    <button onClick={(e)=>{
                        setMinPrice(0);
                        setMaxPrice(1000000);
                        setActive(e.target);
                    }}>{"<1000"}</button>

                    <button onClick={(e)=>{
                        setMinPrice(1000000);
                        setMaxPrice(2000000);
                        setActive(e.target);
                    }}>1000-2000</button>

                    <button onClick={(e)=>{
                        setMinPrice(2000000);
                        setMaxPrice(3000000);
                        setActive(e.target);
                    }}>2000-3000</button>

                    <button onClick={(e)=>{
                        setMinPrice(3000000);
                        setMaxPrice(10000000);
                        setActive(e.target);
                    }}>3000-10000</button>

                    
                </div>

                <div className="product__right col lg-10 md-10 lmd-12 sm-12">
                    <div className="row">
                        <div className="items col lg-12 md-12 lmd-12 sm-12">
                            <div className="row">
                                {
                                    currentProducts.map((item) => (
                                        <div className="col lg-4 md-4 lmd-6 sm-12" key={item.id}>
                                            <div className="item">
                                                <img src={item.img} alt={item.id} />
                                                <div className="item__about">
                                                    <div>
                                                        <p className="id">
                                                            {item.id}
                                                        </p>

                                                        <p className="price">
                                                            {item.price.toLocaleString(
                                                                "vi-VN"
                                                            )} đ
                                                        </p>
                                                    </div>

                                                    <p className="description">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="pagination col lg-12 md-12 lmd-12 sm-12">
                            <button disabled={page === 1} onClick={() => setPage(page - 1)}>{"<"}</button>

                            {
                                getPagination().map((item, index) => 
                                    item === "..." ? (
                                        <span key={index}>...</span>
                                    ) : (
                                        <button key={index} className={
                                            page === item ? "active" : ""
                                        } onClick={()=> setPage(item)} >{item}</button>
                                    )
                                )
                            }
                            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>{">"}</button>

                        </div>
                    </div>
                </div>  
            </div>
        </div>
    )

};

export default memo(ProductsPage);