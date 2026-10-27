import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Organic certification & origin badge
export function OrganicBadge({
  fssaiNo,
  udyamNo,
  origin,
}: {
  fssaiNo?: string;
  udyamNo?: string;
  origin?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      {fssaiNo && (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          FSSAI: {fssaiNo}
        </span>
      )}
      {udyamNo && (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-amber-50 text-amber-800 border border-amber-200">
          Udyam: {udyamNo}
        </span>
      )}
      {origin && (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-stone-100 text-stone-700 border border-stone-200">
          📍 {origin}
        </span>
      )}
    </div>
  );
}

// Order & Shipment status badge
export function StatusBadge({ status }: { status: string }) {
  const getColors = () => {
    switch (status) {
      case 'DELIVERED':
      case 'ACTIVE':
      case 'APPROVED':
      case 'PAID':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'OUT_FOR_DELIVERY':
      case 'IN_TRANSIT':
      case 'PROCESSING':
      case 'SHIPPED':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PENDING':
      case 'SUBMITTED':
      case 'PENDING_KYC':
      case 'UNDER_REVIEW':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'CANCELLED':
      case 'REJECTED':
      case 'FAILED':
      case 'DISABLED':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider border',
        getColors()
      )}
    >
      {status.replace(/_/g, ' ')}
    </span>
  );
}

// Live shipment tracking timeline component
export interface CheckpointItem {
  id: string;
  status: string;
  location: string;
  description: string;
  timestamp: string;
}

export function TrackingTimeline({ checkpoints }: { checkpoints: CheckpointItem[] }) {
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {checkpoints.map((cp, idx) => {
          const isLast = idx === checkpoints.length - 1;
          return (
            <li key={cp.id}>
              <div className="relative pb-8">
                {!isLast && (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-emerald-200"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={cn(
                        'h-8 w-8 rounded-full flex items-center justify-center ring-4 ring-white',
                        isLast ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-700'
                      )}
                    >
                      ✓
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-sm font-semibold text-stone-900">{cp.status.replace(/_/g, ' ')}</p>
                      <p className="text-xs text-stone-600 mt-0.5">{cp.description}</p>
                      <p className="text-xs text-stone-400 mt-0.5">📍 {cp.location}</p>
                    </div>
                    <div className="text-right text-xs whitespace-nowrap text-stone-500">
                      {new Date(cp.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
