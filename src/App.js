import React , {Suspense} from 'react'
import {Routes , Route , Navigate} from 'react-router-dom'
import LandingText from './component/LandingText'
import Loader from './component/Loader'
import Login from './component/Login'
import Signup from './component/Signup'
import Main from './pages/Main'
import { useSelector } from 'react-redux'

const Orders = React.lazy(()=> import('./pages/Orders'))
const NotFound = React.lazy(()=> import('./pages/NotFound'))
const Landingpage = React.lazy(()=> import('./pages/Landingpage'))
const MainPage = React.lazy(()=> import('./pages/Home'))
const Favorite = React.lazy(()=> import('./pages/Favorite'))
const Payment =React.lazy(()=> import('./pages/Payment'))



// we will add loader later in row categories and dishesItem copmonent when fetch these data from firebase and we will add isLoading state
export const App = () => {

  const isUserLoggedIn = useSelector((state)=> state.auth.isLoggedIn)

  return (
   
    <Suspense fallback={<Loader />}>
    <Routes>
           {/* main page that hold main container and right menu for check (in pages) */}
           <Route to='/' element={<Main />}>
              <Route index element={<MainPage />} />
              <Route path="favorite" element={<Favorite />} />
              <Route path="order" element={<Orders />} />
              <Route path="payment" element={<Payment />} />
              
          </Route>
          
              
          { !isUserLoggedIn 
          ?  
             <Route path="auth" element={<Landingpage />} >
                <Route index element={<LandingText />} />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Signup />} />
             </Route>
          : 
          <Route path="auth" element={<Navigate replace to='/' />} >
                <Route path='login' element={<Navigate replace to='/' />} />
                <Route path='register' element={<Navigate replace to='/' />} />      
          </Route>
          }
        <Route path='*' element={<Landingpage />}>
             <Route path='*' element={<NotFound />} />
        </Route>
    </Routes>
    </Suspense>
  )
}
export default App