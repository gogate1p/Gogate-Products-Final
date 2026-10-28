'use client';

import React, { useState } from 'react';

export type PipelineMode = 'STANDARD' | 'RETURN' | 'REPLACEMENT';

export interface PipelineSubEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  location?: string;
  temperatureCelsius?: number;
  isCompleted: boolean;
  isCurrent?: boolean;
}

export interface CourierDetails {
  partner: 'SHIPROCKET' | 'NIMBUSPOST' | 'TOOKAN' | 'SHIPDAY' | 'PIDGE' | 'IN_HOUSE';
  partnerName: string;
  awbNumber: string;
  trackingUrl?: string;
  courierStatus: string;
  lastSyncedAt: string;
}

interface OrderPipelineTrackerProps {
  mode?: PipelineMode;
  currentStatus: string; // e.g., 'ORDERED' | 'PACKED' | 'SHIPPED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED' | 'RETURN_REQUESTED' | 'PICKUP' | 'REFUND' | 'REPLACEMENT_ORDERED'
  courier?: CourierDetails;
  cancellationReason?: string;
  onSyncCourier?: () => Promise<void> | void;
  allowSync?: boolean;
}

export default function OrderPipelineTracker({
  mode = 'STANDARD',
  currentStatus = 'SHIPPED',
  courier = {
    partner: 'SHIPROCKET',
    partnerName: 'Shiprocket Surface Cold Fleet',
    awbNumber: 'SR-8899221100',
    trackingUrl: 'https://shiprocket.co/tracking/SR-8899221100',
    courierStatus: 'In Transit - Outward Sorting Hub',
    lastSyncedAt: 'Just now',
  },
  cancellationReason,
  onSyncCourier,
  allowSync = true,
}: OrderPipelineTrackerProps) {
  const [activeMode, setActiveMode] = useState<PipelineMode>(mode);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(courier.lastSyncedAt);
  const [expandedStage, setExpandedStage] = useState<string | null>('SHIPPED');

  // Stages configuration based on mode (Purely typographic milestones, strictly zero icons)
  const standardStages = [
    { key: 'ORDERED', label: 'Ordered', step: '01' },
    { key: 'PACKED', label: 'Packed', step: '02' },
    { key: 'SHIPPED', label: 'Shipped', step: '03' },
    { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', step: '04' },
    { key: 'DELIVERED', label: 'Delivered', step: '05' },
  ];

  const returnStages = [
    { key: 'RETURN_REQUESTED', label: 'Return Requested', step: '01' },
    { key: 'PICKUP', label: 'Pickup from Doorstep', step: '02' },
    { key: 'REFUND', label: 'Refund Processed', step: '03' },
  ];

  const replacementStages = [
    { key: 'REPLACEMENT_ORDERED', label: 'Replacement Initiated', step: '01' },
    { key: 'PACKED', label: 'Packed & Certified', step: '02' },
    { key: 'SHIPPED', label: 'Shipped (Re-Dispatch)', step: '03' },
    { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', step: '04' },
    { key: 'DELIVERED', label: 'Replacement Delivered', step: '05' },
  ];

  const stages =
    activeMode === 'RETURN'
      ? returnStages
      : activeMode === 'REPLACEMENT'
      ? replacementStages
      : standardStages;

  // Calculate current stage progress index
  const isCancelled = currentStatus === 'CANCELLED';
  let currentIndex = stages.findIndex((s) => s.key === currentStatus);
  if (currentIndex === -1) {
    // Default fallback based on active mode
    currentIndex = activeMode === 'STANDARD' ? 2 : activeMode === 'RETURN' ? 1 : 2;
  }

  // Progress percentage for animated glowing green line
  const progressPercent = isCancelled
    ? 100
    : stages.length > 1
    ? Math.min(100, Math.max(0, (currentIndex / (stages.length - 1)) * 100))
    : 0;

  // Mock sub-updates dictionary
  const subUpdatesMap: Record<string, PipelineSubEvent[]> = {
    ORDERED: [
      {
        id: 'o_1',
        title: 'Order Confirmed & Payment Captured',
        description: 'Payment authorized via Razorpay. Order #202610278491 registered in seller central.',
        timestamp: '27 Oct, 09:15 AM',
        location: 'Online Storefront',
        isCompleted: true,
      },
      {
        id: 'o_2',
        title: 'Harvest Batch Allocated',
        description: 'Assigned to Pawas Orchards Block B (FSSAI Tag #11521045000123).',
        timestamp: '27 Oct, 09:30 AM',
        location: 'Pawas, Ratnagiri',
        isCompleted: true,
      },
    ],
    PACKED: [
      {
        id: 'p_1',
        title: 'Organic Inspection & Sorting',
        description: 'Graded Grade A Alphonso mangoes; verified zero carbide, natural straw cushion packed.',
        timestamp: '27 Oct, 02:45 PM',
        location: 'Pawas Orchard Packhouse',
        isCompleted: true,
        temperatureCelsius: 16.0,
      },
      {
        id: 'p_2',
        title: 'Invoice & Barcode Packaging Slip Affixed',
        description: 'E-Way bill generated. Consignment packed in food-grade vented corrugated carton.',
        timestamp: '27 Oct, 04:30 PM',
        location: 'Pawas Hub Bay 02',
        isCompleted: true,
      },
    ],
    SHIPPED: [
      {
        id: 's_1',
        title: `Picked Up by Integrated Partner (${courier.partnerName})`,
        description: `AWB ${courier.awbNumber} scanned by pickup courier vehicle. Consignment verified.`,
        timestamp: '27 Oct, 06:10 PM',
        location: 'Ratnagiri Agro Central Hub',
        isCompleted: true,
      },
      {
        id: 's_2',
        title: 'Refrigerated Linehaul Transit (NH-66)',
        description: 'Loaded onto 14ft Reefer Truck MH-08-AG-9988 bound for Pune/Mumbai corridor.',
        timestamp: '28 Oct, 04:30 AM',
        location: 'Konkan Highway Transit (Lat 17.5312° N, Long 73.5281° E)',
        isCompleted: true,
        temperatureCelsius: 17.2,
      },
      {
        id: 's_3',
        title: 'Inward Scan at Destination Hub',
        description: 'Arrived at Hadapsar Central Logistics Hub. Temperature verified within tolerance.',
        timestamp: '28 Oct, 10:15 AM',
        location: 'Hadapsar Express Branch (HUB-PUN-01)',
        isCompleted: currentIndex >= 2,
        isCurrent: currentIndex === 2,
      },
    ],
    OUT_FOR_DELIVERY: [
      {
        id: 'ofd_1',
        title: 'Assigned to Delivery Executive',
        description: 'Courier executive Ramesh Sawant assigned to run sheet RS-PUN-8821.',
        timestamp: '28 Oct, 11:30 AM',
        location: 'Koregaon Park Local Dispatch',
        isCompleted: currentIndex >= 3,
        isCurrent: currentIndex === 3,
      },
      {
        id: 'ofd_2',
        title: 'Delivery OTP Generated',
        description: 'Secure 4-digit verification code 8492 sent to customer mobile.',
        timestamp: '28 Oct, 11:45 AM',
        location: 'Destination Sector',
        isCompleted: currentIndex >= 3,
      },
    ],
    DELIVERED: [
      {
        id: 'd_1',
        title: 'Consignment Handed Over',
        description: 'Package delivered in fresh cold condition. Digital signature & OTP verified.',
        timestamp: currentIndex >= 4 ? '28 Oct, 01:15 PM' : 'Expected today by 02:00 PM',
        location: 'Customer Address',
        isCompleted: currentIndex >= 4,
        isCurrent: currentIndex === 4,
      },
    ],
    RETURN_REQUESTED: [
      {
        id: 'r_1',
        title: 'Return Request Registered',
        description: 'Photo evidence and transit freshness review approved by quality team.',
        timestamp: '28 Oct, 02:15 PM',
        location: 'Gogate Support Portal',
        isCompleted: true,
      },
    ],
    PICKUP: [
      {
        id: 'r_2',
        title: 'Reverse Pickup Courier Dispatched',
        description: 'Reverse AWB REV-GGT-882910 created. Courier executive arriving for inspection.',
        timestamp: '29 Oct, 10:00 AM',
        location: 'Customer Doorstep',
        isCompleted: currentIndex >= 1,
        isCurrent: currentIndex === 1,
      },
    ],
    REFUND: [
      {
        id: 'r_3',
        title: '100% Refund Credited',
        description: 'Refund released back to original payment method (Razorpay TXN_REF_991823).',
        timestamp: currentIndex >= 2 ? '29 Oct, 04:30 PM' : 'Pending verification',
        location: 'Payment Gateway Bank Transfer',
        isCompleted: currentIndex >= 2,
      },
    ],
    REPLACEMENT_ORDERED: [
      {
        id: 'rep_1',
        title: 'Zero-Cost Fresh Box Dispatched',
        description: 'Organic guarantee triggered. Fresh Pawas Alphonso batch allocated instantly.',
        timestamp: '28 Oct, 02:30 PM',
        location: 'Pawas Orchards Central Store',
        isCompleted: true,
      },
    ],
  };

  const handleSyncCourier = async () => {
    setIsSyncing(true);
    if (onSyncCourier) {
      await onSyncCourier();
    } else {
      // Simulate API fetch delay
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
    const now = new Date();
    setLastSyncTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    setIsSyncing(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden space-y-6 p-6 sm:p-8">
      {/* Top Header & Pipeline Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-stone-100">
        <div>
          <h2 className="text-lg font-black text-stone-900 tracking-tight">
            Order Pipeline & Real-Time Tracking
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Synchronized live with integrated 3PL logistics and IoT temperature telemetry.
          </p>
        </div>

        {/* View Mode Switcher (Standard, Return, Replacement) - Strictly text tags, no icons */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-2xl shrink-0 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setActiveMode('STANDARD');
              setExpandedStage('SHIPPED');
            }}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeMode === 'STANDARD'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Delivery Pipeline
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveMode('RETURN');
              setExpandedStage('RETURN_REQUESTED');
            }}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeMode === 'RETURN'
                ? 'bg-white text-rose-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Return Flow
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveMode('REPLACEMENT');
              setExpandedStage('REPLACEMENT_ORDERED');
            }}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeMode === 'REPLACEMENT'
                ? 'bg-white text-amber-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Replacement
          </button>
        </div>
      </div>

      {/* Cancelled Alert Banner (If Applicable) */}
      {isCancelled && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-900 flex items-start gap-3">
          <span className="px-2 py-0.5 rounded font-mono font-black bg-rose-200 text-rose-900 text-[10px] shrink-0 uppercase tracking-wider">
            Alert
          </span>
          <div>
            <p className="font-extrabold text-sm">Order Cancelled by Superadmin</p>
            <p className="mt-0.5 text-rose-700">
              {cancellationReason || 'Cancelled upon customer request via Admin Support. 100% refund initiated to source account.'}
            </p>
            <p className="text-[11px] text-rose-600 mt-1">
              Note: Self-service customer cancellation is disabled to protect cold-chain linehaul operations.
            </p>
          </div>
        </div>
      )}

      {/* Main Animated Pipeline Timeline */}
      <div className="relative pt-6 pb-4 px-2 sm:px-6">
        {/* Background Grey Track Line */}
        <div className="absolute top-11 left-6 right-6 sm:left-12 sm:right-12 h-1.5 bg-stone-200 rounded-full z-0" />

        {/* Animated Glowing Green Fill Line */}
        <div
          className={`absolute top-11 left-6 sm:left-12 h-1.5 rounded-full z-0 transition-all duration-1000 ease-in-out ${
            isCancelled
              ? 'bg-rose-500'
              : 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
          }`}
          style={{ width: `calc(${progressPercent}% * 0.85)` }}
        />

        {/* Pipeline Stage Nodes - Numbered Steps (No Icons) */}
        <div className="relative z-10 flex items-start justify-between">
          {stages.map((stg, idx) => {
            const isPassed = !isCancelled && idx <= currentIndex;
            const isCurrent = !isCancelled && idx === currentIndex;
            const isStageCancelled = isCancelled;

            return (
              <div
                key={stg.key}
                onClick={() => setExpandedStage(stg.key)}
                className="flex flex-col items-center cursor-pointer group text-center max-w-[80px] sm:max-w-[120px]"
              >
                {/* Node Circle - Milestone Number Step */}
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-mono text-xs sm:text-sm font-black transition-all duration-300 shadow-xs ${
                    isStageCancelled
                      ? 'bg-rose-100 border-2 border-rose-500 text-rose-700'
                      : isCurrent
                      ? 'bg-emerald-700 border-4 border-emerald-100 text-white scale-110 shadow-lg shadow-emerald-700/25 ring-2 ring-emerald-700'
                      : isPassed
                      ? 'bg-emerald-800 text-white'
                      : 'bg-white border-2 border-stone-200 text-stone-400 group-hover:border-stone-300'
                  }`}
                >
                  {stg.step}
                </div>

                {/* Node Label */}
                <span
                  className={`mt-2 text-[11px] sm:text-xs font-black transition-colors ${
                    isCurrent
                      ? 'text-emerald-900 font-extrabold'
                      : isPassed
                      ? 'text-stone-800 font-bold'
                      : 'text-stone-400'
                  }`}
                >
                  {stg.label}
                </span>

                {/* Sub status tag */}
                {isCurrent && (
                  <span className="mt-0.5 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-100 text-emerald-800 animate-pulse">
                    CURRENT
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* COURIER INTEGRATION BANNER UNDER 'SHIPPED' STAGE */}
      <div className="p-4 sm:p-5 bg-gradient-to-br from-stone-50 to-emerald-50/40 border border-stone-200 rounded-2xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center text-xs font-mono font-bold shadow-xs">
              AWB
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Integrated Courier Partner:
                </span>
                <span className="px-2.5 py-0.5 bg-emerald-800 text-white rounded-lg text-xs font-black">
                  {courier.partnerName}
                </span>
                <span className="px-2 py-0.5 bg-white border border-stone-300 text-stone-900 rounded-md text-[11px] font-mono font-bold">
                  AWB: {courier.awbNumber}
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-0.5 flex items-center gap-2">
                <span>Status: <strong className="text-stone-900">{courier.courierStatus}</strong></span>
                <span>•</span>
                <span className="text-stone-500 text-[11px]">Synced: {lastSyncTime}</span>
              </p>
            </div>
          </div>

          {/* Sync & Live Tracking Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {allowSync && (
              <button
                type="button"
                onClick={handleSyncCourier}
                disabled={isSyncing}
                className="px-3.5 py-2 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs disabled:opacity-50"
              >
                <span>{isSyncing ? 'Syncing...' : 'Sync Courier API'}</span>
              </button>
            )}

            {courier.trackingUrl && (
              <a
                href={courier.trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-2xs"
              >
                <span>Live Courier Portal</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* NESTED SUB-UPDATES & CHECKPOINTS SECTION */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-stone-500">
            Granular Stage Checkpoints & Sub-Updates ({expandedStage || 'All'})
          </h3>
          <span className="text-[11px] text-stone-400">Click any milestone to inspect</span>
        </div>

        {/* Selected or All Sub-updates */}
        <div className="space-y-2.5">
          {stages.map((stg) => {
            const updates = subUpdatesMap[stg.key] || [];
            const isSelected = expandedStage === stg.key;

            return (
              <div
                key={stg.key}
                className={`rounded-2xl border transition overflow-hidden ${
                  isSelected
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-stone-100 bg-white hover:border-stone-200'
                }`}
              >
                {/* Header Row */}
                <button
                  type="button"
                  onClick={() => setExpandedStage(isSelected ? null : stg.key)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-black text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                      {stg.step}
                    </span>
                    <span className="text-xs font-bold text-stone-900">
                      {stg.label} ({updates.length} events)
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-stone-500">{isSelected ? 'Hide Details' : 'View Details'}</span>
                </button>

                {/* Sub-events list */}
                {isSelected && (
                  <div className="px-4 pb-4 pt-1 border-t border-stone-100 space-y-3">
                    {updates.length === 0 ? (
                      <p className="text-xs text-stone-400 italic">No events logged yet for this stage.</p>
                    ) : (
                      updates.map((evt) => (
                        <div key={evt.id} className="relative pl-6 pb-2 border-l-2 border-emerald-200 last:border-none">
                          <div
                            className={`absolute -left-[7px] top-1 w-3 h-3 rounded-full ${
                              evt.isCompleted
                                ? 'bg-emerald-600 ring-2 ring-emerald-200'
                                : 'bg-stone-300'
                            }`}
                          />
                          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                            <h4 className="text-xs font-extrabold text-stone-900 flex items-center gap-1.5 flex-wrap">
                              <span>{evt.title}</span>
                              {evt.temperatureCelsius && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                                  {evt.temperatureCelsius}°C Cold-Chain Controlled
                                </span>
                              )}
                            </h4>
                            <span className="text-[10px] text-stone-500 font-medium">{evt.timestamp}</span>
                          </div>
                          <p className="text-xs text-stone-600 mt-0.5">{evt.description}</p>
                          {evt.location && (
                            <p className="text-[10px] text-stone-400 mt-0.5">
                              Location: {evt.location}
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
