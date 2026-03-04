import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function VendorRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/vendor/login" replace state={{ from: location }} />;
  }

  const role = String(user?.role ?? "public").toLowerCase();
  const isVendor = role === "vendor" || role === "seller" || role === "brand";

  if (!isVendor) return <Navigate to="/" replace />; // or "/profile"

  return children;
}