import React , {useState} from 'react'
import {Link} from 'react-router-dom'
import style from './menuItem.module.css'
import { useSelector } from 'react-redux' 
import AuthModal from '../modals/AuthModal'

const MenuItem = (props) => {
  const [isAuthModalOpen , setIsAuthModalOpen] = useState(false)
  const isUserLoggedIn = useSelector((state)=> state.auth.isLoggedIn)
  console.log(isUserLoggedIn)
  const clickOnMenuItemHandler = ()=>{
     props.closeMenu()
     if(!isUserLoggedIn){
        setIsAuthModalOpen(true)
     }
  }
  return (
    <>
    
    {isAuthModalOpen ? <AuthModal 
    link = '/auth'
    ctaButton='Register Now'
    txt='Join Us Now To Discover The Most Delicious Meals'
    action='Join Us' open={isAuthModalOpen} setIsAuthModalOpen={setIsAuthModalOpen}/> : null}
    <li className={style.menuItem} onClick={clickOnMenuItemHandler}>
       <Link to={isUserLoggedIn ? props.link : '#'} className={style.link}>
         <span className={props.isClicked ? `${style.icon} ${style.click}` : `${style.icon}`}>{props.icon}</span>
      </Link> 
      {props.isClicked && <div className={style.active}></div>}
    </li>
    </>
  )
}
export default MenuItem