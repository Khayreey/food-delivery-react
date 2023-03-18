import {cartActions} from './cartSlice'

export const getAllCartDishes = (token)=>{
    return async(dispatch)=>{
        const getAll = async ()=>{
            const data  = await fetch('http://localhost:3000/api/v1/checkout' , {
                headers :{Authorization: `Bearer ${token}`}
            })
            if(data.ok){
                const response = await data.json()
                
                return {data : response.ordered[0].cart , 
                        id : response.ordered[0]._id
                }
            }
            else {
                const err = await data.json()
                throw new Error(err.msg)
            }  
        }

        try{
           const data =  await getAll()
           dispatch(cartActions.getDishesFromDB(data))
           console.log(data)
        }
        catch(err){
            console.log(err)
        }
    }
} 

export const updateCartDishe = (id,amount,token)=>{
    return async(dispatch)=>{
        const update = async ()=>{
            const disheCall = await fetch(`http://localhost:3000/api/v1/checkout/${id}` , {
               method : 'PATCH' ,
               headers :{Authorization: `Bearer ${token}` , 'Content-Type': 'application/json'} , 
               body : JSON.stringify({amount}) 
            })
            if(disheCall.ok){
                const response = await disheCall.json()
                return {data : response.updatedOrder.cart  , id : response.updatedOrder._id}
            }
            else {
                const err= await disheCall.json()
                throw new Error(err.msg)
            }
        }
        try{
            const updatedDishe =  await update()
            dispatch(cartActions.getDishesFromDB(updatedDishe))
        }
        catch(err){
            console.log(err)
        }
    }
}

export const addDisheToCart = (id,amount,token)=>{
    return async(dispatch)=>{
        const addToCart = async ()=>{
            const addCall = await fetch('http://localhost:3000/api/v1/checkout' , {
                method : 'POST' ,
                headers :{Authorization: `Bearer ${token}` , 'Content-Type': 'application/json'} , 
                body : JSON.stringify({orderedDishe : id , amount}) 
            })
            if(addCall.ok){
                const response = await addCall.json()
                return {data : response.orderedDishe.cart , id : response.orderedDishe._id}
            }
            else {
                const err= await addCall.json()
                throw new Error(err.msg)
            }
        }

        try {
            const dishesAfterAdd = await addToCart()
            console.log(dishesAfterAdd)
            dispatch(cartActions.getDishesFromDB(dishesAfterAdd))
        }
        catch(err){
            console.log(err)
        }
    }
}

export const deleteDisheFromCart = (id,token)=>{
    return async(dispatch)=>{
        const deleteFromCartHandler = async()=>{
           const deleteCall = await fetch(`http://localhost:3000/api/v1/checkout/${id}` , {
            method : 'DELETE' ,
            headers :{Authorization: `Bearer ${token}` , 'Content-Type': 'application/json'} , 
         })
         if(deleteCall.ok){
            if(deleteCall.headers.get('content-type')?.includes('application/json')){
                const data = await deleteCall.json() 
                return { data :data.updatedOrder.cart , id : data.updatedOrder._id}
            }
            else {
                return {data :[] , id : ""}
            }
         }
         else {
            const err = await deleteCall.json()
            throw new Error(err.msg)
         }
        }
        try {
            const cartAfterDelete = await deleteFromCartHandler()
            dispatch(cartActions.getDishesFromDB(cartAfterDelete))
        }
        catch(err){
            console.log(err)
        }
    }
}