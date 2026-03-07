import { useState, useEffect } from "react";
import {
  HiTrendingUp,
  HiTrendingDown,
  HiCurrencyDollar,
  HiShoppingCart,
  HiUsers,
  HiShoppingBag,
  HiArrowUp,
  HiArrowDown,
  HiRefresh,
  HiCalendar,
  HiStar,
  HiEye,
  HiCreditCard,
  HiLocationMarker,
} from "react-icons/hi";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7days");
  const [isLoading, setIsLoading] = useState(true);
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  // Generate mock analytics data
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      // Sales over time data
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
      const sales = [];

      for (let i = 6; i >= 0; i--) {
        const monthIndex = (currentMonth - i + 12) % 12;
        sales.push({
          month: months[monthIndex],
          revenue: Math.floor(Math.random() * 500000) + 800000,
          orders: Math.floor(Math.random() * 200) + 100,
        });
      }
      setSalesData(sales);

      // Category distribution
      setCategoryData([
        { name: "Sneakers", value: 35, color: "bg-green-600" },
        { name: "Hoodies", value: 25, color: "bg-blue-600" },
        { name: "Jackets", value: 20, color: "bg-purple-600" },
        { name: "T-Shirts", value: 15, color: "bg-orange-600" },
        { name: "Accessories", value: 5, color: "bg-gray-600" },
      ]);

      // Top products
      setTopProducts([
        {
          name: "Nike Air Max 270",
          sales: 245,
          revenue: 12250000,
          growth: 12.5,
        },
        {
          name: "Adidas Ultraboost",
          sales: 198,
          revenue: 9900000,
          growth: 8.2,
        },
        { name: "Puma RS-X", sales: 167, revenue: 6680000, growth: -3.1 },
        { name: "New Balance 574", sales: 145, revenue: 6525000, growth: 15.8 },
        { name: "Vans Old Skool", sales: 132, revenue: 4620000, growth: 5.4 },
      ]);

      // Revenue by source
      setRevenueData([
        { source: "Online Sales", amount: 4500000, percentage: 75 },
        { source: "Vendor Commission", amount: 900000, percentage: 15 },
        { source: "Advertising", amount: 450000, percentage: 7.5 },
        { source: "Premium Listings", amount: 150000, percentage: 2.5 },
      ]);

      setIsLoading(false);
    }, 800);
  }, [timeRange]);

  // Calculate totals
  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
  const averageOrderValue = totalRevenue / totalOrders;
  const conversionRate = 3.2 + Math.random() * 2;

  // Key metrics
  const metrics = [
    {
      label: "Total Revenue",
      value: `₦${totalRevenue.toLocaleString()}`,
      change: 12.5,
      icon: HiCurrencyDollar,
      color: "bg-green-600",
    },
    {
      label: "Total Orders",
      value: totalOrders.toLocaleString(),
      change: 8.3,
      icon: HiShoppingCart,
      color: "bg-blue-600",
    },
    {
      label: "Total Users",
      value: "12,458",
      change: 15.2,
      icon: HiUsers,
      color: "bg-purple-600",
    },
    {
      label: "Products Sold",
      value: "8,234",
      change: -2.1,
      icon: HiShoppingBag,
      color: "bg-orange-600",
    },
  ];

  // Weekly comparison
  const weeklyData = [
    { day: "Mon", revenue: 125000, orders: 45 },
    { day: "Tue", revenue: 158000, orders: 52 },
    { day: "Wed", revenue: 142000, orders: 48 },
    { day: "Thu", revenue: 175000, orders: 61 },
    { day: "Fri", revenue: 198000, orders: 72 },
    { day: "Sat", revenue: 225000, orders: 85 },
    { day: "Sun", revenue: 165000, orders: 58 },
  ];

  const maxRevenue = Math.max(...weeklyData.map((d) => d.revenue));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
          <p className="text-gray-500 text-sm mt-1">
            Track your store performance and insights
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
            <HiRefresh className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-lg ${metric.color}`}>
                <metric.icon className="w-5 h-5 text-white" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  metric.change >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {metric.change >= 0 ? (
                  <HiArrowUp className="w-4 h-4" />
                ) : (
                  <HiArrowDown className="w-4 h-4" />
                )}
                {Math.abs(metric.change)}%
              </div>
            </div>
            <p className="text-gray-500 text-sm">{metric.label}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Revenue Overview
          </h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {salesData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-green-100 rounded-t-lg relative group">
                  <div
                    className="w-full bg-gradient-to-t from-green-600 to-green-500 rounded-t-lg transition-all duration-500"
                    style={{
                      height: `${(item.revenue / Math.max(...salesData.map((d) => d.revenue))) * 200}px`,
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

        {/* Weekly Performance */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Weekly Performance
          </h3>
          <div className="h-64 flex flex-col justify-between">
            {weeklyData.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-8">{item.day}</span>
                <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-gray-700 w-20 text-right">
                  ₦{(item.revenue / 1000).toFixed(0)}k
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Sales by Category
          </h3>
          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{category.name}</span>
                  <span className="text-sm font-medium text-gray-800">
                    {category.value}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${category.color} rounded-full`}
                    style={{ width: `${category.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Top Products
          </h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
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
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product.sales} sales
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">
                    ₦{(product.revenue / 1000000).toFixed(1)}M
                  </p>
                  <p
                    className={`text-xs ${
                      product.growth >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.growth >= 0 ? "+" : ""}
                    {product.growth}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Sources */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Revenue Sources
          </h3>
          <div className="space-y-4">
            {revenueData.map((source, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-800">
                    {source.source}
                  </span>
                  <span className="text-sm text-gray-600">
                    {source.percentage}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  ₦{source.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <HiCurrencyDollar className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">Avg Order Value</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            ₦
            {averageOrderValue.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
          <p className="text-xs text-green-600 mt-1">↑ 5.2% from last period</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <HiTrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-gray-600">Conversion Rate</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {conversionRate.toFixed(1)}%
          </p>
          <p className="text-xs text-green-600 mt-1">↑ 0.8% from last period</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <HiEye className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm text-gray-600">Page Views</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">45,234</p>
          <p className="text-xs text-green-600 mt-1">
            ↑ 12.3% from last period
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <HiStar className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-600">Customer Rating</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">4.8</p>
          <p className="text-xs text-green-600 mt-1">↑ 0.2 from last period</p>
        </div>
      </div>
    </div>
  );
}
