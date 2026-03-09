import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">PerfumeStore</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>

        {user && <Link to="/orders">My Orders</Link>}

        <Link to="/cart" className="cart-link">
          Cart
          {totalQty > 0 && <span className="cart-badge">{totalQty}</span>}
        </Link>

        {/* AUTH AREA */}
        {user ? (
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <span style={{ color: "white" }}>Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              style={{
                background: "#ffa41c",
                border: "none",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
