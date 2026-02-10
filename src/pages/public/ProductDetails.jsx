import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../../services/productService.js";
import { useCart } from "../../context/CartContext";
import { HiArrowLeft, HiShoppingCart, HiCheckCircle } from "react-icons/hi";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ toast
  const [toast, setToast] = useState("");

  // sizes
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState("");

  const fallback = "https://via.placeholder.com/900x1100?text=Product+Image";

  useEffect(() => {
    setLoading(true);
    setSelectedSize(null);
    setSizeError("");
    setToast("");

    getProductById(id)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [id]);

  // ✅ cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (window.__cartToastTimer) {
        clearTimeout(window.__cartToastTimer);
        window.__cartToastTimer = null;
      }
    };
  }, []);

  const priceText = useMemo(() => {
    if (!product?.price) return "";
    return `₦${Number(product.price).toLocaleString()}`;
  }, [product]);

  // Demo sizes (until backend includes sizes)
  const sizes = product?.sizes?.length ? product.sizes : ["S", "M", "L", "XL"];

  const canAdd = Boolean(selectedSize);

  function handleAddToCart() {
    if (!selectedSize) {
      setSizeError("Please select a size before adding to cart.");
      return;
    }

    setSizeError("");

    try {
      // ✅ CartContext: addToCart(product, selectedSize)
      addToCart(product, selectedSize);

      // ✅ show toast for 3s
      setToast("Added to cart ✅");

      window.clearTimeout(window.__cartToastTimer);
      window.__cartToastTimer = window.setTimeout(() => {
        setToast("");
      }, 3000);
    } catch (err) {
      setSizeError(err?.message || "Unable to add to cart.");
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/shop"
          className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition"
          aria-label="Back to Shop"
        >
          <HiArrowLeft className="w-5 h-5 text-gray-800" />
        </Link>

        <h2 className="text-xl sm:text-2xl font-black text-gray-900">
          Product Details
        </h2>

        <div className="flex-1 h-px bg-gray-200 ml-2" />
      </div>

      {loading ? (
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-gray-100 animate-pulse h-[420px]" />
          <div className="rounded-2xl bg-white border border-gray-100 p-6">
            <div className="h-7 w-2/3 bg-gray-100 rounded animate-pulse" />
            <div className="h-5 w-1/3 bg-gray-100 rounded mt-4 animate-pulse" />
            <div className="h-20 bg-gray-100 rounded mt-6 animate-pulse" />
            <div className="h-11 bg-gray-100 rounded mt-6 animate-pulse" />
          </div>
        </div>
      ) : !product ? (
        <div className="mt-10 rounded-2xl border border-gray-100 bg-white p-6">
          <p className="text-gray-700 font-bold">Product not found.</p>
          <Link
            to="/shop"
            className="inline-flex mt-4 items-center justify-center px-4 py-2 rounded-xl bg-green-600 text-white font-black text-sm hover:bg-green-700 transition"
          >
            Back to Shop
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Image */}
          <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm">
            <div className="bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                onError={(e) => (e.currentTarget.src = fallback)}
                className="w-full h-[420px] sm:h-[520px] object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                  {product.name}
                </h1>
                <p className="mt-2 text-xl font-black text-green-700">
                  {priceText}
                </p>
              </div>

              {selectedSize ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-800 border border-green-100 text-xs font-black">
                  <HiCheckCircle className="w-4 h-4" />
                  {selectedSize}
                </span>
              ) : null}
            </div>

            <p className="mt-4 text-sm text-gray-700 leading-relaxed">
              {product.description || "Product description will appear here."}
            </p>

            {/* Sizes */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-black text-gray-900">Select size</p>

                {!selectedSize ? (
                  <span className="text-xs font-bold text-gray-500">
                    Required
                  </span>
                ) : (
                  <span className="text-xs font-bold text-gray-500">
                    Selected:{" "}
                    <span className="text-gray-800 font-black">
                      {selectedSize}
                    </span>
                  </span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {sizes.map((s) => {
                  const active = selectedSize === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setSelectedSize(s);
                        setSizeError("");
                        setToast("");
                      }}
                      className={
                        active
                          ? "px-4 py-2 rounded-xl bg-gray-900 text-white font-black text-sm border border-gray-900"
                          : "px-4 py-2 rounded-xl bg-white text-gray-900 font-black text-sm border border-gray-200 hover:bg-gray-50"
                      }
                    >
                      {s}
                    </button>
                  );
                })}
              </div>

              {sizeError ? (
                <p className="mt-3 text-xs font-bold text-red-600">
                  {sizeError}
                </p>
              ) : null}
            </div>

            {/* Actions */}
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                disabled={!canAdd}
                onClick={handleAddToCart}
                className={`flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm transition shadow-md ${
                  canAdd
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800"
                    : "bg-gray-100 text-gray-400 border border-gray-200 shadow-none cursor-not-allowed"
                }`}
              >
                <HiShoppingCart className="w-5 h-5" />
                {canAdd ? "Add to Cart" : "Select size to continue"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="px-5 py-3 rounded-xl bg-gray-900 text-white font-black text-sm shadow-2xl flex items-center gap-2">
            <HiCheckCircle className="w-5 h-5 text-green-400" />
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
