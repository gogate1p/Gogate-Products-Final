'use client';

import { useState } from 'react';

interface InwardScan {
  awb: string;
  orderNumber: string;
  sender: string;
  destination: string;
  weightGrams: number;
  perishable: boolean;
  timeScanned: string;
  dockZone: string;
}

const recentScans: InwardScan[] = [
  { awb: 'GGT-EXP-992014', orderNumber: 'GGT-ORD-100294', sender: 'Gogate Orchards (Pawas)', destination: 'Pune 411001', weightGrams: 3700, perishable: true, timeScanned: '10:45 AM', dockZone: 'Zone A - Cold Room' },
  { awb: 'GGT-EXP-992018', orderNumber: 'GGT-ORD-100299', sender: 'Gogate Orchards (Pawas)', destination: 'Mumbai 400050', weightGrams: 500, perishable: false, timeScanned: '10:48 AM', dockZone: 'Zone B - Dry Storage' },
  { awb: 'GGT-EXP-992022', orderNumber: 'GGT-ORD-100302', sender: 'Devgad Cashew Guild', destination: 'Thane 400601', weightGrams: 1000, perishable: false, timeScanned: '10:52 AM', dockZone: 'Zone B - Dry Storage' },
];

export default function InwardScanPage() {
  const [scans, setScans] = useState<InwardScan[]>(recentScans);
  const [awbInput, setAwbInput] = useState('');
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!awbInput.trim()) return;

    const isPerish = awbInput.toUpperCase().includes('EXP') || Math.random() > 0.5;
    const newScan: InwardScan = {
      awb: awbInput.trim().toUpperCase(),
      orderNumber: `GGT-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      sender: 'Gogate Orchards (Ratnagiri Farm Dock)',
      destination: 'Pune / Mumbai Metropolitan',
      weightGrams: Math.floor(1000 + Math.random() * 3000),
      perishable: isPerish,
      timeScanned: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      dockZone: isPerish ? 'Zone A - Cold Room (16°C)' : 'Zone B - Ambient Dry Bay',
    };

    setScans([newScan, ...scans]);
    setLastMessage(`✅ Successfully Inward Scanned: ${newScan.awb} ➔ Routed to ${newScan.dockZone}`);
    setAwbInput('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Inward Package Barcode Scanning</h2>
        <p className="text-sm text-slate-500 mt-1">
          Scan AWBs upon arrival at the hub. Automated sorting checks if the parcel contains perishable Alphonso mangoes and directs to Cold Room docks.
        </p>
      </div>

      {/* Barcode Scanner Input */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-3 text-slate-400">🔍</span>
            <input
              type="text"
              autoFocus
              value={awbInput}
              onChange={(e) => setAwbInput(e.target.value)}
              placeholder="Scan or Enter AWB Barcode (e.g. GGT-EXP-992033)..."
              className="w-full pl-9 pr-4 py-2.5 text-sm font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm shadow-sm transition"
          >
            Inward Scan (Dock In)
          </button>
        </form>

        {lastMessage && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-semibold text-emerald-800">
            {lastMessage}
          </div>
        )}
      </div>

      {/* Scanned Items Log */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-sm">Today's Inward Scans ({scans.length})</h3>
          <span className="text-xs text-slate-500">Live Dock Feed</span>
        </div>
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
            <tr>
              <th className="py-3 px-5">AWB Number</th>
              <th className="py-3 px-5">Sender Farm</th>
              <th className="py-3 px-5">Destination</th>
              <th className="py-3 px-5">Weight & Nature</th>
              <th className="py-3 px-5">Assigned Dock Zone</th>
              <th className="py-3 px-5 text-right">Time Scanned</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {scans.map((sc, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 transition">
                <td className="py-4 px-5">
                  <p className="font-bold font-mono text-slate-900">{sc.awb}</p>
                  <p className="text-[11px] text-slate-400 font-mono">{sc.orderNumber}</p>
                </td>
                <td className="py-4 px-5 text-xs text-slate-800 font-medium">{sc.sender}</td>
                <td className="py-4 px-5 text-xs text-slate-800">{sc.destination}</td>
                <td className="py-4 px-5">
                  <p className="text-xs font-bold text-slate-900">{sc.weightGrams}g</p>
                  {sc.perishable ? (
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                      🥭 Perishable Cold Chain
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700">
                      Dry Goods
                    </span>
                  )}
                </td>
                <td className="py-4 px-5">
                  <span className="inline-flex px-2.5 py-1 rounded text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                    {sc.dockZone}
                  </span>
                </td>
                <td className="py-4 px-5 text-right font-mono text-xs text-slate-500">
                  {sc.timeScanned}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
