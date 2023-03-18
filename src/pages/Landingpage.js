import styles from './landingpage.module.css'
import {Outlet} from 'react-router-dom'

const Landingpage = ()=>{

    return (
       <div className={styles.main}>
                <Outlet />
                <div className={styles.links}>
                    <p className={styles.foot}>Beauty Food <span>=</span> We Happy</p>
                </div>
       </div>
    )
}
export default Landingpage