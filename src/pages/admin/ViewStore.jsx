import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Storefront,
  ArrowLeft,
  Heart,
  ShoppingCart,
  Eye,
  MagnifyingGlass,
  Funnel,
  GridFour,
  List,
} from "@phosphor-icons/react";

// Mock store data
const mockProducts = [
  {
    id: 1,
    name: "Nike Air Max 270",
    brand: "Nike",
    price: 45000,
    originalPrice: 55000,
    image: "/assets/categories/Removed-Bg-Nike-shoe.jpg",
    category: "Sneakers",
    rating: 4.5,
    reviews: 128,
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    brand: "Adidas",
    price: 52000,
    originalPrice: 65000,
    image: "/assets/products/sneakers.jpeg",
    category: "Sneakers",
    rating: 4.8,
    reviews: 256,
  },
  {
    id: 3,
    name: "Classic Hoodie",
    brand: "AshLuxe",
    price: 15000,
    originalPrice: 20000,
    image: "/assets/categories/hoodies.jpeg",
    category: "Hoodies",
    rating: 4.3,
    reviews: 89,
  },
  {
    id: 4,
    name: "Varsity Jacket",
    brand: "GoCrazy",
    price: 25000,
    originalPrice: 35000,
    image: "/assets/products/varsityjacket.jpeg",
    category: "Jackets",
    rating: 4.6,
    reviews: 167,
  },
  {
    id: 5,
    name: "Cargo Pants",
    brand: "DTTW",
    price: 18000,
    originalPrice: 25000,
    image: "/assets/products/cargopants.jpeg",
    category: "Pants",
    rating: 4.4,
    reviews: 203,
  },
  {
    id: 6,
    name: "Plain Tee",
    brand: "AshLuxe",
    price: 8000,
    originalPrice: 12000,
    image: "/assets/categories/plainTee.jpg",
    category: "T-Shirts",
    rating: 4.2,
    reviews: 312,
  },
  {
    id: 7,
    name: "Sweatshirt",
    brand: "ZTTW",
    price: 12000,
    originalPrice: 18000,
    image: "/assets/products/sweatshirt.jpeg",
    category: "Sweatshirts",
    rating: 4.5,
    reviews: 145,
  },
  {
    id: 8,
    name: "Snapback Cap",
    brand: "Puma",
    price: 5500,
    originalPrice: 8000,
    image: "/assets/products/snapback.jpeg",
    category: "Accessories",
    rating: 4.1,
    reviews: 78,
  },
];

const mockCategories = [
  { name: "Sneakers", image: "/assets/categories/sneakers.jpeg", count: 45 },
  { name: "Hoodies", image: "/assets/categories/hoodies.jpeg", count: 32 },
  { name: "Jackets", image: "/assets/categories/jackets.jpeg", count: 28 },
  { name: "T-Shirts", image: "/assets/categories/plainTee.jpg", count: 67 },
];

const mockBrands = [
  { name: "Nike", image: "/assets/brands/nike.jpeg" },
  { name: "Adidas", image: "/assets/brands/puma.png" },
  { name: "AshLuxe", image: "/assets/brands/ashluxe.png" },
  { name: "GoCrazy", image: "/assets/brands/gocrazy.png" },
];

