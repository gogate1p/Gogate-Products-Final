'use client';

import { useState } from 'react';
import { calculateEdd } from '@gogate/logistics-engine';

export default function RateCardPage() {
  const [originPincode, setOriginPincode] = useState('415616');
  const [destPincode, setDestPincode] = useState('411001');
  const [isPerishable, setIsPerishable] = useState(true);
  const [result, setResult] = useState(() => calculateEdd('415616', '411001', true));

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(calculateEdd(originPincode, destPincode, isPerishable));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Courier Rate Card & EDD Simulator</h2>
        <p className="text-sm text-slate-500 mt-1">
          Compute real-time shipping costs and Estimated Delivery Dates (EDD) comparing our in-house network against integrated 3PL aggregators.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <form onSubmit={handleCalculate} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Origin Pincode (Farm/Hub)</label>
            <input
              type="text"
              value={originPincode}
              onChange={(e) => setOriginPincode(e.target.value)}
              className="w-full text-sm font-mono border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Destination Pincode</label>
            <input
              type="text"
              value={destPincode}
              onChange={(e) => setDestPincode(e.target.value)}
              className="w-full text-sm font-mono border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>
          <div className="flex items-center gap-2 pb-2">
            <input
              type="checkbox"
              id="perishCheck"
              checked={isPerishable}
              onChange={(e) => setIsPerishable(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
            />
            <label htmlFor="perishCheck" className="text-xs font-semibold text-slate-700">
              Perishable Cold Chain (Mangoes)
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition shadow-sm"
            >
              Calculate EDD & Rates
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Serviceability to {result.pincode}</h3>
            <p className="text-xs text-slate-500">
              Expected Delivery SLA: {result.estimatedDaysMin}-{result.estimatedDaysMax} Days (Est: {result.formattedDeliveryDate})
            </p>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
            ✓ 100% Serviceable
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {result.courierOptions.map((opt, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900 text-sm">{opt.name}</p>
                <p className="text-xs text-slate-500">
                  Transit SLA: {opt.estimatedDeliveryDays} days • {opt.supportsCod ? 'COD Supported' : 'Prepaid Only'}
                </p>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-900 text-base">₹{opt.rate}</span>
                <span className="block text-[10px] text-emerald-700 font-semibold">Standard 1kg</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
