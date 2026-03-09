import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cartItems, updateQty, removeFromCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cartItems.length === 0) {
    return <h2 style={{ padding: "20px" }}>Your cart is empty</h2>;
  }

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h1>Your Cart</h1>

      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            borderBottom: "1px solid #ddd",
            padding: "15px 0",
          }}
        >
          <h3>{item.name}</h3>
          <p>Price: ₹{item.price}</p>

          {/* ➕➖ Quantity Selector */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={() =>
                item.qty > 1 && updateQty(item.id, item.qty - 1)
              }
            >
              −
            </button>

            <strong>{item.qty}</strong>

            <button
              onClick={() => updateQty(item.id, item.qty + 1)}
            >
              +
            </button>
          </div>

          <p>Subtotal: ₹{item.price * item.qty}</p>

          <button
            onClick={() => removeFromCart(item.id)}
            style={{ color: "red", marginTop: "5px" }}
          >
            Remove
          </button>
        </div>
      ))}

      <h2 style={{ marginTop: "20px" }}>
        Total: ₹{totalAmount}
      </h2>

      {/* ✅ CART → CHECKOUT BUTTON */}
      <button
        onClick={() => navigate("/checkout")}
        style={{
          marginTop: "20px",
          padding: "14px 24px",
          background: "#ffa41c",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
          borderRadius: "6px",
          width: "100%",
          fontSize: "16px",
        }}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Cart;
