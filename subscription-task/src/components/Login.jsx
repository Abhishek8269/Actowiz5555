import "../styles/Auth.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";  // ✅ Import the correct function
import { useNavigate } from "react-router-dom";
import TokenManagement from "./TokenManagement";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data,"data")
      if (response.ok) {
        localStorage.setItem("token", data.token);
        dispatch(setUser({ user: email, token: data.token ,userId:data.user_id})); 
        navigate("/dashboard");
      } else {
        alert(data.error); 
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;