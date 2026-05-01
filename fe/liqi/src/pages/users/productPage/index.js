import { memo, useMemo, useState, useEffect, useRef } from "react";
import "./style.scss";
import img1 from "../../../components/IMG_20260420_142143-7h.webp";
import Title from "../theme/title";
import { formatter } from 'utils/formatter';
import { generatePath, Link } from "react-router-dom";
import { ROUTERS } from "utils/router";
import Breadcrumb from "../theme/breadcrumb";

const ProductPage = () => {
    return (
        <div className="container wide product__detail">
            <Breadcrumb name="Chi tiết sản phẩm"/>
        </div>
    )

};

export default memo(ProductPage);