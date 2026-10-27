import Link from 'next/link';

export default function HubDashboardPage() {
  const stats = [
    { title: 'Inward Parcels Today', value: '412', note: '98% scanned on dock', icon: '📥', color: 'bg-blue-50 text-blue-700' },
    { title: 'Outward Bags Dispatched', value: '18', note: 'Linehaul trucks to Mumbai & Pune', icon: '🚛', color: 'bg-emerald-50 text-emerald-700' },
    { title: 'Active Delivery Executives', value: '14', note: 'Last-mile runsheets active', icon: '🛵', color: 'bg-amber-50 text-amber-700' },
    { title: 'Perishable Consignments', value: '184', note: 'Hapus Mangoes & Kokum Juice', icon: '🥭', color: 'bg-orange-50 text-orange-700' },
  ];

  const activeHubs = [
    { code: 'HUB-RTN-01', name: 'Ratnagiri Central Agro Hub', type: 'Origin Aggregation', activeParcels: 140, city: 'Ratnagiri' },
    { code: 'HUB-BOM-01', name: 'Mumbai Bhiwandi Linehaul Hub', type: 'Intermediate Sorting', activeParcels: 285, city: 'Mumbai' },
    { code: 'HUB-PUN-01', name: 'Pune Hadapsar Express Branch', type: 'Last-Mile Delivery Branch', activeParcels: 92, city: 'Pune' },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Hub Operations & Courier Command</h2>
          <p className="text-sm text-slate-500 mt-1">
            Real-time parcel inward/outward scanning, cold-chain monitoring, inter-hub linehauls, and delivery boy runsheets.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/inward"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm shadow-sm transition"
          >
            📥 Scan Inward Parcel
          </Link>
          <Link
            href="/linehaul"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-sm shadow-sm transition"
          >
            🚛 View Active Trucks
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{s.title}</span>
              <span className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg ${s.color}`}>
                {s.icon}
              </span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-500 mt-1">{s.note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Network Hub Status */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-1">Our Dedicated Hub Network</h3>
        <p className="text-xs text-slate-500 mb-4">
          Integrated farm-to-door cold chain routing points across Konkan, Mumbai Metropolitan, and Pune.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeHubs.map((hub) => (
            <div key={hub.code} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {hub.code}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700">● Operational</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mt-2">{hub.name}</h4>
                <p className="text-xs text-slate-500">{hub.type} • {hub.city}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-600">Active Consignments:</span>
                <span className="font-bold text-slate-900">{hub.activeParcels} pkgs</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Active Linehaul Trip */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-mono font-bold text-blue-700 uppercase">Linehaul Transit in Progress</span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">TRIP-RTN-BOM-20261027</h3>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold animate-pulse">
            ● IN TRANSIT (NH-66)
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="text-slate-400">Driver</span>
            <p className="font-bold text-slate-900 mt-0.5">Suresh Patil (+919899887766)</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="text-slate-400">Vehicle / Spec</span>
            <p className="font-bold text-slate-900 mt-0.5">MH-08-AG-9988 (14ft Refrig.)</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="text-slate-400">Route</span>
            <p className="font-bold text-slate-900 mt-0.5">Ratnagiri Hub ➔ Mumbai Hub</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="text-slate-400">Payload</span>
            <p className="font-bold text-slate-900 mt-0.5">84 Boxes (Hapus Mangoes & Cashews)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
