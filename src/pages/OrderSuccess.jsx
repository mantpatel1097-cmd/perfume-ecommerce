import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>🎉 Order Placed Successfully!</h1>
      <p>Thank you for shopping with us.</p>

      <Link to="/shop">
        <button
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            background: "#ffd814",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}

export default OrderSuccess;
