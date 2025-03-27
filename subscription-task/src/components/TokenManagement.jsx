import React, { useState } from "react";
import { useSelector } from "react-redux"; // ✅ Import Redux state
import "../styles/TokenManagement.css";
import { useNavigate } from "react-router-dom";

const TokenManagement = () => {
  const [apiId, setApiId] = useState("");
  const [token, setToken] = useState(null);
  const navigate = useNavigate()
  const authToken = useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const handleGenerateToken = () => {
    fetch("http://localhost:4001/generate", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${authToken}` 
      },
      body: JSON.stringify({ api_id: apiId }),
    })
      .then((res) => res.json())
      .then((data) => setToken(data.token))
      navigate("/logs")
      .catch((err) => console.error("Error generating token:", err));
  };

  return (
    <div className="token-container">
    <h2>Generate API Token</h2>
    <input 
      type="text" 
      placeholder="Enter API ID" 
      value={apiId} 
      onChange={(e) => setApiId(e.target.value)} 
    />
    <button onClick={handleGenerateToken} disabled={!authToken}>Generate Token</button>
  
    {token && (
      <div className="token-text">
        <strong>Token:</strong> {token}
      </div>
    )}
  </div>
  
  );
};

export default TokenManagement;
