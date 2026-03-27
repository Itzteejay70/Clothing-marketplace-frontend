import { useState, useRef } from "react";
import {
  Gear,
  FloppyDisk,
  CurrencyNgn,
  Truck,
  Percent,
  Wrench,
  Warning,
  CheckCircle,
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
   Hero Card
───────────────────────────────────────── */
function HeroCard() {
  return (
    <div className="hero-card">
      <div className="hero-grid" />
      <div className="hero-left">
        <div className="hero-badge">
          <Gear size={11} weight="fill" /> Site Configuration
        </div>
        <h1 className="hero-title">Platform Settings</h1>
        <p className="hero-sub">
          Configure your platform settings, manage pricing, and control site
          features. Customize your marketplace exactly how you want it.
        </p>
      </div>
      <div className="hero-right">
        <img
          src="/assets/categories/Removed-Bg-Nike-shoe.jpg"
          alt="Settings"
          className="hero-img"
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Settings Card Component
───────────────────────────────────────── */
function SettingsCard({ title, icon: Icon, children }) {
  return (
    <div className="settings-card fade-up">
      <div className="settings-card-header">
        <div className="settings-card-icon">
          <Icon size={18} weight="duotone" />
        </div>
        <h3 className="settings-card-title">{title}</h3>
      </div>
      <div className="settings-card-body">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Form Field Component
───────────────────────────────────────── */
function FormField({
  label,
  type = "text",
  value,
  onChange,
  options,
  placeholder,
}) {
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {type === "select" ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="form-select"
        >
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) =>
            onChange(
              type === "number" ? Number(e.target.value) : e.target.value,
            )
          }
          placeholder={placeholder}
          className="form-input"
        />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   Toggle Switch Component
───────────────────────────────────────── */
function ToggleSwitch({ label, description, enabled, onChange }) {
  return (
    <div className="toggle-row">
      <div className="toggle-info">
        <div className="toggle-label">{label}</div>
        <div className="toggle-desc">{description}</div>
      </div>
      <button
        onClick={onChange}
        className={`toggle-switch ${enabled ? "toggle-on" : ""}`}
      >
        <span className="toggle-thumb" />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: "block234",
    siteEmail: "admin@block234.com",
    currency: "NGN",
    shippingFee: 2500,
    taxRate: 7.5,
    maintenanceMode: false,
    allowRegistration: true,
    allowVendorRegistration: true,
  });

  const [saving, setSaving] = useState(false);
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

  const handleChange = (field, value) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      addToast(
        "success",
        "Settings Saved",
        "Your changes have been saved successfully",
      );
    }, 1000);
  };

  return (
    <div className="settings-page">
      <Toast toasts={toasts} />

      {/* Hero Card */}
      <HeroCard />

      {/* Settings Sections */}
      <div className="settings-grid">
        <SettingsCard title="General Settings" icon={Gear}>
          <FormField
            label="Site Name"
            value={settings.siteName}
            onChange={(v) => handleChange("siteName", v)}
            placeholder="Enter site name"
          />
          <FormField
            label="Site Email"
            type="email"
            value={settings.siteEmail}
            onChange={(v) => handleChange("siteEmail", v)}
            placeholder="admin@example.com"
          />
          <FormField
            label="Currency"
            type="select"
            value={settings.currency}
            onChange={(v) => handleChange("currency", v)}
            options={[
              { value: "NGN", label: "NGN (₦)" },
              { value: "USD", label: "USD ($)" },
              { value: "EUR", label: "EUR (€)" },
              { value: "GBP", label: "GBP (£)" },
            ]}
          />
        </SettingsCard>

        <SettingsCard title="Pricing Settings" icon={CurrencyNgn}>
          <FormField
            label="Default Shipping Fee (₦)"
            type="number"
            value={settings.shippingFee}
            onChange={(v) => handleChange("shippingFee", v)}
          />
          <FormField
            label="Tax Rate (%)"
            type="number"
            value={settings.taxRate}
            onChange={(v) => handleChange("taxRate", v)}
          />
        </SettingsCard>

        <SettingsCard title="Site Features" icon={Wrench}>
          <ToggleSwitch
            label="Maintenance Mode"
            description="Disable site access for maintenance"
            enabled={settings.maintenanceMode}
            onChange={() =>
              handleChange("maintenanceMode", !settings.maintenanceMode)
            }
          />
          <ToggleSwitch
            label="Allow User Registration"
            description="Let new customers register accounts"
            enabled={settings.allowRegistration}
            onChange={() =>
              handleChange("allowRegistration", !settings.allowRegistration)
            }
          />
          <ToggleSwitch
            label="Allow Vendor Registration"
            description="Let new vendors register to sell"
            enabled={settings.allowVendorRegistration}
            onChange={() =>
              handleChange(
                "allowVendorRegistration",
                !settings.allowVendorRegistration,
              )
            }
          />
        </SettingsCard>
      </div>

      {/* Save Button */}
      <button onClick={handleSave} disabled={saving} className="save-btn">
        <FloppyDisk size={18} weight="bold" />
        {saving ? "Saving..." : "Save Settings"}
      </button>

      {/* CSS Styles */}
      <style>{`
        .settings-page {
          padding: 24px;
          max-width: 1200px;
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
          margin: 0;
          max-width: 480px;
          line-height: 1.6;
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

        /* Settings Grid */
        .settings-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }

        /* Settings Card */
        .settings-card {
          background: linear-gradient(160deg, #161d16 0%, #0f140f 70%, #0d120d 100%);
          border: 1px solid rgba(34, 197, 94, 0.18);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 6px 28px rgba(0, 0, 0, 0.5);
        }

        .settings-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 20px 0 20px;
          margin-bottom: 20px;
        }

        .settings-card-icon {
          width: 40px;
          height: 40px;
          background: rgba(34, 197, 94, 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #22c55e;
        }

        .settings-card-title {
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          margin: 0;
        }

        .settings-card-body {
          padding: 0 20px 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Form Field */
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 12px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
        }

        .form-input,
        .form-select {
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: #fff;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
        }

        .form-input:focus,
        .form-select:focus {
          border-color: rgba(34, 197, 94, 0.5);
          background: rgba(34, 197, 94, 0.05);
        }

        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .form-select {
          cursor: pointer;
        }

        .form-select option {
          background: #161d16;
          color: #fff;
        }

        /* Toggle Switch */
        .toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
        }

        .toggle-info {
          flex: 1;
        }

        .toggle-label {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 4px;
        }

        .toggle-desc {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
        }

        .toggle-switch {
          width: 52px;
          height: 28px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 14px;
          cursor: pointer;
          position: relative;
          transition: all 0.3s;
        }

        .toggle-switch.toggle-on {
          background: #22c55e;
          border-color: #22c55e;
        }

        .toggle-thumb {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 20px;
          height: 20px;
          background: #fff;
          border-radius: 50%;
          transition: all 0.3s;
        }

        .toggle-switch.toggle-on .toggle-thumb {
          left: 27px;
        }

        /* Save Button */
        .save-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 16px;
          background: #22c55e;
          border: none;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          color: #000;
          cursor: pointer;
          transition: all 0.2s;
        }

        .save-btn:hover:not(:disabled) {
          background: #16a34a;
          transform: translateY(-2px);
        }

        .save-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
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

        /* Responsive */
        @media (max-width: 1024px) {
          .settings-grid {
            grid-template-columns: repeat(2, 1fr);
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

          .settings-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
