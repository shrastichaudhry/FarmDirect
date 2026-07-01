import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Products from "../pages/Products";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import FarmerDashboard from "../pages/FarmerDashboard";
import ConsumerDashboard from "../pages/ConsumerDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoutes";
import MyOrders from "../pages/MyOrders";
import ProductDetails from "../pages/ProductDetails";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/add-product" element={<AddProduct />} />

      <Route path="/edit-product/:id" element={<EditProduct />} />
      <Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute role="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/farmer-dashboard"
  element={
    <ProtectedRoute role="farmer">
      <FarmerDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/consumer-dashboard"
  element={
    <ProtectedRoute role="consumer">
      <ConsumerDashboard />
    </ProtectedRoute>
  }
/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AppRoutes;