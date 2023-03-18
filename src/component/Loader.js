import React  from 'react'
import style from './loader.module.css'
import {CircularProgress} from '@mui/material'
const Loader = () => {
  return (
    
    <div className={style.loader}>
      <CircularProgress color="warning" />
    </div>
    
 )
}

export default Loader