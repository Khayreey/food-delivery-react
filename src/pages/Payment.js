import React, { useEffect , useReducer , useState} from "react";
import styles from "./payment.module.css";
import { useSelector , useDispatch } from "react-redux";
import CartItem from "../component/CartItem";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import { listOfCountries, allCountriesData } from "../data/countries";
import HomeIcon from "@mui/icons-material/Home";
import FlagIcon from "@mui/icons-material/Flag";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import EmptyImg from '../assets/images/empty.png'
import { getAllCartDishes } from '../store/cart-actions'
import {addOrder} from '../store/orders-actions'
import {CircularProgress} from '@mui/material'
import {cartActions} from '../store/cartSlice'
import { useNavigate } from "react-router-dom";

const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
const intialInformationValues = {
  name: userFromLocalStorage.name,
  phone: userFromLocalStorage.phone,
  country: userFromLocalStorage.country,
  city: userFromLocalStorage.city,
  address: userFromLocalStorage.address,
  cities: allCountriesData[userFromLocalStorage.country],
  nameIsValid: true,
  phoneIsValid: true,
  countryIsValid: true,
  cityIsValid: true,
  addressIsValid: true,
  userInformationIsValid: true,
};

const userInformationReducer = (state = intialInformationValues, action) => {
  const nameRegex = /^[A-Za-z]+$/;
  switch (action.type) {
    case "setName":
      return {
        ...state,
        name: action.payload.name,
        nameIsValid : true
      };
    case "setPhone":
      return {
        ...state,
        phone: action.payload.phone,
        phoneIsValid : true
      };
    case "setCountry":
      return {
        ...state,
        country: action.payload.country,
        city: "",
        cities: allCountriesData[action.payload.country],
      };
    case "setCity":
      return {
        ...state,
        city: action.payload.city,
      };
    case "setAddress" :
      return {
        ...state , 
        address : action.payload.address , 
        addressIsValid :true
      }  
    case "nameIsValid":
      return {
        ...state,
        nameIsValid:
          nameRegex.test(state.name) &&
          state.name.trim().length < 20 &&
          state.name.trim().length > 3,
        name:
          nameRegex.test(state.name) &&
          state.name.trim().length < 20 &&
          state.name.trim().length > 3
            ? state.name
            : "",
      };
    case "phoneIsValid":
      return {
        ...state , 
        phoneIsValid : 
           state.phone.trim().length === 11 && 
           (state.phone.startsWith('011') || state.phone.startsWith('010') || state.phone.startsWith('012') ), 
        phone :  
           state.phone.trim().length === 11 && 
           (state.phone.startsWith('011') || state.phone.startsWith('010') || state.phone.startsWith('012') ) 
              ? state.phone 
              : '' ,
      };
    case "addressIsValid":
      return {
        ...state,
        addressIsValid:
          state.address.trim().length > 8 &&
          state.address.trim().length < 30,
        address:
          state.address.trim().length > 8 &&
          state.address.trim().length < 30
            ? state.address
            : "",
      };
    case "countryIsValid":
      return {
        ...state,
        countryIsValid: state.country.length !== 0,
      };
    case "cityIsValid":
      return {
        ...state,
        cityIsValid: state.city.length !== 0,
      };
    case "userInformationIsValid" :
      return {
        ...state , 
        userInformationIsValid : 
            nameRegex.test(state.name) && 
            state.name.length > 3 &&
            state.name.length < 20 &&
            state.country.trim().length !== 0 &&
            state.city.trim().length !== 0 && 
            state.address.trim().length > 5 && 
            state.address.trim().length < 30 &&
            state.phone.trim().length === 11 && (state.phone.startsWith('011') || state.phone.startsWith('010') || state.phone.startsWith('012') )
      }  

    default:
      return {
        state,
      };
  }
};

