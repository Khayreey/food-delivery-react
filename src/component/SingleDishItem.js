import React , {useState} from 'react'
import style from './singleDishItem.module.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Rating } from '@mui/material';
import { favoriteActions } from '../store/favoriteSlice'
import { dishesActions } from '../store/dishesSlice';
import {useDispatch , useSelector} from 'react-redux'
import {removeDisheFromFavorite , addDisheToFavorite} from '../store/favorite-actions'
import {addDisheToCart , updateCartDishe} from '../store/cart-actions'
import AuthModal from '../modals/AuthModal'

const SingleDishItem = (props) => {
  // dispatch
  const dispatch = useDispatch()
  // states
  const [isAuthModalOpen , setIsAuthModalOpen] = useState(false)
  const [ratingValue,setRatingValue] = useState(props.rating | 2)
  const [isFavorite , setIsFavorite] = useState(props.isFavorite)
  // redux states
  const token = useSelector((state)=> state.auth.token)
  const dishesInCart = useSelector((state)=> state.cartItems.items)
  const isUserLoggedIn = useSelector((state)=> state.auth.isLoggedIn)
  // handlers
  const addItemToCartHandler = ()=>{
    if(!isUserLoggedIn){
      setIsAuthModalOpen(()=> true)
      return
    }
    const item = dishesInCart.find((item)=> item.orderDishe._id === props.id) 
    if(item){
        dispatch(updateCartDishe(item._id , item.amount + 1 , token))
      }
      else {
        dispatch(addDisheToCart(props.id , 1 , token))
      }
    }

  const favoriteHandler = (id)=>{
    if(!isUserLoggedIn){
      setIsAuthModalOpen(()=> true)
      return
    }
    if(isFavorite){
      setIsFavorite(()=> false)
      dispatch(removeDisheFromFavorite(id , token))
    }
    else {
      setIsFavorite(()=> true)
      dispatch(addDisheToFavorite(id,token))
    }
  }
  
  return (
    <>
    {isAuthModalOpen ? <AuthModal 
    link = '/auth'
    ctaButton='Register Now'
    txt='Join Us Now To Discover The Most Delicious Meals'
    action='Join Us' open={isAuthModalOpen} setIsAuthModalOpen={setIsAuthModalOpen}/> : null}
    <div className={style.mainDishItem}>
       {isFavorite ? <FavoriteIcon onClick={()=>favoriteHandler(props.id)} /> : <FavoriteBorderIcon onClick={()=>favoriteHandler(props.id)} />}  
        <p>{props.name}</p>
        <AddCircleIcon onClick={()=> addItemToCartHandler()}/>
         {/* rating component from mui  and its value is assigned by props and the user can change  */}
         <Rating
            name="simple-controlled"
            value={ratingValue}
            onChange={(event, newValue) => {
            setRatingValue(newValue);
        }}/>
        <p>{props.price} LE</p>
        <div className={style.imgBox}>
        <img src={props.img} className={style.dishImg} alt='dish-food'/>
        </div>  
    </div>
    </>
  )
}

export default SingleDishItem