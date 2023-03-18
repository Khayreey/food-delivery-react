import React , {useEffect} from 'react'
import {useSelector , useDispatch} from 'react-redux'
import SingleDishItem from '../component/SingleDishItem'
import {getAllFavoriteDishes} from '../store/favorite-actions'
import style from './favorite.module.css'
const Favorite = ()=>{
    const favoriteItems = useSelector((state)=> state.favorite.favoriteItems)
    const token = useSelector((state)=> state.auth.token)
    const dispatch = useDispatch()    

    useEffect(()=>{
        dispatch(getAllFavoriteDishes(token))
    },[])

    
    return(
        <div className={style.favorite}>
            <p>Your <span>Favorite</span> Dishes</p>
        <div className={style.favoriteContainer}>
            {favoriteItems.length > 0 ? favoriteItems.map((el)=> {
                return (
                    <SingleDishItem isFavorite={true}
                    id={el.disheInformation._id}
                    item={el.disheInformation} key={el._id} price={el.disheInformation.price} rating={el.disheInformation.rating} name={el.disheInformation.name} img={el.disheInformation.imgSrc}/>
                )
            })
            :
            <p className={style.notFound}>You Havent any favorite dish</p>
            }
        </div>
        </div>
    )
}
export default Favorite