import React , {useState , useReducer , useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {  useNavigate , Link} from 'react-router-dom';
import styles from './signup.module.css'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import UserImage from '../assets/logo/user.png'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PhoneIcon from '@mui/icons-material/Phone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { listOfCountries , allCountriesData } from '../data/countries';
import Loader from './Loader'
import { authActions } from '../store/authSlice';

const steps = [
  'Personal Information',
  'Contact Information',
];

const initialPersonalInformationValues = {
    profileImage : "" ,
    enteredName: "" ,
    namePlaceholder : "" ,
    enteredEmail: "",
    emailPlaceholder : "" ,
    emailIsValid: true,
    enteredPassword: "",
    passwordPlaceholder : "" ,
    nameIsValid : true ,
    passwordIsValid: true ,
    enteredRePassword : "" ,
    rePasswordIsValid : true,
    enteredPhone : "" ,
    phoneIsValid :true ,
    rePasswordPlaceholder : "" ,
    imgErrorMsg : "" ,
    personalInformationIsValid: false,
    choosenCountry : "" ,
    choosenCity : "" ,
    cities : [] ,
    enteredAddress : "" ,
    countryIsValid : true ,
    cityIsValid : true ,
    addressIsValid : true ,
    formIsValid : false , 
    registerError : {}
}

const personalInformationReducer = (state = initialPersonalInformationValues , action )=> {
    const nameRegex = /^[A-Za-z]+$/
    const emailRegex = /\S+@\S+\.\S+/;
    switch (action.type) {
        case 'formValid' : 
        return {
            ...state , 
            formIsValid : state.personalInformationIsValid && 
            state.choosenCountry.trim().length !== 0 &&
            state.choosenCity.trim().length !== 0 && 
            state.enteredAddress.trim().length > 5 && 
            state.enteredAddress.trim().length < 30 &&
            state.enteredPhone.trim().length === 11 && (state.enteredPhone.startsWith('011') || state.enteredPhone.startsWith('010') || state.enteredPhone.startsWith('012') )
        }
        case "personalInformationValid":
          return {
            ...state,
            personalInformationIsValid:
              nameRegex.test(state.enteredName) && 
              state.enteredName.length > 3 &&
              state.enteredName.length < 20 &&
              emailRegex.test(state.enteredEmail) &&
              state.enteredPassword.trim().length >= 8 &&
              state.enteredRePassword.trim() === state.enteredPassword.trim() 
          };  
          case "upload-image":
            return {
                ...state,
                profileImage : action.payload
            };
          case  "setImgError" : 
          return{
                ...state , 
                imgErrorMsg : action.payload
          }  
          case "setName" : 
          return {
                ...state ,
                enteredName : action.payload.name , 
                nameIsValid : true
           }
          case "setEmail":
            return {
              ...state,
              enteredEmail: action.payload.email,
              emailIsValid : true
            };
          case "setPassword":
            return {
              ...state,
              enteredPassword: action.payload.password,
              passwordIsValid : true

            };
            case "setRePassword":
            return {
              ...state,
              enteredRePassword: action.payload.rePassword,
              rePasswordIsValid : true
            };
            case "nameValid" : 
            return {
                ...state , 
                nameIsValid : nameRegex.test(state.enteredName) && state.enteredName.trim().length < 20 && state.enteredName.trim().length > 3, 
                enteredName : nameRegex.test(state.enteredName) && state.enteredName.trim().length < 20 && state.enteredName.trim().length > 3 ? state.enteredName : "" ,
                namePlaceholder : state.enteredName.trim().length ===0 ? "Name Required " : !nameRegex.test(state.enteredName) ? "Numbers Or Symbols Not Valid" : state.enteredName.length < 3 ? "Name Cannot be less 3 chars" : state.enteredName.length > 20  ? "Name Cannot be More 20 chars" : "Enter Your Name" 
            };
            case "addressValid" : 
            return {
                ...state , 
                addressIsValid : state.enteredAddress.trim().length > 8 && state.enteredAddress.trim().length < 30 ,
                enteredAddress : state.enteredAddress.trim().length > 8 && state.enteredAddress.trim().length < 30 ? state.enteredAddress : ""
                
            };
            case "countryValid" :
              return {
                ...state , 
                countryIsValid : state.choosenCountry.length !==0
              }
            case "cityValid" :
                return {
                  ...state , 
                  cityIsValid : state.choosenCity.length !==0
                }  
            case "emailValid":
                return {
                  ...state,
                  emailIsValid: emailRegex.test(state.enteredEmail) ,
                  enteredEmail : emailRegex.test(state.enteredEmail) ? state.enteredEmail : "" , 
                  emailPlaceholder : state.enteredEmail.trim().length ===0 ? "Email Required " : !emailRegex.test(state.enteredEmail) ? "Not Valid Email" : "Enter Your Email"
                };
            case "passwordValid":
                return {
                  ...state,
                  passwordIsValid: state.enteredPassword.trim().length >= 8 , 
                  enteredPassword : state.enteredPassword.trim().length >= 8 ? state.enteredPassword : "" , 
                  passwordPlaceholder : state.enteredPassword.trim().length ===0 ? "Password Required " : state.enteredPassword.trim().length < 8 ? "Password At Least 8 Chars" : "Enter Your Password"

                };
            case "rePasswordValid":
                return {
                  ...state,
                  rePasswordIsValid: state.enteredRePassword.trim().length !==0 && state.enteredRePassword.trim() === state.enteredPassword.trim() ,
                  enteredRePassword : state.enteredRePassword.trim() === state.enteredPassword.trim() ? state.enteredRePassword : "" ,
                  rePasswordPlaceholder : state.enteredRePassword.trim().length ===0 ? "Re-Password Required " : state.enteredRePassword.trim() !== state.enteredPassword.trim() ? "Not Matching With Password" : "Enter Your Re-Password"
                };
            case 'setPhone' : return {
              ...state,
              enteredPhone: action.payload.phone,
              phoneIsValid : true
            }    
            case "phoneValid" : 
            return {
                ...state , 
                phoneIsValid : state.enteredPhone.trim().length === 11 && (state.enteredPhone.startsWith('011') || state.enteredPhone.startsWith('010') || state.enteredPhone.startsWith('012') ), 
                enteredPhone :  state.enteredPhone.trim().length === 11 && (state.enteredPhone.startsWith('011') || state.enteredPhone.startsWith('010') || state.enteredPhone.startsWith('012') ) ? state.enteredPhone : '' ,
                
            };
            case "setCountry" : 
                return {
                ...state ,
                choosenCountry : action.payload.country , 
                choosenCity : "" ,
                countryIsValid : true
                }
            case "setCities" : 
                return {
                ...state ,
                cities : allCountriesData[state.choosenCountry] 
                }
            case "setCity" : 
                return {
                ...state ,
                choosenCity : action.payload.city , 
                cityIsValid : true
                }
             case "setAddress" : 
                 return {
                  ...state ,
                 enteredAddress : action.payload.address , 
                 }    
             case "registerValidation" :
              if(action.payload.error.includes('email')){
                return {
                  ...state ,
                  formIsValid : false ,
                  registerError :  {
                    ...state.registerError , 
                    email : action.payload.error
                  } , 
                  enteredEmail : ""
                 }    
              }
              return {
                ...state ,
                registerError : {
                  ...state.registerError , 
                  register : action.payload.error
                }
               }    
              
            default:
                return {
                    state,
                };    
        }}


const Signup = () => {

    const [im , setIm] = useState('')
    
    const dispatch = useDispatch()    
    const [isLoading , setIsLoading] = useState(false)
    const [personalInformationForm , dispatchPersonalInformation] = useReducer(personalInformationReducer,initialPersonalInformationValues)

    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});

    const [isPasswordVisible , setIsPasswordVisible] = useState(false)
    const [isRewritePasswordVisible , setIsRewritePasswordVisible] = useState(false)
    
    const navigate = useNavigate()

    useEffect(()=>{
      const timeTocheckPersonalInformation = setTimeout(()=>{
        dispatchPersonalInformation({type: 'personalInformationValid'})
      },500)
      return ()=>{
        clearTimeout(timeTocheckPersonalInformation)
      }
    },[ personalInformationForm.enteredName ,
        personalInformationForm.enteredPassword , 
        personalInformationForm.enteredRePassword , 
        personalInformationForm.enteredEmail
      ])

      useEffect(()=>{
        if(!personalInformationForm.personalInformationIsValid){
          return
        }
        const timeTocheckPersonalInformation = setTimeout(()=>{
          dispatchPersonalInformation({type: 'formValid'})
        },500)
        return ()=>{
          clearTimeout(timeTocheckPersonalInformation)
        }
      },[ personalInformationForm.personalInformationIsValid ,
          personalInformationForm.choosenCity , 
          personalInformationForm.enteredAddress , 
          personalInformationForm.enteredPhone
        ])

      useEffect(()=>{
        if(!personalInformationForm.choosenCountry){
          return
        }
        dispatchPersonalInformation({type: "setCities"})
      } , [personalInformationForm.choosenCountry])
   
      
      
      const profileImageHandler = (e)=> {
       
        dispatchPersonalInformation({type : 'setImgError' , payload : ''})
        const type = e.target.files[0].type.split('/')[0]
        console.log(type)
        if(type !== "image")
        {
            dispatchPersonalInformation({type : 'setImgError' , payload : 'IinValid Image Format'})
            return
        }
            const src = URL.createObjectURL(e.target.files[0])
            dispatchPersonalInformation({type : 'upload-image' , payload : src})
            setIm(e.target.files[0])
     }


    // work for form and the validation
    
    
    const validateAddressHandler = ()=>{
      dispatchPersonalInformation({ type: "addressValid" });
    }

    const validateCountryHandler = ()=>{
      dispatchPersonalInformation({ type: "countryValid" });
    }

    const validateCityHandler = ()=>{
      dispatchPersonalInformation({type : 'cityValid'})
    }
    // set name value and check for its validation 
    const nameChangeHandler = (event)=>{
        dispatchPersonalInformation({type :'setName' , payload : {name : event.target.value} })
    }
    const validateNameHandler = () => {
        dispatchPersonalInformation({ type: "nameValid" });
    };
    // set email value and check for its validation 
    const emailChangeHandler = (event)=>{
        dispatchPersonalInformation({type :'setEmail' , payload : {email : event.target.value} })
    }
    const validateEmailHandler = () => {
        dispatchPersonalInformation({ type: "emailValid" });
    };

    const phoneChangeHandler = (event)=>{
      dispatchPersonalInformation({type :'setPhone' , payload : {phone : event.target.value} })
    }
    const validatePhoneHandler = ()=>{
      dispatchPersonalInformation({ type: "phoneValid" });
    }
    // set password value and check for its validation 
    const passwordChangeHandler = (event )=>{
        dispatchPersonalInformation({type :'setPassword' , payload : {password : event.target.value} })
    }
    const validatePasswordHandler = () => {
        dispatchPersonalInformation({ type: "passwordValid" });
    };
    // set re-password value and check for its validation 
    const rePasswordChangeHandler = (event)=>{
        dispatchPersonalInformation({type :'setRePassword' , payload : {rePassword : event.target.value} })
    }
    const validateRePasswordHandler = () => {
        dispatchPersonalInformation({ type: "rePasswordValid" });
    };

    const addressChangeHandler = (event)=>{
      dispatchPersonalInformation({type :'setAddress' , payload : {address : event.target.value}})
    } 


    const passwordVisibiltyHandler = ()=>{
        setIsPasswordVisible((prev)=>{
            return !prev
        })
    }
    
    const rewritePasswordVisibiltyHandler = ()=>{
        setIsRewritePasswordVisible((prev)=>{
            return !prev
        })
    }


      const handleNext = () => {
        if(personalInformationForm.personalInformationIsValid){
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          const newCompleted = completed;
          newCompleted[activeStep] = true;
          setCompleted(newCompleted);
        }
        else {
          dispatchPersonalInformation({type : "emailValid"})
          dispatchPersonalInformation({type : "nameValid"})
          dispatchPersonalInformation({type : "passwordValid"})
          dispatchPersonalInformation({type : "rePasswordValid"})
        }
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    

      const selectCountryChangeHandler = (e)=>{
        const country = e.target.value
        if(country === 'COUNTRY'){
          return
        }
        dispatchPersonalInformation({type : 'setCountry' , payload : {country : country}})
      }

      const selectCityChangeHandler = (e)=>{
        const city = e.target.value
        if(city === 'CITY'){
          return
        }
        dispatchPersonalInformation({type : 'setCity' , payload : {city : city}})
      }


      const signupHandler = async ()=>{
        setIsLoading(true)
        
        const formData = new FormData()
      
        formData.append('name' , personalInformationForm.enteredName)
        formData.append('phone' , personalInformationForm.enteredPhone)
        formData.append('email' , personalInformationForm.enteredEmail)
        formData.append('password' , personalInformationForm.enteredPassword)
        formData.append('country' , personalInformationForm.choosenCountry)
        formData.append('city' , personalInformationForm.choosenCity)
        formData.append('address' , personalInformationForm.enteredAddress)
        formData.append('profileImage' , im)

        const signupResponse = async ()=>{
            const response =  await fetch('http://localhost:3000/api/v1/auth/register' , {
            method : 'POST' ,  
            body : formData
          })
          
          if(response.ok) {
             // save jwt and redirect
             const res = await response.json()
             return {
                token : res.token , 
                user : res.user
             }
             
          }
          else {
             const res = await response.json()
             if(res.msg.includes('email')) setActiveStep(0)
             throw new Error(res.msg)
          }
          
        } 

        try{
          console.log(formData)
          const responseData =  await signupResponse()
          dispatch(authActions.userLogin(responseData))
          navigate('/', { replace: true });
        }
        catch(err){
          console.log(err)
          dispatchPersonalInformation({type : 'registerValidation' , payload : {error : err.message}})
        }
        setIsLoading(false)
        
      }
    
  return (
    <div className={styles.main}>
        {isLoading ? <Loader /> : null}
        <p>Sign Up</p>
        {/* first one  */}


       <Stepper sx={{width:'100%'}} nonLinear activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      

        {/* first one  */}
      
        {/* //  second one  */}
            
        <form className={styles.form}>
            {/* first slide */}
            <Box sx={{display: activeStep===0 ? "flex" : "none" , flexDirection: 'column', pt: 2 , height:'100%' , justifyContent:'space-around' }}>
                <div>
                <label htmlFor='imageId' className={styles.imgLabel}>
                    <img src={personalInformationForm.profileImage ? personalInformationForm.profileImage :  UserImage} 
                    alt="add user" />
                    <input type="file" id='imageId' 
                    onChange = {(e)=> profileImageHandler(e)}
                    accept="image/png, image/gif, image/jpeg"/>
                    <AddCircleIcon />
                </label>
                {personalInformationForm.imgErrorMsg ? <p className={styles.notValidText}>{personalInformationForm.imgErrorMsg}</p> : null}
                </div>
                <div className={styles.inputBox}>
                    <p>name :</p>
                    <div className={ personalInformationForm.nameIsValid ? styles.inpuField  : `${styles.inpuField} + ${styles.error}` }>
                    <input  type="text" placeholder={personalInformationForm.nameIsValid ? 'Enter Your Name' : personalInformationForm.namePlaceholder}
                     value={personalInformationForm.enteredName}
                     onChange={(e)=>nameChangeHandler(e)}
                     onBlur={validateNameHandler}
                    />
                    <PersonIcon />
                </div>
                </div>
                <div className={styles.inputBox}>
                    <p>email :</p>
                    <div className={ personalInformationForm.emailIsValid ? personalInformationForm.registerError['email']  ?  `${styles.inpuField} + ${styles.error}` :styles.inpuField  : `${styles.inpuField} + ${styles.error}` } >
                    <input  type="email" 
                    placeholder={personalInformationForm.emailIsValid ?  personalInformationForm.registerError['email'] 
                     ? personalInformationForm.registerError['email'] : 'EX "ex@ex.com' :personalInformationForm.emailPlaceholder }
                    value={personalInformationForm.enteredEmail}
                    onChange={(e)=>emailChangeHandler(e)}
                    onBlur={validateEmailHandler}
                    />
                    <EmailIcon />
                    </div>
                </div>
                <div className={styles.inputBox}>
                    <p>password :</p>
                    <div className={ personalInformationForm.passwordIsValid ? styles.inpuField  : `${styles.inpuField} + ${styles.error}` }>
                    {isPasswordVisible ? <VisibilityIcon onClick={passwordVisibiltyHandler}/> : <VisibilityOffIcon onClick={passwordVisibiltyHandler}/>}
                    <input type={isPasswordVisible ? 'text' : 'password'}  placeholder={personalInformationForm.passwordIsValid ? 'Enter Your Password': personalInformationForm.passwordPlaceholder}
                    value={personalInformationForm.enteredPassword}
                    onChange={(e)=>passwordChangeHandler(e)}
                    onBlur={validatePasswordHandler}
                    />
                    <LockIcon />
                    </div>
                </div>
                <div className={styles.inputBox}>
                    <p>re-password :</p>
                    <div className={ personalInformationForm.rePasswordIsValid ? styles.inpuField  : `${styles.inpuField} + ${styles.error}` }>
                    {isRewritePasswordVisible ? <VisibilityIcon onClick={rewritePasswordVisibiltyHandler}/> : <VisibilityOffIcon onClick={rewritePasswordVisibiltyHandler}/>}
                    <input type={isRewritePasswordVisible ? 'text' : 'password'}  placeholder={personalInformationForm.rePasswordIsValid ? 'Re-Write Your Password': personalInformationForm.rePasswordPlaceholder}
                    value={personalInformationForm.enteredRePassword}
                    onChange={(e)=>rePasswordChangeHandler(e)}
                    onBlur={validateRePasswordHandler}
                    />
                    <LockIcon />
                    </div>
                </div>
            </Box>
            {/* second slide */}
            <Box sx={{display: activeStep===1 ? "flex" : "none" , flexDirection: 'column', pt: 2 , height:'100%' , justifyContent:'space-around'}}>
              
            <div className={styles.inputBox}>
                    <p>phone :</p>
                    <div className={ personalInformationForm.phoneIsValid ? styles.inpuField  : `${styles.inpuField} + ${styles.error}` }>
                    <input  type="text" placeholder={personalInformationForm.phoneIsValid ? 'Enter Your Phone' : 'must 11 char start 011||012||010'}
                     value={personalInformationForm.enteredPhone}
                     onChange={(e)=>phoneChangeHandler(e)}
                     onBlur={validatePhoneHandler}
                    />
                    <PhoneIcon />
                </div>
                </div>
              
                  <div className={styles.inputBox}>
                    <p>COUNTRY :</p>
                    <div className={ personalInformationForm.countryIsValid ? styles.inpuField  : `${styles.inpuField} + ${styles.error}` }>
                    <input  type='text' placeholder= {personalInformationForm.countryIsValid ? 'Choose Country' : "Country Required"}  readOnly value={personalInformationForm.choosenCountry} 
                    onBlur={validateCountryHandler}
                    />
                    <select id="country" name="country" onChange={(e)=>selectCountryChangeHandler(e)}>
                        <option>COUNTRY</option>
                         {listOfCountries().map((el , index)=>{
                          return (
                            <option key={index} value={el}>{el}</option>
                          )
                         })}
                    </select>
                    </div>
                  </div>


                  <div className={styles.inputBox}>
                    <p>city :</p>
                    <div className={ personalInformationForm.cityIsValid ? styles.inpuField  : `${styles.inpuField} + ${styles.error}` }>
                    <input  type='text' placeholder={personalInformationForm.cityIsValid ?'Choose City' : "City Reqired"} readOnly value={personalInformationForm.choosenCity}
                    onBlur={validateCityHandler}
                    />
                    <select id="city" name="city" onChange={(e)=>selectCityChangeHandler(e)}>
                        <option>CITY</option>
                        {personalInformationForm.cities && personalInformationForm.cities.map((el,index)=>{
                          return (
                            <option key={index} value={el}>{el}</option>
                          )
                        })}
                    </select>
                    </div>
                  </div>
              
              
                  <div className={styles.inputBox}>
                    <p>Address :</p>
                    <div className={ personalInformationForm.addressIsValid ? styles.inpuField  : `${styles.inpuField} + ${styles.error}` }>
                    <input type='text' 
                    value={personalInformationForm.enteredAddress}
                    onChange={addressChangeHandler}
                    onBlur={validateAddressHandler}
                    placeholder={personalInformationForm.addressIsValid ? 'Your Address' : "It Must From 8 to 30 char"}/>
                    <LockIcon />
                    </div>
                </div>
            </Box>
        </form>
           
         {/* //second one */}
        <div className={styles.actions}>
                 <button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                </button>
                <Box sx={{ flex: '1 1 auto' , alignItems : 'center'}} />
                   
                   {personalInformationForm.personalInformationIsValid  && activeStep===0 ? 
                   <div className={styles.discover}>
                   <KeyboardDoubleArrowRightIcon />
                   </div> : null }
                    {activeStep ===  0 ? 
                    <button 
                    onClick={handleNext} 
                    sx={{ mr: 1 }}
                    disabled={activeStep === 1}
                    >
                    Next
                   </button>
                    : null} 
                    {personalInformationForm.formIsValid  && activeStep === 1 ? 
                   <div className={styles.discover}>
                   <KeyboardDoubleArrowRightIcon />
                   </div> : null }
                    <button className={styles.registerBtn} disabled={!personalInformationForm.formIsValid} onClick={signupHandler}>
                        register
                    </button>
                    <Link to='/auth/login'><button>Have Account ?</button></Link>
             </div>   
    </div>
  )
}

export default Signup