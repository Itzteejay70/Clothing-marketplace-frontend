import { useState } from "react";
import { Link } from "react-router-dom";
import { HiEye, HiEyeOff, HiShieldCheck, HiLockClosed } from "react-icons/hi";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // TESTING CREDENTIALS
  const ADMIN_EMAIL = "admin@block234.com";
  const ADMIN_PASSWORD = "Admin@123";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (
        formData.email === ADMIN_EMAIL &&
        formData.password === ADMIN_PASSWORD
      ) {
        localStorage.setItem("adminAuth", "true");
        localStorage.setItem(
          "adminUser",
          JSON.stringify({
            email: ADMIN_EMAIL,
            fullName: "Admin User",
            role: "admin",
          }),
        );
        window.location.href = "/admin/dashboard";
      } else {
        setError("Invalid admin credentials. Please try again.");
        setLoading(false);
      }
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xs">
        {/* Brand icon */}
        <div className="text-center mb-6">
          <Link to="/" aria-label="Home">
            <img src="/Bg.PNG" alt="Logo" className="mx-auto h-40 w-auto" />
          </Link>
        </div>


        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Admin Login</h1>
          <p className="text-sm text-gray-500">Secure access to dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 text-center">
              <p className="text-xs font-bold text-red-900">{error}</p>
            </div>
          )}

          {/* Email */}
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
              Admin email
            </label>
          </div>

          {/* Password */}
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
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-4 pr-2"
            >
              {showPassword ? (
                <HiEyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              ) : (
                <HiEye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>

          {/* Submit */}
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
                Sign In as Admin
              </>
            )}
          </button>

          {/* Back */}
          <div className="pt-5 border-t border-gray-200 text-center">
            <Link
              to="/"
              className="text-xs font-bold text-gray-600 hover:text-green-600"
            >
              ← Back to Store
            </Link>
          </div>
        </form>

        {/* Security */}
        <div className="mt-5 flex items-center justify-center gap-1 text-gray-500">
          <HiLockClosed className="w-3.5 h-3.5" />
          <p className="text-[10px]">
            This is a secure admin area. All activities are logged.
          </p>
        </div>
      </div>
    </div>
  );
}
