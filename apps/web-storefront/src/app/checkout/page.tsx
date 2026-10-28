'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const [selectedGateway, setSelectedGateway] = useState<
    'RAZORPAY' | 'PAYTM_PG' | 'CASHFREE' | 'EAZEBUZZ' | 'PAYU' | 'CASH_ON_DELIVERY' | 'STORE_CREDIT'
  >('RAZORPAY');

  const [address, setAddress] = useState({
    fullName: 'Ananya Sharma',
    phone: '+919988776655',
    addressLine: 'Flat 402, Green Meadows, Koregaon Park',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411001',
  });

  const [useStoreCredit, setUseStoreCredit] = useState(true);
  const storeCreditAvailable = 450;
  const [giftCardCode, setGiftCardCode] = useState('');
  const [giftCardDiscount, setGiftCardDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = 2249.0;
  const gst = 112.45;
  const storeCreditUsed = useStoreCredit ? Math.min(storeCreditAvailable, subtotal + gst) : 0;
  const payableTotal = Math.max(0, subtotal + gst - storeCreditUsed - giftCardDiscount);

  const handleApplyGiftCard = () => {
    if (giftCardCode.toUpperCase().includes('GOGATE') || giftCardCode.length >= 6) {
      setGiftCardDiscount(200);
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      router.push('/track?orderId=202610278491&placed=true');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">Checkout & Payment</h1>
        <p className="text-xs text-stone-500 mt-1">
          Complete your order using Payment Gateways, Store Credit balance, or Gift Cards
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Shipping Address & Gateway Selector */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address & Google Maps Pin */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider">
                1. Delivery Address (Maharashtra)
              </h3>
              <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                🗺️ Google Maps Verified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full text-xs border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">Mobile Phone (OTP)</label>
                <input
                  type="text"
                  required
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="w-full text-xs font-mono border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">Address Line</label>
              <input
                type="text"
                required
                value={address.addressLine}
                onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
                className="w-full text-xs border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">City</label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full text-xs border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">State</label>
                <input
                  type="text"
                  required
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="w-full text-xs border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">Pincode</label>
                <input
                  type="text"
                  required
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  className="w-full text-xs font-mono border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Store Credit & Gift Card Voucher Section */}
          <div className="bg-emerald-50/60 rounded-2xl border border-emerald-200 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-emerald-950 text-xs uppercase tracking-wider">
                  Store Credit Wallet & Gift Cards
                </h4>
                <p className="text-[11px] text-emerald-800">
                  You have <strong>₹{storeCreditAvailable}.00</strong> available in your store credit balance.
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useStoreCredit}
                  onChange={(e) => setUseStoreCredit(e.target.checked)}
                  className="w-4 h-4 text-emerald-800 rounded focus:ring-emerald-700"
                />
                <span className="text-xs font-bold text-emerald-900">Apply ₹{storeCreditUsed} Credit</span>
              </label>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Gift Card / Voucher Code (e.g. GOGATE200)..."
                value={giftCardCode}
                onChange={(e) => setGiftCardCode(e.target.value)}
                className="flex-1 text-xs font-mono border border-emerald-300 bg-white rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none uppercase"
              />
              <button
                type="button"
                onClick={handleApplyGiftCard}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-lg transition"
              >
                Apply Voucher
              </button>
            </div>
            {giftCardDiscount > 0 && (
              <p className="text-xs font-bold text-emerald-900">✓ Gift card applied: -₹{giftCardDiscount}.00 discount!</p>
            )}
          </div>

          {/* Payment Gateway Selector */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider">
              2. Select Payment Gateway
            </h3>

            <div className="space-y-2.5">
              {[
                { id: 'RAZORPAY', name: 'Razorpay', subtitle: 'UPI (GPay/PhonePe), Credit/Debit Card, Netbanking', badge: 'Recommended' },
                { id: 'PAYTM_PG', name: 'Paytm Payment Gateway', subtitle: 'Paytm Wallet, Postpaid & UPI Payments' },
                { id: 'CASHFREE', name: 'Cashfree Payments', subtitle: 'Instant 1-Click UPI & Cards checkout' },
                { id: 'EAZEBUZZ', name: 'Easebuzz', subtitle: 'Seamless merchant payment gateway' },
                { id: 'PAYU', name: 'PayU India', subtitle: 'Global cards and banking channels' },
                { id: 'CASH_ON_DELIVERY', name: 'Cash on Delivery (COD)', subtitle: 'Pay cash upon doorstep verification' },
              ].map((gw) => (
                <label
                  key={gw.id}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition ${
                    selectedGateway === gw.id
                      ? 'border-emerald-700 bg-emerald-50/70 ring-1 ring-emerald-700'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="gateway"
                      value={gw.id}
                      checked={selectedGateway === gw.id}
                      onChange={() => setSelectedGateway(gw.id as any)}
                      className="text-emerald-700 focus:ring-emerald-600"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-stone-900">{gw.name}</span>
                        {gw.badge && (
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                            {gw.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">{gw.subtitle}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Payment Summary */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4 h-fit">
          <h3 className="font-bold text-stone-900 text-base">Order Summary</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Items Total (2 items)</span>
              <span className="font-semibold text-stone-900">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Express Farm Shipping</span>
              <span className="font-semibold text-emerald-800">FREE</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>GST (5%)</span>
              <span className="font-semibold text-stone-900">₹{gst.toFixed(2)}</span>
            </div>

            {storeCreditUsed > 0 && (
              <div className="flex justify-between text-emerald-800 font-bold">
                <span>Store Credit Applied</span>
                <span>-₹{storeCreditUsed.toFixed(2)}</span>
              </div>
            )}

            {giftCardDiscount > 0 && (
              <div className="flex justify-between text-emerald-800 font-bold">
                <span>Gift Card Voucher</span>
                <span>-₹{giftCardDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="border-t border-stone-200 pt-3 flex justify-between text-sm font-bold text-stone-900">
              <span>Final Payable</span>
              <span className="text-emerald-800 text-xl font-black">₹{payableTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isProcessing ? (
              <span>Processing Order...</span>
            ) : (
              <span>Pay ₹{payableTotal.toFixed(2)} via {selectedGateway} →</span>
            )}
          </button>

          <p className="text-[10px] text-stone-400 text-center">
            Encrypted payment token generated via @gogate/payment-engine
          </p>
        </div>
      </form>
    </div>
  );
}
