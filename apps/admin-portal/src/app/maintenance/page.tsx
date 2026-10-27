'use client';

import { useState } from 'react';

interface PortalMaintenanceConfig {
  id: string;
  name: string;
  tag: string;
  isMaintenanceActive: boolean;
  isScheduled: boolean;
  scheduledDate: string;
  scheduledStartTime: string;
  durationMinutes: number;
  noticeTitle: string;
  noticeMessage: string;
}

const initialConfigs: PortalMaintenanceConfig[] = [
  {
    id: 'web-storefront',
    name: 'Customer Web Storefront',
    tag: 'Port 3000',
    isMaintenanceActive: false,
    isScheduled: true,
    scheduledDate: '2026-10-28',
    scheduledStartTime: '02:00',
    durationMinutes: 120,
    noticeTitle: 'Scheduled Orchard System Upgrade',
    noticeMessage: 'We are updating our live cold-chain tracking servers for the 2026 Alphonso Mango harvest season. Store will be back online at 04:00 AM.',
  },
  {
    id: 'seller-portal',
    name: 'Seller / Store Studio',
    tag: 'Port 3002',
    isMaintenanceActive: false,
    isScheduled: false,
    scheduledDate: '2026-10-29',
    scheduledStartTime: '03:00',
    durationMinutes: 60,
    noticeTitle: 'Merchant Banking & Payout Ledger Maintenance',
    noticeMessage: 'Upgrading payment settlement gateways. Order processing will resume shortly.',
  },
  {
    id: 'hub-courier-portal',
    name: 'Hub & Courier Portal',
    tag: 'Port 3003',
    isMaintenanceActive: false,
    isScheduled: false,
    scheduledDate: '2026-10-30',
    scheduledStartTime: '01:00',
    durationMinutes: 45,
    noticeTitle: 'Dock Scanner Firmware Sync',
    noticeMessage: 'Inward and Outward barcode scanners undergoing routine database index optimization.',
  },
];

export default function MaintenanceSchedulerPage() {
  const [configs, setConfigs] = useState<PortalMaintenanceConfig[]>(initialConfigs);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const toggleInstantMaintenance = (id: string) => {
    setConfigs((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextState = !c.isMaintenanceActive;
          setToastMsg(
            nextState
              ? `⚠️ Instant Maintenance Mode ACTIVATED for ${c.name}. Visitors will see maintenance screen.`
              : `✅ Maintenance Mode DEACTIVATED for ${c.name}. Site is now live.`
          );
          setTimeout(() => setToastMsg(null), 3500);
          return { ...c, isMaintenanceActive: nextState };
        }
        return c;
      })
    );
  };

  const handleUpdate = (id: string, updates: Partial<PortalMaintenanceConfig>) => {
    setConfigs((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const saveConfig = (name: string) => {
    setToastMsg(`Saved maintenance schedule and notice message for ${name}.`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl text-xs font-semibold animate-fade-in border border-slate-700">
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Portal Maintenance & Downtime Scheduler</h2>
        <p className="text-sm text-slate-500 mt-1">
          Schedule planned maintenance windows or trigger instant emergency maintenance modes across the Storefront, Seller Portal, and Logistics Hubs.
        </p>
      </div>

      {/* Portals Maintenance Cards */}
      <div className="space-y-6">
        {configs.map((portal) => (
          <div
            key={portal.id}
            className={`bg-white rounded-2xl border transition shadow-xs p-6 space-y-5 ${
              portal.isMaintenanceActive
                ? 'border-rose-400 bg-rose-50/20 ring-2 ring-rose-300'
                : 'border-slate-200'
            }`}
          >
            {/* Top row: Name & Instant Switch */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-lg">{portal.name}</h3>
                  <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {portal.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Status:{' '}
                  {portal.isMaintenanceActive ? (
                    <strong className="text-rose-700 font-bold uppercase">● In Maintenance (Offline to public)</strong>
                  ) : (
                    <strong className="text-emerald-700 font-bold uppercase">● Online & Operational</strong>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleInstantMaintenance(portal.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
                    portal.isMaintenanceActive
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-rose-600 hover:bg-rose-700 text-white'
                  }`}
                >
                  {portal.isMaintenanceActive ? 'Turn Maintenance OFF' : '⚡ Trigger Instant Maintenance'}
                </button>
              </div>
            </div>

            {/* Scheduled Window Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Scheduled Date
                </label>
                <input
                  type="date"
                  value={portal.scheduledDate}
                  onChange={(e) => handleUpdate(portal.id, { scheduledDate: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Start Time (IST)
                </label>
                <input
                  type="time"
                  value={portal.scheduledStartTime}
                  onChange={(e) => handleUpdate(portal.id, { scheduledStartTime: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Expected Downtime (Minutes)
                </label>
                <select
                  value={portal.durationMinutes}
                  onChange={(e) => handleUpdate(portal.id, { durationMinutes: parseInt(e.target.value) })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value={30}>30 Minutes</option>
                  <option value={45}>45 Minutes</option>
                  <option value={60}>1 Hour</option>
                  <option value={120}>2 Hours</option>
                  <option value={240}>4 Hours</option>
                </select>
              </div>
            </div>

            {/* Visitor Maintenance Screen Notice */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Visitor Notice Headline
                </label>
                <input
                  type="text"
                  value={portal.noticeTitle}
                  onChange={(e) => handleUpdate(portal.id, { noticeTitle: e.target.value })}
                  className="w-full text-xs font-semibold border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Public Explanation Message
                </label>
                <textarea
                  rows={2}
                  value={portal.noticeMessage}
                  onChange={(e) => handleUpdate(portal.id, { noticeMessage: e.target.value })}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => saveConfig(portal.name)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition"
              >
                Save Schedule & Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
