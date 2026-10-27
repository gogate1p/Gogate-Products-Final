'use client';

import { useState } from 'react';

interface ReturnShipment {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  productName: string;
  type: 'RETURN' | 'REPLACEMENT';
  reason: string;
  photos: string[];
  status: 'REQUESTED' | 'APPROVED' | 'REJECTED' | 'PICKUP_SCHEDULED' | 'REFUND_PROCESSED';
  reverseAwb?: string;
  courierPartner?: string;
}

const initialReturns: ReturnShipment[] = [
  {
    id: 'ret_1',
    orderNumber: 'GGT-ORD-100280',
    customerName: 'Rohit Deshmukh',
    customerPhone: '+919877001122',
    productName: 'Original Ratnagiri Alphonso Mango - 1 Dozen',
    type: 'REPLACEMENT',
    reason: 'Two mangoes bruised during transit rough handling',
    photos: ['https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=400'],
    status: 'REQUESTED',
  },
  {
    id: 'ret_2',
    orderNumber: 'GGT-ORD-100275',
    customerName: 'Meera Sen',
    customerPhone: '+919866112233',
    productName: 'Pure Cold-Pressed Kokum Agal (750ml)',
    type: 'RETURN',
    reason: 'Ordered by mistake instead of Kokum syrup',
    photos: ['https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=400'],
    status: 'APPROVED',
    reverseAwb: 'REV_GGT_882910',
    courierPartner: 'IN_HOUSE',
  },
];

export default function ReturnsManagementPage() {
  const [returns, setReturns] = useState<ReturnShipment[]>(initialReturns);

  const handleDecision = (id: string, action: 'APPROVE' | 'REJECT') => {
    setReturns((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          if (action === 'APPROVE') {
            return {
              ...r,
              status: 'APPROVED',
              reverseAwb: `REV_${r.type === 'REPLACEMENT' ? 'REP' : 'RET'}_${Date.now().toString().slice(-6)}`,
              courierPartner: 'IN_HOUSE',
            };
          } else {
            return { ...r, status: 'REJECTED' };
          }
        }
        return r;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900 tracking-tight">Returns & Replacement Shipments</h2>
        <p className="text-sm text-stone-500 mt-1">
          Review customer returns for perishable agro produce, verify photographic evidence, schedule reverse pickup couriers, or dispatch replacements.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <table className="w-full text-left text-sm text-stone-600">
          <thead className="bg-stone-50 text-xs uppercase font-semibold text-stone-500 border-b border-stone-200">
            <tr>
              <th className="py-3 px-5">Order # & Customer</th>
              <th className="py-3 px-5">Product & Request Type</th>
              <th className="py-3 px-5">Customer Reason & Evidence</th>
              <th className="py-3 px-5">Reverse Courier / AWB</th>
              <th className="py-3 px-5">Status</th>
              <th className="py-3 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {returns.map((ret) => (
              <tr key={ret.id} className="hover:bg-stone-50/80 transition">
                <td className="py-4 px-5">
                  <p className="font-bold text-stone-900 font-mono">{ret.orderNumber}</p>
                  <p className="text-xs text-stone-700">{ret.customerName}</p>
                  <p className="text-xs text-stone-400 font-mono">{ret.customerPhone}</p>
                </td>
                <td className="py-4 px-5">
                  <p className="font-medium text-stone-900 text-xs">{ret.productName}</p>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mt-1 ${
                      ret.type === 'REPLACEMENT' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {ret.type}
                  </span>
                </td>
                <td className="py-4 px-5 max-w-xs">
                  <p className="text-xs text-stone-700">{ret.reason}</p>
                  <span className="text-[11px] text-emerald-700 underline cursor-pointer mt-1 block">
                    📷 View Customer Evidence Photo ({ret.photos.length})
                  </span>
                </td>
                <td className="py-4 px-5">
                  {ret.reverseAwb ? (
                    <div>
                      <span className="font-mono text-xs font-bold bg-stone-100 text-stone-800 px-2 py-0.5 rounded border border-stone-200">
                        {ret.reverseAwb}
                      </span>
                      <p className="text-[10px] text-stone-400 mt-0.5">{ret.courierPartner}</p>
                    </div>
                  ) : (
                    <span className="text-xs text-stone-400">Not Scheduled</span>
                  )}
                </td>
                <td className="py-4 px-5">
                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      ret.status === 'APPROVED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : ret.status === 'REQUESTED'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {ret.status}
                  </span>
                </td>
                <td className="py-4 px-5 text-right space-x-2">
                  {ret.status === 'REQUESTED' && (
                    <>
                      <button
                        onClick={() => handleDecision(ret.id, 'REJECT')}
                        className="px-2.5 py-1 text-xs font-semibold text-rose-700 bg-rose-50 rounded border border-rose-200 hover:bg-rose-100"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleDecision(ret.id, 'APPROVE')}
                        className="px-3 py-1 text-xs font-semibold text-white bg-emerald-700 rounded hover:bg-emerald-800"
                      >
                        Approve & Book Reverse Pickup
                      </button>
                    </>
                  )}
                  {ret.status === 'APPROVED' && (
                    <span className="text-xs text-emerald-700 font-semibold">Reverse Pickup Booked</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
