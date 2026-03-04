import { useMemo, useState } from "react";
import { HiCheck, HiEye } from "react-icons/hi";

const orders = [
  { id: "#3025", customer: "Janet Oladele", total: "₦120,000", status: "New" },
  { id: "#3024", customer: "Michael Eze", total: "₦85,000", status: "New" },
  { id: "#3023", customer: "Susan Baker", total: "₦62,500", status: "Processing" },
  { id: "#3022", customer: "David Obi", total: "₦98,000", status: "Shipped" },
];

const tabs = ["New", "Processing", "Shipped"];

function badgeClasses(status) {
  switch (status) {
    case "New":
      return "bg-green-50 text-green-700 border-green-200";
    case "Processing":
      return "bg-orange-50 text-orange-700 border-orange-200";
    case "Shipped":
      return "bg-blue-50 text-blue-700 border-blue-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

export default function VendorOrders() {
  const [active, setActive] = useState("New");

  const filtered = useMemo(
    () => orders.filter((o) => o.status === active),
    [active]
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            Orders
          </h1>
          <p className="mt-1 text-sm font-medium text-gray-600">
            Track and fulfill your orders.
          </p>
        </div>

        {/* Tabs (admin-like pills) */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
          {tabs.map((t) => {
            const isActive = t === active;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setActive(t)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-black">Order</th>
                <th className="px-4 py-3 font-black">Customer</th>
                <th className="px-4 py-3 font-black">Total</th>
                <th className="px-4 py-3 font-black">Status</th>
                <th className="px-4 py-3 font-black text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/60"
                >
                  <td className="px-4 py-3 font-black text-gray-900">{o.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {o.customer}
                  </td>
                  <td className="px-4 py-3 font-black text-gray-900">{o.total}</td>
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
                    {o.status !== "Shipped" ? (
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold text-xs transition-all duration-300"
                      >
                        <HiCheck className="w-4 h-4" />
                        Mark Shipped
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs transition-all duration-300"
                      >
                        <HiEye className="w-4 h-4" />
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {filtered.length === 0 ? (
                <tr>
                  <td
                    className="px-4 py-10 text-center text-gray-500 font-bold"
                    colSpan={5}
                  >
                    No orders here yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}