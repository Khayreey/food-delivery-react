import {favoriteActions} from './favoriteSlice'

export const getAllFavoriteDishes = (token)=>{
    return async(dispatch)=>{
        const getDishes = async ()=>{
            const response = await fetch('http://localhost:3000/api/v1/favorite' , {
                headers: {Authorization: `Bearer ${token}`}
            })
            if(response.ok){
                const data = await response.json()
                return data.favoriteDishes
            }
            else {
                const err = await response.json()
                throw new Error(err.msg)
            }
        }
        try{
            const favDishes = await getDishes()
            dispatch(favoriteActions.getFavoriteDishes(favDishes))
        }
        catch(err){
            console.log(err)
        }
    }
}

export const removeDisheFromFavorite = (id , token)=>{
    return async(dispatch)=>{
        const deleteFromFavorites = async()=>{
            const response = await fetch(`http://localhost:3000/api/v1/favorite/${id}` , {
                method : 'DELETE' , 
                headers : {Authorization: `Bearer ${token}`}
            })
            if(response.ok){
                return response
            }
            else {
               
                throw new Error(response.msg)
            }
        }

        try {
            dispatch(favoriteActions.removeItemFromFavorite(id))
            await deleteFromFavorites()  
        }
        catch(err){
            //
            console.log(err)
        }
       
    }
}

export const addDisheToFavorite =  (id , token)=>{
    return async(dispatch)=>{
        const addToFavorite = async()=>{
            const response = await fetch('http://localhost:3000/api/v1/favorite' , {
                method : 'POST' , 
                headers : {Authorization: `Bearer ${token}` ,
                'Content-Type': 'application/json' } , 
                body : JSON.stringify({disheInformation : id}) , 
                
            })
            if(response.ok){
                const data = await response.json()
                return data.favoriteDishe
            }
            else {
                const err= await response.json()
                throw new Error(err.msg)
            }
        }
        try {
            const addedDishe = await addToFavorite()
            console.log(addedDishe)
            dispatch(favoriteActions.addItemToFavorite(addedDishe))
        }
        catch(err){
            console.log(err)
        }

    }
}