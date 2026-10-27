'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CreateOrderAdminPage() {
  const [selectedStore, setSelectedStore] = useState('store_1');
  const [customerName, setCustomerName] = useState('Ananya Sharma');
  const [customerPhone, setCustomerPhone] = useState('+919988776655');
  const [shippingAddress, setShippingAddress] = useState('Flat 402, Green Meadows, Koregaon Park, Pune 411001');
  const [selectedProduct, setSelectedProduct] = useState('Original Ratnagiri Alphonso Mango 1 Dozen');
  const [productPrice] = useState(1450);
  const [quantity, setQuantity] = useState(1);
  const [discountAmount, setDiscountAmount] = useState(100);
  const [storeCreditApplied, setStoreCreditApplied] = useState(200);
  const [giftCardCode, setGiftCardCode] = useState('GOGATE-ORGANIC-50');
  const [giftCardApplied, setGiftCardApplied] = useState(50);
  const [paymentGateway, setPaymentGateway] = useState('RAZORPAY');
  const [orderCreatedMsg, setOrderCreatedMsg] = useState<string | null>(null);

  const subtotal = productPrice * quantity;
  const grandTotal = Math.max(0, subtotal - discountAmount - storeCreditApplied - giftCardApplied);

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const order12Digit = `${new Date().getFullYear()}${Math.floor(10000000 + Math.random() * 90000000)}`;
    setOrderCreatedMsg(`Order successfully created with 12-digit numeric ID: #${order12Digit}! Assigned to store and routed to seller portal.`);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Manual Order Creation (Admin)</h2>
          <p className="text-sm text-slate-500 mt-1">
            Create custom orders, assign to specific stores, configure manual discounts, and apply customer store credits or gift cards.
          </p>
        </div>
        <Link href="/orders" className="text-xs font-semibold text-slate-600 hover:text-slate-900">
          ← Back to Orders
        </Link>
      </div>

      {orderCreatedMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold">
          ✅ {orderCreatedMsg}
        </div>
      )}

      <form onSubmit={handleCreateOrder} className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        {/* 1. Store Assignment */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            Assign Store / Orchard Vendor *
          </label>
          <select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="store_1">Gogate Organic Orchards (Ratnagiri Flagship) - Pawas</option>
            <option value="store_2">Devgad Cashew & Spice Guild - Sindhudurg</option>
            <option value="store_3">Konkan Honey & Amla Cooperative - Sawantwadi</option>
          </select>
        </div>

        {/* 2. Customer Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Customer Name *</label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Customer Phone (OTP) *</label>
            <input
              type="text"
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full text-sm font-mono border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Delivery Address *</label>
          <input
            type="text"
            required
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        {/* 3. Product Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Select Product *</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="Original Ratnagiri Alphonso Mango 1 Dozen">
                Original Ratnagiri Alphonso Mango 1 Dozen (₹1,450)
              </option>
              <option value="Konkan Jumbo Cashews W180 (500g)">
                Konkan Jumbo Cashews W180 (500g) (₹799)
              </option>
              <option value="Cold-Pressed Kokum Agal (750ml)">
                Cold-Pressed Kokum Agal (750ml) (₹260)
              </option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Quantity *</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>

        {/* 4. Discounts, Store Credit & Gift Cards */}
        <div className="border-t border-slate-100 pt-4">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
            Pricing Configuration & Wallet Credits
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                Admin Custom Discount (₹)
              </label>
              <input
                type="number"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(parseFloat(e.target.value) || 0)}
                className="w-full text-sm font-mono border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                Customer Store Credit (₹)
              </label>
              <input
                type="number"
                value={storeCreditApplied}
                onChange={(e) => setStoreCreditApplied(parseFloat(e.target.value) || 0)}
                className="w-full text-sm font-mono border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                Gift Card Code & Value (₹)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={giftCardCode}
                  onChange={(e) => setGiftCardCode(e.target.value)}
                  className="w-2/3 text-xs font-mono border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <input
                  type="number"
                  value={giftCardApplied}
                  onChange={(e) => setGiftCardApplied(parseFloat(e.target.value) || 0)}
                  className="w-1/3 text-xs font-mono border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 5. Payment Gateway Selection */}
        <div className="border-t border-slate-100 pt-4">
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            Payment Processing Channel *
          </label>
          <select
            value={paymentGateway}
            onChange={(e) => setPaymentGateway(e.target.value)}
            className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="RAZORPAY">Razorpay PG (Pre-authorized)</option>
            <option value="PAYTM_PG">Paytm Payment Gateway</option>
            <option value="CASHFREE">Cashfree Payments</option>
            <option value="EAZEBUZZ">Easebuzz</option>
            <option value="PAYU">PayU India</option>
            <option value="STORE_CREDIT">Full Store Credit Wallet</option>
            <option value="CASH_ON_DELIVERY">Cash on Delivery (COD)</option>
          </select>
        </div>

        {/* Summary & Submit */}
        <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm">
            <span className="text-slate-500">Subtotal: ₹{subtotal} • Discounts & Credits: -₹{discountAmount + storeCreditApplied + giftCardApplied}</span>
            <p className="text-lg font-bold text-slate-900">Final Order Amount: ₹{grandTotal.toFixed(2)}</p>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-emerald-600 text-white font-bold text-sm rounded-lg hover:bg-emerald-700 shadow-sm transition"
          >
            Create & Dispatch 12-Digit Order
          </button>
        </div>
      </form>
    </div>
  );
}
