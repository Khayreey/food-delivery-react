import React  , {useEffect} from 'react'
import style from'./rightMenu.module.css'
import {useSelector} from 'react-redux'
import CartItem from './CartItem'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {checkMenuActions}  from '../store/checkMenuSlice'
import {getAllCartDishes} from '../store/cart-actions'

const RightMenu = () => { 

  const isUserLoggedIn = useSelector((state)=> state.auth.isLoggedIn)
  // dispatch setActiveMenuItem to set it to payment when click on checkOut 
  const token = useSelector((state)=> state.auth.token)

  const dispatch = useDispatch()
  // closing menu will sit to close true for 300ms in rowCategories then it will be false (for display animation when closing it)
  const closingMenu = useSelector((state)=> state.checkMenu.closingMenu)
  // select all items in cart to display it
  const cartItems = useSelector((state)=> state.cartItems.items)
  // caluclate the total price of check
  const totalPrice = cartItems.reduce((partialSum, a) => partialSum + +a.orderDishe.price*a.amount, 0);
   // use effect to display animation every time item add to it 

  useEffect(()=>{
    dispatch(getAllCartDishes(token))
  } , [])


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
  }, [closingMenu]);
  // set Active payment item when click on checkOut 
  const checkOutHandler =()=>{
    setTimeout(()=>{
      dispatch(checkMenuActions.setIsCheckMenuClicked(false))
      } , 250)
    dispatch(checkMenuActions.setClosingMenu(true))
  }
  return (
    <>
      <div className={closingMenu ? `${style.rightMenu} ${style.closeMenu}` : `${style.rightMenu}`}>
      {/* these ul for map over all item in cart and display everyone as CartItem  */}
      <ul className={style.list}>
        {cartItems.length > 0 ? cartItems.map((item)=>(
            <CartItem key={item._id} item={item} id={item._id} imgSrc={item.orderDishe.imgSrc} name={item.orderDishe.name} totalPrice={item.orderDishe.price * item.amount} price={item.orderDishe.price} amount={item.amount}/>
        )) : <p className={style.noResult}>No Dishes Here , Try add some thing </p> }  
      </ul>
      {cartItems.length > 0 &&
      <>
      <p>Total Price : <span>{totalPrice} LE</span> </p> 
       <Link to={isUserLoggedIn ? '/payment' : '/auth'}><button onClick={checkOutHandler} className={style.button}>Check Out</button></Link>
      </>
      }
      </div>
    </>
  ) 
}

export default RightMenu