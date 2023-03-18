import React , {useEffect} from "react";
import { useDispatch , useSelector } from "react-redux";
import OrderRow from "../component/OrderRow";
import styles from "./orders.module.css";
import { getAllOrdersListFromDB } from '../store/orders-actions'

const Orders = () => {


  const dispatch = useDispatch()
  const token = useSelector((state)=> state.auth.token)
  const orderesList = useSelector((state)=> state.orders.ordersList)
  useEffect(()=>{
     dispatch(getAllOrdersListFromDB(token))
  } , 
  [orderesList])

  return (
    <div className={styles.orders}>
      <p>
        Your <span>Orderd</span> Dishes
      </p>
      <table className={styles.container}>
        <thead>
          <tr>
            <th>
              <p>ID</p>
            </th>
            <th>
              <p>Date</p>
            </th>
            <th>
              <p>Price</p>
            </th>
            <th>
              <p>Status</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {orderesList ? orderesList.map((el)=>{
            return (
              <OrderRow
                  key={el._id}
                  id={el._id}
                  date={(el.updatedAt.split('T')[0])}
                  price={el.price}
                  status={el.status}/>
            )
          }) : null}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
