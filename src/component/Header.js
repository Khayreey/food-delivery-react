import React, { useEffect, useState } from "react";
import style from "./header.module.css";
import { SearchRounded, ShoppingCartRounded } from "@mui/icons-material";
import Logo from "../assets/logo/food-logo.png";
import Profile from "../assets/logo/user.png";
import { useDispatch, useSelector } from "react-redux";
import { dishesActions } from "../store/dishesSlice";
import { paginationActions } from "../store/paginationSlice";
import RightMenu from "./RightMenu";
import { checkMenuActions } from "../store/checkMenuSlice";
import {authActions} from '../store/authSlice'
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link , useNavigate} from 'react-router-dom'
import AuthModal from '../modals/AuthModal'
import {getAllCartDishes} from '../store/cart-actions'

export const Header = () => {

  const [isAuthModalOpen , setIsAuthModalOpen] = useState(false)

  const navigate = useNavigate()

  const userInformation = useSelector((state) => state.auth.user);

  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const token = useSelector((state)=> state.auth.token)
  // select closing menu to display animation every time the menu is going to close
  const closingMenu = useSelector((state) => state.checkMenu.closingMenu);
  //state for mange the check menu that open by cart icon
  const isCheckedMenuOpen = useSelector(
    (state) => state.checkMenu.isCheckMenuClicked
  );
  // this state to display animation every time item added to cart
  const [itemIsAdded, setItemIsAdded] = useState(false);
  //select totalAmount of cart slice to display up of cart icon
  const totalAmountInCart = useSelector((state) => state.cartItems.totalAmount);
  // select items in cart store to animate cart every time item added not just the same one
  const itemsInCart = useSelector((state) => state.cartItems.items);
  //select searchTerm from redux store
  const searchTerm = useSelector((state) => state.dishesItems.searchTerm);
  // using dispatch to use search dispatch action
  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(getAllCartDishes(token))
  } , [])
  // use effect to display animation every time item add to it
  useEffect(() => {
    if (itemsInCart.length === 0) {
      return;
    }
    setItemIsAdded(true);

    const timer = setTimeout(() => {
      setItemIsAdded(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [itemsInCart]);

  // use effect to display animation every time item add to it
  useEffect(() => {
    if (!closingMenu) {
      return;
    }

    const timer = setTimeout(() => {
      dispatch(checkMenuActions.setClosingMenu(false));
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [closingMenu]);
  // dispatch search action when value of searchTerm changes by use effect
  useEffect(() => {
    // to avoid use effect to run first render component we check for searchTerm
    if (!searchTerm) {
      return;
    }
    const timer = setTimeout(() => {
      dispatch(dishesActions.searchDishes(searchTerm));
      dispatch(paginationActions.resetPagination());
      window.scrollTo({
        top: 370,
        behavior: "smooth",
      });
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm, dispatch]);
  // when click on cart icon open the check menu
  const openCheckMenuHandler = () => {
    if (isCheckedMenuOpen) {
      dispatch(checkMenuActions.setClosingMenu(true));
      setTimeout(() => {
        dispatch(checkMenuActions.setIsCheckMenuClicked(false));
      }, 250);
    } else {
      dispatch(checkMenuActions.setIsCheckMenuClicked(true));
    }
  };
  // update the serach term on change
  const searchTermHandler = (e) => {
    // dispatch searchTerm action to set search term
    dispatch(dishesActions.setSearchTerm(e.target.value));
  };
  // when user click search if the user not clicked it will auto search after 3 second because of use effect
  const sumbitSearchHandler = (e) => {
    e.preventDefault();
    dispatch(dishesActions.searchDishes(searchTerm));
    dispatch(paginationActions.resetPagination());
    window.scrollTo({
      top: 370,
      behavior: "smooth",
    });
  };

  const logoutHandler = ()=>{
      dispatch(authActions.userLogout())
      navigate('auth' , {replace  : true})
  }

  const openAuthModalHandler = ()=>{
    setIsAuthModalOpen(true)
  }
  return (
    <header>
      {isAuthModalOpen ? <AuthModal 
      clickHandler={logoutHandler}
      link ='#'
      ctaButton='Log out'
      txt='Are You Sure You Want To Log out'
      action='Log Out ?'
      open={isAuthModalOpen} setIsAuthModalOpen={setIsAuthModalOpen}/> : null}
      {isCheckedMenuOpen ? <RightMenu /> : null}
      {/** logo */}
      <img src={Logo} alt="food-delivery-logo" className={style.logoImg} />
      {/** search box */}
      <form
        onSubmit={(e) => sumbitSearchHandler(e)}
        className={style.searchBox}
      >
        <SearchRounded className={style.searchIcon} />
        <input
          type="text"
          placeholder="search"
          value={searchTerm}
          onChange={(e) => searchTermHandler(e)}
        ></input>
      </form>
      {/** profile section */}
      {isUserLoggedIn ? (
        <div className={style.profileSection}>
          <div className={style.profileImgBox}>
            <img src={userInformation.profileImage ?  `http://localhost:3000/${userInformation.profileImage.replace(/\\/g, '/')}`  :  Profile} alt="profile-logo" />
          </div>
          <p>{userInformation.name}</p>
        </div>
      ) :
        null
        }

      {/** shopping icon with its content */}
      
      <div
        onClick={openCheckMenuHandler}
        className={
          itemIsAdded ? `${style.shopCart} ${style.bump}` : `${style.shopCart}`
        }
      >
       
        <ShoppingCartRounded className={style.cartIcon} />
        <div className={style.cartContent}>
          <p>{totalAmountInCart}</p>
        </div>
      </div>

      {isUserLoggedIn ?
        <div className={style.actionSection}>
        <div className={style.action}>
        <button onClick={openAuthModalHandler}>Log Out</button>
        <LogoutIcon />
        </div>
        </div>
         : <div className={style.actionSection}>
         <Link to='/auth/login' className={style.action}>
         <button>Log in</button>
         <LoginIcon />
         </Link>
         <Link to='/auth/register' className={style.action}>
         <button>Register</button>
         <AppRegistrationIcon />
         </Link>
         </div>}
      {/** toggle menu */}
      {/* <ListIcon className={style.toggleIcon}/> */}
    </header>
  );
};
export default Header;
