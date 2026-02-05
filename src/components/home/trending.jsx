import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../product/ProductCard.jsx";
import { getTrendingProducts } from "../../services/productService.js";

export default function Trending() {
  const [products, setProducts] = useState([]);

  // Add WAY more demo products with real images
  const demoProducts = [
    {
      id: 1,
      name: "Oversized Hoodie",
      price: 45000,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600",
    },
    {
      id: 2,
      name: "Cargo Pants",
      price: 38000,
      image:
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600",
    },
    {
      id: 3,
      name: "Graphic Tee",
      price: 15000,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
    },
    {
      id: 4,
      name: "Bomber Jacket",
      price: 65000,
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600",
    },
    {
      id: 5,
      name: "Sneakers",
      price: 55000,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    },
    {
      id: 6,
      name: "Track Pants",
      price: 32000,
      image:
        "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600",
    },
    {
      id: 7,
      name: "Denim Jacket",
      price: 48000,
      image:
        "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600",
    },
    {
      id: 8,
      name: "Baseball Cap",
      price: 12000,
      image:
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600",
    },
    {
      id: 9,
      name: "Windbreaker",
      price: 42000,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600",
    },
    {
      id: 10,
      name: "Joggers",
      price: 28000,
      image:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600",
    },
    {
      id: 11,
      name: "Leather Jacket",
      price: 85000,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600",
    },
    {
      id: 12,
      name: "Sweatpants",
      price: 25000,
      image:
        "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600",
    },
    {
      id: 13,
      name: "Varsity Jacket",
      price: 72000,
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600",
    },
    {
      id: 14,
      name: "High-Top Sneakers",
      price: 62000,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    },
    {
      id: 15,
      name: "Streetwear Tee",
      price: 18000,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
    },
    {
      id: 16,
      name: "Utility Vest",
      price: 42000,
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600",
    },
    {
      id: 17,
      name: "Slim Fit Jeans",
      price: 35000,
      image:
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600",
    },
    {
      id: 18,
      name: "Bucket Hat",
      price: 10000,
      image:
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600",
    },
    {
      id: 19,
      name: "Puffer Jacket",
      price: 78000,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600",
    },
    {
      id: 20,
      name: "Running Shoes",
      price: 48000,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    },
    {
      id: 21,
      name: "Flannel Shirt",
      price: 32000,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
    },
    {
      id: 22,
      name: "Tech Fleece Hoodie",
      price: 52000,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600",
    },
    {
      id: 23,
      name: "Chino Pants",
      price: 38000,
      image:
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600",
    },
    {
      id: 24,
      name: "Coach Jacket",
      price: 55000,
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600",
    },
  ];

  useEffect(() => {
    getTrendingProducts().then((data) => {
      // If we have real products, use them, otherwise use demo products
      setProducts(data.length > 0 ? data : demoProducts);
    });
  }, []);

  // Double the products for seamless infinite scroll
  const allProducts = [...products, ...products];

  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl lg:text-3xl font-black text-gray-900 whitespace-nowrap">
            Trending Now
          </h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Auto-Scrolling Container */}
        <div className="relative">
          {/* Gradient Overlays - Much smoother */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track */}
          <div className="overflow-hidden">
            <div className="flex gap-6 animate-scroll-horizontal hover:pause-animation">
              {allProducts.map((product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  className="flex-shrink-0 w-[280px] sm:w-[320px]"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/trending"
            className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-black text-xs uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
          >
            View All Trending
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-horizontal {
          animation: scroll-horizontal 30s linear infinite;
        }

        .pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
