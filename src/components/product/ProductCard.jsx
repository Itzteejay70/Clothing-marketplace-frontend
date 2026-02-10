import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const fallback = "https://via.placeholder.com/600x800?text=Product+Image";

  return (
    <Link
      to={`/product/${product.id}`}
      className="block rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition"
    >
      <div className="bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = fallback;
          }}
          className="w-full aspect-square object-cover block"
        />
      </div>

      <div className="p-4">
        <h4 className="text-sm font-black text-gray-900 line-clamp-1">
          {product.name}
        </h4>
        <p className="mt-2 text-sm font-black text-green-700">
          ₦{Number(product.price).toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
