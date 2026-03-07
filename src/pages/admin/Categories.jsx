import { useState, useEffect } from "react";
import {
  HiTag,
  HiPlus,
  HiPencil,
  HiTrash,
  HiEye,
  HiSearch,
  HiShoppingBag,
  HiCurrencyDollar,
  HiX,
  HiExclamationCircle,
  HiCheckCircle,
  HiPhotograph,
} from "react-icons/hi";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteConfirmCategory, setDeleteConfirmCategory] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCategories([
        {
          id: 1,
          name: "Sneakers",
          description: "All types of athletic and casual shoes",
          image: "/assets/categories/sneakers.jpeg",
          productCount: 245,
          totalSales: 15600000,
          averagePrice: 45000,
          status: "active",
          featured: true,
        },
        {
          id: 2,
          name: "Hoodies",
          description: "Warm and stylish hoodies for all seasons",
          image: "/assets/categories/hoodies.jpeg",
          productCount: 156,
          totalSales: 8200000,
          averagePrice: 28000,
          status: "active",
          featured: true,
        },
        {
          id: 3,
          name: "Jackets",
          description: "Jackets for every weather and occasion",
          image: "/assets/categories/jackets.jpeg",
          productCount: 189,
          totalSales: 9800000,
          averagePrice: 35000,
          status: "active",
          featured: true,
        },
        {
          id: 4,
          name: "T-Shirts",
          description: "Plain and printed t-shirts",
          image: "/assets/categories/plainTee.jpg",
          productCount: 312,
          totalSales: 5600000,
          averagePrice: 12000,
          status: "active",
          featured: false,
        },
        {
          id: 5,
          name: "Accessories",
          description: "Hats, bags, belts and more",
          image: "/assets/products/snapback.jpeg",
          productCount: 89,
          totalSales: 2300000,
          averagePrice: 15000,
          status: "active",
          featured: false,
        },
        {
          id: 6,
          name: "Shorts",
          description: "Casual and sports shorts",
          image: "/assets/products/camoshorts.jpeg",
          productCount: 78,
          totalSales: 1800000,
          averagePrice: 18000,
          status: "active",
          featured: false,
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const deleteCategory = (categoryId) => {
    setCategories(categories.filter((c) => c.id !== categoryId));
    setDeleteConfirmCategory(null);
    setSelectedCategory(null);
  };

  const toggleFeatured = (categoryId) => {
    setCategories(
      categories.map((c) =>
        c.id === categoryId ? { ...c, featured: !c.featured } : c,
      ),
    );
  };

  const getCategoryColor = (name) => {
    const colors = {
      Sneakers: "from-purple-500 to-purple-600",
      Hoodies: "from-blue-500 to-blue-600",
      Jackets: "from-orange-500 to-orange-600",
      "T-Shirts": "from-green-500 to-green-600",
      Accessories: "from-pink-500 to-pink-600",
      Shorts: "from-cyan-500 to-cyan-600",
    };
    return colors[name] || "from-gray-500 to-gray-600";
  };

  const totalCategories = categories.length;
  const totalProducts = categories.reduce((sum, c) => sum + c.productCount, 0);
  const totalCategorySales = categories.reduce(
    (sum, c) => sum + c.totalSales,
    0,
  );
  const featuredCategories = categories.filter((c) => c.featured).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
              <HiTag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900">Categories</h1>
              <p className="text-gray-600 font-medium">
                Manage product categories
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <HiPlus className="w-5 h-5" />
            Add Category
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
              <HiTag className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500">
                Total Categories
              </p>
              <p className="text-2xl font-black text-gray-900">
                {totalCategories}
              </p>
            </div>
          </div>
        </div>

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
              <HiCurrencyDollar className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500">Total Sales</p>
              <p className="text-2xl font-black text-gray-900">
                ₦{(totalCategorySales / 1000000).toFixed(1)}M
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">
              <HiCheckCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500">Featured</p>
              <p className="text-2xl font-black text-gray-900">
                {featuredCategories}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm mb-6">
        <div className="relative max-w-md">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none font-medium"
          />
        </div>
      </div>

      {/* Categories Grid */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">Loading categories...</p>
          </div>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HiTag className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-900 text-xl font-black mb-2">
            No categories found
          </p>
          <p className="text-gray-500 font-medium">
            Try adjusting your search terms
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Category Image */}
              <div className="relative h-40 bg-gray-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/Bg.PNG";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-3 right-3 flex gap-2">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-gray-900">
                    {category.productCount} products
                  </span>
                </div>
                {category.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-green-600 rounded-full text-xs font-bold text-white">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Category Info */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-black text-gray-900 group-hover:text-green-600 transition-colors">
                    {category.name}
                  </h3>
                  <button
                    onClick={() => toggleFeatured(category.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      category.featured
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-gray-100 text-gray-400 hover:bg-yellow-100 hover:text-yellow-600"
                    }`}
                    title={
                      category.featured
                        ? "Remove from featured"
                        : "Add to featured"
                    }
                  >
                    <HiCheckCircle className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {category.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-0.5">Avg Price</p>
                    <p className="font-bold text-gray-900">
                      ₦{category.averagePrice.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-0.5">Total Sales</p>
                    <p className="font-bold text-gray-900">
                      ₦{(category.totalSales / 1000000).toFixed(1)}M
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all duration-300 text-sm"
                  >
                    <HiEye className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 text-sm">
                    <HiPencil className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirmCategory(category)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-300 text-sm"
                  >
                    <HiTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmCategory && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setDeleteConfirmCategory(null)}
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
                Delete Category?
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete{" "}
                <span className="font-black text-gray-900">
                  {deleteConfirmCategory.name}
                </span>
                ? This will affect {deleteConfirmCategory.productCount}{" "}
                products.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDeleteConfirmCategory(null)}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteCategory(deleteConfirmCategory.id)}
                  className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-300 shadow-md"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Details Modal */}
      {selectedCategory && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCategory(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48">
              <img
                src={selectedCategory.image}
                alt={selectedCategory.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/Bg.PNG";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <button
                onClick={() => setSelectedCategory(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 flex items-center justify-center transition-all duration-300"
              >
                <HiX className="w-5 h-5 text-white" />
              </button>
              <div className="absolute bottom-4 left-6">
                <h2 className="text-3xl font-black text-white">
                  {selectedCategory.name}
                </h2>
                {selectedCategory.featured && (
                  <span className="px-3 py-1 bg-green-600 rounded-full text-xs font-bold text-white mt-2 inline-block">
                    Featured Category
                  </span>
                )}
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-6">
                {selectedCategory.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Products</p>
                  <p className="text-2xl font-black text-gray-900">
                    {selectedCategory.productCount}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Avg Price</p>
                  <p className="text-2xl font-black text-gray-900">
                    ₦{selectedCategory.averagePrice.toLocaleString()}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Total Sales</p>
                  <p className="text-2xl font-black text-gray-900">
                    ₦{(selectedCategory.totalSales / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <p className="text-lg font-black text-green-600 capitalize">
                    {selectedCategory.status}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="flex-1 px-6 py-4 bg-gray-900 hover:bg-gray-800 text-white font-black rounded-xl transition-all duration-300"
                >
                  Close
                </button>
                <button className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-all duration-300">
                  Edit Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-gray-900">
                  Add New Category
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-300"
                >
                  <HiX className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, name: e.target.value })
                    }
                    placeholder="e.g., Sneakers, Hoodies"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newCategory.description}
                    onChange={(e) =>
                      setNewCategory({
                        ...newCategory,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe this category..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none font-medium resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Category Image URL
                  </label>
                  <div className="relative">
                    <HiPhotograph className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={newCategory.image}
                      onChange={(e) =>
                        setNewCategory({
                          ...newCategory,
                          image: e.target.value,
                        })
                      }
                      placeholder="https://example.com/image.jpg"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-black rounded-xl transition-all duration-300"
                >
                  Cancel
                </button>
                <button className="flex-1 px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-black rounded-xl transition-all duration-300 shadow-md">
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
