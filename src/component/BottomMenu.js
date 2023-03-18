import {  FavoriteRounded, HomeRounded } from '@mui/icons-material'
import PaymentsIcon from '@mui/icons-material/Payments';
import React  , {useEffect} from 'react'
import style from './bottom.module.css'
import MenuItem from './MenuItem'
import { useSelector , useDispatch } from 'react-redux';
import { checkMenuActions } from '../store/checkMenuSlice';
import { useLocation } from 'react-router-dom'
import FlakyIcon from '@mui/icons-material/Flaky';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
export const BottomMenu = () => {
  const location = useLocation()
    // select closing menu to display animation every time the menu is going to close
    const closingMenu = useSelector((state)=> state.checkMenu.closingMenu)  
   //select which is active item from redux store default the first (home)
   
   
   //const isActive = useSelector((state)=> state.activeMenu.activeMenuItem) 
  
   // use dispatch to set which is active item
  const dispatch = useDispatch()  
  // use effect to display animation every time item add to it 
  useEffect(() => {
    if (!closingMenu) {
      return;
    }
    const timer = setTimeout(() => {
        dispatch(checkMenuActions.setClosingMenu(false))
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [closingMenu,dispatch]);
//all the menu item to map them later isClicked triggered to true or false later to determine what is active
  const allMenu = [
    {id:1 , link : '/' , icon: <HomeRounded/> },
    {id:2 , link : '/favorite' , icon: <FavoriteRounded/>},
    {id:3 , link : '/payment' , icon: <ShoppingCartIcon/>},
    {id:4 , link : '/order' , icon: <FlakyIcon/>} ,
  ]
 //when click on any menu item we update the set is active to hold the id if what is active


 const clickHandler = ()=>{
  setTimeout(()=>{
    dispatch(checkMenuActions.setIsCheckMenuClicked(false))
    } , 250)
     dispatch(checkMenuActions.setClosingMenu(true))
 }

  return (
    <div className={style.bottomMenu}>
        <ul id='menu' className={style.ul}>
  {/* this menu map over allMenu to represent our bottom nav every element as menuItem (in component file) */}
           {allMenu.map((item)=>{
            return (<MenuItem
              id={item.id}
              key={item.id} 
              icon={item.icon}
              link={item.link} 
              closeMenu={clickHandler}
  //if the item.link same as the current location.oathname from react router then that is the clicked and this is the only one that will be true
              isClicked = {item.link === location.pathname}
            ></MenuItem>)
           })}                    
        </ul>
    </div>
  )
}
export default BottomMenu