import React from 'react'
import styles from './notfound.module.css'
import {HomeRounded} from '@mui/icons-material';
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div className={styles.main}>
        <Link to='/' className={styles.back}>
        <HomeRounded />
        <p>HOME</p>
        </Link>
        <div className={styles.txt}>
            <p><span>OOPS ,</span> NOT FOUND PAGE</p>
            <p>4<span>0</span>4</p>
        </div>
    </div>
  )
}

export default NotFound