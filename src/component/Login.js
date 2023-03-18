import React , {useState} from 'react'
import {Link} from 'react-router-dom'
import styles from './login.module.css'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import UserImage from '../assets/logo/user.png'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Joi from "joi"
import { useValidator  } from "react-joi"
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';
import {useNavigate} from 'react-router-dom'
import Loader from './Loader'

const Login = () => {
    const [isLoading , setIsLoading] = useState(false) 
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isPasswordVisible , setIsPasswordVisible] = useState(false)
    const [err , setErr] = useState({})

    const pass_schema = Joi.string().min(8).max(20).required()
    const { state, setData, setExplicitField, validate } = useValidator({
        initialData: {
            email: "" ,
            password: "" ,
        },
        schema: Joi.object({
            password: pass_schema,
            email: Joi.string()
            .email({
                tlds: { allow: false },
            })
            .required(),
        }),
        explicitCheck: {
            password: true,
            email: true,
        },
    })
    

   

    const passwordChangeHandler = (e) => {

        
        
        
        // react < v17
        e.persist()
        setErr((state)=>{
            const { password , ...other } = state
            return other
         })
        setData((state) => ({
            ...state,
            password: e.target.value,
        }))
    }
    
    const emailChangeHandler = (e) => {
        // react < v17
        e.persist()


        setExplicitField('email' , true)
        setErr((state)=>{
           const { email , ...other } = state
           return other
        })

        setData((state) => (
            {
            ...state,
            email: e.target.value,
        }))
    }
  
    const validateEmail = ()=>{
         const emailErrors = state.$all_source_errors.find((item) => item.$property === 'email')
         if(emailErrors){
            setErr((state)=>{
                const newError = { ...state }
                newError['email'] = emailErrors.$message
                return newError
            })
            setData((state) => (
                {
                ...state,
                email: "" ,
            }))
            return false 
         }
         return true
    }
    
    const validatePassword = ()=>{
        const emailErrors = state.$all_source_errors.find((item) => item.$property === 'password')
        console.log(emailErrors)
        if(emailErrors){
            setErr((state)=>{
                const newError = { ...state }
                newError['password'] = emailErrors.$message
                return newError
            })
            
           setData((state) => (
               {
               ...state,
               password: "" ,
           }))

           return false
        }
        return true
   }
    

    
    const passwordVisibiltyHandler = ()=>{
        setIsPasswordVisible((prev)=>{
            return !prev
        })
    }


const loginHandler = async ()=>{
    validate()
    validateEmail()
    validatePassword()
    if(validateEmail() && validatePassword()){
            setIsLoading(true)
            const login = async (userInformation)=>{
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
                const loginData = await login({email : state.$data.email , password:state.$data.password})
                dispatch(authActions.userLogin(loginData))
                navigate('/', { replace: true });
            }
            catch(err){
                console.log(err.message)
                
                if(err.message.includes('email')){
                    const newError = {} 
                    newError['email'] = err.message
                    setErr(newError)
                    setData((state) => (
                        {
                        ...state,
                        email: "" ,
                    }))
                }
                if(err.message.includes('password')){
                    const newError = {} 
                    newError['password'] = err.message
                    setErr(newError)
                    setData((state) => (
                        {
                        ...state,
                        password: "" ,
                    }))
                }
            }
        }
            setIsLoading(false)
}

  return (
    <div className={styles.main}>
        {isLoading ? <Loader /> : null}
        <p>Login</p>
        <div className={styles.userImage}>
            <img src={UserImage} alt="user preview" />
        </div>
        <form className={styles.form}>
            <div className={styles.inputBox}>
             <p>email :</p>   
             <div className={ !err['email']  ? styles.inpuField  : `${styles.inpuField} + ${styles.error}` }>
                <input  type="email" 
                 placeholder={
                    err['email']!== undefined && err['email'].length > 0 ? 
                    err.email : state.$errors.email.length !==0 ?
                    state.$errors.email.map((data) => data.$message).join(",") :
                    "Enter Your email"
                }
                 value={state.$data['email']}
                 onChange={emailChangeHandler}
                 onBlur={validateEmail}
                />
                <EmailIcon />
            </div>
            </div>
            <div className={styles.inputBox}>
            <p>password :</p>  
            <div className={ !err['password'] ? styles.inpuField   : `${styles.inpuField} + ${styles.error}` } >
                    {isPasswordVisible ? <VisibilityIcon onClick={passwordVisibiltyHandler}/> : <VisibilityOffIcon onClick={passwordVisibiltyHandler}/>}
                    <input type={isPasswordVisible ? 'text' : 'password'}  
                     placeholder={ 
                     err['password']!== undefined && err['password'].length > 0 ? 
                     err.password : state.$errors.password.length !==0 ?
                     state.$errors.password.map((data) => data.$message).join(",") :
                     "Enter Your Password"
                     }
                     onChange={passwordChangeHandler}
                     value={state.$data['password']}
                     onBlur={validatePassword}
                    />
                    <LockIcon />
            </div>
            </div>
        </form>
        <div className={styles.actions}>
            <button onClick={loginHandler}>Login</button>
            <Link to='/auth/register'><button>Or Need New Account ?</button></Link>
        </div>
    </div>
  )
}
export default Login