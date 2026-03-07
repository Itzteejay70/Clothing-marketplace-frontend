import { useState, useEffect } from "react";
import {
  HiTrendingUp,
  HiTrendingDown,
  HiDownload,
  HiCalendar,
  HiRefresh,
  HiCurrencyDollar,
  HiShoppingCart,
  HiUsers,
  HiShoppingBag,
  HiArrowUp,
  HiArrowDown,
  HiChartBar,
} from "react-icons/hi";

export default function Reports() {
  const [timeRange, setTimeRange] = useState("30days");
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // Generate monthly sales data
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
      const data = [];

      for (let i = 5; i >= 0; i--) {
        const monthIndex = (currentMonth - i + 12) % 12;
        data.push({
          month: months[monthIndex],
          revenue: Math.floor(Math.random() * 2000000) + 3000000,
          orders: Math.floor(Math.random() * 500) + 200,
          newUsers: Math.floor(Math.random() * 100) + 50,
          conversionRate: (Math.random() * 2 + 2).toFixed(1),
        });
      }
      setSalesData(data);
      setLoading(false);
    }, 800);
  }, [timeRange]);

  const totalRevenue = salesData.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = salesData.reduce((sum, d) => sum + d.orders, 0);
  const totalUsers = salesData.reduce((sum, d) => sum + d.newUsers, 0);
  const avgConversion = (
    salesData.reduce((sum, d) => sum + parseFloat(d.conversionRate), 0) /
    salesData.length
  ).toFixed(1);

  // Previous period comparison
  const revenueGrowth = 12.5;
  const ordersGrowth = 8.3;
  const usersGrowth = 15.2;
  const conversionGrowth = 0.8;

  // Top performing data
  const topCategories = [
    { name: "Sneakers", revenue: 12500000, growth: 18.5 },
    { name: "Hoodies", revenue: 8200000, growth: 12.3 },
    { name: "Jackets", revenue: 6500000, growth: -5.2 },
    { name: "T-Shirts", revenue: 4200000, growth: 8.7 },
  ];

  const topVendors = [
    { name: "Kicks Store", orders: 456, revenue: 18500000, rating: 4.8 },
    { name: "Fashion Hub NG", orders: 312, revenue: 12400000, rating: 4.6 },
    { name: "Street Wear Co", orders: 289, revenue: 9800000, rating: 4.5 },
    { name: "Sports Hub NG", orders: 234, revenue: 8200000, rating: 4.7 },
  ];

  const maxRevenue = Math.max(...salesData.map((d) => d.revenue));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
          <p className="text-gray-500 text-sm mt-1">
            Comprehensive business performance reports
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="year">This Year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <HiDownload className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-lg bg-green-100">
              <HiCurrencyDollar className="w-5 h-5 text-green-600" />
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-medium ${revenueGrowth >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {revenueGrowth >= 0 ? (
                <HiArrowUp className="w-4 h-4" />
              ) : (
                <HiArrowDown className="w-4 h-4" />
              )}
              {Math.abs(revenueGrowth)}%
            </div>
          </div>
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            ₦{(totalRevenue / 1000000).toFixed(1)}M
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-lg bg-blue-100">
              <HiShoppingCart className="w-5 h-5 text-blue-600" />
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-medium ${ordersGrowth >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {ordersGrowth >= 0 ? (
                <HiArrowUp className="w-4 h-4" />
              ) : (
                <HiArrowDown className="w-4 h-4" />
              )}
              {Math.abs(ordersGrowth)}%
            </div>
          </div>
          <p className="text-gray-500 text-sm">Total Orders</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {totalOrders.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-lg bg-purple-100">
              <HiUsers className="w-5 h-5 text-purple-600" />
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-medium ${usersGrowth >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {usersGrowth >= 0 ? (
                <HiArrowUp className="w-4 h-4" />
              ) : (
                <HiArrowDown className="w-4 h-4" />
              )}
              {Math.abs(usersGrowth)}%
            </div>
          </div>
          <p className="text-gray-500 text-sm">New Users</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {totalUsers.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-lg bg-orange-100">
              <HiChartBar className="w-5 h-5 text-orange-600" />
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-medium ${conversionGrowth >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {conversionGrowth >= 0 ? (
                <HiArrowUp className="w-4 h-4" />
              ) : (
                <HiArrowDown className="w-4 h-4" />
              )}
              {Math.abs(conversionGrowth)}%
            </div>
          </div>
          <p className="text-gray-500 text-sm">Conversion Rate</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {avgConversion}%
          </p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Revenue & Orders Trend
        </h3>
        <div className="h-64 flex items-end justify-between gap-4">
          {salesData.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gray-100 rounded-t-lg relative group">
                <div
                  className="w-full bg-gradient-to-t from-green-600 to-green-500 rounded-t-lg transition-all duration-500"
                  style={{
                    height: `${(item.revenue / maxRevenue) * 220}px`,
                  }}
                ></div>
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                  ₦{item.revenue.toLocaleString()}
                </div>
              </div>
              <span className="text-xs text-gray-500 mt-2">{item.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Categories */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Top Categories
          </h3>
          <div className="space-y-4">
            {topCategories.map((category, index) => (
              <div
                key={index}
                className="flex items-center justify-between pb-3 border-b border-gray-50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold text-xs">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {category.name}
                    </p>
                    <p className="text-xs text-gray-500">Revenue</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">
                    ₦{(category.revenue / 1000000).toFixed(1)}M
                  </p>
                  <p
                    className={`text-xs ${category.growth >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {category.growth >= 0 ? "+" : ""}
                    {category.growth}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Vendors */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Top Vendors
          </h3>
          <div className="space-y-4">
            {topVendors.map((vendor, index) => (
              <div
                key={index}
                className="flex items-center justify-between pb-3 border-b border-gray-50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold text-xs">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {vendor.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {vendor.orders} orders
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">
                    ₦{(vendor.revenue / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-xs text-yellow-600">★ {vendor.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Monthly Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">
                  Month
                </th>
                <th className="text-right px-4 py-3 text-xs font-bold text-gray-500 uppercase">
                  Revenue
                </th>
                <th className="text-right px-4 py-3 text-xs font-bold text-gray-500 uppercase">
                  Orders
                </th>
                <th className="text-right px-4 py-3 text-xs font-bold text-gray-500 uppercase">
                  New Users
                </th>
                <th className="text-right px-4 py-3 text-xs font-bold text-gray-500 uppercase">
                  Conversion
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {salesData.map((data, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {data.month}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-gray-900">
                    ₦{data.revenue.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {data.orders}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {data.newUsers}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {data.conversionRate}%
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 font-bold">
              <tr>
                <td className="px-4 py-3 text-gray-800">Total</td>
                <td className="px-4 py-3 text-right text-gray-900">
                  ₦{totalRevenue.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-gray-900">
                  {totalOrders}
                </td>
                <td className="px-4 py-3 text-right text-gray-900">
                  {totalUsers}
                </td>
                <td className="px-4 py-3 text-right text-gray-900">
                  {avgConversion}%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
