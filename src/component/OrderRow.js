import styles from './orderrow.module.css'
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
const OrderRow = (props)=>{
    let status = {
        "pending" : {icon : <PendingIcon /> , style : styles.pending} , 
        "done" : {icon : <CheckCircleIcon /> , style : styles.done} ,
        "cancel" : {icon :<CancelIcon /> , style : styles.cancel} , 
        "onWay" : {icon :<LocalShippingIcon /> , style : styles.onWay}

    } 
    return (
    <tr>
        <td>{props.id}</td>
        <td>{props.date}</td>
        <td>{props.price}LE</td>
        <td className={`${styles.status} + ${status[props.status].style}`}>
            {status[props.status].icon}
            <p>{ props.status}</p>
        </td>
    </tr>
    )
}

export default OrderRow