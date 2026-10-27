import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Gogate Products - Superadmin & Staff Command Center',
  description: 'Enterprise multi-tenant management, KYC, developer keys, logistics & master orders',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 bg-stone-900 text-stone-200 flex flex-col border-r border-stone-800">
          <div className="p-6 border-b border-stone-800">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                🥭
              </span>
              <div>
                <h1 className="font-bold text-white text-base tracking-tight">Gogate Portal</h1>
                <p className="text-xs text-emerald-400 font-medium">Superadmin & Staff</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1.5 text-sm font-medium">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
            >
              📊 Overview & Analytics
            </Link>
            <Link
              href="/stores"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
            >
              🏪 Stores & Multi-Storefronts
            </Link>
            <Link
              href="/kyc"
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
            >
              <span className="flex items-center gap-3">📜 Store KYC Verifications</span>
              <span className="px-2 py-0.5 text-xs bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">1</span>
            </Link>
            <Link
              href="/developer-keys"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
            >
              🔑 Developer Keys Vault
            </Link>
            <Link
              href="/orders"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
            >
              📦 Master Orders & Fleet
            </Link>
            <Link
              href="/orders/create"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
            >
              ➕ Manual Order & Store Credit
            </Link>
            <Link
              href="/cms"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
            >
              📝 CMS & Policy Pages
            </Link>
            <Link
              href="/maintenance"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
            >
              🛠️ Schedule Maintenance
            </Link>
            <Link
              href="/staff"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
            >
              👥 Staff & RBAC Access
            </Link>
          </nav>

          <div className="p-4 border-t border-stone-800 text-xs text-stone-400">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Superadmin: Shriram Gogate</span>
            </div>
            <p className="text-[11px] text-stone-500">Node: v26.1.0 • Turborepo</p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="font-semibold text-slate-800">Gogate Products Agro Ecosystem</span>
              <span>/</span>
              <span>Central Command</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition"
              >
                🌐 View Customer Storefront ↗
              </a>
              <a
                href="http://localhost:3002"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition"
              >
                💼 View Seller Portal ↗
              </a>
              <a
                href="http://localhost:3003"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
              >
                🚚 View Logistics Hub ↗
              </a>
            </div>
          </header>
          <div className="p-8 flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
