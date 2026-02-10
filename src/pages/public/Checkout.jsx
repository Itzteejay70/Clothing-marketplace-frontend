import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    notes: "",
  });

  const [placing, setPlacing] = useState(false);

  // ✅ Success modal state
  const [showSuccess, setShowSuccess] = useState(false);

  // ✅ Optional: stop scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showSuccess ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [showSuccess]);

  const shippingFee = useMemo(() => {
    return items.length > 0 ? 2000 : 0;
  }, [items.length]);

  const total = useMemo(() => subtotal + shippingFee, [subtotal, shippingFee]);

  function updateField(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    if (!form.fullName.trim()) return "Full name is required.";
    if (!form.phone.trim()) return "Phone number is required.";
    if (!form.address.trim()) return "Delivery address is required.";
    if (!form.city.trim()) return "City is required.";
    if (!form.state.trim()) return "State is required.";
    return null;
  }

  async function handlePlaceOrder(e) {
    e.preventDefault();
    if (items.length === 0) return;

    const err = validate();
    if (err) {
      alert(err);
      return;
    }

    setPlacing(true);

    // MVP: simulate processing
    setTimeout(() => {
      clearCart();
      setPlacing(false);

      // ✅ show popup instead of navigating to /order-success
      setShowSuccess(true);
    }, 800);
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center font-black text-gray-800 transition"
            aria-label="Back to Cart"
          >
            ‹
          </Link>

          <div className="flex-1">
            <h2 className="text-lg sm:text-xl font-black text-gray-900">
              Checkout
            </h2>
            <div className="h-px bg-gray-100 mt-2" />
          </div>
        </div>

        <div className="mt-6 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-sm font-bold text-gray-700">
            Your cart is empty. Add items before checkout.
          </p>

          <Link
            to="/shop"
            className="mt-4 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white font-black text-sm hover:from-green-700 hover:to-green-800 transition shadow-md"
          >
            Go to Shop ›
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/cart"
          className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center font-black text-gray-800 transition"
          aria-label="Back to Cart"
        >
          ‹
        </Link>

        <div className="flex-1">
          <h2 className="text-lg sm:text-xl font-black text-gray-900">
            Checkout
          </h2>
          <div className="h-px bg-gray-100 mt-2" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-6 lg:gap-8 items-start">
        {/* Form */}
        <form
          onSubmit={handlePlaceOrder}
          className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm"
        >
          <h3 className="text-sm font-black text-gray-900 mb-4">
            Delivery Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-extrabold text-gray-900">
                Full Name
              </label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={updateField}
                className="border border-gray-200 rounded-xl px-3 py-3 bg-gray-50 focus:bg-white focus:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 text-sm font-medium text-gray-900"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-extrabold text-gray-900">
                Phone
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={updateField}
                className="border border-gray-200 rounded-xl px-3 py-3 bg-gray-50 focus:bg-white focus:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 text-sm font-medium text-gray-900"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-extrabold text-gray-900">
                Email (optional)
              </label>
              <input
                name="email"
                value={form.email}
                onChange={updateField}
                className="border border-gray-200 rounded-xl px-3 py-3 bg-gray-50 focus:bg-white focus:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 text-sm font-medium text-gray-900"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-extrabold text-gray-900">
                State
              </label>
              <input
                name="state"
                value={form.state}
                onChange={updateField}
                className="border border-gray-200 rounded-xl px-3 py-3 bg-gray-50 focus:bg-white focus:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 text-sm font-medium text-gray-900"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <label className="text-xs font-extrabold text-gray-900">
              Delivery Address
            </label>
            <input
              name="address"
              value={form.address}
              onChange={updateField}
              className="border border-gray-200 rounded-xl px-3 py-3 bg-gray-50 focus:bg-white focus:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 text-sm font-medium text-gray-900"
            />
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <label className="text-xs font-extrabold text-gray-900">City</label>
            <input
              name="city"
              value={form.city}
              onChange={updateField}
              className="border border-gray-200 rounded-xl px-3 py-3 bg-gray-50 focus:bg-white focus:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 text-sm font-medium text-gray-900"
            />
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <label className="text-xs font-extrabold text-gray-900">
              Notes (optional)
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={updateField}
              rows={4}
              className="border border-gray-200 rounded-xl px-3 py-3 bg-gray-50 focus:bg-white focus:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 text-sm font-medium text-gray-900 resize-y min-h-[96px]"
            />
          </div>

          <button
            type="submit"
            disabled={placing}
            className="mt-5 w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-black text-sm hover:from-green-700 hover:to-green-800 transition shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {placing ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Placing Order...
              </>
            ) : (
              "Place Order"
            )}
          </button>
        </form>

        {/* Summary */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm lg:sticky lg:top-4">
          <h3 className="text-sm font-black text-gray-900 mb-4">
            Order Summary
          </h3>

          {/* ✅ FIXED: correct key + size display (no duplicates) */}
          <div className="flex flex-col gap-3">
            {items.map(({ key, product, qty, selectedSize }) => (
              <div
                key={key}
                className="flex items-start justify-between gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-extrabold text-gray-900">
                    {product.name}
                  </p>

                  <p className="text-xs font-bold text-gray-500 flex flex-wrap items-center gap-2">
                    <span>Qty: {qty}</span>
                    {selectedSize ? (
                      <span className="px-2 py-0.5 rounded-full bg-white border border-gray-200 text-gray-700">
                        Size: {selectedSize}
                      </span>
                    ) : null}
                  </p>
                </div>

                <p className="text-sm font-black text-gray-900">
                  ₦{(product.price * qty).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
            <div className="flex items-center justify-between text-sm font-bold text-gray-700">
              <span>Subtotal</span>
              <span className="font-black text-gray-900">
                ₦{subtotal.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm font-bold text-gray-700">
              <span>Delivery</span>
              <span className="font-black text-gray-900">
                ₦{shippingFee.toLocaleString()}
              </span>
            </div>

            <div className="mt-3 pt-3 border-t border-dashed border-gray-200 flex items-center justify-between">
              <span className="text-sm font-black text-gray-900">Total</span>
              <span className="text-sm font-black text-gray-900">
                ₦{total.toLocaleString()}
              </span>
            </div>
          </div>

          <Link
            to="/shop"
            className="mt-5 inline-flex w-full items-center justify-center border border-gray-200 bg-white py-3 rounded-xl font-black text-sm text-gray-800 hover:bg-gray-50 transition"
          >
            Add more items
          </Link>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => {
              setShowSuccess(false);
              navigate("/");
            }}
          />

          <div className="relative w-full max-w-md rounded-2xl bg-white border border-gray-100 shadow-2xl p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-700 font-black">
                ✓
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-black text-gray-900">
                  Order Confirmed 🎉
                </h3>
                <p className="mt-1 text-sm text-gray-700 leading-relaxed">
                  Your order has been placed successfully. We’ll contact you
                  with delivery updates.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/shop"
                onClick={() => setShowSuccess(false)}
                className="w-full sm:flex-1 inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-black text-sm hover:from-green-700 hover:to-green-800 transition shadow-md"
              >
                Continue Shopping
              </Link>

              <button
                type="button"
                onClick={() => {
                  setShowSuccess(false);
                  navigate("/");
                }}
                className="w-full sm:flex-1 inline-flex items-center justify-center border border-gray-200 bg-white py-3 rounded-xl font-black text-sm text-gray-800 hover:bg-gray-50 transition"
              >
                Back to Home
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowSuccess(false);
                navigate("/");
              }}
              className="absolute top-3 right-3 w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 font-black text-gray-700"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
