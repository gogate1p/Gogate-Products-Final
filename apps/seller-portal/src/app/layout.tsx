import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Gogate Products - Seller & Store Portal',
  description: 'Manage store KYC, organic products catalog, inventory, courier dispatch, and return shipments',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-stone-50 min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 bg-emerald-950 text-emerald-100 flex flex-col border-r border-emerald-900">
          <div className="p-6 border-b border-emerald-900">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center text-emerald-950 font-bold text-lg shadow-sm">
                🌱
              </span>
              <div>
                <h1 className="font-bold text-white text-base tracking-tight">Seller Studio</h1>
                <p className="text-xs text-emerald-400 font-medium">Gogate Orchards</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1.5 text-sm font-medium">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900/60 transition"
            >
              📊 Store Overview
            </Link>
            <Link
              href="/products"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900/60 transition"
            >
              🥭 Products & Organic Catalog
            </Link>
            <Link
              href="/inventory"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900/60 transition"
            >
              📦 Inventory & Stock
            </Link>
            <Link
              href="/orders"
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900/60 transition"
            >
              <span className="flex items-center gap-3">🏷️ Orders & Courier Dispatch</span>
              <span className="px-2 py-0.5 text-xs bg-amber-500 text-stone-900 font-bold rounded-full">3</span>
            </Link>
            <Link
              href="/returns"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900/60 transition"
            >
              🔄 Returns & Replacements
            </Link>
            <Link
              href="/kyc"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900/60 transition"
            >
              📜 Store KYC & Compliance
            </Link>
            <Link
              href="/payouts"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900/60 transition"
            >
              💳 Payments & Payouts
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-900/60 transition"
            >
              🔑 Email OTP Login
            </Link>
          </nav>

          <div className="p-4 border-t border-emerald-900 text-xs text-emerald-300">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-white">Ratnagiri Flagship Store</span>
            </div>
            <p className="text-[11px] text-emerald-400/80">FSSAI: 11521045000123</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <header className="h-16 bg-white border-b border-stone-200 px-8 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-stone-500">
              <span className="font-semibold text-stone-800">Gogate Organic Orchards (Ratnagiri)</span>
              <span>/</span>
              <span>Seller Dashboard</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-xs font-semibold text-emerald-800 bg-emerald-100 rounded-full border border-emerald-200">
                ✓ KYC Verified Store
              </span>
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition"
              >
                Storefront Preview ↗
              </a>
            </div>
          </header>
          <div className="p-8 flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
