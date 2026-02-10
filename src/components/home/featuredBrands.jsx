import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedBrands } from "../../services/brandService.js";

export default function FeaturedBrands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    getFeaturedBrands().then(setBrands);
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl lg:text-3xl font-black text-gray-900 whitespace-nowrap">
            Featured Brands
          </h2>
          <div className="flex-1 h-px bg-gray-200" />
          <Link
            to="/brands"
            className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-black text-xs uppercase tracking-wide transition-all duration-300 whitespace-nowrap"
          >
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {brands.map((brand, index) => (
            <Link
              key={brand.id}
              to="/brands"
              className="group bg-white border border-gray-100 rounded-xl h-24 flex items-center justify-center p-6 hover:border-green-200 hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <img
                src={brand.logo}
                alt=""
                className="max-w-full max-h-16 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/260x90?text=Brand+Logo";
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
