import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Users,
  ShoppingCart,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  TrendUp,
  TrendDown,
  Clock,
  CheckCircle,
  Star,
  MapPin,
  CreditCard,
  Tag,
  SealCheck,
  UsersFour,
  SmileySad,
} from "@phosphor-icons/react";

/* ── tiny sparkline SVG ── */
function Sparkline({ data, color, positive }) {
  const w = 120,
    h = 48;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 6) - 3;
    return `${x},${y}`;
  });
  const polyline = pts.join(" ");
  const area = `M0,${h} L${pts[0].split(",")[0]},${pts[0].split(",")[1]} ${pts
    .slice(1)
    .map((p) => `L${p}`)
    .join(" ")} L${w},${h} Z`;

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#grad-${color})`} />
      <polyline
        points={polyline}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function genSparkline(base, len = 12) {
  const d = [];
  let v = base;
  for (let i = 0; i < len; i++) {
    v += (Math.random() - 0.46) * base * 0.15;
    d.push(Math.max(0, v));
  }
  return d;
}

/* ── Area Chart ── */
function AreaChart({ salesData }) {
  const svgRef = useRef(null);
  const rafRef = useRef(null);
  // smoothed hover x — lerps toward target each frame
  const smoothXRef = useRef(null);
  const targetXRef = useRef(null);
  const [renderX, setRenderX] = useState(null);
  const [activeI, setActiveI] = useState(null);

  const ordersData = useMemo(
    () =>
      salesData.map((d) => ({
        ...d,
        orders: Math.floor(d.sales * 0.00075 + 20 + (d.sales % 31)),
      })),
    [salesData],
  );

  const W = 520,
    H = 240,
    padL = 52,
    padR = 12,
    padT = 16,
    padB = 36;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const maxRev = Math.max(...salesData.map((d) => d.sales));
  const minRev = Math.min(...salesData.map((d) => d.sales)) * 0.82;
  const maxOrd = Math.max(...ordersData.map((d) => d.orders));
  const minOrd = Math.min(...ordersData.map((d) => d.orders)) * 0.82;

  const xPos = useCallback(
    (i) => padL + (i / (salesData.length - 1)) * chartW,
    [salesData.length, chartW],
  );
  const yRevPos = useCallback(
    (v) => padT + chartH - ((v - minRev) / (maxRev - minRev)) * chartH,
    [minRev, maxRev, chartH],
  );
  const yOrdPos = useCallback(
    (v) => padT + chartH - ((v - minOrd) / (maxOrd - minOrd)) * chartH,
    [minOrd, maxOrd, chartH],
  );

  const smoothPath = (points) => {
    if (points.length < 2) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const cpx1 = points[i].x + (points[i + 1].x - points[i].x) * 0.45;
      const cpx2 = points[i + 1].x - (points[i + 1].x - points[i].x) * 0.45;
      d += ` C ${cpx1} ${points[i].y}, ${cpx2} ${points[i + 1].y}, ${points[i + 1].x} ${points[i + 1].y}`;
    }
    return d;
  };

  const revPoints = useMemo(
    () => salesData.map((d, i) => ({ x: xPos(i), y: yRevPos(d.sales) })),
    [salesData, xPos, yRevPos],
  );
  const ordPoints = useMemo(
    () => ordersData.map((d, i) => ({ x: xPos(i), y: yOrdPos(d.orders) })),
    [ordersData, xPos, yOrdPos],
  );
  const revPath = useMemo(() => smoothPath(revPoints), [revPoints]);
  const ordPath = useMemo(() => smoothPath(ordPoints), [ordPoints]);
  const revArea = useMemo(
    () =>
      revPath +
      ` L ${xPos(salesData.length - 1)} ${padT + chartH} L ${padL} ${padT + chartH} Z`,
    [revPath, xPos, salesData.length, chartH],
  );
  const ordArea = useMemo(
    () =>
      ordPath +
      ` L ${xPos(salesData.length - 1)} ${padT + chartH} L ${padL} ${padT + chartH} Z`,
    [ordPath, xPos, salesData.length, chartH],
  );
  const yTicks = Array.from(
    { length: 6 },
    (_, i) => minRev + ((maxRev - minRev) / 5) * i,
  );

  // lerp animation loop — runs only while hovering
  const startLerp = useCallback(() => {
    if (rafRef.current) return;
    const loop = () => {
      if (targetXRef.current == null) {
        rafRef.current = null;
        return;
      }
      const cur = smoothXRef.current ?? targetXRef.current;
      const next = cur + (targetXRef.current - cur) * 0.1; // smoother wave lerp
      smoothXRef.current = next;

      // find nearest index to smoothed position
      let best = 0,
        bestDist = Infinity;
      for (let i = 0; i < salesData.length; i++) {
        const dist = Math.abs(xPos(i) - next);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      }
      setRenderX(next);
      setActiveI(best);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  }, [salesData.length, xPos]);

  const handleMouseMove = useCallback(
    (e) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const raw = ((e.clientX - rect.left) / rect.width) * W;
      targetXRef.current = Math.max(padL, Math.min(W - padR, raw));
      if (smoothXRef.current == null) smoothXRef.current = targetXRef.current;
      startLerp();
    },
    [startLerp],
  );

  const handleMouseLeave = useCallback(() => {
    targetXRef.current = null;
    smoothXRef.current = null;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setRenderX(null);
    setActiveI(null);
  }, []);

  const totalRevenue = useMemo(
    () => salesData.reduce((s, d) => s + d.sales, 0),
    [salesData],
  );
  const ti = activeI;

  return (
    <div>
      <div className="chart-header">
        <div>
          <div className="chart-title">Sales Analytics</div>
          <div className="chart-top-stat">
            <span className="naira-sym">₦</span>
            {totalRevenue.toLocaleString("en-NG")}
          </div>
          <div className="chart-top-sub">Total revenue · last 7 months</div>
        </div>
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-line" style={{ background: "#22c55e" }} />
            Revenue
          </div>
          <div className="legend-item">
            <div className="legend-line" style={{ background: "#3b82f6" }} />
            Orders
          </div>
        </div>
      </div>

      <div className="area-chart-wrap" onMouseLeave={handleMouseLeave}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: "100%", height: "auto", cursor: "pointer" }}
          onMouseMove={handleMouseMove}
        >
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.28" />
              <stop offset="75%" stopColor="#22c55e" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ordGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="75%" stopColor="#3b82f6" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <filter
              id="glow-green"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* grid lines + y labels */}
          {yTicks.map((v, i) => {
            const y = yRevPos(v);
            return (
              <g key={i}>
                <line
                  x1={padL}
                  y1={y}
                  x2={W - padR}
                  y2={y}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                />
                <text
                  x={padL - 8}
                  y={y + 4}
                  fontSize="9"
                  fill="rgba(255,255,255,0.22)"
                  textAnchor="end"
                  fontFamily="Poppins,sans-serif"
                >
                  {v >= 1000000
                    ? `₦${(v / 1000000).toFixed(1)}M`
                    : `₦${(v / 1000).toFixed(0)}k`}
                </text>
              </g>
            );
          })}

          {/* x labels */}
          {salesData.map((d, i) => (
            <text
              key={i}
              x={xPos(i)}
              y={H - 8}
              fontSize="10"
              textAnchor="middle"
              fontFamily="Poppins,sans-serif"
              fill={
                i === salesData.length - 1
                  ? "#22c55e"
                  : "rgba(255,255,255,0.28)"
              }
              fontWeight={i === salesData.length - 1 ? "700" : "500"}
            >
              {d.month}
            </text>
          ))}

          {/* orders area — behind */}
          <path d={ordArea} fill="url(#ordGrad)" />
          <path
            d={ordPath}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1.2"
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* revenue area — front */}
          <path d={revArea} fill="url(#revGrad)" />
          <path
            d={revPath}
            fill="none"
            stroke="#22c55e"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            filter="url(#glow-green)"
          />

          {/* smooth continuous vertical line */}
          {renderX != null && (
            <line
              x1={renderX}
              y1={padT}
              x2={renderX}
              y2={padT + chartH}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          )}

          {/* dots snap to nearest data point */}
          {ti != null && (
            <g style={{ pointerEvents: "none" }}>
              <circle
                cx={revPoints[ti].x}
                cy={revPoints[ti].y}
                r="7"
                fill="#22c55e"
                opacity="0.15"
              />
              <circle
                cx={revPoints[ti].x}
                cy={revPoints[ti].y}
                r="3.5"
                fill="#22c55e"
                filter="url(#glow-green)"
              />
              <circle
                cx={revPoints[ti].x}
                cy={revPoints[ti].y}
                r="2"
                fill="#fff"
              />
              <circle
                cx={ordPoints[ti].x}
                cy={ordPoints[ti].y}
                r="5.5"
                fill="#3b82f6"
                opacity="0.18"
              />
              <circle
                cx={ordPoints[ti].x}
                cy={ordPoints[ti].y}
                r="3"
                fill="#3b82f6"
              />
              <circle
                cx={ordPoints[ti].x}
                cy={ordPoints[ti].y}
                r="1.6"
                fill="#fff"
              />
            </g>
          )}
        </svg>

        {/* tooltip fades in/out, slides with lerped position */}
        <div
          className="chart-tooltip"
          style={{
            left: ti != null ? `${(revPoints[ti].x / W) * 100}%` : "50%",
            top: ti != null ? `${(revPoints[ti].y / H) * 100}%` : "50%",
            transform: "translate(-50%, calc(-100% - 14px))",
            opacity: ti != null ? 1 : 0,
            pointerEvents: "none",
            transition: "left 0.12s ease, top 0.12s ease, opacity 0.2s ease",
          }}
        >
          {ti != null && (
            <>
              <div className="tooltip-label">{salesData[ti].month}</div>
              <div className="tooltip-row">
                <div
                  className="tooltip-dot"
                  style={{ background: "#22c55e" }}
                />
                <span style={{ fontWeight: 700 }}>
                  ₦{salesData[ti].sales.toLocaleString("en-NG")}
                </span>
              </div>
              <div className="tooltip-row">
                <div
                  className="tooltip-dot"
                  style={{ background: "#3b82f6" }}
                />
                <span style={{ color: "rgba(255,255,255,0.55)" }}>
                  {ordersData[ti]?.orders} orders
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    totalVendors: 0,
    activeUsers: 0,
    pendingProducts: 0,
    pendingVendors: 0,
    todayOrders: 0,
    todayRevenue: 0,
    conversionRate: 0,
    averageOrderValue: 0,
  });

  const [timeRange, setTimeRange] = useState("7days");

  const generateSalesData = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentMonth = new Date().getMonth();
    return Array.from({ length: 7 }, (_, i) => ({
      month: months[(currentMonth - (6 - i) + 12) % 12],
      sales: Math.floor(Math.random() * 50000) + 120000,
    }));
  };

  const [salesData] = useState(generateSalesData);

  const sparklines = {
    revenue: genSparkline(24500000),
    orders: genSparkline(289),
    users: genSparkline(1234),
    products: genSparkline(150),
  };

  const [topProducts] = useState([
    {
      name: "Nike Air Max 270",
      sales: 145,
      revenue: 6525000,
      stock: 45,
      category: "Sneakers",
    },
    {
      name: "Adidas Ultraboost",
      sales: 132,
      revenue: 6864000,
      stock: 32,
      category: "Sneakers",
    },
    {
      name: "Puma RS-X",
      sales: 98,
      revenue: 3920000,
      stock: 67,
      category: "Sneakers",
    },
    {
      name: "New Balance 574",
      sales: 87,
      revenue: 3915000,
      stock: 23,
      category: "Sneakers",
    },
    {
      name: "Reebok Club C",
      sales: 76,
      revenue: 2660000,
      stock: 89,
      category: "Sneakers",
    },
  ]);

  const [recentOrders] = useState([
    {
      id: "#ORD-001",
      customer: "John Doe",
      amount: 45000,
      status: "completed",
      time: "2 mins ago",
      items: 3,
    },
    {
      id: "#ORD-002",
      customer: "Jane Smith",
      amount: 89000,
      status: "pending",
      time: "15 mins ago",
      items: 5,
    },
    {
      id: "#ORD-003",
      customer: "Mike Johnson",
      amount: 234000,
      status: "processing",
      time: "1 hour ago",
      items: 8,
    },
    {
      id: "#ORD-004",
      customer: "Sarah Williams",
      amount: 56000,
      status: "completed",
      time: "2 hours ago",
      items: 2,
    },
    {
      id: "#ORD-005",
      customer: "David Brown",
      amount: 125000,
      status: "processing",
      time: "3 hours ago",
      items: 6,
    },
  ]);

  const [topCustomers] = useState([
    { name: "John Doe", orders: 24, spent: 1250000, location: "Lagos" },
    { name: "Jane Smith", orders: 18, spent: 980000, location: "Abuja" },
    {
      name: "Mike Johnson",
      orders: 15,
      spent: 750000,
      location: "Port Harcourt",
    },
    { name: "Sarah Williams", orders: 12, spent: 620000, location: "Ibadan" },
  ]);

  const [categoryPerformance] = useState([
    { name: "Sneakers", sales: 45, revenue: 12500000, percentage: 45 },
    { name: "Hoodies", sales: 32, revenue: 8900000, percentage: 32 },
    { name: "Jackets", sales: 18, revenue: 6200000, percentage: 18 },
    { name: "Plain Tees", sales: 12, revenue: 3400000, percentage: 12 },
  ]);

  const [recentActivity] = useState([
    {
      type: "order",
      message: "New order #ORD-001 from John Doe",
      time: "2 mins ago",
      color: "green",
    },
    {
      type: "product",
      message: "Nike Air Max added by vendor",
      time: "15 mins ago",
      color: "blue",
    },
    {
      type: "user",
      message: "New user registration: Jane Smith",
      time: "1 hour ago",
      color: "purple",
    },
    {
      type: "vendor",
      message: "Vendor approval request from Kicks Store",
      time: "2 hours ago",
      color: "orange",
    },
    {
      type: "payment",
      message: "Payment received: ₦150,000",
      time: "3 hours ago",
      color: "green",
    },
  ]);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalProducts: 150,
        totalOrders: 289,
        totalUsers: 1234,
        totalRevenue: 24500000,
        totalVendors: 45,
        activeUsers: 89,
        pendingProducts: 12,
        pendingVendors: 5,
        todayOrders: 23,
        todayRevenue: 1250000,
        conversionRate: 3.2,
        averageOrderValue: 85000,
      });
    }, 300);
  }, []);

  /* ── Stat card definitions ── */
  const fmt = (n) => n.toLocaleString("en-NG");

  const statCards = [
    {
      label: "Total Revenue",
      value: fmt(stats.totalRevenue),
      spark: sparklines.revenue,
      color: "#22c55e",
      badgeLabel: "REVENUE",
      badgeBg: "rgba(34,197,94,0.15)",
      badgeColor: "#22c55e",
      growth: "+18.7%",
      isPositive: true,
      subtitle: `₦${stats.todayRevenue.toLocaleString("en-NG")} today`,
      link: "/admin/payments",
    },
    {
      label: "Total Orders",
      value: fmt(stats.totalOrders),
      spark: sparklines.orders,
      color: "#f97316",
      badgeLabel: "ORDERS",
      badgeBg: "rgba(249,115,22,0.15)",
      badgeColor: "#f97316",
      growth: "+8.3%",
      isPositive: true,
      subtitle: `${stats.todayOrders} orders today`,
      link: "/admin/orders",
      noSymbol: true,
    },
    {
      label: "Total Users",
      value: fmt(stats.totalUsers),
      spark: sparklines.users,
      color: "#3b82f6",
      badgeLabel: "USERS",
      badgeBg: "rgba(59,130,246,0.15)",
      badgeColor: "#3b82f6",
      growth: "+15.2%",
      isPositive: true,
      subtitle: `${stats.activeUsers} active now`,
      link: "/admin/users",
      noSymbol: true,
    },
    {
      label: "Total Products",
      value: fmt(stats.totalProducts),
      spark: sparklines.products,
      color: "#a855f7",
      badgeLabel: "PRODUCTS",
      badgeBg: "rgba(168,85,247,0.15)",
      badgeColor: "#a855f7",
      growth: "+12.5%",
      isPositive: true,
      subtitle: `${stats.pendingProducts} pending`,
      link: "/admin/products",
      noSymbol: true,
    },
  ];

  const quickStats = [
    {
      label: "Avg. Order Value",
      value: fmt(stats.averageOrderValue),
      color: "#3b82f6",
      symbol: true,
    },
    {
      label: "Conversion Rate",
      value: `${stats.conversionRate}%`,
      color: "#22c55e",
    },
    { label: "Active Vendors", value: stats.totalVendors, color: "#a855f7" },
    {
      label: "Pending Items",
      value: stats.pendingProducts + stats.pendingVendors,
      color: "#f97316",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return { bg: "rgba(22,163,74,0.12)", text: "#22c55e" };
      case "pending":
        return { bg: "rgba(245,158,11,0.12)", text: "#f59e0b" };
      case "processing":
        return { bg: "rgba(59,130,246,0.12)", text: "#60a5fa" };
      default:
        return { bg: "rgba(107,114,128,0.12)", text: "#9ca3af" };
    }
  };

  const avatarColors = [
    "rgba(34,197,94,0.15)",
    "rgba(34,197,94,0.15)",
    "rgba(34,197,94,0.15)",
    "rgba(34,197,94,0.15)",
    "rgba(34,197,94,0.15)",
    "rgba(34,197,94,0.15)",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

        .dash-root * { box-sizing: border-box; }

        .dash-root {
          font-family: 'Poppins', sans-serif;
          background: #0a0a0a;
          min-height: 100vh;
          padding: 28px 32px;
        }

        .dash-content { max-width: 1400px; margin: 0 auto; }

        /* ── Header ── */
        .dash-header { 
          margin-bottom: 20px; margin-top: -8px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .dash-header-left { flex: 1; }
        .dash-header-right { 
          display: flex; 
          align-items: center; 
        }
        .current-date {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.05);
          padding: 8px 14px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .dash-header h1 {
          font-size: 22px; font-weight: 700; color: #fff;
          margin: 0 0 4px; letter-spacing: -0.3px;
        }
        .dash-header p { font-size: 13px; color: rgba(255,255,255,0.38); margin: 0; font-weight: 400; }

        /* ── STAT CARDS ── */
        .stat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 14px;
        }
        @media (max-width: 1100px) { .stat-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 600px)  { .stat-grid { grid-template-columns: 1fr; } }

        /* dark scrollbar */
        * { scrollbar-width: thin; scrollbar-color: #333 #0a0a0a; }
        *::-webkit-scrollbar { width: 6px; height: 6px; }
        *::-webkit-scrollbar-track { background: #0a0a0a; }
        *::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 999px; }
        *::-webkit-scrollbar-thumb:hover { background: #3a3a3a; }

        .stat-card {
          display: block; text-decoration: none;
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 18px 20px 14px;
          position: relative; overflow: hidden;
          transition: transform 0.35s cubic-bezier(0.34,1.6,0.64,1),
                      box-shadow 0.35s ease,
                      border-color 0.25s ease,
                      background 0.25s ease;
          cursor: pointer;
          will-change: transform;
        }

        /* shimmer sweep on hover */
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: -80%;
          width: 60%; height: 100%;
          background: linear-gradient(
            110deg,
            transparent 20%,
            rgba(255,255,255,0.06) 50%,
            transparent 80%
          );
          transform: skewX(-12deg);
          transition: left 0.6s ease;
          pointer-events: none;
          z-index: 1;
        }
        .stat-card:hover::before { left: 130%; }

        /* top colored bar grows in on hover */
        .stat-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          border-radius: 16px 16px 0 0;
          background: var(--card-color, #22c55e);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.34,1.4,0.64,1);
        }
        .stat-card:hover::after { transform: scaleX(1); }

        .stat-card:hover {
          transform: translateY(-14px) scale(1.02);
          border-color: var(--card-color, #22c55e);
          background: #151515;
          box-shadow:
            0 24px 60px rgba(0,0,0,0.6),
            0 0 0 1px rgba(255,255,255,0.04),
            0 0 40px -6px var(--card-color, #22c55e);
        }

        .stat-top {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .stat-badge-pill {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.6px;
          padding: 4px 10px; border-radius: 999px;
          display: inline-block;
          transition: filter 0.25s ease, transform 0.35s cubic-bezier(0.34,1.6,0.64,1);
        }
        .stat-card:hover .stat-badge-pill {
          filter: brightness(1.25);
          transform: scale(1.08);
        }
        .stat-trend {
          display: flex; align-items: center; gap: 4px;
          font-size: 11px; font-weight: 700;
        }

        /* big number */
        .stat-number {
          font-size: 26px; font-weight: 800; color: #fff;
          letter-spacing: -0.5px; line-height: 1;
          margin-bottom: 4px; display: flex; align-items: baseline; gap: 2px;
          transition: transform 0.35s cubic-bezier(0.34,1.6,0.64,1);
        }
        .stat-card:hover .stat-number {
          transform: scale(1.05);
          transform-origin: left center;
        }
        .naira-sym {
          font-size: 16px; font-weight: 600;
          color: rgba(255,255,255,0.45);
          font-family: 'Poppins', sans-serif;
          margin-right: 1px;
        }
        .stat-sublabel {
          font-size: 11px; color: rgba(255,255,255,0.35);
          font-weight: 500; margin-bottom: 14px;
        }

        /* sparkline row */
        .stat-spark {
          display: flex; align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
        }
        .stat-label-main {
          font-size: 11px; color: rgba(255,255,255,0.35);
          font-weight: 500; white-space: nowrap;
        }

        /* glow blob */
        .stat-glow {
          position: absolute; bottom: -20px; right: -10px;
          width: 180px; height: 120px;
          border-radius: 50%;
          opacity: 0.06;
          pointer-events: none;
          filter: blur(36px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .stat-card:hover .stat-glow {
          opacity: 0.25;
          transform: scale(1.3);
        }

        /* ── Quick stats ── */
        .quick-grid {
          display: grid; grid-template-columns: repeat(4,1fr);
          gap: 14px; margin-bottom: 20px;
        }
        @media (max-width: 1100px) { .quick-grid { grid-template-columns: repeat(2,1fr); } }

        .quick-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; padding: 16px 18px;
          display: flex; align-items: center; gap: 14px;
        }
        .quick-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .quick-label { font-size: 11px; color: rgba(255,255,255,0.35); font-weight: 500; margin-bottom: 3px; }
        .quick-value { font-size: 20px; font-weight: 800; color: #fff; letter-spacing: -0.5px; }

        /* ── dark panel base ── */
        .dark-panel {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          transition: transform 0.3s cubic-bezier(0.34,1.3,0.64,1),
                      box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .dark-panel:hover {
          transform: translateY(-5px);
          border-color: rgba(255,255,255,0.13);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }

        /* ── Chart ── */
        .main-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; margin-bottom: 16px; }
        @media (max-width: 900px) { .main-grid { grid-template-columns: 1fr; } }

        .chart-card { padding: 24px; }
        .chart-card { padding: 24px; }
        .chart-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; }
        .chart-title { font-size: 16px; font-weight: 700; color: #fff; margin: 0 0 3px; }
        .chart-sub { font-size: 12px; color: rgba(255,255,255,0.35); }
        .chart-top-stat { font-size: 22px; font-weight: 800; color: #fff; letter-spacing: -0.5px; margin-bottom: 2px; display: flex; align-items: baseline; gap: 2px; }
        .chart-top-sub { font-size: 11px; color: rgba(255,255,255,0.35); }

        .chart-controls { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .chart-legend { display: flex; align-items: center; gap: 14px; }
        .legend-item { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.5); cursor: pointer; transition: color 0.2s; }
        .legend-item:hover { color: #fff; }
        .legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .legend-line { width: 18px; height: 2px; border-radius: 2px; flex-shrink: 0; }

        .area-chart-wrap {
          position: relative; width: 100%;
        }
        .area-chart-wrap svg { overflow: visible; display: block; }

        .y-label { font-size: 10px; fill: rgba(255,255,255,0.25); font-family: 'Poppins', sans-serif; }
        .x-label { font-size: 10px; fill: rgba(255,255,255,0.3); font-family: 'Poppins', sans-serif; font-weight: 600; }
        .x-label-active { fill: #22c55e; }
        .grid-line { stroke: rgba(255,255,255,0.05); stroke-width: 1; }

        .chart-tooltip {
          position: absolute; pointer-events: none;
          background: rgba(20,20,20,0.95);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; padding: 8px 12px;
          font-size: 11px; color: #fff;
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
          transform: translateX(-50%);
          white-space: nowrap;
          transition: opacity 0.15s;
        }
        .tooltip-label { font-size: 10px; color: rgba(255,255,255,0.4); margin-bottom: 4px; }
        .tooltip-row { display: flex; align-items: center; gap: 6px; margin-bottom: 2px; }
        .tooltip-row:last-child { margin-bottom: 0; }
        .tooltip-dot { width: 6px; height: 6px; border-radius: 50%; }

        /* side col */
        .side-col { display: flex; flex-direction: column; gap: 14px; }
        .panel { padding: 20px; }
        .panel-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .panel-title { font-size: 14px; font-weight: 700; color: #fff; }

        /* ── Pending Approvals grid ── */
        .pending-grid-section { margin-bottom: 16px; }
        .pending-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; margin-top: 16px; }

        .pending-card {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 20px;
          background: rgba(34,197,94,0.04);
          border: 1px solid rgba(34,197,94,0.35);
          border-radius: 16px;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.34,1.5,0.64,1);
          backdrop-filter: blur(8px);
          position: relative; overflow: hidden;
        }
        .pending-card::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(34,197,94,0.07) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.25s;
        }
        .pending-card:hover { transform: translateY(-3px); border-color: rgba(34,197,94,0.65); box-shadow: 0 0 28px -4px rgba(34,197,94,0.22); background: rgba(34,197,94,0.07); }
        .pending-card:hover::before { opacity: 1; }

        .pending-card-left { display: flex; align-items: center; gap: 14px; }
        .pending-icon-wrap {
          width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0;
          background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.22);
          display: flex; align-items: center; justify-content: center;
        }
        .pending-card-title { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 3px; }
        .pending-card-sub { font-size: 11px; color: rgba(255,255,255,0.38); }

        .pending-card-right { display: flex; align-items: center; gap: 10px; }
        .pending-count {
          min-width: 32px; height: 32px; padding: 0 10px; border-radius: 10px;
          background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 800; color: #22c55e;
        }

        /* empty state */
        .pending-empty {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 36px 20px; gap: 10px; text-align: center;
        }
        .pending-empty-icon {
          width: 52px; height: 52px; border-radius: 16px;
          background: rgba(34,197,94,0.07); border: 1px solid rgba(34,197,94,0.15);
          display: flex; align-items: center; justify-content: center; margin-bottom: 4px;
        }
        .pending-empty-title { font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.7); }
        .pending-empty-sub { font-size: 11px; color: rgba(255,255,255,0.28); max-width: 200px; line-height: 1.5; }

        .cat-item { margin-bottom: 14px; }
        .cat-item:last-child { margin-bottom: 0; }
        .cat-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
        .cat-name { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.7); }
        .cat-rev { font-size: 12px; font-weight: 700; color: #22c55e; }
        .cat-track { height: 5px; background: rgba(255,255,255,0.07); border-radius: 999px; overflow: hidden; }
        .cat-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #16a34a, #4ade80); transition: width 1s ease; }
        .cat-pct { font-size: 10px; color: rgba(255,255,255,0.25); margin-top: 4px; }

        /* bottom grid */
        .bottom-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 16px; }
        @media (max-width: 1100px) { .bottom-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 700px) { .bottom-grid { grid-template-columns: 1fr; } }

        .order-row {
          display: flex; align-items: flex-start; justify-content: space-between;
          padding: 10px 12px; border-radius: 11px;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
          margin-bottom: 7px; cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.34,1.5,0.64,1),
                      background 0.2s, border-color 0.2s, box-shadow 0.3s;
        }
        .order-row:last-child { margin-bottom: 0; }
        .order-row:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.09);
          transform: translateX(6px) scale(1.01);
          box-shadow: 0 4px 24px rgba(0,0,0,0.35);
        }
        .order-id { font-size: 12px; font-weight: 700; color: #fff; }
        .order-customer { font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 2px; }
        .order-meta { font-size: 10px; color: rgba(255,255,255,0.25); margin-top: 2px; }
        .order-status {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 2px 8px; border-radius: 999px; font-size: 10px; font-weight: 700;
          margin-left: 6px; vertical-align: middle;
        }
        .order-amount { font-size: 12px; font-weight: 800; color: #22c55e; }

        .product-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 12px; border-radius: 11px;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
          margin-bottom: 7px;
          transition: transform 0.3s cubic-bezier(0.34,1.5,0.64,1),
                      background 0.2s, border-color 0.2s, box-shadow 0.3s;
        }
        .product-row:last-child { margin-bottom: 0; }
        .product-row:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.09);
          transform: translateX(6px) scale(1.01);
          box-shadow: 0 4px 24px rgba(0,0,0,0.35);
        }
        .product-rank {
          width: 28px; height: 28px; border-radius: 9px;
          background: rgba(34,197,94,0.1); display: flex; align-items: center;
          justify-content: center; font-size: 11px; font-weight: 800; color: #22c55e;
          flex-shrink: 0;
          transition: background 0.2s, color 0.2s, transform 0.3s cubic-bezier(0.34,1.5,0.64,1);
        }
        .product-row:hover .product-rank {
          background: #22c55e; color: #000;
          transform: scale(1.18) rotate(-6deg);
        }
        .product-name { font-size: 11px; font-weight: 700; color: #fff; }
        .product-meta { font-size: 10px; color: rgba(255,255,255,0.3); margin-top: 2px; }
        .product-low { color: #f97316; font-weight: 700; }
        .product-rev { font-size: 11px; font-weight: 800; color: #22c55e; }

        .cust-row {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 11px;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
          margin-bottom: 7px;
          transition: transform 0.3s cubic-bezier(0.34,1.5,0.64,1),
                      background 0.2s, border-color 0.2s, box-shadow 0.3s;
        }
        .cust-row:last-child { margin-bottom: 0; }
        .cust-row:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.09);
          transform: translateX(6px) scale(1.01);
          box-shadow: 0 4px 24px rgba(0,0,0,0.35);
        }
        .cust-avatar {
          width: 34px; height: 34px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 800; color: #22c55e; flex-shrink: 0;
          background: rgba(34,197,94,0.15);
          border: 1px solid rgba(34,197,94,0.3);
          backdrop-filter: blur(12px);
          transition: transform 0.3s cubic-bezier(0.34,1.5,0.64,1), box-shadow 0.2s;
        }
        .cust-row:hover .cust-avatar {
          transform: scale(1.15);
          box-shadow: 0 0 14px rgba(255,255,255,0.15);
        }
        .cust-name { font-size: 12px; font-weight: 700; color: #fff; }
        .cust-loc { font-size: 10px; color: rgba(255,255,255,0.3); display: flex; align-items: center; gap: 2px; margin-top: 1px; }
        .cust-orders { font-size: 10px; color: rgba(255,255,255,0.25); margin-top: 1px; }
        .cust-spent { font-size: 12px; font-weight: 800; color: #a855f7; margin-left: auto; flex-shrink: 0; }

        .activity-card { padding: 22px; }
        .activity-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 10px; }
        @media (max-width: 1100px) { .activity-grid { grid-template-columns: repeat(3,1fr); } }
        @media (max-width: 600px)  { .activity-grid { grid-template-columns: repeat(2,1fr); } }

        .act-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 12px; border-radius: 12px;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
          transition: transform 0.3s cubic-bezier(0.34,1.5,0.64,1),
                      background 0.2s, border-color 0.2s, box-shadow 0.3s;
        }
        .act-item:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.11);
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }
        .act-icon {
          width: 32px; height: 32px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          transition: transform 0.3s cubic-bezier(0.34,1.5,0.64,1);
        }
        .act-item:hover .act-icon { transform: scale(1.2) rotate(-8deg); }
        .act-msg { font-size: 11px; font-weight: 500; color: rgba(255,255,255,0.65); line-height: 1.4; }
        .act-time { font-size: 10px; color: rgba(255,255,255,0.25); margin-top: 4px; }

        .sec-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .sec-title { font-size: 14px; font-weight: 700; color: #fff; }
        .view-all {
          font-size: 11px; font-weight: 600; color: rgba(34,197,94,0.7);
          text-decoration: none; display: flex; align-items: center; gap: 3px;
          padding: 4px 8px; border-radius: 8px;
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }
        .view-all:hover {
          color: #22c55e;
          background: rgba(34,197,94,0.08);
          border-color: rgba(34,197,94,0.2);
          gap: 5px;
        }

        .pulse-dot { width: 7px; height: 7px; background: #f97316; border-radius: 50%; animation: pulse 1.5s infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.5;transform:scale(1.3);} }

        @keyframes fadeUp { from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);} }
        .fade-up { animation: fadeUp 0.45s ease forwards; opacity: 0; }
      `}</style>

      <div className="dash-root">
        <div className="dash-content">
          {/* Header */}
          <div className="dash-header fade-up">
            <div className="dash-header-left">
              <h1>Dashboard Overview</h1>
              <p>
                Welcome back! Here's what's happening with your store today.
              </p>
            </div>
            <div className="dash-header-right">
              <span className="current-date">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* ── Stat Cards ── */}
          <div className="stat-grid">
            {statCards.map((card, i) => (
              <Link
                key={i}
                to={card.link}
                className="stat-card fade-up"
                style={{
                  animationDelay: `${i * 60}ms`,
                  "--card-color": card.color,
                }}
              >
                {/* glow blob */}
                <div className="stat-glow" style={{ background: card.color }} />

                {/* top: pill badge + trend */}
                <div className="stat-top">
                  <span
                    className="stat-badge-pill"
                    style={{ background: card.badgeBg, color: card.badgeColor }}
                  >
                    {card.badgeLabel}
                  </span>
                  <span
                    className="stat-trend"
                    style={{ color: card.isPositive ? "#22c55e" : "#ef4444" }}
                  >
                    {card.isPositive ? (
                      <TrendUp size={13} weight="bold" />
                    ) : (
                      <TrendDown size={13} weight="bold" />
                    )}
                    {card.growth}
                  </span>
                </div>

                {/* big number */}
                <div className="stat-number">
                  {!card.noSymbol && <span className="naira-sym">₦</span>}
                  {card.value}
                </div>
                <div className="stat-sublabel">{card.subtitle}</div>

                {/* sparkline + label */}
                <div className="stat-spark">
                  <span className="stat-label-main">{card.label}</span>
                  <Sparkline
                    data={card.spark}
                    color={card.color}
                    positive={card.isPositive}
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Chart + Category Performance */}
          <div className="main-grid">
            <div
              className="dark-panel chart-card fade-up"
              style={{ animationDelay: "150ms" }}
            >
              <AreaChart
                salesData={salesData}
                stats={stats}
                timeRange={timeRange}
                setTimeRange={setTimeRange}
              />
            </div>

            <div className="side-col">
              {/* Pending Approvals */}
              <div
                className="dark-panel panel fade-up"
                style={{ animationDelay: "160ms" }}
              >
                <div className="panel-header">
                  <span className="panel-title">Pending Approvals</span>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <Link to="/admin/approve-products" className="view-all">
                      View All <ArrowRight size={11} weight="bold" />
                    </Link>
                  </div>
                </div>

                {stats.pendingProducts === 0 && stats.pendingVendors === 0 ? (
                  <div className="pending-empty">
                    <div className="pending-empty-icon">
                      <SmileySad size={24} color="#22c55e" weight="duotone" />
                    </div>
                    <div className="pending-empty-title">All caught up!</div>
                    <div className="pending-empty-sub">
                      No pending approvals right now.
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    {stats.pendingProducts > 0 && (
                      <Link
                        to="/admin/approve-products"
                        className="pending-card"
                      >
                        <div className="pending-card-left">
                          <div className="pending-icon-wrap">
                            <SealCheck
                              size={18}
                              color="#22c55e"
                              weight="duotone"
                            />
                          </div>
                          <div>
                            <div className="pending-card-title">Products</div>
                            <div className="pending-card-sub">
                              Awaiting review
                            </div>
                          </div>
                        </div>
                        <div className="pending-card-right">
                          <div className="pending-count">
                            {stats.pendingProducts}
                          </div>
                          <ArrowRight
                            size={13}
                            color="rgba(34,197,94,0.6)"
                            weight="bold"
                          />
                        </div>
                      </Link>
                    )}
                    {stats.pendingVendors > 0 && (
                      <Link
                        to="/admin/approve-vendors"
                        className="pending-card"
                      >
                        <div className="pending-card-left">
                          <div className="pending-icon-wrap">
                            <UsersFour
                              size={18}
                              color="#22c55e"
                              weight="duotone"
                            />
                          </div>
                          <div>
                            <div className="pending-card-title">Vendors</div>
                            <div className="pending-card-sub">
                              Awaiting review
                            </div>
                          </div>
                        </div>
                        <div className="pending-card-right">
                          <div className="pending-count">
                            {stats.pendingVendors}
                          </div>
                          <ArrowRight
                            size={13}
                            color="rgba(34,197,94,0.6)"
                            weight="bold"
                          />
                        </div>
                      </Link>
                    )}
                  </div>
                )}
              </div>

              {/* Category Performance */}
              <div
                className="dark-panel panel fade-up"
                style={{ animationDelay: "200ms" }}
              >
                <div className="panel-header">
                  <span className="panel-title">Category Performance</span>
                </div>
                {categoryPerformance.map((cat, i) => (
                  <div key={i} className="cat-item">
                    <div className="cat-header">
                      <span className="cat-name">{cat.name}</span>
                      <span className="cat-rev">
                        ₦{cat.revenue.toLocaleString("en-NG")}
                      </span>
                    </div>
                    <div className="cat-track">
                      <div
                        className="cat-fill"
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                    <div className="cat-pct">{cat.sales}% of total sales</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="bottom-grid">
            {/* Recent Orders */}
            <div
              className="dark-panel panel fade-up"
              style={{ animationDelay: "220ms" }}
            >
              <div className="sec-header">
                <span className="sec-title">Recent Orders</span>
                <Link to="/admin/orders" className="view-all">
                  View All <ArrowRight size={11} weight="bold" />
                </Link>
              </div>
              {recentOrders.slice(0, 5).map((order, i) => {
                const s = getStatusStyle(order.status);
                return (
                  <div key={i} className="order-row">
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: 4,
                        }}
                      >
                        <span className="order-id">{order.id}</span>
                        <span
                          className="order-status"
                          style={{ background: s.bg, color: s.text }}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="order-customer">{order.customer}</div>
                      <div className="order-meta">
                        {order.items} items · {order.time}
                      </div>
                    </div>
                    <span className="order-amount">
                      ₦{order.amount.toLocaleString("en-NG")}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Top Products */}
            <div
              className="dark-panel panel fade-up"
              style={{ animationDelay: "260ms" }}
            >
              <div className="sec-header">
                <span className="sec-title">Top Products</span>
                <Link to="/admin/products" className="view-all">
                  View All <ArrowRight size={11} weight="bold" />
                </Link>
              </div>
              {topProducts.slice(0, 5).map((p, i) => (
                <div key={i} className="product-row">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <div className="product-rank">{i + 1}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        className="product-name"
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {p.name}
                      </div>
                      <div className="product-meta">
                        {p.sales} sold ·{" "}
                        <span className={p.stock < 30 ? "product-low" : ""}>
                          {p.stock} left
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="product-rev">
                    ₦{p.revenue.toLocaleString("en-NG")}
                  </span>
                </div>
              ))}
            </div>

            {/* Top Customers */}
            <div
              className="dark-panel panel fade-up"
              style={{ animationDelay: "300ms" }}
            >
              <div className="sec-header">
                <span className="sec-title">Top Customers</span>
                <Link to="/admin/users" className="view-all">
                  View All <ArrowRight size={11} weight="bold" />
                </Link>
              </div>
              {topCustomers.map((c, i) => (
                <div key={i} className="cust-row">
                  <div
                    className="cust-avatar"
                    style={{
                      background: avatarColors[i % avatarColors.length],
                    }}
                  >
                    {c.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="cust-name">{c.name}</div>
                    <div className="cust-loc">
                      <MapPin size={10} /> {c.location}
                    </div>
                    <div className="cust-orders">{c.orders} orders</div>
                  </div>
                  <span className="cust-spent">
                    ₦{c.spent.toLocaleString("en-NG")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div
            className="dark-panel activity-card fade-up"
            style={{ animationDelay: "340ms" }}
          >
            <div className="sec-header">
              <span className="sec-title">Recent Activity</span>
              <Link to="/admin/activity" className="view-all">
                View All <ArrowRight size={11} weight="bold" />
              </Link>
            </div>
            <div className="activity-grid">
              {recentActivity.map((act, i) => {
                const colorMap = {
                  green: { bg: "rgba(34,197,94,0.12)", text: "#22c55e" },
                  blue: { bg: "rgba(99,102,241,0.12)", text: "#6366f1" },
                  purple: { bg: "rgba(168,85,247,0.12)", text: "#a855f7" },
                  orange: { bg: "rgba(249,115,22,0.12)", text: "#f97316" },
                };
                const c = colorMap[act.color];
                return (
                  <div key={i} className="act-item">
                    <div className="act-icon" style={{ background: c.bg }}>
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: c.text,
                          display: "block",
                        }}
                      />
                    </div>
                    <div>
                      <div className="act-msg">{act.message}</div>
                      <div className="act-time">{act.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
