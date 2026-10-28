import './globals.css';
import Link from 'next/link';
import { Inter, Fraunces } from 'next/font/google';
import AnnouncementTicker from '../components/AnnouncementTicker';
import LightboxAnnouncementModal from '../components/LightboxAnnouncementModal';
import ProfileDropdown from '../components/ProfileDropdown';
import { Search, MapPin, Truck, Heart, ShoppingBag, ChevronDown, ShieldCheck, Leaf, Package } from 'lucide-react';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

export const metadata = {
  title: 'Gogate Products - Authentic Devgad Mangoes, Cashews & Agro Produce',
  description: 'Farm-direct GI tagged Ratnagiri & Devgad Alphonso mangoes, jumbo cashews, and coastal agro harvests delivered fresh to your doorstep.',
};

const categoryNav = [
  { label: 'Alphonso Mangoes', href: '/#catalog' },
  { label: 'Cashews & Dry Fruits', href: '/#catalog' },
  { label: 'Kokum & Coolers', href: '/#catalog' },
  { label: 'Spices & Masalas', href: '/#catalog' },
  { label: 'Gift Boxes', href: '/#catalog' },
  { label: 'Our Orchards', href: '/#story' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream-100 text-forest-950 font-sans antialiased">
        {/* Dynamic Promotional Offers Ticker */}
        <AnnouncementTicker />

        {/* Lightbox Season Poster & Coupon Popup */}
        <LightboxAnnouncementModal />

        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-stone-200/70">
          <div className="page-container h-[72px] flex items-center justify-between gap-4 lg:gap-8">
            {/* Left: Logo & Location */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3 shrink-0 group" aria-label="Gogate Products home">
                <span className="w-10 h-10 rounded-full bg-forest-800 flex items-center justify-center text-mango-300 font-display font-semibold text-lg ring-4 ring-forest-50 transition group-hover:ring-mango-100">
                  G
                </span>
                <span className="leading-none">
                  <span className="font-display text-xl font-semibold tracking-tight text-forest-950 block">
                    Gogate
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-forest-600 font-semibold">
                    Est. 1946 · Ratnagiri
                  </span>
                </span>
              </Link>

              <button
                type="button"
                className="hidden md:flex items-center gap-2 text-left border-l border-stone-200 pl-6 group"
              >
                <MapPin className="w-4 h-4 text-forest-700 shrink-0" />
                <span>
                  <span className="flex items-center gap-1 text-[11px] text-stone-500 leading-none">
                    Deliver to
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-forest-950 text-xs mt-0.5">
                    Koregaon Park, Pune 411001
                    <ChevronDown className="w-3 h-3 text-stone-400 group-hover:text-forest-700 transition" />
                  </span>
                </span>
              </button>
            </div>

            {/* Center: Search */}
            <div className="flex-1 max-w-lg hidden sm:block">
              <label className="relative block">
                <span className="sr-only">Search products</span>
                <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  placeholder="Search Alphonso, cashews, kokum…"
                  className="w-full pl-11 pr-4 py-2.5 text-sm bg-cream-100 border border-transparent rounded-full outline-none transition placeholder:text-stone-400 hover:border-stone-200 focus:bg-white focus:border-forest-700 focus:ring-4 focus:ring-forest-700/10"
                />
              </label>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1 sm:gap-2 text-sm font-medium">
              <Link
                href="/track"
                className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-full text-forest-900 hover:bg-forest-50 transition"
              >
                <Truck className="w-4 h-4" />
                <span>Track</span>
              </Link>

              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full text-forest-900 hover:bg-forest-50 transition"
              >
                <Heart className="w-[18px] h-[18px]" />
              </Link>

              <ProfileDropdown />

              <Link
                href="/cart"
                className="relative flex items-center gap-2 pl-4 pr-5 py-2.5 rounded-full bg-forest-800 hover:bg-forest-900 text-white transition shadow-soft ml-1"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline font-semibold">Basket</span>
                <span className="min-w-[20px] h-5 px-1 rounded-full bg-mango-400 text-forest-950 text-[11px] flex items-center justify-center font-bold">
                  2
                </span>
              </Link>
            </div>
          </div>

          {/* Category Nav */}
          <nav className="hidden md:block border-t border-stone-100">
            <div className="page-container h-11 flex items-center gap-7 text-[13px] font-medium text-stone-600 overflow-x-auto">
              {categoryNav.map((c) => (
                <Link key={c.label} href={c.href} className="whitespace-nowrap hover:text-forest-900 transition relative py-3 after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-forest-800 after:scale-x-0 hover:after:scale-x-100 after:transition-transform">
                  {c.label}
                </Link>
              ))}
              <span className="ml-auto hidden lg:flex items-center gap-1.5 text-xs text-forest-700 whitespace-nowrap">
                <Truck className="w-3.5 h-3.5" />
                Direct farm delivery across India
              </span>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 page-container w-full py-8">
          {children}
        </main>

        {/* Trust strip */}
        <section className="border-t border-stone-200/70 bg-white">
          <div className="page-container py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Leaf, title: 'GI-Certified Origin', text: 'Authentic Ratnagiri Hapus' },
              { icon: Package, title: 'Damage-Safe Packaging', text: 'Honeycomb protective packing' },
              { icon: Truck, title: 'Express in 30 mins', text: 'Pune & Mumbai hubs' },
              { icon: ShieldCheck, title: 'Freshness Guarantee', text: 'Free replacement' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-3">
                <span className="w-10 h-10 rounded-full bg-forest-50 text-forest-700 flex items-center justify-center shrink-0">
                  <Icon className="w-[18px] h-[18px]" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-forest-950">{title}</p>
                  <p className="text-xs text-stone-500 mt-0.5">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-forest-950 text-forest-100/80">
          <div className="page-container pt-14 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              <div className="md:col-span-4 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-mango-400 flex items-center justify-center text-forest-950 font-display font-semibold text-lg">
                    G
                  </span>
                  <span className="font-display text-2xl font-semibold text-white tracking-tight">Gogate Products</span>
                </div>
                <p className="text-sm leading-relaxed text-forest-100/70 max-w-sm">
                  Three generations of growing GI-certified Alphonso mangoes, Konkan cashews and coastal produce in Pawas, Ratnagiri — naturally ripened and shipped farm-direct.
                </p>
                <div className="space-y-1 text-xs font-mono text-forest-200/60">
                  <p>FSSAI Lic No: 11521045000123</p>
                  <p>MSME Udyam: UDYAM-MH-27-0012345</p>
                </div>
              </div>

              <div className="md:col-span-2">
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-mango-300 mb-4">Shop</h4>
                <ul className="text-sm space-y-2.5">
                  <li><Link href="/#catalog" className="hover:text-white transition">Alphonso Mangoes</Link></li>
                  <li><Link href="/#catalog" className="hover:text-white transition">Cashews</Link></li>
                  <li><Link href="/#catalog" className="hover:text-white transition">Kokum Agal</Link></li>
                  <li><Link href="/wishlist" className="hover:text-white transition">Wishlist</Link></li>
                  <li><Link href="/track" className="hover:text-white transition">Track Order</Link></li>
                </ul>
              </div>

              <div className="md:col-span-3">
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-mango-300 mb-4">Help & Policies</h4>
                <ul className="text-sm space-y-2.5">
                  <li><Link href="/account?tab=contact" className="hover:text-white transition">Contact Us</Link></li>
                  <li><Link href="/shipping-policy" className="hover:text-white transition">Shipping & Delivery Policy</Link></li>
                  <li><Link href="/return-policy" className="hover:text-white transition">Return & Replacement</Link></li>
                  <li><Link href="/cancellation-policy" className="hover:text-white transition">Cancellation Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition">Terms and Conditions</Link></li>
                  <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                </ul>
              </div>

              <div className="md:col-span-3">
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-mango-300 mb-4">Partner Portals</h4>
                <ul className="text-sm space-y-2.5">
                  <li><a href={process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL || (process.env.VERCEL ? '/admin' : 'http://localhost:3001')} target="_blank" rel="noreferrer" className="hover:text-white transition">Superadmin Control Tower</a></li>
                  <li><a href={process.env.NEXT_PUBLIC_SELLER_PORTAL_URL || (process.env.VERCEL ? '/seller' : 'http://localhost:3002')} target="_blank" rel="noreferrer" className="hover:text-white transition">Seller / Store Portal</a></li>
                  <li><a href={process.env.NEXT_PUBLIC_HUB_PORTAL_URL || (process.env.VERCEL ? '/hub' : 'http://localhost:3003')} target="_blank" rel="noreferrer" className="hover:text-white transition">Courier & Logistics Hub</a></li>
                  <li><a href={process.env.NEXT_PUBLIC_NUXT_STOREFRONT_URL || (process.env.VERCEL ? '/regional' : 'http://localhost:3004')} target="_blank" rel="noreferrer" className="hover:text-white transition">Regional Storefront</a></li>
                </ul>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {['Razorpay', 'Paytm', 'Cashfree', 'Easebuzz', 'PayU'].map((g) => (
                    <span key={g} className="text-[10px] font-medium px-2 py-1 rounded-md bg-white/5 border border-white/10 text-forest-100/70">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-forest-100/50">
              <p>© 2026 Gogate Products Agro Farms Pvt Ltd. All rights reserved.</p>
              <p>Gogate Wadi, Pawas, Taluka Ratnagiri, Maharashtra 415616</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
