'use client';

import { useState } from 'react';

interface Runsheet {
  runsheetNumber: string;
  executiveName: string;
  executivePhone: string;
  vehicle: string;
  hub: string;
  assignedShipments: number;
  deliveredCount: number;
  codCollected: number;
  status: 'DISPATCHED' | 'COMPLETED';
}

const initialRunsheets: Runsheet[] = [
  {
    runsheetNumber: 'RUN-PUN-01-20261027',
    executiveName: 'Ramesh Sawant',
    executivePhone: '+919811223344',
    vehicle: 'Electric Cargo Scooter (MH-12-EV-1122)',
    hub: 'Pune Hadapsar Express Branch (HUB-PUN-01)',
    assignedShipments: 16,
    deliveredCount: 11,
    codCollected: 4520,
    status: 'DISPATCHED',
  },
  {
    runsheetNumber: 'RUN-BOM-04-20261027',
    executiveName: 'Kiran Shinde',
    executivePhone: '+919822114455',
    vehicle: 'Three Wheeler Cargo (MH-03-TC-8899)',
    hub: 'Mumbai Bhiwandi Hub (HUB-BOM-01)',
    assignedShipments: 22,
    deliveredCount: 22,
    codCollected: 8900,
    status: 'COMPLETED',
  },
];

export default function DeliveryRunsheetsPage() {
  const [runsheets] = useState<Runsheet[]>(initialRunsheets);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Last-Mile Delivery Executive Runsheets</h2>
        <p className="text-sm text-slate-500 mt-1">
          Generate daily delivery runsheets, monitor live OTP proof-of-delivery status, and reconcile cash-on-delivery (COD) collections.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
            <tr>
              <th className="py-3 px-5">Runsheet #</th>
              <th className="py-3 px-5">Delivery Executive</th>
              <th className="py-3 px-5">Branch Hub & Vehicle</th>
              <th className="py-3 px-5">Drop Completion</th>
              <th className="py-3 px-5">COD Cash Reconciled</th>
              <th className="py-3 px-5 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {runsheets.map((rs) => (
              <tr key={rs.runsheetNumber} className="hover:bg-slate-50/80 transition">
                <td className="py-4 px-5">
                  <p className="font-bold text-slate-900 font-mono">{rs.runsheetNumber}</p>
                </td>
                <td className="py-4 px-5">
                  <p className="font-bold text-slate-900">{rs.executiveName}</p>
                  <p className="text-xs text-slate-400 font-mono">{rs.executivePhone}</p>
                </td>
                <td className="py-4 px-5">
                  <p className="text-xs text-slate-800">{rs.hub}</p>
                  <p className="text-[11px] text-slate-400">{rs.vehicle}</p>
                </td>
                <td className="py-4 px-5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">
                      {rs.deliveredCount} / {rs.assignedShipments}
                    </span>
                    <div className="w-20 bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full"
                        style={{ width: `${(rs.deliveredCount / rs.assignedShipments) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-5">
                  <p className="font-bold text-slate-900">₹{rs.codCollected.toLocaleString('en-IN')}</p>
                </td>
                <td className="py-4 px-5 text-right">
                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      rs.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {rs.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
