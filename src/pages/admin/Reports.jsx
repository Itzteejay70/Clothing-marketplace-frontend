import { useState, useEffect, useRef } from "react";
import {
  TrendUp,
  TrendDown,
  Download,
  CalendarBlank,
  ArrowClockwise,
  CurrencyNgn,
  ShoppingCart,
  Users,
  ShoppingBag,
  ArrowUp,
  ArrowDown,
  ChartBar,
  Star,
  Storefront,
  Warning,
  CheckCircle,
  CaretDown,
  Funnel,
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
          <ChartBar size={11} weight="fill" /> Sales Reports
        </div>
        <h1 className="hero-title">Comprehensive Sales Analytics</h1>
        <p className="hero-sub">
          Get detailed insights into your platform performance. Analyze sales
          trends, top performing categories, and vendor rankings.
        </p>
        <div className="hero-actions">
          <button className="hero-btn-primary" onClick={onExport}>
            <Download size={15} weight="bold" /> Export Report
          </button>
          <button className="hero-btn-ghost" onClick={onExport}>
            Schedule Report
          </button>
        </div>
      </div>
      <div className="hero-right">
        <img
          src="/assets/categories/Removed-Bg-Nike-shoe.jpg"
          alt="Reports"
          className="hero-img"
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Stat Cards
───────────────────────────────────────── */
function StatCards({ revenue, orders, users, conversion }) {
  const rv = useCountUp(Math.floor(revenue / 1000000));
  const od = useCountUp(Math.floor(orders / 1000));
  const us = useCountUp(Math.floor(users / 1000));
  const cv = useCountUp(parseFloat(conversion));

  const cards = [
    {
      label: "Total Revenue",
      value: rv,
      suffix: "M",
      prefix: <span className="naira">₦</span>,
      sub: "Platform revenue",
      bar: 100,
      trend: "+12.5%",
      trendUp: true,
      delay: "60ms",
    },
    {
      label: "Total Orders",
      value: od,
      suffix: "k",
      prefix: "",
      sub: "All time orders",
      bar: 78,
      trend: "+8.3%",
      trendUp: true,
      delay: "120ms",
    },
    {
      label: "New Users",
      value: us,
      suffix: "k",
      prefix: "",
      sub: "This period",
      bar: 65,
      trend: "+15.2%",
      trendUp: true,
      delay: "180ms",
    },
    {
      label: "Conversion Rate",
      value: cv,
      suffix: "%",
      prefix: "",
      sub: "Average rate",
      bar: 52,
      trend: "+0.8%",
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
            <span className={`stat-trend ${c.trendUp ? 'trend-up' : 'trend-down'}`}>
              {c.trendUp ? <ArrowUp size={10} weight="bold" /> : <ArrowDown size={10} weight="bold" />}
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
   Sales Chart Component
───────────────────────────────────────── */
function SalesChart({ data }) {
  const maxRevenue = Math.max(...data.map((d) => d.revenue));

  return (
    <div className="chart-card fade-up">
      <div className="chart-header">
        <div className="chart-title-wrap">
          <CurrencyNgn size={16} weight="fill" color="#22c55e" />
          <h3 className="chart-title">Revenue Trend</h3>
        </div>
        <span className="chart-sub">Monthly performance</span>
      </div>
      <div className="chart-body">
        <div className="bar-chart">
          {data.map((item, index) => (
            <div key={index} className="bar-item">
              <div className="bar-wrapper">
                <div
                  className="bar-fill"
                  style={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
                />
                <div className="bar-tooltip">
                  ₦{(item.revenue / 1000000).toFixed(1)}M
                </div>
              </div>
              <span className="bar-label">{item.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Top Categories Component
───────────────────────────────────────── */
function TopCategories({ categories }) {
  return (
    <div className="chart-card fade-up" style={{ animationDelay: "100ms" }}>
      <div className="chart-header">
        <div className="chart-title-wrap">
          <ShoppingBag size={16} weight="fill" color="#a855f7" />
          <h3 className="chart-title">Top Categories</h3>
        </div>
        <span className="chart-sub">By revenue</span>
      </div>
      <div className="chart-body">
        <div className="rank-list">
          {categories.map((cat, index) => (
            <div key={index} className="rank-item">
              <div className="rank-num">{index + 1}</div>
              <div className="rank-info">
                <div className="rank-name">{cat.name}</div>
                <div className="rank-revenue">
                  <span className="naira">₦</span>
                  {(cat.revenue / 1000000).toFixed(1)}M
                </div>
              </div>
              <div className={`rank-growth ${cat.growth >= 0 ? 'positive' : 'negative'}`}>
                {cat.growth >= 0 ? '+' : ''}{cat.growth}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Top Vendors Component
───────────────────────────────────────── */
function TopVendors({ vendors }) {
  return (
    <div className="chart-card fade-up" style={{ animationDelay: "150ms" }}>
      <div className="chart-header">
        <div className="chart-title-wrap">
          <Storefront size={16} weight="fill" color="#3b82f6" />
          <h3 className="chart-title">Top Vendors</h3>
        </div>
        <span className="chart-sub">By orders</span>
      </div>
      <div className="chart-body">
        <div className="rank-list">
          {vendors.map((vendor, index) => (
            <div key={index} className="rank-item">
              <div className="rank-num">{index + 1}</div>
              <div className="rank-info">
                <div className="rank-name">{vendor.name}</div>
                <div className="rank-meta">
                  {vendor.orders} orders · <span className="naira">₦</span>
                  {(vendor.revenue / 1000000).toFixed(1)}M
                </div>
              </div>
              <div className="rank-rating">
                <Star size={12} weight="fill" color="#f59e0b" />
                {vendor.rating}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export default function Reports() {
  const [timeRange, setTimeRange] = useState("30days");
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState([]);
  const [toasts, setToasts] = useState([]);

  const addToast = (type, title, sub) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, title, sub, removing: false }]);
    setTimeout(() => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, removing: true } : t)));
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, 3000);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const currentMonth = new Date().getMonth();
      const data = [];

      for (let i = 5; i >= 0; i--) {
        const monthIndex = (currentMonth - i + 12) % 12;
        data.push({
          month: months[monthIndex],
          revenue: Math.floor(Math.random() * 2000000) + 3000000,
          orders: Math.floor(Math.random() * 500) + 200,
          newUsers: Math.floor(Math.random() * 100) + 50,
          conversionRate: (Math.random() * 2 + 2).toFixed(1),
        });
      }
      setSalesData(data);
      setLoading(false);
    }, 800);
  }, [timeRange]);

  const totalRevenue = salesData.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = salesData.reduce((sum, d) => sum + d.orders, 0);
  const totalUsers = salesData.reduce((sum, d) => sum + d.newUsers, 0);
  const avgConversion = (
    salesData.reduce((sum, d) => sum + parseFloat(d.conversionRate), 0) /
    salesData.length
  ).toFixed(1);

  const topCategories = [
    { name: "Sneakers", revenue: 12500000, growth: 18.5 },
    { name: "Hoodies", revenue: 8200000, growth: 12.3 },
    { name: "Jackets", revenue: 6500000, growth: -5.2 },
    { name: "T-Shirts", revenue: 4200000, growth: 8.7 },
  ];

  const topVendors = [
    { name: "Kicks Store", orders: 456, revenue: 18500000, rating: 4.8 },
    { name: "Fashion Hub NG", orders: 312, revenue: 12400000, rating: 4.6 },
    { name: "Street Wear Co", orders: 289, revenue: 9800000, rating: 4.5 },
    { name: "Sports Hub NG", orders: 234, revenue: 8200000, rating: 4.7 },
  ];

  return (
    <div className="reports-page">
      <Toast toasts={toasts} />

      {/* Hero Card */}
      <HeroCard onExport={() => addToast("success", "Report Ready", "Your report has been generated")} />

      {/* Filter Bar */}
      <div className="filter-bar fade-up" style={{ animationDelay: "50ms" }}>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
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
          <p className="loading-text">Loading reports...</p>
        </div>
      ) : (
        <>
          {/* Stat Cards */}
          <StatCards
            revenue={totalRevenue}
            orders={totalOrders}
            users={totalUsers}
            conversion={avgConversion}
          />

          {/* Charts Row */}
          <div className="charts-row">
            <SalesChart data={salesData} />
            <TopCategories categories={topCategories} />
            <TopVendors vendors={topVendors} />
          </div>
        </>
      )}

      {/* CSS Styles */}
      <style>{`
        .reports-page {
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

        /* Filter Bar */
        .filter-bar {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
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

        /* Charts Row */
        .charts-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .chart-card {
          background: linear-gradient(160deg, #161d16 0%, #0f140f 70%, #0d120d 100%);
          border: 1px solid rgba(34, 197, 94, 0.18);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 6px 28px rgba(0, 0, 0, 0.5);
        }

        .chart-header {
          padding: 20px 20px 0 20px;
          margin-bottom: 16px;
        }

        .chart-title-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .chart-title {
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          margin: 0;
        }

        .chart-sub {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
        }

        .chart-body {
          padding: 0 20px 20px 20px;
        }

        /* Bar Chart */
        .bar-chart {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 180px;
          gap: 8px;
        }

        .bar-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
        }

        .bar-wrapper {
          flex: 1;
          width: 100%;
          display: flex;
          align-items: flex-end;
          position: relative;
        }

        .bar-fill {
          width: 100%;
          background: linear-gradient(180deg, #22c55e 0%, #16a34a 100%);
          border-radius: 6px 6px 0 0;
          min-height: 8px;
          transition: height 0.6s ease-out;
        }

        .bar-fill:hover {
          background: linear-gradient(180deg, #4ade80 0%, #22c55e 100%);
        }

        .bar-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: #1a1a1a;
          border: 1px solid rgba(34, 197, 94, 0.3);
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          color: #22c55e;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s;
          margin-bottom: 8px;
        }

        .bar-wrapper:hover .bar-tooltip {
          opacity: 1;
        }

        .bar-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 8px;
        }

        /* Rank List */
        .rank-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .rank-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
          transition: background 0.2s;
        }

        .rank-item:hover {
          background: rgba(255, 255, 255, 0.06);
        }

        .rank-num {
          width: 28px;
          height: 28px;
          background: rgba(34, 197, 94, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.25);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          color: #22c55e;
        }

        .rank-info {
          flex: 1;
        }

        .rank-name {
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 2px;
        }

        .rank-revenue {
          font-size: 12px;
          color: #22c55e;
          font-weight: 600;
        }

        .rank-meta {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
        }

        .rank-growth {
          font-size: 12px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 6px;
        }

        .rank-growth.positive {
          color: #22c55e;
          background: rgba(34, 197, 94, 0.12);
        }

        .rank-growth.negative {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.12);
        }

        .rank-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 600;
          color: #f59e0b;
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

          .charts-row {
            grid-template-columns: 1fr;
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
        }
      `}</style>
    </div>
  );
}
