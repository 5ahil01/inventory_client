import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import AddProduct from "./Components/AddProduct";
import Auth from "./Components/Auth";
import ProductList from "./Components/ProductList";
import Dashboard from "./Pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/addproduct",
      element: (
        <ProtectedRoute>
          <AddProduct />
        </ProtectedRoute>
      ),
    },
    {
      path: "/products",
      element: (
        <ProtectedRoute>
          <ProductList />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
