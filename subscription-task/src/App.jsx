import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/appStore";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import TokenManagement from "./components/TokenManagement";
import UserLogs from "./components/UserLogs"

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tokens" element={<TokenManagement />} />
            <Route path="/logs" element={<UserLogs />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;