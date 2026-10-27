'use client';

import { useState } from 'react';

interface KycApplication {
  id: string;
  storeName: string;
  applicantName: string;
  phone: string;
  fssaiNumber: string;
  udyamNumber: string;
  gstin: string;
  panNumber: string;
  bankAccount: string;
  bankIfsc: string;
  bankHolder: string;
  status: 'SUBMITTED' | 'APPROVED' | 'REJECTED';
  submittedAt: string;
  adminNotes: string;
}

const initialApplications: KycApplication[] = [
  {
    id: 'kyc_devgad_01',
    storeName: 'Devgad Cashew & Spice Guild',
    applicantName: 'Kishore Sawant (President)',
    phone: '+919833445566',
    fssaiNumber: '11522046000789',
    udyamNumber: 'UDYAM-MH-28-0056789',
    gstin: '27BBBCG5678B1Z9',
    panNumber: 'BBBCG5678B',
    bankAccount: '50100492817264',
    bankIfsc: 'ICIC0005678',
    bankHolder: 'Devgad Agro Cooperative',
    status: 'SUBMITTED',
    submittedAt: 'Today at 10:15 AM',
    adminNotes: 'Awaiting Superadmin physical certificate verification.',
  },
  {
    id: 'kyc_gogate_01',
    storeName: 'Gogate Organic Orchards (Ratnagiri Flagship)',
    applicantName: 'Shriram Gogate',
    phone: '+919822334455',
    fssaiNumber: '11521045000123',
    udyamNumber: 'UDYAM-MH-27-0012345',
    gstin: '27AAACG1234A1Z5',
    panNumber: 'AAACG1234A',
    bankAccount: '91802003884712',
    bankIfsc: 'HDFC0001234',
    bankHolder: 'Gogate Agro Farms Pvt Ltd',
    status: 'APPROVED',
    submittedAt: 'Yesterday at 4:30 PM',
    adminNotes: 'Direct orchard verification completed. All GI certifications validated.',
  },
];

export default function KycVerificationPage() {
  const [applications, setApplications] = useState<KycApplication[]>(initialApplications);
  const [selectedApp, setSelectedApp] = useState<KycApplication | null>(applications[0]);
  const [decisionNotes, setDecisionNotes] = useState('');

  const handleDecision = (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status: newStatus,
              adminNotes: decisionNotes || (newStatus === 'APPROVED' ? 'Approved by Superadmin' : 'Rejected due to incomplete documents'),
            }
          : app
      )
    );
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({
        ...selectedApp,
        status: newStatus,
        adminNotes: decisionNotes || (newStatus === 'APPROVED' ? 'Approved by Superadmin' : 'Rejected'),
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Store KYC & Compliance Verification</h2>
        <p className="text-sm text-slate-500 mt-1">
          Review legal credentials (14-digit FSSAI, Udyam MSME, GSTIN, and Bank Mandate) before granting store onboarding.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: List of Applications */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-slate-50 border-b border-slate-200 font-semibold text-xs text-slate-700 uppercase tracking-wider">
            Applications Queue ({applications.length})
          </div>
          <div className="divide-y divide-slate-100">
            {applications.map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  setSelectedApp(app);
                  setDecisionNotes(app.adminNotes);
                }}
                className={`w-full text-left p-4 transition flex flex-col gap-1.5 ${
                  selectedApp?.id === app.id ? 'bg-emerald-50/60 border-l-4 border-emerald-600' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">{app.storeName}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      app.status === 'APPROVED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : app.status === 'SUBMITTED'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500">Applicant: {app.applicantName}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                  <span>FSSAI: {app.fssaiNumber}</span>
                  <span>{app.submittedAt}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed Document Verification & Action */}
        {selectedApp && (
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedApp.storeName}</h3>
                  <p className="text-xs text-slate-500">
                    Contact: {selectedApp.applicantName} • {selectedApp.phone}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    selectedApp.status === 'APPROVED'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : selectedApp.status === 'SUBMITTED'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-rose-100 text-rose-800 border border-rose-200'
                  }`}
                >
                  {selectedApp.status}
                </span>
              </div>

              {/* Regulatory Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[11px] uppercase font-semibold text-slate-500">Food Safety Standard</span>
                  <p className="text-sm font-bold text-slate-900 mt-1 font-mono">
                    FSSAI No: {selectedApp.fssaiNumber}
                  </p>
                  <p className="text-xs text-emerald-600 mt-1">✓ 14-Digit Format Verified</p>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[11px] uppercase font-semibold text-slate-500">MSME Enterprise</span>
                  <p className="text-sm font-bold text-slate-900 mt-1 font-mono">
                    Udyam: {selectedApp.udyamNumber}
                  </p>
                  <p className="text-xs text-emerald-600 mt-1">✓ Valid Maharashtra Agri Registration</p>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[11px] uppercase font-semibold text-slate-500">Tax Identification</span>
                  <p className="text-sm font-bold text-slate-900 mt-1 font-mono">
                    PAN: {selectedApp.panNumber}
                  </p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">GSTIN: {selectedApp.gstin}</p>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[11px] uppercase font-semibold text-slate-500">Settlement Bank Account</span>
                  <p className="text-sm font-bold text-slate-900 mt-1 font-mono">
                    A/C: {selectedApp.bankAccount}
                  </p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    IFSC: {selectedApp.bankIfsc} ({selectedApp.bankHolder})
                  </p>
                </div>
              </div>

              {/* Verification Decision Area */}
              <div className="border-t border-slate-100 pt-5 space-y-3">
                <label className="block text-xs font-semibold text-slate-700">
                  Superadmin Audit & Verification Remarks
                </label>
                <textarea
                  rows={3}
                  value={decisionNotes}
                  onChange={(e) => setDecisionNotes(e.target.value)}
                  placeholder="Enter verification notes or reasons for approval/rejection..."
                  className="w-full text-sm border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                />

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => handleDecision(selectedApp.id, 'REJECTED')}
                    className="px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition"
                  >
                    Reject Application
                  </button>
                  <button
                    onClick={() => handleDecision(selectedApp.id, 'APPROVED')}
                    className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-sm transition"
                  >
                    Approve & Activate Store
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
