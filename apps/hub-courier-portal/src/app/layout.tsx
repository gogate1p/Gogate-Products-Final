import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Gogate Express Logistics - Hub & Courier Portal',
  description: 'Inward/Outward barcode scanning, middle-mile linehaul trips, runsheet dispatches, and AWB consignments',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100 min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800">
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                🚚
              </span>
              <div>
                <h1 className="font-bold text-white text-base tracking-tight">Gogate Express</h1>
                <p className="text-xs text-blue-400 font-medium">Hub & Courier Portal</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1.5 text-sm font-medium">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              📊 Hub Command Tower
            </Link>
            <Link
              href="/inward"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              📥 Inward Barcode Scan
            </Link>
            <Link
              href="/outward"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              📤 Outward Sorting & Baggage
            </Link>
            <Link
              href="/linehaul"
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              <span className="flex items-center gap-3">🚛 Linehaul Truck Trips</span>
              <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">Active</span>
            </Link>
            <Link
              href="/runsheets"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              🛵 Delivery Runsheets (Last-Mile)
            </Link>
            <Link
              href="/rate-card"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              💳 Courier Rate Card & Matrix
            </Link>
          </nav>

          <div className="p-4 border-t border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="font-semibold text-white">HUB-BOM-01 (Bhiwandi Central)</span>
            </div>
            <p className="text-[11px] text-slate-500">Live Temperature: 18°C (Cold Chain Zone)</p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="font-semibold text-slate-800">Gogate Express Logistics Network</span>
              <span>/</span>
              <span>Central Sorting & Linehaul Operations</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-xs font-semibold text-emerald-800 bg-emerald-100 rounded-full">
                ● 14ft Refrigerated Linehaul In-Transit
              </span>
            </div>
          </header>
          <div className="p-8 flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
