import { useState, useEffect } from "react";
import {
  HiCurrencyDollar,
  HiCreditCard,
  HiArrowDown,
  HiArrowUp,
  HiSearch,
  HiDownload,
  HiFilter,
  HiClock,
  HiCheckCircle,
  HiExclamationCircle,
  HiRefresh,
  HiCalendar,
  HiX,
} from "react-icons/hi";

export default function PaymentReports() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("30days");
  const [selectedPayment, setSelectedPayment] = useState(null);

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
          amount: 52000,
          platformFee: 5200,
          vendorAmount: 46800,
          paymentMethod: "card",
          cardLast4: "9012",
          status: "failed",
          createdAt: "2024-01-13T18:30:00",
          vendor: "Kicks Store",
        },
        {
          id: "PAY-007",
          orderId: "ORD-1240",
          customerName: "Emmanuel Obi",
          customerEmail: "emmanuel@example.com",
          amount: 42000,
          platformFee: 4200,
          vendorAmount: 37800,
          paymentMethod: "card",
          cardLast4: "3456",
          status: "completed",
          createdAt: "2024-01-13T15:10:00",
          vendor: "Fashion Hub NG",
        },
        {
          id: "PAY-008",
          orderId: "ORD-1241",
          customerName: "Chinedu Eze",
          customerEmail: "chinedu@example.com",
          amount: 25000,
          platformFee: 2500,
          vendorAmount: 22500,
          paymentMethod: "transfer",
          bank: "Zenith Bank",
          status: "completed",
          createdAt: "2024-01-12T12:45:00",
          vendor: "Street Wear Co",
        },
        {
          id: "PAY-009",
          orderId: "ORD-1242",
          customerName: "Blessing Adeyemi",
          customerEmail: "blessing@example.com",
          amount: 18000,
          platformFee: 1800,
          vendorAmount: 16200,
          paymentMethod: "card",
          cardLast4: "7890",
          status: "refunded",
          createdAt: "2024-01-12T10:20:00",
          vendor: "Sports Hub NG",
        },
        {
          id: "PAY-010",
          orderId: "ORD-1243",
          customerName: "Tunde Bakare",
          customerEmail: "tunde@example.com",
          amount: 95000,
          platformFee: 9500,
          vendorAmount: 85500,
          paymentMethod: "card",
          cardLast4: "2468",
          status: "completed",
          createdAt: "2024-01-11T14:00:00",
          vendor: "Kicks Store",
        },
      ]);
      setLoading(false);
    }, 800);
  }, [dateRange]);

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusConfig = {
    completed: {
      bg: "rgba(22,163,74,0.1)",
      text: "#16a34a",
      label: "Completed",
      icon: HiCheckCircle,
    },
    pending: {
      bg: "rgba(245,158,11,0.1)",
      text: "#d97706",
      label: "Pending",
      icon: HiClock,
    },
    failed: {
      bg: "rgba(239,68,68,0.1)",
      text: "#dc2626",
      label: "Failed",
      icon: HiExclamationCircle,
    },
    refunded: {
      bg: "rgba(168,85,247,0.1)",
      text: "#9333ea",
      label: "Refunded",
      icon: HiRefresh,
    },
  };

  const totalRevenue = payments
    .filter((p) => p.status === "completed")
    .reduce((s, p) => s + p.amount, 0);
  const totalPlatformFee = payments
    .filter((p) => p.status === "completed")
    .reduce((s, p) => s + p.platformFee, 0);
  const totalVendorPayout = payments
    .filter((p) => p.status === "completed")
    .reduce((s, p) => s + p.vendorAmount, 0);
  const pendingCount = payments.filter((p) => p.status === "pending").length;
  const failedCount = payments.filter((p) => p.status === "failed").length;

  const statCards = [
    {
      label: "Total Revenue",
      value: `₦${totalRevenue.toLocaleString()}`,
      icon: HiCurrencyDollar,
      color: "#16a34a",
      colorBg: "rgba(22,163,74,0.12)",
    },
    {
      label: "Platform Fee",
      value: `₦${totalPlatformFee.toLocaleString()}`,
      icon: HiCreditCard,
      color: "#6366f1",
      colorBg: "rgba(99,102,241,0.12)",
    },
    {
      label: "Vendor Payouts",
      value: `₦${totalVendorPayout.toLocaleString()}`,
      icon: HiArrowDown,
      color: "#a855f7",
      colorBg: "rgba(168,85,247,0.12)",
    },
    {
      label: "Pending",
      value: pendingCount,
      icon: HiClock,
      color: "#d97706",
      colorBg: "rgba(245,158,11,0.12)",
    },
    {
      label: "Failed",
      value: failedCount,
      icon: HiExclamationCircle,
      color: "#dc2626",
      colorBg: "rgba(239,68,68,0.12)",
    },
  ];

  const avatarColors = [
    "#6366f1",
    "#a855f7",
    "#16a34a",
    "#f97316",
    "#3b82f6",
    "#ec4899",
    "#14b8a6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .pay-root * { box-sizing: border-box; }

        .pay-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: linear-gradient(135deg, #eef0ff 0%, #f5f0ff 40%, #edf9f0 100%);
          min-height: 100vh;
          padding: 28px 32px;
          position: relative;
        }

        .pay-root::before {
          content: '';
          position: fixed; top: -200px; left: -200px;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .pay-root::after {
          content: '';
          position: fixed; bottom: -150px; right: -150px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(22,163,74,0.1) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }

        .pay-inner { position: relative; z-index: 1; max-width: 1400px; margin: 0 auto; }

        .glass {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.9);
          border-radius: 20px;
          box-shadow: 0 4px 24px rgba(99,102,241,0.06), 0 1px 4px rgba(0,0,0,0.04);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .glass:hover { box-shadow: 0 8px 40px rgba(99,102,241,0.1), 0 2px 8px rgba(0,0,0,0.05); }

        /* Header */
        .pay-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; flex-wrap: wrap; gap: 16px; }
        .pay-header-left { display: flex; align-items: center; gap: 14px; }
        .pay-icon-wrap {
          width: 48px; height: 48px; border-radius: 16px;
          background: linear-gradient(135deg, #16a34a, #22c55e);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 14px rgba(22,163,74,0.3);
        }
        .pay-title { font-size: 26px; font-weight: 800; color: #0f172a; margin: 0 0 2px; letter-spacing: -0.5px; }
        .pay-sub { font-size: 13px; color: #64748b; font-weight: 500; margin: 0; }
        .pay-header-right { display: flex; align-items: center; gap: 10px; }

        .hdr-select {
          padding: 9px 14px; border: 1px solid rgba(99,102,241,0.2);
          border-radius: 12px; font-size: 13px; font-weight: 600; color: #475569;
          background: rgba(255,255,255,0.8); outline: none; font-family: inherit; cursor: pointer;
        }
        .hdr-select:focus { border-color: #6366f1; }

        .export-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 18px; border-radius: 12px;
          background: linear-gradient(135deg, #16a34a, #22c55e);
          color: white; font-size: 13px; font-weight: 700;
          border: none; cursor: pointer; font-family: inherit;
          box-shadow: 0 4px 12px rgba(22,163,74,0.3);
          transition: all 0.2s ease;
        }
        .export-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(22,163,74,0.4); }

        /* Stat Cards */
        .stat-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; margin-bottom: 18px; }
        @media (max-width: 1100px) { .stat-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 650px)  { .stat-grid { grid-template-columns: repeat(2, 1fr); } }

        .stat-card { padding: 18px 20px; }
        .stat-card-row { display: flex; align-items: center; gap: 12px; }
        .stat-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .stat-lbl { font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.4px; }
        .stat-val { font-size: 18px; font-weight: 800; color: #0f172a; margin-top: 2px; letter-spacing: -0.5px; }

        /* Filters */
        .filter-card { padding: 18px 20px; margin-bottom: 18px; }
        .filter-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .search-wrap { position: relative; flex: 1; min-width: 220px; }
        .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #94a3b8; width: 16px; height: 16px; }
        .search-input {
          width: 100%; padding: 10px 14px 10px 38px;
          border: 1px solid rgba(99,102,241,0.18); border-radius: 12px;
          font-size: 13px; font-weight: 500; color: #334155;
          background: rgba(248,250,252,0.8); outline: none; font-family: inherit;
          transition: border-color 0.2s;
        }
        .search-input:focus { border-color: #6366f1; background: white; }
        .search-input::placeholder { color: #94a3b8; }

        .filter-tabs { display: flex; gap: 6px; flex-wrap: wrap; }
        .filter-tab {
          padding: 8px 16px; border-radius: 10px; border: none; cursor: pointer;
          font-size: 12px; font-weight: 700; font-family: inherit; transition: all 0.2s ease;
          white-space: nowrap;
        }
        .filter-tab.active { background: linear-gradient(135deg, #16a34a, #22c55e); color: white; box-shadow: 0 3px 10px rgba(22,163,74,0.3); }
        .filter-tab.inactive { background: rgba(248,250,252,0.8); color: #64748b; border: 1px solid rgba(226,232,240,0.8); }
        .filter-tab.inactive:hover { background: rgba(22,163,74,0.06); color: #16a34a; border-color: rgba(22,163,74,0.2); }

        /* Table */
        .table-card { overflow: hidden; }
        .table-wrap { overflow-x: auto; }

        table { width: 100%; border-collapse: collapse; }
        thead tr { background: rgba(248,250,252,0.9); border-bottom: 1px solid rgba(226,232,240,0.8); }
        th {
          padding: 14px 18px; text-align: left;
          font-size: 10px; font-weight: 700; color: #94a3b8;
          text-transform: uppercase; letter-spacing: 0.6px; white-space: nowrap;
        }
        tbody tr { border-bottom: 1px solid rgba(241,245,249,0.8); transition: background 0.15s ease; cursor: pointer; }
        tbody tr:last-child { border-bottom: none; }
        tbody tr:hover { background: rgba(22,163,74,0.03); }
        td { padding: 14px 18px; vertical-align: middle; }

        .td-id { font-size: 12px; font-weight: 800; color: #0f172a; }
        .td-order { font-size: 12px; font-weight: 700; color: #334155; }
        .td-name { font-size: 12px; font-weight: 700; color: #0f172a; }
        .td-email { font-size: 10px; color: #94a3b8; margin-top: 2px; }
        .td-vendor { font-size: 12px; color: #475569; font-weight: 600; }
        .td-amount { font-size: 13px; font-weight: 800; color: #0f172a; }
        .td-fee { font-size: 12px; color: #64748b; font-weight: 600; }
        .td-payout { font-size: 13px; font-weight: 800; color: #16a34a; }
        .td-date { font-size: 11px; color: #94a3b8; font-weight: 500; white-space: nowrap; }

        .method-wrap { display: flex; align-items: center; gap: 6px; }
        .method-text { font-size: 11px; color: #475569; font-weight: 600; }

        .status-pill {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 4px 10px; border-radius: 999px;
          font-size: 10px; font-weight: 700; white-space: nowrap;
        }

        .cust-avatar-sm {
          width: 30px; height: 30px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800; color: white;
          flex-shrink: 0; margin-right: 8px;
        }
        .cust-cell { display: flex; align-items: center; }

        /* Loading / Empty */
        .loading-wrap { display: flex; align-items: center; justify-content: center; min-height: 380px; }
        .spinner { width: 44px; height: 44px; border: 3px solid rgba(22,163,74,0.15); border-top-color: #16a34a; border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .loading-text { font-size: 13px; color: #64748b; font-weight: 600; margin-top: 12px; }

        .empty-wrap { padding: 64px; text-align: center; }
        .empty-icon { width: 64px; height: 64px; border-radius: 50%; background: rgba(248,250,252,0.9); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
        .empty-title { font-size: 18px; font-weight: 800; color: #0f172a; margin: 0 0 6px; }
        .empty-sub { font-size: 13px; color: #94a3b8; font-weight: 500; margin: 0; }

        /* Modal */
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(15,23,42,0.5);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          z-index: 50; padding: 20px;
        }
        .modal-box {
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.9);
          border-radius: 24px; max-width: 480px; width: 100%;
          box-shadow: 0 24px 80px rgba(0,0,0,0.16);
          animation: modalIn 0.25s ease;
        }
        @keyframes modalIn { from { opacity:0; transform:scale(0.96) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }
        .modal-inner { padding: 28px; }
        .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; }
        .modal-title { font-size: 20px; font-weight: 800; color: #0f172a; }
        .modal-close {
          width: 34px; height: 34px; border-radius: 10px;
          background: rgba(248,250,252,0.9); border: 1px solid rgba(226,232,240,0.8);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s;
        }
        .modal-close:hover { background: rgba(239,68,68,0.08); border-color: rgba(239,68,68,0.2); color: #dc2626; }

        .modal-field { background: rgba(248,250,252,0.9); border-radius: 14px; border: 1px solid rgba(226,232,240,0.6); padding: 14px 16px; margin-bottom: 10px; }
        .modal-field-lbl { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .modal-field-val { font-size: 14px; font-weight: 700; color: #0f172a; }
        .modal-field-sub { font-size: 11px; color: #94a3b8; margin-top: 2px; }
        .modal-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 0; }
        .modal-3col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .modal-money { border-radius: 14px; padding: 14px 16px; }
        .modal-money-lbl { font-size: 10px; font-weight: 700; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
        .modal-money-val { font-size: 16px; font-weight: 800; }

        .modal-btn {
          width: 100%; padding: 14px;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: white; font-size: 14px; font-weight: 800;
          border: none; border-radius: 14px; cursor: pointer;
          font-family: inherit; margin-top: 16px;
          transition: all 0.2s ease;
        }
        .modal-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,0,0,0.2); }

        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.45s ease forwards; opacity: 0; }
      `}</style>

      <div className="pay-root">
        <div className="pay-inner">
          {/* Header */}
          <div className="pay-header fade-up">
            <div className="pay-header-left">
              <div className="pay-icon-wrap">
                <HiCurrencyDollar
                  style={{ width: 22, height: 22, color: "white" }}
                />
              </div>
              <div>
                <h1 className="pay-title">Payment Reports</h1>
                <p className="pay-sub">Track all transactions and payouts</p>
              </div>
            </div>
            <div className="pay-header-right">
              <select
                className="hdr-select"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="year">This Year</option>
              </select>
              <button className="export-btn">
                <HiDownload style={{ width: 15, height: 15 }} />
                Export
              </button>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="stat-grid">
            {statCards.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="glass stat-card fade-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="stat-card-row">
                    <div
                      className="stat-icon"
                      style={{ background: s.colorBg }}
                    >
                      <Icon style={{ width: 18, height: 18, color: s.color }} />
                    </div>
                    <div>
                      <div className="stat-lbl">{s.label}</div>
                      <div className="stat-val">{s.value}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Filters */}
          <div
            className="glass filter-card fade-up"
            style={{ animationDelay: "120ms" }}
          >
            <div className="filter-row">
              <div className="search-wrap">
                <HiSearch className="search-icon" />
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search by order ID, customer, or vendor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="filter-tabs">
                {[
                  { key: "all", label: "All" },
                  { key: "completed", label: "Completed" },
                  { key: "pending", label: "Pending" },
                  { key: "failed", label: "Failed" },
                  { key: "refunded", label: "Refunded" },
                ].map((f) => (
                  <button
                    key={f.key}
                    className={`filter-tab ${statusFilter === f.key ? "active" : "inactive"}`}
                    onClick={() => setStatusFilter(f.key)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div
              className="glass loading-wrap fade-up"
              style={{ animationDelay: "160ms" }}
            >
              <div style={{ textAlign: "center" }}>
                <div className="spinner" style={{ margin: "0 auto" }}></div>
                <p className="loading-text">Loading payments...</p>
              </div>
            </div>
          ) : filteredPayments.length === 0 ? (
            <div
              className="glass empty-wrap fade-up"
              style={{ animationDelay: "160ms" }}
            >
              <div className="empty-icon">
                <HiCurrencyDollar
                  style={{ width: 28, height: 28, color: "#cbd5e1" }}
                />
              </div>
              <p className="empty-title">No payments found</p>
              <p className="empty-sub">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div
              className="glass table-card fade-up"
              style={{ animationDelay: "160ms" }}
            >
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Payment ID</th>
                      <th>Order</th>
                      <th>Customer</th>
                      <th>Vendor</th>
                      <th>Amount</th>
                      <th>Fee</th>
                      <th>Payout</th>
                      <th>Method</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((pay, i) => {
                      const sc =
                        statusConfig[pay.status] || statusConfig.pending;
                      const StatusIcon = sc.icon;
                      return (
                        <tr
                          key={pay.id}
                          onClick={() => setSelectedPayment(pay)}
                        >
                          <td>
                            <span className="td-id">{pay.id}</span>
                          </td>
                          <td>
                            <span className="td-order">{pay.orderId}</span>
                          </td>
                          <td>
                            <div className="cust-cell">
                              <div
                                className="cust-avatar-sm"
                                style={{
                                  background:
                                    avatarColors[i % avatarColors.length],
                                }}
                              >
                                {pay.customerName.charAt(0)}
                              </div>
                              <div>
                                <div className="td-name">
                                  {pay.customerName}
                                </div>
                                <div className="td-email">
                                  {pay.customerEmail}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="td-vendor">{pay.vendor}</span>
                          </td>
                          <td>
                            <span className="td-amount">
                              ₦{pay.amount.toLocaleString()}
                            </span>
                          </td>
                          <td>
                            <span className="td-fee">
                              ₦{pay.platformFee.toLocaleString()}
                            </span>
                          </td>
                          <td>
                            <span className="td-payout">
                              ₦{pay.vendorAmount.toLocaleString()}
                            </span>
                          </td>
                          <td>
                            <div className="method-wrap">
                              {pay.paymentMethod === "card" ? (
                                <HiCreditCard
                                  style={{
                                    width: 14,
                                    height: 14,
                                    color: "#6366f1",
                                  }}
                                />
                              ) : (
                                <HiCurrencyDollar
                                  style={{
                                    width: 14,
                                    height: 14,
                                    color: "#16a34a",
                                  }}
                                />
                              )}
                              <span className="method-text">
                                {pay.paymentMethod === "card"
                                  ? `Card ••${pay.cardLast4}`
                                  : `${pay.bank}`}
                              </span>
                            </div>
                          </td>
                          <td>
                            <span
                              className="status-pill"
                              style={{ background: sc.bg, color: sc.text }}
                            >
                              <StatusIcon style={{ width: 11, height: 11 }} />
                              {sc.label}
                            </span>
                          </td>
                          <td>
                            <span className="td-date">
                              {new Date(pay.createdAt).toLocaleDateString()}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedPayment &&
        (() => {
          const sc =
            statusConfig[selectedPayment.status] || statusConfig.pending;
          const StatusIcon = sc.icon;
          return (
            <div
              className="modal-overlay"
              onClick={() => setSelectedPayment(null)}
            >
              <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <div className="modal-inner">
                  <div className="modal-header">
                    <span className="modal-title">Payment Details</span>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <span
                        className="status-pill"
                        style={{ background: sc.bg, color: sc.text }}
                      >
                        <StatusIcon style={{ width: 11, height: 11 }} />
                        {sc.label}
                      </span>
                      <button
                        className="modal-close"
                        onClick={() => setSelectedPayment(null)}
                      >
                        <HiX style={{ width: 14, height: 14 }} />
                      </button>
                    </div>
                  </div>

                  <div className="modal-field">
                    <div className="modal-field-lbl">Payment ID</div>
                    <div className="modal-field-val">{selectedPayment.id}</div>
                  </div>
                  <div className="modal-field">
                    <div className="modal-field-lbl">Order ID</div>
                    <div className="modal-field-val">
                      {selectedPayment.orderId}
                    </div>
                  </div>

                  <div className="modal-2col" style={{ marginBottom: 10 }}>
                    <div className="modal-field" style={{ margin: 0 }}>
                      <div className="modal-field-lbl">Customer</div>
                      <div className="modal-field-val">
                        {selectedPayment.customerName}
                      </div>
                      <div className="modal-field-sub">
                        {selectedPayment.customerEmail}
                      </div>
                    </div>
                    <div className="modal-field" style={{ margin: 0 }}>
                      <div className="modal-field-lbl">Vendor</div>
                      <div className="modal-field-val">
                        {selectedPayment.vendor}
                      </div>
                    </div>
                  </div>

                  <div className="modal-3col" style={{ marginBottom: 10 }}>
                    <div
                      className="modal-money"
                      style={{
                        background: "rgba(22,163,74,0.08)",
                        border: "1px solid rgba(22,163,74,0.2)",
                      }}
                    >
                      <div
                        className="modal-money-lbl"
                        style={{ color: "#16a34a" }}
                      >
                        Amount
                      </div>
                      <div
                        className="modal-money-val"
                        style={{ color: "#16a34a" }}
                      >
                        ₦{selectedPayment.amount.toLocaleString()}
                      </div>
                    </div>
                    <div
                      className="modal-money"
                      style={{
                        background: "rgba(99,102,241,0.08)",
                        border: "1px solid rgba(99,102,241,0.2)",
                      }}
                    >
                      <div
                        className="modal-money-lbl"
                        style={{ color: "#6366f1" }}
                      >
                        Platform Fee
                      </div>
                      <div
                        className="modal-money-val"
                        style={{ color: "#6366f1" }}
                      >
                        ₦{selectedPayment.platformFee.toLocaleString()}
                      </div>
                    </div>
                    <div
                      className="modal-money"
                      style={{
                        background: "rgba(168,85,247,0.08)",
                        border: "1px solid rgba(168,85,247,0.2)",
                      }}
                    >
                      <div
                        className="modal-money-lbl"
                        style={{ color: "#9333ea" }}
                      >
                        Payout
                      </div>
                      <div
                        className="modal-money-val"
                        style={{ color: "#9333ea" }}
                      >
                        ₦{selectedPayment.vendorAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="modal-field">
                    <div className="modal-field-lbl">Date & Time</div>
                    <div className="modal-field-val">
                      {new Date(selectedPayment.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <button
                    className="modal-btn"
                    onClick={() => setSelectedPayment(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
    </>
  );
}
