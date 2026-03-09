import { useEffect, useState } from "react";
import api from "../api";
import "./Admin.css";

function AdminOrders(){

  const [orders,setOrders] = useState([]);
  const [selectedOrder,setSelectedOrder] = useState(null);

  const fetchOrders = async ()=>{
    const res = await api.get("/orders/all");
    setOrders(res.data);
  }

  useEffect(()=>{
    fetchOrders();
  },[])

  const updateStatus = async(id,status)=>{
    await api.put(`/orders/${id}/status`,{status});
    fetchOrders();
  }

  return(

    <div className="admin-container">

      <h1>Orders</h1>

      <table className="admin-table">

        <thead>
          <tr>
            <th>Customer</th>
            <th>Email</th>
            <th>Total</th>
            <th>Status</th>
            <th>View</th>
          </tr>
        </thead>

        <tbody>

          {orders.map((o)=>(
            <tr key={o._id}>

              <td>{o.user?.name}</td>
              <td>{o.user?.email}</td>
              <td>₹{o.totalAmount}</td>

              <td>
                <select
                  value={o.status}
                  onChange={(e)=>updateStatus(o._id,e.target.value)}
                >
                  <option>Placed</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </td>

              <td>

                <button
                  onClick={()=>{
                    console.log("ORDER CLICKED",o)
                    setSelectedOrder(o)
                  }}
                >
                  View
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>


      {/* ORDER MODAL */}

      {selectedOrder !== null && (

        <div className="order-modal">

          <div className="order-box">

            <h2>Order Details</h2>

            <p><b>Name:</b> {selectedOrder.user?.name}</p>
            <p><b>Email:</b> {selectedOrder.user?.email}</p>

            <p><b>Total:</b> ₹{selectedOrder.totalAmount}</p>

            <h3>Items</h3>

            {selectedOrder.items?.map((item,i)=>(
              <div key={i}>
                {item.name} — Qty: {item.qty}
              </div>
            ))}

            <button
              onClick={()=>setSelectedOrder(null)}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  )
}

export default AdminOrders