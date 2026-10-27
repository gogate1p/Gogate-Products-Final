'use client';

import { useState } from 'react';

interface StoreData {
  id: string;
  name: string;
  slug: string;
  domain: string;
  logoUrl?: string;
  bannerUrl?: string;
  tagline?: string;
  status: 'ACTIVE' | 'DISABLED' | 'PENDING_KYC';
  kycStatus: 'APPROVED' | 'SUBMITTED' | 'REJECTED';
  fssaiNumber: string;
  udyamNumber: string;
  pickupEnabled: boolean;
  allowCustomerCancellation: boolean;
  city: string;
  state: string;
  contactPhone: string;
  contactEmail?: string;
}

const initialStores: StoreData[] = [
  {
    id: 'store_1',
    name: 'Gogate Organic Orchards (Ratnagiri Flagship)',
    slug: 'gogate-ratnagiri',
    domain: 'ratnagiri.gogateproducts.com',
    logoUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=200',
    bannerUrl: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=1200',
    tagline: 'Farm-direct GI tagged Ratnagiri Alphonso mangoes and wild kokum since 1946.',
    status: 'ACTIVE',
    kycStatus: 'APPROVED',
    fssaiNumber: '11521045000123',
    udyamNumber: 'UDYAM-MH-27-0012345',
    pickupEnabled: true,
    allowCustomerCancellation: false, // Default restricted to Superadmin
    city: 'Ratnagiri',
    state: 'Maharashtra',
    contactPhone: '+919822334455',
    contactEmail: 'orchards@gogateproducts.com',
  },
  {
    id: 'store_2',
    name: 'Devgad Cashew & Spice Guild',
    slug: 'devgad-spices',
    domain: 'devgad.gogateproducts.com',
    logoUrl: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=200',
    bannerUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1200',
    tagline: 'Traditional wood-roasted King W180 cashews and hand-ground Malvani spices.',
    status: 'PENDING_KYC',
    kycStatus: 'SUBMITTED',
    fssaiNumber: '11522046000789',
    udyamNumber: 'UDYAM-MH-28-0056789',
    pickupEnabled: false,
    allowCustomerCancellation: false,
    city: 'Sindhudurg',
    state: 'Maharashtra',
    contactPhone: '+919833445566',
    contactEmail: 'spices@gogateproducts.com',
  },
  {
    id: 'store_3',
    name: 'Konkan Honey & Amla Cooperative',
    slug: 'konkan-honey',
    domain: 'honey.gogateproducts.com',
    logoUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=200',
    tagline: 'Forest-foraged raw wildflower honey and cold-pressed wild amla syrup.',
    status: 'ACTIVE',
    kycStatus: 'APPROVED',
    fssaiNumber: '11523041000456',
    udyamNumber: 'UDYAM-MH-29-0099887',
    pickupEnabled: true,
    allowCustomerCancellation: false,
    city: 'Sawantwadi',
    state: 'Maharashtra',
    contactPhone: '+919844556677',
    contactEmail: 'honey@gogateproducts.com',
  },
];

