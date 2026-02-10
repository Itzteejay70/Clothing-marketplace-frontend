import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { HiShieldCheck, HiX } from "react-icons/hi";

const HAS_ACCOUNT_KEY = "cm_has_account_v1";
const SHOWN_THIS_TAB_KEY = "cm_welcome_modal_shown_tab_v1";

export default function WelcomeAuthModal({ delayMs = 2000 }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState("new"); // new | returning

  useEffect(() => {
    if (user) return;

    const shownThisTab = sessionStorage.getItem(SHOWN_THIS_TAB_KEY) === "true";
    if (shownThisTab) return;

    const t = setTimeout(() => {
      const hasAccount = localStorage.getItem(HAS_ACCOUNT_KEY) === "true";
      setVariant(hasAccount ? "returning" : "new");
      setOpen(true);
      sessionStorage.setItem(SHOWN_THIS_TAB_KEY, "true");
    }, delayMs);

    return () => clearTimeout(t);
  }, [user, delayMs]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  if (!open || user) return null;

  const title = variant === "returning" ? "Welcome back 👋" : "Join us";
  const desc =
    variant === "returning"
      ? "Log in to continue shopping and checkout faster."
      : "Create an account to save items, track orders and checkout faster.";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome modal"
      onClick={() => setOpen(false)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gradient header */}
        <div className="p-6 bg-gradient-to-br from-green-700 via-green-600 to-emerald-600 text-white">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
                <HiShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black leading-tight">{title}</h2>
                <p className="mt-1 text-sm text-white/90 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 transition flex items-center justify-center"
              aria-label="Close"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6">
          <div className="flex flex-col gap-3">
            {variant === "returning" ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="w-full inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-black text-sm hover:from-green-700 hover:to-green-800 transition shadow-md"
                >
                  Login
                </Link>

                <Link
                  to="/forgot-password"
                  onClick={() => setOpen(false)}
                  className="w-full inline-flex items-center justify-center border border-gray-200 bg-white py-3 rounded-xl font-black text-sm text-gray-800 hover:bg-gray-50 transition"
                >
                  Forgot password?
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="w-full inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-black text-sm hover:from-green-700 hover:to-green-800 transition shadow-md"
                >
                  Create account
                </Link>

                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="w-full inline-flex items-center justify-center border border-gray-200 bg-white py-3 rounded-xl font-black text-sm text-gray-800 hover:bg-gray-50 transition"
                >
                  I already have an account
                </Link>
              </>
            )}

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full inline-flex items-center justify-center py-3 rounded-xl bg-green-50 text-green-800 border border-green-100 font-black text-sm hover:bg-green-100 transition"
            >
              Continue browsing
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
