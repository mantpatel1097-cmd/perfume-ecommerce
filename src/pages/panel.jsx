import { useEffect, useState } from "react";
import api from "../api";

function Admin() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    image: null,
    description: "",
  });

  const loadProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD or UPDATE product
  const saveProduct = async () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("description", form.description);

    if (form.image) {
      formData.append("image", form.image);
    }

    if (editId) {
      // UPDATE
      await api.put(`/products/${editId}`, formData);
      alert("Product updated");
    } else {
      // ADD
      await api.post("/products", formData);
      alert("Product added");
    }

    setEditId(null);
    setForm({
      name: "",
      price: "",
      stock: "",
      image: null,
      description: "",
    });

    loadProducts();
  };

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    loadProducts();
  };

  const startEdit = (p) => {
    setEditId(p._id);
    setForm({
      name: p.name,
      price: p.price,
      stock: p.stock,
      description: p.description,
      image: null, // image optional
    });
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Panel</h1>

      <h3>{editId ? "Edit Product" : "Add Product"}</h3>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
      />

      <input
        name="stock"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
      />

      {/* Image upload */}
      <input
        type="file"
        onChange={(e) =>
          setForm({ ...form, image: e.target.files[0] })
        }
      />

      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={saveProduct}>
        {editId ? "Update Product" : "Add Product"}
      </button>

      {editId && (
        <button
          style={{ marginLeft: "10px" }}
          onClick={() => {
            setEditId(null);
            setForm({
              name: "",
              price: "",
              stock: "",
              image: null,
              description: "",
            });
          }}
        >
          Cancel
        </button>
      )}

      <hr />

      <h3>Products</h3>

      {products.map((p) => (
        <div
          key={p._id}
          style={{
            borderBottom: "1px solid #ccc",
            padding: "10px 0",
          }}
        >
          <p>
            <b>{p.name}</b> – ₹{p.price} (Stock: {p.stock})
          </p>

          {p.image && (
            <img
              src={`http://localhost:5000${p.image}`}
              alt={p.name}
              width="80"
            />
          )}

          <br />

          <button onClick={() => startEdit(p)}>Edit</button>
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => deleteProduct(p._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;
