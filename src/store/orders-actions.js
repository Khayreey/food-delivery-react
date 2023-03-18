import { ordersActions } from "./ordersSlice";
export  const getAllOrdersListFromDB = (token)=>{
    return async(dispatch)=>{
        const getOrders = async()=>{
            const orders = await fetch('http://localhost:3000/api/v1/orderes' , {
                headers : {Authorization : `Bearer ${token}`}
            })
            if(orders.ok){
                const data = await orders.json()
                return data.orders
            }
            else {
                const err = await orders.json()
                throw new Error(err.msg)
            }
        }

        try {
            const ordersList = await getOrders()
            dispatch(ordersActions.getAllOrders(ordersList))
        }
        catch(err){
            console.log(err)
        }
    }
}

export const addOrder = (userInformation , id , token)=>{
    return async(dispatch)=>{
        const addCall = async ()=>{
            const order = await fetch('http://localhost:3000/api/v1/orderes' , {
                method : 'POST' ,
                headers : {Authorization : `Bearer ${token}` , 'Content-Type': 'application/json'} ,
                body : JSON.stringify({orderedDishes : id , ...userInformation})
            })
            const data = await order.json()
            return data
        }
        try {
            await addCall()
        }
        catch(err){
            console.log(err.msg)
        }
    }
}