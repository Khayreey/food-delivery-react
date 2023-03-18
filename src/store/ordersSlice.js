import {createSlice} from '@reduxjs/toolkit'

const ordersSlice = createSlice({
    name : "orders" ,
    initialState : {
        ordersList : []
    }
    , 
    reducers : {
        getAllOrders(state,action){
            state.ordersList = action.payload
        }
    }
})

export const ordersActions = ordersSlice.actions
export default ordersSlice