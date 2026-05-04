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



    return (
        <div className='breadcrumb'>
            <ul>
                <li className='link'>
                    <Link to={ROUTERS.USER.PRODUCTS}>Cửa Hàng</Link>
                </li>

                <li className='link'>
                    <Link to={`${ROUTERS.USER.PRODUCTS}?min=${props.min}&max=${props.max}&page=${props.page}`}>{getPriceLabel(props.min, props.max)}</Link>
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