import Link from 'next/link';

export default function AdminDashboardPage() {
  const stats = [
    { title: 'Total Stores / Storefronts', value: '4', change: '+2 this month', icon: '🏪', color: 'bg-emerald-50 text-emerald-700' },
    { title: 'Gross Merchandise Value', value: '₹4,82,900', change: '+18.4% Alphonso Season', icon: '💰', color: 'bg-amber-50 text-amber-700' },
    { title: 'Pending Store KYC', value: '1', change: 'Devgad Cashew Guild', icon: '📜', color: 'bg-rose-50 text-rose-700' },
    { title: 'Active In-Transit Shipments', value: '18', change: 'In-House & 3PL Combined', icon: '🚚', color: 'bg-blue-50 text-blue-700' },
  ];

  const recentStores = [
    { name: 'Gogate Organic Orchards (Ratnagiri Flagship)', domain: 'ratnagiri.gogateproducts.com', status: 'ACTIVE', kyc: 'APPROVED', fssai: '11521045000123', udyam: 'UDYAM-MH-27-0012345', pickup: true },
    { name: 'Devgad Cashew & Spice Guild', domain: 'devgad.gogateproducts.com', status: 'PENDING_KYC', kyc: 'SUBMITTED', fssai: '11522046000789', udyam: 'UDYAM-MH-28-0056789', pickup: false },
    { name: 'Konkan Honey & Amla Cooperative', domain: 'konkan.gogateproducts.com', status: 'ACTIVE', kyc: 'APPROVED', fssai: '11523041000456', udyam: 'UDYAM-MH-29-0099887', pickup: true },
    { name: 'Sindhudurg Organic Spices Hub', domain: 'spices.gogateproducts.com', status: 'ACTIVE', kyc: 'APPROVED', fssai: '11523048000654', udyam: 'UDYAM-MH-30-0044556', pickup: false },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Superadmin Control Tower</h2>
          <p className="text-sm text-slate-500 mt-1">
            Real-time management for Gogate Products organic marketplace, stores, logistics, and API gateways.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/stores"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 shadow-sm transition"
          >
            <span>+</span> Onboard New Store
          </Link>
          <Link
            href="/developer-keys"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg text-sm font-semibold hover:bg-slate-50 transition"
          >
            🔑 Gateway Keys
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">{s.title}</span>
              <span className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${s.color}`}>
                {s.icon}
              </span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
              <p className="text-xs text-emerald-600 font-medium mt-1">{s.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Active Gateway Statuses */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Active Payment Gateways & Courier Integrations</h3>
            <p className="text-xs text-slate-500">Superadmin verified API credentials and live operational webhooks</p>
          </div>
          <Link href="/developer-keys" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
            Configure Vault & Keys →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { name: 'Razorpay PG', type: 'Payment', status: 'Live', ping: '24ms' },
            { name: 'Paytm PG', type: 'Payment', status: 'Live', ping: '42ms' },
            { name: 'Cashfree PG', type: 'Payment', status: 'Live', ping: '31ms' },
            { name: 'Easebuzz PG', type: 'Payment', status: 'Live', ping: '38ms' },
            { name: 'PayU PG', type: 'Payment', status: 'Live', ping: '29ms' },
            { name: 'Shiprocket 3PL', type: 'Logistics', status: 'Active', ping: '110ms' },
            { name: 'NimbusPost 3PL', type: 'Logistics', status: 'Active', ping: '95ms' },
            { name: 'Tookan On-Demand', type: 'Fleet', status: 'Active', ping: '88ms' },
            { name: 'Shipday Dispatch', type: 'Fleet', status: 'Active', ping: '72ms' },
            { name: 'Pidge Radius', type: 'Hyperlocal', status: 'Active', ping: '65ms' },
          ].map((item, idx) => (
            <div key={idx} className="p-3 rounded-lg border border-slate-100 bg-slate-50 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">{item.type}</span>
                <p className="text-xs font-bold text-slate-800">{item.name}</p>
              </div>
              <div className="flex items-center justify-between mt-2 text-[11px]">
                <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {item.status}
                </span>
                <span className="text-slate-400">{item.ping}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stores Overview Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Registered Stores & Storefronts</h3>
            <p className="text-xs text-slate-500">Control store visibility, KYC verification, and local pickup eligibility</p>
          </div>
          <Link href="/stores" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
            View All Stores →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-5">Store Name & Domain</th>
                <th className="py-3 px-5">FSSAI / Udyam</th>
                <th className="py-3 px-5">Store Status</th>
                <th className="py-3 px-5">KYC Status</th>
                <th className="py-3 px-5">Store Pickup</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentStores.map((st, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition">
                  <td className="py-4 px-5">
                    <p className="font-semibold text-slate-900">{st.name}</p>
                    <p className="text-xs text-slate-400 font-mono">{st.domain}</p>
                  </td>
                  <td className="py-4 px-5">
                    <p className="text-xs text-slate-700 font-mono">FSSAI: {st.fssai}</p>
                    <p className="text-xs text-slate-500 font-mono">Udyam: {st.udyam}</p>
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                        st.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {st.status}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                        st.kyc === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {st.kyc}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    {st.pickup ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        ✓ Enabled
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">Disabled</span>
                    )}
                  </td>
                  <td className="py-4 px-5 text-right space-x-2">
                    <Link
                      href="/stores"
                      className="text-xs font-semibold text-slate-700 bg-white border border-slate-300 px-2.5 py-1 rounded hover:bg-slate-50"
                    >
                      Edit
                    </Link>
                    {st.kyc === 'SUBMITTED' && (
                      <Link
                        href="/kyc"
                        className="text-xs font-semibold text-white bg-amber-600 px-2.5 py-1 rounded hover:bg-amber-700"
                      >
                        Verify KYC
                      </Link>
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
