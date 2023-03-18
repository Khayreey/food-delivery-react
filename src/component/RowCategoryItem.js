import React from 'react'
import style from './rowCategiryItem.module.css'
import { ChevronRightRounded } from '@mui/icons-material'
const RowCategoryItem = (props) => {
  return (
    <div onClick={props.clickHandler} className={props.isActive ?  `${style.itemContainer} ${style.active}` : `${style.itemContainer}`}>
        <div className={style.imgBox}>
           <img src={props.imgSrc} alt="category-banner" />
        </div>
        <p>{props.name}</p>
        <i><ChevronRightRounded className={style.svg}/></i> 
    </div>
  )
}

export default RowCategoryItem