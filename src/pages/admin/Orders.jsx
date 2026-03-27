import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Clock,
  CheckCircle,
  Truck,
  X,
  Warning,
  MagnifyingGlass,
  Download,
  Eye,
  Package,
  ArrowsClockwise,
  CalendarBlank,
  MapPin,
  Phone,
  EnvelopeSimple,
  User,
  Receipt,
  CaretDown,
  CurrencyNgn,
} from "@phosphor-icons/react";

function useCountUp(target, duration = 700) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (target === 0) {
      setCount(0);
      return;
    }
    let step = 0;
    const steps = Math.min(Math.abs(target), 40);
    const inc = target / steps;
    let cur = 0;
    const t = setInterval(
      () => {
        step++;
        cur += inc;
        setCount(step >= steps ? target : Math.round(cur));
        if (step >= steps) clearInterval(t);
      },
      Math.max(16, Math.floor(duration / steps)),
    );
    return () => clearInterval(t);
  }, [target]);
  return count;
}

function StatCards({ total, revenue, pending, avgValue }) {
  const t = useCountUp(total);
  const r = useCountUp((Math.round((revenue / 1000000) * 10) / 10) * 10); // show in M
  const p = useCountUp(pending);
  const a = useCountUp(Math.round(avgValue / 1000));
  const tot = total || 1;

  const cards = [
    {
      label: "Total Orders",
      val: t,
      pre: "",
      suf: "",
      sub: "All time",
      trend: `${total} orders`,
      bar: 100,
      delay: "60ms",
    },
    {
      label: "Total Revenue",
      val: useCountUp(Math.floor(revenue / 1000000)),
      pre: <span className="naira">₦</span>,
      suf: "M",
      sub: "Across all orders",
      trend: "Revenue",
      bar: 85,
      delay: "120ms",
    },
    {
      label: "Pending Orders",
      val: p,
      pre: "",
      suf: "",
      sub: "Awaiting processing",
      trend: `${pending} pending`,
      bar: Math.round((pending / tot) * 100),
      delay: "180ms",
    },
    {
      label: "Avg. Order Value",
      val: useCountUp(Math.round(avgValue / 1000)),
      pre: <span className="naira">₦</span>,
      suf: "k",
      sub: "Per transaction",
      trend: "Per order",
      bar: 70,
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
            <div className="stat-num-row">
              <span className="stat-pre">{c.pre}</span>
              <span className="stat-val">{c.val.toLocaleString()}</span>
              <span className="stat-suf">{c.suf}</span>
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

const STATUS_CFG = {
  pending: {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.25)",
    Icon: Clock,
  },
  processing: {
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.25)",
    Icon: ArrowsClockwise,
  },
  shipped: {
    color: "#a855f7",
    bg: "rgba(168,85,247,0.1)",
    border: "rgba(168,85,247,0.25)",
    Icon: Truck,
  },
  delivered: {
    color: "#22c55e",
    bg: "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.25)",
    Icon: CheckCircle,
  },
  cancelled: {
    color: "#ef4444",
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.25)",
    Icon: X,
  },
};

