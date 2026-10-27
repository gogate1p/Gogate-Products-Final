import Link from 'next/link';

export default function ReturnPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-stone-200 shadow-xs">
      <div>
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Quality Assurance</span>
        <h1 className="text-3xl font-black text-stone-900 mt-1">Return & Replacement Policy</h1>
        <p className="text-xs text-stone-500 mt-1">100% Organic Fresh Harvest Guarantee</p>
      </div>

      <div className="text-xs sm:text-sm leading-relaxed space-y-4 text-stone-700">
        <h3 className="font-bold text-base text-stone-900">1. Reporting Transit Damages</h3>
        <p>
          Fresh fruits are perishable. If any box of Alphonso Mangoes is delivered with visible transit bruising or crushed cartons, please initiate a request within 24 hours of delivery via our Live Tracking page.
        </p>

        <h3 className="font-bold text-base text-stone-900">2. Free Reverse Pickup</h3>
        <p>
          Once approved by our catalog auditors, a reverse AWB is generated and our courier partner will collect the parcel. You may choose between an instant Fresh Box Replacement or a complete bank refund.
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
