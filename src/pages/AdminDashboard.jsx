import AdminSidebar from "../components/AdminSidebar";
import "./Admin.css";

function AdminDashboard() {
  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-main">

        <h1>Dashboard</h1>

        <div className="cards">

          <div className="card">
            <h3>Total Orders</h3>
            <p>120</p>
          </div>

          <div className="card">
            <h3>Total Products</h3>
            <p>45</p>
          </div>

          <div className="card">
            <h3>Total Users</h3>
            <p>60</p>
          </div>

          <div className="card">
            <h3>Revenue</h3>
            <p>₹80,000</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;