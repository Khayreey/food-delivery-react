import {configureStore} from '@reduxjs/toolkit'
import dishesSlice from './dishesSlice'
import paginationSlice from './paginationSlice'
import cartSlice from './cartSlice'
import checkMenuSlice from './checkMenuSlice'
import favoriteSlice from './favoriteSlice'
import authSlice from './authSlice'
import ordersSlice from './ordersSlice'
const store = configureStore({
    reducer:{
        dishesItems : dishesSlice.reducer , 
        pagination : paginationSlice.reducer,
        cartItems : cartSlice.reducer , 
        checkMenu : checkMenuSlice.reducer,
        favorite : favoriteSlice.reducer,
        auth : authSlice.reducer , 
        orders : ordersSlice.reducer
    }
})
export default store