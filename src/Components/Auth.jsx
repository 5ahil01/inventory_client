import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const baseUrl = "https://inventory-system-production-ec9c.up.railway.app";

const Auth = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "user",
  });
  const [isRegistering, setIsRegistering] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the path the user was trying to access
  const from = location.state?.from || "/";

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // In your Auth.jsx component, update the handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Add this state if you don't have it
    const endpoint = isRegistering ? "register" : "login";

    try {
      const res = await axios.post(`${baseUrl}/api/auth/${endpoint}`, form);

      if (!isRegistering) {
        // Use the login function from context
        login(res.data.token);
        navigate("/"); // Redirect to dashboard after login
      } else {
        // Show success message and switch to login form
        setIsRegistering(false);
        setError("Registration successful! Please login.");
      }

      setForm({ username: "", password: "", role: "user" });
    } catch (error) {
      console.error("Error:", error);
      setError(error.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white/90 backdrop-blur-md rounded-xl shadow-lg text-center">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        {isRegistering ? "Register" : "Login"}
      </h2>

      {error && (
        <div
          className={`p-3 mb-4 rounded-lg ${
            error.includes("successful")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {error}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {isRegistering && (
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        )}
        <button
          className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
          type="submit"
          disabled={loading}
        >
          {loading ? "Processing..." : isRegistering ? "Register" : "Login"}
        </button>
      </form>
      <button
        className="mt-4 text-blue-600 hover:underline"
        onClick={() => {
          setIsRegistering(!isRegistering);
          setError("");
        }}
      >
        {isRegistering
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </button>
    </div>
  );
};

export default Auth;