function StatusBadge({ status }) {
  const c = STATUS_CFG[status] || STATUS_CFG.pending;
  return (
    <span
      className="sbadge"
      style={{
        color: c.color,
        background: c.bg,
        border: `1px solid ${c.border}`,
      }}
    >
      <c.Icon size={10} weight="fill" />{" "}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function OrderRow({ order, onView, index }) {
  return (
    <div className="orow fade-up" style={{ animationDelay: `${index * 45}ms` }}>
      <div className="orow-main">
        <div className="orow-left">
          <div className="orow-id-row">
            <span className="orow-id">{order.id}</span>
            <StatusBadge status={order.status} />
          </div>
          <div className="orow-meta">
            <span className="ometa">
              <CalendarBlank size={11} weight="fill" /> {order.date} ·{" "}
              {order.time}
            </span>
            <span className="ometa">
              <Package size={11} weight="fill" /> {order.items.length} item
              {order.items.length > 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <div className="orow-grid">
          <div>
            <div className="ofl">Customer</div>
            <div className="ofv">{order.customer}</div>
            <div className="ofs">{order.email}</div>
          </div>
          <div>
            <div className="ofl">Phone</div>
            <div className="ofv">{order.phone}</div>
          </div>
          <div>
            <div className="ofl">Payment</div>
            <div className="ofv">{order.paymentMethod}</div>
          </div>
          <div>
            <div className="ofl">Total</div>
            <div className="ototal">
              <span className="naira">₦</span>
              {order.total.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      <button className="oview-btn" onClick={() => onView(order)}>
        <Eye size={13} weight="bold" /> View
      </button>
    </div>
  );
}

function OrderModal({ order, onClose, onUpdateStatus }) {
  if (!order) return null;
  const [sub, setSub] = useState(false);
  const handleStatus = (s) => {
    setSub(true);
    setTimeout(() => {
      onUpdateStatus(order.id, s);
      setSub(false);
    }, 200);
  };
  return (
    <div className="overlay" onClick={onClose}>
      <div className="mbox" onClick={(e) => e.stopPropagation()}>
        <div className="mheader">
          <div>
            <div className="moid">{order.id}</div>
            <div className="mosub">
              Placed {order.date} · {order.time}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <StatusBadge status={order.status} />
            <button className="mclose" onClick={onClose}>
              <X size={14} weight="bold" />
            </button>
          </div>
        </div>
        <div className="mbody">
          <div
            className="msbanner"
            style={{
              borderColor: STATUS_CFG[order.status]?.border,
              background: STATUS_CFG[order.status]?.bg,
            }}
          >
            <span
              style={{
                color: STATUS_CFG[order.status]?.color,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              Tracking: {order.trackingNumber}
            </span>
          </div>
          <div className="m2col">
            <div className="mcell">
              <div className="mclabel">
                <User size={11} color="#3b82f6" weight="fill" /> Customer
              </div>
              <div className="mrow">
                <span className="mrl">Name</span>
                <span className="mrv">{order.customer}</span>
              </div>
              <div className="mrow">
                <span className="mrl">Email</span>
                <span className="mrv">{order.email}</span>
              </div>
              <div className="mrow">
                <span className="mrl">Phone</span>
                <span className="mrv">{order.phone}</span>
              </div>
            </div>
            <div className="mcell">
              <div className="mclabel">
                <MapPin size={11} color="#a855f7" weight="fill" /> Shipping
              </div>
              <div className="mrv" style={{ lineHeight: 1.6, marginBottom: 8 }}>
                {order.shippingAddress}
              </div>
              <div className="mrow">
                <span className="mrl">Payment</span>
                <span className="mrv">{order.paymentMethod}</span>
              </div>
            </div>
          </div>
          <div className="mseclabel">Order Items ({order.items.length})</div>
          <div className="mitems">
            {order.items.map((item, i) => (
              <div key={i} className="mitem">
                <img src={item.image} alt={item.name} className="mitem-img" />
                <div className="mitem-info">
                  <div className="mitem-name">{item.name}</div>
                  <div className="mitem-qty">Qty: {item.quantity}</div>
                </div>
                <div className="mitem-price">
                  <span className="naira">₦</span>
                  {item.price.toLocaleString()}
                </div>
              </div>
            ))}
            <div className="mtotal-row">
              <span className="mtotal-label">Order Total</span>
              <span className="mtotal-val">
                <span className="naira">₦</span>
                {order.total.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="mseclabel" style={{ marginTop: 16 }}>
            Update Status
          </div>
          <div className="mstatus-btns">
            {["pending", "processing", "shipped", "delivered", "cancelled"].map(
              (s) => {
                const cfg = STATUS_CFG[s];
                const on = order.status === s;
                return (
                  <button
                    key={s}
                    className="msb"
                    style={
                      on
                        ? {
                            background: cfg.bg,
                            color: cfg.color,
                            borderColor: cfg.border,
                          }
                        : {}
                    }
                    onClick={() => handleStatus(s)}
                    disabled={sub}
                  >
                    <cfg.Icon size={12} weight={on ? "fill" : "regular"} />{" "}
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                );
              },
            )}
          </div>
          <button className="mclose-btn" onClick={onClose}>
            Close Order Details
          </button>
        </div>
      </div>
    </div>
  );
}

const ORDERS = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    phone: "+234 801 234 5678",
    total: 145000,
    status: "pending",
    date: "2024-01-20",
    time: "14:30",
    items: [
      {
        name: "Nike Air Max 270",
        qty: 2,
        quantity: 2,
        price: 45000,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80",
      },
      {
        name: "Adidas Hoodie",
        qty: 1,
        quantity: 1,
        price: 55000,
        image:
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&q=80",
      },
    ],
    shippingAddress: "123 Main Street, Victoria Island, Lagos, Nigeria",
    paymentMethod: "Card Payment",
    trackingNumber: "TRK-001-2024",
  },
  {
    id: "#ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    phone: "+234 802 345 6789",
    total: 89000,
    status: "processing",
    date: "2024-01-19",
    time: "11:15",
    items: [
      {
        name: "Puma RS-X Sneakers",
        qty: 1,
        quantity: 1,
        price: 38000,
        image:
          "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&q=80",
      },
      {
        name: "Plain White Tee",
        qty: 2,
        quantity: 2,
        price: 25500,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80",
      },
    ],
    shippingAddress: "456 Park Avenue, Wuse 2, Abuja, Nigeria",
    paymentMethod: "Transfer",
    trackingNumber: "TRK-002-2024",
  },
  {
    id: "#ORD-003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    phone: "+234 803 456 7890",
    total: 234000,
    status: "shipped",
    date: "2024-01-18",
    time: "09:45",
    items: [
      {
        name: "Leather Jacket Premium",
        qty: 1,
        quantity: 1,
        price: 89000,
        image:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&q=80",
      },
      {
        name: "New Balance 574",
        qty: 2,
        quantity: 2,
        price: 42000,
        image:
          "https://images.unsplash.com/photo-1539185441755-769473a23570?w=200&q=80",
      },
      {
        name: "Champion Hoodie",
        qty: 2,
        quantity: 2,
        price: 30500,
        image:
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&q=80",
      },
    ],
    shippingAddress: "789 Beach Road, Port Harcourt, Nigeria",
    paymentMethod: "Cash on Delivery",
    trackingNumber: "TRK-003-2024",
  },
  {
    id: "#ORD-004",
    customer: "Sarah Williams",
    email: "sarah@example.com",
    phone: "+234 804 567 8901",
    total: 56000,
    status: "delivered",
    date: "2024-01-17",
    time: "16:20",
    items: [
      {
        name: "Denim Jacket",
        qty: 1,
        quantity: 1,
        price: 56000,
        image:
          "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=200&q=80",
      },
    ],
    shippingAddress: "321 Hill View, Ibadan, Nigeria",
    paymentMethod: "Card Payment",
    trackingNumber: "TRK-004-2024",
  },
  {
    id: "#ORD-005",
    customer: "David Brown",
    email: "david@example.com",
    phone: "+234 805 678 9012",
    total: 125000,
    status: "processing",
    date: "2024-01-16",
    time: "13:00",
    items: [
      {
        name: "Ultraboost 21",
        qty: 1,
        quantity: 1,
        price: 52000,
        image:
          "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200&q=80",
      },
      {
        name: "Oversized Hoodie",
        qty: 1,
        quantity: 1,
        price: 73000,
        image:
          "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=200&q=80",
      },
    ],
    shippingAddress: "567 Admiralty Way, Lekki, Lagos, Nigeria",
    paymentMethod: "Transfer",
    trackingNumber: "TRK-005-2024",
  },
  {
    id: "#ORD-006",
    customer: "Grace Okoro",
    email: "grace@example.com",
    phone: "+234 806 789 0123",
    total: 178000,
    status: "pending",
    date: "2024-01-15",
    time: "10:30",
    items: [
      {
        name: "Premium Sneakers",
        qty: 2,
        quantity: 2,
        price: 89000,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80",
      },
    ],
    shippingAddress: "890 Allen Avenue, Ikeja, Lagos, Nigeria",
    paymentMethod: "Card Payment",
    trackingNumber: "TRK-006-2024",
  },
  {
    id: "#ORD-007",
    customer: "Emmanuel Obi",
    email: "emmanuel@example.com",
    phone: "+234 807 890 1234",
    total: 67000,
    status: "shipped",
    date: "2024-01-14",
    time: "15:45",
    items: [
      {
        name: "Graphic Tee Collection",
        qty: 3,
        quantity: 3,
        price: 22333,
        image:
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200&q=80",
      },
    ],
    shippingAddress: "234 Herbert Macaulay, Yaba, Lagos, Nigeria",
    paymentMethod: "Transfer",
    trackingNumber: "TRK-007-2024",
  },
  {
    id: "#ORD-008",
    customer: "Chinedu Eze",
    email: "chinedu@example.com",
    phone: "+234 808 901 2345",
    total: 195000,
    status: "delivered",
    date: "2024-01-13",
    time: "12:00",
    items: [
      {
        name: "Designer Jacket",
        qty: 1,
        quantity: 1,
        price: 125000,
        image:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&q=80",
      },
      {
        name: "Premium Sneakers",
        qty: 1,
        quantity: 1,
        price: 70000,
        image:
          "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&q=80",
      },
    ],
    shippingAddress: "678 Opebi Road, Ikeja, Lagos, Nigeria",
    paymentMethod: "Card Payment",
    trackingNumber: "TRK-008-2024",
  },
  {
    id: "#ORD-009",
    customer: "Blessing Adeyemi",
    email: "blessing@example.com",
    phone: "+234 809 012 3456",
    total: 42000,
    status: "cancelled",
    date: "2024-01-12",
    time: "08:15",
    items: [
      {
        name: "Basic Tee Set",
        qty: 2,
        quantity: 2,
        price: 21000,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80",
      },
    ],
    shippingAddress: "456 Awolowo Road, Ikoyi, Lagos, Nigeria",
    paymentMethod: "Cash on Delivery",
    trackingNumber: "TRK-009-2024",
  },
  {
    id: "#ORD-010",
    customer: "Tunde Bakare",
    email: "tunde@example.com",
    phone: "+234 810 123 4567",
    total: 312000,
    status: "processing",
    date: "2024-01-11",
    time: "17:30",
    items: [
      {
        name: "Luxury Sneakers",
        qty: 2,
        quantity: 2,
        price: 95000,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80",
      },
      {
        name: "Designer Hoodie",
        qty: 1,
        quantity: 1,
        price: 122000,
        image:
          "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=200&q=80",
      },
    ],
    shippingAddress: "123 Banana Island, Ikoyi, Lagos, Nigeria",
    paymentMethod: "Transfer",
    trackingNumber: "TRK-010-2024",
  },
];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setOrders(ORDERS);
      setLoading(false);
    }, 900);
  }, []);

  const updateStatus = (id, s) => {
    setOrders((p) => p.map((o) => (o.id === id ? { ...o, status: s } : o)));
    setSelected((p) => (p && p.id === id ? { ...p, status: s } : p));
  };

  const statusKeys = [
    "all",
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];
  const statusCnt = statusKeys.reduce((a, k) => {
    a[k] =
      k === "all" ? orders.length : orders.filter((o) => o.status === k).length;
    return a;
  }, {});

  const filtered = orders.filter((o) => {
    const s = search.toLowerCase();
    return (
      (o.id.toLowerCase().includes(s) ||
        o.customer.toLowerCase().includes(s) ||
        o.email.toLowerCase().includes(s)) &&
      (filter === "all" || o.status === filter)
    );
  });

  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const avgValue = orders.length ? revenue / orders.length : 0;
  const pending = orders.filter((o) => o.status === "pending").length;

  return (
    <div className="or-root">
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        .or-root{min-height:100vh;background:#0a0a0a;font-family:'Poppins',sans-serif;color:#fff;padding:24px 28px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp 0.5s ease-out forwards;opacity:0}
        .naira{font-family:Arial,system-ui,sans-serif}
        button,select,a,[role="button"]{cursor:pointer}

        /* HERO — PRIMARY GREEN */
        .hero-card{position:relative;overflow:hidden;width:100%;border-radius:20px;background:#0f3318;margin-bottom:22px;height:280px;animation:fadeUp .45s ease-out forwards;display:flex;border:1px solid rgba(34,197,94,.12)}
        .hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(34,197,94,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(34,197,94,.04) 1px,transparent 1px);background-size:32px 32px;pointer-events:none}
        .hero-left{flex:1;padding:40px;display:flex;flex-direction:column;justify-content:center;position:relative;z-index:2}
        .hero-badge{display:inline-flex;align-items:center;gap:5px;background:rgba(34,197,94,.05);color:#22c55e;border:1px solid rgba(34,197,94,.4);font-size:9px;font-weight:700;padding:4px 10px;border-radius:8px;margin-bottom:14px;letter-spacing:.6px;text-transform:uppercase;box-shadow:0 0 8px rgba(34,197,94,.2)}
        .hero-title{font-size:24px;font-weight:700;color:#fff;margin-bottom:12px;line-height:1.25;letter-spacing:-.5px;max-width:400px}
        .hero-sub{font-size:13px;color:rgba(255,255,255,.42);margin-bottom:28px;line-height:1.75;max-width:380px}
        .hero-acts{display:flex;gap:12px}
        .hero-primary{display:flex;align-items:center;gap:7px;padding:11px 22px;background:#eab308;color:#000;border:none;border-radius:12px;font-size:13px;font-weight:800;cursor:pointer;font-family:'Poppins',sans-serif;transition:all .2s;box-shadow:0 0 20px rgba(234,179,8,.3)}
        .hero-primary:hover{background:#facc15;transform:translateY(-1px)}
        .hero-ghost{padding:11px 22px;background:rgba(255,255,255,.05);color:rgba(255,255,255,.6);border:1px solid rgba(255,255,255,.12);border-radius:12px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Poppins',sans-serif;transition:all .2s}
        .hero-ghost:hover{background:rgba(255,255,255,.1);color:#fff}
        .hero-right{width:42%;flex-shrink:0;position:relative;display:flex;align-items:center;justify-content:center;cursor:pointer}
        .hero-right::before{content:'';position:absolute;inset:-10px;background:radial-gradient(ellipse 70% 60% at 55% 50%,rgba(34,197,94,.22) 0%,rgba(34,197,94,.08) 45%,transparent 75%);pointer-events:none}
        .hero-right::after{content:'';position:absolute;bottom:10px;left:10%;right:10%;height:40px;background:radial-gradient(ellipse 80% 100% at 50% 100%,rgba(34,197,94,.3) 0%,transparent 70%);pointer-events:none;filter:blur(8px)}
        .hero-img{width:90%;height:90%;object-fit:contain;position:relative;z-index:1;filter:drop-shadow(0 8px 32px rgba(34,197,94,.25));transition:all .4s cubic-bezier(.34,1.56,.64,1)}
        .hero-right:hover .hero-img{transform:translateY(-12px) scale(1.05);filter:drop-shadow(0 20px 50px rgba(34,197,94,.45))}

        /* STATS */
        .stats-bar{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:22px}
        .stat-tile{background:linear-gradient(160deg,#161d16 0%,#0f140f 70%,#0d120d 100%);border:1px solid rgba(34,197,94,.18);border-radius:16px;padding:18px 20px 16px;display:flex;flex-direction:column;cursor:pointer;position:relative;overflow:hidden;box-shadow:0 6px 28px rgba(0,0,0,.5);transition:box-shadow .3s,border-color .3s,transform .3s cubic-bezier(.34,1.4,.64,1)}
        .stat-tile::after{content:'';position:absolute;bottom:-20px;right:-20px;width:100px;height:100px;background:radial-gradient(circle,rgba(34,197,94,.08) 0%,transparent 70%);pointer-events:none}
        .stat-tile:hover{transform:translateY(-4px) scale(1.015);border-color:rgba(34,197,94,.35);box-shadow:0 0 40px rgba(34,197,94,.1),0 14px 40px rgba(0,0,0,.6)}
        .stat-top-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
        .stat-trend{font-size:9.5px;font-weight:700;color:rgba(34,197,94,.6);background:rgba(34,197,94,.07);border:1px solid rgba(34,197,94,.16);border-radius:20px;padding:3px 8px;white-space:nowrap}
        .stat-num-row{display:flex;align-items:baseline;gap:2px}
        .stat-pre{font-size:15px;font-weight:600;color:rgba(34,197,94,.55)}
        .stat-val{font-size:28px;font-weight:700;color:#fff;letter-spacing:-1.5px;font-variant-numeric:tabular-nums}
        .stat-suf{font-size:15px;font-weight:600;color:rgba(34,197,94,.55)}
        .stat-label{font-size:12px;font-weight:700;color:rgba(255,255,255,.72);margin-bottom:2px}
        .stat-sub{font-size:10.5px;font-weight:500;color:rgba(255,255,255,.22);margin-bottom:14px}
        .stat-bar-track{height:3px;background:rgba(255,255,255,.05);border-radius:99px;overflow:hidden}
        @keyframes barGrow{from{width:0%}to{width:var(--bar-w)}}
        .stat-bar-fill{height:100%;width:var(--bar-w);background:#eab308;border-radius:99px;animation:barGrow 1.4s cubic-bezier(.4,0,.2,1) forwards;box-shadow:0 0 8px rgba(234,179,8,.55)}

        /* FILTERS */
        .filters-wrap{background:#111;border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:16px 18px;margin-bottom:14px}
        .filters-top{display:grid;grid-template-columns:1fr auto;gap:10px;margin-bottom:14px}
        .fi-wrap{position:relative}
        .fi-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);pointer-events:none}
        .fi{width:100%;padding:9px 12px 9px 36px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:10px;font-size:12px;font-weight:500;color:#fff;font-family:'Poppins',sans-serif;outline:none}
        .fi::placeholder{color:rgba(255,255,255,.25)}
        .fi:focus{border-color:rgba(34,197,94,.4)}
        .exp-btn{display:flex;align-items:center;gap:7px;padding:9px 18px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:10px;font-size:12px;font-weight:700;color:rgba(255,255,255,.6);font-family:'Poppins',sans-serif;cursor:pointer;transition:all .2s;white-space:nowrap}
        .exp-btn:hover{background:rgba(255,255,255,.09);color:#fff}
        .stabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}
        .stab{display:flex;align-items:center;gap:5px;padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.03);font-size:11px;font-weight:700;color:rgba(255,255,255,.4);font-family:'Poppins',sans-serif;cursor:pointer;transition:all .2s}
        .stab:hover{color:rgba(255,255,255,.7)}
        .stab-on{background:rgba(34,197,94,.08);border-color:rgba(34,197,94,.25);color:#22c55e}
        .stab-cnt{padding:1px 6px;border-radius:20px;background:rgba(255,255,255,.07);font-size:9px}
        .stab-on .stab-cnt{background:rgba(34,197,94,.15)}
        .fres{font-size:11px;color:rgba(255,255,255,.3);padding-top:10px;border-top:1px solid rgba(255,255,255,.05)}
        .fres span{color:#22c55e;font-weight:700}

        /* STATUS BADGE */
        .sbadge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:20px;font-size:10px;font-weight:700}

        /* ORDER ROW */
        .orders-list{display:flex;flex-direction:column;gap:10px}
        .orow{background:#111;border:1px solid rgba(255,255,255,.06);border-radius:16px;padding:18px 20px;display:flex;align-items:center;gap:16px;transition:transform .25s cubic-bezier(.34,1.4,.64,1),border-color .2s,box-shadow .2s}
        .orow:hover{transform:translateY(-2px);border-color:rgba(34,197,94,.2);box-shadow:0 8px 28px rgba(0,0,0,.4)}
        .orow-main{flex:1;min-width:0}
        .orow-left{margin-bottom:10px}
        .orow-id-row{display:flex;align-items:center;gap:8px;margin-bottom:4px}
        .orow-id{font-size:15px;font-weight:800;color:#fff}
        .orow-meta{display:flex;align-items:center;gap:14px}
        .ometa{display:flex;align-items:center;gap:4px;font-size:11px;color:rgba(255,255,255,.3)}
        .orow-grid{display:grid;grid-template-columns:2fr 1.2fr 1.2fr 1fr;gap:12px}
        .ofl{font-size:9px;font-weight:700;color:rgba(255,255,255,.25);text-transform:uppercase;letter-spacing:.5px;margin-bottom:2px}
        .ofv{font-size:12px;font-weight:700;color:#fff}
        .ofs{font-size:10px;color:rgba(255,255,255,.3)}
        .ototal{font-size:16px;font-weight:900;color:#22c55e}
        .oview-btn{display:flex;align-items:center;gap:5px;padding:9px 16px;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.22);border-radius:9px;font-size:12px;font-weight:700;color:#22c55e;font-family:'Poppins',sans-serif;cursor:pointer;transition:all .2s;white-space:nowrap;flex-shrink:0}
        .oview-btn:hover{background:#22c55e;color:#000}

        /* LOADING / EMPTY */
        .loading-wrap{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:300px;gap:14px}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .spinner{width:36px;height:36px;border:3px solid rgba(34,197,94,.15);border-top-color:#22c55e;border-radius:50%;animation:spin .8s linear infinite}
        .ltxt{font-size:12px;font-weight:600;color:rgba(255,255,255,.3)}
        .empty{background:#111;border:1px solid rgba(255,255,255,.06);border-radius:18px;padding:64px 24px;text-align:center}
        .empty-icon{width:64px;height:64px;border-radius:18px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
        .empty-title{font-size:16px;font-weight:800;color:rgba(255,255,255,.5);margin-bottom:6px}
        .empty-sub{font-size:12px;color:rgba(255,255,255,.22)}

        /* MODAL */
        .overlay{position:fixed;inset:0;background:rgba(0,0,0,.82);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;z-index:999;padding:8px;animation:fadeIn .2s ease-out}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        .mbox{background:#0f0f0f;border:1px solid rgba(255,255,255,.07);border-radius:18px;width:100%;max-width:680px;max-height:92vh;overflow-y:auto;animation:scaleIn .28s cubic-bezier(.34,1.4,.64,1);box-shadow:0 40px 100px rgba(0,0,0,.75);scrollbar-width:thin;scrollbar-color:#222 #0f0f0f}
        @keyframes scaleIn{from{opacity:0;transform:scale(.94) translateY(14px)}to{opacity:1;transform:scale(1) translateY(0)}}
        .mheader{display:flex;align-items:center;justify-content:space-between;padding:20px 24px 16px;border-bottom:1px solid rgba(255,255,255,.06)}
        .moid{font-size:20px;font-weight:800;color:#fff;margin-bottom:2px}
        .mosub{font-size:11px;color:rgba(255,255,255,.3)}
        .mclose{width:30px;height:30px;border-radius:8px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;cursor:pointer;color:rgba(255,255,255,.6);transition:all .2s}
        .mclose:hover{background:rgba(255,255,255,.1);color:#fff}
        .mbody{padding:20px 24px}
        .msbanner{border:1px solid;border-radius:10px;padding:10px 14px;margin-bottom:16px}
        .m2col{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:18px}
        .mcell{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:14px}
        .mclabel{display:flex;align-items:center;gap:6px;font-size:10px;font-weight:700;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px}
        .mrow{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
        .mrl{font-size:10px;color:rgba(255,255,255,.28)}
        .mrv{font-size:12px;font-weight:700;color:#fff;text-align:right}
        .mseclabel{font-size:9px;font-weight:700;color:rgba(255,255,255,.28);text-transform:uppercase;letter-spacing:.6px;margin-bottom:10px}
        .mitems{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.05);border-radius:12px;overflow:hidden;margin-bottom:4px}
        .mitem{display:flex;align-items:center;gap:12px;padding:12px 14px;border-bottom:1px solid rgba(255,255,255,.04)}
        .mitem:last-of-type{border-bottom:none}
        .mitem-img{width:46px;height:46px;border-radius:8px;object-fit:cover;border:1px solid rgba(255,255,255,.08);flex-shrink:0}
        .mitem-info{flex:1;min-width:0}
        .mitem-name{font-size:12px;font-weight:700;color:#fff;margin-bottom:2px}
        .mitem-qty{font-size:10px;color:rgba(255,255,255,.3)}
        .mitem-price{font-size:13px;font-weight:800;color:#22c55e;white-space:nowrap}
        .mtotal-row{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;background:rgba(34,197,94,.04)}
        .mtotal-label{font-size:11px;font-weight:700;color:rgba(255,255,255,.4)}
        .mtotal-val{font-size:20px;font-weight:900;color:#22c55e}
        .mstatus-btns{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:16px}
        .msb{display:flex;align-items:center;gap:5px;padding:7px 13px;border-radius:8px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.04);font-size:11px;font-weight:700;color:rgba(255,255,255,.5);font-family:'Poppins',sans-serif;cursor:pointer;transition:all .2s}
        .msb:hover{border-color:rgba(255,255,255,.2);color:#fff}
        .msb:disabled{opacity:.55;cursor:not-allowed}
        .mclose-btn{width:100%;padding:13px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:10px;font-size:13px;font-weight:700;color:rgba(255,255,255,.6);font-family:'Poppins',sans-serif;cursor:pointer;transition:all .2s}
        .mclose-btn:hover{background:rgba(255,255,255,.09);color:#fff}

        *{scrollbar-width:thin;scrollbar-color:#222 #0a0a0a}
        *::-webkit-scrollbar{width:5px}
        *::-webkit-scrollbar-track{background:#0a0a0a}
        *::-webkit-scrollbar-thumb{background:#222;border-radius:999px}
      `}</style>

      {/* HERO */}
      <div className="hero-card">
        <div className="hero-grid" />
        <div className="hero-left">
          <div className="hero-badge">
            <ShoppingCart size={11} weight="fill" /> Orders Management
          </div>
          <h1 className="hero-title">
            Track Every Order From Placement to Delivery
          </h1>
          <p className="hero-sub">
            Monitor order statuses, update fulfilment stages, and keep customers
            informed every step of the way.
          </p>
          <div className="hero-acts">
            <button className="hero-primary">
              <Receipt size={15} weight="bold" /> View All Orders
            </button>
            <button className="hero-ghost">Export Orders</button>
          </div>
        </div>
        <div className="hero-right">
          <img
            src="/assets/categories/Removed-Bg-Nike-shoe.jpg"
            alt="Orders"
            className="hero-img"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>
      </div>

      <StatCards
        total={orders.length}
        revenue={revenue}
        pending={pending}
        avgValue={avgValue}
      />

      {/* FILTERS */}
      <div className="filters-wrap">
        <div className="filters-top">
          <div className="fi-wrap">
            <MagnifyingGlass
              size={14}
              color="rgba(255,255,255,0.25)"
              className="fi-icon"
            />
            <input
              className="fi"
              type="text"
              placeholder="Search by order ID, customer, email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="exp-btn">
            <Download size={13} weight="bold" /> Export
          </button>
        </div>
        <div className="stabs">
          {statusKeys.map((k) => {
            const cfg = STATUS_CFG[k];
            const Icon = cfg?.Icon || ShoppingCart;
            return (
              <button
                key={k}
                className={`stab ${filter === k ? "stab-on" : ""}`}
                onClick={() => setFilter(k)}
              >
                {k !== "all" && <Icon size={11} weight="fill" />}
                {k === "all"
                  ? "All Orders"
                  : k.charAt(0).toUpperCase() + k.slice(1)}
                <span className="stab-cnt">{statusCnt[k]}</span>
              </button>
            );
          })}
        </div>
        <div className="fres">
          Showing <span>{filtered.length}</span> of {orders.length} orders
        </div>
      </div>

      {/* LIST */}
      {loading ? (
        <div className="loading-wrap">
          <div className="spinner" />
          <div className="ltxt">Loading orders…</div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">
            <ShoppingCart
              size={28}
              color="rgba(255,255,255,0.2)"
              weight="duotone"
            />
          </div>
          <div className="empty-title">No orders found</div>
          <div className="empty-sub">
            Try adjusting your filters or search terms
          </div>
        </div>
      ) : (
        <div className="orders-list">
          {filtered.map((o, i) => (
            <OrderRow key={o.id} order={o} onView={setSelected} index={i} />
          ))}
        </div>
      )}

      <OrderModal
        order={selected}
        onClose={() => setSelected(null)}
        onUpdateStatus={updateStatus}
      />
    </div>
  );
}
