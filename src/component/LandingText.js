import React from 'react'
import styles from './landingtext.module.css'
import {Link} from 'react-router-dom'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
const LandingText = () => {
  return (
    <div className={styles.container}>
                <div className={styles.par}>
                    <p>Half Of <span>Beauty</span>  In Life Is <span>Food</span></p>
                    <p>Whatever You Feel ,</p>
                    <p> <span>We</span>  Gonna Make You <span>Happy</span> </p>
                </div>
                 <div className={styles.discover}>
                    <KeyboardDoubleArrowDownIcon />
                </div> 
                <div className={styles.actions}>
                <div>
                <button>
                    <Link to='/auth/login'>Log in</Link>
                </button>
                <button>
                    <Link to='/auth/register'>Sign Up</Link>
                </button>
                </div>
            </div>
             </div>
  )
}

export default LandingText