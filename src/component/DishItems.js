import React , {useEffect}  from 'react'
import {useSelector , useDispatch} from 'react-redux'
import style from './dishItems.module.css'
import SingleDishItem from './SingleDishItem'
import {Stack , Pagination} from'@mui/material'
import {paginationActions} from '../store/paginationSlice'
import {dishesActions} from '../store/dishesSlice'
import {getAllDishes} from '../store/dishes-actions'
import {getAllFavoriteDishes} from '../store/favorite-actions'

const DishItems = () => {

  // select simiar find one
  const similar = useSelector((state)=> state.dishesItems.similar)
  // select result key word to display it if no item found 
  const resultKeyWord = useSelector((state)=> state.dishesItems.result)
  //dispatch setCurrentPage action from pagination actions
  const dispatch = useDispatch()
  // select the current page from paginationSlice redux store
  const currentPage = useSelector((state)=> state.pagination.currentPage)
  // select all (piece of reducer in redux store) dishes items from redux store 
  const favoriteDishes = useSelector((state)=> state.favorite.favoriteItems) 
 
  const dishesItems = useSelector((state)=>state.dishesItems.filterdItems)
  // all dishes items every dish as a SingleDishItem component
  // every dishItem need  name , price , ratings and img
 const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn) 
 const token = useSelector((state)=> state.auth.token)
 
//define the number of dishes per page 
const numberOfDishesPerPage = 12
// calculate the number of  pages (pagination take it in count property to display the number of pages)
const numberOfPages = Math.ceil(dishesItems.length / numberOfDishesPerPage)
// calculate the last index of current page 
const lastDisheIndex = numberOfDishesPerPage * currentPage 
// calculate the first index of current page 
const firstDisheIndex = lastDisheIndex - numberOfDishesPerPage 
// calculate the shown exercise according to first and last index and currentPage
const dishesOfCurrentPage = dishesItems.slice(firstDisheIndex , lastDisheIndex)


useEffect(()=>{
  if(!isLoggedIn){
    dispatch(getAllDishes())
    return
  }
  const promiseA = new Promise((resolve, reject) => {
    resolve(dispatch(getAllFavoriteDishes(token)));
  });
  promiseA.then(()=>dispatch(getAllDishes())) 
} , [dispatch , isLoggedIn])

console.log(favoriteDishes)



  // change the page to clicked one
  const paginationHandler=(event,value)=>{
    dispatch(paginationActions.setCurrentPage(value))
    window.scrollTo({top : 370 , behavior : 'smooth'})
   }
   //
   const findSimilarSearch = ()=>{
    dispatch(dishesActions.findSimilar(similar['name']))
   }
  return (
    <>
    <div className={style.dishesContainer}>
        {/* <Loader /> */}
        {dishesOfCurrentPage.length > 0  ? dishesOfCurrentPage.map((el)=> (
          <SingleDishItem  
          isFavorite={favoriteDishes.length > 0 ?  favoriteDishes.some(e => e.disheInformation._id === el._id) : false}
          id={el._id}
          item={el} key={el._id} price={el.price} rating={el.rating} name={el.name} img={el.imgSrc} />
        )) 
        : similar ?
        <>
        <div className={style.notFound}>
          <p>No Result Found</p>
          <p>Did You Mean<span onClick={findSimilarSearch}>"{similar['name']}"</span> </p> 
        </div>
        </>
        : null}
    </div>
    <Stack direction='row' justifyContent='center' sx={{marginBottom :'4rem'}}>         
    <Pagination color="primary" variant="outlined" size="large" defaultPage={1}
    page={currentPage}
    onChange={(e,v)=> paginationHandler(e,v)}
    count={numberOfPages}
    />
</Stack>
</>
)
}
export default DishItems