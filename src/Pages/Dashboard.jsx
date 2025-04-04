import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Search,
  Package,
  Truck,
  Users,
  Settings,
  BarChart2,
  Bell,
  Clock,
  Plus,
} from "lucide-react";
import Navigation from "../Components/Navigation";
import ProductList from "../Components/ProductList";
import { useAuth } from "../context/AuthContext";

const baseUrl = "https://inventory-system-production-ec9c.up.railway.app";

const Dashboard = () => {
  const { user } = useAuth();
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/products/total-products`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTotalProducts(response.data.totalProducts);
      } catch (error) {
        console.error("Error fetching total products:", error);
      }
    };

    fetchTotalProducts();
  }, []);

  const [recentActivities] = useState([
    {
      id: 1,
      action: "New item added",
      user: "John Doe",
      time: "10 minutes ago",
      item: "HP Laptop",
    },
    {
      id: 2,
      action: "Item updated",
      user: "Sarah Miller",
      time: "2 hours ago",
      item: "Office Chair",
    },
    {
      id: 3,
      action: "Item out of stock",
      user: "System",
      time: "3 hours ago",
      item: "Printer Ink",
    },
    {
      id: 4,
      action: "Inventory check",
      user: "Mark Johnson",
      time: "Yesterday",
      item: "All Electronics",
    },
  ]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 flex-col bg-indigo-700 text-white overflow-y-auto">
        <div className="flex items-center justify-center h-16 font-semibold text-lg tracking-wide bg-indigo-800">
          Inventory Pro
        </div>
        <nav className="mt-4 space-y-2 px-4">
          <Link
            to="/addProduct"
            className="flex items-center px-4 py-3 rounded-md bg-green-500 hover:bg-green-600 transition"
          >
            <Plus className="w-5 h-5 mr-3" />
            Add Products
          </Link>
          <Link
            to="/"
            className="flex items-center px-4 py-3 rounded-md bg-indigo-800 hover:bg-indigo-600 transition"
          >
            <Package className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          {/* <Link
            to="/search"
            className="flex items-center px-4 py-3 rounded-md hover:bg-indigo-600 transition"
          >
            <Search className="w-5 h-5 mr-3" />
            Search Inventory
          </Link>
          <Link
            to="/orders"
            className="flex items-center px-4 py-3 rounded-md hover:bg-indigo-600 transition"
          >
            <Truck className="w-5 h-5 mr-3" />
            Orders & Shipping
          </Link>
          <Link
            to="/suppliers"
            className="flex items-center px-4 py-3 rounded-md hover:bg-indigo-600 transition"
          >
            <Users className="w-5 h-5 mr-3" />
            Suppliers
          </Link>
          <Link
            to="/reports"
            className="flex items-center px-4 py-3 rounded-md hover:bg-indigo-600 transition"
          >
            <BarChart2 className="w-5 h-5 mr-3" />
            Reports
          </Link>
          <Link
            to="/settings"
            className="flex items-center px-4 py-3 rounded-md hover:bg-indigo-600 transition"
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link> */}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navigation />

        <main className="flex-1 overflow-y-auto p-6 bg-white shadow-md rounded-md">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Dashboard
          </h1>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 bg-white rounded-lg shadow-md flex items-center">
              <Package className="w-6 h-6 text-gray-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Items</p>
                <p className="text-xl font-semibold text-gray-900">
                  {totalProducts}
                </p>
              </div>
            </div>

            {/* <div className="p-5 bg-white rounded-lg shadow-md flex items-center">
              <Clock className="w-6 h-6 text-gray-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Low Stock</p>
                <p className="text-xl font-semibold text-amber-600">28</p>
              </div>
            </div>

            <div className="p-5 bg-white rounded-lg shadow-md flex items-center">
              <Truck className="w-6 h-6 text-gray-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Pending Orders</p>
                <p className="text-xl font-semibold text-gray-900">12</p>
              </div>
            </div>

            <div className="p-5 bg-white rounded-lg shadow-md flex items-center">
              <Users className="w-6 h-6 text-gray-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Active Suppliers</p>
                <p className="text-xl font-semibold text-gray-900">16</p>
              </div>
            </div> */}
          </div>

          {/* Product List Component */}
          <ProductList />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
