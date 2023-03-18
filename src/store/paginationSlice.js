import {createSlice} from '@reduxjs/toolkit'

const paginationSlice = createSlice({
    name : 'pagination' , 
    initialState : {
        currentPage : 1
    },
    reducers : {
        setCurrentPage(state,action){
            state.currentPage = action.payload
        },
        resetPagination(state){
            state.currentPage = 1
        }
    }
})
export const paginationActions = paginationSlice.actions
export default paginationSlice