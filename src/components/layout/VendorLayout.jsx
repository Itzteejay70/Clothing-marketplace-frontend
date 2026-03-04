import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  HiHome,
  HiShoppingCart,
  HiShoppingBag,
  HiCash,
  HiCog,
  HiLogout,
  HiMenu,
  HiX,
  HiBell,
  HiSearch,
  HiCheck,
  HiClock,
  HiExclamation,
  HiExclamationCircle,
} from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";

export default function VendorLayout() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const notificationRef = useRef(null);
  const searchRef = useRef(null);

  // ✅ Vendor auth check using AuthContext session
  useEffect(() => {
    // mimic your AdminLayout loading experience
    const t = setTimeout(() => {
      const ok = !!user && user.role === "vendor";
      setIsAuthenticated(ok);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(t);
  }, [user]);

  // Mock notifications (vendor)
  const [notifications] = useState([
    {
      id: 1,
      type: "success",
      title: "Order Paid",
      message: "Order #VND-1202 payment confirmed",
      time: "5 mins ago",
      read: false,
    },
    {
      id: 2,
      type: "warning",
      title: "Low Stock",
      message: "2 items are running low",
      time: "30 mins ago",
      read: false,
    },
    {
      id: 3,
      type: "info",
      title: "Payout Scheduled",
      message: "Next payout: ₦58,000",
      time: "2 hours ago",
      read: true,
    },
  ]);

  // Mock vendor search data
  const mockSearchData = [
    { type: "Product", name: "Classic Hoodie", path: "/vendor/products" },
    { type: "Product", name: "Cargo Pants", path: "/vendor/products" },
    { type: "Order", name: "Order #VND-1201", path: "/vendor/orders" },
    { type: "Order", name: "Order #VND-1202", path: "/vendor/orders" },
    { type: "Payout", name: "Payout History", path: "/vendor/payouts" },
    { type: "Settings", name: "Store Settings", path: "/vendor/settings" },
  ];

  // click outside (same behavior as AdminLayout)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const filtered = mockSearchData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(filtered);
    setShowSearchResults(true);
  }, [searchQuery]);

  const handleLogoutClick = () => setShowLogoutModal(true);

  const confirmLogout = () => {
    logout(); // ✅ clears session_user_v1 via your AuthContext
    setIsAuthenticated(false);
    setShowLogoutModal(false);
    window.location.href = "/vendor/login";
  };

  const cancelLogout = () => setShowLogoutModal(false);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <HiCheck className="w-5 h-5 text-green-600" />;
      case "warning":
        return <HiExclamation className="w-5 h-5 text-orange-600" />;
      case "info":
        return <HiClock className="w-5 h-5 text-blue-600" />;
      default:
        return <HiBell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getNotificationBg = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50";
      case "warning":
        return "bg-orange-50";
      case "info":
        return "bg-blue-50";
      default:
        return "bg-gray-50";
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return <Navigate to="/vendor/login" replace />;
  }

  // ✅ Minimal vendor nav (keeps your “not too much info” requirement)
  const navItems = [
    { path: "/vendor/dashboard", label: "Dashboard", icon: HiHome },
    { path: "/vendor/orders", label: "Orders", icon: HiShoppingCart },
    { path: "/vendor/products", label: "Products", icon: HiShoppingBag },
    { path: "/vendor/payouts", label: "Payouts", icon: HiCash },
    { path: "/vendor/settings", label: "Settings", icon: HiCog },
  ];

  return (
    <>
      {/* Same CSS animations as AdminLayout */}
      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slideInLeft { animation: slideInLeft 0.3s ease-out forwards; }

        .notification-enter { animation: slideInDown 0.3s ease-out; }
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .modal-overlay { animation: fadeIn 0.2s ease-out; }
        .modal-content { animation: scaleIn 0.3s ease-out; }
      `}</style>

      {/* Logout Confirmation Modal (same UI) */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4 modal-overlay">
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                <HiExclamationCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>

            <h2 className="text-xl font-black text-gray-900 text-center mb-2">
              Confirm Logout
            </h2>

            <p className="text-gray-600 text-center mb-6 text-sm">
              Are you sure you want to logout? You will need to sign in again to
              access the vendor panel.
            </p>

            <div className="flex gap-3">
              <button
                onClick={cancelLogout}
                className="flex-1 px-5 py-2.5 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <HiLogout className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex h-screen bg-gray-50">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col shadow-sm">
          <div className="h-[73px] px-4 border-b border-gray-200 flex items-center bg-gradient-to-r from-green-600 to-green-700">
            <Link to="/vendor/dashboard" className="block">
              <h1 className="text-xl font-black text-white">
                block<span className="text-green-200">234</span>
              </h1>
              <p className="text-xs font-bold text-green-100 mt-0.5">
                Vendor Panel
              </p>
            </Link>
          </div>

          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-bold transition-all duration-300 animate-slideInLeft text-sm ${
                    isActive
                      ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                  }`}
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-gray-200">
            <div className="px-3 py-2 mb-2 bg-gray-50 rounded-lg">
              <p className="text-xs font-bold text-gray-500">Logged in as</p>
              <p className="text-sm font-black text-gray-900 truncate">
                {user?.fullName || "Vendor"}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>

            <button
              onClick={handleLogoutClick}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg font-bold transition-all duration-300 text-sm"
            >
              <HiLogout className="w-5 h-5" />
              Logout
            </button>
          </div>
        </aside>

        {/* Mobile Backdrop */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden z-40 ${
            sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Mobile Sidebar */}
        <aside
          className={`fixed top-0 left-0 w-80 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-out lg:hidden z-50 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-[73px] px-4 border-b border-gray-200 bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-between">
            <Link to="/vendor/dashboard" onClick={() => setSidebarOpen(false)}>
              <h1 className="text-xl font-black text-white">
                block<span className="text-green-200">234</span>
              </h1>
              <p className="text-xs font-bold text-green-100 mt-0.5">
                Vendor Panel
              </p>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-300"
            >
              <HiX className="w-5 h-5 text-white" />
            </button>
          </div>

          <nav className="flex-1 p-3 space-y-1 overflow-y-auto h-[calc(100vh-160px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-bold transition-all duration-300 text-sm ${
                    isActive
                      ? "bg-gradient-to-r from-green-600 to-green-700 text-white"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-gray-200">
            <button
              onClick={handleLogoutClick}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg font-bold transition-all duration-300 text-sm"
            >
              <HiLogout className="w-5 h-5" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation Bar */}
          <header className="h-[73px] bg-white border-b border-gray-200 shadow-sm">
            <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden w-10 h-10 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition-all duration-300"
                >
                  <HiMenu className="w-5 h-5 text-gray-700" />
                </button>

                {/* Search Bar */}
                <div className="hidden md:block relative" ref={searchRef}>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 w-96">
                    <HiSearch className="w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products, orders..."
                      className="flex-1 bg-transparent outline-none text-sm font-medium text-gray-700 placeholder-gray-400"
                    />
                  </div>

                  {/* Search Results */}
                  {showSearchResults && searchResults.length > 0 && (
                    <div className="absolute top-full mt-2 w-full bg-white rounded-lg border border-gray-200 shadow-xl z-50 max-h-96 overflow-y-auto notification-enter">
                      {searchResults.map((result, index) => (
                        <Link
                          key={index}
                          to={result.path}
                          onClick={() => {
                            setSearchQuery("");
                            setShowSearchResults(false);
                          }}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                          <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                            <HiSearch className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">
                              {result.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {result.type}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {showSearchResults &&
                    searchResults.length === 0 &&
                    searchQuery && (
                      <div className="absolute top-full mt-2 w-full bg-white rounded-lg border border-gray-200 shadow-xl z-50 p-4 notification-enter">
                        <p className="text-sm text-gray-500 text-center">
                          No results found for "{searchQuery}"
                        </p>
                      </div>
                    )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative w-10 h-10 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition-all duration-300"
                  >
                    <HiBell className="w-5 h-5 text-gray-700" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-black rounded-full flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg border border-gray-200 shadow-2xl z-50 notification-enter">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-black text-gray-900">
                            Notifications
                          </h3>
                          {unreadCount > 0 && (
                            <span className="px-2 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full">
                              {unreadCount} new
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer ${
                              !notification.read ? "bg-blue-50/30" : ""
                            }`}
                          >
                            <div className="flex gap-3">
                              <div
                                className={`w-10 h-10 rounded-lg ${getNotificationBg(notification.type)} flex items-center justify-center flex-shrink-0`}
                              >
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900 mb-1">
                                  {notification.title}
                                </p>
                                <p className="text-xs text-gray-600 mb-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {notification.time}
                                </p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 border-t border-gray-200">
                        <button className="w-full text-center text-sm font-bold text-green-600 hover:text-green-700 transition-colors">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* View Store */}
                <Link
                  to="/"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-300 font-bold text-sm text-gray-700"
                >
                  View Store
                </Link>

                {/* User block */}
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg border border-gray-200 bg-white">
                  <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center">
                    <span className="text-white font-black text-sm">
                      {user?.fullName?.charAt(0) || "V"}
                    </span>
                  </div>
                  <div className="hidden xl:block">
                    <p className="text-sm font-black text-gray-900">
                      {user?.fullName || "Vendor User"}
                    </p>
                    <p className="text-xs text-gray-500">Vendor</p>
                  </div>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogoutClick}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-bold text-sm transition-all duration-300"
                >
                  <HiLogout className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}