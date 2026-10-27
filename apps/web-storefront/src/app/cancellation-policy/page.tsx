import Link from 'next/link';

export default function CancellationPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-stone-200 shadow-xs">
      <div>
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Cancellations & Refunds</span>
        <h1 className="text-3xl font-black text-stone-900 mt-1">Cancellation Policy</h1>
        <p className="text-xs text-stone-500 mt-1">Simple & Transparent Order Cancellation Guidelines</p>
      </div>

      <div className="text-xs sm:text-sm leading-relaxed space-y-4 text-stone-700">
        <h3 className="font-bold text-base text-stone-900">1. Instant Cancellation Before Pack</h3>
        <p>
          You can cancel any regular order with 1-click as long as the status is 'PLACED' or 'ACCEPTED'. Once an order is 'PACKED' or handed over to our courier partners, cancellation is locked to avoid fruit deterioration.
        </p>

        <h3 className="font-bold text-base text-stone-900">2. Refund Methods</h3>
        <p>
          Refunds are routed to your original payment channel (Razorpay, Paytm, Cashfree, Easebuzz, PayU) or credited instantly to your store credit wallet for future fruit purchases.
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
