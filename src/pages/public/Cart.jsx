import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const { items, subtotal, increment, decrement, removeFromCart, clearCart } =
    useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/shop"
              className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 flex items-center justify-center transition-all duration-300 hover:scale-105"
              aria-label="Back to Shop"
            >
              <span className="text-2xl text-gray-700">‹</span>
            </Link>
            <div>
              <h1 className="text-2xl font-black text-gray-900">Cart</h1>
              <p className="text-xs text-gray-600 mt-0.5">
                {items.length} {items.length === 1 ? "item" : "items"} in your
                cart
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <p className="text-gray-500 text-lg font-medium mb-4">
              Your cart is empty.
            </p>
            <Link
              to="/shop"
              className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
              {items.map(({ key, product, qty, selectedSize }) => (
                <div key={key} className="p-4 sm:p-6 flex gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-xl border border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-gray-900 text-lg mb-1 truncate">
                      {product.name}
                    </h4>

                    {selectedSize ? (
                      <p className="text-xs font-bold text-gray-500 mb-1">
                        Size:{" "}
                        <span className="text-gray-700">{selectedSize}</span>
                      </p>
                    ) : null}

                    <p className="text-green-700 font-black text-xl mb-3">
                      ₦{product.price.toLocaleString()}
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 border border-gray-200 rounded-lg">
                        <button
                          onClick={() => decrement(key)}
                          className="w-8 h-8 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-50 transition-all duration-300"
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-bold text-gray-900">
                          {qty}
                        </span>
                        <button
                          onClick={() => increment(key)}
                          className="w-8 h-8 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-50 transition-all duration-300"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(key)}
                        className="px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <span className="text-lg font-bold text-gray-700">
                  Subtotal
                </span>
                <strong className="text-2xl font-black text-gray-900">
                  ₦{subtotal.toLocaleString()}
                </strong>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={clearCart}
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all duration-300"
                >
                  Clear Cart
                </button>
                <Link
                  to="/checkout"
                  className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg text-center"
                >
                  Proceed to Checkout →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
