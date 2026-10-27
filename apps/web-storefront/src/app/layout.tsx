import './globals.css';
import Link from 'next/link';
import AnnouncementTicker from '../components/AnnouncementTicker';
import LightboxAnnouncementModal from '../components/LightboxAnnouncementModal';

export const metadata = {
  title: 'Gogate Products - Organic Mangoes, Cashews & Farm Produce',
  description: 'Farm-direct GI tagged Ratnagiri Alphonso mangoes, jumbo cashews, and wild kokum with 15-min quick delivery and cold-chain shipping.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#f8f9fa] text-stone-900">
        {/* Dynamic Promotional Offers Ticker */}
        <AnnouncementTicker />

        {/* Lightbox Season Poster & Coupon Popup */}
        <LightboxAnnouncementModal />

        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 sm:gap-8">
            {/* Left: Logo & Location Bar */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2.5 shrink-0">
                <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-emerald-600 flex items-center justify-center text-white font-black text-2xl shadow-sm">
                  🥭
                </span>
                <div>
                  <span className="text-xl font-black tracking-tight text-stone-900 block leading-tight">
                    Gogate
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-emerald-700 font-extrabold">
                    Organic
                  </span>
                </div>
              </Link>

              {/* Swiggy-style Location Selector */}
              <div className="hidden md:flex items-center gap-2 text-xs border-l border-stone-200 pl-6 cursor-pointer hover:opacity-80 transition">
                <span className="text-base text-rose-600">📍</span>
                <div>
                  <div className="flex items-center gap-1 font-extrabold text-stone-900 text-xs">
                    <span>Koregaon Park</span>
                    <span className="text-[10px] text-stone-400">▾</span>
                  </div>
                  <p className="text-[11px] text-stone-500 line-clamp-1">
                    Pune, Maharashtra 411001
                  </p>
                </div>
              </div>
            </div>

            {/* Center: Search Bar */}
            <div className="flex-1 max-w-md hidden sm:block">
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-stone-400 text-sm">🔍</span>
                <input
                  type="text"
                  placeholder="Search for Alphonso Mangoes, Jumbo Cashews, Kokum..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-stone-100 hover:bg-stone-50 focus:bg-white border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-700 outline-none transition"
                />
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 sm:gap-5 text-xs font-bold">
              <Link
                href="/track"
                className="hidden lg:flex items-center gap-1.5 text-stone-700 hover:text-emerald-800 transition"
              >
                <span>🚚</span>
                <span>Track Order</span>
              </Link>

              <Link
                href="/wishlist"
                className="hidden sm:flex items-center gap-1 text-stone-700 hover:text-emerald-800 transition"
              >
                <span>❤️</span>
                <span>Wishlist</span>
              </Link>

              {/* Login link */}
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-stone-700 hover:bg-stone-100 transition"
              >
                <span>👤</span>
                <span>Sign In</span>
              </Link>

              {/* Cart Button */}
              <Link
                href="/cart"
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white transition shadow-sm"
              >
                <span>🛒</span>
                <span className="hidden sm:inline">Cart</span>
                <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 text-[11px] flex items-center justify-center font-black">
                  2
                </span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🥭</span>
                  <span className="font-bold text-white text-lg">Gogate Products</span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Authentic GI-Certified Ratnagiri Alphonso Mangoes, Jumbo Cashews, and wild coastal agro produce.
                  Quick 15-min delivery on fresh items & refrigerated cold-chain across India.
                </p>
                <div className="mt-4 space-y-1 text-xs text-emerald-400 font-mono">
                  <p>FSSAI Lic No: 11521045000123</p>
                  <p>MSME Udyam: UDYAM-MH-27-0012345</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-3">Customer Policies & Help</h4>
                <ul className="text-xs space-y-2 text-stone-400">
                  <li><Link href="/terms" className="hover:text-white transition">Terms and Conditions</Link></li>
                  <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                  <li><Link href="/shipping-policy" className="hover:text-white transition">Cold-Chain Shipping Policy</Link></li>
                  <li><Link href="/return-policy" className="hover:text-white transition">Return & Replacement Policy</Link></li>
                  <li><Link href="/cancellation-policy" className="hover:text-white transition">Cancellation Policy</Link></li>
                  <li><Link href="/account" className="hover:text-white transition">Customer Profile & Delete Account</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-3">Portals & Ecosystem</h4>
                <ul className="text-xs space-y-2 text-stone-400">
                  <li><a href="http://localhost:3001" target="_blank" rel="noreferrer" className="hover:text-white">Superadmin Control Tower ↗</a></li>
                  <li><a href="http://localhost:3002" target="_blank" rel="noreferrer" className="hover:text-white">Seller / Store Portal ↗</a></li>
                  <li><a href="http://localhost:3003" target="_blank" rel="noreferrer" className="hover:text-white">Courier & Logistics Hub Portal ↗</a></li>
                  <li><a href="http://localhost:3004" target="_blank" rel="noreferrer" className="hover:text-white">Nuxt 3 Regional Storefront ↗</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-3">Delivery & Payments</h4>
                <div className="space-y-2 text-xs text-stone-400">
                  <p>⚡ <strong>Quick Delivery:</strong> 15-30 Mins (Local Hubs)</p>
                  <p>🚚 <strong>Standard Linehaul:</strong> 1-2 Days (Cold Container)</p>
                  <p className="mt-2 text-stone-300">Accepted Gateways:</p>
                  <div className="flex flex-wrap gap-1 font-mono text-[10px] text-stone-300">
                    <span className="bg-stone-800 px-2 py-0.5 rounded">Razorpay</span>
                    <span className="bg-stone-800 px-2 py-0.5 rounded">Paytm</span>
                    <span className="bg-stone-800 px-2 py-0.5 rounded">Cashfree</span>
                    <span className="bg-stone-800 px-2 py-0.5 rounded">Easebuzz</span>
                    <span className="bg-stone-800 px-2 py-0.5 rounded">PayU</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-stone-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500">
              <p>© 2026 Gogate Products Agro Farms Pvt Ltd. All rights reserved.</p>
              <p>Gogate Wadi, Pawas, Taluka Ratnagiri, Maharashtra 415616</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
