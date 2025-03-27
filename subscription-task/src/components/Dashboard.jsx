import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAPIs } from "../redux/apiSlice";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const apis = useSelector((state) => state.api.apis);
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4001/apis")
      .then((res) => res.json())
      .then((data) => dispatch(setAPIs(data)));
  }, [dispatch]);

  const handleSubscribe = (apiId) => {
    fetch("http://localhost:4001/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.userId, api_id: apiId }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message));

    navigate("/tokens");
  };

  return (
    <div className="dashboard-container">
      <div><h2 className="center">Available APIs</h2>
      
      <table className="api-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {apis?.map((api) => (
            <tr key={api.id}>
              <td>{api.name}</td>
              <td>{api.description}</td>
              <td>
                <button onClick={() => handleSubscribe(api.id)}>Subscribe</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Dashboard;