export default function ViewStore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <div className="store-container">
      {/* Header Banner */}
      <div className="store-hero">
        <div className="hero-pattern"></div>
        <div className="hero-content">
          <div className="hero-badge">Store Preview</div>
          <h1 className="hero-title">AshLuxe Fashion</h1>
          <p className="hero-subtitle">
            Preview your store as customers see it
          </p>
          <Link to="/admin/dashboard" className="hero-btn">
            <ArrowLeft size={18} weight="bold" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="categories-bar">
        <div className="categories-scroll">
          <button
            className={`category-chip ${selectedCategory === "all" ? "active" : ""}`}
            onClick={() => setSelectedCategory("all")}
          >
            All Products
          </button>
          {mockCategories.map((cat) => (
            <button
              key={cat.name}
              className={`category-chip ${selectedCategory === cat.name ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="store-main">
        {/* Sidebar */}
        <aside className="store-sidebar">
          {/* Search */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">Search</h3>
            <div className="search-box">
              <MagnifyingGlass size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">Categories</h3>
            <div className="category-list">
              <button
                className={`category-item ${selectedCategory === "all" ? "active" : ""}`}
                onClick={() => setSelectedCategory("all")}
              >
                <Storefront size={16} />
                All Products
                <span className="category-count">{mockProducts.length}</span>
              </button>
              {mockCategories.map((cat) => (
                <button
                  key={cat.name}
                  className={`category-item ${selectedCategory === cat.name ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat.name)}
                >
                  <Storefront size={16} />
                  {cat.name}
                  <span className="category-count">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">Brands</h3>
            <div className="brand-grid">
              {mockBrands.map((brand) => (
                <div key={brand.name} className="brand-item">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="brand-image"
                  />
                  <span className="brand-name">{brand.name}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Area */}
        <div className="store-content">
          {/* Toolbar */}
          <div className="content-toolbar">
            <div className="toolbar-left">
              <span className="results-count">
                {filteredProducts.length} products found
              </span>
            </div>
            <div className="toolbar-right">
              <div className="sort-dropdown">
                <Funnel size={16} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                  onClick={() => setViewMode("grid")}
                >
                  <GridFour size={18} />
                </button>
                <button
                  className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                  onClick={() => setViewMode("list")}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`products-${viewMode}`}>
            {filteredProducts.length === 0 ? (
              <div className="empty-state">
                <Storefront size={48} />
                <h3>No products found</h3>
                <p>Try adjusting your search or filter</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image-wrapper">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                    <div className="product-badges">
                      {product.originalPrice > product.price && (
                        <span className="discount-badge">
                          {Math.round(
                            (1 - product.price / product.originalPrice) * 100,
                          )}
                          % OFF
                        </span>
                      )}
                    </div>
                    <div className="product-actions">
                      <button
                        className={`action-icon ${wishlist.includes(product.id) ? "active" : ""}`}
                        onClick={() => toggleWishlist(product.id)}
                      >
                        <Heart
                          size={18}
                          weight={
                            wishlist.includes(product.id) ? "fill" : "regular"
                          }
                        />
                      </button>
                      <button className="action-icon">
                        <Eye size={18} />
                      </button>
                      <button
                        className="action-icon"
                        onClick={() => addToCart(product)}
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="product-info">
                    <span className="product-brand">{product.brand}</span>
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-rating">
                      {"★".repeat(Math.floor(product.rating))}
                      {"☆".repeat(5 - Math.floor(product.rating))}
                      <span>({product.reviews})</span>
                    </div>
                    <div className="product-price">
                      <span className="current-price">
                        ₦{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="original-price">
                          ₦{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`
        .store-container {
          min-height: 100vh;
          background: #0a0a0a;
        }

        .store-hero {
          background: linear-gradient(135deg, #0f172a 0%, #0a0a0a 60%, #0d1f17 100%);
          padding: 48px 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hero-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(22, 163, 74, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(22, 163, 74, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 600px;
          margin: 0 auto;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(22, 163, 74, 0.15);
          color: #22c55e;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 16px;
          border: 1px solid rgba(22, 163, 74, 0.3);
        }

        .hero-title {
          font-size: 36px;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 12px 0;
          letter-spacing: -0.5px;
        }

        .hero-subtitle {
          font-size: 16px;
          color: rgba(255,255,255,0.5);
          margin: 0 0 24px 0;
        }

        .hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #16a34a;
          color: white;
          padding: 12px 24px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .hero-btn:hover {
          background: #15803d;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(22, 163, 74, 0.3);
        }

        .categories-bar {
          background: #111111;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 12px 0;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .categories-scroll {
          display: flex;
          gap: 8px;
          padding: 0 24px;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .categories-scroll::-webkit-scrollbar {
          display: none;
        }

        .category-chip {
          padding: 10px 20px;
          border-radius: 24px;
          font-size: 14px;
          font-weight: 500;
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.6);
          border: 1px solid rgba(255,255,255,0.08);
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .category-chip:hover {
          background: rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.8);
          border-color: rgba(255,255,255,0.15);
        }

        .category-chip.active {
          background: #16a34a;
          color: white;
          border-color: #16a34a;
        }

        .store-main {
          display: flex;
          max-width: 1400px;
          margin: 0 auto;
          padding: 24px;
          gap: 24px;
        }

        .store-sidebar {
          width: 260px;
          flex-shrink: 0;
        }

        .sidebar-section {
          background: #111111;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 16px;
          border: 1px solid rgba(255,255,255,0.06);
        }

        .sidebar-title {
          font-size: 13px;
          font-weight: 700;
          color: rgba(255,255,255,0.7);
          margin: 0 0 16px 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .search-box {
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.3);
        }

        .search-input {
          width: 100%;
          padding: 12px 12px 12px 40px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          font-size: 14px;
          color: #ffffff;
          background: rgba(255,255,255,0.03);
          outline: none;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          border-color: #16a34a;
          background: rgba(255,255,255,0.05);
        }

        .search-input::placeholder {
          color: rgba(255,255,255,0.3);
        }

        .category-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .category-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border: none;
          background: transparent;
          border-radius: 8px;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          text-align: left;
          transition: all 0.2s ease;
        }

        .category-item:hover {
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.8);
        }

        .category-item.active {
          background: rgba(22, 163, 74, 0.15);
          color: #22c55e;
          font-weight: 600;
        }

        .category-count {
          margin-left: auto;
          font-size: 12px;
          color: rgba(255,255,255,0.3);
        }

        .brand-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .brand-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 12px;
          background: rgba(255,255,255,0.03);
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .brand-image {
          width: 48px;
          height: 48px;
          object-fit: contain;
          border-radius: 8px;
        }

        .brand-name {
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
        }

        .store-content {
          flex: 1;
          min-width: 0;
        }

        .content-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          background: #111111;
          padding: 16px 20px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.06);
        }

        .results-count {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
        }

        .toolbar-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .sort-dropdown {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.4);
        }

        .sort-select {
          padding: 8px 12px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          font-size: 13px;
          color: rgba(255,255,255,0.7);
          background: rgba(255,255,255,0.03);
          cursor: pointer;
          outline: none;
        }

        .sort-select option {
          background: #111111;
          color: #ffffff;
        }

        .view-toggle {
          display: flex;
          background: rgba(255,255,255,0.05);
          border-radius: 8px;
          padding: 4px;
        }

        .view-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: transparent;
          border-radius: 6px;
          color: rgba(255,255,255,0.4);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .view-btn.active {
          background: #16a34a;
          color: white;
          box-shadow: 0 2px 8px rgba(22, 163, 74, 0.3);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px;
        }

        .products-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .product-card {
          background: #111111;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.06);
          overflow: hidden;
          transition: all 0.2s ease;
        }

        .product-card:hover {
          border-color: rgba(22, 163, 74, 0.4);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(22, 163, 74, 0.2);
        }

        .product-image-wrapper {
          position: relative;
          aspect-ratio: 1;
          background: #1a1a1a;
          overflow: hidden;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        .product-badges {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .discount-badge {
          background: #dc2626;
          color: white;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
        }

        .product-actions {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .product-card:hover .product-actions {
          opacity: 1;
        }

        .action-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          border: none;
          border-radius: 8px;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-icon:hover {
          background: #16a34a;
          color: white;
        }

        .action-icon.active {
          background: #dc2626;
          color: white;
        }

        .product-info {
          padding: 16px;
        }

        .product-brand {
          font-size: 12px;
          font-weight: 600;
          color: #22c55e;
          text-transform: uppercase;
        }

        .product-name {
          font-size: 14px;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          margin: 4px 0 8px 0;
          line-height: 1.4;
        }

        .product-rating {
          font-size: 12px;
          color: #fbbf24;
          margin-bottom: 8px;
        }

        .product-rating span {
          color: rgba(255,255,255,0.3);
          margin-left: 4px;
        }

        .product-price {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .current-price {
          font-size: 16px;
          font-weight: 700;
          color: #ffffff;
        }

        .original-price {
          font-size: 13px;
          color: rgba(255,255,255,0.3);
          text-decoration: line-through;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: rgba(255,255,255,0.3);
        }

        .empty-state svg {
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .empty-state h3 {
          font-size: 18px;
          font-weight: 600;
          color: rgba(255,255,255,0.5);
          margin: 0 0 8px 0;
        }

        .empty-state p {
          font-size: 14px;
          margin: 0;
        }

        @media (max-width: 1024px) {
          .store-sidebar {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .store-main {
            padding: 16px;
          }

          .hero-title {
            font-size: 28px;
          }

          .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .content-toolbar {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
