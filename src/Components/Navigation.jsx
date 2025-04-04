// src/Components/Navigation.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold">Product Management System</div>
        <div className="flex items-center space-x-6">
          <a href="/" className="hover:text-blue-200">
            Dashboard
          </a>
          <a href="/products" className="hover:text-blue-200">
            Products
          </a>
          {user?.role === "admin" && (
            <a href="/addproduct" className="hover:text-blue-200">
              Add Product
            </a>
          )}
          <div className="flex items-center space-x-3">
            <span className="text-sm">Welcome, {user?.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
