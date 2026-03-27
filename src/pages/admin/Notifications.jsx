import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  WarningCircle,
  Info,
  Bell,
  ArrowLeft,
  Check,
  X,
  Clock,
  Trash,
} from "@phosphor-icons/react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      title: "New Order Received",
      message: "Order #ORD-1234 has been placed",
      time: "2 mins ago",
      read: false,
      date: "2026-03-27",
    },
    {
      id: 2,
      type: "warning",
      title: "Product Approval Pending",
      message: "5 products waiting for your approval",
      time: "15 mins ago",
      read: false,
      date: "2026-03-27",
    },
    {
      id: 3,
      type: "info",
      title: "New Vendor Registration",
      message: "Fashion Hub wants to join as vendor",
      time: "1 hour ago",
      read: false,
      date: "2026-03-27",
    },
    {
      id: 4,
      type: "success",
      title: "Payment Received",
      message: "₦150,000 payment confirmed",
      time: "2 hours ago",
      read: true,
      date: "2026-03-27",
    },
    {
      id: 5,
      type: "info",
      title: "Low Stock Alert",
      message: "Nike Air Max 270 running low",
      time: "3 hours ago",
      read: true,
      date: "2026-03-27",
    },
    {
      id: 6,
      type: "success",
      title: "Order Completed",
      message: "Order #ORD-1230 has been delivered",
      time: "5 hours ago",
      read: true,
      date: "2026-03-26",
    },
    {
      id: 7,
      type: "warning",
      title: "Vendor Verification",
      message: "Sneaker Palace submitted documents",
      time: "1 day ago",
      read: true,
      date: "2026-03-26",
    },
    {
      id: 8,
      type: "info",
      title: "System Update",
      message: "New features have been deployed",
      time: "2 days ago",
      read: true,
      date: "2026-03-25",
    },
  ]);
  const [filter, setFilter] = useState("all");
  const [selectedNotifications, setSelectedNotifications] = useState([]);

  const getNotifStyle = (type) => {
    const styles = {
      success: {
        bg: "rgba(22, 163, 74, 0.15)",
        color: "#22c55e",
        border: "rgba(22, 163, 74, 0.3)",
        Icon: CheckCircle,
      },
      warning: {
        bg: "rgba(249, 115, 22, 0.15)",
        color: "#f97316",
        border: "rgba(249, 115, 22, 0.3)",
        Icon: WarningCircle,
      },
      info: {
        bg: "rgba(14, 165, 233, 0.15)",
        color: "#0ea5e9",
        border: "rgba(14, 165, 233, 0.3)",
        Icon: Info,
      },
    };
    return (
      styles[type] || {
        bg: "rgba(148, 163, 184, 0.15)",
        color: "#94a3b8",
        border: "rgba(148, 163, 184, 0.3)",
        Icon: Bell,
      }
    );
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    if (filter === "read") return n.read;
    return n.type === filter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const toggleSelect = (id) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const deleteSelected = () => {
    setNotifications(
      notifications.filter((n) => !selectedNotifications.includes(n.id)),
    );
    setSelectedNotifications([]);
  };

  const markSelectedAsRead = () => {
    setNotifications(
      notifications.map((n) =>
        selectedNotifications.includes(n.id) ? { ...n, read: true } : n,
      ),
    );
    setSelectedNotifications([]);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="header-title">Notifications</h1>
            <p className="header-subtitle">
              Stay updated with your platform activities
            </p>
          </div>
          <div className="header-actions">
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="action-btn secondary">
                <Check size={16} weight="bold" />
                Mark all as read
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="filters-left">
          <button
            className={`filter-chip ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
            <span className="filter-count">{notifications.length}</span>
          </button>
          <button
            className={`filter-chip ${filter === "unread" ? "active" : ""}`}
            onClick={() => setFilter("unread")}
          >
            Unread
            <span className="filter-count">{unreadCount}</span>
          </button>
          <button
            className={`filter-chip ${filter === "success" ? "active" : ""}`}
            onClick={() => setFilter("success")}
          >
            <CheckCircle
              size={14}
              weight="fill"
              className="filter-icon success"
            />
            Orders
          </button>
          <button
            className={`filter-chip ${filter === "warning" ? "active" : ""}`}
            onClick={() => setFilter("warning")}
          >
            <WarningCircle
              size={14}
              weight="fill"
              className="filter-icon warning"
            />
            Alerts
          </button>
          <button
            className={`filter-chip ${filter === "info" ? "active" : ""}`}
            onClick={() => setFilter("info")}
          >
            <Info size={14} weight="fill" className="filter-icon info" />
            Info
          </button>
        </div>
        <div className="filters-right">
          {selectedNotifications.length > 0 && (
            <div className="bulk-actions">
              <span className="selected-count">
                {selectedNotifications.length} selected
              </span>
              <button onClick={markSelectedAsRead} className="bulk-btn">
                <Check size={14} weight="bold" />
                Mark read
              </button>
              <button onClick={deleteSelected} className="bulk-btn danger">
                <Trash size={14} weight="bold" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="content-card">
        {filteredNotifications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Bell size={48} weight="light" />
            </div>
            <h3 className="empty-title">No notifications</h3>
            <p className="empty-text">
              {filter === "all"
                ? "You're all caught up! No notifications yet."
                : `No ${filter} notifications found.`}
            </p>
          </div>
        ) : (
          <div className="notifications-list">
            {filteredNotifications.map((notification) => {
              const style = getNotifStyle(notification.type);
              const Icon = style.Icon;
              const isSelected = selectedNotifications.includes(
                notification.id,
              );

              return (
                <div
                  key={notification.id}
                  className={`notification-item ${!notification.read ? "unread" : ""} ${isSelected ? "selected" : ""}`}
                  onClick={() =>
                    !notification.read && markAsRead(notification.id)
                  }
                >
                  <div
                    className="notif-checkbox"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelect(notification.id);
                    }}
                  >
                    <div className={`checkbox ${isSelected ? "checked" : ""}`}>
                      {isSelected && <Check size={12} weight="bold" />}
                    </div>
                  </div>

                  <div
                    className="notif-icon-wrapper"
                    style={{
                      background: style.bg,
                      border: `1px solid ${style.border}`,
                    }}
                  >
                    <Icon
                      size={20}
                      weight="fill"
                      style={{ color: style.color }}
                    />
                  </div>

                  <div className="notif-content">
                    <div className="notif-header-row">
                      <span className="notif-title-text">
                        {notification.title}
                      </span>
                      <span className="notif-date">{notification.date}</span>
                    </div>
                    <p className="notif-message">{notification.message}</p>
                    <div className="notif-footer-row">
                      <span className="notif-time">
                        <Clock size={12} weight="bold" />
                        {notification.time}
                      </span>
                      {!notification.read && (
                        <span className="unread-badge">New</span>
                      )}
                    </div>
                  </div>

                  <div className="notif-actions">
                    <button
                      className="notif-action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      title="Delete"
                    >
                      <X size={16} weight="bold" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        .page-container {
          padding: 24px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: 24px;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          flex-wrap: wrap;
        }

        .header-title {
          font-size: 28px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .header-subtitle {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          margin: 4px 0 0 0;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }

        .action-btn.secondary {
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.7);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .action-btn.secondary:hover {
          background: rgba(255,255,255,0.12);
          color: #ffffff;
        }

        .filters-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .filters-left {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.5);
          border: 1px solid rgba(255,255,255,0.08);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-chip:hover {
          background: rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.7);
        }

        .filter-chip.active {
          background: #16a34a;
          color: white;
          border-color: #16a34a;
        }

        .filter-count {
          background: rgba(0,0,0,0.2);
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 11px;
        }

        .filter-icon.success { color: #22c55e; }
        .filter-icon.warning { color: #f97316; }
        .filter-icon.info { color: #0ea5e9; }

        .bulk-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .selected-count {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.5);
        }

        .bulk-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.7);
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .bulk-btn:hover {
          background: rgba(255,255,255,0.12);
        }

        .bulk-btn.danger {
          background: rgba(220, 38, 38, 0.15);
          color: #f87171;
          border-color: rgba(220, 38, 38, 0.3);
        }

        .bulk-btn.danger:hover {
          background: rgba(220, 38, 38, 0.25);
        }

        .content-card {
          background: #111111;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.06);
          overflow: hidden;
        }

        .empty-state {
          padding: 60px 20px;
          text-align: center;
        }

        .empty-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 16px;
          background: rgba(255,255,255,0.05);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.2);
        }

        .empty-title {
          font-size: 18px;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
          margin: 0 0 8px 0;
        }

        .empty-text {
          font-size: 14px;
          color: rgba(255,255,255,0.3);
          margin: 0;
        }

        .notifications-list {
          display: flex;
          flex-direction: column;
        }

        .notification-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 18px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.2s ease;
          cursor: pointer;
        }

        .notification-item:last-child {
          border-bottom: none;
        }

        .notification-item:hover {
          background: rgba(255,255,255,0.03);
        }

        .notification-item.unread {
          background: rgba(22, 163, 74, 0.05);
        }

        .notification-item.unread:hover {
          background: rgba(22, 163, 74, 0.08);
        }

        .notification-item.selected {
          background: rgba(14, 165, 233, 0.08);
        }

        .notif-checkbox {
          padding-top: 2px;
        }

        .checkbox {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .checkbox.checked {
          background: #16a34a;
          border-color: #16a34a;
          color: white;
        }

        .notif-icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .notif-content {
          flex: 1;
          min-width: 0;
        }

        .notif-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 4px;
        }

        .notif-title-text {
          font-size: 14px;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
        }

        .notif-date {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          flex-shrink: 0;
        }

        .notif-message {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          margin: 0 0 8px 0;
          line-height: 1.5;
        }

        .notif-footer-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .notif-time {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: rgba(255,255,255,0.3);
        }

        .unread-badge {
          background: #16a34a;
          color: white;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .notif-actions {
          display: flex;
          gap: 8px;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .notification-item:hover .notif-actions {
          opacity: 1;
        }

        .notif-action-btn {
          width: 28px;
          height: 28px;
          border: none;
          background: rgba(255,255,255,0.05);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: rgba(255,255,255,0.4);
          transition: all 0.2s ease;
        }

        .notif-action-btn:hover {
          background: rgba(220, 38, 38, 0.2);
          color: #f87171;
        }

        @media (max-width: 768px) {
          .page-container {
            padding: 16px;
          }

          .header-content {
            flex-direction: column;
          }

          .filters-bar {
            flex-direction: column;
            align-items: flex-start;
          }

          .notification-item {
            flex-wrap: wrap;
          }

          .notif-actions {
            opacity: 1;
            width: 100%;
            justify-content: flex-end;
            margin-top: 8px;
          }
        }
      `}</style>
    </div>
  );
}
