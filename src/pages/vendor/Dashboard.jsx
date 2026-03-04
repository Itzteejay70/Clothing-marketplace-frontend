import { useNavigate } from "react-router-dom";
import { HiCash, HiTruck, HiExclamation, HiArrowRight } from "react-icons/hi";

const mockOrders = [
  { id: "#3025", customer: "Janet Oladele", amount: "₦120,000", status: "Paid" },
  { id: "#2024", customer: "Michael Eze", amount: "₦85,000", status: "Processing" },
  { id: "#2023", customer: "Susan Baker", amount: "₦62,500", status: "Shipped" },
  { id: "#2022", customer: "David Obi", amount: "₦98,000", status: "Delivered" },
  { id: "#2021", customer: "Aisha Ibrahim", amount: "₦45,000", status: "Cancelled" },
];

function badgeClasses(status) {
  switch (status) {
    case "Paid":
      return "bg-green-50 text-green-700 border-green-200";
    case "Processing":
      return "bg-orange-50 text-orange-700 border-orange-200";
    case "Shipped":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Delivered":
      return "bg-gray-100 text-gray-700 border-gray-200";
    case "Cancelled":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

function StatCard({ icon, title, value, hint }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-green-600 flex items-center justify-center">
            {icon}
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500">{title}</p>
            <p className="text-2xl font-black text-gray-900 mt-0.5">{value}</p>
          </div>
        </div>
        {hint ? (
          <span className="px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold">
            {hint}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default function VendorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm font-medium text-gray-600">
          Quick snapshot of what needs your attention today.
        </p>
      </div>

      {/* 3 cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          icon={<HiCash className="w-6 h-6 text-white" />}
          title="Sales (Today)"
          value="₦295,000"
          hint="+8.6%"
        />
        <StatCard
          icon={<HiTruck className="w-6 h-6 text-white" />}
          title="Orders to Fulfill"
          value="7"
          hint="Needs shipping"
        />
        <StatCard
          icon={<HiExclamation className="w-6 h-6 text-white" />}
          title="Low Stock"
          value="2"
          hint="Restock soon"
        />
      </div>

      {/* Quick actions */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-black text-gray-900">Quick Actions</p>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => navigate("/vendor/products/new")}
              className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold text-sm transition-all duration-300"
              type="button"
            >
              Add Product
            </button>

            <button
              onClick={() => navigate("/vendor/orders")}
              className="px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold text-sm transition-all duration-300"
              type="button"
            >
              View Orders
            </button>

            <button
              onClick={() => navigate("/vendor/settings")}
              className="px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold text-sm transition-all duration-300"
              type="button"
            >
              Update Store
            </button>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between gap-3">
          <div>
            <p className="text-lg font-black text-gray-900">Recent Orders</p>
            <p className="text-sm font-medium text-gray-600">Last 5 orders</p>
          </div>

          <button
            onClick={() => navigate("/vendor/orders")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 font-bold text-sm text-gray-700 transition-all duration-300"
            type="button"
          >
            View all <HiArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-black">Order</th>
                <th className="px-4 py-3 font-black">Customer</th>
                <th className="px-4 py-3 font-black">Amount</th>
                <th className="px-4 py-3 font-black">Status</th>
                <th className="px-4 py-3 font-black text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {mockOrders.map((o) => (
                <tr key={o.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/60">
                  <td className="px-4 py-3 font-black text-gray-900">{o.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-700">{o.customer}</td>
                  <td className="px-4 py-3 font-black text-gray-900">{o.amount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-bold ${badgeClasses(
                        o.status
                      )}`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {o.status === "Paid" || o.status === "Processing" ? (
                      <button
                        className="px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold text-xs transition-all duration-300"
                        type="button"
                      >
                        Mark Shipped
                      </button>
                    ) : (
                      <button
                        className="px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs transition-all duration-300"
                        type="button"
                      >
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}