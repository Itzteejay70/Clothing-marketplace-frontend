import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  House,
  ShoppingBag,
  Users,
  ShoppingCart,
  Gear,
  SealCheck,
  SignOut,
  List,
  X,
  ChartBar,
  Tag,
  CreditCard,
  UsersFour,
  TrendUp,
  Bell,
  MagnifyingGlass,
  Check,
  Clock,
  Warning,
  WarningCircle,
  CaretDown,
  User,
  ShieldCheck,
  Storefront,
} from "@phosphor-icons/react";

export default function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);

  const notificationRef = useRef(null);
  const searchRef = useRef(null);

  const [notifications] = useState([
    {
      id: 1,
      type: "success",
      title: "New Order Received",
      message: "Order #ORD-1234 has been placed",
      time: "2 mins ago",
      read: false,
    },
    {
      id: 2,
      type: "warning",
      title: "Product Approval Pending",
      message: "5 products waiting for your approval",
      time: "15 mins ago",
      read: false,
    },
    {
      id: 3,
      type: "info",
      title: "New Vendor Registration",
      message: "Fashion Hub wants to join as vendor",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 4,
      type: "success",
      title: "Payment Received",
      message: "₦150,000 payment confirmed",
      time: "2 hours ago",
      read: true,
    },
    {
      id: 5,
      type: "info",
      title: "Low Stock Alert",
      message: "Nike Air Max 270 running low",
      time: "3 hours ago",
      read: true,
    },
  ]);

  const mockSearchData = [
    { type: "Product", name: "Nike Air Max 270", path: "/admin/products" },
    { type: "Product", name: "Adidas Ultraboost", path: "/admin/products" },
    { type: "Order", name: "Order #ORD-001", path: "/admin/orders" },
    { type: "Order", name: "Order #ORD-002", path: "/admin/orders" },
    { type: "User", name: "John Doe", path: "/admin/users" },
    { type: "User", name: "Jane Smith", path: "/admin/users" },
    { type: "Vendor", name: "Sneaker Palace", path: "/admin/approve-vendors" },
  ];

  useEffect(() => {
    const checkAuth = () => {
      try {
        const adminAuth = localStorage.getItem("adminAuth");
        const adminUser = localStorage.getItem("adminUser");
        if (adminAuth === "true" && adminUser) {
          setUser(JSON.parse(adminUser));
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      )
        setShowNotifications(false);
      if (searchRef.current && !searchRef.current.contains(e.target))
        setShowSearchResults(false);
      if (profileRef.current && !profileRef.current.contains(e.target))
        setShowProfile(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }
    const filtered = mockSearchData.filter(
      (i) =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.type.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setSearchResults(filtered);
    setShowSearchResults(true);
  }, [searchQuery]);

  const confirmLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminUser");
    window.location.href = "/admin/login";
  };

  const getNotifStyle = (type) => {
    const map = {
      success: { bg: "rgba(22,163,74,0.1)", color: "#16a34a", Icon: Check },
      warning: { bg: "rgba(249,115,22,0.1)", color: "#f97316", Icon: Warning },
      info: { bg: "rgba(14,165,233,0.1)", color: "#0ea5e9", Icon: Clock },
    };
    return (
      map[type] || { bg: "rgba(148,163,184,0.1)", color: "#94a3b8", Icon: Bell }
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: House },
    {
      path: "/admin/approve-products",
      label: "Approve Products",
      icon: SealCheck,
    },
    {
      path: "/admin/approve-vendors",
      label: "Approve Vendors",
      icon: UsersFour,
    },
    { path: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { path: "/admin/users", label: "Users", icon: Users },
    { path: "/admin/analytics", label: "Analytics", icon: ChartBar },
    { path: "/admin/products", label: "All Products", icon: ShoppingBag },
    { path: "/admin/categories", label: "Categories", icon: Tag },
    { path: "/admin/payments", label: "Payments", icon: CreditCard },
    { path: "/admin/reports", label: "Reports", icon: TrendUp },
    { path: "/admin/notifications", label: "Notifications", icon: Bell },
    { path: "/admin/view-store", label: "View Store", icon: Storefront },
    { path: "/admin/profile", label: "Profile", icon: User },
    { path: "/admin/settings", label: "Settings", icon: Gear },
  ];

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0a0a0a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 44,
              height: 44,
              border: "3px solid rgba(22,163,74,0.2)",
              borderTopColor: "#16a34a",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 12px",
            }}
          ></div>
          <p style={{ color: "#16a34a", fontWeight: 600, fontSize: 14 }}>
            Loading...
          </p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (isAuthenticated === false) return <Navigate to="/admin/login" replace />;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

        :root {
          --green-active: #22c55e;
          --green-hover: rgba(34,197,94,0.14);
          --sidebar-bg: #0a0a0a;
          --sidebar-border: rgba(255,255,255,0.06);
          --sidebar-width: 240px;
          --topbar-h: 64px;
          --text-muted: rgba(255,255,255,0.72);
          --text-dim: rgba(255,255,255,0.6);
          --text-bright: #ffffff;
        }

        .layout-root * { box-sizing: border-box; margin: 0; padding: 0; }
        .layout-root { font-family: 'Poppins', sans-serif; }

        /* ════════════════════════════════
           SIDEBAR
        ════════════════════════════════ */
        .sidebar {
          width: var(--sidebar-width);
          flex-shrink: 0;
          background: var(--sidebar-bg);
          display: flex;
          flex-direction: column;
          height: 100vh;
          position: sticky;
          top: 0;
          z-index: 30;
          overflow: hidden;
        }

        .sidebar::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: 0;
        }

        .sidebar::after {
          content: '';
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 200px; height: 120px;
          background: radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .sidebar > * { position: relative; z-index: 1; }

        .sidebar-logo {
          padding: 0 20px;
          height: var(--topbar-h);
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--sidebar-border);
          background: rgba(255,255,255,0.02);
          flex-shrink: 0;
        }
        .logo-text { font-size: 19px; font-weight: 800; color: #fff; letter-spacing: -0.5px; }
        .logo-text span { color: var(--green-active); }
        .logo-dot {
          display: inline-block;
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--green-active);
          margin-left: 3px; vertical-align: middle; margin-bottom: 2px;
          box-shadow: 0 0 8px var(--green-active);
          animation: pulseDot 2.5s ease-in-out infinite;
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px var(--green-active); }
          50% { opacity: 0.4; box-shadow: 0 0 3px var(--green-active); }
        }
        .logo-sub {
          font-size: 9px; font-weight: 600;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase; letter-spacing: 1.2px; margin-top: 2px;
        }

        /* Nav */
        .sidebar-nav {
          flex: 1;
          padding: 16px 14px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .sidebar-nav::-webkit-scrollbar { width: 0; }

        .nav-section-label {
          font-size: 9px; font-weight: 700;
          color: rgba(255,255,255,0.18);
          text-transform: uppercase; letter-spacing: 1.4px;
          padding: 10px 10px 4px;
        }

        /* ── NAV ITEM ── */
        .nav-item {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 10px 12px;
          border-radius: 14px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-muted);
          text-decoration: none;
          border: 1px solid transparent;
          position: relative;
          overflow: hidden;
          transition:
            color 0.3s ease,
            border-color 0.3s ease,
            transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          will-change: transform;
          animation: slideInNav 0.35s ease both;
        }

        /* ── LIQUID BLOB — starts as a small circle, floods to fill ── */
        .nav-item::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 12px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--green-active);
          opacity: 0;
          transform: translateY(-50%) scale(0);
          transition:
            width  0.5s cubic-bezier(0.34, 1.1, 0.64, 1),
            height 0.5s cubic-bezier(0.34, 1.1, 0.64, 1),
            left   0.5s cubic-bezier(0.34, 1.1, 0.64, 1),
            top    0.5s cubic-bezier(0.34, 1.1, 0.64, 1),
            border-radius 0.5s cubic-bezier(0.34, 1.1, 0.64, 1),
            opacity 0.2s ease,
            transform 0.5s cubic-bezier(0.34, 1.1, 0.64, 1);
          z-index: 0;
          pointer-events: none;
        }

        /* Blob expands and morphs to fill the entire row */
        .nav-item:hover::before {
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 14px;
          opacity: 0.13;
          transform: translateY(0) scale(1);
        }

        /* Left accent bar */
        .nav-item::after {
          content: '';
          position: absolute;
          left: 0; top: 18%; height: 64%;
          width: 3px;
          border-radius: 0 3px 3px 0;
          background: var(--green-active);
          transform: scaleY(0);
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 2;
        }
        .nav-item:hover::after { transform: scaleY(1); }

        .nav-item:hover {
          color: var(--text-bright);
          border-color: rgba(34,197,94,0.18);
          transform: translateX(4px);
        }

        /* ── ACTIVE: solid green pill with animated liquid shine + blob ── */
        .nav-item.active {
          background: rgba(34,197,94,0.35);
          backdrop-filter: blur(32px) saturate(220%) brightness(1.3);
          -webkit-backdrop-filter: blur(32px) saturate(220%) brightness(1.3);
          color: #fff;
          border: 1px solid rgba(34,197,94,0.5);
          font-weight: 700;
          border-radius: 14px;
          box-shadow:
            0 4px 24px rgba(34,197,94,0.4),
            0 1px 0 rgba(255,255,255,0.25) inset,
            0 0 0 1px rgba(34,197,94,0.2) inset;
          transform: none;
          overflow: hidden;
        }

        /* Active: sweeping light gloss — liquidShine */
        .nav-item.active::before {
          content: '';
          position: absolute;
          top: -10%; left: -60%;
          width: 45%; height: 120%;
          background: linear-gradient(
            110deg,
            transparent 25%,
            rgba(255,255,255,0.22) 50%,
            transparent 75%
          );
          border-radius: 0;
          opacity: 1;
          transform: skewX(-12deg);
          animation: liquidShine 2.8s ease-in-out infinite;
          z-index: 1;
          pointer-events: none;
        }

        @keyframes liquidShine {
          0%        { left: -60%;  opacity: 0; }
          8%        { opacity: 1; }
          55%       { left: 130%; opacity: 1; }
          56%, 100% { left: 130%; opacity: 0; }
        }

        /* Active: morphing blob at bottom-right */
        .nav-item.active::after {
          content: '';
          position: absolute;
          bottom: -16px; right: -16px;
          width: 56px; height: 56px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          transform: scale(1);
          animation: liquidBlob 3.5s ease-in-out infinite;
          z-index: 0;
          pointer-events: none;
          display: block;
        }

        @keyframes liquidBlob {
          0%, 100% { transform: scale(1);    border-radius: 50%; }
          30%       { transform: scale(1.4);  border-radius: 38% 62% 52% 48% / 44% 56% 44% 56%; }
          65%       { transform: scale(0.85); border-radius: 62% 38% 48% 52% / 56% 44% 56% 44%; }
        }

        .nav-item.active:hover { transform: none; cursor: default; }

        /* Icons */
        .nav-item-icon {
          width: 20px; height: 20px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          position: relative; z-index: 1;
        }
        .nav-item-icon svg {
          width: 19px; height: 19px;
          color: var(--text-muted);
          transition: color 0.2s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .nav-item:hover .nav-item-icon svg { color: var(--green-active); transform: scale(1.15); }
        .nav-item.active .nav-item-icon svg { color: #fff; }

        .nav-item-label {
          flex: 1;
          position: relative; z-index: 1;
          transition: color 0.2s ease;
        }

        /* Footer */
        .sidebar-footer {
          padding: 14px;
          border-top: 1px solid var(--sidebar-border);
          flex-shrink: 0;
          background: rgba(0,0,0,0.3);
        }

        .logout-btn {
          display: flex; align-items: center; gap: 8px;
          width: 100%; padding: 8px 11px; border-radius: 9px;
          font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.35);
          background: transparent; border: 1px solid transparent;
          cursor: pointer; font-family: inherit;
          position: relative; overflow: hidden;
          transition: color 0.2s ease, border-color 0.2s ease, transform 0.18s ease;
        }
        .logout-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: rgba(239,68,68,0.08);
          border-radius: 9px;
          transform: translateX(-100%);
          transition: transform 0.42s cubic-bezier(0.34, 1.2, 0.64, 1);
        }
        .logout-btn:hover::before { transform: translateX(0); }
        .logout-btn:hover { color: #f87171; border-color: rgba(239,68,68,0.18); transform: translateX(4px); }
        .logout-btn svg { width: 15px; height: 15px; flex-shrink: 0; position: relative; z-index: 1; }
        .logout-btn span { position: relative; z-index: 1; }

        /* ════════════════════════════════
           TOPBAR
        ════════════════════════════════ */
        .topbar {
          height: 68px; flex-shrink: 0;
          background: #0a0a0a;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          box-shadow: 0 1px 0 rgba(0,0,0,0.5);
          display: flex; align-items: center;
          padding: 0 28px; gap: 16px;
          position: sticky; top: 0; z-index: 20;
        }

        .topbar-page-title {
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.2px;
          white-space: nowrap;
        }

        .topbar-divider {
          width: 1px;
          height: 22px;
          background: rgba(255,255,255,0.1);
          flex-shrink: 0;
        }

        .search-box {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 16px; border-radius: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          width: 380px; transition: all 0.25s ease;
        }
        .search-box:focus-within {
          border-color: rgba(34,197,94,0.45);
          background: rgba(34,197,94,0.06);
          box-shadow: 0 0 0 3px rgba(34,197,94,0.1);
          width: 420px;
        }
        .search-box svg { width: 14px; height: 14px; color: rgba(255,255,255,0.28); flex-shrink: 0; }
        .search-input { flex: 1; border: none; background: transparent; outline: none; font-size: 13px; font-weight: 400; color: #fff; font-family: inherit; }
        .search-input::placeholder { color: rgba(255,255,255,0.22); }

        .search-dropdown {
          position: absolute; top: calc(100% + 8px); left: 0; right: 0;
          background: rgba(18,18,18,0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px; box-shadow: 0 12px 40px rgba(0,0,0,0.6);
          overflow: hidden; z-index: 50; animation: dropIn 0.18s ease;
        }
        @keyframes dropIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }

        .search-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px; text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: background 0.15s;
        }
        .search-item:last-child { border-bottom: none; }
        .search-item:hover { background: rgba(34,197,94,0.07); }
        .search-item-icon { width: 28px; height: 28px; border-radius: 8px; background: rgba(34,197,94,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .search-item-name { font-size: 12px; font-weight: 700; color: #fff; }
        .search-item-type { font-size: 10px; color: rgba(255,255,255,0.35); margin-top: 1px; }

        .topbar-right { display: flex; align-items: center; gap: 10px; margin-left: auto; }

        .icon-btn {
          width: 38px; height: 38px; border-radius: 50%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s ease; position: relative;
        }
        .icon-btn:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.18);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .icon-btn svg { width: 17px; height: 17px; color: #ffffff; }

        .notif-badge {
          position: absolute; top: -4px; right: -4px;
          width: 17px; height: 17px; border-radius: 50%;
          background: #ef4444; color: white;
          font-size: 9px; font-weight: 800;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid #0a0a0a;
          box-shadow: 0 0 8px rgba(239,68,68,0.5);
        }

        .notif-dropdown {
          position: absolute; right: 0; top: calc(100% + 10px); width: 360px;
          background: rgba(16,16,16,0.96);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.65);
          z-index: 50; overflow: hidden; animation: dropIn 0.18s ease;
        }
        .notif-header { padding: 16px 18px 12px; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: space-between; }
        .notif-title { font-size: 14px; font-weight: 700; color: #fff; }
        .notif-count { padding: 2px 9px; border-radius: 999px; background: rgba(239,68,68,0.15); color: #f87171; font-size: 10px; font-weight: 700; }
        .notif-list { max-height: 320px; overflow-y: auto; }
        .notif-list::-webkit-scrollbar { width: 0; }
        .notif-item { display: flex; gap: 12px; padding: 12px 18px; border-bottom: 1px solid rgba(255,255,255,0.04); cursor: pointer; transition: background 0.15s; }
        .notif-item:last-child { border-bottom: none; }
        .notif-item:hover { background: rgba(255,255,255,0.04); }
        .notif-item.unread { background: rgba(34,197,94,0.04); }
        .notif-icon { width: 36px; height: 36px; border-radius: 11px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .notif-icon svg { width: 15px; height: 15px; }
        .notif-item-title { font-size: 12px; font-weight: 700; color: #fff; margin-bottom: 2px; }
        .notif-item-msg { font-size: 11px; color: rgba(255,255,255,0.45); margin-bottom: 3px; line-height: 1.5; }
        .notif-item-time { font-size: 10px; color: rgba(255,255,255,0.22); font-weight: 500; }
        .notif-unread-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green-active); box-shadow: 0 0 6px var(--green-active); flex-shrink: 0; margin-top: 6px; }
        .notif-footer { padding: 12px 18px; border-top: 1px solid rgba(255,255,255,0.06); text-align: center; }
        .notif-footer-btn { font-size: 12px; font-weight: 700; color: var(--green-active); background: none; border: none; cursor: pointer; font-family: inherit; transition: color 0.2s; }
        .notif-footer-btn:hover { color: #4ade80; }

        .view-store-btn {
          display: flex; align-items: center; gap: 7px;
          padding: 8px 16px; border-radius: 11px;
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.2);
          font-size: 12px; font-weight: 600; color: var(--green-active);
          text-decoration: none; transition: all 0.22s ease;
          letter-spacing: 0.1px;
        }
        .view-store-btn:hover {
          background: rgba(34,197,94,0.15);
          border-color: rgba(34,197,94,0.4);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(34,197,94,0.2);
        }

        .profile-badge {
          display: flex; align-items: center; gap: 10px;
          padding: 5px 12px 5px 5px; border-radius: 50px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          cursor: pointer; transition: all 0.22s ease;
          position: relative;
        }
        .profile-badge:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.15);
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        }
        .profile-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(34,197,94,0.15);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(34,197,94,0.3);
          color: #22c55e; font-size: 13px; font-weight: 800;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 12px rgba(34,197,94,0.15);
        }
        .profile-info { display: flex; flex-direction: column; }
        .profile-name { font-size: 12px; font-weight: 600; color: #fff; line-height: 1.3; }
        .profile-role { font-size: 10px; color: rgba(255,255,255,0.38); font-weight: 500; }
        .profile-chevron {
          width: 14px; height: 14px;
          color: rgba(255,255,255,0.35);
          transition: transform 0.25s ease;
          flex-shrink: 0;
        }
        .profile-chevron.open { transform: rotate(180deg); }

        .profile-dropdown {
          position: absolute; right: 0; top: calc(100% + 10px);
          width: 220px;
          background: rgba(14,14,14,0.97);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 18px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.65);
          z-index: 50; overflow: hidden;
          animation: dropIn 0.18s ease;
        }

        .profile-dropdown-header {
          display: flex; align-items: center; gap: 11px;
          padding: 16px 16px 12px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .profile-dropdown-avatar {
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(34,197,94,0.15);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(34,197,94,0.3);
          color: #22c55e; font-size: 16px; font-weight: 800;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 16px rgba(34,197,94,0.15);
        }
        .profile-dropdown-name { font-size: 13px; font-weight: 700; color: #fff; }
        .profile-dropdown-role {
          font-size: 10px; color: var(--green-active);
          font-weight: 600; margin-top: 2px;
          text-transform: uppercase; letter-spacing: 0.5px;
        }

        .profile-menu { padding: 8px; }
        .profile-menu-item {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px; border-radius: 11px;
          font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.7);
          cursor: pointer; transition: all 0.15s ease;
          border: none; background: none; width: 100%;
          font-family: inherit; text-decoration: none;
        }
        .profile-menu-item:hover {
          background: rgba(255,255,255,0.06);
          color: #fff;
        }
        .profile-menu-item svg { flex-shrink: 0; }
        .profile-menu-item.danger { color: #f87171; }
        .profile-menu-item.danger:hover { background: rgba(239,68,68,0.1); color: #f87171; }
        .profile-menu-divider {
          height: 1px; background: rgba(255,255,255,0.06);
          margin: 6px 8px;
        }

        /* ════════════════════════════════
           MOBILE SIDEBAR
        ════════════════════════════════ */
        .mobile-sidebar {
          position: fixed; top: 0; left: 0; width: 280px; height: 100%;
          background: #111; border-right: 1px solid rgba(255,255,255,0.05);
          box-shadow: 6px 0 48px rgba(0,0,0,0.35); z-index: 50;
          display: flex; flex-direction: column;
          transform: translateX(-100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mobile-sidebar.open { transform: translateX(0); }

        .mobile-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.55);
          backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
          z-index: 40; opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
        }
        .mobile-overlay.open { opacity: 1; pointer-events: all; }

        /* ════════════════════════════════
           LOGOUT MODAL
        ════════════════════════════════ */
        .modal-overlay-wrap {
          position: fixed; inset: 0; background: rgba(0,0,0,0.5);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          z-index: 60; padding: 20px; animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        .modal-box {
          background: #1a1a1a; border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px; max-width: 380px; width: 100%;
          padding: 28px 24px; box-shadow: 0 24px 80px rgba(0,0,0,0.6);
          animation: scaleIn 0.22s ease;
        }
        @keyframes scaleIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
        .modal-icon { width: 50px; height: 50px; border-radius: 50%; background: rgba(239,68,68,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; }
        .modal-title { font-size: 17px; font-weight: 800; color: #fff; text-align: center; margin: 0 0 6px; }
        .modal-desc { font-size: 13px; color: rgba(255,255,255,0.45); text-align: center; margin: 0 0 22px; line-height: 1.6; }
        .modal-btns { display: flex; gap: 10px; }
        .modal-cancel {
          flex: 1; padding: 10px; border-radius: 11px;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
          font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.6);
          cursor: pointer; font-family: inherit; transition: all 0.2s ease;
        }
        .modal-cancel:hover { background: rgba(255,255,255,0.09); }
        .modal-confirm {
          flex: 1; padding: 10px; border-radius: 11px;
          background: #ef4444; border: none;
          font-size: 13px; font-weight: 700; color: white;
          cursor: pointer; font-family: inherit;
          box-shadow: 0 4px 12px rgba(239,68,68,0.3);
          display: flex; align-items: center; justify-content: center; gap: 6px;
          transition: all 0.2s ease;
        }
        .modal-confirm:hover { background: #dc2626; transform: translateY(-1px); box-shadow: 0 6px 18px rgba(239,68,68,0.4); }
        .modal-confirm svg { width: 14px; height: 14px; }

        /* ════════════════════════════════
           MAIN AREA
        ════════════════════════════════ */
        .main-bg {
          flex: 1; overflow-y: auto;
          background: #111111;
          position: relative;
        }

        /* ════════════════════════════════
           RESPONSIVE
        ════════════════════════════════ */
        @media (max-width: 1024px) { .sidebar { display: none; } .search-box { width: 240px; } }
        @media (max-width: 640px) { .search-box { display: none; } .view-store-btn { display: none; } .topbar-user-name, .topbar-user-role { display: none; } .topbar-logout span { display: none; } }

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideInNav {
          from { opacity: 0; transform: translateX(-14px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div
          className="modal-overlay-wrap"
          onClick={() => setShowLogoutModal(false)}
        >
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">
              <WarningCircle size={24} weight="fill" color="#ef4444" />
            </div>
            <h2 className="modal-title">Confirm Logout</h2>
            <p className="modal-desc">
              Are you sure you want to logout? You'll need to sign in again to
              access the admin panel.
            </p>
            <div className="modal-btns">
              <button
                className="modal-cancel"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button className="modal-confirm" onClick={confirmLogout}>
                <SignOut size={14} weight="bold" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile overlay */}
      <div
        className={`mobile-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div
        className="layout-root"
        style={{ display: "flex", height: "100vh", overflow: "hidden" }}
      >
        {/* ── Desktop Sidebar ── */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
              <div className="logo-text">
                block<span>234</span>
                <span className="logo-dot"></span>
              </div>
              <div className="logo-sub">Admin Panel</div>
            </Link>
          </div>

          <nav className="sidebar-nav">
            {navItems.map((item, i) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${active ? "active" : ""}`}
                  style={{ animationDelay: `${i * 35}ms` }}
                  onMouseEnter={() => setHoveredNav(item.path)}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  <div className="nav-item-icon">
                    <Icon weight={active ? "fill" : "duotone"} size={19} />
                  </div>
                  <span className="nav-item-label">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="sidebar-footer">
            <button
              className="logout-btn"
              onClick={() => setShowLogoutModal(true)}
            >
              <SignOut size={15} weight="bold" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* ── Mobile Sidebar ── */}
        <aside className={`mobile-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div
            className="sidebar-logo"
            style={{
              justifyContent: "space-between",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link
              to="/admin/dashboard"
              style={{ textDecoration: "none" }}
              onClick={() => setSidebarOpen(false)}
            >
              <div className="logo-text">
                block<span>234</span>
                <span className="logo-dot"></span>
              </div>
              <div className="logo-sub">Admin Panel</div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={16} weight="bold" color="rgba(255,255,255,0.7)" />
            </button>
          </div>
          <nav className="sidebar-nav">
            {navItems.map((item, i) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${active ? "active" : ""}`}
                  style={{ animationDelay: `${i * 35}ms` }}
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="nav-item-icon">
                    <Icon weight={active ? "fill" : "duotone"} size={19} />
                  </div>
                  <span className="nav-item-label">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="sidebar-footer">
            <button
              className="logout-btn"
              onClick={() => {
                setSidebarOpen(false);
                setShowLogoutModal(true);
              }}
            >
              <SignOut size={15} weight="bold" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* ── Right Side ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Topbar */}
          <header className="topbar">
            <button
              className="icon-btn"
              style={{ display: "none" }}
              onClick={() => setSidebarOpen(true)}
              id="mobile-menu-btn"
            >
              <List size={18} weight="bold" />
            </button>
            <style>{`@media(max-width:1024px){#mobile-menu-btn{display:flex!important;}}`}</style>

            {/* Search */}
            <div style={{ position: "relative" }} ref={searchRef}>
              <div className="search-box">
                <MagnifyingGlass size={14} weight="bold" />
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search products, orders, users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {showSearchResults && (
                <div className="search-dropdown">
                  {searchResults.length > 0 ? (
                    searchResults.map((r, i) => (
                      <Link
                        key={i}
                        to={r.path}
                        className="search-item"
                        onClick={() => {
                          setSearchQuery("");
                          setShowSearchResults(false);
                        }}
                      >
                        <div className="search-item-icon">
                          <MagnifyingGlass
                            size={12}
                            weight="bold"
                            color="#16a34a"
                          />
                        </div>
                        <div>
                          <div className="search-item-name">{r.name}</div>
                          <div className="search-item-type">{r.type}</div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div
                      style={{
                        padding: "14px 16px",
                        textAlign: "center",
                        fontSize: 12,
                        color: "#94a3b8",
                      }}
                    >
                      No results for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="topbar-right">
              {/* Notifications */}
              <div style={{ position: "relative" }} ref={notificationRef}>
                <button
                  className="icon-btn"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell size={17} weight="fill" />
                  {unreadCount > 0 && (
                    <span className="notif-badge">{unreadCount}</span>
                  )}
                </button>
                {showNotifications && (
                  <div className="notif-dropdown">
                    <div className="notif-header">
                      <span className="notif-title">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="notif-count">{unreadCount} new</span>
                      )}
                    </div>
                    <div className="notif-list">
                      {notifications.map((n) => {
                        const s = getNotifStyle(n.type);
                        const Icon = s.Icon;
                        return (
                          <div
                            key={n.id}
                            className={`notif-item ${!n.read ? "unread" : ""}`}
                          >
                            <div
                              className="notif-icon"
                              style={{ background: s.bg }}
                            >
                              <Icon style={{ color: s.color }} />
                            </div>
                            <div style={{ flex: 1 }}>
                              <div className="notif-item-title">{n.title}</div>
                              <div className="notif-item-msg">{n.message}</div>
                              <div className="notif-item-time">{n.time}</div>
                            </div>
                            {!n.read && (
                              <div className="notif-unread-dot"></div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="notif-footer">
                      <Link
                        to="/admin/notifications"
                        className="notif-footer-btn"
                      >
                        View all notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* View Store */}
              <Link
                to="/admin/view-store"
                className="icon-btn"
                title="View Store"
                style={{ textDecoration: "none" }}
              >
                <Storefront size={17} weight="fill" />
              </Link>

              {/* Profile Badge */}
              <div style={{ position: "relative" }} ref={profileRef}>
                <div
                  className="profile-badge"
                  onClick={() => setShowProfile(!showProfile)}
                >
                  <div className="profile-avatar">
                    {user?.fullName?.charAt(0) || "A"}
                  </div>
                  <div className="profile-info">
                    <div className="profile-name">
                      {user?.fullName || "Admin User"}
                    </div>
                    <div className="profile-role">Administrator</div>
                  </div>
                  <CaretDown
                    size={13}
                    weight="bold"
                    className={`profile-chevron${showProfile ? " open" : ""}`}
                    style={{
                      color: "rgba(255,255,255,0.35)",
                      transition: "transform 0.25s ease",
                      transform: showProfile
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  />
                </div>

                {showProfile && (
                  <div className="profile-dropdown">
                    {/* Header */}
                    <div className="profile-dropdown-header">
                      <div className="profile-dropdown-avatar">
                        {user?.fullName?.charAt(0) || "A"}
                      </div>
                      <div>
                        <div className="profile-dropdown-name">
                          {user?.fullName || "Admin User"}
                        </div>
                        <div className="profile-dropdown-role">
                          Administrator
                        </div>
                      </div>
                    </div>

                    {/* Menu */}
                    <div className="profile-menu">
                      <Link
                        to="/admin/profile"
                        className="profile-menu-item"
                        onClick={() => setShowProfile(false)}
                      >
                        <User size={15} weight="duotone" />
                        My Profile
                      </Link>
                      <Link
                        to="/admin/settings"
                        className="profile-menu-item"
                        onClick={() => setShowProfile(false)}
                      >
                        <ShieldCheck size={15} weight="duotone" />
                        Account Settings
                      </Link>
                      <Link
                        to="/admin/view-store"
                        className="profile-menu-item"
                        onClick={() => setShowProfile(false)}
                      >
                        <Storefront size={15} weight="duotone" />
                        View Store
                      </Link>
                      <div className="profile-menu-divider" />
                      <button
                        className="profile-menu-item danger"
                        onClick={() => {
                          setShowProfile(false);
                          setShowLogoutModal(true);
                        }}
                      >
                        <SignOut size={15} weight="bold" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="main-bg">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