const Payment = () => {
  const [userInformation, dispatchUserInformation] = useReducer(
    userInformationReducer,
    intialInformationValues
  );
  const [isLoading , setIsLoading] = useState(false)
  const navigate = useNavigate()
  // select all items in cart to display it
  const cartItems = useSelector((state) => state.cartItems.items);
  const checkoutId = useSelector((state)=> state.cartItems.checkoutId)
  const token = useSelector((state)=> state.auth.token)
  const totalPrice = cartItems.reduce((partialSum, a) => partialSum + +a.orderDishe.price*a.amount, 0);
  // select user information to display in check out form
  const dispatch = useDispatch()
  useEffect(()=>{
    const timerToCheckUserInformation = setTimeout(()=>{
       dispatchUserInformation({type : 'userInformationIsValid'})
    },500)
    return ()=>{
      clearTimeout(timerToCheckUserInformation)
    }
  },[
      userInformation.name , 
      userInformation.phone ,
      userInformation.country ,
      userInformation.city ,
      userInformation.address ,
    ])
  useEffect(()=>{
    dispatch(getAllCartDishes(token))
  },[dispatch])  

  const nameChangeHandler = (event) => {
    dispatchUserInformation({
      type: "setName",
      payload: { name: event.target.value },
    });
  };

  const validateNameHandler = ()=>{
    dispatchUserInformation({type : "nameIsValid"})
  }

  const phoneChangeHandler = (event) => {
    dispatchUserInformation({
      type: "setPhone",
      payload: { phone: event.target.value },
    });
  };

  const validatePhoneHandler = ()=>{
    dispatchUserInformation({type : "phoneIsValid"})
  }
  const countryChangeHandler = (event) => {
    const country = event.target.value;
    if (country === "COUNTRY") {
      return;
    }
    dispatchUserInformation({
      type: "setCountry",
      payload: { country: country },
    });
  };

  const validateCountryHandler = ()=>{
    dispatchUserInformation({type : "countryIsValid"})
  }

  const cityChangeHandler = (event) => {
    const city = event.target.value;
    if (city === "CITY") {
      return;
    }
    dispatchUserInformation({ type: "setCity", payload: { city: city } });
  };

  const validateCityHandler = ()=>{
    dispatchUserInformation({type : "cityIsValid"})
  }

  const addressChangeHandler = (event) => {
    dispatchUserInformation({
      type: "setAddress",
      payload: { address: event.target.value },
    });
  };

  const validateAddressHandler = ()=>{
    dispatchUserInformation({type : "addressIsValid"})
  }

  const orderBtnHandler = ()=>{
     setIsLoading(true)
     const postData = { 
      userInformation : {
        phone : userInformation.phone , 
        name : userInformation.name , 
        country : userInformation.country , 
        city : userInformation.city , 
        address : userInformation.address
      }
     }
     try{
       dispatch(addOrder(postData , checkoutId , token))
       dispatch(cartActions.getDishesFromDB({data :[] , id : ""}))
       navigate('/order')
     }
     catch(err){
      setIsLoading(false)
      console.log(err)
     }
     //
  }
  return (
    <div className={styles.mainContainer}>
      <p>
        Your <span>Check Out</span> Dishes
      </p>
      <main className={styles.main}>
        <form className={styles.information}>
          <p>Your Information</p>
          <div className={styles.inputBox}>
            <p>name </p>
            <div className={userInformation.nameIsValid ? styles.inpuField  : `${styles.inpuField} + ${styles.error}`}>
              <input
                type="text"
                placeholder={userInformation.nameIsValid ? "Enter Your Name" : "Name Require"}
                value={userInformation.name}
                onChange={(e) => nameChangeHandler(e)}
                onBlur={validateNameHandler}
              />
              <PersonIcon />
            </div>
          </div>
          <div className={styles.inputBox}>
            <p>phone </p>
            <div className={userInformation.phoneIsValid ? styles.inpuField  : `${styles.inpuField} + ${styles.error}`}>
              <input
                type="text"
                value={userInformation.phone}
                placeholder={userInformation.phoneIsValid ? "Enter Your Phone" : "Must Be 11 Number Starts With 011||010||012"}
                onChange={(e) => phoneChangeHandler(e)}
                onBlur={validatePhoneHandler}
              />
              <PhoneIcon />
            </div>
          </div>

          <div className={styles.inputBox}>
            <p>COUNTRY</p>
            <div className={userInformation.countryIsValid ? styles.inpuField  : `${styles.inpuField} + ${styles.error}`}>
              <input type="text" readOnly value={userInformation.country}
                placeholder={userInformation.countryIsValid ? "choose country" : "Country Required"}
                onBlur={validateCountryHandler}
              />
              <FlagIcon />
              <select
                id="country"
                name="country"
                onChange={(e) => countryChangeHandler(e)}
              >
                <option>COUNTRY</option>
                {listOfCountries().map((el, index) => {
                  return (
                    <option key={index} value={el}>
                      {el}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={styles.inputBox}>
            <p>city</p>
            <div className={userInformation.cityIsValid ? styles.inpuField  : `${styles.inpuField} + ${styles.error}`}>
              <input type="text" readOnly value={userInformation.city} 
              placeholder={userInformation.cityIsValid ? "choose city" : "City Required"}
              onBlur={validateCityHandler}
              />
              <LocationCityIcon />
              <select
                id="city"
                name="city"
                onChange={(e) => cityChangeHandler(e)}
              >
                <option>CITY</option>
                {userInformation.cities &&
                  userInformation.cities.map((el, index) => {
                    return (
                      <option key={index} value={el}>
                        {el}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className={styles.inputBox}>
            <p>address</p>
            <div className={userInformation.addressIsValid ? styles.inpuField  : `${styles.inpuField} + ${styles.error}`}>
              <input
                type="text"
                value={userInformation.address}
                placeholder ={userInformation.addressIsValid ? "Enter Your Address" : "Not Valid Address"}
                onChange={(e) => addressChangeHandler(e)}
                onBlur={validateAddressHandler}
              />
              <HomeIcon />
            </div>
          </div>
        </form>
        <ul className={styles.list}>
          <p>Your Cart</p>
          {cartItems.length === 0 ?
           <img src={EmptyImg} alt="no dishes added" />
           :cartItems.map((item) => (
            <CartItem
              key={item._id}
              id={item._id}
              item={item}
              imgSrc={item.orderDishe.imgSrc} 
              name={item.orderDishe.name} 
              totalPrice={item.orderDishe.price * item.amount} 
              price={item.orderDishe.price} 
              amount={item.amount}
            />
            
          ))} 
          {cartItems.length > 0 ?  <p>Total Price : <span>{totalPrice} LE</span> </p> : null}
        </ul>
      </main>
      
      <button className={styles.button} 
      onClick={orderBtnHandler}
      disabled={!userInformation.userInformationIsValid || cartItems.length === 0 }>
        {isLoading ? <CircularProgress /> : 'Order Now'}
      </button>
    </div>
  );
};

export default Payment;
