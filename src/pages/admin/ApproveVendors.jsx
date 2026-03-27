import { useEffect, useState, useRef, useCallback } from "react";
import {
  X,
  MagnifyingGlass,
  CaretDown,
  CheckCircle,
  XCircle,
  Warning,
  Storefront,
  Clock,
  SealCheck,
  Checks,
  Trash,
  MapPin,
  Phone,
  EnvelopeSimple,
  IdentificationCard,
  Buildings,
  ChartLineUp,
  Package,
  Star,
  Globe,
  InstagramLogo,
  ShieldCheck,
  ShieldSlash,
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
   Hero — vendor flavour
───────────────────────────────────────── */
function HeroCard({ onStartReview }) {
  return (
    <div className="hero-card">
      {/* subtle grid texture */}
      <div className="hero-grid-bg" />

      <div className="hero-left">
        <div className="hero-badge">
          <ShieldCheck size={11} weight="fill" /> Vendor Verification
        </div>
        <h1 className="hero-title">Decide Who Gets to Sell on Your Platform</h1>
        <p className="hero-sub">
          Every vendor that opens a storefront goes through you first. Verify
          identities, review business credentials, and only approve sellers who
          meet your standards.
        </p>
        <div className="hero-actions">
          <button className="hero-btn-primary" onClick={onStartReview}>
            <SealCheck size={15} weight="bold" /> Start Verifying
          </button>
          <button className="hero-btn-ghost" onClick={onStartReview}>
            View All Applicants
          </button>
        </div>
      </div>

      <div className="hero-right">
        <img
          src="/assets/categories/VendorPageImg.png"
          alt="Vendor"
          className="hero-img"
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Stat cards
───────────────────────────────────────── */
function StatCards({ pending, approved, rejected, totalProducts }) {
  const pendingCount = useCountUp(pending);
  const approvedCount = useCountUp(approved);
  const rejectedCount = useCountUp(rejected);
  const productsCount = useCountUp(totalProducts);
  const total = pending + approved + rejected || 1;

  const cards = [
    {
      label: "Pending Verification",
      value: pendingCount,
      suffix: "",
      prefix: "",
      sub: "Awaiting your review",
      bar: Math.round((pending / total) * 100),
      trend: `${pending} pending`,
      delay: "60ms",
    },
    {
      label: "Approved Vendors",
      value: approvedCount,
      suffix: "",
      prefix: "",
      sub: "Active on marketplace",
      bar: Math.round((approved / total) * 100),
      trend: approved > 0 ? `+${approved} approved` : "None yet",
      delay: "120ms",
    },
    {
      label: "Rejected Vendors",
      value: rejectedCount,
      suffix: "",
      prefix: "",
      sub: "Did not meet standards",
      bar: Math.round((rejected / total) * 100),
      trend: rejected > 0 ? `${rejected} rejected` : "None yet",
      delay: "180ms",
    },
    {
      label: "Listed Products",
      value: productsCount,
      suffix: "",
      prefix: "",
      sub: "Across all pending vendors",
      bar: 70,
      trend: "Pending review",
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
   Vendor card
───────────────────────────────────────── */
function VendorCard({
  vendor,
  onApproveConfirm,
  onView,
  onRejectConfirm,
  selected,
  onSelect,
  index,
}) {
  const initials = vendor.storeName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`vendor-card fade-up ${selected ? "vendor-card-selected" : ""}`}
      style={{ animationDelay: `${index * 55}ms` }}
    >
      {/* checkbox */}
      <div
        className="vendor-checkbox-wrap"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(vendor.id);
        }}
      >
        <div
          className={`vendor-checkbox ${selected ? "vendor-checkbox-on" : ""}`}
        >
          {selected && <CheckCircle size={12} weight="fill" color="#000" />}
        </div>
      </div>

      {/* card header strip */}
      <div className="vendor-header">
        <div className="vendor-header-overlay" />
        <span className="vendor-pending-badge">
          <Clock size={10} weight="fill" /> Pending
        </span>
        <span className="vendor-category-badge">{vendor.category}</span>
      </div>

      {/* avatar + name row */}
      <div className="vendor-identity">
        <div className="vendor-avatar">
          <span className="vendor-initials">{initials}</span>
          <div className="vendor-avatar-ring" />
        </div>
        <div className="vendor-name-block">
          <div className="vendor-store-name">{vendor.storeName}</div>
          <div className="vendor-owner">{vendor.ownerName}</div>
        </div>
        <div className="vendor-products-pill">
          <Package size={10} weight="fill" />
          {vendor.productCount} products
        </div>
      </div>

      <div className="vendor-body">
        {/* contact row */}
        <div className="vendor-contact-row">
          <div className="vendor-contact-item">
            <EnvelopeSimple
              size={11}
              color="rgba(255,255,255,0.3)"
              weight="fill"
            />
            <span>{vendor.email}</span>
          </div>
          <div className="vendor-contact-item">
            <MapPin size={11} color="rgba(255,255,255,0.3)" weight="fill" />
            <span>{vendor.location}</span>
          </div>
        </div>

        {/* info pills */}
        <div className="vendor-info-row">
          <div className="vendor-info-pill">
            <IdentificationCard
              size={11}
              color="rgba(34,197,94,0.6)"
              weight="fill"
            />
            <span>{vendor.idType}</span>
          </div>
          <div className="vendor-info-pill">
            <Buildings size={11} color="rgba(34,197,94,0.6)" weight="fill" />
            <span>{vendor.businessType}</span>
          </div>
          <div className="vendor-info-pill">
            <ChartLineUp size={11} color="rgba(234,179,8,0.6)" weight="fill" />
            <span>{vendor.experience}</span>
          </div>
        </div>

        {/* submitted */}
        <div className="vendor-submitted">
          Applied{" "}
          {new Date(vendor.submittedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>

        {/* actions */}
        <div className="vendor-actions">
          <button
            className="vendor-btn vendor-btn-view"
            onClick={() => onView(vendor)}
          >
            <MagnifyingGlass size={12} weight="bold" /> View
          </button>
          <button
            className="vendor-btn vendor-btn-approve"
            onClick={() => onApproveConfirm(vendor)}
          >
            <SealCheck size={12} weight="bold" /> Approve
          </button>
          <button
            className="vendor-btn vendor-btn-reject"
            onClick={() => onRejectConfirm(vendor)}
          >
            <X size={12} weight="bold" /> Reject
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Vendor modal
───────────────────────────────────────── */
function VendorModal({
  vendor,
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
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    setConfirmReject(!!startOnConfirm);
    setConfirmApprove(!!startOnApproveConfirm);
    setRejectReason("");
    setSubmitting(false);
    setActiveTab("details");
  }, [vendor, startOnConfirm, startOnApproveConfirm]);

  if (!vendor) return null;

  const initials = vendor.storeName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleApprove = () => {
    if (submitting) return;
    setSubmitting(true);
    setTimeout(() => {
      onApprove(vendor.id);
      onClose();
    }, 200);
  };

  const handleReject = () => {
    if (submitting) return;
    setSubmitting(true);
    setTimeout(() => {
      onReject(vendor.id, rejectReason);
      onClose();
    }, 200);
  };

  const hideMain = confirmReject || confirmApprove;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {/* hero strip */}
        <div className="modal-hero">
          <div className="modal-hero-pattern" />
          <div className="modal-hero-overlay" />
          <button className="modal-close-float" onClick={onClose}>
            <X size={14} weight="bold" />
          </button>
          <span className="modal-hero-badge">
            <Clock size={10} weight="fill" /> Pending Verification
          </span>

          {/* avatar centred */}
          <div className="modal-avatar-wrap">
            <div className="modal-avatar">
              <span className="modal-avatar-initials">{initials}</span>
            </div>
          </div>
        </div>

        {/* name block below hero */}
        <div className="modal-name-block">
          <div className="modal-store-name">{vendor.storeName}</div>
          <div className="modal-owner-name">{vendor.ownerName}</div>
        </div>

        <div className="modal-body">
          {!hideMain && (
            <>
              {/* tabs */}
              <div className="modal-tabs">
                <button
                  className={`modal-tab ${activeTab === "details" ? "modal-tab-active" : ""}`}
                  onClick={() => setActiveTab("details")}
                >
                  Business Details
                </button>
                <button
                  className={`modal-tab ${activeTab === "documents" ? "modal-tab-active" : ""}`}
                  onClick={() => setActiveTab("documents")}
                >
                  Documents & ID
                </button>
              </div>

              {activeTab === "details" ? (
                <>
                  {/* info grid */}
                  <div className="modal-info-grid">
                    <div className="modal-info-cell">
                      <div className="modal-field-label">Business Type</div>
                      <div className="modal-field-val">
                        {vendor.businessType}
                      </div>
                    </div>
                    <div className="modal-info-cell">
                      <div className="modal-field-label">Category</div>
                      <div className="modal-field-val">{vendor.category}</div>
                    </div>
                    <div className="modal-info-cell">
                      <div className="modal-field-label">Experience</div>
                      <div className="modal-field-val">{vendor.experience}</div>
                    </div>
                    <div className="modal-info-cell">
                      <div className="modal-field-label">Products Listed</div>
                      <div className="modal-field-val">
                        {vendor.productCount}
                      </div>
                    </div>
                  </div>

                  {/* contact */}
                  <div className="modal-section">
                    <div className="modal-section-label">
                      Contact Information
                    </div>
                    <div className="modal-contact-list">
                      <div className="modal-contact-item">
                        <div className="modal-contact-icon">
                          <EnvelopeSimple
                            size={13}
                            color="#22c55e"
                            weight="fill"
                          />
                        </div>
                        <div>
                          <div className="modal-contact-label">Email</div>
                          <div className="modal-contact-val">
                            {vendor.email}
                          </div>
                        </div>
                      </div>
                      <div className="modal-contact-item">
                        <div className="modal-contact-icon">
                          <Phone size={13} color="#22c55e" weight="fill" />
                        </div>
                        <div>
                          <div className="modal-contact-label">Phone</div>
                          <div className="modal-contact-val">
                            {vendor.phone}
                          </div>
                        </div>
                      </div>
                      <div className="modal-contact-item">
                        <div className="modal-contact-icon">
                          <MapPin size={13} color="#22c55e" weight="fill" />
                        </div>
                        <div>
                          <div className="modal-contact-label">Location</div>
                          <div className="modal-contact-val">
                            {vendor.location}
                          </div>
                        </div>
                      </div>
                      {vendor.website && (
                        <div className="modal-contact-item">
                          <div className="modal-contact-icon">
                            <Globe size={13} color="#22c55e" weight="fill" />
                          </div>
                          <div>
                            <div className="modal-contact-label">Website</div>
                            <div className="modal-contact-val">
                              {vendor.website}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* about */}
                  <div className="modal-section">
                    <div className="modal-section-label">About the Store</div>
                    <p className="modal-desc-text">{vendor.about}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="modal-section">
                    <div className="modal-section-label">
                      Submitted Documents
                    </div>
                    <div className="modal-docs-list">
                      {vendor.documents.map((doc, i) => (
                        <div key={i} className="modal-doc-item">
                          <div className="modal-doc-icon">
                            <IdentificationCard
                              size={14}
                              color="#22c55e"
                              weight="fill"
                            />
                          </div>
                          <div className="modal-doc-info">
                            <div className="modal-doc-name">{doc.name}</div>
                            <div className="modal-doc-status">{doc.status}</div>
                          </div>
                          <div
                            className={`modal-doc-badge modal-doc-badge-${doc.verified ? "ok" : "pending"}`}
                          >
                            {doc.verified ? (
                              <>
                                <CheckCircle size={10} weight="fill" /> Verified
                              </>
                            ) : (
                              <>
                                <Clock size={10} weight="fill" /> Pending
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="modal-section">
                    <div className="modal-section-label">ID Type</div>
                    <div className="modal-field-val" style={{ fontSize: 13 }}>
                      {vendor.idType}
                    </div>
                  </div>
                  <div className="modal-section">
                    <div className="modal-section-label">
                      RC / Registration Number
                    </div>
                    <div
                      className="modal-field-val"
                      style={{
                        fontSize: 13,
                        fontFamily: "monospace",
                        letterSpacing: "1px",
                      }}
                    >
                      {vendor.regNumber}
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {/* Approve confirm */}
          {confirmApprove ? (
            <div className="modal-confirm-wrap">
              <div className="modal-confirm-icon modal-confirm-icon-approve">
                <ShieldCheck size={22} color="#22c55e" weight="fill" />
              </div>
              <div className="modal-confirm-title">Approve this vendor?</div>
              <div className="modal-confirm-sub">
                <strong>{vendor.storeName}</strong> owned by{" "}
                <strong>{vendor.ownerName}</strong> will be activated and can
                start listing products immediately.
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
                <ShieldSlash size={22} color="#ef4444" weight="fill" />
              </div>
              <div className="modal-confirm-title">Reject this vendor?</div>
              <div className="modal-confirm-sub">
                <strong>{vendor.ownerName}</strong>'s application for{" "}
                <strong>{vendor.storeName}</strong> will be declined and they'll
                be notified.
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
                  placeholder="e.g. Invalid business registration, ID documents unclear, category not supported…"
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
                <ShieldCheck size={16} weight="bold" /> Approve Vendor
              </button>
              <button
                className="modal-btn modal-btn-reject"
                onClick={() => setConfirmReject(true)}
              >
                <ShieldSlash size={16} weight="bold" /> Reject Vendor
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Bulk bar
───────────────────────────────────────── */
function BulkBar({ count, onApproveAll, onRejectAll, onClear }) {
  if (count === 0) return null;
  return (
    <div className="bulk-bar fade-up">
      <span className="bulk-count">
        {count} vendor{count > 1 ? "s" : ""} selected
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
        <ShieldCheck size={36} color="#22c55e" weight="fill" />
      </div>
      <div className="qc-title">All vendors reviewed!</div>
      <div className="qc-sub">
        You've processed every vendor application in the queue.{" "}
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
        New vendor applications will appear here.
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Mock data
───────────────────────────────────────── */
const INITIAL_VENDORS = [
  {
    id: 1,
    storeName: "Sneaker Palace NG",
    ownerName: "Chukwuemeka Obi",
    email: "emeka@sneakerpalace.ng",
    phone: "+234 803 456 7890",
    location: "Lagos, Nigeria",
    category: "Footwear",
    businessType: "Sole Proprietor",
    experience: "3-5 years",
    productCount: 48,
    regNumber: "BN-2019-0087643",
    idType: "CAC Certificate",
    submittedAt: "2024-02-01",
    about:
      "Premium sneaker retailer specialising in authentic Nike, Adidas, and New Balance. We source directly from authorised distributors.",
    documents: [
      {
        name: "CAC Certificate",
        status: "Business Registration",
        verified: true,
      },
      { name: "NIN Slip", status: "National ID", verified: true },
      { name: "Utility Bill", status: "Proof of Address", verified: false },
    ],
  },
  {
    id: 2,
    storeName: "Fashion Hub Lagos",
    ownerName: "Adaeze Nwosu",
    email: "ada@fashionhub.ng",
    phone: "+234 807 123 4567",
    location: "Abuja, Nigeria",
    category: "Clothing",
    businessType: "LLC",
    experience: "5+ years",
    productCount: 124,
    regNumber: "RC-2017-0054321",
    idType: "Driver's Licence",
    submittedAt: "2024-01-28",
    about:
      "Curated fashion brand offering contemporary African and international styles for men and women. Established 2017.",
    documents: [
      {
        name: "CAC Certificate",
        status: "Business Registration",
        verified: true,
      },
      { name: "Driver's Licence", status: "Government ID", verified: true },
      {
        name: "Bank Statement",
        status: "Financial Verification",
        verified: true,
      },
    ],
  },
  {
    id: 3,
    storeName: "TechGear Africa",
    ownerName: "Babatunde Adewale",
    email: "tunde@techgear.africa",
    phone: "+234 815 987 6543",
    location: "Port Harcourt, NG",
    category: "Electronics",
    businessType: "Partnership",
    experience: "2-3 years",
    productCount: 35,
    regNumber: "BN-2021-0112983",
    idType: "Voters Card",
    submittedAt: "2024-01-25",
    about:
      "Your one-stop shop for quality tech accessories, gadgets, and electronics. We offer genuine products with warranties.",
    documents: [
      {
        name: "CAC Certificate",
        status: "Business Registration",
        verified: true,
      },
      { name: "Voters Card", status: "Government ID", verified: false },
      { name: "Utility Bill", status: "Proof of Address", verified: false },
    ],
  },
  {
    id: 4,
    storeName: "Kemi Couture",
    ownerName: "Oluwakemi Adeleke",
    email: "kemi@kemicouture.com",
    phone: "+234 708 234 5678",
    location: "Lagos, Nigeria",
    category: "Fashion",
    businessType: "Sole Proprietor",
    experience: "1-2 years",
    productCount: 67,
    regNumber: "BN-2022-0234567",
    idType: "International Passport",
    submittedAt: "2024-01-22",
    about:
      "Luxury ready-to-wear and bespoke clothing label celebrating Nigerian craftsmanship with a modern aesthetic.",
    documents: [
      {
        name: "CAC Certificate",
        status: "Business Registration",
        verified: true,
      },
      {
        name: "International Passport",
        status: "Government ID",
        verified: true,
      },
      {
        name: "Studio Address Proof",
        status: "Proof of Address",
        verified: false,
      },
    ],
  },
  {
    id: 5,
    storeName: "HomeDecor Naija",
    ownerName: "Eze Chibueze",
    email: "eze@homedecornaija.com",
    phone: "+234 801 345 6789",
    location: "Enugu, Nigeria",
    category: "Home & Decor",
    businessType: "LLC",
    experience: "3-5 years",
    productCount: 89,
    regNumber: "RC-2019-0098712",
    idType: "NIN Slip",
    submittedAt: "2024-01-20",
    about:
      "Premium home décor and furnishings. We bring global trends to Nigerian homes with locally crafted and imported pieces.",
    documents: [
      {
        name: "CAC Certificate",
        status: "Business Registration",
        verified: true,
      },
      { name: "NIN Slip", status: "National ID", verified: true },
      { name: "Utility Bill", status: "Proof of Address", verified: true },
    ],
  },
  {
    id: 6,
    storeName: "Fitness Kingdom",
    ownerName: "Rotimi Bankole",
    email: "rotimi@fitnesskingdom.ng",
    phone: "+234 812 456 7890",
    location: "Lagos, Nigeria",
    category: "Sports",
    businessType: "Sole Proprietor",
    experience: "2-3 years",
    productCount: 42,
    regNumber: "BN-2021-0178654",
    idType: "Driver's Licence",
    submittedAt: "2024-01-18",
    about:
      "Sports equipment, gym gear, and fitness accessories. We supply gyms and individual athletes across Nigeria.",
    documents: [
      {
        name: "CAC Certificate",
        status: "Business Registration",
        verified: true,
      },
      { name: "Driver's Licence", status: "Government ID", verified: true },
      {
        name: "Store Photos",
        status: "Physical Presence Proof",
        verified: false,
      },
    ],
  },
  {
    id: 7,
    storeName: "Little Stars Kids",
    ownerName: "Ngozi Okafor",
    email: "ngozi@littlestars.ng",
    phone: "+234 705 678 9012",
    location: "Ibadan, Nigeria",
    category: "Children",
    businessType: "Partnership",
    experience: "5+ years",
    productCount: 156,
    regNumber: "RC-2016-0043219",
    idType: "International Passport",
    submittedAt: "2024-01-15",
    about:
      "Everything for children — clothing, toys, educational materials, and nursery furniture. Trusted by thousands of Nigerian families.",
    documents: [
      {
        name: "CAC Certificate",
        status: "Business Registration",
        verified: true,
      },
      {
        name: "International Passport",
        status: "Government ID",
        verified: true,
      },
      {
        name: "NAFDAC Compliance",
        status: "Product Safety Cert",
        verified: false,
      },
    ],
  },
  {
    id: 8,
    storeName: "AutoParts Express",
    ownerName: "Emeka Nzewi",
    email: "emeka@autopartsxpress.ng",
    phone: "+234 818 789 0123",
    location: "Kano, Nigeria",
    category: "Automotive",
    businessType: "LLC",
    experience: "5+ years",
    productCount: 203,
    regNumber: "RC-2015-0032187",
    idType: "CAC Certificate",
    submittedAt: "2024-01-12",
    about:
      "Genuine and OEM auto parts for all vehicle makes. We stock over 5000 SKUs and offer same-day delivery in major cities.",
    documents: [
      {
        name: "CAC Certificate",
        status: "Business Registration",
        verified: true,
      },
      {
        name: "SON Certification",
        status: "Standards Compliance",
        verified: true,
      },
      {
        name: "Warehouse Photos",
        status: "Physical Presence Proof",
        verified: true,
      },
    ],
  },
];

/* ─────────────────────────────────────────
   Main page
───────────────────────────────────────── */
export default function ApproveVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [modalStartConfirm, setModalStartConfirm] = useState(false);
  const [modalStartApprove, setModalStartApprove] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const gridRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setVendors(INITIAL_VENDORS);
      setLoading(false);
    }, 900);
  }, []);

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

  const handleApprove = useCallback(
    (id) => {
      const v = vendors.find((x) => x.id === id);
      setVendors((prev) => prev.filter((x) => x.id !== id));
      setSelectedIds((prev) => prev.filter((x) => x !== id));
      setApprovedCount((c) => c + 1);
      if (v)
        showToast(
          "approve",
          "Vendor Approved!",
          `${v.storeName} is now active on the marketplace.`,
        );
    },
    [vendors, showToast],
  );

  const handleReject = useCallback(
    (id) => {
      const v = vendors.find((x) => x.id === id);
      setVendors((prev) => prev.filter((x) => x.id !== id));
      setSelectedIds((prev) => prev.filter((x) => x !== id));
      setRejectedCount((c) => c + 1);
      if (v)
        showToast(
          "reject",
          "Vendor Rejected",
          `${v.storeName}'s application has been declined.`,
        );
    },
    [vendors, showToast],
  );

  const handleBulkApprove = () => {
    const ids = [...selectedIds];
    ids.forEach((id) => {
      setVendors((prev) => prev.filter((x) => x.id !== id));
      setApprovedCount((c) => c + 1);
    });
    setSelectedIds([]);
    showToast(
      "approve",
      `${ids.length} Vendors Approved`,
      "They are now active on the marketplace.",
    );
  };

  const handleBulkReject = () => {
    const ids = [...selectedIds];
    ids.forEach((id) => {
      setVendors((prev) => prev.filter((x) => x.id !== id));
      setRejectedCount((c) => c + 1);
    });
    setSelectedIds([]);
    showToast(
      "reject",
      `${ids.length} Vendors Rejected`,
      "Applicants have been notified.",
    );
  };

  const toggleSelect = (id) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const handleCardApprove = (v) => {
    setModalStartApprove(true);
    setModalStartConfirm(false);
    setSelectedVendor(v);
  };
  const handleCardReject = (v) => {
    setModalStartConfirm(true);
    setModalStartApprove(false);
    setSelectedVendor(v);
  };
  const handleView = (v) => {
    setModalStartConfirm(false);
    setModalStartApprove(false);
    setSelectedVendor(v);
  };
  const handleModalClose = () => {
    setSelectedVendor(null);
    setModalStartConfirm(false);
    setModalStartApprove(false);
  };
  const scrollToGrid = () =>
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Footwear", label: "Footwear" },
    { value: "Clothing", label: "Clothing" },
    { value: "Fashion", label: "Fashion" },
    { value: "Electronics", label: "Electronics" },
    { value: "Sports", label: "Sports" },
    { value: "Children", label: "Children" },
    { value: "Automotive", label: "Automotive" },
    { value: "Home & Decor", label: "Home & Decor" },
  ];

  const filtered = vendors.filter((v) => {
    const s = searchTerm.toLowerCase();
    return (
      (v.storeName.toLowerCase().includes(s) ||
        v.ownerName.toLowerCase().includes(s) ||
        v.email.toLowerCase().includes(s)) &&
      (filterCategory === "all" || v.category === filterCategory)
    );
  });

  const totalProducts = vendors.reduce((s, v) => s + v.productCount, 0);
  const queueEmpty = !loading && vendors.length === 0;
  const noFilterResult =
    !loading && vendors.length > 0 && filtered.length === 0;

  return (
    <div className="av-root">
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .av-root { min-height: 100vh; background: #0a0a0a; font-family: 'Poppins', sans-serif; color: #fff; padding: 24px 28px; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease-out forwards; opacity: 0; }

        /* ── Hero ── */
        .hero-card { position: relative; overflow: hidden; width: 100%; border-radius: 20px; background: #0f3318; margin-bottom: 22px; height: 280px; animation: fadeUp 0.45s ease-out forwards; display: flex; border: 1px solid rgba(34,197,94,0.12); }
        .hero-grid-bg { position: absolute; inset: 0; background-image: linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px); background-size: 32px 32px; pointer-events: none; }
        .hero-left { flex: 1; padding: 40px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; position: relative; z-index: 2; }
        .hero-badge { display: inline-flex; align-items: center; gap: 5px; background: rgba(34,197,94,0.05); color: #22c55e; border: 1px solid rgba(34,197,94,0.4); font-size: 9px; font-weight: 700; padding: 4px 10px; border-radius: 8px; margin-bottom: 14px; letter-spacing: 0.6px; text-transform: uppercase; box-shadow: 0 0 8px rgba(34,197,94,0.2); }
        .hero-title { font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 12px; line-height: 1.25; letter-spacing: -0.5px; max-width: 400px; }
        .hero-sub { font-size: 13px; color: rgba(255,255,255,0.42); margin-bottom: 28px; line-height: 1.75; max-width: 380px; }
        .hero-actions { display: flex; gap: 12px; }

        /* ── CTA button — yellow to match ApproveProducts ── */
        .hero-btn-primary { display: flex; align-items: center; gap: 7px; padding: 11px 22px; background: #eab308; color: #000; border: none; border-radius: 12px; font-size: 13px; font-weight: 800; cursor: pointer; font-family: 'Poppins', sans-serif; transition: all 0.2s; box-shadow: 0 0 20px rgba(234,179,8,0.3); }
        .hero-btn-primary:hover { background: #facc15; transform: translateY(-1px); box-shadow: 0 0 30px rgba(234,179,8,0.45); }

        .hero-btn-ghost { padding: 11px 22px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.6); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'Poppins', sans-serif; transition: all 0.2s; }
        .hero-btn-ghost:hover { background: rgba(255,255,255,0.1); color: #fff; }

        /* ── Hero right — local image, same treatment as ApproveProducts ── */
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

        /* ── Vendor grid ── */
        .vendor-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px,1fr)); gap: 16px; }
        .vendor-card { background: #111; border: 1px solid rgba(255,255,255,0.06); border-radius: 18px; overflow: hidden; position: relative; transition: transform 0.3s cubic-bezier(0.34,1.4,0.64,1), border-color 0.25s, box-shadow 0.3s; }
        .vendor-card:hover { transform: translateY(-5px); border-color: rgba(34,197,94,0.28); box-shadow: 0 16px 48px rgba(0,0,0,0.5); }
        .vendor-card-selected { border-color: rgba(34,197,94,0.5) !important; box-shadow: 0 0 0 2px rgba(34,197,94,0.12) !important; }
        .vendor-checkbox-wrap { position: absolute; top: 12px; left: 12px; z-index: 10; cursor: pointer; }
        .vendor-checkbox { width: 20px; height: 20px; border-radius: 6px; border: 1.5px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
        .vendor-checkbox-on { background: #22c55e; border-color: #22c55e; }

        /* card header strip */
        .vendor-header { position: relative; height: 80px; overflow: hidden; background: #1a1a1a; }
        .vendor-header-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, rgba(17,17,17,0.92) 100%); }
        .vendor-pending-badge { position: absolute; top: 10px; right: 10px; background: rgba(34,197,94,0.1); backdrop-filter: blur(8px); border: 1px solid rgba(34,197,94,0.25); border-radius: 20px; padding: 3px 10px; font-size: 10px; font-weight: 700; color: #22c55e; display: flex; align-items: center; gap: 4px; }
        .vendor-category-badge { position: absolute; bottom: 8px; left: 12px; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 3px 10px; font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.65); }

        /* identity row */
        .vendor-identity { display: flex; align-items: center; gap: 10px; padding: 0 14px; position: relative; z-index: 2; margin-bottom: 12px; }
        .vendor-avatar { width: 46px; height: 46px; border-radius: 12px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; position: relative; border: 2px solid #111; background: linear-gradient(135deg, #1a4f2e, #0f2d1a); }
        .vendor-initials { font-size: 14px; font-weight: 900; color: #fff; }
        .vendor-avatar-ring { position: absolute; inset: -3px; border-radius: 14px; border: 1px solid rgba(34,197,94,0.3); pointer-events: none; }
        .vendor-name-block { flex: 1; min-width: 0; }
        .vendor-store-name { font-size: 13px; font-weight: 800; color: #fff; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .vendor-owner { font-size: 11px; color: rgba(255,255,255,0.35); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .vendor-products-pill { display: flex; align-items: center; gap: 4px; background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.18); border-radius: 20px; padding: 3px 9px; font-size: 10px; font-weight: 700; color: rgba(34,197,94,0.8); flex-shrink: 0; }

        .vendor-body { padding: 0 14px 14px; }
        .vendor-contact-row { display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px; }
        .vendor-contact-item { display: flex; align-items: center; gap: 6px; font-size: 11px; color: rgba(255,255,255,0.35); overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
        .vendor-info-row { display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 10px; }
        .vendor-info-pill { display: flex; align-items: center; gap: 4px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; padding: 3px 8px; font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.4); }
        .vendor-submitted { font-size: 10px; color: rgba(255,255,255,0.2); margin-bottom: 12px; }
        .vendor-actions { display: grid; grid-template-columns: 1fr 1.2fr 1fr; gap: 6px; }
        .vendor-btn { display: flex; align-items: center; justify-content: center; gap: 4px; padding: 8px 6px; border-radius: 7px; border: none; cursor: pointer; font-size: 11px; font-weight: 700; font-family: 'Poppins', sans-serif; transition: all 0.2s; }
        .vendor-btn-view    { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.6); border: 1px solid rgba(255,255,255,0.08); }
        .vendor-btn-view:hover    { background: rgba(255,255,255,0.1); color: #fff; }
        .vendor-btn-approve { background: rgba(34,197,94,0.12); color: #22c55e; border: 1px solid rgba(34,197,94,0.25); }
        .vendor-btn-approve:hover { background: #22c55e; color: #000; }
        .vendor-btn-reject  { background: rgba(239,68,68,0.08); color: rgba(239,68,68,0.7); border: 1px solid rgba(239,68,68,0.18); }
        .vendor-btn-reject:hover  { background: #ef4444; color: #fff; }

        /* ── Empty/Loading ── */
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

        .modal-hero { position: relative; height: 110px; overflow: hidden; border-radius: 18px 18px 0 0; background: #0f3318; }
        .modal-hero-pattern { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 24px 24px; }
        .modal-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 0%, rgba(15,15,15,0.6) 100%); }
        .modal-close-float { position: absolute; top: 14px; right: 14px; width: 30px; height: 30px; border-radius: 8px; background: rgba(0,0,0,0.5); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; cursor: pointer; color: rgba(255,255,255,0.7); transition: all 0.2s; z-index: 5; }
        .modal-close-float:hover { background: rgba(0,0,0,0.8); color: #fff; }
        .modal-hero-badge { position: absolute; top: 14px; left: 14px; background: rgba(34,197,94,0.15); backdrop-filter: blur(8px); border: 1px solid rgba(34,197,94,0.3); border-radius: 20px; padding: 4px 10px; font-size: 10px; font-weight: 700; color: #22c55e; display: flex; align-items: center; gap: 5px; }

        .modal-avatar-wrap { position: absolute; bottom: -22px; left: 22px; z-index: 3; }
        .modal-avatar { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; border: 3px solid #0f0f0f; box-shadow: 0 4px 16px rgba(0,0,0,0.5); background: linear-gradient(135deg, #1a4f2e, #0f2d1a); }
        .modal-avatar-initials { font-size: 16px; font-weight: 900; color: #fff; }
        .modal-name-block { padding: 30px 20px 0; margin-bottom: 4px; }
        .modal-store-name { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 2px; }
        .modal-owner-name { font-size: 12px; color: rgba(255,255,255,0.35); margin-bottom: 16px; }

        .modal-body { padding: 0 0 16px; }

        /* tabs */
        .modal-tabs { display: flex; gap: 4px; padding: 0 20px; margin-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .modal-tab { padding: 9px 14px; font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.35); border: none; background: transparent; cursor: pointer; font-family: 'Poppins', sans-serif; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all 0.2s; }
        .modal-tab:hover { color: rgba(255,255,255,0.6); }
        .modal-tab-active { color: #22c55e; border-bottom-color: #22c55e; }

        /* info grid */
        .modal-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 0 20px 14px; }
        .modal-info-cell { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 10px 12px; }
        .modal-field-label { font-size: 9px; font-weight: 700; color: rgba(255,255,255,0.25); text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 4px; }
        .modal-field-val { font-size: 13px; font-weight: 700; color: #fff; }

        /* contact */
        .modal-section { margin: 0 20px 14px; }
        .modal-section-label { font-size: 9px; font-weight: 700; color: rgba(255,255,255,0.25); text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 8px; }
        .modal-contact-list { display: flex; flex-direction: column; gap: 6px; }
        .modal-contact-item { display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 8px 12px; }
        .modal-contact-icon { width: 28px; height: 28px; border-radius: 8px; background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .modal-contact-label { font-size: 9px; font-weight: 700; color: rgba(255,255,255,0.25); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 1px; }
        .modal-contact-val { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.7); }
        .modal-desc-text { font-size: 12px; color: rgba(255,255,255,0.5); line-height: 1.6; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 10px 12px; }

        /* docs */
        .modal-docs-list { display: flex; flex-direction: column; gap: 6px; }
        .modal-doc-item { display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 10px 12px; }
        .modal-doc-icon { width: 32px; height: 32px; border-radius: 8px; background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .modal-doc-info { flex: 1; }
        .modal-doc-name { font-size: 12px; font-weight: 700; color: #fff; margin-bottom: 1px; }
        .modal-doc-status { font-size: 10px; color: rgba(255,255,255,0.3); }
        .modal-doc-badge { display: flex; align-items: center; gap: 4px; padding: 3px 9px; border-radius: 20px; font-size: 10px; font-weight: 700; flex-shrink: 0; }
        .modal-doc-badge-ok { background: rgba(34,197,94,0.1); color: #22c55e; border: 1px solid rgba(34,197,94,0.22); }
        .modal-doc-badge-pending { background: rgba(234,179,8,0.1); color: #eab308; border: 1px solid rgba(234,179,8,0.22); }

        /* actions */
        .modal-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 12px 20px 0; }
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

        /* confirm */
        .modal-confirm-wrap { margin: 14px 20px 0; padding: 22px 0; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 10px; animation: fadeIn 0.2s ease-out; }
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
        pending={vendors.length}
        approved={approvedCount}
        rejected={rejectedCount}
        totalProducts={totalProducts}
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
              placeholder="Search vendors, owners, emails…"
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
              <option value="pending">Pending ({vendors.length})</option>
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
            <div className="loading-text">Loading vendor applications…</div>
          </div>
        ) : queueEmpty ? (
          <QueueComplete approved={approvedCount} rejected={rejectedCount} />
        ) : noFilterResult ? (
          <div className="empty-state">
            <div className="empty-icon-wrap">
              <Storefront
                size={28}
                color="rgba(255,255,255,0.2)"
                weight="duotone"
              />
            </div>
            <div className="empty-title">No vendors found</div>
            <div className="empty-sub">
              Try adjusting your filters or search terms
            </div>
          </div>
        ) : (
          <div className="vendor-grid">
            {filtered.map((v, i) => (
              <VendorCard
                key={v.id}
                vendor={v}
                index={i}
                onApproveConfirm={handleCardApprove}
                onView={handleView}
                onRejectConfirm={handleCardReject}
                selected={selectedIds.includes(v.id)}
                onSelect={toggleSelect}
              />
            ))}
          </div>
        )}
      </div>

      <Toast toasts={toasts} />

      <VendorModal
        vendor={selectedVendor}
        onClose={handleModalClose}
        onApprove={handleApprove}
        onReject={handleReject}
        startOnConfirm={modalStartConfirm}
        startOnApproveConfirm={modalStartApprove}
      />
    </div>
  );
}
