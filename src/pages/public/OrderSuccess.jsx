import { Link } from "react-router-dom";
import { HiCheckCircle } from "react-icons/hi";

export default function OrderSuccess() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center font-black text-gray-800 transition"
          aria-label="Back to Home"
        >
          ‹
        </Link>

        <div className="flex-1">
          <h2 className="text-lg sm:text-xl font-black text-gray-900">
            Order Confirmed
          </h2>
          <div className="h-px bg-gray-100 mt-2" />
        </div>
      </div>

      {/* Card */}
      <div className="mt-6 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <HiCheckCircle className="w-7 h-7 text-green-600 mt-0.5" />
          <div>
            <p className="text-sm sm:text-base font-black text-gray-900">
              Your order has been placed successfully 🎉
            </p>
            <p className="mt-2 text-sm text-gray-700 leading-relaxed">
              We’ll contact you with delivery updates. You can continue shopping
              while we process your order.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            to="/shop"
            className="w-full sm:w-auto sm:flex-1 inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-black text-sm hover:from-green-700 hover:to-green-800 transition shadow-md"
          >
            Continue Shopping ›
          </Link>

          <Link
            to="/"
            className="w-full sm:w-auto sm:flex-1 inline-flex items-center justify-center border border-gray-200 bg-white py-3 rounded-xl font-black text-sm text-gray-800 hover:bg-gray-50 transition"
          >
            Back to Home
          </Link>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          Payment integration will be added later (Paystack/Flutterwave).
        </p>
      </div>
    </div>
  );
}
