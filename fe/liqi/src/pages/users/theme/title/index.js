import { memo } from 'react';
import "./style.scss"

const Title = (props) =>{
    return (
        <div className='title'>
            <div className='name'>
                {props.name}
            </div>
        </div>  
    )
}

export default memo(Title);