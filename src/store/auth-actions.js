import { authActions }  from "./authSlice";

export const loginData = (userInformation)=>{
    return async (dispatch)=>{
        const login = async ()=>{
            const response =  await fetch('http://localhost:3000/api/v1/auth/login' , {
            method : 'POST' , 
            headers: {'Content-Type': 'application/json'}, 
            body :JSON.stringify({...userInformation})
          })
          
          if(response.ok) {
             // save jwt and redirect
             const res = await response.json()
             console.log(res)
             return {
                user : res.user , 
                token : res.token
             }
          }
          else {
             const res = await response.json()
             throw new Error(res.msg)
          }
        } 

        try{
            const loginData = await login()
            dispatch(authActions.userLogin(loginData))
        }
        catch(err){
            console.log(err)
        }
    }
}
