import React from 'react'
import styles from './cartItem.module.css'
import AddCircleIcon  from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {cartActions} from '../store/cartSlice'
import {useDispatch , useSelector} from 'react-redux'
import {updateCartDishe , deleteDisheFromCart} from '../store/cart-actions'
const CartItem = (props) => {
  const token = useSelector((state)=> state.auth.token)
  // use dispatch to add item to cart and remove also
  const dispatch = useDispatch()
  // add item to cart handler when click on add icon
  const addClickHandler=()=>{
    dispatch(updateCartDishe(props.id , props.amount + 1 , token))
  }
  // remove item from cart handler when click on remove icon 
  const removeClickHandler = ()=>{
    if(props.amount === 1) {
        dispatch(deleteDisheFromCart(props.id , token))
    }
    else {
      dispatch(updateCartDishe(props.id , props.amount - 1 , token))
    }
  }
  return (
    <li className={styles.list}>
     <div className={styles.main}>
      <p>{props.name}</p>
      <img src={props.imgSrc} alt="main-dish" />
     </div>   
    <div className={styles.actions}>
        <p>{props.price} x {props.amount}</p>
        <div className={styles.circle}>
            <RemoveCircleIcon onClick={()=>removeClickHandler(props.id)}/>
            <p>{props.amount}</p>
            <AddCircleIcon onClick={()=> addClickHandler()}/>
        </div>
        <p>{props.totalPrice} LE</p>
    </div>
</li>
  )
}

export default CartItem