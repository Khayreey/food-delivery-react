import { Outlet } from 'react-router-dom'
import Header from '../component/Header'
import Banner from '../component/Banner'
import BottomMenu from '../component/BottomMenu'
const Main = ()=>{
    return (
        <>
        <Header />
        <Banner />
            <Outlet />
        <BottomMenu />
        </>
    )
}

export default Main