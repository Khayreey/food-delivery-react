import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name : 'cart' , 
    initialState : {
        items : [] ,
        checkoutId : '' ,
        totalAmount : 0
    },
    reducers : {
        getDishesFromDB(state,action){
            state.items = action.payload.data
            state.totalAmount = action.payload.data.length
            state.checkoutId = action.payload.id
        } , 
        addItemToCart(state,action) {
            const newItem = action.payload
            const existingItem = state.items.find((item)=> item._id === newItem._id)
            if(!existingItem){
                state.totalAmount++
                state.items.push({
                    _id : newItem._id , 
                    amount : 1 ,
                    price : newItem.price,
                    totalPrice : newItem.price ,
                    name : newItem.name , 
                    imgSrc : newItem.imgSrc
                })
            }
            else {
                existingItem.amount ++
                existingItem.totalPrice =+existingItem.totalPrice + +newItem.price
            }
        } ,
        removeItemFromCart(state,action){
            const id = action.payload
            const existingItem = state.items.find((item)=> item._id === id)
            if(existingItem.amount === 1)
            {
                state.items = state.items.filter((item)=> item._id !== id)
                state.totalAmount--
            }
            else {
                existingItem.amount--
                existingItem.totalPrice -= existingItem.price 
            }
        }
    }
})

export const cartActions  = cartSlice.actions
export default cartSlice