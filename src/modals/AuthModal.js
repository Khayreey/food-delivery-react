import styles from './auth.module.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Logo from "../assets/logo/food-logo.png";
import Modal from '@mui/material/Modal';
import {Link} from 'react-router-dom'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  height : '60%',
  bgcolor: 'white',
  border: '1px solid white',
  boxShadow: 24,
  borderRadius: '10px' ,
  display : 'flex' ,
  flexDirection: 'column' ,
  justifyContent: 'space-between',
  alignItems : 'center' ,
  '@media (max-width: 780px)': {
    width: '80%'
  }

};
const AuthModal = (props)=>{

    const handleClose = () => {
        props.setIsAuthModalOpen(false);
    }
    return (
        <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={Logo} alt="food-delivery-logo" className={styles.logoImg} />
          <Typography id="modal-modal-title" variant="h4" component="h2" sx={{borderBottom: '4px solid orange'}}>
          {props.action}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h3" sx={{textAlign : 'center' , color : 'rgb(92, 90, 90)' , padding : '0rem 1rem'}}>
           {props.txt} 
          </Typography>
          <div className={styles.actions}>
                <button onClick={props.clickHandler}>
                    <Link to={props.link}>{props.ctaButton}</Link>
                </button>  
                <button onClick={handleClose}>
                    Cancel
                </button>  
            </div>  
        </Box>
      </Modal>
    )
}

export default AuthModal 