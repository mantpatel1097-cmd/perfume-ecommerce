import { useEffect, useState } from "react";
import api from "../api";
import "./Admin.css";

function AdminProducts(){

  const [products,setProducts] = useState([]);

  const [editingId,setEditingId] = useState(null);

  const [form,setForm] = useState({
    name:"",
    price:"",
    stock:"",
    description:""
  });

  const [image,setImage] = useState(null);


  const fetchProducts = async ()=>{
    const res = await api.get("/products");
    setProducts(res.data);
  }

  useEffect(()=>{
    fetchProducts();
  },[])


  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }


  const handleAdd = async ()=>{

    const data = new FormData();

    data.append("name",form.name);
    data.append("price",form.price);
    data.append("stock",form.stock);
    data.append("description",form.description);
    data.append("image",image);

    await api.post("/products",data);

    alert("Product Added");

    setForm({
      name:"",
      price:"",
      stock:"",
      description:""
    })

    fetchProducts();
  }


  const startEdit = (p)=>{
    setEditingId(p._id);

    setForm({
      name:p.name,
      price:p.price,
      stock:p.stock,
      description:p.description
    })
  }


  const handleUpdate = async ()=>{

    const data = new FormData();

    data.append("name",form.name);
    data.append("price",form.price);
    data.append("stock",form.stock);
    data.append("description",form.description);

    if(image){
      data.append("image",image)
    }

    await api.put(`/products/${editingId}`,data);

    alert("Product Updated")

    setEditingId(null)

    fetchProducts()
  }


  const deleteProduct = async(id)=>{

    await api.delete(`/products/${id}`)

    alert("Product Deleted")

    fetchProducts()
  }


  return(

    <div className="admin-container">

      <h1>Manage Products</h1>


      <div className="product-form">

        <input
          name="name"
          placeholder="Product Name"
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

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          type="file"
          onChange={(e)=>setImage(e.target.files[0])}
        />

        {editingId ? (

          <button onClick={handleUpdate}>
            Update Product
          </button>

        ) : (

          <button onClick={handleAdd}>
            Add Product
          </button>

        )}

      </div>


      <table className="admin-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {products.map((p)=>(
            <tr key={p._id}>

              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>{p.stock}</td>

              <td>

                <button
                  onClick={()=>startEdit(p)}
                >
                  Edit
                </button>

                <button
                  onClick={()=>deleteProduct(p._id)}
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>

  )

}

export default AdminProducts