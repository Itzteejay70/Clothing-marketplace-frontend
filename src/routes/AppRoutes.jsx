import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/public/Home";
import Brands from "../pages/public/Brands";
import Shop from "../pages/public/Shop";
import NewArrivals from "../pages/public/NewArrivals";
import Trending from "../pages/public/Trending";
import ProductDetails from "../pages/public/ProductDetails";
import Cart from "../pages/public/Cart";
import Checkout from "../pages/public/Checkout";

import Profile from "../pages/public/Profile";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ProtectedRoute from "../components/common/ProtectedRoute";

// Admin imports
import AdminLogin from "../pages/auth/AdminLogin";
import AdminLayout from "../components/layout/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import ApproveProducts from "../pages/admin/ApproveProducts";
import ApproveVendors from "../pages/admin/ApproveVendors";
import Orders from "../pages/admin/Orders";
import Users from "../pages/admin/Users";
import Settings from "../pages/admin/Settings";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/brands" element={<Brands />} />
      <Route path="/brands/:id" element={<Brands />} />
      <Route path="/new-arrivals" element={<NewArrivals />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Routes */}
      <Route path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
     

      {/* Admin Login Route */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="approve-products" element={<ApproveProducts />} />
        <Route path="approve-vendors" element={<ApproveVendors />} />
        <Route path="orders" element={<Orders />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
