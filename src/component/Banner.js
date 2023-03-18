import React from 'react'
import style from './banner.module.css'
import Deliverybanner from '../assets/images/banner.png'
import Orderbanner from '../assets/images/banner2.png'
import { useSelector } from 'react-redux'
const Banner = () => {
  const user = useSelector((state)=> state.auth.user)
  return (
    <div className={style.mainContainer}>
        <img src={Deliverybanner} alt='banner-delivery'/>
        <img src={Orderbanner} alt='banner-order'/>
        <div className={style.above}>
            <p>Welcome, <span>{user.name ? user.name : 'Guest'}</span> </p>
        </div>
    </div>
  )
}

export default Banner