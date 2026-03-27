import { useEffect, useState, useRef } from "react";
import {
  X,
  MagnifyingGlass,
  ArrowUp,
  ArrowDown,
  TrendUp,
  TrendDown,
  CurrencyNgn,
  ShoppingCart,
  Users,
  ShoppingBag,
  Eye,
  Star,
  ChartLine,
  ChartBar,
  CalendarBlank,
  ArrowClockwise,
  Warning,
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
              <TrendUp size={16} weight="fill" color="#22c55e" />
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
function HeroCard({ onRefresh }) {
  return (
    <div className="hero-card">
      <div className="hero-grid" />
      <div className="hero-left">
        <div className="hero-badge">
          <ChartLine size={11} weight="fill" /> Platform Analytics
        </div>
        <h1 className="hero-title">Track Your Platform Performance</h1>
        <p className="hero-sub">
          Monitor revenue, user growth, and sales metrics across the
          marketplace. Get real-time insights into platform performance and make
          data-driven decisions.
        </p>
        <p className="hero-date">
          Last 7 days · Last 30 days · Last 90 days · This Year
        </p>
        <div className="hero-actions">
          <button className="hero-btn-primary" onClick={onRefresh}>
            <ArrowClockwise size={15} weight="bold" /> Refresh Data
          </button>
          <button className="hero-btn-ghost" onClick={onRefresh}>
            View Reports
          </button>
        </div>
      </div>
      <div className="hero-right">
        <img
          src="/assets/categories/sneakers.jpeg"
          alt="Analytics Dashboard"
          className="hero-img"
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Stat Cards
───────────────────────────────────────── */
function StatCards({ revenue, orders, users, products }) {
  const revM = useCountUp(Math.floor(revenue / 1000000));
  const ordK = useCountUp(Math.floor(orders / 1000));
  const usrK = useCountUp(Math.floor(users / 1000));
  const prods = useCountUp(products);

  const cards = [
    {
      label: "Total Revenue",
      value: revM,
      suffix: "M",
      prefix: <span className="naira">₦</span>,
      sub: "Platform earnings",
      bar: 92,
      trend: "+12.5%",
      trendUp: true,
      delay: "60ms",
    },
    {
      label: "Total Orders",
      value: ordK,
      suffix: "k",
      prefix: "",
      sub: "All time orders",
      bar: 78,
      trend: "+8.3%",
      trendUp: true,
      delay: "120ms",
    },
    {
      label: "Total Users",
      value: usrK,
      suffix: "k",
      prefix: "",
      sub: "Registered accounts",
      bar: 85,
      trend: "+15.2%",
      trendUp: true,
      delay: "180ms",
    },
    {
      label: "Products Sold",
      value: prods,
      suffix: "",
      prefix: "",
      sub: "Across all vendors",
      bar: 65,
      trend: "-2.1%",
      trendUp: false,
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
   Revenue Chart Component
───────────────────────────────────────── */
function RevenueChart({ data }) {
  const maxRevenue = Math.max(...data.map((d) => d.revenue));

  return (
    <div className="chart-card fade-up">
      <div className="chart-header">
        <div className="chart-title-wrap">
          <CurrencyNgn size={16} weight="fill" color="#22c55e" />
          <h3 className="chart-title">Revenue Overview</h3>
        </div>
        <span className="chart-sub">Last 7 months performance</span>
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
   Weekly Performance Component
───────────────────────────────────────── */
function WeeklyPerformance({ data }) {
  const maxRevenue = Math.max(...data.map((d) => d.revenue));

  return (
    <div className="chart-card fade-up" style={{ animationDelay: "100ms" }}>
      <div className="chart-header">
        <div className="chart-title-wrap">
          <ChartBar size={16} weight="fill" color="#3b82f6" />
          <h3 className="chart-title">Weekly Performance</h3>
        </div>
        <span className="chart-sub">Daily revenue breakdown</span>
      </div>
      <div className="chart-body">
        <div className="weekly-list">
          {data.map((item, index) => (
            <div key={index} className="weekly-item">
              <span className="weekly-day">{item.day}</span>
              <div className="weekly-bar-track">
                <div
                  className="weekly-bar-fill"
                  style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                />
              </div>
              <span className="weekly-value">
                <span className="naira">₦</span>
                {(item.revenue / 1000).toFixed(0)}k
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Category Distribution Component
───────────────────────────────────────── */
function CategoryChart({ data }) {
  return (
    <div className="chart-card fade-up" style={{ animationDelay: "150ms" }}>
      <div className="chart-header">
        <div className="chart-title-wrap">
          <ShoppingBag size={16} weight="fill" color="#a855f7" />
          <h3 className="chart-title">Sales by Category</h3>
        </div>
        <span className="chart-sub">Product distribution</span>
      </div>
      <div className="chart-body">
        <div className="category-list">
          {data.map((item, index) => (
            <div key={index} className="category-item">
              <div className="category-info">
                <span className="category-name">{item.name}</span>
                <span className="category-value">{item.value}%</span>
              </div>
              <div className="category-bar-track">
                <div
                  className={`category-bar-fill ${item.colorClass}`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Top Products Component
───────────────────────────────────────── */
function TopProducts({ products }) {
  return (
    <div className="chart-card fade-up" style={{ animationDelay: "200ms" }}>
      <div className="chart-header">
        <div className="chart-title-wrap">
          <Star size={16} weight="fill" color="#f59e0b" />
          <h3 className="chart-title">Top Products</h3>
        </div>
        <span className="chart-sub">Best selling items</span>
      </div>
      <div className="chart-body">
        <div className="product-list">
          {products.map((product, index) => (
            <div key={index} className="product-item">
              <div className="product-rank">{index + 1}</div>
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-sales">{product.sales} sales</div>
              </div>
              <div className="product-revenue">
                <div className="product-amount">
                  ₦{(product.revenue / 1000000).toFixed(1)}M
                </div>
                <div
                  className={`product-growth ${product.growth >= 0 ? "positive" : "negative"}`}
                >
                  {product.growth >= 0 ? "+" : ""}
                  {product.growth}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Revenue Sources Component
───────────────────────────────────────── */
function RevenueSources({ sources }) {
  return (
    <div className="chart-card fade-up" style={{ animationDelay: "250ms" }}>
      <div className="chart-header">
        <div className="chart-title-wrap">
          <CurrencyNgn size={16} weight="fill" color="#22c55e" />
          <h3 className="chart-title">Revenue Sources</h3>
        </div>
        <span className="chart-sub">Income breakdown</span>
      </div>
      <div className="chart-body">
        <div className="source-list">
          {sources.map((source, index) => (
            <div key={index} className="source-item">
              <div className="source-info">
                <span className="source-name">{source.source}</span>
                <span className="source-amount">
                  ₦{source.amount.toLocaleString()}
                </span>
              </div>
              <div className="source-bar-track">
                <div
                  className="source-bar-fill"
                  style={{ width: `${source.percentage}%` }}
                />
              </div>
              <div className="source-percent">{source.percentage}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Metric Cards (Secondary Metrics)
───────────────────────────────────────── */
function MetricCards({ metrics }) {
  return (
    <div className="metrics-grid">
      {metrics.map((m, i) => (
        <div
          key={i}
          className="metric-card fade-up"
          style={{ animationDelay: `${300 + i * 50}ms` }}
        >
          <div className="metric-icon" style={{ background: m.iconBg }}>
            <m.icon size={20} weight="duotone" color={m.iconColor} />
          </div>
          <div className="metric-content">
            <div className="metric-label">{m.label}</div>
            <div className="metric-value">{m.value}</div>
            <div
              className={`metric-trend ${m.trendUp ? "trend-up" : "trend-down"}`}
            >
              {m.trendUp ? (
                <ArrowUp size={10} weight="bold" />
              ) : (
                <ArrowDown size={10} weight="bold" />
              )}
              {m.change} from last period
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Analytics Component
───────────────────────────────────────── */
export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7days");
  const [isLoading, setIsLoading] = useState(true);
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

  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  // Generate mock analytics data
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
      const currentMonth = new Date().getMonth();
      const sales = [];

      for (let i = 6; i >= 0; i--) {
        const monthIndex = (currentMonth - i + 12) % 12;
        sales.push({
          month: months[monthIndex],
          revenue: Math.floor(Math.random() * 5000000) + 800000,
          orders: Math.floor(Math.random() * 200) + 100,
        });
      }
      setSalesData(sales);

      setCategoryData([
        { name: "Sneakers", value: 35, colorClass: "cat-green" },
        { name: "Hoodies", value: 25, colorClass: "cat-blue" },
        { name: "Jackets", value: 20, colorClass: "cat-purple" },
        { name: "T-Shirts", value: 15, colorClass: "cat-orange" },
        { name: "Accessories", value: 5, colorClass: "cat-gray" },
      ]);

      setTopProducts([
        {
          name: "Nike Air Max 270",
          sales: 245,
          revenue: 12250000,
          growth: 12.5,
        },
        {
          name: "Adidas Ultraboost",
          sales: 198,
          revenue: 9900000,
          growth: 8.2,
        },
        { name: "Puma RS-X", sales: 167, revenue: 6680000, growth: -3.1 },
        { name: "New Balance 574", sales: 145, revenue: 6525000, growth: 15.8 },
        { name: "Vans Old Skool", sales: 132, revenue: 4620000, growth: 5.4 },
      ]);

      setRevenueData([
        { source: "Online Sales", amount: 4500000, percentage: 75 },
        { source: "Vendor Commission", amount: 900000, percentage: 15 },
        { source: "Advertising", amount: 450000, percentage: 7.5 },
        { source: "Premium Listings", amount: 150000, percentage: 2.5 },
      ]);

      setIsLoading(false);
    }, 800);
  }, [timeRange]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      addToast("success", "Data Refreshed", "Analytics data has been updated");
    }, 800);
  };

  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
  const averageOrderValue = totalRevenue / totalOrders || 0;
  const conversionRate = 3.2 + Math.random() * 2;

  const secondaryMetrics = [
    {
      label: "Avg Order Value",
      value: `₦${Math.round(averageOrderValue).toLocaleString()}`,
      change: "+5.2%",
      trendUp: true,
      icon: CurrencyNgn,
      iconBg: "rgba(59, 130, 246, 0.15)",
      iconColor: "#3b82f6",
    },
    {
      label: "Conversion Rate",
      value: `${conversionRate.toFixed(1)}%`,
      change: "+0.8%",
      trendUp: true,
      icon: TrendUp,
      iconBg: "rgba(168, 85, 247, 0.15)",
      iconColor: "#a855f7",
    },
    {
      label: "Page Views",
      value: "45,234",
      change: "+12.3%",
      trendUp: true,
      icon: Eye,
      iconBg: "rgba(245, 158, 11, 0.15)",
      iconColor: "#f59e0b",
    },
    {
      label: "Customer Rating",
      value: "4.8",
      change: "+0.2",
      trendUp: true,
      icon: Star,
      iconBg: "rgba(34, 197, 94, 0.15)",
      iconColor: "#22c55e",
    },
  ];

  const weeklyData = [
    { day: "Mon", revenue: 125000, orders: 45 },
    { day: "Tue", revenue: 158000, orders: 52 },
    { day: "Wed", revenue: 142000, orders: 48 },
    { day: "Thu", revenue: 175000, orders: 61 },
    { day: "Fri", revenue: 198000, orders: 72 },
    { day: "Sat", revenue: 225000, orders: 85 },
    { day: "Sun", revenue: 165000, orders: 58 },
  ];

  return (
    <div className="analytics-page">
      <Toast toasts={toasts} />

      {/* Hero Card */}
      <HeroCard onRefresh={handleRefresh} />

      {/* Loading State */}
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading analytics...</p>
        </div>
      ) : (
        <>
          {/* Stat Cards */}
          <StatCards
            revenue={totalRevenue}
            orders={totalOrders}
            users={12458}
            products={8234}
          />

          {/* Charts Row 1 */}
          <div className="charts-row">
            <RevenueChart data={salesData} />
            <WeeklyPerformance data={weeklyData} />
          </div>

          {/* Charts Row 2 */}
          <div className="charts-row-3">
            <CategoryChart data={categoryData} />
            <TopProducts products={topProducts} />
            <RevenueSources sources={revenueData} />
          </div>

          {/* Secondary Metrics */}
          <MetricCards metrics={secondaryMetrics} />
        </>
      )}

      {/* CSS Styles */}
      <style>{`
        .analytics-page {
          padding: 24px;
          max-width: 1600px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
          gap: 16px;
          flex-wrap: wrap;
        }

        .header-left {
          flex: 1;
        }

        .page-title {
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 4px 0;
        }

        .hero-date {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
          margin-top: -12px;
          margin-bottom: 20px;
        }
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
        }

        .header-right {
          display: flex;
          gap: 12px;
        }

        .header-select {
          padding: 10px 16px;
          background: #161d16;
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 10px;
          color: #fff;
          font-size: 13px;
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s;
        }

        .header-select:hover,
        .header-select:focus {
          border-color: rgba(34, 197, 94, 0.5);
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

        .hero-left { flex: 1; padding: 40px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; position: relative; z-index: 2; }

        .hero-right {
          position: relative;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, transparent 60%);
          overflow: hidden;
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
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, transparent 60%);
          overflow: hidden;
        }

        .hero-right::after { content: ''; position: absolute; bottom: 10px; left: 10%; right: 10%; height: 40px; background: radial-gradient(ellipse 80% 100% at 50% 100%, rgba(34,197,94,.3) 0%, transparent 70%); pointer-events: none; filter: blur(8px); }
        .hero-img { width: 90%; height: 90%; object-fit: contain; position: relative; z-index: 1; filter: drop-shadow(0 8px 32px rgba(34,197,94,.25)); transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1); }
        .hero-right:hover .hero-img { transform: translateY(-12px) scale(1.05); filter: drop-shadow(0 20px 50px rgba(34,197,94,.45)); }

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
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 16px;
        }

        .charts-row-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 16px;
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
          height: 220px;
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
          position: relative;
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

        /* Weekly Performance */
        .weekly-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .weekly-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .weekly-day {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          width: 32px;
        }

        .weekly-bar-track {
          flex: 1;
          height: 8px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          overflow: hidden;
        }

        .weekly-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #2563eb);
          border-radius: 4px;
          transition: width 0.6s ease-out;
        }

        .weekly-value {
          font-size: 12px;
          font-weight: 600;
          color: #fff;
          width: 50px;
          text-align: right;
        }

        /* Category List */
        .category-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .category-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .category-info {
          display: flex;
          justify-content: space-between;
        }

        .category-name {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
        }

        .category-value {
          font-size: 13px;
          font-weight: 600;
          color: #fff;
        }

        .category-bar-track {
          height: 6px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 3px;
          overflow: hidden;
        }

        .category-bar-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.6s ease-out;
        }

        .cat-green { background: linear-gradient(90deg, #22c55e, #16a34a); }
        .cat-blue { background: linear-gradient(90deg, #3b82f6, #2563eb); }
        .cat-purple { background: linear-gradient(90deg, #a855f7, #9333ea); }
        .cat-orange { background: linear-gradient(90deg, #f59e0b, #d97706); }
        .cat-gray { background: linear-gradient(90deg, #6b7280, #4b5563); }

        /* Product List */
        .product-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .product-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .product-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .product-rank {
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

        .product-info {
          flex: 1;
        }

        .product-name {
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 2px;
        }

        .product-sales {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
        }

        .product-revenue {
          text-align: right;
        }

        .product-amount {
          font-size: 13px;
          font-weight: 700;
          color: #fff;
        }

        .product-growth {
          font-size: 11px;
          font-weight: 600;
        }

        .product-growth.positive {
          color: #22c55e;
        }

        .product-growth.negative {
          color: #ef4444;
        }

        /* Source List */
        .source-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .source-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
        }

        .source-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .source-name {
          font-size: 13px;
          font-weight: 600;
          color: #fff;
        }

        .source-amount {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
        }

        .source-bar-track {
          height: 6px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 3px;
          overflow: hidden;
        }

        .source-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #22c55e, #16a34a);
          border-radius: 3px;
          transition: width 0.6s ease-out;
        }

        .source-percent {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
        }

        /* Metrics Grid */
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .metric-card {
          background: linear-gradient(160deg, #161d16 0%, #0f140f 70%, #0d120d 100%);
          border: 1px solid rgba(34, 197, 94, 0.18);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          box-shadow: 0 6px 28px rgba(0, 0, 0, 0.5);
        }

        .metric-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .metric-content {
          flex: 1;
        }

        .metric-label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 4px;
        }

        .metric-value {
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 6px;
        }

        .metric-trend {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: 11px;
          font-weight: 600;
        }

        .metric-trend.trend-up {
          color: #22c55e;
        }

        .metric-trend.trend-down {
          color: #ef4444;
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

        .toast-icon {
          flex-shrink: 0;
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

        /* Naira symbol */
        .naira {
          font-family: system-ui, -apple-system, sans-serif;
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .charts-row-3 {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .charts-row-3 .chart-card:last-child {
            grid-column: span 2;
          }
        }

        @media (max-width: 1024px) {
          .stats-bar,
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .charts-row,
          .charts-row-3 {
            grid-template-columns: 1fr;
          }

          .charts-row-3 .chart-card:last-child {
            grid-column: span 1;
          }

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
        }

        @media (max-width: 640px) {
          .stats-bar,
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
