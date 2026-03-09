import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { CartContext } from "../context/CartContext";
import "./Home.css";
import "./Shop.css";

function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/products").then((res) => {
      setProducts(res.data.slice(0, 3));
    });
  }, []);

  const buyNow = (p) => {
    addToCart({
      id: p._id,
      name: p.name,
      price: p.price,
      qty: 1,
    });
    navigate("/checkout");
  };

  return (
    <>
      {/* HERO */}
      <div className="home-hero">
        <div className="hero-content">
          <h1>Luxury Fragrances</h1>
          <p>Premium perfumes crafted for elegance & confidence.</p>
          <button onClick={() => navigate("/shop")}>Shop Now</button>
        </div>
      </div>

      {/* WHY US */}
      <div className="why-us">
        <div className="why-card">🌿 Long Lasting</div>
        <div className="why-card">💎 Premium Quality</div>
        <div className="why-card">🚚 Fast Delivery</div>
        <div className="why-card">❤️ Loved by Customers</div>
      </div>

      {/* FEATURED */}
      <div className="featured">
        <h2>Featured Perfumes</h2>

        <div className="product-grid">
          {products.map((p) => (
            <div className="card" key={p._id}>
              <img src={`http://localhost:5000${p.image}`} />
              <h3>{p.name}</h3>
              <p className="price">₹{p.price}</p>
              <button onClick={() => buyNow(p)}>Buy Now</button>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIAL */}
      <div className="testimonial">
        <h2>What Our Customers Say</h2>
        <p>
          “Absolutely premium fragrances. Long lasting and elegant — feels
          luxury!”
        </p>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <p>© 2026 PerfumeStore — Luxury Redefined</p>
      </div>
    </>
  );
}

export default Home;
