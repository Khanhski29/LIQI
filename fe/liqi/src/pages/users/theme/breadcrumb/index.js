import { memo } from 'react';
import "./style.scss"
import {ROUTERS} from 'utils/router';
import { Link } from 'react-router-dom';

const BreadCrumb = (props) =>{

    const getPriceLabel = (min, max) => {
        if (max == Infinity) return "Tất cả";
        if (min === 0) return ` 0 - ${max / 1000}`;
        return `${min / 1000}-${max / 1000}`;
    };



    const getFilterLabel = () => {
        if (props.code) return props.code;
        return getPriceLabel(props.min, props.max);
    };

    const getProductsLink = () => {
        const params = new URLSearchParams({
            min: props.min ?? 0,
            max: props.max ?? 9999999,
            page: props.page ?? 1,
        });

        if (props.code) {
            params.set("code", props.code);
        }

        return `${ROUTERS.USER.PRODUCTS}?${params.toString()}`;
    };



    return (
        <div className='breadcrumb'>
            <ul>
                <li className='link'>
                    <Link to={ROUTERS.USER.PRODUCTS}>Cửa Hàng</Link>
                </li>

                <li className='link'>
                    <Link to={getProductsLink()}>{getFilterLabel()}</Link>
                </li>

                <li>
                    {props.name}
                    <span> / {props.id}</span>
                </li>
            </ul>
        </div>  
    )
}

export default memo(BreadCrumb);