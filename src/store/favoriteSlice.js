import { createSlice } from '@reduxjs/toolkit'

const favoriteSlice = createSlice({
    name : 'favorite' , 
    initialState : {
        favoriteItems : []
    },
    reducers:{
        getFavoriteDishes(state,action){
            state.favoriteItems = action.payload
        } ,
         removeItemFromFavorite(state,action){
             state.favoriteItems = state.favoriteItems.filter((item)=> item._id !== action.payload)
         } ,
         addItemToFavorite(state,action){
             state.favoriteItems.push(action.payload)
         }
    }
})
export const favoriteActions = favoriteSlice.actions
export default favoriteSlice