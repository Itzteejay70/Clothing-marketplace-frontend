import { useEffect, useState } from "react";
import {
  Users,
  MagnifyingGlass,
  Eye,
  Trash,
  X,
  Warning,
  CaretDown,
  EnvelopeSimple,
  Phone,
  MapPin,
  Calendar,
  UserCircle,
  Storefront,
  CrownSimple,
  Package,
  ShieldCheck,
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

function StatCards({ total, customers, vendors, active }) {
  const tot = total || 1;
  const cards = [
    {
      label: "Total Users",
      value: useCountUp(total),
      sub: "Registered accounts",
      trend: `${total} total`,
      bar: 100,
    },
    {
      label: "Customers",
      value: useCountUp(customers),
      sub: "Shopping on platform",
      trend: `${customers} buyers`,
      bar: Math.round((customers / tot) * 100),
    },
    {
      label: "Vendors",
      value: useCountUp(vendors),
      sub: "Active storefronts",
      trend: `${vendors} stores`,
      bar: Math.round((vendors / tot) * 100),
    },
    {
      label: "Active Users",
      value: useCountUp(active),
      sub: "Currently active",
      trend: `${active} online`,
      bar: Math.round((active / tot) * 100),
    },
  ];
  return (
    <div className="stats-bar">
      {cards.map((c, i) => (
        <div
          key={i}
          className="stat-tile fade-up"
          style={{ animationDelay: `${60 + i * 60}ms` }}
        >
          <div className="stat-top-row">
            <span className="stat-val">{c.value.toLocaleString()}</span>
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

const ROLE_CFG = {
  customer: {
    color: "#22c55e",
    bg: "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.25)",
    Icon: UserCircle,
    label: "Customer",
  },
  vendor: {
    color: "#22c55e",
    bg: "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.25)",
    Icon: Storefront,
    label: "Vendor",
  },
  admin: {
    color: "#22c55e",
    bg: "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.25)",
    Icon: CrownSimple,
    label: "Admin",
  },
};

function RoleBadge({ role }) {
  const c = ROLE_CFG[role] || ROLE_CFG.customer;
  return (
    <span
      className="role-badge"
      style={{
        color: c.color,
        background: c.bg,
        border: `1px solid ${c.border}`,
      }}
    >
      <c.Icon size={10} weight="fill" /> {c.label}
    </span>
  );
}
function StatusDot({ status }) {
  const on = status === "active";
  return (
    <span
      className="sdot-wrap"
      style={{ color: on ? "#22c55e" : "rgba(255,255,255,0.3)" }}
    >
      <span
        className="sdot"
        style={{ background: on ? "#22c55e" : "rgba(255,255,255,0.2)" }}
      />
      {on ? "Active" : "Inactive"}
    </span>
  );
}

function UserCard({ user, onView, onDeleteConfirm, index }) {
  const initials = user.fullName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className="user-card fade-up"
      style={{ animationDelay: `${index * 45}ms` }}
    >
      <div className="card-header">
        <div className="card-header-badges">
          <RoleBadge role={user.role} />
          <StatusDot status={user.status} />
        </div>
      </div>
      <div className="card-identity">
        <div className="card-avatar">
          <span className="card-initials">{initials}</span>
        </div>
        <div>
          <div className="card-name">{user.fullName}</div>
          <div className="card-email">{user.email}</div>
          <div className="card-active">{user.lastActive}</div>
        </div>
      </div>
      <div className="card-body">
        {user.role === "customer" && (
          <div className="card-stats">
            <div className="cs">
              <div className="cs-label">Orders</div>
              <div className="cs-val">{user.totalOrders}</div>
            </div>
            <div className="cs-div" />
            <div className="cs">
              <div className="cs-label">Spent</div>
              <div className="cs-val">
                <span className="naira">₦</span>
                {(user.totalSpent / 1000).toFixed(0)}k
              </div>
            </div>
            <div className="cs-div" />
            <div className="cs">
              <div className="cs-label">Points</div>
              <div className="cs-val">{user.loyaltyPoints}</div>
            </div>
          </div>
        )}
        {user.role === "vendor" && (
          <div className="vendor-pill">
            <Storefront size={11} color="#22c55e" weight="fill" />
            <span>{user.businessName}</span>
            <span className="vp-right">
              <Package size={10} /> {user.totalProducts} products
            </span>
          </div>
        )}
        {user.role === "admin" && (
          <div className="vendor-pill">
            <CrownSimple size={11} color="#22c55e" weight="fill" />
            <span style={{ color: "#22c55e" }}>Platform Administrator</span>
          </div>
        )}
        <div className="card-joined">
          <Calendar size={10} weight="fill" /> Joined {user.joinedDate}
        </div>
        <div className="card-actions">
          <button className="cbtn cbtn-view" onClick={() => onView(user)}>
            <Eye size={12} weight="bold" /> View
          </button>
          <button
            className="cbtn cbtn-del"
            onClick={() => onDeleteConfirm(user)}
          >
            <Trash size={12} weight="bold" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ user, onClose, onConfirm }) {
  if (!user) return null;
  const initials = user.fullName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="overlay" onClick={onClose}>
      <div className="mbox mbox-sm" onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: "28px 24px", textAlign: "center" }}>
          <div className="conf-icon">
            <Warning size={22} color="#ef4444" weight="fill" />
          </div>
          <div className="conf-title">Delete this user?</div>
          <div className="conf-sub">
            This will permanently remove <strong>{user.fullName}</strong> and
            all their data. This cannot be undone.
          </div>
          <div className="del-card">
            <div className="del-av">
              <span style={{ color: "#22c55e", fontSize: 13, fontWeight: 900 }}>
                {initials}
              </span>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>
                {user.fullName}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                {user.email}
              </div>
            </div>
          </div>
          <div className="conf-btns">
            <button className="mbtn mbtn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button
              className="mbtn mbtn-del"
              onClick={() => onConfirm(user.id)}
            >
              <Trash size={14} weight="bold" /> Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserModal({ user, onClose, onDeleteConfirm }) {
  if (!user) return null;
  const initials = user.fullName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="overlay" onClick={onClose}>
      <div className="mbox" onClick={(e) => e.stopPropagation()}>
        {/* FIXED hero — 150px tall, avatar anchored at bottom-left */}
        <div className="mhero">
          <div className="mhero-pat" />
          <div className="mhero-overlay" />
          <button className="mclose" onClick={onClose}>
            <X size={14} weight="bold" />
          </button>
          <div className="mav-wrap">
            <div className="mav">
              <span className="mav-init">{initials}</span>
            </div>
          </div>
        </div>
        {/* name block — padded down so it clears the avatar that protrudes below hero */}
        <div className="mname-block">
          <div className="mfullname">{user.fullName}</div>
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              marginTop: 6,
            }}
          >
            <RoleBadge role={user.role} />
            <StatusDot status={user.status} />
          </div>
        </div>
        <div className="mbody">
          <div className="m2col">
            <div className="mcell">
              <div className="mclabel">
                <EnvelopeSimple size={11} color="#3b82f6" weight="fill" /> Email
              </div>
              <div className="mcval">{user.email}</div>
            </div>
            <div className="mcell">
              <div className="mclabel">
                <Phone size={11} color="#22c55e" weight="fill" /> Phone
              </div>
              <div className="mcval">{user.phone}</div>
            </div>
          </div>
          <div className="mcell" style={{ marginBottom: 12 }}>
            <div className="mclabel">
              <MapPin size={11} color="#a855f7" weight="fill" /> Address
            </div>
            <div className="mcval">{user.address}</div>
          </div>
          {user.role === "customer" && (
            <div className="mstats">
              <div className="msc">
                <div className="msc-label">Total Orders</div>
                <div className="msc-val" style={{ color: "#22c55e" }}>
                  {user.totalOrders}
                </div>
              </div>
              <div className="msc">
                <div className="msc-label">Total Spent</div>
                <div
                  className="msc-val"
                  style={{ color: "#3b82f6", fontSize: 13 }}
                >
                  <span className="naira">₦</span>
                  {user.totalSpent.toLocaleString()}
                </div>
              </div>
              <div className="msc">
                <div className="msc-label">Loyalty Points</div>
                <div className="msc-val" style={{ color: "#f59e0b" }}>
                  {user.loyaltyPoints}
                </div>
              </div>
            </div>
          )}
          {user.role === "vendor" && (
            <div className="mcell" style={{ marginBottom: 12 }}>
              <div className="mclabel">
                <Storefront size={11} color="#22c55e" weight="fill" /> Business
              </div>
              <div className="mcval">
                {user.businessName} · {user.totalProducts} products
              </div>
            </div>
          )}
          <div className="m2col">
            <div className="mcell">
              <div className="mclabel">
                <Calendar size={11} weight="fill" /> Joined
              </div>
              <div className="mcval">{user.joinedDate}</div>
            </div>
            <div className="mcell">
              <div className="mclabel">Last Active</div>
              <div className="mcval">{user.lastActive}</div>
            </div>
          </div>
          <div className="mactions">
            <button className="mbtn mbtn-ghost" onClick={onClose}>
              Close
            </button>
            <button
              className="mbtn mbtn-del"
              onClick={() => {
                onClose();
                onDeleteConfirm(user);
              }}
            >
              <Trash size={14} weight="bold" /> Delete User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const INITIAL_USERS = [
  {
    id: 1,
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+234 801 234 5678",
    role: "customer",
    joinedDate: "2024-01-15",
    lastActive: "2 hours ago",
    totalOrders: 24,
    totalSpent: 1250000,
    status: "active",
    address: "123 Main Street, Victoria Island, Lagos",
    loyaltyPoints: 1250,
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "jane@example.com",
    phone: "+234 802 345 6789",
    role: "vendor",
    joinedDate: "2024-01-10",
    lastActive: "1 day ago",
    totalOrders: 0,
    totalSpent: 0,
    status: "active",
    address: "456 Park Avenue, Wuse 2, Abuja",
    businessName: "Kicks Store",
    totalProducts: 45,
  },
  {
    id: 3,
    fullName: "Mike Johnson",
    email: "mike@example.com",
    phone: "+234 803 456 7890",
    role: "customer",
    joinedDate: "2024-01-08",
    lastActive: "30 mins ago",
    totalOrders: 18,
    totalSpent: 980000,
    status: "active",
    address: "789 Beach Road, Port Harcourt, Rivers State",
    loyaltyPoints: 980,
  },
  {
    id: 4,
    fullName: "Sarah Williams",
    email: "sarah@example.com",
    phone: "+234 804 567 8901",
    role: "admin",
    joinedDate: "2024-01-01",
    lastActive: "Online now",
    totalOrders: 0,
    totalSpent: 0,
    status: "active",
    address: "321 Hill View, Ibadan, Oyo State",
  },
  {
    id: 5,
    fullName: "David Brown",
    email: "david@example.com",
    phone: "+234 805 678 9012",
    role: "customer",
    joinedDate: "2024-01-12",
    lastActive: "5 hours ago",
    totalOrders: 15,
    totalSpent: 750000,
    status: "active",
    address: "567 Admiralty Way, Lekki, Lagos",
    loyaltyPoints: 750,
  },
  {
    id: 6,
    fullName: "Grace Okoro",
    email: "grace@example.com",
    phone: "+234 806 789 0123",
    role: "vendor",
    joinedDate: "2024-01-14",
    lastActive: "3 days ago",
    totalOrders: 0,
    totalSpent: 0,
    status: "active",
    address: "890 Allen Avenue, Ikeja, Lagos",
    businessName: "Fashion Hub NG",
    totalProducts: 32,
  },
  {
    id: 7,
    fullName: "Emmanuel Obi",
    email: "emmanuel@example.com",
    phone: "+234 807 890 1234",
    role: "customer",
    joinedDate: "2023-12-20",
    lastActive: "1 week ago",
    totalOrders: 8,
    totalSpent: 420000,
    status: "inactive",
    address: "234 Herbert Macaulay, Yaba, Lagos",
    loyaltyPoints: 420,
  },
  {
    id: 8,
    fullName: "Chinedu Eze",
    email: "chinedu@example.com",
    phone: "+234 808 901 2345",
    role: "customer",
    joinedDate: "2024-01-05",
    lastActive: "10 mins ago",
    totalOrders: 32,
    totalSpent: 1680000,
    status: "active",
    address: "678 Opebi Road, Ikeja, Lagos",
    loyaltyPoints: 1680,
  },
  {
    id: 9,
    fullName: "Blessing Adeyemi",
    email: "blessing@example.com",
    phone: "+234 809 012 3456",
    role: "vendor",
    joinedDate: "2024-01-18",
    lastActive: "2 days ago",
    totalOrders: 0,
    totalSpent: 0,
    status: "active",
    address: "456 Awolowo Road, Ikoyi, Lagos",
    businessName: "Street Wear Co",
    totalProducts: 28,
  },
  {
    id: 10,
    fullName: "Tunde Bakare",
    email: "tunde@example.com",
    phone: "+234 810 123 4567",
    role: "customer",
    joinedDate: "2023-11-15",
    lastActive: "45 mins ago",
    totalOrders: 42,
    totalSpent: 2340000,
    status: "active",
    address: "123 Banana Island, Ikoyi, Lagos",
    loyaltyPoints: 2340,
  },
  {
    id: 11,
    fullName: "Amaka Nwosu",
    email: "amaka@example.com",
    phone: "+234 811 234 5678",
    role: "customer",
    joinedDate: "2024-01-20",
    lastActive: "Just now",
    totalOrders: 5,
    totalSpent: 285000,
    status: "active",
    address: "345 Fola Osibo, Lekki Phase 1, Lagos",
    loyaltyPoints: 285,
  },
  {
    id: 12,
    fullName: "Olusegun Peters",
    email: "olusegun@example.com",
    phone: "+234 812 345 6789",
    role: "customer",
    joinedDate: "2023-12-01",
    lastActive: "2 weeks ago",
    totalOrders: 3,
    totalSpent: 156000,
    status: "inactive",
    address: "789 Bourdillon Road, Ikoyi, Lagos",
    loyaltyPoints: 156,
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelected] = useState(null);
  const [deleteTarget, setDelTgt] = useState(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRole] = useState("all");
  const [statusFilter, setStatus] = useState("all");

  useEffect(() => {
    setTimeout(() => {
      setUsers(INITIAL_USERS);
      setLoading(false);
    }, 900);
  }, []);

  const deleteUser = (id) => {
    setUsers((p) => p.filter((u) => u.id !== id));
    setDelTgt(null);
    setSelected(null);
  };

  const filtered = users.filter((u) => {
    const s = search.toLowerCase();
    return (
      (u.fullName.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s) ||
        u.phone.toLowerCase().includes(s)) &&
      (roleFilter === "all" || u.role === roleFilter) &&
      (statusFilter === "all" || u.status === statusFilter)
    );
  });

  const customers = users.filter((u) => u.role === "customer").length;
  const vendors = users.filter((u) => u.role === "vendor").length;
  const active = users.filter((u) => u.status === "active").length;
  const roleCnt = {
    all: users.length,
    customer: customers,
    vendor: vendors,
    admin: users.filter((u) => u.role === "admin").length,
  };

  return (
    <div className="us-root">
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        .us-root{min-height:100vh;background:#0a0a0a;font-family:'Poppins',sans-serif;color:#fff;padding:24px 28px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp 0.5s ease-out forwards;opacity:0}
        .naira{font-family:Arial,system-ui,sans-serif}
        button,select,a,[role="button"]{cursor:pointer}

        /* HERO — primary green */
        .hero-card{position:relative;overflow:hidden;width:100%;border-radius:20px;background:#0f3318;margin-bottom:22px;height:280px;animation:fadeUp 0.45s ease-out forwards;display:flex;border:1px solid rgba(34,197,94,0.12)}
        .hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(34,197,94,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(34,197,94,0.04) 1px,transparent 1px);background-size:32px 32px;pointer-events:none}
        .hero-left{flex:1;padding:40px;display:flex;flex-direction:column;justify-content:center;position:relative;z-index:2}
        .hero-badge{display:inline-flex;align-items:center;gap:5px;background:rgba(34,197,94,0.05);color:#22c55e;border:1px solid rgba(34,197,94,0.4);font-size:9px;font-weight:700;padding:4px 10px;border-radius:8px;margin-bottom:14px;letter-spacing:.6px;text-transform:uppercase;box-shadow:0 0 8px rgba(34,197,94,0.2)}
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
        .stat-val{font-size:28px;font-weight:700;color:#fff;letter-spacing:-1.5px;font-variant-numeric:tabular-nums}
        .stat-label{font-size:12px;font-weight:700;color:rgba(255,255,255,.72);margin-bottom:2px}
        .stat-sub{font-size:10.5px;font-weight:500;color:rgba(255,255,255,.22);margin-bottom:14px}
        .stat-bar-track{height:3px;background:rgba(255,255,255,.05);border-radius:99px;overflow:hidden}
        @keyframes barGrow{from{width:0%}to{width:var(--bar-w)}}
        .stat-bar-fill{height:100%;width:var(--bar-w);background:#eab308;border-radius:99px;animation:barGrow 1.4s cubic-bezier(.4,0,.2,1) forwards;box-shadow:0 0 8px rgba(234,179,8,.55)}

        /* FILTERS */
        .filters-wrap{background:#111;border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:16px 18px;margin-bottom:14px}
        .filters-top{display:grid;grid-template-columns:1fr auto;gap:10px;margin-bottom:12px}
        .fi-wrap{position:relative}
        .fi-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);pointer-events:none}
        .fi{width:100%;padding:9px 12px 9px 36px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:10px;font-size:12px;font-weight:500;color:#fff;font-family:'Poppins',sans-serif;outline:none}
        .fi::placeholder{color:rgba(255,255,255,.25)}
        .fi:focus{border-color:rgba(34,197,94,.4)}
        .sel-wrap{position:relative}
        .sel{padding:9px 28px 9px 12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:10px;font-size:12px;font-weight:600;color:rgba(255,255,255,.65);font-family:'Poppins',sans-serif;outline:none;cursor:pointer;appearance:none;color-scheme:dark;min-width:155px}
        .sel:focus{border-color:rgba(34,197,94,.4)}
        .sel option{background:#1a1a1a}
        .sel-caret{position:absolute;right:9px;top:50%;transform:translateY(-50%);pointer-events:none}
        .stabs{display:flex;gap:6px;margin-bottom:10px}
        .stab{display:flex;align-items:center;gap:5px;padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.03);font-size:11px;font-weight:700;color:rgba(255,255,255,.4);font-family:'Poppins',sans-serif;cursor:pointer;transition:all .2s}
        .stab:hover{color:rgba(255,255,255,.7)}
        .stab-on{background:rgba(34,197,94,.08);border-color:rgba(34,197,94,.25);color:#22c55e}
        .stab-cnt{padding:1px 6px;border-radius:20px;background:rgba(255,255,255,.07);font-size:9px}
        .stab-on .stab-cnt{background:rgba(34,197,94,.15)}
        .fres{font-size:11px;color:rgba(255,255,255,.3);padding-top:10px;border-top:1px solid rgba(255,255,255,.05)}
        .fres span{color:#22c55e;font-weight:700}

        /* ROLE BADGE & STATUS DOT */
        .role-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:20px;font-size:10px;font-weight:700}
        .sdot-wrap{display:flex;align-items:center;gap:5px;font-size:10px;font-weight:600}
        .sdot{width:6px;height:6px;border-radius:50%;flex-shrink:0}

        /* USER CARD */
        .users-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:16px}
        .user-card{background:#111;border:1px solid rgba(255,255,255,.06);border-radius:18px;overflow:hidden;transition:transform .3s cubic-bezier(.34,1.4,.64,1),border-color .25s,box-shadow .3s}
        .user-card:hover{transform:translateY(-5px);border-color:rgba(34,197,94,.28);box-shadow:0 16px 48px rgba(0,0,0,.5)}
        /* GREEN header strip — no overlap since avatar is BELOW the strip */
        .card-header{height:76px;background:linear-gradient(135deg,#0f3318 0%,#0a2210 100%);border-bottom:1px solid rgba(34,197,94,.15);position:relative;padding:12px 14px 0}
        .card-header::after{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(34,197,94,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(34,197,94,.05) 1px,transparent 1px);background-size:20px 20px;pointer-events:none}
        .card-header-badges{display:flex;align-items:center;justify-content:space-between;position:relative;z-index:2}
        /* identity row — sits BELOW strip, no negative margin */
        .card-identity{display:flex;align-items:center;gap:10px;padding:14px 14px 0;margin-bottom:12px}
        .card-avatar{width:46px;height:46px;border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:rgba(34,197,94,.12);border:2px solid rgba(34,197,94,.25)}
        .card-initials{font-size:14px;font-weight:900;color:#22c55e}
        .card-name{font-size:13px;font-weight:800;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:1px}
        .card-email{font-size:11px;color:rgba(255,255,255,.3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:3px}
        .card-active{font-size:10px;color:rgba(255,255,255,.2)}
        .card-body{padding:0 14px 14px}
        .card-stats{display:flex;align-items:center;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:10px;margin-bottom:10px}
        .cs{flex:1;text-align:center}
        .cs-label{font-size:9px;font-weight:700;color:rgba(255,255,255,.25);text-transform:uppercase;letter-spacing:.4px;margin-bottom:2px}
        .cs-val{font-size:13px;font-weight:800;color:#fff}
        .cs-div{width:1px;height:28px;background:rgba(255,255,255,.07)}
        .vendor-pill{display:flex;align-items:center;gap:6px;background:rgba(34,197,94,.06);border:1px solid rgba(34,197,94,.14);border-radius:10px;padding:8px 10px;margin-bottom:10px;font-size:11px;font-weight:600;color:rgba(34,197,94,.8)}
        .vp-right{display:flex;align-items:center;gap:3px;margin-left:auto;font-size:10px;color:rgba(255,255,255,.3)}
        .card-joined{font-size:10px;color:rgba(255,255,255,.2);display:flex;align-items:center;gap:5px;margin-bottom:12px}
        .card-actions{display:grid;grid-template-columns:1fr 1fr;gap:6px}
        .cbtn{display:flex;align-items:center;justify-content:center;gap:4px;padding:8px;border-radius:8px;border:none;cursor:pointer;font-size:11px;font-weight:700;font-family:'Poppins',sans-serif;transition:all .2s}
        .cbtn-view{background:rgba(34,197,94,.1);color:#22c55e;border:1px solid rgba(34,197,94,.22)}
        .cbtn-view:hover{background:#22c55e;color:#000}
        .cbtn-del{background:rgba(239,68,68,.07);color:rgba(239,68,68,.7);border:1px solid rgba(239,68,68,.18)}
        .cbtn-del:hover{background:#ef4444;color:#fff}

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
        .mbox{background:#0f0f0f;border:1px solid rgba(255,255,255,.07);border-radius:18px;width:100%;max-width:500px;max-height:92vh;overflow-y:auto;animation:scaleIn .28s cubic-bezier(.34,1.4,.64,1);box-shadow:0 40px 100px rgba(0,0,0,.75);scrollbar-width:thin;scrollbar-color:#222 #0f0f0f}
        .mbox-sm{max-width:400px}
        @keyframes scaleIn{from{opacity:0;transform:scale(.94) translateY(14px)}to{opacity:1;transform:scale(1) translateY(0)}}

        /* FIXED modal hero — tall (150px), avatar anchored inside at bottom */
        .mhero{position:relative;height:150px;border-radius:18px 18px 0 0;background:linear-gradient(135deg,#0f3318 0%,#082010 100%);border-bottom:1px solid rgba(34,197,94,.18);overflow:hidden}
        .mhero-pat{position:absolute;inset:0;background-image:linear-gradient(rgba(34,197,94,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(34,197,94,.05) 1px,transparent 1px);background-size:24px 24px}
        .mhero-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 0%,rgba(15,15,15,.55) 100%)}
        .mclose{position:absolute;top:14px;right:14px;width:30px;height:30px;border-radius:8px;background:rgba(0,0,0,.4);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;cursor:pointer;color:rgba(255,255,255,.7);transition:all .2s;z-index:5}
        .mclose:hover{background:rgba(0,0,0,.7);color:#fff}
        /* avatar sits fully inside the hero at the bottom-left corner */
        .mav-wrap{position:absolute;bottom:16px;left:22px;z-index:3}
        .mav{width:56px;height:56px;border-radius:14px;display:flex;align-items:center;justify-content:center;background:rgba(34,197,94,.15);border:2px solid rgba(34,197,94,.3);box-shadow:0 4px 16px rgba(0,0,0,.5)}
        .mav-init{font-size:17px;font-weight:900;color:#22c55e}
        /* name block — no offset needed since avatar is inside hero */
        .mname-block{padding:18px 22px 4px}
        .mfullname{font-size:18px;font-weight:800;color:#fff;margin-bottom:4px}
        .mbody{padding:14px 22px 20px}
        .m2col{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}
        .mcell{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:10px 12px;margin-bottom:0}
        .mclabel{display:flex;align-items:center;gap:5px;font-size:9px;font-weight:700;color:rgba(255,255,255,.28);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}
        .mcval{font-size:12px;font-weight:700;color:#fff}
        .mstats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:10px}
        .msc{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:12px;text-align:center}
        .msc-label{font-size:9px;font-weight:700;color:rgba(255,255,255,.25);text-transform:uppercase;letter-spacing:.5px;margin-bottom:5px}
        .msc-val{font-size:16px;font-weight:900}
        .mactions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px}
        .mbtn{display:flex;align-items:center;justify-content:center;gap:7px;padding:11px;border-radius:9px;border:none;cursor:pointer;font-size:13px;font-weight:800;font-family:'Poppins',sans-serif;transition:all .2s}
        .mbtn:disabled{opacity:.55;cursor:not-allowed}
        .mbtn-ghost{background:rgba(255,255,255,.05);color:rgba(255,255,255,.6);border:1px solid rgba(255,255,255,.1)}
        .mbtn-ghost:hover:not(:disabled){background:rgba(255,255,255,.09);color:#fff}
        .mbtn-del{background:#ef4444;color:#fff;border:1px solid #ef4444}
        .mbtn-del:hover:not(:disabled){background:#dc2626}
        .conf-icon{width:52px;height:52px;border-radius:14px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.22);display:flex;align-items:center;justify-content:center;margin:0 auto 12px}
        .conf-title{font-size:17px;font-weight:800;color:#fff;margin-bottom:8px}
        .conf-sub{font-size:12.5px;color:rgba(255,255,255,.4);line-height:1.65;margin-bottom:14px}
        .conf-sub strong{color:rgba(255,255,255,.75)}
        .del-card{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:12px 14px;margin-bottom:16px;text-align:left}
        .del-av{width:40px;height:40px;border-radius:10px;background:rgba(34,197,94,.12);border:1.5px solid rgba(34,197,94,.25);display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .conf-btns{display:grid;grid-template-columns:1fr 1fr;gap:8px}

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
            <Users size={11} weight="fill" /> Users Management
          </div>
          <h1 className="hero-title">Manage Everyone on Your Platform</h1>
          <p className="hero-sub">
            Oversee customers, vendors, and admins. View activity, spending, and
            account details — all in one place.
          </p>
          <div className="hero-acts">
            <button className="hero-primary">
              <ShieldCheck size={15} weight="bold" /> View All Users
            </button>
            <button className="hero-ghost">Export Data</button>
          </div>
        </div>
        <div className="hero-right">
          <img
            src="/assets/categories/VendorPageImg.png"
            alt="Users"
            className="hero-img"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>
      </div>

      <StatCards
        total={users.length}
        customers={customers}
        vendors={vendors}
        active={active}
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
              placeholder="Search by name, email, phone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="sel-wrap">
            <select
              className="sel"
              value={roleFilter}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="all">All Roles ({roleCnt.all})</option>
              <option value="customer">Customers ({roleCnt.customer})</option>
              <option value="vendor">Vendors ({roleCnt.vendor})</option>
              <option value="admin">Admins ({roleCnt.admin})</option>
            </select>
            <CaretDown
              size={12}
              color="rgba(255,255,255,0.3)"
              className="sel-caret"
            />
          </div>
        </div>
        <div className="stabs">
          {[
            { k: "all", l: "All Users" },
            { k: "active", l: "Active" },
            { k: "inactive", l: "Inactive" },
          ].map(({ k, l }) => (
            <button
              key={k}
              className={`stab ${statusFilter === k ? "stab-on" : ""}`}
              onClick={() => setStatus(k)}
            >
              {l}
              <span className="stab-cnt">
                {k === "all"
                  ? users.length
                  : users.filter((u) => u.status === k).length}
              </span>
            </button>
          ))}
        </div>
        <div className="fres">
          Showing <span>{filtered.length}</span> of {users.length} users
        </div>
      </div>

      {/* GRID */}
      {loading ? (
        <div className="loading-wrap">
          <div className="spinner" />
          <div className="ltxt">Loading users…</div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">
            <Users size={28} color="rgba(255,255,255,0.2)" weight="duotone" />
          </div>
          <div className="empty-title">No users found</div>
          <div className="empty-sub">
            Try adjusting your filters or search terms
          </div>
        </div>
      ) : (
        <div className="users-grid">
          {filtered.map((u, i) => (
            <UserCard
              key={u.id}
              user={u}
              onView={setSelected}
              onDeleteConfirm={setDelTgt}
              index={i}
            />
          ))}
        </div>
      )}

      <UserModal
        user={selectedUser}
        onClose={() => setSelected(null)}
        onDeleteConfirm={(u) => {
          setSelected(null);
          setDelTgt(u);
        }}
      />
      <DeleteModal
        user={deleteTarget}
        onClose={() => setDelTgt(null)}
        onConfirm={deleteUser}
      />
    </div>
  );
}
