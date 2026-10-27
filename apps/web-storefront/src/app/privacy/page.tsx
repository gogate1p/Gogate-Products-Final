import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-stone-200 shadow-xs">
      <div>
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Privacy & Trust</span>
        <h1 className="text-3xl font-black text-stone-900 mt-1">Privacy Policy</h1>
        <p className="text-xs text-stone-500 mt-1">Last Updated: October 2026</p>
      </div>

      <div className="text-xs sm:text-sm leading-relaxed space-y-4 text-stone-700">
        <h3 className="font-bold text-base text-stone-900">1. Data We Collect</h3>
        <p>
          We collect your name, shipping address, telephone number for delivery OTP verification, and purchase records. We never sell your personal contact numbers to third-party telemarketers.
        </p>

        <h3 className="font-bold text-base text-stone-900">2. Real-Time Courier Telemetry & GPS</h3>
        <p>
          During live order delivery, customer address coordinates are used securely by our Delivery Executives and Google Maps API to optimize route navigation and accurate ETA alerts.
        </p>

        <h3 className="font-bold text-base text-stone-900">3. Right to Erasure (Delete Account)</h3>
        <p>
          Customers have full sovereignty over their digital identity. You may permanently delete your account and erase all associated addresses and personal data directly from your <Link href="/account" className="text-emerald-800 font-bold underline">Account Settings</Link> page.
        </p>
      </div>

      <div className="border-t border-stone-100 pt-6 flex justify-between items-center text-xs">
        <Link href="/" className="text-emerald-800 font-bold hover:underline">
          ← Back to Storefront
        </Link>
        <Link href="/account" className="text-stone-600 font-semibold hover:underline">
          Manage Account / Delete Account →
        </Link>
      </div>
    </div>
  );
}
