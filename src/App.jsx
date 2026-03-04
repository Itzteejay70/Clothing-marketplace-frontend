import { BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

function AppContent() {
  const location = useLocation();
  const path = location.pathname;

  const hideNavbar =
    path.startsWith("/admin") ||
    path.startsWith("/vendor") ||
    path.startsWith("/login") ||
    path.startsWith("/register") ||
    path.startsWith("/forgot-password");

  return (
    <>
      {!hideNavbar && <Navbar />}
      <AppRoutes />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </AuthProvider>
    </BrowserRouter>
  );
}
