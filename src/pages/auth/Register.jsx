import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff, HiUserAdd } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";

function passwordStrength(pw) {
  let score = 0;
  if (!pw) return { label: "", score: 0 };

  if (pw.length >= 8) score += 1;
  if (/[A-Z]/.test(pw)) score += 1;
  if (/[0-9]/.test(pw)) score += 1;
  if (/[^A-Za-z0-9]/.test(pw)) score += 1;

  const map = {
    1: "Weak",
    2: "Fair",
    3: "Good",
    4: "Strong",
  };
  return { label: map[score] || "Weak", score };
}

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const strength = useMemo(
    () => passwordStrength(formData.password),
    [formData.password]
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.agree) {
      setError("Please accept the Terms to continue.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err?.message || "Registration failed. Please try again.");
      setLoading(false);
    }
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
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Create account</h1>
          <p className="text-sm text-gray-500">Join and start shopping</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 text-center">
              <p className="text-xs font-bold text-red-900">{error}</p>
            </div>
          )}

          {/* Full Name */}
          <div className="relative">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="peer w-full px-2 pt-6 pb-2 bg-transparent border-b-2 border-gray-300 focus:border-green-600 outline-none text-sm font-medium text-gray-800"
            />
            <label
              className="absolute left-2 top-4 text-gray-500 text-sm transition-all duration-300
              peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-green-600
              peer-valid:-top-2 peer-valid:text-[10px]"
            >
              Full name
            </label>
          </div>

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
              Email
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
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-0 top-4 pr-2"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <HiEyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              ) : (
                <HiEye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              )}
            </button>

            {/* Strength */}
            {formData.password ? (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600 transition-all"
                    style={{ width: `${(strength.score / 4) * 100}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-gray-600">
                  {strength.label}
                </span>
              </div>
            ) : (
              <p className="mt-2 text-[11px] text-gray-500">Use at least 6 characters.</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="peer w-full px-2 pt-6 pb-2 bg-transparent border-b-2 border-gray-300 focus:border-green-600 outline-none text-sm font-medium text-gray-800"
            />
            <label
              className="absolute left-2 top-4 text-gray-500 text-sm transition-all duration-300
              peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-green-600
              peer-valid:-top-2 peer-valid:text-[10px]"
            >
              Confirm password
            </label>

            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)}
              className="absolute right-0 top-4 pr-2"
              aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirm ? (
                <HiEyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              ) : (
                <HiEye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2 text-xs text-gray-600">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className="mt-0.5"
            />
            <span>
              I agree to the{" "}
              <Link to="/terms" className="font-bold text-green-700 hover:text-green-800">
                Terms
              </Link>{""}
              and{""}
              <Link to="/privacy" className="font-bold text-green-700 hover:text-green-800">
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2.5 rounded-lg font-bold text-sm hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <HiUserAdd className="w-4 h-4" />
                Create Account
              </>
            )}
          </button>

          {/* Login link */}
          <div className="pt-5 border-t border-gray-200 text-center">
            <p className="text-xs font-bold text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-green-700 hover:text-green-800">
                Login
              </Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
