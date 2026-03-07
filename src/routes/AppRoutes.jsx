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
import Analytics from "../pages/admin/Analytics";
import AllProducts from "../pages/admin/AllProducts";
import Categories from "../pages/admin/Categories";
import PaymentReports from "../pages/admin/PaymentReports";
import Reports from "../pages/admin/Reports";

//Brands imports
import VendorLogin from "../pages/auth/VendorLogin";
import VendorRoute from "../components/common/VendorRoute";
import VendorLayout from "../components/layout/VendorLayout";
import VendorDashboard from "../pages/vendor/Dashboard";
import VendorProducts from "../pages/vendor/Products";
import VendorOrders from "../pages/vendor/Orders";
import VendorPayouts from "../pages/vendor/Payouts";
import VendorSettings from "../pages/vendor/Settings";


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
      <Route
        path="/profile"
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
        <Route path="analytics" element={<Analytics />} />
        <Route path="products" element={<AllProducts />} />
        <Route path="categories" element={<Categories />} />
        <Route path="payments" element={<PaymentReports />} />
        <Route path="reports" element={<Reports />} />
      </Route>
    
    <Route path="/vendor/login" element={<VendorLogin />} />
     <Route
        path="/vendor"
        element={
          <VendorRoute>
            <VendorLayout />
          </VendorRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<VendorDashboard />} />
        <Route path="products" element={<VendorProducts />} />
        <Route path="orders" element={<VendorOrders />} />
        <Route path="payouts" element={<VendorPayouts />} />
        <Route path="settings" element={<VendorSettings />} />
        <Route path="products" element={<VendorProducts />} />
</Route>

    </Routes>
  );
}
