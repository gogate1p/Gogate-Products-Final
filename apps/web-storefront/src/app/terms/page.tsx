import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-stone-200 shadow-xs">
      <div>
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Legal Document</span>
        <h1 className="text-3xl font-black text-stone-900 mt-1">Terms and Conditions</h1>
        <p className="text-xs text-stone-500 mt-1">Effective Date: October 2026 • Gogate Products Agro Farms Pvt Ltd</p>
      </div>

      <div className="prose prose-stone text-xs sm:text-sm leading-relaxed space-y-4 text-stone-700">
        <h3 className="font-bold text-base text-stone-900">1. Nature of Organic Agricultural Produce</h3>
        <p>
          Gogate Products sources directly from GI-certified family orchards in Pawas (Ratnagiri) and Devgad. Produce like Alphonso Mangoes are 100% natural, chemical-free, and tree-ripened without calcium carbide. As natural commodities, fruit sizes, exterior markings, and sweetness levels may exhibit natural agricultural variations.
        </p>

        <h3 className="font-bold text-base text-stone-900">2. Pre-Order Bookings & Harvest Dates</h3>
        <p>
          Mango pre-orders are confirmed based on projected orchard blossom cycles and flowering stages. Estimated delivery dates (EDD) are provided in good faith. In case of unexpected coastal monsoon showers, dispatches may adjust by 2-4 days to ensure maximum fruit quality.
        </p>

        <h3 className="font-bold text-base text-stone-900">3. Multi-Vendor Platform Compliance</h3>
        <p>
          Participating stores and regional cooperatives (e.g. Devgad Cashew Guild) must maintain active FSSAI and MSME Udyam certifications. Superadmin reserves the right to disable stores that fail to meet organic food standards.
        </p>

        <h3 className="font-bold text-base text-stone-900">4. Payment Methods & Tokenization</h3>
        <p>
          All electronic transactions are processed via certified partners: Razorpay, Paytm PG, Cashfree, Easebuzz, and PayU. We do not store customer CVV or banking credentials.
        </p>
      </div>

      <div className="border-t border-stone-100 pt-6 flex justify-between items-center text-xs">
        <Link href="/" className="text-emerald-800 font-bold hover:underline">
          ← Back to Storefront
        </Link>
        <span className="font-mono text-stone-400">FSSAI: 11521045000123</span>
      </div>
    </div>
  );
}
