import { createSlice } from "@reduxjs/toolkit";
import {Items} from '../data/Data'

const dishesSlice = createSlice({
  name:'dishes' , 
  initialState :{
    items : [],
    filterdItems : [] ,
    searchTerm : '',
    result : '',
    whichIsActiveCategory : false,
    similar : '',
    similarSearchTerm : ''
  },
  reducers:{
     getDishesFromDB(state,action){
      state.items = action.payload
      state.filterdItems = action.payload
     }    
    ,filterDishes(state, action){
        state.filterdItems = state.items.filter((el)=> el.category === action.payload.categoryName)
        state.result = ''
        state.searchTerm=''
        state.similar = ''
        //console.log(state.filterdItems)
    } ,
    displayAll(state){
      state.filterdItems = state.items
      state.whichIsActiveCategory = false
      state.result = ''
    },
    setSearchTerm(state,action)
    {
      state.similar=''
      state.searchTerm = action.payload
      state.similarSearchTerm = action.payload
    },
    searchDishes(state){  
      state.filterdItems = state.items.filter((item)=> item.name.toLowerCase().includes(state.searchTerm.toLowerCase()))
      state.result = state.searchTerm
      state.searchTerm=''
      state.whichIsActiveCategory = false
       
        //console.log(state.filterdItems)
      if(state.filterdItems.length ===0){
         while(state.similar === undefined || state.similar === '')
         {
          state.similarSearchTerm= state.similarSearchTerm.slice(0,-1) 
          state.similar = state.items.find((item)=> item.name.toLowerCase().includes(state.similarSearchTerm.toLowerCase()))
         }  
      } 
    },
    findSimilar(state,action){
      state.filterdItems = state.items.filter((item)=> item.name.toLowerCase().includes(action.payload.toLowerCase()))
      state.result = action.payload
      state.searchTerm=''
    }
    ,setWhichIsActiveCategory(state,action){
      state.whichIsActiveCategory = action.payload 
    },
    setFavorite(state , action){
      console.log(action.payload)
      const index = state.filterdItems.findIndex((item)=> item.id === action.payload)
      //console.log(index) 
      state.filterdItems[index].isFavorite = !state.filterdItems[index].isFavorite
    }

    // findSimilarSearch(state){
    //   state.similarSearchTerm= state.similarSearchTerm.slice(0,-1) 
    //   state.similar = state.items.find((item)=> item.name.toLowerCase().includes(state.similarSearchTerm.toLowerCase()))
    // }
  }  
})


export const dishesActions = dishesSlice.actions
export default dishesSlice