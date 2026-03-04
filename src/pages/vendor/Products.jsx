import { HiPencilAlt, HiPlus } from "react-icons/hi";

const products = [
  { id: 1, name: "Classic Hoodie", price: "₦25,000", stock: 12, status: "Live" },
  { id: 2, name: "Cargo Pants", price: "₦18,000", stock: 3, status: "Live" },
  { id: 3, name: "Street Tee", price: "₦9,500", stock: 0, status: "Pending" },
];

function badgeClasses(status) {
  switch (status) {
    case "Live":
      return "bg-green-50 text-green-700 border-green-200";
    case "Pending":
      return "bg-orange-50 text-orange-700 border-orange-200";
    case "Rejected":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

export default function VendorProducts() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            Products
          </h1>
          <p className="mt-1 text-sm font-medium text-gray-600">
            Manage your listings.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold text-sm transition-all duration-300 shadow-sm"
        >
          <HiPlus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-black">Product</th>
                <th className="px-4 py-3 font-black">Price</th>
                <th className="px-4 py-3 font-black">Stock</th>
                <th className="px-4 py-3 font-black">Status</th>
                <th className="px-4 py-3 font-black text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/60"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center">
                        <span className="text-green-700 font-black text-sm">
                          {p.name?.charAt(0) || "P"}
                        </span>
                      </div>
                      <div>
                        <p className="font-black text-gray-900">{p.name}</p>
                        <p className="text-xs font-medium text-gray-500">
                          Product ID: {p.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 font-black text-gray-900">
                    {p.price}
                  </td>

                  <td className="px-4 py-3">
                    {p.stock === 0 ? (
                      <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-bold">
                        Out of stock
                      </span>
                    ) : p.stock <= 3 ? (
                      <span className="px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200 text-xs font-bold">
                        {p.stock} left
                      </span>
                    ) : (
                      <span className="font-black text-gray-900">{p.stock}</span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-bold ${badgeClasses(
                        p.status
                      )}`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs transition-all duration-300"
                    >
                      <HiPencilAlt className="w-4 h-4" />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}

              {products.length === 0 ? (
                <tr>
                  <td
                    className="px-4 py-10 text-center text-gray-500 font-bold"
                    colSpan={5}
                  >
                    No products yet.
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