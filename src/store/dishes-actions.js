import {dishesActions} from './dishesSlice'

export const getAllDishes = ()=>{
    return async (dispatch)=>{
        const getData = async ()=>{
            const getAllDishes = await fetch('http://localhost:3000/api/v1/dishes')
            if(!getAllDishes.ok){
                throw new Error('something went wrong')
            }
            const data = await getAllDishes.json()
            
            return data.dishes
        }

        try{
            const dishes = await getData()
            dispatch(dishesActions.getDishesFromDB(dishes))
        }
        catch(err){
            console.log(err)
        }      
    }
}