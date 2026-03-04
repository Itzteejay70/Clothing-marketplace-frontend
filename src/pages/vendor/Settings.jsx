export default function VendorSettings() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
          Settings
        </h1>
        <p className="mt-1 text-sm font-medium text-gray-600">
          Basic store settings.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Store Profile */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <p className="text-sm font-black text-gray-900">Store Profile</p>

          <div className="mt-4 space-y-4">
            <label className="block">
              <span className="text-xs font-bold text-gray-500">Store name</span>
              <input
                className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 outline-none focus:border-green-600 focus:bg-white transition-all duration-300"
                defaultValue="Strka"
              />
            </label>

            <label className="block">
              <span className="text-xs font-bold text-gray-500">Store email</span>
              <input
                className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 outline-none focus:border-green-600 focus:bg-white transition-all duration-300"
                defaultValue="strka@email.com"
              />
            </label>
          </div>

          <button
            type="button"
            className="mt-5 w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold text-sm transition-all duration-300 shadow-sm"
          >
            Save Changes
          </button>
        </div>

        {/* Payout Details */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <p className="text-sm font-black text-gray-900">Payout Details</p>

          <div className="mt-4 space-y-4">
            <label className="block">
              <span className="text-xs font-bold text-gray-500">Bank name</span>
              <input
                className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 outline-none focus:border-green-600 focus:bg-white transition-all duration-300"
                placeholder="e.g. GTBank"
              />
            </label>

            <label className="block">
              <span className="text-xs font-bold text-gray-500">
                Account number
              </span>
              <input
                className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 outline-none focus:border-green-600 focus:bg-white transition-all duration-300"
                placeholder="10 digits"
              />
            </label>
          </div>

          <button
            type="button"
            className="mt-5 w-full sm:w-auto px-5 py-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold text-sm transition-all duration-300"
          >
            Update Payout Info
          </button>
        </div>
      </div>
    </div>
  );
}