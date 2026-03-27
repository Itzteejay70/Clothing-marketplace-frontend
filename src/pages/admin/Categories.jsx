import { useState, useEffect, useRef } from "react";
import {
  Tag,
  Plus,
  PencilSimple,
  Trash,
  Eye,
  MagnifyingGlass,
  ShoppingBag,
  CurrencyNgn,
  X,
  Warning,
  Image,
  ChartLineUp,
  Star,
  CheckCircle,
  CaretDown,
  Funnel,
  ArrowUp,
  ArrowDown,
} from "@phosphor-icons/react";

/* ─────────────────────────────────────────
   Toast Notification
───────────────────────────────────────── */
function Toast({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast toast-${t.type} ${t.removing ? "toast-out" : "toast-in"}`}
        >
          <div className="toast-icon">
            {t.type === "success" ? (
              <CheckCircle size={16} weight="fill" color="#22c55e" />
            ) : (
              <Warning size={16} weight="fill" color="#ef4444" />
            )}
          </div>
          <div className="toast-body">
            <div className="toast-title">{t.title}</div>
            <div className="toast-sub">{t.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Animated Counter Hook
───────────────────────────────────────── */
function useCountUp(target, duration = 600) {
  const [count, setCount] = useState(target);
  const prev = useRef(target);
  useEffect(() => {
    if (prev.current === target) return;
    const from = prev.current;
    prev.current = target;
    const diff = target - from;
    const steps = Math.min(Math.abs(diff), 30);
    const inc = diff / steps;
    let current = from;
    let step = 0;
    const timer = setInterval(
      () => {
        step++;
        current += inc;
        setCount(step >= steps ? target : Math.round(current));
        if (step >= steps) clearInterval(timer);
      },
      Math.max(16, Math.floor(duration / steps)),
    );
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

/* ─────────────────────────────────────────
   Hero Card
───────────────────────────────────────── */
function HeroCard({ onAddCategory }) {
  return (
    <div className="hero-card">
      <div className="hero-grid" />
      <div className="hero-left">
        <div className="hero-badge">
          <Tag size={11} weight="fill" /> Category Management
        </div>
        <h1 className="hero-title">Organize Your Product Categories</h1>
        <p className="hero-sub">
          Create and manage product categories to help customers browse your
          store. Organize your inventory with clear categories and
          subcategories.
        </p>
        <div className="hero-actions">
          <button className="hero-btn-primary" onClick={onAddCategory}>
            <Plus size={15} weight="bold" /> Add Category
          </button>
          <button className="hero-btn-ghost" onClick={onAddCategory}>
            Manage Subcategories
          </button>
        </div>
      </div>
      <div className="hero-right">
        <img
          src="/assets/categories/Removed-Bg-Nike-shoe.jpg"
          alt="Categories"
          className="hero-img"
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Stat Cards
───────────────────────────────────────── */
function StatCards({ total, products, sales, featured }) {
  const tot = useCountUp(total);
  const prods = useCountUp(Math.floor(products / 1000));
  const sls = useCountUp(Math.floor(sales / 1000000));
  const feat = useCountUp(featured);

  const cards = [
    {
      label: "Total Categories",
      value: tot,
      suffix: "",
      prefix: "",
      sub: "All categories",
      bar: 100,
      trend: `${total} categories`,
      trendUp: true,
      delay: "60ms",
    },
    {
      label: "Total Products",
      value: prods,
      suffix: "k",
      prefix: "",
      sub: "Across all categories",
      bar: 78,
      trend: `+${products} products`,
      trendUp: true,
      delay: "120ms",
    },
    {
      label: "Total Sales",
      value: sls,
      suffix: "M",
      prefix: <span className="naira">₦</span>,
      sub: "Category revenue",
      bar: 92,
      trend: "+12.5%",
      trendUp: true,
      delay: "180ms",
    },
    {
      label: "Featured",
      value: feat,
      suffix: "",
      prefix: "",
      sub: "Featured categories",
      bar: Math.round((featured / total) * 100),
      trend: `${featured} featured`,
      trendUp: true,
      delay: "240ms",
    },
  ];

  return (
    <div className="stats-bar">
      {cards.map((c, i) => (
        <div
          key={i}
          className="stat-tile fade-up"
          style={{ animationDelay: c.delay }}
        >
          <div className="stat-top-row">
            <div className="stat-number-row">
              <span className="stat-prefix">{c.prefix}</span>
              <span className="stat-val">{c.value.toLocaleString()}</span>
              <span className="stat-suffix">{c.suffix}</span>
            </div>
            <span
              className={`stat-trend ${c.trendUp ? "trend-up" : "trend-down"}`}
            >
              {c.trendUp ? (
                <ArrowUp size={10} weight="bold" />
              ) : (
                <ArrowDown size={10} weight="bold" />
              )}
              {c.trend}
            </span>
          </div>
          <div className="stat-label">{c.label}</div>
          <div className="stat-sub">{c.sub}</div>
          <div className="stat-bar-track">
            <div
              className="stat-bar-fill"
              style={{ "--bar-w": `${Math.max(c.bar, 2)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Category Card
───────────────────────────────────────── */
function CategoryCard({ category, onView, onEdit, onDeleteConfirm, index }) {
  const getCategoryColor = (name) => {
    const colors = {
      Sneakers: "#a855f7",
      Hoodies: "#3b82f6",
      Jackets: "#f97316",
      "T-Shirts": "#22c55e",
      Accessories: "#ec4899",
      Shorts: "#06b6d4",
    };
    return colors[name] || "#6b7280";
  };

  const color = getCategoryColor(category.name);

  return (
    <div
      className="category-card fade-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="category-image-wrap">
        <img
          src={category.image}
          alt={category.name}
          className="category-image"
        />
        <div className="category-overlay">
          <button className="overlay-btn" onClick={() => onView(category)}>
            <Eye size={14} weight="bold" />
          </button>
          <button className="overlay-btn" onClick={() => onEdit(category)}>
            <PencilSimple size={14} weight="bold" />
          </button>
        </div>
        {category.featured && (
          <div className="category-featured-badge">
            <Star size={10} weight="fill" /> Featured
          </div>
        )}
      </div>
      <div className="category-content">
        <div className="category-header">
          <h3 className="category-name">{category.name}</h3>
          <span
            className="category-status"
            style={{
              color: category.status === "active" ? "#22c55e" : "#ef4444",
              background:
                category.status === "active"
                  ? "rgba(34,197,94,0.1)"
                  : "rgba(239,68,68,0.1)",
            }}
          >
            {category.status}
          </span>
        </div>
        <p className="category-desc">{category.description}</p>
        <div className="category-stats">
          <div className="cat-stat">
            <ShoppingBag size={12} weight="fill" />
            <span>{category.productCount} products</span>
          </div>
          <div className="cat-stat">
            <CurrencyNgn size={12} weight="fill" />
            <span>₦{(category.averagePrice / 1000).toFixed(0)}k avg</span>
          </div>
        </div>
        <div className="category-sales">
          <span className="sales-label">Total Sales</span>
          <span className="sales-value">
            <span className="naira">₦</span>
            {(category.totalSales / 1000000).toFixed(1)}M
          </span>
        </div>
        <div className="category-actions">
          <button
            className="cat-btn cat-btn-view"
            onClick={() => onView(category)}
          >
            <Eye size={12} weight="bold" /> View
          </button>
          <button
            className="cat-btn cat-btn-edit"
            onClick={() => onEdit(category)}
          >
            <PencilSimple size={12} weight="bold" /> Edit
          </button>
          <button
            className="cat-btn cat-btn-del"
            onClick={() => onDeleteConfirm(category)}
          >
            <Trash size={12} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Delete Modal
───────────────────────────────────────── */
function DeleteModal({ category, onClose, onConfirm }) {
  if (!category) return null;
  return (
    <div className="overlay" onClick={onClose}>
      <div className="mbox mbox-sm" onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: "28px 24px", textAlign: "center" }}>
          <div className="conf-icon">
            <Warning size={22} color="#ef4444" weight="fill" />
          </div>
          <div className="conf-title">Delete this category?</div>
          <div className="conf-sub">
            This will permanently remove <strong>{category.name}</strong> and
            all associated data. This cannot be undone.
          </div>
          <div className="del-card">
            <div className="del-img">
              <img src={category.image} alt={category.name} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>
                {category.name}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                {category.productCount} products
              </div>
            </div>
          </div>
          <div className="conf-btns">
            <button className="mbtn mbtn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button
              className="mbtn mbtn-del"
              onClick={() => onConfirm(category.id)}
            >
              <Trash size={14} weight="bold" /> Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteConfirmCategory, setDeleteConfirmCategory] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (type, title, sub) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, title, sub, removing: false }]);
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, removing: true } : t)),
      );
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, 3000);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCategories([
        {
          id: 1,
          name: "Sneakers",
          description: "All types of athletic and casual shoes",
          image: "/assets/categories/sneakers.jpeg",
          productCount: 245,
          totalSales: 15600000,
          averagePrice: 45000,
          status: "active",
          featured: true,
        },
        {
          id: 2,
          name: "Hoodies",
          description: "Warm and stylish hoodies for all seasons",
          image: "/assets/categories/hoodies.jpeg",
          productCount: 156,
          totalSales: 8200000,
          averagePrice: 28000,
          status: "active",
          featured: true,
        },
        {
          id: 3,
          name: "Jackets",
          description: "Jackets for every weather and occasion",
          image: "/assets/categories/jackets.jpeg",
          productCount: 189,
          totalSales: 9800000,
          averagePrice: 35000,
          status: "active",
          featured: true,
        },
        {
          id: 4,
          name: "T-Shirts",
          description: "Plain and printed t-shirts",
          image: "/assets/categories/plainTee.jpg",
          productCount: 312,
          totalSales: 5600000,
          averagePrice: 12000,
          status: "active",
          featured: false,
        },
        {
          id: 5,
          name: "Accessories",
          description: "Hats, bags, belts and more",
          image: "/assets/products/snapback.jpeg",
          productCount: 89,
          totalSales: 2300000,
          averagePrice: 15000,
          status: "active",
          featured: false,
        },
        {
          id: 6,
          name: "Shorts",
          description: "Casual and sports shorts",
          image: "/assets/products/camoshorts.jpeg",
          productCount: 78,
          totalSales: 1800000,
          averagePrice: 18000,
          status: "active",
          featured: false,
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const deleteCategory = (categoryId) => {
    setCategories(categories.filter((c) => c.id !== categoryId));
    setDeleteConfirmCategory(null);
    setSelectedCategory(null);
    addToast("success", "Category Deleted", "The category has been removed");
  };

  const toggleFeatured = (categoryId) => {
    setCategories(
      categories.map((c) =>
        c.id === categoryId ? { ...c, featured: !c.featured } : c,
      ),
    );
    addToast("success", "Category Updated", "Featured status changed");
  };

  const totalCategories = categories.length;
  const totalProducts = categories.reduce((sum, c) => sum + c.productCount, 0);
  const totalCategorySales = categories.reduce(
    (sum, c) => sum + c.totalSales,
    0,
  );
  const featuredCategories = categories.filter((c) => c.featured).length;

  return (
    <div className="categories-page">
      <Toast toasts={toasts} />

      {/* Hero Card */}
      <HeroCard onAddCategory={() => setShowAddModal(true)} />

      {/* Stat Cards */}
      <StatCards
        total={totalCategories}
        products={totalProducts}
        sales={totalCategorySales}
        featured={featuredCategories}
      />

      {/* Filter Bar */}
      <div className="filter-bar fade-up" style={{ animationDelay: "300ms" }}>
        <div className="search-wrap">
          <MagnifyingGlass size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <button className="filter-btn">
          <Funnel size={16} weight="bold" />
          Filters
          <CaretDown size={12} weight="bold" />
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading categories...</p>
        </div>
      ) : (
        /* Categories Grid */
        <div className="categories-grid">
          {filteredCategories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
              onView={(c) => setSelectedCategory(c)}
              onEdit={(c) => setSelectedCategory(c)}
              onDeleteConfirm={(c) => setDeleteConfirmCategory(c)}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredCategories.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            <Tag size={48} weight="duotone" />
          </div>
          <h3 className="empty-title">No categories found</h3>
          <p className="empty-sub">
            {searchQuery
              ? "Try adjusting your search terms"
              : "Get started by adding your first category"}
          </p>
          <button
            className="hero-btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={15} weight="bold" /> Add Category
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmCategory && (
        <DeleteModal
          category={deleteConfirmCategory}
          onClose={() => setDeleteConfirmCategory(null)}
          onConfirm={deleteCategory}
        />
      )}

      {/* CSS Styles */}
      <style>{`
        .categories-page {
          padding: 24px;
          max-width: 1600px;
          margin: 0 auto;
        }

        /* Hero Card */
        .hero-card {
          position: relative;
          overflow: hidden;
          width: 100%;
          border-radius: 20px;
          background: #0f3318;
          margin-bottom: 22px;
          height: 280px;
          animation: fadeUp 0.45s ease-out forwards;
          display: flex;
          border: 1px solid rgba(34, 197, 94, 0.12);
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(34, 197, 94, 0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(34, 197, 94, 0.04) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }

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

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(34, 197, 94, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.25);
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          color: #22c55e;
          margin-bottom: 16px;
        }

        .hero-title {
          font-size: 32px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 12px 0;
          line-height: 1.2;
        }

        .hero-sub {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.55);
          margin: 0 0 24px 0;
          max-width: 480px;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          gap: 12px;
        }

        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #22c55e;
          border: none;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          color: #000;
          cursor: pointer;
          transition: all 0.2s;
        }

        .hero-btn-primary:hover {
          background: #16a34a;
          transform: translateY(-2px);
        }

        .hero-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          transition: all 0.2s;
        }

        .hero-btn-ghost:hover {
          border-color: rgba(34, 197, 94, 0.5);
          color: #22c55e;
        }

        .hero-right {
          position: relative;
          width: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, transparent 60%);
          overflow: hidden;
        }

        .hero-right::after {
          content: '';
          position: absolute;
          bottom: 10px;
          left: 10%;
          right: 10%;
          height: 40px;
          background: radial-gradient(ellipse 80% 100% at 50% 100%, rgba(34, 197, 94, 0.3) 0%, transparent 70%);
          pointer-events: none;
          filter: blur(8px);
        }

        .hero-img {
          width: 90%;
          height: 90%;
          object-fit: contain;
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 8px 32px rgba(34, 197, 94, 0.25));
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .hero-right:hover .hero-img {
          transform: translateY(-12px) scale(1.05);
          filter: drop-shadow(0 20px 50px rgba(34, 197, 94, 0.45));
        }

        /* Stats Bar */
        .stats-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 22px;
        }

        .stat-tile {
          background: linear-gradient(160deg, #161d16 0%, #0f140f 70%, #0d120d 100%);
          border: 1px solid rgba(34, 197, 94, 0.18);
          border-radius: 16px;
          padding: 18px 20px 16px;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          box-shadow: 0 6px 28px rgba(0, 0, 0, 0.5);
          transition: box-shadow 0.3s, border-color 0.3s, transform 0.3s cubic-bezier(0.34, 1.4, 0.64, 1);
        }

        .stat-tile::after {
          content: '';
          position: absolute;
          bottom: -20px;
          right: -20px;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .stat-tile:hover {
          transform: translateY(-4px) scale(1.015);
          border-color: rgba(34, 197, 94, 0.35);
          box-shadow: 0 0 40px rgba(34, 197, 94, 0.1), 0 14px 40px rgba(0, 0, 0, 0.6);
        }

        .stat-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .stat-number-row {
          display: flex;
          align-items: baseline;
          gap: 2px;
        }

        .stat-prefix {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
        }

        .stat-val {
          font-size: 26px;
          font-weight: 700;
          color: #fff;
        }

        .stat-suffix {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          margin-left: 2px;
        }

        .stat-trend {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 6px;
        }

        .stat-trend.trend-up {
          color: #22c55e;
          background: rgba(34, 197, 94, 0.12);
        }

        .stat-trend.trend-down {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.12);
        }

        .stat-label {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 4px;
        }

        .stat-sub {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 12px;
        }

        .stat-bar-track {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 2px;
          overflow: hidden;
        }

        .stat-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #22c55e, #16a34a);
          border-radius: 2px;
          width: var(--bar-w);
          transition: width 0.6s ease-out;
        }

        /* Filter Bar */
        .filter-bar {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
        }

        .search-wrap {
          flex: 1;
          position: relative;
          max-width: 400px;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.4);
        }

        .search-input {
          width: 100%;
          padding: 12px 16px 12px 42px;
          background: #161d16;
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 10px;
          color: #fff;
          font-size: 13px;
          outline: none;
          transition: border-color 0.2s;
        }

        .search-input:focus {
          border-color: rgba(34, 197, 94, 0.5);
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: #161d16;
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn:hover {
          border-color: rgba(34, 197, 94, 0.5);
          color: #22c55e;
        }

        /* Categories Grid */
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 16px;
        }

        /* Category Card */
        .category-card {
          background: linear-gradient(160deg, #161d16 0%, #0f140f 70%, #0d120d 100%);
          border: 1px solid rgba(34, 197, 94, 0.18);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 6px 28px rgba(0, 0, 0, 0.5);
          transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
        }

        .category-card:hover {
          transform: translateY(-4px);
          border-color: rgba(34, 197, 94, 0.35);
          box-shadow: 0 0 40px rgba(34, 197, 94, 0.1), 0 14px 40px rgba(0, 0, 0, 0.6);
        }

        .category-image-wrap {
          position: relative;
          height: 180px;
          overflow: hidden;
        }

        .category-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s;
        }

        .category-card:hover .category-image {
          transform: scale(1.05);
        }

        .category-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .category-card:hover .category-overlay {
          opacity: 1;
        }

        .overlay-btn {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .overlay-btn:hover {
          background: #22c55e;
          border-color: #22c55e;
          color: #000;
        }

        .category-featured-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 10px;
          background: rgba(245, 158, 11, 0.9);
          border-radius: 6px;
          font-size: 10px;
          font-weight: 700;
          color: #000;
        }

        .category-content {
          padding: 16px;
        }

        .category-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .category-name {
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          margin: 0;
        }

        .category-status {
          font-size: 10px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .category-desc {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          margin: 0 0 12px 0;
          line-height: 1.5;
        }

        .category-stats {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
        }

        .cat-stat {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
        }

        .category-sales {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          margin-bottom: 12px;
        }

        .sales-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
        }

        .sales-value {
          font-size: 14px;
          font-weight: 700;
          color: #22c55e;
        }

        .category-actions {
          display: flex;
          gap: 8px;
        }

        .cat-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cat-btn-view {
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.25);
          color: #3b82f6;
        }

        .cat-btn-view:hover {
          background: #3b82f6;
          color: #fff;
        }

        .cat-btn-edit {
          background: rgba(168, 85, 247, 0.1);
          border: 1px solid rgba(168, 85, 247, 0.25);
          color: #a855f7;
        }

        .cat-btn-edit:hover {
          background: #a855f7;
          color: #fff;
        }

        .cat-btn-del {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.25);
          color: #ef4444;
          flex: 0.5;
        }

        .cat-btn-del:hover {
          background: #ef4444;
          color: #fff;
        }

        /* Loading */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 0;
        }

        .loading-spinner {
          width: 48px;
          height: 48px;
          border: 3px solid rgba(34, 197, 94, 0.2);
          border-top-color: #22c55e;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .loading-text {
          color: rgba(255, 255, 255, 0.5);
          font-size: 14px;
          margin-top: 16px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-up {
          opacity: 0;
          animation: fadeUp 0.45s ease-out forwards;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 80px 20px;
        }

        .empty-icon {
          width: 100px;
          height: 100px;
          margin: 0 auto 24px;
          background: rgba(34, 197, 94, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(34, 197, 94, 0.5);
        }

        .empty-title {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 8px 0;
        }

        .empty-sub {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          margin: 0 0 24px 0;
        }

        /* Delete Modal */
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease-out;
        }

        .mbox {
          background: #161d16;
          border: 1px solid rgba(34, 197, 94, 0.25);
          border-radius: 16px;
          width: 100%;
          max-width: 420px;
          animation: scaleIn 0.3s ease-out;
        }

        .mbox-sm {
          max-width: 360px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        .conf-icon {
          width: 56px;
          height: 56px;
          margin: 0 auto 16px;
          background: rgba(239, 68, 68, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .conf-title {
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 8px;
        }

        .conf-sub {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 20px;
          line-height: 1.5;
        }

        .del-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .del-img {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          overflow: hidden;
        }

        .del-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .conf-btns {
          display: flex;
          gap: 12px;
        }

        .mbtn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .mbtn-ghost {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.7);
        }

        .mbtn-ghost:hover {
          border-color: rgba(255, 255, 255, 0.3);
          color: #fff;
        }

        .mbtn-del {
          background: #ef4444;
          border: none;
          color: #fff;
        }

        .mbtn-del:hover {
          background: #dc2626;
        }

        /* Toast */
        .toast-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .toast {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          background: #161d16;
          border: 1px solid rgba(34, 197, 94, 0.25);
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          min-width: 280px;
        }

        .toast-in {
          animation: slideIn 0.3s ease-out forwards;
        }

        .toast-out {
          animation: slideOut 0.3s ease-out forwards;
        }

        .toast-title {
          font-size: 13px;
          font-weight: 600;
          color: #fff;
        }

        .toast-sub {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(100px);
          }
        }

        /* Naira */
        .naira {
          font-family: system-ui, -apple-system, sans-serif;
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .stats-bar {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero-card {
            height: auto;
            flex-direction: column;
          }

          .hero-right {
            width: 100%;
            height: 160px;
          }

          .hero-title {
            font-size: 24px;
          }

          .stats-bar {
            grid-template-columns: 1fr;
          }

          .filter-bar {
            flex-direction: column;
          }

          .search-wrap {
            max-width: 100%;
          }

          .categories-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
