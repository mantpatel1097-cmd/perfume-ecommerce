import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import api from "../api";
import "./Checkout.css";

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment: "COD",
  });

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cartItems.length === 0) {
    return <h2 style={{ padding: "20px" }}>No items to checkout</h2>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {

    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      alert("Please fill all address details");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login required to place order");
      navigate("/login");
      return;
    }

    const orderData = {
      items: cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        qty: item.qty,
        image: item.image
      })),
      address: form,
      totalAmount,
      paymentMethod: form.payment,
    };

    try {

      console.log("ORDER DATA:", orderData);

      await api.post("/orders", orderData);

      clearCart();
      alert("Order placed successfully");

      navigate("/success");

    } catch (error) {

      console.error("Order error:", error.response?.data || error.message);

      alert("Failed to place order");
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-grid">

        <div className="address-box">
          <h2>Delivery Address</h2>

          <input name="name" placeholder="Full Name" onChange={handleChange} />
          <input name="phone" placeholder="Mobile Number" onChange={handleChange} />
          <input name="address" placeholder="Address" onChange={handleChange} />
          <input name="city" placeholder="City" onChange={handleChange} />
          <input name="state" placeholder="State" onChange={handleChange} />
          <input name="pincode" placeholder="Pincode" onChange={handleChange} />
        </div>

        <div className="summary-box">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div className="summary-item" key={item._id}>
              <p>{item.name}</p>
              <p>
                ₹{item.price} × {item.qty}
              </p>
            </div>
          ))}

          <hr />
          <h3>Total: ₹{totalAmount}</h3>

          <div className="payment">
            <h3>Payment Method</h3>

            <label>
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={form.payment === "COD"}
                onChange={handleChange}
              />
              Cash on Delivery
            </label>

            <label>
              <input
                type="radio"
                name="payment"
                value="ONLINE"
                onChange={handleChange}
              />
              Online Payment (Coming Soon)
            </label>
          </div>

          <button className="place-order" onClick={handlePlaceOrder}>
            Place Order
          </button>

        </div>

      </div>
    </div>
  );
}

export default Checkout;