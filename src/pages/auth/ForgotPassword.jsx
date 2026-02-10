import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMail, HiShieldCheck } from "react-icons/hi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    setError("");

    const clean = email.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean);

    if (!isValid) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    // ✅ Later: call backend reset endpoint here
    // For now, simulate request
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 900);
  }

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
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Forgot password
          </h1>
          <p className="text-sm text-gray-500">
            We’ll help you get back into your account
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-7">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 text-center">
              <p className="text-xs font-bold text-red-900">{error}</p>
            </div>
          )}

          {sent ? (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-md p-3 text-center">
                <p className="text-xs font-bold text-green-900">
                  If an account exists for this email, a reset link has been sent.
                </p>
              </div>

              <p className="text-xs text-gray-600 text-center">
                Check your inbox (and spam folder) and follow the instructions.
              </p>

              <div className="pt-5 border-t border-gray-200 text-center space-y-3">
                <Link
                  to="/login"
                  className="block w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2.5 rounded-lg font-bold text-sm hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md text-center"
                >
                  Back to Login
                </Link>

                <Link
                  to="/register"
                  className="block text-xs font-bold text-gray-600 hover:text-green-600"
                >
                  Create account
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
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

                <div className="absolute right-2 top-4">
                  <HiMail className="h-4 w-4 text-gray-400" />
                </div>

                <p className="mt-2 text-[11px] text-gray-500">
                  Enter your email and we’ll send you a reset link.
                </p>
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
                    Sending...
                  </>
                ) : (
                  <>
                    <HiShieldCheck className="w-4 h-4" />
                    Send Reset Link
                  </>
                )}
              </button>

              {/* Links */}
              <div className="pt-5 border-t border-gray-200 text-center">
                <p className="text-xs font-bold text-gray-600">
                  Remember your password?{" "}
                  <Link
                    to="/login"
                    className="text-green-700 hover:text-green-800"
                  >
                    Login
                  </Link>
                </p>

              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
