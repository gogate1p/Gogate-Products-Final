import Link from 'next/link';

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-stone-200 shadow-xs">
      <div>
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Logistics & Cold Chain</span>
        <h1 className="text-3xl font-black text-stone-900 mt-1">Shipping & Cold-Chain Policy</h1>
        <p className="text-xs text-stone-500 mt-1">Specialized Organic Agro Transit SLAs</p>
      </div>

      <div className="text-xs sm:text-sm leading-relaxed space-y-4 text-stone-700">
        <h3 className="font-bold text-base text-stone-900">1. Cold-Chain Linehaul Guarantee</h3>
        <p>
          Ratnagiri Alphonso Mangoes are sensitive to coastal heat and cargo humidity. We operate dedicated 14ft refrigerated transit containers maintaining 15°C to 19°C from our Ratnagiri sorting hub to Mumbai and Pune depots.
        </p>

        <h3 className="font-bold text-base text-stone-900">2. Serviceability & Courier Providers</h3>
        <p>
          Orders are dispatched through our Gogate Express In-House Fleet or integrated partners (Shiprocket, NimbusPost, Tookan, Shipday, Pidge). You receive live AWB tracking links with Google Maps milestones.
        </p>

        <h3 className="font-bold text-base text-stone-900">3. Store Pickup (Click & Collect)</h3>
        <p>
          For local residents or travelers in the Konkan belt, Free Store Pickup is available at our flagship farm counter (Pawas, Ratnagiri) upon presentation of the 12-digit order confirmation.
        </p>
      </div>

      <div className="border-t border-stone-100 pt-6">
        <Link href="/" className="text-emerald-800 font-bold hover:underline text-xs">
          ← Back to Storefront
        </Link>
      </div>
    </div>
  );
}
