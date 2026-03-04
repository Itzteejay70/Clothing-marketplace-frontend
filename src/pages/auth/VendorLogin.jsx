import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff, HiShieldCheck } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";

export default function VendorLogin() {
  const { vendorLogin } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/vendor/dashboard";

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Move default creds here
  const VENDOR_EMAIL = "admin@block234.com";
  const VENDOR_PASSWORD = "Admin@123";

  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((p) => ({ ...p, [name]: value }));
};
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Validate here (not in AuthContext)
      const email = formData.email.trim();
      const password = formData.password;

      if (email !== VENDOR_EMAIL || password !== VENDOR_PASSWORD) {
        throw new Error("Invalid vendor credentials.");
      }

      // ✅ Set vendor session
      vendorLogin({ email: VENDOR_EMAIL, fullName: "Vendor User" });

      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.message || "Login failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xs">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-gray-800">
            block<span className="text-green-600">234</span>
          </h1>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Vendor Login</h1>
          <p className="text-sm text-gray-500">Manage products & orders</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 text-center">
              <p className="text-xs font-bold text-red-900">{error}</p>
            </div>
          )}

          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="peer w-full px-2 pt-6 pb-2 bg-transparent border-b-2 border-gray-300 focus:border-green-600 outline-none text-sm font-medium text-gray-800"
            />
            <label
              className="absolute left-2 top-4 text-gray-500 text-sm transition-all duration-300
              peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-green-600
              peer-valid:-top-2 peer-valid:text-[10px]"
            >
              Vendor email
            </label>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="peer w-full px-2 pt-6 pb-2 bg-transparent border-b-2 border-gray-300 focus:border-green-600 outline-none text-sm font-medium text-gray-800"
            />
            <label
              className="absolute left-2 top-4 text-gray-500 text-sm transition-all duration-300
              peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-green-600
              peer-valid:-top-2 peer-valid:text-[10px]"
            >
              Password
            </label>

            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-0 top-4 pr-2"
            >
              {showPassword ? (
                <HiEyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              ) : (
                <HiEye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2.5 rounded-lg font-bold text-sm hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                <HiShieldCheck className="w-4 h-4" />
                Sign In as Vendor
              </>
            )}
          </button>

          <div className="pt-5 border-t border-gray-200 text-center">
            <Link to="/" className="text-xs font-bold text-gray-600 hover:text-green-600">
              ← Back to Store
            </Link>
          </div>

          <p className="text-[11px] text-gray-500 text-center">
            Demo login: vendor@block234.com / Vendor@123
          </p>
        </form>
      </div>
    </div>
  );
}