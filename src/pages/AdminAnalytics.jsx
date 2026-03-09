import { useEffect, useState } from "react";
import api from "../api";
import "./Admin.css";

function AdminAnalytics(){

  const [data,setData] = useState({});

  const loadAnalytics = async()=>{

    const res = await api.get("/admin/analytics");

    setData(res.data);

  }

  useEffect(()=>{
    loadAnalytics();
  },[])

  return(

    <div className="admin-container">

      <h1>Analytics Dashboard</h1>

      <div className="analytics-grid">

        <div className="card">
          <h2>{data.totalOrders}</h2>
          <p>Total Orders</p>
        </div>

        <div className="card">
          <h2>₹{data.totalRevenue}</h2>
          <p>Total Revenue</p>
        </div>

        <div className="card">
          <h2>{data.totalUsers}</h2>
          <p>Total Users</p>
        </div>

        <div className="card">
          <h2>{data.totalProducts}</h2>
          <p>Total Products</p>
        </div>

      </div>

    </div>

  )

}

export default AdminAnalytics;