import { Link } from "react-router-dom";
import "./AdminSidebar.css";

function AdminSidebar() {
  return (
    <div className="admin-sidebar">

      <h2>Admin Panel</h2>

      <Link to="/admin">Dashboard</Link>
      <Link to="/admin/orders">Orders</Link>
      <Link to="/admin/products">Products</Link>
      <Link to="/admin/users">Users</Link>
      <Link to="/admin/analytics">Analytics</Link>

    </div>
  );
}

export default AdminSidebar;