'use client';

import { useState } from 'react';
import Link from 'next/link';
import OrderPipelineTracker, { CourierDetails } from '../../components/OrderPipelineTracker';

interface TrackedItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  isReturnable: boolean;
  isReplaceable: boolean;
  returnWindowDays: number;
  nonReturnReason?: string;
}

export default function OrderTrackingPage() {
  const [awbInput, setAwbInput] = useState('SR-8899221100');
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState('item_1');
  const [returnType, setReturnType] = useState<'RETURN' | 'REPLACEMENT'>('REPLACEMENT');
  const [returnReason, setReturnReason] = useState('Damaged during transit');
  const [returnSubmitted, setReturnSubmitted] = useState(false);
  const [mapLayer, setMapLayer] = useState<'ROADMAP' | 'SATELLITE' | 'TEMPERATURE'>('ROADMAP');
  const [showCancelNotice, setShowCancelNotice] = useState(false);

  // Order items with return/replacement eligibility flags
  const orderItems: TrackedItem[] = [
    {
      id: 'item_1',
      name: 'Original Ratnagiri Alphonso Mango (Grade A - 1 Dozen)',
      category: 'MANGOES',
      quantity: 1,
      unitPrice: 1450,
      isReturnable: true,
      isReplaceable: true,
      returnWindowDays: 2,
    },
    {
      id: 'item_2',
      name: 'Konkan Jumbo Roasted & Salted Cashews - W180 King Size (500g)',
      category: 'CASHEWS',
      quantity: 1,
      unitPrice: 799,
      isReturnable: true,
      isReplaceable: true,
      returnWindowDays: 7,
    },
    {
      id: 'item_3',
      name: 'Ready-to-Eat Fresh Alphonso Mango Slices Cup (250g)',
      category: 'MANGOES',
      quantity: 2,
      unitPrice: 180,
      isReturnable: false,
      isReplaceable: false,
      returnWindowDays: 0,
      nonReturnReason: 'Perishable fresh-cut produce cannot be returned or replaced per FSSAI food safety regulations once unsealed.',
    },
  ];

  const selectedItem = orderItems.find((i) => i.id === selectedItemId) || orderItems[0];

  const courierInfo: CourierDetails = {
    partner: 'SHIPROCKET',
    partnerName: 'Shiprocket Surface Cold Fleet',
    awbNumber: awbInput,
    trackingUrl: `https://shiprocket.co/tracking/${awbInput}`,
    courierStatus: 'In Transit - Hadapsar Destination Sorting Deck',
    lastSyncedAt: 'Just now',
  };

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem.isReturnable && !selectedItem.isReplaceable) {
      alert('This item is not eligible for return or replacement.');
      return;
    }
    setReturnSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          Live Order Pipeline & Cold-Chain Tracking
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Track consignment milestones, integrated courier updates, and IoT refrigerated vehicle telemetry in real-time.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs">
        <div className="flex gap-2">
          <input
            type="text"
            value={awbInput}
            onChange={(e) => setAwbInput(e.target.value)}
            placeholder="Enter 12-Digit Order ID or AWB Tracking Number..."
            className="flex-1 text-sm font-mono border border-stone-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
          />
          <button className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition">
            Track Consignment
          </button>
        </div>
      </div>

      {/* 1. ANIMATED ORDER PIPELINE TRACKER */}
      <OrderPipelineTracker
        mode="STANDARD"
        currentStatus="SHIPPED"
        courier={courierInfo}
      />

      {/* 2. ORDER DETAILS & ELIGIBILITY AUDIT CARD */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-black text-stone-900">Order #202610278491</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                DISPATCHED
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Store: <strong>Gogate Organic Orchards (Ratnagiri Flagship)</strong> • Ordered on 27 Oct 2026, 09:15 AM
            </p>
          </div>

          {/* Cancellation Policy Button */}
          <div>
            <button
              onClick={() => setShowCancelNotice(true)}
              className="px-3.5 py-2 text-xs font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-xl transition flex items-center gap-1.5"
            >
              <span>🔒</span>
              <span>Cancellation Policy</span>
            </button>
          </div>
        </div>

        {/* Items in Consignment with Eligibility Badges */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-stone-400">
            Items in Consignment & Return/Replacement Eligibility
          </h3>

          <div className="space-y-2.5">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-50/50"
              >
                <div>
                  <h4 className="text-xs font-bold text-stone-900">{item.name}</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Qty: {item.quantity} • ₹{item.unitPrice} each
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.isReplaceable ? (
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-lg text-[10px] font-black flex items-center gap-1">
                      <span>✓</span>
                      <span>Eligible for Return / Replacement ({item.returnWindowDays} Days)</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-stone-200 text-stone-700 rounded-lg text-[10px] font-black flex items-center gap-1">
                      <span>🚫</span>
                      <span>Non-Returnable (Perishable)</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GOOGLE MAPS INTEGRATION CONTAINER */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-stone-900 flex items-center gap-1.5">
              <span>🗺️</span> Google Maps Fleet Telemetry (NH-66 Transit)
            </span>
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg">
              <button
                onClick={() => setMapLayer('ROADMAP')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  mapLayer === 'ROADMAP' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500'
                }`}
              >
                Roadmap
              </button>
              <button
                onClick={() => setMapLayer('SATELLITE')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  mapLayer === 'SATELLITE' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500'
                }`}
              >
                Satellite
              </button>
              <button
                onClick={() => setMapLayer('TEMPERATURE')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  mapLayer === 'TEMPERATURE' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-stone-500'
                }`}
              >
                ❄️ Cold Sensor
              </button>
            </div>
          </div>

          {/* Interactive Visual Map Card */}
          <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-stone-200 bg-slate-900 shadow-inner flex flex-col justify-between p-4">
            <div
              className={`absolute inset-0 opacity-40 ${
                mapLayer === 'SATELLITE'
                  ? 'bg-[radial-gradient(#15803d_1px,transparent_1px)] [background-size:16px_16px] bg-slate-950'
                  : 'bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] bg-slate-900'
              }`}
            />

            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d="M 50 240 Q 180 180, 320 150 T 600 70"
                fill="none"
                stroke="#10b981"
                strokeWidth="4"
                strokeDasharray="6,6"
                className="animate-pulse"
              />
            </svg>

            {/* Farm Origin Pin */}
            <div className="relative z-10 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-white text-xs shadow-md font-bold">
                🥭
              </div>
              <div className="bg-stone-900/90 text-white px-3 py-1 rounded-xl text-xs font-semibold backdrop-blur-xs border border-white/20">
                Pawas Orchards, Ratnagiri
              </div>
            </div>

            {/* Moving Reefer Linehaul Truck Pin */}
            <div className="absolute top-[48%] left-[52%] z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="bg-amber-400 text-stone-950 px-2.5 py-1 rounded-full text-[10px] font-extrabold shadow-lg flex items-center gap-1 border border-amber-300">
                <span>🚚 MH-08-AG-9988</span>
                <span className="text-emerald-950 font-bold bg-white/60 px-1 rounded">17.2°C</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-emerald-500 border-4 border-white shadow-xl flex items-center justify-center text-white text-sm animate-bounce mt-1">
                📍
              </div>
            </div>

            {/* Customer Drop Destination Pin */}
            <div className="relative z-10 flex items-center gap-2 self-end">
              <div className="bg-stone-900/90 text-white px-3 py-1 rounded-xl text-xs font-semibold backdrop-blur-xs border border-white/20">
                Pune 411001 (Destination)
              </div>
              <div className="w-8 h-8 rounded-full bg-rose-600 border-2 border-white flex items-center justify-center text-white text-xs shadow-md font-bold">
                📍
              </div>
            </div>

            <div className="relative z-10 flex justify-between items-end text-[10px] font-mono text-stone-300">
              <div className="bg-stone-900/80 px-2 py-1 rounded">
                Google Maps GPS Stream • Lat: 17.5312° N, Long: 73.5281° E
              </div>
              <div className="bg-stone-900/80 px-2 py-1 rounded">
                Telemetry Provider: Google Maps Platform
              </div>
            </div>
          </div>
        </div>

        {/* Live Delivery Executive & OTP Banner */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              Assigned Last-Mile Executive
            </span>
            <p className="font-bold text-stone-900 text-sm mt-0.5">Ramesh Sawant (+919811223344)</p>
            <p className="text-stone-500">Vehicle: Electric Cargo Scooter MH-12-EV-1122</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-amber-100 border border-amber-300 rounded-xl text-amber-900 font-mono font-bold text-xs">
              Delivery OTP: 8492
            </div>
          </div>
        </div>

        {/* Return & Replacement Trigger Action */}
        <div className="border-t border-stone-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500">
            Received bruised fruits or an incorrect item? Organic produce quality guarantee covers instant replacements for eligible items.
          </p>
          <button
            onClick={() => setShowReturnModal(true)}
            className="px-4 py-2.5 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition shrink-0"
          >
            🔄 Request Return or Replacement
          </button>
        </div>
      </div>

      {/* Cancellation Restriction Notice Modal */}
      {showCancelNotice && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center gap-2.5 text-amber-600">
              <span className="text-2xl">🔒</span>
              <h3 className="font-black text-stone-900 text-base">Admin-Controlled Cancellation</h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              To protect the cold-chain integrity and prevent produce spoilage once farm linehaul logistics have been booked, <strong>customer self-cancellation is disabled</strong>.
            </p>
            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1">
              <p><strong>Cancellation Policy:</strong> Orders can only be cancelled by Superadmin prior to dispatch.</p>
              <p><strong>Refunds:</strong> 100% immediate reversal to source payment method upon admin approval.</p>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
              <button
                onClick={() => setShowCancelNotice(false)}
                className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-800"
              >
                Close
              </button>
              <a
                href="mailto:support@gogateproducts.com?subject=Cancellation%20Request%20Order%20202610278491"
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-800 rounded-xl hover:bg-emerald-900"
              >
                Contact Admin Support
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Return & Replacement Modal with Eligibility Enforcement */}
      {showReturnModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200">
            {returnSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <span className="text-4xl block">✅</span>
                <h3 className="font-bold text-stone-900 text-lg">
                  {returnType === 'REPLACEMENT' ? 'Replacement Dispatched' : 'Return Request Initiated'}
                </h3>
                <p className="text-xs text-stone-600">
                  Your reverse consignment ticket has been created for <strong>{selectedItem.name}</strong>. A reverse pickup agent will arrive at your address with AWB <strong>REV_GGT_882910</strong>.
                </p>
                <button
                  onClick={() => {
                    setShowReturnModal(false);
                    setReturnSubmitted(false);
                  }}
                  className="px-5 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold mt-4"
                >
                  Back to Tracking
                </button>
              </div>
            ) : (
              <form onSubmit={handleReturnSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-stone-900">Return & Replacement Request</h3>
                  <p className="text-xs text-stone-500">Order #202610278491 • Only eligible items can be selected</p>
                </div>

                {/* Item Selector */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Select Item to Return / Replace</label>
                  <select
                    value={selectedItemId}
                    onChange={(e) => setSelectedItemId(e.target.value)}
                    className="w-full text-xs border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                  >
                    {orderItems.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} {item.isReplaceable ? '(Eligible)' : '(NON-RETURNABLE)'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Eligibility Warning if item is non-returnable */}
                {!selectedItem.isReturnable && !selectedItem.isReplaceable ? (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 space-y-1">
                    <p className="font-bold flex items-center gap-1">
                      <span>🚫</span> Item Ineligible for Return or Replacement
                    </p>
                    <p className="text-[11px] text-rose-700">
                      {selectedItem.nonReturnReason || 'This perishable produce cannot be returned per FSSAI regulations once dispatched.'}
                    </p>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Request Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setReturnType('REPLACEMENT')}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition ${
                            returnType === 'REPLACEMENT'
                              ? 'border-emerald-700 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-700'
                              : 'border-stone-200 text-stone-700'
                          }`}
                        >
                          🥭 Replacement (Send Fresh Box)
                        </button>
                        <button
                          type="button"
                          onClick={() => setReturnType('RETURN')}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition ${
                            returnType === 'RETURN'
                              ? 'border-emerald-700 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-700'
                              : 'border-stone-200 text-stone-700'
                          }`}
                        >
                          💸 Refund to Source Bank
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Reason for Return</label>
                      <select
                        value={returnReason}
                        onChange={(e) => setReturnReason(e.target.value)}
                        className="w-full text-xs border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                      >
                        <option value="Damaged during transit">Damaged / bruised fruit during transit</option>
                        <option value="Ripeness issue">Over-ripe or spoiled</option>
                        <option value="Incorrect item">Received incorrect weight or product</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Upload Photo Evidence</label>
                      <div className="border-2 border-dashed border-stone-300 rounded-xl p-4 text-center text-xs text-stone-500 bg-stone-50">
                        📷 Click to attach photo of harvest batch & box
                      </div>
                    </div>
                  </>
                )}

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setShowReturnModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!selectedItem.isReturnable && !selectedItem.isReplaceable}
                    className="px-5 py-2 text-xs font-bold text-white bg-emerald-800 rounded-xl hover:bg-emerald-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
