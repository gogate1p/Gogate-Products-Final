'use client';

import { useState } from 'react';

interface OutwardBag {
  bagNumber: string;
  destinationHub: string;
  totalParcels: number;
  weightKg: number;
  assignedTrip: string;
  status: 'OPEN' | 'SEALED' | 'LOADED_ON_TRUCK';
}

const initialBags: OutwardBag[] = [
  { bagNumber: 'BAG-RTN-MUM-01', destinationHub: 'HUB-BOM-01 (Mumbai Bhiwandi)', totalParcels: 32, weightKg: 84.5, assignedTrip: 'TRIP-RTN-BOM-20261027', status: 'LOADED_ON_TRUCK' },
  { bagNumber: 'BAG-RTN-PUN-01', destinationHub: 'HUB-PUN-01 (Pune Hadapsar)', totalParcels: 24, weightKg: 62.0, assignedTrip: 'TRIP-RTN-PUN-20261027', status: 'SEALED' },
  { bagNumber: 'BAG-RTN-MUM-02', destinationHub: 'HUB-BOM-01 (Mumbai Bhiwandi)', totalParcels: 15, weightKg: 38.0, assignedTrip: 'Unassigned', status: 'OPEN' },
];

export default function OutwardSortPage() {
  const [bags, setBags] = useState<OutwardBag[]>(initialBags);

  const sealBag = (bagNum: string) => {
    setBags((prev) =>
      prev.map((b) => (b.bagNumber === bagNum ? { ...b, status: 'SEALED' } : b))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Outward Sorting & Bag Management</h2>
        <p className="text-sm text-slate-500 mt-1">
          Consolidate inward parcels into destination bags, generate tamper-proof seal barcodes, and hand over to Linehaul Truck drivers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {bags.map((bag) => (
          <div key={bag.bagNumber} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                  {bag.bagNumber}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    bag.status === 'LOADED_ON_TRUCK'
                      ? 'bg-blue-100 text-blue-800'
                      : bag.status === 'SEALED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {bag.status.replace(/_/g, ' ')}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-xs">
                <div>
                  <span className="text-slate-400">Destination Sorting Hub:</span>
                  <p className="font-bold text-slate-900 mt-0.5">{bag.destinationHub}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Parcels Inside:</span>
                  <span className="font-bold text-slate-900">{bag.totalParcels} items</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Total Scale Weight:</span>
                  <span className="font-bold text-slate-900">{bag.weightKg} kg</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Assigned Linehaul Trip:</span>
                  <span className="font-mono text-slate-700">{bag.assignedTrip}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              {bag.status === 'OPEN' && (
                <button
                  onClick={() => sealBag(bag.bagNumber)}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs transition"
                >
                  🔒 Seal Bag & Print Barcode
                </button>
              )}
              {bag.status === 'SEALED' && (
                <span className="text-xs font-semibold text-emerald-700">✓ Sealed. Ready for Loading</span>
              )}
              {bag.status === 'LOADED_ON_TRUCK' && (
                <span className="text-xs font-semibold text-blue-700">🚛 In-Transit with Truck Driver</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
