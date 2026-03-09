import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      if (res.data.token) {
        login(res.data.user, res.data.token);
        alert("Login successful");
        navigate("/");
      } else {
        alert(res.data.message);
      }

    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/forgot">
          <div className="forgot">Forgot password?</div>
        </Link>

        <button onClick={handleLogin}>Login</button>

        <div className="auth-links">
          New user? <Link to="/signup"><span>Signup</span></Link>
        </div>
      </div>
    </div>
  );
}

export default Login;