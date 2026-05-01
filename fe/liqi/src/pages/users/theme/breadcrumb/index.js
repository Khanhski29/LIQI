import { memo } from 'react';
import "./style.scss"
import {ROUTERS} from 'utils/router';
import { Link } from 'react-router-dom';

const BreadCrumb = (props) =>{
    return (
        <div className='breadcrumb'>
            <ul>
                <li className='link'>
                    <Link to={ROUTERS.USER.PRODUCTS}>Cửa Hàng</Link>
                </li>

                <li>
                    {props.name}
                </li>
            </ul>
        </div>  
    )
}

export default memo(BreadCrumb);