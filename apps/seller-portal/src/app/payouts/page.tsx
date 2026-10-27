'use client';

import { useState } from 'react';

interface Transaction {
  id: string;
  orderNumber: string;
  gateway: string;
  grossAmount: number;
  platformFee: number;
  netPayout: number;
  payoutStatus: 'SETTLED' | 'PENDING';
  date: string;
}

const initialTransactions: Transaction[] = [
  { id: 'tx_1', orderNumber: 'GGT-ORD-100294', gateway: 'RAZORPAY', grossAmount: 2261.45, platformFee: 45.22, netPayout: 2216.23, payoutStatus: 'SETTLED', date: 'Oct 27, 2026' },
  { id: 'tx_2', orderNumber: 'GGT-ORD-100295', gateway: 'CASHFREE', grossAmount: 2900.0, platformFee: 58.0, netPayout: 2842.0, payoutStatus: 'PENDING', date: 'Oct 27, 2026' },
  { id: 'tx_3', orderNumber: 'GGT-ORD-100289', gateway: 'PAYTM_PG', grossAmount: 1800.0, platformFee: 36.0, netPayout: 1764.0, payoutStatus: 'SETTLED', date: 'Oct 25, 2026' },
  { id: 'tx_4', orderNumber: 'GGT-ORD-100282', gateway: 'EAZEBUZZ', grossAmount: 950.0, platformFee: 19.0, netPayout: 931.0, payoutStatus: 'SETTLED', date: 'Oct 24, 2026' },
  { id: 'tx_5', orderNumber: 'GGT-ORD-100278', gateway: 'PAYU', grossAmount: 3200.0, platformFee: 64.0, netPayout: 3136.0, payoutStatus: 'SETTLED', date: 'Oct 22, 2026' },
];

export default function PayoutsPage() {
  const [transactions] = useState<Transaction[]>(initialTransactions);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900 tracking-tight">Payments & Settlement Ledger</h2>
        <p className="text-sm text-stone-500 mt-1">
          Review customer payment transactions processed across Razorpay, Paytm, Cashfree, Easebuzz, and PayU with transparent platform commission deductions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Total Settled (Life-to-date)</span>
          <p className="text-2xl font-bold text-stone-900 mt-2">₹1,84,320.00</p>
          <p className="text-xs text-emerald-700 mt-1">Credited to HDFC Bank A/C ...4712</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Upcoming Payout Cycle</span>
          <p className="text-2xl font-bold text-stone-900 mt-2">₹12,450.00</p>
          <p className="text-xs text-amber-700 mt-1">Settlement scheduled on Friday</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Platform Commission Rate</span>
          <p className="text-2xl font-bold text-stone-900 mt-2">2.0%</p>
          <p className="text-xs text-stone-500 mt-1">Standard Direct Farmer Rate</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <table className="w-full text-left text-sm text-stone-600">
          <thead className="bg-stone-50 text-xs uppercase font-semibold text-stone-500 border-b border-stone-200">
            <tr>
              <th className="py-3 px-5">Order # & Date</th>
              <th className="py-3 px-5">Payment Gateway</th>
              <th className="py-3 px-5">Gross Amount</th>
              <th className="py-3 px-5">Platform Fee (2%)</th>
              <th className="py-3 px-5">Net Seller Payout</th>
              <th className="py-3 px-5 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-stone-50/80 transition">
                <td className="py-4 px-5">
                  <p className="font-bold text-stone-900 font-mono">{tx.orderNumber}</p>
                  <p className="text-xs text-stone-400">{tx.date}</p>
                </td>
                <td className="py-4 px-5">
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                    {tx.gateway}
                  </span>
                </td>
                <td className="py-4 px-5">
                  <span className="font-bold text-stone-900">₹{tx.grossAmount.toFixed(2)}</span>
                </td>
                <td className="py-4 px-5">
                  <span className="text-xs text-rose-600 font-medium">-₹{tx.platformFee.toFixed(2)}</span>
                </td>
                <td className="py-4 px-5">
                  <span className="font-bold text-emerald-800 text-base">₹{tx.netPayout.toFixed(2)}</span>
                </td>
                <td className="py-4 px-5 text-right">
                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      tx.payoutStatus === 'SETTLED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {tx.payoutStatus}
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
