import { HiCash, HiClock } from "react-icons/hi";

const history = [
  { date: "2026-03-01", amount: "₦120,000", status: "Paid" },
  { date: "2026-02-15", amount: "₦75,500", status: "Paid" },
  { date: "2026-02-01", amount: "₦40,000", status: "Processing" },
];

function badgeClasses(status) {
  switch (status) {
    case "Paid":
      return "bg-green-50 text-green-700 border-green-200";
    case "Processing":
      return "bg-orange-50 text-orange-700 border-orange-200";
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

export default function VendorPayouts() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
          Payouts
        </h1>
        <p className="mt-1 text-sm font-medium text-gray-600">
          Track earnings and payout history.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <StatCard
          icon={<HiCash className="w-6 h-6 text-white" />}
          title="Available Balance"
          value="₦210,000"
          hint="Withdrawable"
        />
        <StatCard
          icon={<HiClock className="w-6 h-6 text-white" />}
          title="Pending Balance"
          value="₦58,000"
          hint="Clearing"
        />
      </div>

      {/* History table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <p className="text-lg font-black text-gray-900">Payout History</p>
          <p className="text-sm font-medium text-gray-600">Recent payouts</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-black">Date</th>
                <th className="px-4 py-3 font-black">Amount</th>
                <th className="px-4 py-3 font-black">Status</th>
              </tr>
            </thead>

            <tbody>
              {history.map((h) => (
                <tr
                  key={h.date + h.amount}
                  className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/60"
                >
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {h.date}
                  </td>

                  <td className="px-4 py-3 font-black text-gray-900">
                    {h.amount}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-bold ${badgeClasses(
                        h.status
                      )}`}
                    >
                      {h.status}
                    </span>
                  </td>
                </tr>
              ))}

              {history.length === 0 ? (
                <tr>
                  <td
                    className="px-4 py-10 text-center text-gray-500 font-bold"
                    colSpan={3}
                  >
                    No payouts yet.
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