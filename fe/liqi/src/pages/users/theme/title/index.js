import { memo } from 'react';
import "./style.scss"

const Title = (props) =>{
    return (
        <div className='title__page'>
            <div className='name__page'>
                {props.name}
            </div>
        </div>  
    )
}

export default memo(Title);