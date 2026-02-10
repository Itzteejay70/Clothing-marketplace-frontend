import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../services/productService.js";
import { useCart } from "../../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fallback = "https://via.placeholder.com/800x900?text=Product+Image";

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/shop"
          className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center font-black text-gray-800 transition"
          aria-label="Back to Shop"
        >
          ‹
        </Link>

        <div className="flex-1">
          <h2 className="text-lg sm:text-xl font-black text-gray-900">
            Product Details
          </h2>
          <div className="h-px bg-gray-100 mt-2" />
        </div>
      </div>

      {/* Body */}
      {loading ? (
        <div className="mt-8 text-sm font-bold text-gray-600">
          Loading product...
        </div>
      ) : !product ? (
        <div className="mt-8 text-sm font-bold text-gray-600">
          Product not found.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Image */}
          <div className="border border-gray-100 rounded-2xl overflow-hidden bg-gray-100 h-[420px] shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => (e.currentTarget.src = fallback)}
              className="w-full h-full object-cover block"
            />
          </div>

          {/* Info */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm">
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">
              {product.name}
            </h1>

            <p className="mt-2 text-lg font-black text-green-700">
              ₦{Number(product.price).toLocaleString()}
            </p>

            <p className="mt-4 text-sm text-gray-700 leading-relaxed">
              {product.description || "Product description will appear here."}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                className="w-full sm:w-auto sm:flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-black text-sm hover:from-green-700 hover:to-green-800 transition shadow-md"
                onClick={() => {
                  addToCart(product);
                  navigate("/cart");
                }}
              >
                Add to Cart
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
