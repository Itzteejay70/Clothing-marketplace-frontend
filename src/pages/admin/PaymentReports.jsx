import { useState, useEffect, useRef } from "react";
import {
  CurrencyNgn,
  CreditCard,
  ArrowDown,
  ArrowUp,
  MagnifyingGlass,
  Download,
  Funnel,
  Clock,
  CheckCircle,
  Warning,
  ArrowClockwise,
  CalendarBlank,
  X,
  Eye,
  Bank,
  Receipt,
  TrendUp,
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
function HeroCard({ onExport }) {
  return (
    <div className="hero-card">
      <div className="hero-grid" />
      <div className="hero-left">
        <div className="hero-badge">
          <Receipt size={11} weight="fill" /> Payment Reports
        </div>
        <h1 className="hero-title">Track All Platform Payments</h1>
        <p className="hero-sub">
          Monitor all payment transactions, track revenue, and manage payouts to
          vendors. Get detailed insights into payment flows.
        </p>
        <div className="hero-actions">
          <button className="hero-btn-primary" onClick={onExport}>
            <Download size={15} weight="bold" /> Export Report
          </button>
          <button className="hero-btn-ghost" onClick={onExport}>
            Generate Invoice
          </button>
        </div>
      </div>
      <div className="hero-right">
        <img
          src="/assets/categories/Removed-Bg-Nike-shoe.jpg"
          alt="Payments"
          className="hero-img"
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Stat Cards
───────────────────────────────────────── */
function StatCards({
  totalPayments,
  totalRevenue,
  platformFees,
  vendorPayouts,
}) {
  const tp = useCountUp(Math.floor(totalPayments / 1000));
  const tr = useCountUp(Math.floor(totalRevenue / 1000000));
  const pf = useCountUp(Math.floor(platformFees / 1000));
  const vp = useCountUp(Math.floor(vendorPayouts / 1000000));

  const cards = [
    {
      label: "Total Payments",
      value: tp,
      suffix: "k",
      prefix: "",
      sub: "All transactions",
      bar: 100,
      trend: "+12.5%",
      trendUp: true,
      delay: "60ms",
    },
    {
      label: "Total Revenue",
      value: tr,
      suffix: "M",
      prefix: <span className="naira">₦</span>,
      sub: "Platform earnings",
      bar: 92,
      trend: "+8.3%",
      trendUp: true,
      delay: "120ms",
    },
    {
      label: "Platform Fees",
      value: pf,
      suffix: "k",
      prefix: <span className="naira">₦</span>,
      sub: "Service charges",
      bar: 78,
      trend: "+5.2%",
      trendUp: true,
      delay: "180ms",
    },
    {
      label: "Vendor Payouts",
      value: vp,
      suffix: "M",
      prefix: <span className="naira">₦</span>,
      sub: "Paid to vendors",
      bar: 85,
      trend: "+10.1%",
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
   Payment Row
───────────────────────────────────────── */
function PaymentRow({ payment, onView, index }) {
  const getStatusBadge = (status) => {
    const configs = {
      completed: {
        color: "#22c55e",
        bg: "rgba(34,197,94,0.1)",
        label: "Completed",
      },
      pending: {
        color: "#f59e0b",
        bg: "rgba(245,158,11,0.1)",
        label: "Pending",
      },
      failed: { color: "#ef4444", bg: "rgba(239,68,68,0.1)", label: "Failed" },
      refunded: {
        color: "#8b5cf6",
        bg: "rgba(139,92,246,0.1)",
        label: "Refunded",
      },
    };
    return configs[status] || configs.pending;
  };

  const getMethodIcon = (method) => {
    return method === "card" ? CreditCard : Bank;
  };

  const MethodIcon = getMethodIcon(payment.paymentMethod);
  const statusConfig = getStatusBadge(payment.status);

  return (
    <div
      className="payment-row fade-up"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="payment-main">
        <div className="payment-id-wrap">
          <span className="payment-id">{payment.id}</span>
          <span className="payment-order">{payment.orderId}</span>
        </div>
        <div className="payment-customer">
          <div className="customer-name">{payment.customerName}</div>
          <div className="customer-email">{payment.customerEmail}</div>
        </div>
      </div>
      <div className="payment-details">
        <div className="pay-detail">
          <span className="pay-label">Amount</span>
          <span className="pay-value">
            <span className="naira">₦</span>
            {payment.amount.toLocaleString()}
          </span>
        </div>
        <div className="pay-detail">
          <span className="pay-label">Fee (10%)</span>
          <span className="pay-value fee">
            <span className="naira">₦</span>
            {payment.platformFee.toLocaleString()}
          </span>
        </div>
        <div className="pay-detail">
          <span className="pay-label">Vendor Gets</span>
          <span className="pay-value vendor">
            <span className="naira">₦</span>
            {payment.vendorAmount.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="payment-meta">
        <div className="method-badge">
          <MethodIcon size={12} weight="fill" />
          {payment.paymentMethod === "card"
            ? `•••• ${payment.cardLast4}`
            : payment.bank}
        </div>
        <div className="payment-date">
          <CalendarBlank size={10} weight="fill" />
          {new Date(payment.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>
      <div
        className="payment-status"
        style={{ color: statusConfig.color, background: statusConfig.bg }}
      >
        {statusConfig.label}
      </div>
      <button className="payment-view-btn" onClick={() => onView(payment)}>
        <Eye size={14} weight="bold" />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export default function PaymentReports() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("30days");
  const [selectedPayment, setSelectedPayment] = useState(null);
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
      setPayments([
        {
          id: "PAY-001",
          orderId: "ORD-1234",
          customerName: "John Doe",
          customerEmail: "john@example.com",
          amount: 45000,
          platformFee: 4500,
          vendorAmount: 40500,
          paymentMethod: "card",
          cardLast4: "4242",
          status: "completed",
          createdAt: "2024-01-15T10:30:00",
          vendor: "Kicks Store",
        },
        {
          id: "PAY-002",
          orderId: "ORD-1235",
          customerName: "Jane Smith",
          customerEmail: "jane@example.com",
          amount: 28000,
          platformFee: 2800,
          vendorAmount: 25200,
          paymentMethod: "transfer",
          bank: "GTBank",
          status: "completed",
          createdAt: "2024-01-15T09:15:00",
          vendor: "Fashion Hub NG",
        },
        {
          id: "PAY-003",
          orderId: "ORD-1236",
          customerName: "Mike Johnson",
          customerEmail: "mike@example.com",
          amount: 85000,
          platformFee: 8500,
          vendorAmount: 76500,
          paymentMethod: "card",
          cardLast4: "1234",
          status: "completed",
          createdAt: "2024-01-14T16:45:00",
          vendor: "Kicks Store",
        },
        {
          id: "PAY-004",
          orderId: "ORD-1237",
          customerName: "Sarah Williams",
          customerEmail: "sarah@example.com",
          amount: 35000,
          platformFee: 3500,
          vendorAmount: 31500,
          paymentMethod: "card",
          cardLast4: "5678",
          status: "pending",
          createdAt: "2024-01-14T14:20:00",
          vendor: "Street Wear Co",
        },
        {
          id: "PAY-005",
          orderId: "ORD-1238",
          customerName: "David Brown",
          customerEmail: "david@example.com",
          amount: 12000,
          platformFee: 1200,
          vendorAmount: 10800,
          paymentMethod: "transfer",
          bank: "First Bank",
          status: "completed",
          createdAt: "2024-01-14T11:00:00",
          vendor: "Sports Hub NG",
        },
        {
          id: "PAY-006",
          orderId: "ORD-1239",
          customerName: "Grace Okoro",
          customerEmail: "grace@example.com",
          amount: 67000,
          platformFee: 6700,
          vendorAmount: 60300,
          paymentMethod: "card",
          cardLast4: "9012",
          status: "completed",
          createdAt: "2024-01-13T15:30:00",
          vendor: "Kicks Store",
        },
        {
          id: "PAY-007",
          orderId: "ORD-1240",
          customerName: "James Wilson",
          customerEmail: "james@example.com",
          amount: 15000,
          platformFee: 1500,
          vendorAmount: 13500,
          paymentMethod: "transfer",
          bank: "Zenith Bank",
          status: "failed",
          createdAt: "2024-01-13T10:00:00",
          vendor: "Fashion Hub NG",
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.orderId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPayments = payments.length;
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const platformFees = payments.reduce((sum, p) => sum + p.platformFee, 0);
  const vendorPayouts = payments.reduce((sum, p) => sum + p.vendorAmount, 0);

  return (
    <div className="payments-page">
      <Toast toasts={toasts} />

      {/* Hero Card */}
      <HeroCard
        onExport={() =>
          addToast(
            "success",
            "Export Ready",
            "Payment report has been generated",
          )
        }
      />

      {/* Stat Cards */}
      <StatCards
        totalPayments={totalPayments}
        totalRevenue={totalRevenue}
        platformFees={platformFees}
        vendorPayouts={vendorPayouts}
      />

      {/* Filter Bar */}
      <div className="filter-bar fade-up" style={{ animationDelay: "300ms" }}>
        <div className="search-wrap">
          <MagnifyingGlass size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search payments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="filter-select"
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
          <option value="year">This Year</option>
        </select>
        <button className="refresh-btn">
          <ArrowClockwise size={16} weight="bold" />
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading payments...</p>
        </div>
      ) : (
        /* Payments List */
        <div className="payments-list">
          <div className="list-header">
            <span>Payment ID</span>
            <span>Customer</span>
            <span>Amount Breakdown</span>
            <span>Method</span>
            <span>Status</span>
            <span>Action</span>
          </div>
          {filteredPayments.map((payment, index) => (
            <PaymentRow
              key={payment.id}
              payment={payment}
              index={index}
              onView={(p) => setSelectedPayment(p)}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredPayments.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            <CurrencyNgn size={48} weight="duotone" />
          </div>
          <h3 className="empty-title">No payments found</h3>
          <p className="empty-sub">
            {searchQuery || statusFilter !== "all"
              ? "Try adjusting your filters"
              : "No payment transactions yet"}
          </p>
        </div>
      )}

      {/* CSS Styles */}
      <style>{`
        .payments-page {
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

        .filter-select {
          padding: 12px 16px;
          background: #161d16;
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 13px;
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s;
        }

        .filter-select:focus {
          border-color: rgba(34, 197, 94, 0.5);
        }

        .refresh-btn {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #161d16;
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.2s;
        }

        .refresh-btn:hover {
          border-color: rgba(34, 197, 94, 0.5);
          color: #22c55e;
        }

        /* Payments List */
        .payments-list {
          background: linear-gradient(160deg, #161d16 0%, #0f140f 70%, #0d120d 100%);
          border: 1px solid rgba(34, 197, 94, 0.18);
          border-radius: 16px;
          overflow: hidden;
        }

        .list-header {
          display: grid;
          grid-template-columns: 2fr 2fr 3fr 1.5fr 1fr 0.5fr;
          gap: 16px;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(34, 197, 94, 0.15);
          font-size: 11px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Payment Row */
        .payment-row {
          display: grid;
          grid-template-columns: 2fr 2fr 3fr 1.5fr 1fr 0.5fr;
          gap: 16px;
          padding: 16px 20px;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          transition: background 0.2s;
        }

        .payment-row:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .payment-row:last-child {
          border-bottom: none;
        }

        .payment-id-wrap {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .payment-id {
          font-size: 13px;
          font-weight: 700;
          color: #22c55e;
        }

        .payment-order {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
        }

        .customer-name {
          font-size: 13px;
          font-weight: 600;
          color: #fff;
        }

        .customer-email {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
        }

        .payment-details {
          display: flex;
          gap: 20px;
        }

        .pay-detail {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .pay-label {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.4);
        }

        .pay-value {
          font-size: 13px;
          font-weight: 600;
          color: #fff;
        }

        .pay-value.fee {
          color: rgba(255, 255, 255, 0.6);
        }

        .pay-value.vendor {
          color: #22c55e;
        }

        .method-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
          padding: 6px 10px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
        }

        .payment-date {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 4px;
        }

        .payment-status {
          font-size: 11px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 6px;
          text-align: center;
          text-transform: uppercase;
        }

        .payment-view-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.25);
          border-radius: 8px;
          color: #3b82f6;
          cursor: pointer;
          transition: all 0.2s;
        }

        .payment-view-btn:hover {
          background: #3b82f6;
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
          margin: 0;
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

          .list-header {
            display: none;
          }

          .payment-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .payment-details {
            flex-wrap: wrap;
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
        }
      `}</style>
    </div>
  );
}
