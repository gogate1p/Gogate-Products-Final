'use client';

interface SellerReputation {
  storeName: string;
  location: string;
  fssaiNumber: string;
  udyamNumber: string;
  totalOrdersFulfilled: string;
  deliveryTimeRating: number; // e.g. 4.9
  onTimeDeliveryRate: string; // e.g. 98.6%
  avgTransitHours: string; // e.g. "22 Hours"
  productQualityRating: number; // e.g. 4.95
  naturalRipenedScore: string; // e.g. "100% Zero Carbide"
  freshnessRetention: string; // e.g. "99.2%"
  storePickupAddress: string;
}

const defaultSeller: SellerReputation = {
  storeName: 'Gogate Organic Orchards (Ratnagiri Flagship)',
  location: 'Gogate Wadi, Pawas, Taluka Ratnagiri, Maharashtra 415616',
  fssaiNumber: '11521045000123',
  udyamNumber: 'UDYAM-MH-27-0012345',
  totalOrdersFulfilled: '14,280+ Farm Crates',
  deliveryTimeRating: 4.9,
  onTimeDeliveryRate: '98.6%',
  avgTransitHours: '20-24 Hours (Cold Linehaul)',
  productQualityRating: 4.95,
  naturalRipenedScore: '100% Tree-Ripened (Zero Carbide)',
  freshnessRetention: '99.4% Freshness Retention',
  storePickupAddress: 'Direct Farm Counter: Pawas Orchard Gate, Ratnagiri',
};

export default function SellerRatingModal({
  isOpen,
  onClose,
  seller = defaultSeller,
}: {
  isOpen: boolean;
  onClose: () => void;
  seller?: SellerReputation;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 text-2xl flex items-center justify-center shrink-0">
              🌱
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-stone-900 text-base leading-snug">
                  {seller.storeName}
                </h3>
              </div>
              <p className="text-xs text-emerald-800 font-semibold mt-0.5">
                ✓ Superadmin Verified Organic Grower
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 text-sm flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Core Ratings Cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* 1. Delivery Time Rating */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 space-y-1.5">
            <span className="text-[10px] font-black uppercase text-blue-800 tracking-wider block">
              ⏱️ Delivery Time SLA
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-blue-950">{seller.deliveryTimeRating}</span>
              <span className="text-xs text-blue-700 font-bold">/ 5.0</span>
            </div>
            <div className="space-y-0.5 text-[11px] text-blue-900 font-medium pt-1">
              <p>• {seller.onTimeDeliveryRate} On-Time Dispatch</p>
              <p>• Avg SLA: {seller.avgTransitHours}</p>
            </div>
          </div>

          {/* 2. Product Quality Rating */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-1.5">
            <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider block">
              ⭐ Product Quality Rating
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-emerald-950">{seller.productQualityRating}</span>
              <span className="text-xs text-emerald-700 font-bold">/ 5.0</span>
            </div>
            <div className="space-y-0.5 text-[11px] text-emerald-900 font-medium pt-1">
              <p>• {seller.naturalRipenedScore}</p>
              <p>• {seller.freshnessRetention}</p>
            </div>
          </div>
        </div>

        {/* Farm & Regulatory Credentials */}
        <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-stone-500 font-medium">FSSAI License:</span>
            <span className="font-mono font-bold text-stone-900">{seller.fssaiNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500 font-medium">MSME Udyam:</span>
            <span className="font-mono font-bold text-stone-900">{seller.udyamNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500 font-medium">Lifetime Orders:</span>
            <span className="font-bold text-stone-900">{seller.totalOrdersFulfilled}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500 font-medium">Orchard Origin:</span>
            <span className="font-medium text-stone-900 text-right max-w-[240px]">{seller.location}</span>
          </div>
        </div>

        {/* Store Pickup Banner */}
        <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-950 flex items-center justify-between">
          <div>
            <span className="font-bold block">🏬 Store Pickup Available</span>
            <span className="text-[11px] text-purple-800">{seller.storePickupAddress}</span>
          </div>
          <span className="text-[10px] bg-purple-200 text-purple-900 font-bold px-2 py-0.5 rounded">
            Free
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition"
        >
          Close Seller Profile
        </button>
      </div>
    </div>
  );
}