export default function StoresManagementPage() {
  const [stores, setStores] = useState<StoreData[]>(initialStores);
  const [editingStore, setEditingStore] = useState<StoreData | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [newStore, setNewStore] = useState({
    name: '',
    slug: '',
    domain: '',
    logoUrl: '',
    tagline: '',
    fssaiNumber: '',
    udyamNumber: '',
    pickupEnabled: true,
    allowCustomerCancellation: false,
    city: '',
    state: 'Maharashtra',
    contactPhone: '',
    contactEmail: '',
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const toggleStoreStatus = (id: string) => {
    setStores((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextStatus = s.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE';
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
    showToast('Store status updated successfully.');
  };

  const togglePickup = (id: string) => {
    setStores((prev) =>
      prev.map((s) => (s.id === id ? { ...s, pickupEnabled: !s.pickupEnabled } : s))
    );
    showToast('Store pickup configuration updated.');
  };

  const handleCreateStore = (e: React.FormEvent) => {
    e.preventDefault();
    const created: StoreData = {
      id: `store_${Date.now()}`,
      name: newStore.name,
      slug: newStore.slug || newStore.name.toLowerCase().replace(/\s+/g, '-'),
      domain: newStore.domain || `${newStore.slug}.gogateproducts.com`,
      logoUrl: newStore.logoUrl || 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=200',
      tagline: newStore.tagline,
      status: 'PENDING_KYC',
      kycStatus: 'SUBMITTED',
      fssaiNumber: newStore.fssaiNumber,
      udyamNumber: newStore.udyamNumber,
      pickupEnabled: newStore.pickupEnabled,
      allowCustomerCancellation: newStore.allowCustomerCancellation,
      city: newStore.city,
      state: newStore.state,
      contactPhone: newStore.contactPhone,
      contactEmail: newStore.contactEmail,
    };
    setStores([...stores, created]);
    setShowAddModal(false);
    showToast(`Store "${created.name}" created and queued for KYC audit.`);
  };

  const handleUpdateBranding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStore) return;

    setStores((prev) =>
      prev.map((s) => (s.id === editingStore.id ? { ...editingStore } : s))
    );
    setEditingStore(null);
    showToast(`Branding and settings updated for "${editingStore.name}".`);
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold animate-fade-in flex items-center gap-2">
          <span>🥭</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">
            Storefronts & Store Network
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Configure multi-tenant storefront domains, brand logos, names, and customer self-cancellation policies.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 self-start"
        >
          <span>+</span>
          <span>Onboard New Store</span>
        </button>
      </div>

      {/* Stores Table */}
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50 border-b border-stone-200 uppercase font-bold text-stone-400 text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-4">Store & Logo</th>
                <th className="px-6 py-4">Domain / Tagline</th>
                <th className="px-6 py-4">Compliance (FSSAI/Udyam)</th>
                <th className="px-6 py-4">Cancellation Rule</th>
                <th className="px-6 py-4">Store Pickup</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {stores.map((store) => (
                <tr key={store.id} className="hover:bg-stone-50/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Store Logo Thumbnail */}
                      <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden shrink-0 flex items-center justify-center">
                        {store.logoUrl ? (
                          <img
                            src={store.logoUrl}
                            alt={store.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-lg">🥭</span>
                        )}
                      </div>
                      <div>
                        <span className="font-bold text-stone-900 block text-xs">
                          {store.name}
                        </span>
                        <span className="text-[11px] text-stone-400 font-mono">
                          {store.city}, {store.state}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-0.5">
                      <span className="font-mono text-[11px] text-emerald-800 font-bold block">
                        {store.domain}
                      </span>
                      {store.tagline && (
                        <p className="text-[10px] text-stone-500 line-clamp-1 italic">
                          "{store.tagline}"
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 space-y-1">
                    <div className="font-mono text-[10px]">
                      <span className="text-stone-400">FSSAI: </span>
                      <strong className="text-stone-700">{store.fssaiNumber}</strong>
                    </div>
                    <div className="font-mono text-[10px]">
                      <span className="text-stone-400">Udyam: </span>
                      <strong className="text-stone-700">{store.udyamNumber}</strong>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {store.allowCustomerCancellation ? (
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg text-[10px] font-bold">
                        Buyer Self-Cancel Allowed
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-lg text-[10px] font-black flex items-center gap-1 w-fit">
                        <span>🔒</span>
                        <span>Admin Only</span>
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => togglePickup(store.id)}
                      className={`px-3 py-1 rounded-xl font-bold text-[10px] transition ${
                        store.pickupEnabled
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-stone-100 text-stone-400 border border-stone-200'
                      }`}
                    >
                      {store.pickupEnabled ? '✓ Enabled' : 'Disabled'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        store.status === 'ACTIVE'
                          ? 'bg-emerald-100 text-emerald-800'
                          : store.status === 'PENDING_KYC'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {store.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Edit Branding Button */}
                      <button
                        onClick={() => setEditingStore({ ...store })}
                        className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-[11px] font-bold transition flex items-center gap-1"
                      >
                        <span>✏️</span>
                        <span>Edit Branding & Logo</span>
                      </button>

                      <button
                        onClick={() => toggleStoreStatus(store.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                          store.status === 'ACTIVE'
                            ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                            : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                        }`}
                      >
                        {store.status === 'ACTIVE' ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT STORE BRANDING & LOGO MODAL */}
      {editingStore && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🎨</span>
                <div>
                  <h3 className="font-black text-stone-900 text-base">
                    Store Branding & Configuration
                  </h3>
                  <p className="text-xs text-stone-500">
                    Update store logo, name, tagline, and customer cancellation rules.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingStore(null)}
                className="text-stone-400 hover:text-stone-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateBranding} className="space-y-4">
              {/* Store Logo Section with Live Preview */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                <label className="block text-xs font-bold text-stone-800">Store Logo</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-stone-300 overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
                    {editingStore.logoUrl ? (
                      <img
                        src={editingStore.logoUrl}
                        alt="Logo Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl">🥭</span>
                    )}
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <input
                      type="url"
                      value={editingStore.logoUrl || ''}
                      onChange={(e) =>
                        setEditingStore({ ...editingStore, logoUrl: e.target.value })
                      }
                      placeholder="https://example.com/logo.png"
                      className="w-full text-xs border border-stone-300 rounded-xl px-3 py-2 bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                    />
                    <p className="text-[10px] text-stone-400">
                      Square PNG or SVG recommended (512x512px).
                    </p>
                  </div>
                </div>
              </div>

              {/* Store Name & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Store Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingStore.name}
                    onChange={(e) =>
                      setEditingStore({ ...editingStore, name: e.target.value })
                    }
                    className="w-full text-xs border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Custom Domain
                  </label>
                  <input
                    type="text"
                    value={editingStore.domain}
                    onChange={(e) =>
                      setEditingStore({ ...editingStore, domain: e.target.value })
                    }
                    className="w-full text-xs border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Tagline / Brand Bio
                </label>
                <input
                  type="text"
                  value={editingStore.tagline || ''}
                  onChange={(e) =>
                    setEditingStore({ ...editingStore, tagline: e.target.value })
                  }
                  placeholder="e.g. 100% Tree-ripened organic Alphonso mangoes from Pawas"
                  className="w-full text-xs border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Support Phone
                  </label>
                  <input
                    type="text"
                    value={editingStore.contactPhone}
                    onChange={(e) =>
                      setEditingStore({ ...editingStore, contactPhone: e.target.value })
                    }
                    className="w-full text-xs border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={editingStore.contactEmail || ''}
                    onChange={(e) =>
                      setEditingStore({ ...editingStore, contactEmail: e.target.value })
                    }
                    className="w-full text-xs border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>
              </div>

              {/* Cancellation Policy Switcher */}
              <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                      <span>🔒</span>
                      <span>Customer Self-Cancellation Rule</span>
                    </h4>
                    <p className="text-[11px] text-amber-800 mt-0.5">
                      When disabled, buyers cannot self-cancel; orders can strictly only be cancelled from Admin end.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={editingStore.allowCustomerCancellation}
                    onChange={(e) =>
                      setEditingStore({
                        ...editingStore,
                        allowCustomerCancellation: e.target.checked,
                      })
                    }
                    className="w-5 h-5 accent-emerald-800 rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setEditingStore(null)}
                  className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  Save Store Branding
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ONBOARD NEW STORE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <h3 className="text-base font-bold text-stone-900">Onboard New Store / Franchise</h3>
            <form onSubmit={handleCreateStore} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Store Name</label>
                <input
                  type="text"
                  required
                  value={newStore.name}
                  onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                  placeholder="e.g. Vengurla Cashew Growers Guild"
                  className="w-full text-xs border border-stone-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">FSSAI Number (14 Digits)</label>
                  <input
                    type="text"
                    required
                    maxLength={14}
                    value={newStore.fssaiNumber}
                    onChange={(e) => setNewStore({ ...newStore, fssaiNumber: e.target.value })}
                    placeholder="1152..."
                    className="w-full text-xs font-mono border border-stone-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">MSME Udyam Number</label>
                  <input
                    type="text"
                    required
                    value={newStore.udyamNumber}
                    onChange={(e) => setNewStore({ ...newStore, udyamNumber: e.target.value })}
                    placeholder="UDYAM-MH-..."
                    className="w-full text-xs font-mono border border-stone-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold"
                >
                  Submit & Queue for KYC
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
