import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { CartContext } from "../context/CartContext";
import "./Shop.css";

function Shop() {

  const [products, setProducts] = useState([]);
  const [qtyMap, setQtyMap] = useState({});

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const loadProducts = async () => {
    try {

      const res = await api.get("/products");

      setProducts(res.data);

      const map = {};
      res.data.forEach((p) => {
        map[p._id] = 1;
      });

      setQtyMap(map);

    } catch (error) {
      console.log("Product load error:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const increase = (id) => {
    setQtyMap((prev) => ({
      ...prev,
      [id]: prev[id] + 1
    }));
  };

  const decrease = (id) => {
    if (qtyMap[id] > 1) {
      setQtyMap((prev) => ({
        ...prev,
        [id]: prev[id] - 1
      }));
    }
  };

  const handleAddToCart = (p) => {

    addToCart({
      _id: p._id,
      name: p.name,
      price: p.price,
      image: p.image,
      qty: qtyMap[p._id]
    });

    alert("Added to cart");

  };

  const handleBuyNow = (p) => {

    addToCart({
      _id: p._id,
      name: p.name,
      price: p.price,
      image: p.image,
      qty: qtyMap[p._id]
    });

    navigate("/checkout");
  };

  return (

    <div className="shop-container">

      <h1>Our Perfumes</h1>

      <div className="product-grid">

        {products.map((p) => (

          <div className="card" key={p._id}>

            <img
              src={`http://localhost:5000${p.image}`}
              alt={p.name}
            />

            <h3>{p.name}</h3>

            <p className="price">₹{p.price}</p>


            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                margin: "10px 0"
              }}
            >

              <button onClick={() => decrease(p._id)}>
                -
              </button>

              <span>{qtyMap[p._id]}</span>

              <button onClick={() => increase(p._id)}>
                +
              </button>

            </div>


            <div style={{ display: "flex", gap: "10px" }}>

              <button
                onClick={() => handleAddToCart(p)}
              >
                Add to Cart
              </button>

              <button
                style={{ background: "#ffa41c" }}
                onClick={() => handleBuyNow(p)}
              >
                Buy Now
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Shop;