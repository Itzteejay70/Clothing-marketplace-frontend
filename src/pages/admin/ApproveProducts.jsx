import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  SealCheck,
  ShieldCheck,
  X,
  Eye,
  MagnifyingGlass,
  ShoppingBag,
  Clock,
  CheckCircle,
  CaretDown,
  Storefront,
  Warning,
  XCircle,
  Checks,
  Trash,
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
            {t.type === "approve" ? (
              <CheckCircle size={16} weight="fill" color="#22c55e" />
            ) : (
              <XCircle size={16} weight="fill" color="#ef4444" />
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
   Animated counter — reacts to live changes
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
   Hero card
───────────────────────────────────────── */
function HeroCard({ onStartReview }) {
  return (
    <div className="hero-card">
      <div className="hero-left">
        <div className="hero-content">
          <div className="hero-badge">
            <ShieldCheck size={11} weight="fill" /> Marketplace Overview
          </div>
          <h1 className="hero-title">
            Curate What Gets Listed on the Platform
          </h1>
          <p className="hero-sub">
            Every product that goes live passes through you. Review vendor
            submissions, approve quality items, and reject anything that doesn't
            meet your standards.
          </p>
          <div className="hero-actions">
            <button className="hero-btn-primary" onClick={onStartReview}>
              <SealCheck size={15} weight="bold" />
              Start Reviewing
            </button>
            <button className="hero-btn-ghost" onClick={onStartReview}>
              View All Submissions
            </button>
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

/* ─────────────────────────────────────────
   Stat cards — all live
───────────────────────────────────────── */
function StatCards({ pending, approved, rejected, totalValue }) {
  const pendingCount = useCountUp(pending);
  const approvedCount = useCountUp(approved);
  const rejectedCount = useCountUp(rejected);
  const valueK = useCountUp(Math.floor(totalValue / 1000));
  const total = pending + approved + rejected || 1;

  const cards = [
    {
      label: "Pending Review",
      value: pendingCount,
      suffix: "",
      prefix: "",
      sub: "Awaiting your decision",
      bar: Math.round((pending / total) * 100),
      trend: `${pending} remaining`,
      delay: "60ms",
    },
    {
      label: "Approved Today",
      value: approvedCount,
      suffix: "",
      prefix: "",
      sub: "Products went live",
      bar: Math.round((approved / total) * 100),
      trend: approved > 0 ? `+${approved} approved` : "None yet",
      delay: "120ms",
    },
    {
      label: "Rejected Today",
      value: rejectedCount,
      suffix: "",
      prefix: "",
      sub: "Did not meet standards",
      bar: Math.round((rejected / total) * 100),
      trend: rejected > 0 ? `${rejected} rejected` : "None yet",
      delay: "180ms",
    },
    {
      label: "Total Value",
      value: valueK,
      suffix: "k",
      prefix: <span className="naira">₦</span>,
      sub: "Pending submissions worth",
      bar: 85,
      trend: "Across all vendors",
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
   Product card
───────────────────────────────────────── */
function ProductCard({
  product,
  onApproveConfirm,
  onView,
  onRejectConfirm,
  selected,
  onSelect,
  index,
}) {
  return (
    <div
      className={`prod-card fade-up ${selected ? "prod-card-selected" : ""}`}
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <div
        className="prod-checkbox-wrap"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(product.id);
        }}
      >
        <div className={`prod-checkbox ${selected ? "prod-checkbox-on" : ""}`}>
          {selected && <CheckCircle size={12} weight="fill" color="#000" />}
        </div>
      </div>

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

      <div className="prod-body">
        <div className="prod-top">
          <div>
            <h3 className="prod-name">{product.name}</h3>
            <p className="prod-brand">
              by <strong>{product.brand}</strong>
            </p>
          </div>
          <div className="prod-price">
            <span className="prod-price-sym naira">₦</span>
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
            onClick={() => onApproveConfirm(product)}
          >
            <SealCheck size={13} weight="bold" /> Approve
          </button>
          <button
            className="prod-btn prod-btn-reject"
            onClick={() => onRejectConfirm(product)}
          >
            <X size={13} weight="bold" /> Reject
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Modal
───────────────────────────────────────── */
function ProductModal({
  product,
  onClose,
  onApprove,
  onReject,
  startOnConfirm,
  startOnApproveConfirm,
}) {
  const [confirmReject, setConfirmReject] = useState(false);
  const [confirmApprove, setConfirmApprove] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setConfirmReject(!!startOnConfirm);
    setConfirmApprove(!!startOnApproveConfirm);
    setRejectReason("");
    setSubmitting(false);
  }, [product, startOnConfirm, startOnApproveConfirm]);

  if (!product) return null;

  const handleApprove = () => {
    if (submitting) return;
    setSubmitting(true);
    setTimeout(() => {
      onApprove(product.id);
      onClose();
    }, 200);
  };

  const handleReject = () => {
    if (submitting) return;
    setSubmitting(true);
    setTimeout(() => {
      onReject(product.id, rejectReason);
      onClose();
    }, 200);
  };

  const hideDetails = confirmReject || confirmApprove;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hero">
          <img
            src={product.image}
            alt={product.name}
            className="modal-hero-img"
          />
          <div className="modal-hero-overlay" />
          <button className="modal-close-float" onClick={onClose}>
            <X size={14} weight="bold" />
          </button>
          <span className="modal-hero-badge">
            <Clock size={10} weight="fill" /> Pending Review
          </span>
          <div className="modal-hero-info">
            <div className="modal-hero-name">{product.name}</div>
            <div className="modal-hero-brand">by {product.brand}</div>
          </div>
        </div>

        <div className="modal-body">
          <div
            className="modal-top-row"
            style={{ display: hideDetails ? "none" : "flex" }}
          >
            <div>
              <div className="modal-field-label">Price</div>
              <div className="modal-price-val">
                <span className="naira">₦</span>
                {product.price.toLocaleString("en-NG")}
              </div>
            </div>
            <div className="modal-divider-v" />
            <div>
              <div className="modal-field-label">Category</div>
              <div
                className="modal-inline-val"
                style={{ textTransform: "capitalize" }}
              >
                {product.category}
              </div>
            </div>
            <div className="modal-divider-v" />
            <div>
              <div className="modal-field-label">Stock</div>
              <div className="modal-inline-val">{product.stock} units</div>
            </div>
            <div className="modal-divider-v" />
            <div>
              <div className="modal-field-label">Submitted</div>
              <div className="modal-inline-val">
                {new Date(product.submittedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>

          <div
            className="modal-vendor-row"
            style={{ display: hideDetails ? "none" : "flex" }}
          >
            <Storefront size={14} color="#22c55e" weight="fill" />
            <div>
              <div className="modal-vendor-name">{product.vendor}</div>
              <div className="modal-vendor-email">{product.vendorEmail}</div>
            </div>
          </div>

          {!hideDetails && (
            <>
              <div className="modal-section">
                <div className="modal-section-label">Description</div>
                <p className="modal-desc-text">{product.description}</p>
              </div>
              <div className="modal-section">
                <div className="modal-section-label">Available Sizes</div>
                <div className="prod-sizes" style={{ marginBottom: 0 }}>
                  {product.sizes.map((s, i) => (
                    <span key={i} className="prod-size prod-size-lg">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Approve confirm */}
          {confirmApprove ? (
            <div className="modal-confirm-wrap">
              <div className="modal-confirm-icon modal-confirm-icon-approve">
                <CheckCircle size={22} color="#22c55e" weight="fill" />
              </div>
              <div className="modal-confirm-title">Approve this product?</div>
              <div className="modal-confirm-sub">
                <strong>{product.name}</strong> by{" "}
                <strong>{product.vendor}</strong> will go live on the
                marketplace immediately.
              </div>
              <div className="modal-confirm-btns">
                <button
                  className="modal-btn modal-btn-ghost"
                  onClick={() => setConfirmApprove(false)}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  className="modal-btn modal-btn-approve-confirm"
                  onClick={handleApprove}
                  disabled={submitting}
                >
                  <CheckCircle size={15} weight="bold" />{" "}
                  {submitting ? "Approving…" : "Yes, Approve"}
                </button>
              </div>
            </div>
          ) : confirmReject ? (
            <div className="modal-confirm-wrap">
              <div className="modal-confirm-icon">
                <Warning size={22} color="#ef4444" weight="fill" />
              </div>
              <div className="modal-confirm-title">Reject this product?</div>
              <div className="modal-confirm-sub">
                This will notify <strong>{product.vendor}</strong> that{" "}
                <strong>{product.name}</strong> didn't meet your standards.
              </div>
              <div className="reject-reason-wrap">
                <div
                  className="modal-field-label"
                  style={{ marginBottom: 6, textAlign: "left", width: "100%" }}
                >
                  Reason for rejection{" "}
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>
                    (optional)
                  </span>
                </div>
                <textarea
                  className="reject-reason-input"
                  placeholder="e.g. Images are low quality, product description is incomplete…"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="modal-confirm-btns">
                <button
                  className="modal-btn modal-btn-ghost"
                  onClick={() => setConfirmReject(false)}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  className="modal-btn modal-btn-reject-confirm"
                  onClick={handleReject}
                  disabled={submitting}
                >
                  <X size={15} weight="bold" />{" "}
                  {submitting ? "Rejecting…" : "Yes, Reject"}
                </button>
              </div>
            </div>
          ) : (
            <div className="modal-actions">
              <button
                className="modal-btn modal-btn-approve"
                onClick={() => setConfirmApprove(true)}
              >
                <CheckCircle size={16} weight="bold" /> Approve Product
              </button>
              <button
                className="modal-btn modal-btn-reject"
                onClick={() => setConfirmReject(true)}
              >
                <X size={16} weight="bold" /> Reject Product
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Bulk action bar
───────────────────────────────────────── */
function BulkBar({ count, onApproveAll, onRejectAll, onClear }) {
  if (count === 0) return null;
  return (
    <div className="bulk-bar fade-up">
      <span className="bulk-count">
        {count} product{count > 1 ? "s" : ""} selected
      </span>
      <div className="bulk-actions">
        <button className="bulk-btn bulk-btn-approve" onClick={onApproveAll}>
          <Checks size={14} weight="bold" /> Approve All
        </button>
        <button className="bulk-btn bulk-btn-reject" onClick={onRejectAll}>
          <Trash size={14} weight="bold" /> Reject All
        </button>
        <button className="bulk-btn bulk-btn-clear" onClick={onClear}>
          <X size={13} weight="bold" /> Clear
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Queue complete
───────────────────────────────────────── */
function QueueComplete({ approved, rejected }) {
  return (
    <div className="queue-complete fade-up">
      <div className="qc-icon-wrap">
        <CheckCircle size={36} color="#22c55e" weight="fill" />
      </div>
      <div className="qc-title">All caught up!</div>
      <div className="qc-sub">
        You've reviewed every submission in the queue.{" "}
        {approved > 0 && (
          <span>
            <strong style={{ color: "#22c55e" }}>{approved} approved</strong>
            {rejected > 0 ? " and " : "."}
          </span>
        )}
        {rejected > 0 && (
          <span>
            <strong style={{ color: "#ef4444" }}>{rejected} rejected</strong>.
          </span>
        )}{" "}
        New vendor submissions will appear here.
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main page
───────────────────────────────────────── */
const INITIAL_PRODUCTS = [
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
    description: "Comfortable cotton blend hoodie perfect for casual wear.",
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
    description: "Essential plain white t-shirt made from premium cotton.",
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
    description: "Bold and colorful running-inspired sneaker with retro vibes.",
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
];

export default function ApproveProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalStartConfirm, setModalStartConfirm] = useState(false);
  const [modalStartApprove, setModalStartApprove] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const gridRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setProducts(INITIAL_PRODUCTS);
      setLoading(false);
    }, 900);
  }, []);

  /* Toast */
  const showToast = useCallback((type, title, sub) => {
    const id = Date.now() + Math.random();
    setToasts((p) => [...p, { id, type, title, sub, removing: false }]);
    setTimeout(() => {
      setToasts((p) =>
        p.map((t) => (t.id === id ? { ...t, removing: true } : t)),
      );
      setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 400);
    }, 3500);
  }, []);

  /* Approve / Reject */
  const handleApprove = useCallback(
    (id) => {
      const p = products.find((x) => x.id === id);
      setProducts((prev) => prev.filter((x) => x.id !== id));
      setSelectedIds((prev) => prev.filter((x) => x !== id));
      setApprovedCount((c) => c + 1);
      if (p)
        showToast(
          "approve",
          "Product Approved!",
          `${p.name} by ${p.vendor} is now live.`,
        );
    },
    [products, showToast],
  );

  const handleReject = useCallback(
    (id, reason) => {
      const p = products.find((x) => x.id === id);
      setProducts((prev) => prev.filter((x) => x.id !== id));
      setSelectedIds((prev) => prev.filter((x) => x !== id));
      setRejectedCount((c) => c + 1);
      if (p)
        showToast(
          "reject",
          "Product Rejected",
          `${p.name} has been removed from review.`,
        );
    },
    [products, showToast],
  );

  /* Bulk */
  const handleBulkApprove = () => {
    const ids = [...selectedIds];
    ids.forEach((id) => {
      const p = products.find((x) => x.id === id);
      setProducts((prev) => prev.filter((x) => x.id !== id));
      setApprovedCount((c) => c + 1);
    });
    setSelectedIds([]);
    showToast(
      "approve",
      `${ids.length} Products Approved`,
      "They are now live on the marketplace.",
    );
  };

  const handleBulkReject = () => {
    const ids = [...selectedIds];
    ids.forEach((id) => {
      setProducts((prev) => prev.filter((x) => x.id !== id));
      setRejectedCount((c) => c + 1);
    });
    setSelectedIds([]);
    showToast(
      "reject",
      `${ids.length} Products Rejected`,
      "Vendors have been notified.",
    );
  };

  const toggleSelect = (id) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  /* Modal openers */
  const handleCardApprove = (product) => {
    setModalStartApprove(true);
    setModalStartConfirm(false);
    setSelectedProduct(product);
  };
  const handleCardReject = (product) => {
    setModalStartConfirm(true);
    setModalStartApprove(false);
    setSelectedProduct(product);
  };
  const handleView = (product) => {
    setModalStartConfirm(false);
    setModalStartApprove(false);
    setSelectedProduct(product);
  };
  const handleModalClose = () => {
    setSelectedProduct(null);
    setModalStartConfirm(false);
    setModalStartApprove(false);
  };

  /* Scroll to grid */
  const scrollToGrid = () =>
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "sneakers", label: "Sneakers" },
    { value: "hoodies", label: "Hoodies" },
    { value: "jackets", label: "Jackets" },
    { value: "plainTee", label: "T-Shirts" },
  ];

  const filtered = products.filter((p) => {
    const s = searchTerm.toLowerCase();
    return (
      (p.name.toLowerCase().includes(s) ||
        p.brand.toLowerCase().includes(s) ||
        p.vendor.toLowerCase().includes(s)) &&
      (filterCategory === "all" || p.category === filterCategory)
    );
  });

  const totalValue = products.reduce((s, p) => s + p.price, 0);
  const queueEmpty = !loading && products.length === 0;
  const noFilterResult =
    !loading && products.length > 0 && filtered.length === 0;

  return (
    <div className="ap-root">
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .ap-root { min-height: 100vh; background: #0a0a0a; font-family: 'Poppins', sans-serif; color: #fff; padding: 24px 28px; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease-out forwards; opacity: 0; }

        /* ── Hero ── */
        .hero-card { position: relative; overflow: hidden; width: 100%; border-radius: 20px; background: #0f3318; margin-bottom: 22px; height: 280px; animation: fadeUp 0.45s ease-out forwards; display: flex; border: 1px solid rgba(34,197,94,0.12); }
        .hero-left { flex: 1; padding: 40px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; position: relative; z-index: 2; }
        .hero-content { max-width: 480px; }
        .hero-badge { display: inline-flex; align-items: center; background: rgba(34,197,94,0.05); color: #22c55e; border: 1px solid rgba(34,197,94,0.4); font-size: 9px; font-weight: 700; padding: 4px 10px; border-radius: 8px; margin-bottom: 12px; letter-spacing: 0.6px; text-transform: uppercase; box-shadow: 0 0 8px rgba(34,197,94,0.25); }
        .hero-title { font-size: 24px; font-weight: 600; color: #fff; margin-bottom: 12px; line-height: 1.2; letter-spacing: -0.5px; }
        .hero-sub { font-size: 13px; color: rgba(255,255,255,0.45); margin-bottom: 28px; line-height: 1.7; max-width: 380px; }
        .hero-actions { display: flex; gap: 12px; }
        .hero-btn-primary { padding: 11px 22px; background: #eab308; color: #000; border: none; border-radius: 12px; font-size: 13px; font-weight: 800; cursor: pointer; font-family: 'Poppins', sans-serif; transition: all 0.2s; box-shadow: 0 0 20px rgba(234,179,8,0.3); }
        .hero-btn-primary:hover { background: #facc15; transform: translateY(-1px); }
        .hero-btn-ghost { padding: 11px 22px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.6); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'Poppins', sans-serif; transition: all 0.2s; }
        .hero-btn-ghost:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .hero-right { width: 45%; flex-shrink: 0; position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .hero-right::before { content: ''; position: absolute; inset: -10px; background: radial-gradient(ellipse 70% 60% at 55% 50%, rgba(34,197,94,0.22) 0%, rgba(34,197,94,0.08) 45%, transparent 75%); pointer-events: none; }
        .hero-right::after  { content: ''; position: absolute; bottom: 10px; left: 10%; right: 10%; height: 40px; background: radial-gradient(ellipse 80% 100% at 50% 100%, rgba(34,197,94,0.3) 0%, transparent 70%); pointer-events: none; filter: blur(8px); }
        .hero-img { width: 90%; height: 90%; object-fit: contain; position: relative; z-index: 1; filter: drop-shadow(0 8px 32px rgba(34,197,94,0.25)); transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1); }
        .hero-right:hover .hero-img { transform: translateY(-12px) scale(1.05); filter: drop-shadow(0 20px 50px rgba(34,197,94,0.45)); }

        /* ── Stats ── */
        .stats-bar { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-bottom: 22px; }
        .stat-tile { background: linear-gradient(160deg,#161d16 0%,#0f140f 70%,#0d120d 100%); border: 1px solid rgba(34,197,94,0.18); border-radius: 16px; padding: 18px 20px 16px; display: flex; flex-direction: column; cursor: pointer; position: relative; overflow: hidden; box-shadow: 0 6px 28px rgba(0,0,0,0.5); transition: box-shadow 0.3s, border-color 0.3s, transform 0.3s cubic-bezier(0.34,1.4,0.64,1); }
        .stat-tile::after { content: ''; position: absolute; bottom: -20px; right: -20px; width: 100px; height: 100px; background: radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%); pointer-events: none; }
        .stat-tile:hover { transform: translateY(-4px) scale(1.015); border-color: rgba(34,197,94,0.35); box-shadow: 0 0 40px rgba(34,197,94,0.1), 0 14px 40px rgba(0,0,0,0.6); }
        .stat-top-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .stat-trend { font-size: 9.5px; font-weight: 700; color: rgba(34,197,94,0.6); background: rgba(34,197,94,0.07); border: 1px solid rgba(34,197,94,0.16); border-radius: 20px; padding: 3px 8px; white-space: nowrap; }
        .stat-number-row { display: flex; align-items: baseline; gap: 2px; }
        .naira { font-family: 'Arial', system-ui, sans-serif; }
        .stat-prefix { font-size: 15px; font-weight: 600; color: rgba(34,197,94,0.55); }
        .stat-val { font-size: 28px; font-weight: 700; color: #fff; letter-spacing: -1.5px; font-variant-numeric: tabular-nums; }
        .stat-suffix { font-size: 15px; font-weight: 600; color: rgba(34,197,94,0.55); }
        .stat-label { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.72); margin-bottom: 2px; }
        .stat-sub { font-size: 10.5px; font-weight: 500; color: rgba(255,255,255,0.22); margin-bottom: 14px; }
        .stat-bar-track { height: 3px; background: rgba(255,255,255,0.05); border-radius: 99px; overflow: hidden; }
        @keyframes barGrow { from { width: 0%; } to { width: var(--bar-w); } }
        .stat-bar-fill { height: 100%; width: var(--bar-w); background: #eab308; border-radius: 99px; animation: barGrow 1.4s cubic-bezier(0.4,0,0.2,1) forwards; box-shadow: 0 0 8px rgba(234,179,8,0.55); }

        /* ── Filters ── */
        .filters-bar { background: #111; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 16px 18px; margin-bottom: 14px; }
        .filters-row { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 10px; }
        .filter-input-wrap { position: relative; }
        .filter-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; }
        .filter-input { width: 100%; padding: 9px 12px 9px 36px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; font-size: 12px; font-weight: 500; color: #fff; font-family: 'Poppins', sans-serif; outline: none; }
        .filter-input::placeholder { color: rgba(255,255,255,0.25); }
        .filter-input:focus { border-color: rgba(34,197,94,0.4); }
        .filter-select { width: 100%; padding: 9px 32px 9px 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.7); font-family: 'Poppins', sans-serif; outline: none; cursor: pointer; appearance: none; color-scheme: dark; }
        .filter-select:focus { border-color: rgba(34,197,94,0.4); }
        .filter-select option { background: #1a1a1a; }
        .select-wrap { position: relative; }
        .select-caret { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); pointer-events: none; }

        /* ── Bulk bar ── */
        .bulk-bar { display: flex; align-items: center; justify-content: space-between; background: rgba(34,197,94,0.06); border: 1px solid rgba(34,197,94,0.18); border-radius: 12px; padding: 10px 16px; margin-bottom: 14px; gap: 12px; }
        .bulk-count { font-size: 13px; font-weight: 700; color: #22c55e; }
        .bulk-actions { display: flex; gap: 8px; }
        .bulk-btn { display: flex; align-items: center; gap: 5px; padding: 7px 14px; border-radius: 8px; border: none; font-size: 12px; font-weight: 700; cursor: pointer; font-family: 'Poppins', sans-serif; transition: all 0.2s; }
        .bulk-btn-approve { background: rgba(34,197,94,0.12); color: #22c55e; border: 1px solid rgba(34,197,94,0.22); }
        .bulk-btn-approve:hover { background: #22c55e; color: #000; }
        .bulk-btn-reject  { background: rgba(239,68,68,0.08); color: #ef4444; border: 1px solid rgba(239,68,68,0.18); }
        .bulk-btn-reject:hover  { background: #ef4444; color: #fff; }
        .bulk-btn-clear   { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.08); }
        .bulk-btn-clear:hover   { background: rgba(255,255,255,0.1); color: #fff; }

        /* ── Product grid ── */
        .prod-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px,1fr)); gap: 16px; }
        .prod-card { background: #111; border: 1px solid rgba(255,255,255,0.06); border-radius: 18px; overflow: hidden; position: relative; transition: transform 0.3s cubic-bezier(0.34,1.4,0.64,1), border-color 0.25s, box-shadow 0.3s; }
        .prod-card:hover { transform: translateY(-5px); border-color: rgba(34,197,94,0.28); box-shadow: 0 16px 48px rgba(0,0,0,0.5); }
        .prod-card-selected { border-color: rgba(34,197,94,0.5) !important; box-shadow: 0 0 0 2px rgba(34,197,94,0.12) !important; }
        .prod-checkbox-wrap { position: absolute; top: 12px; left: 12px; z-index: 10; cursor: pointer; }
        .prod-checkbox { width: 20px; height: 20px; border-radius: 6px; border: 1.5px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
        .prod-checkbox-on { background: #22c55e; border-color: #22c55e; }
        .prod-img-wrap { position: relative; height: 200px; overflow: hidden; background: #1a1a1a; }
        .prod-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
        .prod-card:hover .prod-img { transform: scale(1.07); }
        .prod-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(17,17,17,0.7) 0%, transparent 50%); }
        .prod-cat-badge { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 3px 10px; font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.7); text-transform: capitalize; }
        .prod-pending-badge { position: absolute; bottom: 34px; left: 10px; background: rgba(34,197,94,0.1); backdrop-filter: blur(8px); border: 1px solid rgba(34,197,94,0.25); border-radius: 20px; padding: 3px 10px; font-size: 10px; font-weight: 700; color: #22c55e; display: flex; align-items: center; gap: 4px; }
        .prod-stock-badge { position: absolute; bottom: 10px; left: 10px; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 3px 9px; font-size: 10px; color: rgba(255,255,255,0.5); }
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
        .prod-size { padding: 3px 8px; border-radius: 6px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.45); }
        .prod-size-more { color: rgba(34,197,94,0.6); border-color: rgba(34,197,94,0.15); background: rgba(34,197,94,0.05); }
        .prod-size-lg { padding: 5px 12px; font-size: 11px; }
        .prod-actions { display: grid; grid-template-columns: 1fr 1.2fr 1fr; gap: 6px; }
        .prod-btn { display: flex; align-items: center; justify-content: center; gap: 4px; padding: 8px 6px; border-radius: 7px; border: none; cursor: pointer; font-size: 11px; font-weight: 700; font-family: 'Poppins', sans-serif; transition: all 0.2s; }
        .prod-btn-view    { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.6); border: 1px solid rgba(255,255,255,0.08); }
        .prod-btn-view:hover    { background: rgba(255,255,255,0.1); color: #fff; }
        .prod-btn-approve { background: rgba(34,197,94,0.12); color: #22c55e; border: 1px solid rgba(34,197,94,0.25); }
        .prod-btn-approve:hover { background: #22c55e; color: #000; }
        .prod-btn-reject  { background: rgba(239,68,68,0.08); color: rgba(239,68,68,0.7); border: 1px solid rgba(239,68,68,0.18); }
        .prod-btn-reject:hover  { background: #ef4444; color: #fff; }

        /* ── Empty states ── */
        .empty-state { background: #111; border: 1px solid rgba(255,255,255,0.06); border-radius: 18px; padding: 64px 24px; text-align: center; }
        .empty-icon-wrap { width: 64px; height: 64px; border-radius: 18px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
        .empty-title { font-size: 16px; font-weight: 800; color: rgba(255,255,255,0.6); margin-bottom: 6px; }
        .empty-sub { font-size: 12px; color: rgba(255,255,255,0.25); }
        .loading-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px; gap: 14px; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spinner { width: 36px; height: 36px; border: 3px solid rgba(34,197,94,0.15); border-top-color: #22c55e; border-radius: 50%; animation: spin 0.8s linear infinite; }
        .loading-text { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.3); }
        .queue-complete { background: #111; border: 1px solid rgba(34,197,94,0.15); border-radius: 18px; padding: 72px 24px; text-align: center; }
        .qc-icon-wrap { width: 72px; height: 72px; border-radius: 20px; background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.18); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
        .qc-title { font-size: 20px; font-weight: 800; color: #fff; margin-bottom: 10px; }
        .qc-sub { font-size: 13px; color: rgba(255,255,255,0.35); line-height: 1.8; max-width: 360px; margin: 0 auto; }

        /* ── Modal ── */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.82); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; z-index: 999; padding: 8px; animation: fadeIn 0.2s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .modal-box { background: #0f0f0f; border: 1px solid rgba(255,255,255,0.07); border-radius: 18px; width: 100%; max-width: 500px; max-height: 96vh; overflow-y: auto; animation: scaleIn 0.28s cubic-bezier(0.34,1.4,0.64,1); scrollbar-width: thin; scrollbar-color: #222 #0f0f0f; box-shadow: 0 40px 100px rgba(0,0,0,0.75); }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.94) translateY(14px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .modal-hero { position: relative; height: 180px; overflow: hidden; border-radius: 18px 18px 0 0; }
        .modal-hero-img { width: 100%; height: 100%; object-fit: cover; }
        .modal-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%); }
        .modal-close-float { position: absolute; top: 14px; right: 14px; width: 30px; height: 30px; border-radius: 8px; background: rgba(0,0,0,0.5); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; cursor: pointer; color: rgba(255,255,255,0.7); transition: all 0.2s; z-index: 5; }
        .modal-close-float:hover { background: rgba(0,0,0,0.8); color: #fff; }
        .modal-hero-badge { position: absolute; top: 14px; left: 14px; background: rgba(34,197,94,0.15); backdrop-filter: blur(8px); border: 1px solid rgba(34,197,94,0.3); border-radius: 20px; padding: 4px 10px; font-size: 10px; font-weight: 700; color: #22c55e; display: flex; align-items: center; gap: 5px; }
        .modal-hero-info { position: absolute; bottom: 16px; left: 20px; right: 20px; z-index: 2; }
        .modal-hero-name { font-size: 20px; font-weight: 800; color: #fff; line-height: 1.2; margin-bottom: 3px; text-shadow: 0 2px 12px rgba(0,0,0,0.5); }
        .modal-hero-brand { font-size: 12px; color: rgba(255,255,255,0.45); }
        .modal-body { padding: 12px 0 16px; }
        .modal-top-row { display: flex; align-items: center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 10px 16px; margin: 0 0 10px; }
        .modal-top-row > div { flex: 1; }
        .modal-divider-v { display: none; }
        .modal-field-label { font-size: 9px; font-weight: 700; color: rgba(255,255,255,0.28); text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 3px; }
        .modal-price-val { font-size: 16px; font-weight: 800; color: #22c55e; }
        .modal-inline-val { font-size: 12px; font-weight: 700; color: #fff; }
        .modal-vendor-row { display: flex; align-items: center; gap: 10px; padding: 6px 0; margin: 0 0 10px; }
        .modal-vendor-name { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 1px; }
        .modal-vendor-email { font-size: 11px; color: rgba(255,255,255,0.3); }
        .modal-section { margin: 0 0 10px; }
        .modal-section-label { font-size: 9px; font-weight: 700; color: rgba(255,255,255,0.28); text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 6px; }
        .modal-desc-text { font-size: 12px; color: rgba(255,255,255,0.5); line-height: 1.6; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 10px 12px; }
        .modal-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 12px; }
        .modal-btn { display: flex; align-items: center; justify-content: center; gap: 7px; padding: 11px; border-radius: 9px; border: none; cursor: pointer; font-size: 13px; font-weight: 800; font-family: 'Poppins', sans-serif; transition: all 0.2s; }
        .modal-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        .modal-btn-approve { background: rgba(34,197,94,0.1); color: #22c55e; border: 1px solid rgba(34,197,94,0.22); }
        .modal-btn-approve:hover:not(:disabled) { background: #22c55e; color: #000; }
        .modal-btn-reject  { background: rgba(239,68,68,0.07); color: rgba(239,68,68,0.8); border: 1px solid rgba(239,68,68,0.18); }
        .modal-btn-reject:hover:not(:disabled)  { background: rgba(239,68,68,0.15); color: #ef4444; }
        .modal-btn-ghost   { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.6); border: 1px solid rgba(255,255,255,0.1); }
        .modal-btn-ghost:hover:not(:disabled)   { background: rgba(255,255,255,0.09); color: #fff; }
        .modal-btn-approve-confirm { background: #22c55e; color: #000; border: 1px solid #22c55e; }
        .modal-btn-approve-confirm:hover:not(:disabled) { background: #16a34a; }
        .modal-btn-reject-confirm  { background: #ef4444; color: #fff; border: 1px solid #ef4444; }
        .modal-btn-reject-confirm:hover:not(:disabled)  { background: #dc2626; }
        .modal-confirm-wrap { margin-top: 14px; padding: 22px 0; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 10px; animation: fadeIn 0.2s ease-out; }
        .modal-confirm-icon { width: 48px; height: 48px; border-radius: 14px; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.22); display: flex; align-items: center; justify-content: center; }
        .modal-confirm-icon-approve { background: rgba(34,197,94,0.1); border-color: rgba(34,197,94,0.22); }
        .modal-confirm-title { font-size: 16px; font-weight: 800; color: #fff; }
        .modal-confirm-sub { font-size: 12.5px; color: rgba(255,255,255,0.4); line-height: 1.65; max-width: 320px; }
        .modal-confirm-sub strong { color: rgba(255,255,255,0.75); }
        .modal-confirm-btns { display: flex; gap: 8px; width: 100%; }
        .modal-confirm-btns .modal-btn { flex: 1; }
        .reject-reason-wrap { width: 100%; text-align: left; }
        .reject-reason-input { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 10px 12px; font-size: 12px; color: rgba(255,255,255,0.7); font-family: 'Poppins', sans-serif; outline: none; resize: none; line-height: 1.6; transition: border-color 0.2s; }
        .reject-reason-input::placeholder { color: rgba(255,255,255,0.2); }
        .reject-reason-input:focus { border-color: rgba(239,68,68,0.35); }

        /* ── Toast ── */
        @keyframes toastIn  { from { opacity: 0; transform: translateX(100%) scale(0.92); } to { opacity: 1; transform: translateX(0) scale(1); } }
        @keyframes toastOut { from { opacity: 1; transform: translateX(0) scale(1); } to { opacity: 0; transform: translateX(110%) scale(0.92); } }
        .toast-container { position: fixed; top: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px; pointer-events: none; }
        .toast { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 14px; min-width: 280px; max-width: 340px; box-shadow: 0 8px 32px rgba(0,0,0,0.45); pointer-events: all; }
        .toast-in  { animation: toastIn  0.38s cubic-bezier(0.34,1.4,0.64,1) forwards; }
        .toast-out { animation: toastOut 0.35s ease-in forwards; }
        .toast-approve { background: #0f0f0f; border: 1px solid rgba(34,197,94,0.2); }
        .toast-reject  { background: #0f0f0f; border: 1px solid rgba(239,68,68,0.2); }
        .toast-icon { width: 32px; height: 32px; border-radius: 9px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
        .toast-approve .toast-icon { background: rgba(34,197,94,0.12); }
        .toast-reject  .toast-icon { background: rgba(239,68,68,0.12); }
        .toast-title { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 2px; }
        .toast-sub   { font-size: 11px; color: rgba(255,255,255,0.4); line-height: 1.4; }

        * { scrollbar-width: thin; scrollbar-color: #222 #0a0a0a; }
        *::-webkit-scrollbar { width: 5px; }
        *::-webkit-scrollbar-track { background: #0a0a0a; }
        *::-webkit-scrollbar-thumb { background: #222; border-radius: 999px; }
      `}</style>

      <HeroCard onStartReview={scrollToGrid} />

      <StatCards
        pending={products.length}
        approved={approvedCount}
        rejected={rejectedCount}
        totalValue={totalValue}
      />

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
            <select className="filter-select" value="pending" readOnly>
              <option value="pending">Pending ({products.length})</option>
            </select>
            <CaretDown
              size={12}
              color="rgba(255,255,255,0.3)"
              className="select-caret"
            />
          </div>
        </div>
      </div>

      {/* Bulk bar */}
      <BulkBar
        count={selectedIds.length}
        onApproveAll={handleBulkApprove}
        onRejectAll={handleBulkReject}
        onClear={() => setSelectedIds([])}
      />

      {/* Grid */}
      <div ref={gridRef}>
        {loading ? (
          <div className="loading-wrap">
            <div className="spinner" />
            <div className="loading-text">Loading products…</div>
          </div>
        ) : queueEmpty ? (
          <QueueComplete approved={approvedCount} rejected={rejectedCount} />
        ) : noFilterResult ? (
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
                onApproveConfirm={handleCardApprove}
                onView={handleView}
                onRejectConfirm={handleCardReject}
                selected={selectedIds.includes(p.id)}
                onSelect={toggleSelect}
              />
            ))}
          </div>
        )}
      </div>

      <Toast toasts={toasts} />

      <ProductModal
        product={selectedProduct}
        onClose={handleModalClose}
        onApprove={handleApprove}
        onReject={handleReject}
        startOnConfirm={modalStartConfirm}
        startOnApproveConfirm={modalStartApprove}
      />
    </div>
  );
}
