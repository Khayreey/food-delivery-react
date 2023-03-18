import {createSlice} from '@reduxjs/toolkit'

const checkMenuSlice = createSlice ({
    name : 'checkMenu' , 
    initialState : {
        closingMenu : false , 
        isCheckMenuClicked : false
    },
    reducers : {
        setClosingMenu(state , action){
            state.closingMenu = action.payload
        },
        setIsCheckMenuClicked(state,action) {
            state.isCheckMenuClicked = action.payload
        },
        setIsCheckMenuClose(state){
            state.isCheckMenuClicked = false
        }
    }
})
export const checkMenuActions = checkMenuSlice.actions
export default checkMenuSlice