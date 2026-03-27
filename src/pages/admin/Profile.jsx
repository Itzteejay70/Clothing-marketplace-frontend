import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  PencilSimple,
  Envelope,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  Bell,
  Key,
  Camera,
  Check,
  X,
  ArrowLeft,
} from "@phosphor-icons/react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@ashluxe.com",
    phone: "+234 801 234 5678",
    address: "123 Fashion Street, Lagos, Nigeria",
    bio: "Platform administrator managing AshLuxe Fashion e-commerce operations.",
    dateJoined: "January 15, 2024",
    role: "Super Administrator",
    avatar: null,
  });

  const [formData, setFormData] = useState({ ...profile });

  const handleSave = () => {
    setProfile({ ...formData });
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setIsEditing(false);
  };

  const stats = [
    { label: "Total Orders", value: "1,284" },
    { label: "Products Approved", value: "3,847" },
    { label: "Vendors Verified", value: "156" },
    { label: "Total Revenue", value: "₦12.4M" },
  ];

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="header-title">My Profile</h1>
            <p className="header-subtitle">
              Manage your account settings and information
            </p>
          </div>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              <PencilSimple size={16} weight="bold" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="profile-layout">
        {/* Sidebar Card */}
        <div className="profile-sidebar">
          <div className="avatar-section">
            <div className="avatar-wrapper">
              <div className="avatar">
                {profile.firstName.charAt(0)}
                {profile.lastName.charAt(0)}
              </div>
              <button className="avatar-edit-btn">
                <Camera size={16} weight="bold" />
              </button>
            </div>
            <h2 className="profile-name">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="profile-role">{profile.role}</p>
            <div className="profile-badges">
              <span className="badge verified">
                <ShieldCheck size={14} weight="fill" />
                Verified
              </span>
            </div>
          </div>

          <div className="sidebar-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="sidebar-info">
            <div className="info-item">
              <Calendar size={16} />
              <span>Joined {profile.dateJoined}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-main">
          {/* Tabs */}
          <div className="tabs-container">
            <div className="tabs">
              <button
                className={`tab ${activeTab === "personal" ? "active" : ""}`}
                onClick={() => setActiveTab("personal")}
              >
                <User size={18} />
                Personal Info
              </button>
              <button
                className={`tab ${activeTab === "security" ? "active" : ""}`}
                onClick={() => setActiveTab("security")}
              >
                <ShieldCheck size={18} />
                Security
              </button>
              <button
                className={`tab ${activeTab === "notifications" ? "active" : ""}`}
                onClick={() => setActiveTab("notifications")}
              >
                <Bell size={18} />
                Notifications
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === "personal" && (
              <div className="form-section">
                <div className="section-header">
                  <h3 className="section-title">Personal Information</h3>
                  {isEditing && (
                    <div className="section-actions">
                      <button onClick={handleCancel} className="cancel-btn">
                        <X size={16} weight="bold" />
                        Cancel
                      </button>
                      <button onClick={handleSave} className="save-btn">
                        <Check size={16} weight="bold" />
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>

                {saved && (
                  <div className="success-banner">
                    <Check size={18} weight="bold" />
                    Profile updated successfully!
                  </div>
                )}

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-input"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <div className="form-value">{profile.firstName}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-input"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                      />
                    ) : (
                      <div className="form-value">{profile.lastName}</div>
                    )}
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Email Address</label>
                    <div className="input-with-icon">
                      <Envelope size={18} className="input-icon" />
                      {isEditing ? (
                        <input
                          type="email"
                          className="form-input"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      ) : (
                        <div className="form-value">{profile.email}</div>
                      )}
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Phone Number</label>
                    <div className="input-with-icon">
                      <Phone size={18} className="input-icon" />
                      {isEditing ? (
                        <input
                          type="tel"
                          className="form-input"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                        />
                      ) : (
                        <div className="form-value">{profile.phone}</div>
                      )}
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Address</label>
                    <div className="input-with-icon">
                      <MapPin size={18} className="input-icon" />
                      {isEditing ? (
                        <input
                          type="text"
                          className="form-input"
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              address: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <div className="form-value">{profile.address}</div>
                      )}
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Bio</label>
                    {isEditing ? (
                      <textarea
                        className="form-textarea"
                        value={formData.bio}
                        onChange={(e) =>
                          setFormData({ ...formData, bio: e.target.value })
                        }
                        rows={4}
                      />
                    ) : (
                      <div className="form-value bio">{profile.bio}</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="form-section">
                <div className="section-header">
                  <h3 className="section-title">Security Settings</h3>
                </div>

                <div className="security-options">
                  <div className="security-item">
                    <div className="security-info">
                      <div className="security-icon">
                        <Key size={20} />
                      </div>
                      <div>
                        <h4>Change Password</h4>
                        <p>Update your password regularly for security</p>
                      </div>
                    </div>
                    <button className="security-btn">Update</button>
                  </div>

                  <div className="security-item">
                    <div className="security-info">
                      <div className="security-icon">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <h4>Two-Factor Authentication</h4>
                        <p>Add an extra layer of security to your account</p>
                      </div>
                    </div>
                    <button className="security-btn active">Enabled</button>
                  </div>

                  <div className="security-item">
                    <div className="security-info">
                      <div className="security-icon">
                        <User size={20} />
                      </div>
                      <div>
                        <h4>Active Sessions</h4>
                        <p>Manage devices where you're logged in</p>
                      </div>
                    </div>
                    <button className="security-btn">View</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="form-section">
                <div className="section-header">
                  <h3 className="section-title">Notification Preferences</h3>
                </div>

                <div className="notification-options">
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>Email Notifications</h4>
                      <p>Receive email updates about orders and activity</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>Order Alerts</h4>
                      <p>Get notified when new orders are placed</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>Vendor Updates</h4>
                      <p>Notifications about vendor registrations</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>Product Approvals</h4>
                      <p>Alerts for pending product approvals</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>Marketing Emails</h4>
                      <p>Receive updates about new features and tips</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .page-container {
          padding: 24px;
          max-width: 1200px;
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

        .edit-btn {
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
          background: #16a34a;
          color: white;
        }

        .edit-btn:hover {
          background: #15803d;
        }

        .profile-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 24px;
        }

        .profile-sidebar {
          background: #111111;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.06);
          padding: 24px;
          height: fit-content;
        }

        .avatar-section {
          text-align: center;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .avatar-wrapper {
          position: relative;
          display: inline-block;
          margin-bottom: 16px;
        }

        .avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(135deg, #16a34a 0%, #0d9488 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: 700;
          color: white;
        }

        .avatar-edit-btn {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #16a34a;
          border: 3px solid #111111;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          transition: all 0.2s ease;
        }

        .avatar-edit-btn:hover {
          background: #15803d;
        }

        .profile-name {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 4px 0;
        }

        .profile-role {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          margin: 0 0 12px 0;
        }

        .profile-badges {
          display: flex;
          justify-content: center;
          gap: 8px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 600;
        }

        .badge.verified {
          background: rgba(22, 163, 74, 0.15);
          color: #22c55e;
        }

        .sidebar-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          padding: 24px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          display: block;
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
        }

        .stat-label {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
        }

        .sidebar-info {
          padding-top: 24px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.5);
          font-size: 13px;
        }

        .profile-main {
          min-width: 0;
        }

        .tabs-container {
          background: #111111;
          border-radius: 16px 16px 0 0;
          border: 1px solid rgba(255,255,255,0.06);
          border-bottom: none;
        }

        .tabs {
          display: flex;
          padding: 0 16px;
        }

        .tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px 20px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tab:hover {
          color: rgba(255,255,255,0.7);
        }

        .tab.active {
          color: #22c55e;
          border-bottom-color: #22c55e;
        }

        .tab-content {
          background: #111111;
          border-radius: 0 0 16px 16px;
          border: 1px solid rgba(255,255,255,0.06);
          border-top: none;
          padding: 24px;
        }

        .form-section {
          max-width: 600px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
        }

        .section-actions {
          display: flex;
          gap: 8px;
        }

        .cancel-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.7);
        }

        .save-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          background: #16a34a;
          color: white;
        }

        .success-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: rgba(22, 163, 74, 0.15);
          border: 1px solid rgba(22, 163, 74, 0.3);
          border-radius: 10px;
          color: #22c55e;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 20px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
        }

        .form-input, .form-textarea {
          padding: 12px 14px;
          border-radius: 10px;
          font-size: 14px;
          color: #ffffff;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          outline: none;
          transition: all 0.2s ease;
        }

        .form-input:focus, .form-textarea:focus {
          border-color: #16a34a;
          background: rgba(255,255,255,0.05);
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-value {
          padding: 12px 14px;
          border-radius: 10px;
          font-size: 14px;
          color: rgba(255,255,255,0.8);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
        }

        .form-value.bio {
          min-height: 80px;
        }

        .input-with-icon {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.3);
        }

        .input-with-icon .form-input,
        .input-with-icon .form-value {
          padding-left: 42px;
        }

        /* Security Tab */
        .security-options {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .security-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
        }

        .security-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .security-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(22, 163, 74, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #22c55e;
        }

        .security-info h4 {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 4px 0;
        }

        .security-info p {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          margin: 0;
        }

        .security-btn {
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.7);
          transition: all 0.2s ease;
        }

        .security-btn:hover {
          background: rgba(255,255,255,0.1);
        }

        .security-btn.active {
          background: rgba(22, 163, 74, 0.15);
          color: #22c55e;
          border-color: rgba(22, 163, 74, 0.3);
        }

        /* Notifications Tab */
        .notification-options {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .notification-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
        }

        .notification-info h4 {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 4px 0;
        }

        .notification-info p {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          margin: 0;
        }

        .toggle {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 26px;
        }

        .toggle input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255,255,255,0.1);
          border-radius: 26px;
          transition: 0.3s;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 3px;
          bottom: 3px;
          background: white;
          border-radius: 50%;
          transition: 0.3s;
        }

        .toggle input:checked + .toggle-slider {
          background: #16a34a;
        }

        .toggle input:checked + .toggle-slider:before {
          transform: translateX(22px);
        }

        @media (max-width: 900px) {
          .profile-layout {
            grid-template-columns: 1fr;
          }

          .profile-sidebar {
            order: -1;
          }

          .sidebar-stats {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (max-width: 768px) {
          .page-container {
            padding: 16px;
          }

          .tabs {
            overflow-x: auto;
          }

          .tab {
            padding: 12px 16px;
            white-space: nowrap;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .sidebar-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
