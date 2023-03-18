import React  from 'react'
import RowCategoryItem from './RowCategoryItem'
import style from './rowCategories.module.css'
import {MenuItems} from '../data/Data'
import {useDispatch , useSelector} from 'react-redux'
import {dishesActions} from '../store/dishesSlice'
import {paginationActions} from '../store/paginationSlice'
import CancelIcon from '@mui/icons-material/Cancel';
import Loader from './Loader'
const RowCategories = () => {
  // select result piece to display the category or search term
  const result = useSelector((state)=> state.dishesItems.result)
  // dispatch every category change to udate items according to it and reset pagination to first page
  const dispatch = useDispatch()
  // select whichIsActiveCategory from redux store
  const whichIsActiveCategory = useSelector((state)=>state.dishesItems.whichIsActiveCategory) 
  // by clicking we set the clicked category id to our state
  const changeCategoryHandler=(id , {itemId , categoryName})=>{
    // rest pagination to first page every time we change category
    dispatch(paginationActions.resetPagination())
    dispatch(dishesActions.setWhichIsActiveCategory(id))
    // filter all dishes according to id of clicked category
    dispatch(dishesActions.filterDishes({itemId , categoryName}))
    // scroll to dishes
    window.scrollTo({
      top: 370,
      behavior: 'smooth'
    });
  }
  // remove all categories and display all dishes
  const displayAllHandler = ()=>{
     // rest pagination to first page every time we change category
     dispatch(paginationActions.resetPagination())
    // dispatch display all action to restore all items
    dispatch(dishesActions.displayAll())
     // scroll to dishes
    window.scrollTo({
      top: 370,
      behavior: 'smooth'
    });
  }
  return (
    <>
      {/* this icon for remove all categories and display all dishes */}
      {/*we check if whichIsActive state not false then we not shown clear icon*/}
     {whichIsActiveCategory ? <CancelIcon className={style.cancel} onClick={displayAllHandler}/>
      : result && <div className={style.result}>
      <CancelIcon className={style.cancel} onClick={displayAllHandler}/>
      <p>{`"${result}"`}</p> 
     </div>}
     <p className={style.par}>Catalog Menu</p>
    <div className={style.rowCategories}>
     
       {/* <Loader /> */}
      {/* we maop over our menu items array to represent categories (every menu item as a RowCategoryItem) */}
     {MenuItems && MenuItems.map((element)=>{
      return (
        <RowCategoryItem 
          key={element.id}
          name={element.name} 
          imgSrc={element.imgSrc}
          // is active is triggerd as true or false based on state current hold
          isActive = {whichIsActiveCategory === element.id}
          clickHandler={()=> changeCategoryHandler(element.id , {itemId:element.itemId , categoryName:element.name})}
          />
      )
     })}   
    </div>
    </>
  )
}
export default RowCategories