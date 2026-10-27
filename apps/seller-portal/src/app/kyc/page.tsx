'use client';

import { useState } from 'react';

export default function SellerKycPage() {
  const [formData, setFormData] = useState({
    fssaiNumber: '11521045000123',
    udyamNumber: 'UDYAM-MH-27-0012345',
    gstin: '27AAACG1234A1Z5',
    panNumber: 'AAACG1234A',
    bankAccount: '91802003884712',
    bankIfsc: 'HDFC0001234',
    bankHolder: 'Gogate Agro Farms Pvt Ltd',
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900 tracking-tight">Store KYC & Legal Compliance</h2>
        <p className="text-sm text-stone-500 mt-1">
          Provide your 14-digit FSSAI food safety certificate, MSME Udyam registration, and bank mandate for weekly payouts.
        </p>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
            ✓
          </span>
          <div>
            <p className="font-bold text-emerald-900 text-sm">KYC Status: Approved by Superadmin</p>
            <p className="text-xs text-emerald-700">All orchard GI documents and bank account verification cleared.</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-emerald-700 text-white text-xs font-semibold rounded-full">
          Store Active
        </span>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                FSSAI License Number (14 Digits) *
              </label>
              <input
                type="text"
                required
                value={formData.fssaiNumber}
                onChange={(e) => setFormData({ ...formData, fssaiNumber: e.target.value })}
                className="w-full text-sm font-mono border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Udyam Registration Number *
              </label>
              <input
                type="text"
                required
                value={formData.udyamNumber}
                onChange={(e) => setFormData({ ...formData, udyamNumber: e.target.value })}
                className="w-full text-sm font-mono border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">PAN Card Number *</label>
              <input
                type="text"
                required
                value={formData.panNumber}
                onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
                className="w-full text-sm font-mono border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">GSTIN (Optional for small farmers)</label>
              <input
                type="text"
                value={formData.gstin}
                onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                className="w-full text-sm font-mono border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="border-t border-stone-100 pt-4">
            <h3 className="text-sm font-bold text-stone-900 mb-3">Settlement Bank Details (Payouts)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Account Holder Name</label>
                <input
                  type="text"
                  required
                  value={formData.bankHolder}
                  onChange={(e) => setFormData({ ...formData, bankHolder: e.target.value })}
                  className="w-full text-sm border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Account Number</label>
                <input
                  type="text"
                  required
                  value={formData.bankAccount}
                  onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                  className="w-full text-sm font-mono border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">IFSC Code</label>
                <input
                  type="text"
                  required
                  value={formData.bankIfsc}
                  onChange={(e) => setFormData({ ...formData, bankIfsc: e.target.value })}
                  className="w-full text-sm font-mono border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-100">
            {saved ? (
              <span className="text-xs font-semibold text-emerald-700">✓ Compliance details saved successfully.</span>
            ) : (
              <span className="text-xs text-stone-400">Updates will be re-audited by Superadmin.</span>
            )}
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 transition shadow-sm"
            >
              Update KYC Info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
