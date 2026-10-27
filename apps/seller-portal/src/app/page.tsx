import Link from 'next/link';

export default function SellerDashboardPage() {
  const stats = [
    { title: 'Total Sales (30 Days)', value: '₹2,34,500', note: '142 orders processed', icon: '💰', color: 'bg-emerald-50 text-emerald-800' },
    { title: 'Orders Ready for Dispatch', value: '4', note: '2 Alphonso Pre-orders', icon: '📦', color: 'bg-amber-50 text-amber-800' },
    { title: 'Active Catalog Items', value: '8', note: 'All FSSAI & Udyam tagged', icon: '🥭', color: 'bg-orange-50 text-orange-800' },
    { title: 'Low Stock Alerts', value: '1', note: 'Malvani Special Masala', icon: '⚠️', color: 'bg-rose-50 text-rose-800' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 rounded-2xl p-6 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm">
        <div>
          <span className="text-xs uppercase tracking-widest text-emerald-300 font-bold">Orchard Direct Store</span>
          <h2 className="text-2xl font-bold mt-1">Gogate Organic Orchards (Ratnagiri)</h2>
          <p className="text-sm text-emerald-200 mt-1">
            FSSAI License: 11521045000123 • Udyam: UDYAM-MH-27-0012345 • Store Pickup: Enabled
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold rounded-lg text-xs shadow-sm transition"
          >
            + Add Organic Product
          </Link>
          <Link
            href="/orders"
            className="px-4 py-2 bg-emerald-700/80 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs border border-emerald-600 transition"
          >
            Process Orders
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">{s.title}</span>
              <span className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg ${s.color}`}>
                {s.icon}
              </span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-stone-900">{s.value}</p>
              <p className="text-xs text-stone-500 mt-1">{s.note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Courier Partners Quick Bar */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <h3 className="text-sm font-bold text-stone-900 mb-2">Integrated Logistics & Courier Partners</h3>
        <p className="text-xs text-stone-500 mb-4">
          Choose from in-house cold chain linehaul fleet or 3PL aggregators when printing manifests
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          {[
            { name: 'Gogate Internal Fleet', tag: 'Direct Hubs', active: true },
            { name: 'Shiprocket', tag: 'Aggregator', active: true },
            { name: 'NimbusPost', tag: 'Surface/Air', active: true },
            { name: 'Tookan', tag: 'On-Demand', active: true },
            { name: 'Shipday', tag: 'Local Fleet', active: true },
            { name: 'Pidge', tag: 'Radius Dispatch', active: true },
          ].map((c, i) => (
            <div key={i} className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-center">
              <p className="text-xs font-bold text-stone-800">{c.name}</p>
              <span className="text-[10px] text-stone-500">{c.tag}</span>
              <span className="block mt-1 text-[10px] text-emerald-700 font-semibold">● Ready</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Store Orders */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-stone-200 flex items-center justify-between">
          <h3 className="text-base font-bold text-stone-900">Recent Orders Requiring Dispatch</h3>
          <Link href="/orders" className="text-xs font-semibold text-emerald-700 hover:text-emerald-800">
            View All Orders →
          </Link>
        </div>
        <div className="p-4 space-y-3">
          <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-900 text-sm font-mono">GGT-ORD-100294</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-100 text-blue-800">
                  SHIPPED
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
                  AWB: GGT-EXP-992014
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Customer: Ananya Sharma • 1x Alphonso Mangoes Grade A (1 Dozen) + 1x Jumbo Cashews W180
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-900">₹2,261.45</span>
              <Link
                href="/orders"
                className="px-3 py-1.5 bg-stone-900 text-white rounded text-xs font-semibold hover:bg-stone-800 transition"
              >
                Track Live Shipment
              </Link>
            </div>
          </div>

          <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-900 text-sm font-mono">GGT-ORD-100295</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800">
                  PROCESSING
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-100 text-purple-800">
                  STORE PICKUP
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Customer: Rahul Kulkarni • 2x Alphonso Mangoes Grade A (Pre-Order for May Harvest)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-900">₹2,900.00</span>
              <Link
                href="/orders"
                className="px-3 py-1.5 bg-emerald-600 text-white rounded text-xs font-semibold hover:bg-emerald-700 transition"
              >
                Mark Ready for Pickup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
