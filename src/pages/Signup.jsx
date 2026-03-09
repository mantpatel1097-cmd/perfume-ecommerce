import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import "./Auth.css";

function Signup() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if(name.length<3) return alert("Name too short");
    if(!email.includes("@")) return alert("Invalid email");
    if(password.length<6) return alert("Password min 6 chars");

    try{
      await api.post("/auth/register",{name,email,password});
      alert("Signup successful");
      navigate("/login");
    }catch{
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Signup</h2>

        <input placeholder="Name" onChange={(e)=>setName(e.target.value)} />
        <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)} />

        <button onClick={handleSignup}>Register</button>

        <div className="auth-links">
          Already user? <Link to="/login"><span>Login</span></Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
