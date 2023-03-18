import { createSlice } from "@reduxjs/toolkit";

const authSlice  = createSlice({
    name : 'auth' , 
    initialState : {
        user : JSON.parse(localStorage.getItem('user')) || {},
        token :   localStorage.getItem('token') , 
        isLoggedIn : !!localStorage.getItem('token')
    } , 
    reducers : {
        userLogin(state,action){
            state.user = action.payload.user
            state.token = action.payload.token
            state.isLoggedIn = true
            localStorage.setItem('token' , action.payload.token)
            localStorage.setItem('user' ,   JSON.stringify(action.payload.user))
        } , 
        userLogout(state,action){
            // remove all from local storage
            state.token = null 
            state.isLoggedIn = false
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    }
})
export const authActions = authSlice.actions
export default authSlice