import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  SealCheck,
  X,
  Eye,
  MagnifyingGlass,
  Funnel,
  ShoppingBag,
  Clock,
  CheckCircle,
  CurrencyDollar,
  CaretDown,
  ArrowLeft,
  Package,
  Storefront,
  Tag,
  Warning,
} from "@phosphor-icons/react";

/* ── Hero welcome card ── */
function HeroCard() {
  return (
    <div className="hero-card">
      <div className="hero-left">
        <div className="hero-content">
          <h1 className="hero-title">Monitor Your Platform in Real Time</h1>
          <p className="hero-sub">
            Track product listings, manage approved items, and stay updated on
            sales activity happening across your platform.
          </p>
          <div className="hero-actions">
            <button className="hero-btn-primary">View Sales</button>
            <button className="hero-btn-ghost">Manage Products</button>
          </div>
        </div>
      </div>
      <div className="hero-right">
        <img
          src="/assets/categories/Removed-Bg-Nike-shoe.jpg"
          alt="Nike Sneaker"
          className="hero-img"
        />
      </div>
    </div>
  );
}

/* ── Product card ── */
function ProductCard({ product, onApprove, onReject, onView, index }) {
  return (
    <div
      className="prod-card fade-up"
      style={{ animationDelay: `${index * 55}ms` }}
    >
      {/* image */}
      <div className="prod-img-wrap">
        <img src={product.image} alt={product.name} className="prod-img" />
        <div className="prod-img-overlay" />
        <span className="prod-cat-badge">{product.category}</span>
        <span className="prod-pending-badge">
          <Clock size={10} weight="fill" /> Pending
        </span>
        <div className="prod-stock-badge">
          Stock: <strong>{product.stock}</strong>
        </div>
      </div>

      {/* info */}
      <div className="prod-body">
        <div className="prod-top">
          <div>
            <h3 className="prod-name">{product.name}</h3>
            <p className="prod-brand">
              by <strong>{product.brand}</strong>
            </p>
          </div>
          <div className="prod-price">
            <span className="prod-price-sym">₦</span>
            {(product.price / 1000).toFixed(0)}k
          </div>
        </div>

        <div className="prod-vendor-row">
          <Storefront size={12} color="rgba(255,255,255,0.35)" weight="fill" />
          <span className="prod-vendor">{product.vendor}</span>
          <span className="prod-date">
            {new Date(product.submittedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="prod-sizes">
          {product.sizes.slice(0, 4).map((s, i) => (
            <span key={i} className="prod-size">
              {s}
            </span>
          ))}
          {product.sizes.length > 4 && (
            <span className="prod-size prod-size-more">
              +{product.sizes.length - 4}
            </span>
          )}
        </div>

        <div className="prod-actions">
          <button
            className="prod-btn prod-btn-view"
            onClick={() => onView(product)}
          >
            <Eye size={13} weight="bold" /> View
          </button>
          <button
            className="prod-btn prod-btn-approve"
            onClick={() => onApprove(product.id)}
          >
            <SealCheck size={13} weight="bold" /> Approve
          </button>
          <button
            className="prod-btn prod-btn-reject"
            onClick={() => onReject(product.id)}
          >
            <X size={13} weight="bold" /> Reject
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Modal ── */
function ProductModal({ product, onClose, onApprove, onReject }) {
  if (!product) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-title">Product Details</div>
            <div className="modal-sub">
              Review complete information before deciding
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={16} weight="bold" />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-img-wrap">
            <img src={product.image} alt={product.name} className="modal-img" />
            <span className="prod-pending-badge" style={{ top: 16, right: 16 }}>
              <Clock size={11} weight="fill" /> Pending Review
            </span>
          </div>

          <div className="modal-grid">
            <div className="modal-field">
              <div className="modal-field-label">Product Name</div>
              <div className="modal-field-val">{product.name}</div>
            </div>
            <div className="modal-field">
              <div className="modal-field-label">Brand</div>
              <div className="modal-field-val">{product.brand}</div>
            </div>
            <div className="modal-field modal-field-green">
              <div className="modal-field-label" style={{ color: "#22c55e" }}>
                Price
              </div>
              <div
                className="modal-field-val"
                style={{ color: "#22c55e", fontSize: 22 }}
              >
                ₦{product.price.toLocaleString("en-NG")}
              </div>
            </div>
            <div className="modal-field">
              <div className="modal-field-label">Category</div>
              <div
                className="modal-field-val"
                style={{ textTransform: "capitalize" }}
              >
                {product.category}
              </div>
            </div>
            <div className="modal-field">
              <div className="modal-field-label">Vendor</div>
              <div className="modal-field-val">{product.vendor}</div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.3)",
                  marginTop: 2,
                }}
              >
                {product.vendorEmail}
              </div>
            </div>
            <div className="modal-field">
              <div className="modal-field-label">Stock</div>
              <div className="modal-field-val">{product.stock} units</div>
            </div>
          </div>

          <div className="modal-desc">
            <div className="modal-field-label" style={{ marginBottom: 8 }}>
              Description
            </div>
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
              }}
            >
              {product.description}
            </p>
          </div>

          <div className="modal-sizes-wrap">
            <div className="modal-field-label" style={{ marginBottom: 8 }}>
              Available Sizes
            </div>
            <div className="prod-sizes">
              {product.sizes.map((s, i) => (
                <span key={i} className="prod-size prod-size-lg">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-submitted">
            <Warning size={13} color="rgba(255,255,255,0.3)" weight="fill" />
            Submitted on{" "}
            {new Date(product.submittedAt).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <div className="modal-actions">
            <button
              className="modal-btn modal-btn-approve"
              onClick={() => {
                onApprove(product.id);
                onClose();
              }}
            >
              <CheckCircle size={18} weight="bold" /> Approve Product
            </button>
            <button
              className="modal-btn modal-btn-reject"
              onClick={() => {
                onReject(product.id);
                onClose();
              }}
            >
              <X size={18} weight="bold" /> Reject Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main page ── */
export default function ApproveProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("pending");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: "Nike Air Max 270",
          brand: "Nike",
          price: 45000,
          category: "sneakers",
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
          vendor: "Sneaker Palace",
          vendorEmail: "sneakerpalace@example.com",
          submittedAt: "2024-01-20",
          status: "pending",
          description:
            "The Nike Air Max 270 features a breathable mesh upper with vibrant colors and exceptional cushioning.",
          stock: 45,
          sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
        },
        {
          id: 2,
          name: "Adidas Ultraboost 21",
          brand: "Adidas",
          price: 52000,
          category: "sneakers",
          image:
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80",
          vendor: "Kicks Store",
          vendorEmail: "kicksstore@example.com",
          submittedAt: "2024-01-19",
          status: "pending",
          description:
            "Experience energy return with every step in the Adidas Ultraboost 21.",
          stock: 32,
          sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
        },
        {
          id: 3,
          name: "Premium Leather Jacket",
          brand: "Zara",
          price: 89000,
          category: "jackets",
          image:
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
          vendor: "Fashion Hub",
          vendorEmail: "fashionhub@example.com",
          submittedAt: "2024-01-18",
          status: "pending",
          description:
            "Genuine leather jacket with modern slim fit design and premium quality.",
          stock: 15,
          sizes: ["S", "M", "L", "XL"],
        },
        {
          id: 4,
          name: "Classic Hoodie",
          brand: "Champion",
          price: 25000,
          category: "hoodies",
          image:
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80",
          vendor: "Street Wear Co",
          vendorEmail: "streetwear@example.com",
          submittedAt: "2024-01-17",
          status: "pending",
          description:
            "Comfortable cotton blend hoodie perfect for casual wear.",
          stock: 67,
          sizes: ["S", "M", "L", "XL", "XXL"],
        },
        {
          id: 5,
          name: "Plain White Tee",
          brand: "H&M",
          price: 8000,
          category: "plainTee",
          image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
          vendor: "Basic Essentials",
          vendorEmail: "basics@example.com",
          submittedAt: "2024-01-16",
          status: "pending",
          description:
            "Essential plain white t-shirt made from premium cotton.",
          stock: 120,
          sizes: ["S", "M", "L", "XL"],
        },
        {
          id: 6,
          name: "Puma RS-X",
          brand: "Puma",
          price: 38000,
          category: "sneakers",
          image:
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80",
          vendor: "Sneaker Palace",
          vendorEmail: "sneakerpalace@example.com",
          submittedAt: "2024-01-15",
          status: "pending",
          description:
            "Bold and colorful running-inspired sneaker with retro vibes.",
          stock: 28,
          sizes: ["UK 7", "UK 8", "UK 9"],
        },
        {
          id: 7,
          name: "Denim Jacket",
          brand: "Levi's",
          price: 65000,
          category: "jackets",
          image:
            "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&q=80",
          vendor: "Fashion Hub",
          vendorEmail: "fashionhub@example.com",
          submittedAt: "2024-01-14",
          status: "pending",
          description: "Classic denim jacket with modern fit and vintage wash.",
          stock: 40,
          sizes: ["S", "M", "L", "XL"],
        },
        {
          id: 8,
          name: "Oversized Hoodie",
          brand: "Off-White",
          price: 75000,
          category: "hoodies",
          image:
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80",
          vendor: "Premium Streetwear",
          vendorEmail: "premium@example.com",
          submittedAt: "2024-01-13",
          status: "pending",
          description: "Trendy oversized hoodie with signature branding.",
          stock: 22,
          sizes: ["M", "L", "XL"],
        },
        {
          id: 9,
          name: "Graphic Tee",
          brand: "Supreme",
          price: 35000,
          category: "plainTee",
          image:
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80",
          vendor: "Street Wear Co",
          vendorEmail: "streetwear@example.com",
          submittedAt: "2024-01-12",
          status: "pending",
          description: "Limited edition graphic tee with bold print design.",
          stock: 55,
          sizes: ["S", "M", "L", "XL"],
        },
        {
          id: 10,
          name: "New Balance 574",
          brand: "New Balance",
          price: 42000,
          category: "sneakers",
          image:
            "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&q=80",
          vendor: "Kicks Store",
          vendorEmail: "kicksstore@example.com",
          submittedAt: "2024-01-11",
          status: "pending",
          description: "Classic retro runner with suede and mesh construction.",
          stock: 38,
          sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
        },
      ]);
      setLoading(false);
    }, 900);
  }, []);

  const handleApprove = (id) =>
    setProducts((p) => p.filter((x) => x.id !== id));
  const handleReject = (id) => setProducts((p) => p.filter((x) => x.id !== id));

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "sneakers", label: "Sneakers" },
    { value: "hoodies", label: "Hoodies" },
    { value: "jackets", label: "Jackets" },
    { value: "plainTee", label: "T-Shirts" },
  ];

  const filtered = products.filter((p) => {
    const s = searchTerm.toLowerCase();
    const matchSearch =
      p.name.toLowerCase().includes(s) ||
      p.brand.toLowerCase().includes(s) ||
      p.vendor.toLowerCase().includes(s);
    const matchCat = filterCategory === "all" || p.category === filterCategory;
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchCat && matchStatus;
  });

  const totalValue = products.reduce((s, p) => s + p.price, 0);

  return (
    <div className="ap-root">
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .ap-root {
          min-height: 100vh; background: #0a0a0a;
          font-family: 'Poppins', sans-serif; color: #fff;
          padding: 24px 28px;
        }

        /* ── fade-up ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s ease-out forwards; opacity: 0; }

        /* ── Hero card ── */
        .hero-card {
          position: relative; overflow: hidden;
          width: 100%; border-radius: 20px;
          background: #0f3318;
          margin-bottom: 22px; height: 320px;
          animation: fadeUp 0.45s ease-out forwards;
          display: flex;
          border: 1px solid rgba(34,197,94,0.12);
        }

        /* left half */
        .hero-left {
          flex: 1;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          position: relative;
          z-index: 2;
        }
        .hero-content {
          max-width: 480px;
          position: relative;
          z-index: 1;
        }
        .hero-title {
          font-size: 30px;
          font-weight: 900;
          color: #fff;
          margin-bottom: 12px;
          line-height: 1.2;
          letter-spacing: -0.5px;
        }
        .hero-sub {
          font-size: 13px;
          color: rgba(255,255,255,0.45);
          margin-bottom: 28px;
          line-height: 1.7;
          max-width: 380px;
        }
        .hero-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .hero-btn-primary {
          padding: 11px 22px;
          background: #22c55e;
          color: #000;
          border: none;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          transition: all 0.2s ease;
          box-shadow: 0 0 20px rgba(34,197,94,0.3);
        }
        .hero-btn-primary:hover {
          background: #4ade80;
          box-shadow: 0 0 28px rgba(34,197,94,0.45);
          transform: translateY(-1px);
        }
        .hero-btn-ghost {
          padding: 11px 22px;
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.6);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          transition: all 0.2s ease;
        }
        .hero-btn-ghost:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
          border-color: rgba(255,255,255,0.2);
        }

        /* right half — shoe image */
        .hero-right {
          width: 45%;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-right::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg,
            #0f3318 0%,
            rgba(15,51,24,0.75) 30%,
            rgba(15,51,24,0.15) 60%,
            transparent 100%);
          z-index: 1;
        }
        .hero-img {
          width: 90%;
          height: 90%;
          object-fit: contain;
          object-position: center;
          display: block;
          filter: drop-shadow(0 8px 40px rgba(0,0,0,0.6));
        }

        /* ── Stats bar ── */
        .stats-bar {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
          margin-bottom: 22px;
        }
        .stat-tile {
          background: #111; border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px; padding: 16px 18px;
          display: flex; align-items: center; gap: 12px;
          animation: fadeUp 0.5s ease-out forwards;
        }
        .stat-tile-icon {
          width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .stat-tile-label { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.35); margin-bottom: 2px; }
        .stat-tile-val { font-size: 20px; font-weight: 900; color: #fff; letter-spacing: -0.5px; }

        /* ── Filters ── */
        .filters-bar {
          background: #111; border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px; padding: 16px 18px; margin-bottom: 22px;
          animation: fadeUp 0.5s ease-out forwards; animation-delay: 80ms;
        }
        .filters-row { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 10px; }
        .filter-input-wrap { position: relative; }
        .filter-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; }
        .filter-input {
          width: 100%; padding: 9px 12px 9px 36px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px; font-size: 12px; font-weight: 500; color: #fff;
          font-family: 'Poppins', sans-serif; outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .filter-input::placeholder { color: rgba(255,255,255,0.25); }
        .filter-input:focus { border-color: rgba(34,197,94,0.4); background: rgba(34,197,94,0.04); }
        .filter-select {
          width: 100%; padding: 9px 32px 9px 12px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.7);
          font-family: 'Poppins', sans-serif; outline: none; cursor: pointer;
          appearance: none;
          transition: border-color 0.2s;
        }
        .filter-select:focus { border-color: rgba(34,197,94,0.4); }
        .select-wrap { position: relative; }
        .select-caret { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); pointer-events: none; }
        .filters-count { margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.05); font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.3); }
        .filters-count span { color: #22c55e; }

        /* ── Product grid ── */
        .prod-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }

        /* ── Product card ── */
        .prod-card {
          background: #111; border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px; overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.34,1.4,0.64,1), border-color 0.25s, box-shadow 0.3s;
        }
        .prod-card:hover {
          transform: translateY(-5px);
          border-color: rgba(34,197,94,0.28);
          box-shadow: 0 16px 48px rgba(0,0,0,0.5), 0 0 32px -8px rgba(34,197,94,0.12);
        }

        .prod-img-wrap { position: relative; height: 200px; overflow: hidden; background: #1a1a1a; }
        .prod-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .prod-card:hover .prod-img { transform: scale(1.07); }
        .prod-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(17,17,17,0.7) 0%, transparent 50%);
        }
        .prod-cat-badge {
          position: absolute; top: 10px; left: 10px;
          background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 20px; padding: 3px 10px;
          font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.7);
          text-transform: capitalize;
        }
        .prod-pending-badge {
          position: absolute; top: 10px; right: 10px;
          background: rgba(245,158,11,0.15); backdrop-filter: blur(8px);
          border: 1px solid rgba(245,158,11,0.3);
          border-radius: 20px; padding: 3px 10px;
          font-size: 10px; font-weight: 700; color: #f59e0b;
          display: flex; align-items: center; gap: 4px;
        }
        .prod-stock-badge {
          position: absolute; bottom: 10px; left: 10px;
          background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px; padding: 3px 9px;
          font-size: 10px; color: rgba(255,255,255,0.5);
        }
        .prod-stock-badge strong { color: #22c55e; }

        .prod-body { padding: 16px; }
        .prod-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 8px; }
        .prod-name { font-size: 13px; font-weight: 800; color: #fff; line-height: 1.3; margin-bottom: 2px; }
        .prod-brand { font-size: 11px; color: rgba(255,255,255,0.35); }
        .prod-brand strong { color: rgba(255,255,255,0.6); }
        .prod-price { font-size: 16px; font-weight: 900; color: #22c55e; white-space: nowrap; display: flex; align-items: baseline; gap: 1px; flex-shrink: 0; }
        .prod-price-sym { font-size: 11px; font-weight: 700; color: rgba(34,197,94,0.6); }

        .prod-vendor-row { display: flex; align-items: center; gap: 5px; margin-bottom: 10px; }
        .prod-vendor { font-size: 11px; color: rgba(255,255,255,0.35); flex: 1; }
        .prod-date { font-size: 10px; color: rgba(255,255,255,0.2); }

        .prod-sizes { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 14px; }
        .prod-size {
          padding: 3px 8px; border-radius: 6px;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
          font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.45);
        }
        .prod-size-more { color: rgba(34,197,94,0.6); border-color: rgba(34,197,94,0.15); background: rgba(34,197,94,0.05); }
        .prod-size-lg { padding: 5px 12px; font-size: 11px; }

        .prod-actions { display: grid; grid-template-columns: 1fr 1.2fr 1fr; gap: 6px; }
        .prod-btn {
          display: flex; align-items: center; justify-content: center; gap: 4px;
          padding: 8px 6px; border-radius: 10px; border: none; cursor: pointer;
          font-size: 11px; font-weight: 700; font-family: 'Poppins', sans-serif;
          transition: all 0.2s ease;
        }
        .prod-btn-view {
          background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.6);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .prod-btn-view:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .prod-btn-approve {
          background: rgba(34,197,94,0.12); color: #22c55e;
          border: 1px solid rgba(34,197,94,0.25);
        }
        .prod-btn-approve:hover { background: #22c55e; color: #000; box-shadow: 0 0 20px rgba(34,197,94,0.3); }
        .prod-btn-reject {
          background: rgba(239,68,68,0.08); color: rgba(239,68,68,0.7);
          border: 1px solid rgba(239,68,68,0.18);
        }
        .prod-btn-reject:hover { background: #ef4444; color: #fff; box-shadow: 0 0 20px rgba(239,68,68,0.25); }

        /* ── Empty / Loading ── */
        .empty-state {
          background: #111; border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px; padding: 64px 24px; text-align: center;
        }
        .empty-icon-wrap {
          width: 64px; height: 64px; border-radius: 18px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px;
        }
        .empty-title { font-size: 16px; font-weight: 800; color: rgba(255,255,255,0.6); margin-bottom: 6px; }
        .empty-sub { font-size: 12px; color: rgba(255,255,255,0.25); }

        .loading-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px; gap: 14px; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spinner { width: 36px; height: 36px; border: 3px solid rgba(34,197,94,0.15); border-top-color: #22c55e; border-radius: 50%; animation: spin 0.8s linear infinite; }
        .loading-text { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.3); }

        /* ── Modal ── */
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.75);
          backdrop-filter: blur(6px); display: flex; align-items: center;
          justify-content: center; z-index: 999; padding: 20px;
          animation: fadeIn 0.2s ease-out;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .modal-box {
          background: #111; border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px; width: 100%; max-width: 680px;
          max-height: 90vh; overflow-y: auto;
          animation: scaleIn 0.25s cubic-bezier(0.34,1.4,0.64,1);
          scrollbar-width: thin; scrollbar-color: #222 #111;
        }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        .modal-header {
          position: sticky; top: 0; background: #111;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 20px 24px; display: flex; align-items: flex-start;
          justify-content: space-between; z-index: 10;
        }
        .modal-title { font-size: 17px; font-weight: 800; color: #fff; margin-bottom: 2px; }
        .modal-sub { font-size: 11px; color: rgba(255,255,255,0.35); }
        .modal-close {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(255,255,255,0.5); transition: all 0.2s;
          flex-shrink: 0;
        }
        .modal-close:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .modal-body { padding: 24px; }
        .modal-img-wrap { position: relative; height: 260px; border-radius: 14px; overflow: hidden; background: #1a1a1a; margin-bottom: 20px; }
        .modal-img { width: 100%; height: 100%; object-fit: cover; }
        .modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; }
        .modal-field {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px; padding: 12px 14px;
        }
        .modal-field-green { background: rgba(34,197,94,0.04); border-color: rgba(34,197,94,0.15); }
        .modal-field-label { font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .modal-field-val { font-size: 14px; font-weight: 800; color: #fff; }
        .modal-desc {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px; padding: 14px; margin-bottom: 16px;
        }
        .modal-sizes-wrap { margin-bottom: 16px; }
        .modal-submitted {
          display: flex; align-items: center; gap: 6px;
          font-size: 11px; color: rgba(255,255,255,0.25); margin-bottom: 20px;
        }
        .modal-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .modal-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 14px; border-radius: 12px; border: none; cursor: pointer;
          font-size: 14px; font-weight: 800; font-family: 'Poppins', sans-serif;
          transition: all 0.2s ease;
        }
        .modal-btn-approve { background: rgba(34,197,94,0.12); color: #22c55e; border: 1px solid rgba(34,197,94,0.25); }
        .modal-btn-approve:hover { background: #22c55e; color: #000; box-shadow: 0 0 28px rgba(34,197,94,0.35); }
        .modal-btn-reject { background: rgba(239,68,68,0.08); color: rgba(239,68,68,0.8); border: 1px solid rgba(239,68,68,0.2); }
        .modal-btn-reject:hover { background: #ef4444; color: #fff; box-shadow: 0 0 28px rgba(239,68,68,0.3); }

        * { scrollbar-width: thin; scrollbar-color: #222 #0a0a0a; }
        *::-webkit-scrollbar { width: 5px; }
        *::-webkit-scrollbar-track { background: #0a0a0a; }
        *::-webkit-scrollbar-thumb { background: #222; border-radius: 999px; }
      `}</style>

      {/* Hero */}
      <HeroCard />

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat-tile" style={{ animationDelay: "60ms" }}>
          <div
            className="stat-tile-icon"
            style={{
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.2)",
            }}
          >
            <Clock size={18} color="#f59e0b" weight="duotone" />
          </div>
          <div>
            <div className="stat-tile-label">Pending Review</div>
            <div className="stat-tile-val">{products.length}</div>
          </div>
        </div>
        <div className="stat-tile" style={{ animationDelay: "100ms" }}>
          <div
            className="stat-tile-icon"
            style={{
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.2)",
            }}
          >
            <CheckCircle size={18} color="#22c55e" weight="duotone" />
          </div>
          <div>
            <div className="stat-tile-label">Approved Today</div>
            <div className="stat-tile-val">0</div>
          </div>
        </div>
        <div className="stat-tile" style={{ animationDelay: "140ms" }}>
          <div
            className="stat-tile-icon"
            style={{
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.2)",
            }}
          >
            <Tag size={18} color="#6366f1" weight="duotone" />
          </div>
          <div>
            <div className="stat-tile-label">Total Value</div>
            <div className="stat-tile-val">
              ₦{(totalValue / 1000).toFixed(0)}k
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="filters-row">
          <div className="filter-input-wrap">
            <MagnifyingGlass
              size={14}
              color="rgba(255,255,255,0.25)"
              className="filter-icon"
            />
            <input
              className="filter-input"
              type="text"
              placeholder="Search products, brands, vendors…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="select-wrap">
            <select
              className="filter-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <CaretDown
              size={12}
              color="rgba(255,255,255,0.3)"
              className="select-caret"
            />
          </div>
          <div className="select-wrap">
            <select
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <CaretDown
              size={12}
              color="rgba(255,255,255,0.3)"
              className="select-caret"
            />
          </div>
        </div>
        <div className="filters-count">
          Showing <span>{filtered.length}</span> of {products.length} products
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="loading-wrap">
          <div className="spinner" />
          <div className="loading-text">Loading products…</div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon-wrap">
            <ShoppingBag
              size={28}
              color="rgba(255,255,255,0.2)"
              weight="duotone"
            />
          </div>
          <div className="empty-title">No products found</div>
          <div className="empty-sub">
            Try adjusting your filters or search terms
          </div>
        </div>
      ) : (
        <div className="prod-grid">
          {filtered.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              onApprove={handleApprove}
              onReject={handleReject}
              onView={setSelectedProduct}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}