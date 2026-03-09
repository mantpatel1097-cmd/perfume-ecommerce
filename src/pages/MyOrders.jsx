import { useEffect, useState } from "react";
import api from "../api";

function MyOrders(){

  const [orders,setOrders] = useState([]);

  const fetchOrders = async ()=>{
    try{

      const res = await api.get("/orders/my-orders");

      setOrders(res.data);

    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchOrders();
  },[])

  return(

    <div style={{padding:"40px"}}>

      <h1>My Orders</h1>

      {orders.map((o)=>(
        <div key={o._id} style={{border:"1px solid #ddd",padding:"20px",marginBottom:"20px"}}>

          <h3>Status: {o.status}</h3>

          <p>Total: ₹{o.totalAmount}</p>

          <h4>Items</h4>

          {o.items.map((item,i)=>(
            <div key={i}>
              {item.name} — Qty: {item.qty}
            </div>
          ))}

        </div>
      ))}

    </div>

  )
}

export default MyOrders