import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const baseUrl = "https://inventory-system-production-ec9c.up.railway.app";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await axios.post(`${baseUrl}}/api/products`, product, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSuccessMessage("Product added successfully!");
      setProduct({ name: "", category: "", quantity: "", price: "" });
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error adding product:", error);
      setErrorMessage("Failed to add product. Please try again.");
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 flex-col bg-indigo-700 text-white">
        <div className="flex items-center justify-center h-16 font-semibold text-lg bg-indigo-800">
          Inventory Pro
        </div>
        <nav className="mt-4 space-y-2 px-4">
          <Link
            to="/"
            className="flex items-center px-4 py-3 rounded-md hover:bg-indigo-600 transition"
          >
            🔙 Back to Dashboard
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Add New Product
          </h1>

          {/* Success/Error Messages */}
          {successMessage && (
            <div className="p-3 bg-green-100 text-green-700 rounded-md">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md">
              {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={product.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                required
              >
                <option value="">Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home & Garden">Home & Garden</option>
                <option value="Books">Books</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Quantity & Price Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="0"
                  value={product.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="0"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price ($)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    $
                  </span>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={product.price}
                    onChange={handleChange}
                    className="w-full pl-8 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition ${
                  isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Adding...
                  </span>
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddProduct;
