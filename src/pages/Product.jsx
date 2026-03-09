import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import { CartContext } from "../context/CartContext";
import "./Product.css";

function Product() {
  const { id } = useParams(); // 👈 URL se id
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const product = products.find((p) => p.id === Number(id));

  const [qty, setQty] = useState(1);

  if (!product) {
    return <h2 style={{ padding: "20px" }}>Product not found</h2>;
  }

  const increase = () => setQty(qty + 1);
  const decrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: qty,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  return (
    <div className="product-container">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-details">
        <h1>{product.name}</h1>

        <div className="rating">
          ⭐⭐⭐⭐⭐ <span>(4.8/5)</span>
        </div>

        <p className="price">₹{product.price}</p>

        <p className="description">
          Long-lasting premium fragrance. Perfect for daily wear
          and special occasions.
        </p>

        <div className="quantity">
          <button onClick={decrease}>−</button>
          <span>{qty}</span>
          <button onClick={increase}>+</button>
        </div>

        <div className="buttons">
          <button className="add-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>

          <button className="buy-now" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
