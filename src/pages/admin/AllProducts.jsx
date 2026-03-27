import { useState, useEffect, useRef, useCallback } from "react";
import {
  MagnifyingGlass,
  CaretDown,
  Plus,
  Storefront,
  Package,
  Eye,
  PencilSimple,
  Trash,
  Star,
  X,
  Warning,
  ChartLineUp,
  CurrencyNgn,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Clock,
} from "@phosphor-icons/react";

/* ─────────────────────────────────────────
   Toast
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
   Animated counter
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
    const timer = setInterval(() => {
      step++;
      current += inc;
      setCount(step >= steps ? target : Math.round(current));
      if (step >= steps) clearInterval(timer);
    }, Math.max(16, Math.floor(duration / steps)));
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

/* ─────────────────────────────────────────
   Hero — Products
───────────────────────────────────────── */
function HeroCard({ onAddProduct }) {
  return (
    <div className="hero-card">
      <div className="hero-grid-bg" />
      <div className="hero-left">
        <div className="hero-badge">
          <Package size={11} weight="fill" /> Product Management
        </div>
        <h1 className="hero-title">Manage Your Product Inventory</h1>
        <p className="hero-sub">
          Track all products, monitor stock levels, and manage your entire
          inventory from one centralized dashboard. Keep your catalog up to
          date and optimized for sales.
        </p>
        <div className="hero-actions">
          <button className="hero-btn-primary" onClick={onAddProduct}>
            <Plus size={15} weight="bold" /> Add New Product
          </button>
          <button className="hero-btn-ghost" onClick={onAddProduct}>
            Import Products
          </button>
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-icon-box">
          <Storefront size={48} weight="duotone" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Stat cards
───────────────────────────────────────── */
function StatCards({ total, active, outOfStock, lowStock, totalValue }) {
  const totalCount = useCountUp(total);
  const activeCount = useCountUp(active);
  const outCount = useCountUp(outOfStock);
  const lowCount = useCountUp(lowStock);
  const valCount = useCountUp(Math.round(totalValue / 1000000));
  const totalP = total || 1;

  const cards = [
    {
      label: "Total Products",
      value: totalCount,
      suffix: "",
      prefix: "",
      sub: "In catalog",
      bar: 100,
      trend: `${total} products`,
      delay: "60ms",
    },
    {
      label: "Active Products",
      value: activeCount,
      suffix: "",
      prefix: "",
      sub: "Currently listed",
      bar: Math.round((active / totalP) * 100),
      trend: `${active} active`,
      delay: "120ms",
    },
    {
      label: "Out of Stock",
      value: outCount,
      suffix: "",
      prefix: "",
      sub: "Unavailable",
      bar: Math.round((outOfStock / totalP) * 100),
      trend: `${outOfStock} out`,
      delay: "180ms",
    },
    {
      label: "Low Stock",
      value: lowCount,
      suffix: "",
      prefix: "",
      sub: "Running low",
      bar: Math.round((lowStock / totalP) * 100),
      trend: `${lowStock} low`,
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
            <span className="stat-trend">{c.trend}</span>
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
   Status Badge
───────────────────────────────────────── */
const STATUS_CFG = {
  active: {
    color: "#22c55e",
    bg: "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.25)",
    label: "Active",
  },
  inactive: {
    color: "#94a3b8",
    bg: "rgba(148,163,184,0.1)",
    border: "rgba(148,163,184,0.25)",
    label: "Inactive",
  },
  out_of_stock: {
    color: "#ef4444",
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.25)",
    label: "Out of Stock",
  },
  draft: {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.25)",
    label: "Draft",
  },
};

function StatusBadge({ status }) {
  const c = STATUS_CFG[status] || STATUS_CFG.draft;
  return (
    <span
      className="sbadge"
      style={{
        color: c.color,
        background: c.bg,
        border: `1px solid ${c.border}`,
      }}
    >
      {c.label}
    </span>
  );
}

/* ─────────────────────────────────────────
   Stock Badge
───────────────────────────────────────── */
function StockBadge({ stock }) {
  if (stock === 0) {
    return (
      <span className="stock-badge stock-out">
        <Warning size={10} weight="fill" /> Out of Stock
      </span>
    );
  }
  if (stock < 20) {
    return (
      <span className="stock-badge stock-low">
        <Clock size={10} weight="fill" /> Low Stock
      </span>
    );
  }
  return (
    <span className="stock-badge stock-ok">
      <Package size={10} weight="fill" /> In Stock
    </span>
  );
}

/* ─────────────────────────────────────────
   Product Card
───────────────────────────────────────── */
function ProductCard({ product, onView, onEdit, onDelete, index }) {
  return (
    <div className="product-card fade-up" style={{ animationDelay: `${index * 55}ms` }}>
      <div className="product-image-wrap">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.src = "/Bg.PNG";
          }}
        />
        <div className="product-image-overlay">
          <button className="product-overlay-btn" onClick={() => onView(product)}>
            <Eye size={14} weight="bold" />
          </button>
          <button className="product-overlay-btn" onClick={() => onEdit(product)}>
            <PencilSimple size={14} weight="bold" />
          </button>
        </div>
        <StockBadge stock={product.stock} />
      </div>
      <div className="product-body">
        <div className="product-category-row">
          <span className="product-category">{product.category}</span>
          <StatusBadge status={product.status} />
        </div>
        <div className="product-name">{product.name}</div>
        <div className="product-vendor">
          <Storefront size={11} weight="fill" />
          {product.vendor}
        </div>
        <div className="product-price-row">
          <div className="product-price">
            <span className="naira">₦</span>
            {product.price.toLocaleString()}
          </div>
          {product.originalPrice > product.price && (
            <div className="product-original-price">
              <span className="naira">₦</span>
              {product.originalPrice.toLocaleString()}
            </div>
          )}
        </div>
        <div className="product-stats-row">
          <div className="product-stat">
            <span className="product-stat-label">Stock</span>
            <span className="product-stat-value">{product.stock}</span>
          </div>
          <div className="product-stat">
            <span className="product-stat-label">Sold</span>
            <span className="product-stat-value">{product.sold}</span>
          </div>
          <div className="product-stat">
            <span className="product-stat-label">Rating</span>
            <span className="product-stat-value rating">
              <Star size={10} weight="fill" color="#eab308" />
              {product.rating}
            </span>
          </div>
        </div>
        <div className="product-actions">
          <button className="product-action-btn product-view" onClick={() => onView(product)}>
            <Eye size={13} weight="bold" /> View
          </button>
          <button className="product-action-btn product-edit" onClick={() => onEdit(product)}>
            <PencilSimple size={13} weight="bold" /> Edit
          </button>
          <button className="product-action-btn product-delete" onClick={() => onDelete(product)}>
            <Trash size={13} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Filter Bar
───────────────────────────────────────── */
function FilterBar({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  categories,
  resultCount,
  totalCount,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-row">
        <div className="filter-search">
          <MagnifyingGlass size={16} weight="bold" className="filter-search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="filter-search-input"
          />
        </div>
        <div className="filter-group">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <CaretDown size={14} weight="bold" className="filter-select-icon" />
        </div>
        <div className="filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="out_of_stock">Out of Stock</option>
            <option value="inactive">Inactive</option>
          </select>
          <CaretDown size={14} weight="bold" className="filter-select-icon" />
        </div>
        <div className="filter-group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price_high">Price: High to Low</option>
            <option value="price_low">Price: Low to High</option>
            <option value="best_selling">Best Selling</option>
            <option value="stock_low">Low Stock</option>
          </select>
          <CaretDown size={14} weight="bold" className="filter-select-icon" />
        </div>
      </div>
      <div className="filter-results">
        Showing <span className="filter-results-count">{resultCount}</span> of{" "}
        <span className="filter-results-total">{totalCount}</span> products
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Delete Modal
───────────────────────────────────────── */
function DeleteModal({ product, onClose, onConfirm }) {
  if (!product) return null;
  return (
    <div className="overlay" onClick={onClose}>
      <div className="mbox mbox-danger" onClick={(e) => e.stopPropagation()}>
        <div className="mheader">
          <div className="mheader-icon mheader-icon-danger">
            <Warning size={20} weight="fill" />
          </div>
          <div>
            <div className="moid">Delete Product?</div>
            <div className="mosub">This action cannot be undone</div>
          </div>
          <button className="mclose" onClick={onClose}>
            <X size={14} weight="bold" />
          </button>
        </div>
        <div className="mbody">
          <p className="delete-message">
            Are you sure you want to delete <strong>{product.name}</strong>? This
            will permanently remove it from your inventory.
          </p>
          <div className="mdelete-actions">
            <button className="mbtn mbtn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="mbtn mbtn-danger" onClick={() => onConfirm(product.id)}>
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Product Detail Modal
───────────────────────────────────────── */
function ProductModal({ product, onClose, onEdit }) {
  if (!product) return null;
  return (
    <div className="overlay" onClick={onClose}>
      <div className="mbox" onClick={(e) => e.stopPropagation()}>
        <div className="mheader">
          <div>
            <div className="moid">{product.name}</div>
            <div className="mosub">
              <Storefront size={12} weight="fill" /> {product.vendor}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <StatusBadge status={product.status} />
            <button className="mclose" onClick={onClose}>
              <X size={14} weight="bold" />
            </button>
          </div>
        </div>
        <div className="mbody">
          <div className="mproduct-banner">
            <img
              src={product.images[0]}
              alt={product.name}
              className="mproduct-image"
              onError={(e) => {
                e.target.src = "/Bg.PNG";
              }}
            />
          </div>
          <div className="mproduct-details">
            <div className="mproduct-row">
              <span className="mproduct-label">Category</span>
              <span className="mproduct-value">{product.category}</span>
            </div>
            <div className="mproduct-row">
              <span className="mproduct-label">Description</span>
              <span className="mproduct-value">{product.description}</span>
            </div>
          </div>
          <div className="mproduct-stats-grid">
            <div className="mproduct-stat-box">
              <div className="mproduct-stat-label">Price</div>
              <div className="mproduct-stat-value">
                <span className="naira">₦</span>
                {product.price.toLocaleString()}
              </div>
            </div>
            <div className="mproduct-stat-box">
              <div className="mproduct-stat-label">Original Price</div>
              <div className="mproduct-stat-value orig">
                <span className="naira">₦</span>
                {product.originalPrice.toLocaleString()}
              </div>
            </div>
            <div className="mproduct-stat-box">
              <div className="mproduct-stat-label">Stock</div>
              <div className="mproduct-stat-value">{product.stock}</div>
            </div>
            <div className="mproduct-stat-box">
              <div className="mproduct-stat-label">Sold</div>
              <div className="mproduct-stat-value">{product.sold}</div>
            </div>
            <div className="mproduct-stat-box">
              <div className="mproduct-stat-label">Rating</div>
              <div className="mproduct-stat-value">
                <Star size={12} weight="fill" color="#eab308" />
                {product.rating} ({product.reviews})
              </div>
            </div>
            <div className="mproduct-stat-box">
              <div className="mproduct-stat-label">Created</div>
              <div className="mproduct-stat-value">{product.createdAt}</div>
            </div>
          </div>
          <div className="mactions">
            <button className="mbtn mbtn-secondary" onClick={onClose}>
              Close
            </button>
            <button className="mbtn mbtn-primary" onClick={() => onEdit(product)}>
              <PencilSimple size={14} weight="bold" /> Edit Product
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
export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState(null);
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((type, title, sub) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, title, sub, removing: false }]);
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, removing: true } : t))
      );
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, 3000);
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: "Nike Air Max 270",
          category: "Sneakers",
          price: 45000,
          originalPrice: 55000,
          stock: 45,
          sold: 234,
          rating: 4.8,
          reviews: 156,
          status: "active",
          vendor: "Kicks Store",
          images: ["/assets/products/camoshorts.jpeg"],
          description: "Premium comfort sneaker with Air Max cushioning",
          createdAt: "2024-01-15",
        },
        {
          id: 2,
          name: "Adidas Ultraboost 22",
          category: "Sneakers",
          price: 52000,
          originalPrice: 65000,
          stock: 32,
          sold: 189,
          rating: 4.7,
          reviews: 98,
          status: "active",
          vendor: "Sports Hub NG",
          images: ["/assets/products/cargopants.jpeg"],
          description: "High-performance running shoes with Boost technology",
          createdAt: "2024-01-12",
        },
        {
          id: 3,
          name: "Puma RS-X3",
          category: "Sneakers",
          price: 38000,
          originalPrice: 45000,
          stock: 67,
          sold: 145,
          rating: 4.5,
          reviews: 72,
          status: "active",
          vendor: "Street Wear Co",
          images: ["/assets/products/driptee.jpeg"],
          description: "Bold design with running system technology",
          createdAt: "2024-01-10",
        },
        {
          id: 4,
          name: "Vans Old Skool",
          category: "Sneakers",
          price: 28000,
          originalPrice: 35000,
          stock: 89,
          sold: 312,
          rating: 4.9,
          reviews: 234,
          status: "active",
          vendor: "Vans Nigeria",
          images: ["/assets/products/hoodHoodie.jpeg"],
          description: "Classic skate shoe with iconic side stripe",
          createdAt: "2024-01-08",
        },
        {
          id: 5,
          name: "New Balance 574",
          category: "Sneakers",
          price: 42000,
          originalPrice: 50000,
          stock: 23,
          sold: 98,
          rating: 4.6,
          reviews: 67,
          status: "active",
          vendor: "Kicks Store",
          images: ["/assets/products/printshirt.jpeg"],
          description: "Iconic lifestyle sneaker with ENCAP midsole",
          createdAt: "2024-01-05",
        },
        {
          id: 6,
          name: "Nike Hoodie Tech Fleece",
          category: "Hoodies",
          price: 35000,
          originalPrice: 42000,
          stock: 56,
          sold: 178,
          rating: 4.7,
          reviews: 89,
          status: "active",
          vendor: "Fashion Hub NG",
          images: ["/assets/products/sweatshirt.jpeg"],
          description: "Lightweight hoodie with thermal fleece",
          createdAt: "2024-01-03",
        },
        {
          id: 7,
          name: "Adidas Track Jacket",
          category: "Jackets",
          price: 28000,
          originalPrice: 35000,
          stock: 34,
          sold: 89,
          rating: 4.4,
          reviews: 45,
          status: "active",
          vendor: "Sports Hub NG",
          images: ["/assets/products/varsityjacket.jpeg"],
          description: "Classic track jacket with full zip",
          createdAt: "2024-01-01",
        },
        {
          id: 8,
          name: "Puma Basic Tee",
          category: "T-Shirts",
          price: 12000,
          originalPrice: 15000,
          stock: 156,
          sold: 423,
          rating: 4.3,
          reviews: 189,
          status: "active",
          vendor: "Street Wear Co",
          images: ["/assets/products/snapback.jpeg"],
          description: "Cotton basic tee with Puma branding",
          createdAt: "2023-12-28",
        },
        {
          id: 9,
          name: "Nike Air Jordan 1",
          category: "Sneakers",
          price: 85000,
          originalPrice: 120000,
          stock: 12,
          sold: 67,
          rating: 4.9,
          reviews: 234,
          status: "active",
          vendor: "Kicks Store",
          images: ["/assets/products/camoshorts.jpeg"],
          description: "Iconic basketball sneaker with premium leather",
          createdAt: "2023-12-25",
        },
        {
          id: 10,
          name: "Hoodie Premium Cotton",
          category: "Hoodies",
          price: 25000,
          originalPrice: 30000,
          stock: 0,
          sold: 234,
          rating: 4.5,
          reviews: 112,
          status: "out_of_stock",
          vendor: "Fashion Hub NG",
          images: ["/assets/products/hoodHoodie.jpeg"],
          description: "100% cotton premium hoodie",
          createdAt: "2023-12-20",
        },
        {
          id: 11,
          name: "Denim Jacket Classic",
          category: "Jackets",
          price: 32000,
          originalPrice: 40000,
          stock: 28,
          sold: 56,
          rating: 4.2,
          reviews: 34,
          status: "active",
          vendor: "Street Wear Co",
          images: ["/assets/products/varsityjacket.jpeg"],
          description: "Classic denim jacket for all seasons",
          createdAt: "2023-12-18",
        },
        {
          id: 12,
          name: "Converse Chuck Taylor",
          category: "Sneakers",
          price: 25000,
          originalPrice: 30000,
          stock: 78,
          sold: 456,
          rating: 4.8,
          reviews: 312,
          status: "active",
          vendor: "Converse Nigeria",
          images: ["/assets/products/cargopants.jpeg"],
          description: "Iconic all-star canvas sneaker",
          createdAt: "2023-12-15",
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "price_high":
        return b.price - a.price;
      case "price_low":
        return a.price - b.price;
      case "best_selling":
        return b.sold - a.sold;
      case "stock_low":
        return a.stock - b.stock;
      default:
        return 0;
    }
  });

  const deleteProduct = (productId) => {
    setProducts(products.filter((p) => p.id !== productId));
    setDeleteConfirmProduct(null);
    setSelectedProduct(null);
    showToast("success", "Product Deleted", "The product has been removed from your inventory");
  };

  const categories = [...new Set(products.map((p) => p.category))];
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status === "active").length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock < 20).length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  const handleAddProduct = () => {
    showToast("success", "Add Product", "Product creation modal would open here");
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    showToast("success", "Edit Mode", `Editing ${product.name}`);
  };

  return (
    <div className="page-root">
      <Toast toasts={toasts} />

      <HeroCard onAddProduct={handleAddProduct} />

      <StatCards
        total={totalProducts}
        active={activeProducts}
        outOfStock={outOfStock}
        lowStock={lowStock}
        totalValue={totalValue}
      />

      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
        resultCount={sortedProducts.length}
        totalCount={products.length}
      />

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner" />
          <p>Loading products...</p>
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <Package size={40} weight="duotone" />
          </div>
          <p className="empty-title">No products found</p>
          <p className="empty-sub">Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div className="products-grid">
          {sortedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onView={setSelectedProduct}
              onEdit={handleEditProduct}
              onDelete={setDeleteConfirmProduct}
            />
          ))}
        </div>
      )}

      <DeleteModal
        product={deleteConfirmProduct}
        onClose={() => setDeleteConfirmProduct(null)}
        onConfirm={deleteProduct}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onEdit={handleEditProduct}
      />

      <style>{`
        /* ═══════════════════════════════
           Page Root & CSS Variables
        ═══════════════════════════════ */
        .page-root {
          --green: #22c55e;
          --green-dark: #16a34a;
          --green-bg: rgba(34,197,94,0.1);
          --green-border: rgba(34,197,94,0.25);
          --bg-dark: #0a0a0a;
          --bg-card: #141414;
          --bg-card-hover: #1a1a1a;
          --text-primary: #fff;
          --text-secondary: rgba(255,255,255,0.7);
          --text-muted: rgba(255,255,255,0.5);
          --border-color: rgba(255,255,255,0.08);
        }

        /* ═══════════════════════════════
           Hero Card
        ═══════════════════════════════ */
        .hero-card {
          background: linear-gradient(135deg, #0f3318 0%, #0a1f10 100%);
          border-radius: 16px;
          padding: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          overflow: hidden;
          margin-bottom: 24px;
          border: 1px solid rgba(34,197,94,0.15);
        }

        .hero-grid-bg {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(34,197,94,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,197,94,0.05) 1px, transparent 1px);
          background-size: 24px 24px;
          pointer-events: none;
        }

        .hero-left {
          position: relative;
          z-index: 1;
          max-width: 60%;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(34,197,94,0.15);
          border: 1px solid rgba(34,197,94,0.3);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          color: #22c55e;
          margin-bottom: 16px;
        }

        .hero-title {
          font-size: 28px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 12px;
          line-height: 1.2;
        }

        .hero-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.65);
          line-height: 1.6;
          margin-bottom: 24px;
          max-width: 480px;
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
          color: #000;
          font-weight: 700;
          font-size: 13px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .hero-btn-primary:hover {
          background: #16a34a;
          transform: translateY(-1px);
        }

        .hero-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: rgba(255,255,255,0.08);
          color: #fff;
          font-weight: 600;
          font-size: 13px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .hero-btn-ghost:hover {
          background: rgba(255,255,255,0.12);
        }

        .hero-right {
          position: relative;
          z-index: 1;
        }

        .hero-icon-box {
          width: 120px;
          height: 120px;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #22c55e;
        }

        /* ═══════════════════════════════
           Stats Bar
        ═══════════════════════════════ */
        .stats-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .stat-tile {
          background: #141414;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 20px;
        }

        .stat-top-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }

        .stat-number-row {
          display: flex;
          align-items: baseline;
        }

        .stat-prefix {
          font-size: 16px;
          font-weight: 600;
          color: #22c55e;
          margin-right: 2px;
        }

        .stat-val {
          font-size: 28px;
          font-weight: 800;
          color: #fff;
          line-height: 1;
        }

        .stat-suffix {
          font-size: 14px;
          font-weight: 600;
          color: #22c55e;
          margin-left: 2px;
        }

        .stat-trend {
          font-size: 11px;
          font-weight: 600;
          color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.05);
          padding: 4px 8px;
          border-radius: 6px;
        }

        .stat-label {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
          margin-bottom: 4px;
        }

        .stat-sub {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          margin-bottom: 12px;
        }

        .stat-bar-track {
          height: 3px;
          background: rgba(255,255,255,0.08);
          border-radius: 2px;
          overflow: hidden;
        }

        .stat-bar-fill {
          height: 100%;
          width: var(--bar-w);
          background: linear-gradient(90deg, #22c55e, #16a34a);
          border-radius: 2px;
          transition: width 0.6s ease;
        }

        /* ═══════════════════════════════
           Filter Bar
        ═══════════════════════════════ */
        .filter-bar {
          background: #141414;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
        }

        .filter-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 12px;
          margin-bottom: 16px;
        }

        .filter-search {
          position: relative;
        }

        .filter-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.4);
        }

        .filter-search-input {
          width: 100%;
          padding: 12px 14px 12px 42px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: #fff;
          font-size: 13px;
          font-weight: 500;
          outline: none;
          transition: all 0.2s;
        }

        .filter-search-input::placeholder {
          color: rgba(255,255,255,0.4);
        }

        .filter-search-input:focus {
          border-color: #22c55e;
          background: rgba(34,197,94,0.05);
        }

        .filter-group {
          position: relative;
        }

        .filter-select {
          width: 100%;
          padding: 12px 36px 12px 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: #fff;
          font-size: 13px;
          font-weight: 500;
          outline: none;
          cursor: pointer;
          appearance: none;
          transition: all 0.2s;
        }

        .filter-select:focus {
          border-color: #22c55e;
          background: rgba(34,197,94,0.05);
        }

        .filter-select option {
          background: #141414;
          color: #fff;
        }

        .filter-select-icon {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.4);
          pointer-events: none;
        }

        .filter-results {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
        }

        .filter-results-count {
          color: #22c55e;
          font-weight: 700;
        }

        .filter-results-total {
          color: rgba(255,255,255,0.7);
          font-weight: 600;
        }

        /* ═══════════════════════════════
           Products Grid
        ═══════════════════════════════ */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .product-card {
          background: #141414;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          overflow: hidden;
          transition: all 0.25s;
        }

        .product-card:hover {
          border-color: rgba(34,197,94,0.3);
          transform: translateY(-2px);
        }

        .product-image-wrap {
          position: relative;
          height: 180px;
          background: #1a1a1a;
          overflow: hidden;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }

        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        .product-image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .product-card:hover .product-image-overlay {
          opacity: 1;
        }

        .product-overlay-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .product-overlay-btn:hover {
          background: #22c55e;
          border-color: #22c55e;
          color: #000;
        }

        .stock-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 700;
        }

        .stock-ok {
          background: rgba(34,197,94,0.15);
          color: #22c55e;
          border: 1px solid rgba(34,197,94,0.25);
        }

        .stock-low {
          background: rgba(245,158,11,0.15);
          color: #f59e0b;
          border: 1px solid rgba(245,158,11,0.25);
        }

        .stock-out {
          background: rgba(239,68,68,0.15);
          color: #ef4444;
          border: 1px solid rgba(239,68,68,0.25);
        }

        .product-body {
          padding: 16px;
        }

        .product-category-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .product-category {
          font-size: 10px;
          font-weight: 600;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .sbadge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 9px;
          font-weight: 700;
        }

        .product-name {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .product-vendor {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          color: rgba(255,255,255,0.5);
          margin-bottom: 12px;
        }

        .product-price-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 12px;
        }

        .product-price {
          font-size: 18px;
          font-weight: 800;
          color: #22c55e;
        }

        .product-original-price {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          text-decoration: line-through;
        }

        .product-stats-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 12px;
        }

        .product-stat {
          text-align: center;
        }

        .product-stat-label {
          display: block;
          font-size: 9px;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }

        .product-stat-value {
          font-size: 12px;
          font-weight: 700;
          color: #fff;
        }

        .product-stat-value.rating {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3px;
        }

        .product-actions {
          display: flex;
          gap: 8px;
        }

        .product-action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 10px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }

        .product-view {
          background: rgba(34,197,94,0.1);
          color: #22c55e;
          border: 1px solid rgba(34,197,94,0.2);
        }

        .product-view:hover {
          background: rgba(34,197,94,0.2);
        }

        .product-edit {
          background: rgba(59,130,246,0.1);
          color: #3b82f6;
          border: 1px solid rgba(59,130,246,0.2);
        }

        .product-edit:hover {
          background: rgba(59,130,246,0.2);
        }

        .product-delete {
          flex: 0 0 40px;
          background: rgba(239,68,68,0.1);
          color: #ef4444;
          border: 1px solid rgba(239,68,68,0.2);
        }

        .product-delete:hover {
          background: rgba(239,68,68,0.2);
        }

        /* ═══════════════════════════════
           Loading & Empty States
        ═══════════════════════════════ */
        .loading-state {
          text-align: center;
          padding: 60px 20px;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(34,197,94,0.15);
          border-top-color: #22c55e;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 16px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading-state p {
          color: rgba(255,255,255,0.5);
          font-size: 13px;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          background: #141414;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
        }

        .empty-icon {
          width: 80px;
          height: 80px;
          background: rgba(255,255,255,0.05);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: rgba(255,255,255,0.3);
        }

        .empty-title {
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 8px;
        }

        .empty-sub {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
        }

        /* ═══════════════════════════════
           Modals
        ═══════════════════════════════ */
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 20px;
        }

        .mbox {
          background: #141414;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          width: 100%;
          max-width: 480px;
          overflow: hidden;
          animation: modalIn 0.2s ease;
        }

        .mbox-danger {
          max-width: 400px;
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .mheader {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .mheader-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mheader-icon-danger {
          background: rgba(239,68,68,0.15);
          color: #ef4444;
        }

        .moid {
          font-size: 16px;
          font-weight: 700;
          color: #fff;
        }

        .mosub {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .mclose {
          margin-left: auto;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255,255,255,0.05);
          border: none;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .mclose:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }

        .mbody {
          padding: 20px;
        }

        .delete-message {
          font-size: 13px;
          color: rgba(255,255,255,0.7);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .delete-message strong {
          color: #fff;
        }

        .mdelete-actions {
          display: flex;
          gap: 12px;
        }

        .mbtn {
          flex: 1;
          padding: 12px 20px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }

        .mbtn-cancel {
          background: rgba(255,255,255,0.08);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.12);
        }

        .mbtn-cancel:hover {
          background: rgba(255,255,255,0.12);
        }

        .mbtn-danger {
          background: #ef4444;
          color: #fff;
        }

        .mbtn-danger:hover {
          background: #dc2626;
        }

        .mbtn-primary {
          background: #22c55e;
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .mbtn-primary:hover {
          background: #16a34a;
        }

        .mbtn-secondary {
          background: rgba(255,255,255,0.08);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.12);
        }

        .mbtn-secondary:hover {
          background: rgba(255,255,255,0.12);
        }

        .mactions {
          display: flex;
          gap: 12px;
          margin-top: 20px;
        }

        .mactions .mbtn {
          flex: 1;
        }

        /* Product Modal Specifics */
        .mproduct-banner {
          height: 200px;
          border-radius: 12px;
          overflow: hidden;
          background: #1a1a1a;
          margin-bottom: 20px;
        }

        .mproduct-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .mproduct-details {
          margin-bottom: 20px;
        }

        .mproduct-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .mproduct-label {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
        }

        .mproduct-value {
          font-size: 13px;
          font-weight: 600;
          color: #fff;
        }

        .mproduct-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }

        .mproduct-stat-box {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
          padding: 14px;
          text-align: center;
        }

        .mproduct-stat-box .mproduct-stat-label {
          margin-bottom: 6px;
        }

        .mproduct-stat-box .mproduct-stat-value {
          font-size: 16px;
          font-weight: 800;
          color: #22c55e;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2px;
        }

        .mproduct-stat-box .mproduct-stat-value.orig {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          text-decoration: line-through;
        }

        /* ═══════════════════════════════
           Toast
        ═══════════════════════════════ */
        .toast-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 200;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .toast {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          background: #141414;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          min-width: 280px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.4);
        }

        .toast-in {
          animation: toastIn 0.3s ease forwards;
        }

        .toast-out {
          animation: toastOut 0.3s ease forwards;
        }

        @keyframes toastIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes toastOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(20px);
          }
        }

        .toast-title {
          font-size: 13px;
          font-weight: 700;
          color: #fff;
        }

        .toast-sub {
          font-size: 11px;
          color: rgba(255,255,255,0.5);
        }

        .naira {
          font-size: 0.85em;
        }

        /* ═══════════════════════════════
           Animations
        ═══════════════════════════════ */
        .fade-up {
          animation: fadeUp 0.4s ease forwards;
          opacity: 0;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ═══════════════════════════════
           Responsive
        ═══════════════════════════════ */
        @media (max-width: 1200px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 992px) {
          .stats-bar {
            grid-template-columns: repeat(2, 1fr);
          }

          .filter-row {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .hero-card {
            flex-direction: column;
            text-align: center;
          }

          .hero-left {
            max-width: 100%;
          }

          .hero-sub {
            max-width: 100%;
          }

          .hero-actions {
            justify-content: center;
            flex-wrap: wrap;
          }

          .hero-right {
            margin-top: 24px;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }

          .filter-row {
            grid-template-columns: 1fr;
          }

          .mproduct-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
