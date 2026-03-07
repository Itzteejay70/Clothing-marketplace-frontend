import { useState, useEffect } from "react";
import {
  HiSearch,
  HiFilter,
  HiPlus,
  HiEye,
  HiPencil,
  HiTrash,
  HiShoppingBag,
  HiCurrencyDollar,
  HiStar,
  HiStatusOnline,
  HiStatusOffline,
  HiX,
  HiChevronDown,
  HiArrowUp,
  HiArrowDown,
  HiExclamationCircle,
} from "react-icons/hi";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: "Nike Air Max 270",
          category: "Sneakers",
          price: 45000,
          originalPrice: 55000,
          stock: 45,
          sold: 234,
          rating: 4.8,
          reviews: 156,
          status: "active",
          vendor: "Kicks Store",
          images: ["/assets/products/camoshorts.jpeg"],
          description: "Premium comfort sneaker with Air Max cushioning",
          createdAt: "2024-01-15",
        },
        {
          id: 2,
          name: "Adidas Ultraboost 22",
          category: "Sneakers",
          price: 52000,
          originalPrice: 65000,
          stock: 32,
          sold: 189,
          rating: 4.7,
          reviews: 98,
          status: "active",
          vendor: "Sports Hub NG",
          images: ["/assets/products/cargopants.jpeg"],
          description: "High-performance running shoes with Boost technology",
          createdAt: "2024-01-12",
        },
        {
          id: 3,
          name: "Puma RS-X3",
          category: "Sneakers",
          price: 38000,
          originalPrice: 45000,
          stock: 67,
          sold: 145,
          rating: 4.5,
          reviews: 72,
          status: "active",
          vendor: "Street Wear Co",
          images: ["/assets/products/driptee.jpeg"],
          description: "Bold design with running system technology",
          createdAt: "2024-01-10",
        },
        {
          id: 4,
          name: "Vans Old Skool",
          category: "Sneakers",
          price: 28000,
          originalPrice: 35000,
          stock: 89,
          sold: 312,
          rating: 4.9,
          reviews: 234,
          status: "active",
          vendor: "Vans Nigeria",
          images: ["/assets/products/hoodHoodie.jpeg"],
          description: "Classic skate shoe with iconic side stripe",
          createdAt: "2024-01-08",
        },
        {
          id: 5,
          name: "New Balance 574",
          category: "Sneakers",
          price: 42000,
          originalPrice: 50000,
          stock: 23,
          sold: 98,
          rating: 4.6,
          reviews: 67,
          status: "active",
          vendor: "Kicks Store",
          images: ["/assets/products/printshirt.jpeg"],
          description: "Iconic lifestyle sneaker with ENCAP midsole",
          createdAt: "2024-01-05",
        },
        {
          id: 6,
          name: "Nike Hoodie Tech Fleece",
          category: "Hoodies",
          price: 35000,
          originalPrice: 42000,
          stock: 56,
          sold: 178,
          rating: 4.7,
          reviews: 89,
          status: "active",
          vendor: "Fashion Hub NG",
          images: ["/assets/products/sweatshirt.jpeg"],
          description: "Lightweight hoodie with thermal fleece",
          createdAt: "2024-01-03",
        },
        {
          id: 7,
          name: "Adidas Track Jacket",
          category: "Jackets",
          price: 28000,
          originalPrice: 35000,
          stock: 34,
          sold: 89,
          rating: 4.4,
          reviews: 45,
          status: "active",
          vendor: "Sports Hub NG",
          images: ["/assets/products/varsityjacket.jpeg"],
          description: "Classic track jacket with full zip",
          createdAt: "2024-01-01",
        },
        {
          id: 8,
          name: "Puma Basic Tee",
          category: "T-Shirts",
          price: 12000,
          originalPrice: 15000,
          stock: 156,
          sold: 423,
          rating: 4.3,
          reviews: 189,
          status: "active",
          vendor: "Street Wear Co",
          images: ["/assets/products/snapback.jpeg"],
          description: "Cotton basic tee with Puma branding",
          createdAt: "2023-12-28",
        },
        {
          id: 9,
          name: "Nike Air Jordan 1",
          category: "Sneakers",
          price: 85000,
          originalPrice: 120000,
          stock: 12,
          sold: 67,
          rating: 4.9,
          reviews: 234,
          status: "active",
          vendor: "Kicks Store",
          images: ["/assets/products/camoshorts.jpeg"],
          description: "Iconic basketball sneaker with premium leather",
          createdAt: "2023-12-25",
        },
        {
          id: 10,
          name: "Hoodie Premium Cotton",
          category: "Hoodies",
          price: 25000,
          originalPrice: 30000,
          stock: 0,
          sold: 234,
          rating: 4.5,
          reviews: 112,
          status: "out_of_stock",
          vendor: "Fashion Hub NG",
          images: ["/assets/products/hoodHoodie.jpeg"],
          description: "100% cotton premium hoodie",
          createdAt: "2023-12-20",
        },
        {
          id: 11,
          name: "Denim Jacket Classic",
          category: "Jackets",
          price: 32000,
          originalPrice: 40000,
          stock: 28,
          sold: 56,
          rating: 4.2,
          reviews: 34,
          status: "active",
          vendor: "Street Wear Co",
          images: ["/assets/products/varsityjacket.jpeg"],
          description: "Classic denim jacket for all seasons",
          createdAt: "2023-12-18",
        },
        {
          id: 12,
          name: "Converse Chuck Taylor",
          category: "Sneakers",
          price: 25000,
          originalPrice: 30000,
          stock: 78,
          sold: 456,
          rating: 4.8,
          reviews: 312,
          status: "active",
          vendor: "Converse Nigeria",
          images: ["/assets/products/cargopants.jpeg"],
          description: "Iconic all-star canvas sneaker",
          createdAt: "2023-12-15",
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "price_high":
        return b.price - a.price;
      case "price_low":
        return a.price - b.price;
      case "best_selling":
        return b.sold - a.sold;
      case "stock_low":
        return a.stock - b.stock;
      default:
        return 0;
    }
  });

  const deleteProduct = (productId) => {
    setProducts(products.filter((p) => p.id !== productId));
    setDeleteConfirmProduct(null);
    setSelectedProduct(null);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      active: { bg: "bg-green-100", text: "text-green-700", label: "Active" },
      inactive: { bg: "bg-gray-100", text: "text-gray-700", label: "Inactive" },
      out_of_stock: {
        bg: "bg-red-100",
        text: "text-red-700",
        label: "Out of Stock",
      },
      draft: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Draft" },
    };
    return statusMap[status] || statusMap.draft;
  };

  const getCategoryColor = (category) => {
    const colors = {
      Sneakers: "bg-purple-100 text-purple-700",
      Hoodies: "bg-blue-100 text-blue-700",
      Jackets: "bg-orange-100 text-orange-700",
      "T-Shirts": "bg-green-100 text-green-700",
      Accessories: "bg-pink-100 text-pink-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  const categories = [...new Set(products.map((p) => p.category))];
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status === "active").length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
              <HiShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900">
                All Products
              </h1>
              <p className="text-gray-600 font-medium">
                Manage your product inventory
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
            <HiPlus className="w-5 h-5" />
            Add Product
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
              <HiShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500">Total Products</p>
              <p className="text-2xl font-black text-gray-900">
                {totalProducts}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
              <HiStatusOnline className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500">Active Products</p>
              <p className="text-2xl font-black text-gray-900">
                {activeProducts}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
              <HiStatusOffline className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500">Out of Stock</p>
              <p className="text-2xl font-black text-gray-900">{outOfStock}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
              <HiCurrencyDollar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500">Inventory Value</p>
              <p className="text-2xl font-black text-gray-900">
                ₦{(totalValue / 1000000).toFixed(1)}M
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="md:col-span-2 relative">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none font-medium"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <HiFilter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none font-bold text-gray-700 bg-white appearance-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none font-bold text-gray-700 bg-white appearance-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price_high">Price: High to Low</option>
              <option value="price_low">Price: Low to High</option>
              <option value="best_selling">Best Selling</option>
              <option value="stock_low">Low Stock</option>
            </select>
            <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { key: "all", label: "All Products" },
            { key: "active", label: "Active" },
            { key: "out_of_stock", label: "Out of Stock" },
            { key: "inactive", label: "Inactive" },
          ].map((status) => (
            <button
              key={status.key}
              onClick={() => setStatusFilter(status.key)}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 whitespace-nowrap ${
                statusFilter === status.key
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm font-bold text-gray-600">
            Showing{" "}
            <span className="text-green-600">{sortedProducts.length}</span> of{" "}
            {products.length} products
          </p>
        </div>
      </div>

      {/* Products Table */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">Loading products...</p>
          </div>
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HiShoppingBag className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-900 text-xl font-black mb-2">
            No products found
          </p>
          <p className="text-gray-500 font-medium">
            Try adjusting your filters or search terms
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Sold
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sortedProducts.map((product) => {
                  const statusStyle = getStatusBadge(product.status);
                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "/Bg.PNG";
                              }}
                            />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 truncate max-w-[200px]">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {product.vendor}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(product.category)}`}
                        >
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-900">
                          ₦{product.price.toLocaleString()}
                        </p>
                        {product.originalPrice > product.price && (
                          <p className="text-xs text-gray-500 line-through">
                            ₦{product.originalPrice.toLocaleString()}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-bold ${product.stock === 0 ? "text-red-600" : product.stock < 20 ? "text-orange-600" : "text-gray-900"}`}
                          >
                            {product.stock}
                          </span>
                          {product.stock < 20 && product.stock > 0 && (
                            <HiExclamationCircle className="w-4 h-4 text-orange-500" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-900">
                          {product.sold}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <HiStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-bold text-gray-900">
                            {product.rating}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({product.reviews})
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyle.bg} ${statusStyle.text}`}
                        >
                          {statusStyle.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedProduct(product)}
                            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="View"
                          >
                            <HiEye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <HiPencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmProduct(product)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <HiTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmProduct && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setDeleteConfirmProduct(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <HiExclamationCircle className="w-10 h-10 text-red-600" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 text-center mb-2">
                Delete Product?
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete{" "}
                <span className="font-black text-gray-900">
                  {deleteConfirmProduct.name}
                </span>
                ? This action cannot be undone.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDeleteConfirmProduct(null)}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteProduct(deleteConfirmProduct.id)}
                  className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-300 shadow-md"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48 bg-gradient-to-br from-green-500 to-green-600">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 flex items-center justify-center transition-all duration-300"
              >
                <HiX className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="px-6 pb-6">
              <div className="flex items-end gap-4 -mt-16 mb-4">
                <div className="w-28 h-28 rounded-xl bg-white p-1 shadow-lg">
                  <img
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = "/Bg.PNG";
                    }}
                  />
                </div>
                <div className="flex-1 pb-2">
                  <h2 className="text-2xl font-black text-gray-900">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-gray-600">{selectedProduct.vendor}</p>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(selectedProduct.category)}`}
                >
                  {selectedProduct.category}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(selectedProduct.status).bg} ${getStatusBadge(selectedProduct.status).text}`}
                >
                  {getStatusBadge(selectedProduct.status).label}
                </span>
              </div>

              <p className="text-gray-600 mb-6">
                {selectedProduct.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Price</p>
                  <p className="text-lg font-black text-gray-900">
                    ₦{selectedProduct.price.toLocaleString()}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Stock</p>
                  <p className="text-lg font-black text-gray-900">
                    {selectedProduct.stock}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Sold</p>
                  <p className="text-lg font-black text-gray-900">
                    {selectedProduct.sold}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Rating</p>
                  <p className="text-lg font-black text-gray-900">
                    {selectedProduct.rating}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 px-6 py-4 bg-gray-900 hover:bg-gray-800 text-white font-black rounded-xl transition-all duration-300"
                >
                  Close
                </button>
                <button className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-all duration-300">
                  Edit Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
