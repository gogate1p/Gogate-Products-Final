'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Package,
  MapPin,
  Headphones,
  UserCog,
  ShieldCheck,
  Plus,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Phone,
  Mail,
  Clock,
  Send,
  Building,
  Home,
  Briefcase,
  AlertTriangle,
} from 'lucide-react';

type TabKey = 'orders' | 'address' | 'contact' | 'profile' | 'privacy';

function AccountContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as TabKey) || 'profile';

  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);

  useEffect(() => {
    const tabParam = searchParams.get('tab') as TabKey;
    if (tabParam && ['orders', 'address', 'contact', 'profile', 'privacy'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Profile Form State
  const [profileData, setProfileData] = useState({
    fullName: 'Ananya Sharma',
    phone: '+91 99887 76655',
    email: 'ananya.sharma@example.com',
    alternatePhone: '+91 98223 34455',
    preferredHarvestSlot: 'Morning (08:00 AM - 12:00 PM)',
    dietaryPreference: 'Organic GI Tagged Produce',
  });
  const [profileSaved, setProfileSaved] = useState(false);

  // Address State
  const [addresses, setAddresses] = useState([
    {
      id: 'addr_1',
      title: 'Home (Default)',
      type: 'home',
      name: 'Ananya Sharma',
      phone: '+91 99887 76655',
      addressLine: 'Flat 402, Lotus Greens, Lane 5, Koregaon Park',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
      isDefault: true,
    },
    {
      id: 'addr_2',
      title: 'Work / Office',
      type: 'work',
      name: 'Ananya Sharma',
      phone: '+91 99887 76655',
      addressLine: 'Tower B, Tech Park, Phase 1, Hinjawadi',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411057',
      isDefault: false,
    },
  ]);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    title: '',
    name: 'Ananya Sharma',
    phone: '+91 99887 76655',
    addressLine: '',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '',
  });

  // Support Ticket Form State
  const [ticketSubject, setTicketSubject] = useState('Order Delivery Inquiry');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSent, setTicketSent] = useState(false);

  // Danger Zone / Delete Account State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [accountDeleted, setAccountDeleted] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleAddAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.addressLine || !newAddress.pincode) return;
    setAddresses((prev) => [
      ...prev,
      {
        id: `addr_${Date.now()}`,
        title: newAddress.title || 'Other Address',
        type: 'other',
        name: newAddress.name,
        phone: newAddress.phone,
        addressLine: newAddress.addressLine,
        city: newAddress.city,
        state: newAddress.state,
        pincode: newAddress.pincode,
        isDefault: false,
      },
    ]);
    setShowAddAddressModal(false);
    setNewAddress({
      title: '',
      name: 'Ananya Sharma',
      phone: '+91 99887 76655',
      addressLine: '',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '',
    });
  };

  const handleDeleteAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (deleteConfirmation === 'DELETE MY ACCOUNT') {
      setAccountDeleted(true);
      setShowDeleteModal(false);
    }
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketMessage) return;
    setTicketSent(true);
    setTimeout(() => {
      setTicketSent(false);
      setTicketMessage('');
    }, 4000);
  };

  if (accountDeleted) {
    return (
      <div className="max-w-2xl mx-auto my-12 bg-white border border-rose-200 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xl mx-auto">
          X
        </div>
        <h2 className="text-2xl font-black text-rose-950">Account Successfully Deactivated</h2>
        <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
          All stored shipping addresses, customer profile data, and registered device tokens have been completely purged from our databases.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition shadow-xs"
          >
            Return to Storefront
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Customer Account & Settings
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Manage your orders, saved delivery addresses, support inquiries, and personal details.
          </p>
        </div>

        {/* User Summary Pill */}
        <div className="flex items-center gap-3 bg-white border border-stone-200 px-4 py-2.5 rounded-2xl shadow-xs">
          <div className="w-9 h-9 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
            AS
          </div>
          <div className="text-xs">
            <span className="font-bold text-stone-900 block leading-tight">Ananya Sharma</span>
            <span className="text-[11px] text-emerald-700 font-semibold">Store Credits: ₹450.00</span>
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Navigation Sidebar */}
        <div className="bg-white rounded-3xl border border-stone-200/90 p-3 shadow-xs space-y-1">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'profile'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            <UserCog className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'orders'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4" />
              <span>My Orders</span>
            </div>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] ${
                activeTab === 'orders'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-amber-100 text-amber-900'
              }`}
            >
              1 Active
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('address')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'address'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses</span>
            </div>
            <span
              className={`text-[10px] ${
                activeTab === 'address' ? 'text-emerald-200' : 'text-stone-400'
              }`}
            >
              2
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'contact'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            <Headphones className="w-4 h-4" />
            <span>Contact Us & Help</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition text-left ${
              activeTab === 'privacy'
                ? 'bg-rose-800 text-white shadow-xs'
                : 'text-stone-600 hover:bg-rose-50 hover:text-rose-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Privacy & Danger Zone</span>
          </button>
        </div>

        {/* Tab Content Panel */}
        <div className="lg:col-span-3">
          {/* TAB 1: EDIT PROFILE */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h3 className="text-lg font-black text-stone-900 tracking-tight">Personal Profile & Contact</h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Update your contact details and harvest delivery preferences.
                </p>
              </div>

              {profileSaved && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="font-bold">Your profile details have been saved successfully!</span>
                </div>
              )}

              <form onSubmit={handleProfileSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                      className="w-full text-xs border border-stone-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">Mobile Phone (OTP Verified)</label>
                    <input
                      type="tel"
                      required
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full text-xs font-mono border border-stone-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full text-xs border border-stone-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">Alternate Emergency Phone</label>
                    <input
                      type="tel"
                      value={profileData.alternatePhone}
                      onChange={(e) => setProfileData({ ...profileData, alternatePhone: e.target.value })}
                      className="w-full text-xs font-mono border border-stone-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
                    Harvest & Delivery Preferences
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Preferred Delivery Slot</label>
                      <select
                        value={profileData.preferredHarvestSlot}
                        onChange={(e) => setProfileData({ ...profileData, preferredHarvestSlot: e.target.value })}
                        className="w-full text-xs border border-stone-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                      >
                        <option>Morning (08:00 AM - 12:00 PM)</option>
                        <option>Afternoon (12:00 PM - 04:00 PM)</option>
                        <option>Evening (04:00 PM - 08:00 PM)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Dietary Standard</label>
                      <select
                        value={profileData.dietaryPreference}
                        onChange={(e) => setProfileData({ ...profileData, dietaryPreference: e.target.value })}
                        className="w-full text-xs border border-stone-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                      >
                        <option>Organic GI Tagged Produce</option>
                        <option>Natural Tree Ripened Only</option>
                        <option>Export Grade Sorting</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition shadow-xs"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: MY ORDERS */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-stone-900 tracking-tight">Orders & Shipments</h3>
                  <p className="text-xs text-stone-500 mt-0.5">Track live consignments and view harvest dispatch history.</p>
                </div>
                <Link
                  href="/track"
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <span>Open Live Tracker</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Active Order Card */}
              <div className="p-5 rounded-2xl border-2 border-emerald-600/30 bg-emerald-50/20 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-emerald-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-black text-stone-900">Order #202610278491</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        DISPATCHED (IN TRANSIT)
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Shipped via Shiprocket Surface Cold Fleet • AWB SR-8899221100
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-stone-900 text-base">₹2,429.00</span>
                    <span className="text-[10px] text-stone-400 block font-medium">Paid via Razorpay</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-stone-700">
                    <span>1x Original Ratnagiri Alphonso Mango (Grade A - 1 Dozen)</span>
                    <span className="font-mono font-bold">₹1,450</span>
                  </div>
                  <div className="flex justify-between text-stone-700">
                    <span>1x Konkan Jumbo Roasted & Salted Cashews - W180 (500g)</span>
                    <span className="font-mono font-bold">₹799</span>
                  </div>
                  <div className="flex justify-between text-stone-700">
                    <span>2x Fresh Alphonso Mango Slices Cup (250g)</span>
                    <span className="font-mono font-bold">₹180</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-[11px] text-stone-500">
                    Estimated Doorstep Delivery: <strong>Today by 02:00 PM</strong> (OTP: 8492)
                  </div>
                  <Link
                    href="/track"
                    className="px-4 py-2 bg-emerald-800 text-white font-bold text-xs rounded-xl hover:bg-emerald-900 transition text-center"
                  >
                    Track Shipment Milestones
                  </Link>
                </div>
              </div>

              {/* Past Order Sample */}
              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-3 opacity-80">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-stone-800">Order #202609142109</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-200 text-stone-700">
                        DELIVERED
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500">Delivered on 16 Sep 2026 to Koregaon Park Address</p>
                  </div>
                  <span className="font-bold text-stone-900 text-sm">₹520.00</span>
                </div>
                <p className="text-xs text-stone-600">2x Pure Cold-Pressed Kokum Agal (750ml)</p>
              </div>
            </div>
          )}

          {/* TAB 3: SAVED ADDRESSES */}
          {activeTab === 'address' && (
            <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-stone-900 tracking-tight">Saved Delivery Addresses</h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Manage destination locations for express and cold-chain dispatches.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddAddressModal(true)}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Address</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-4 rounded-2xl border transition relative space-y-2.5 ${
                      addr.isDefault
                        ? 'border-emerald-600/50 bg-emerald-50/20'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-stone-900 flex items-center gap-1.5">
                        {addr.type === 'home' && <Home className="w-3.5 h-3.5 text-emerald-800" />}
                        {addr.type === 'work' && <Briefcase className="w-3.5 h-3.5 text-stone-600" />}
                        {addr.title}
                      </span>
                      {addr.isDefault && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Default
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-stone-600 space-y-0.5">
                      <p className="font-bold text-stone-900">{addr.name}</p>
                      <p>{addr.addressLine}</p>
                      <p>
                        {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <p className="font-mono text-[11px] text-stone-500 pt-1">Phone: {addr.phone}</p>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                      {!addr.isDefault ? (
                        <button
                          type="button"
                          onClick={() => {
                            setAddresses((prev) =>
                              prev.map((a) => ({ ...a, isDefault: a.id === addr.id }))
                            );
                          }}
                          className="text-[11px] font-bold text-emerald-800 hover:underline"
                        >
                          Set as Default
                        </button>
                      ) : (
                        <span className="text-[11px] text-stone-400">Primary delivery point</span>
                      )}

                      {addresses.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setAddresses((prev) => prev.filter((a) => a.id !== addr.id))}
                          className="text-[11px] font-bold text-rose-600 hover:text-rose-800"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Address Modal */}
              {showAddAddressModal && (
                <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
                    <h3 className="text-base font-black text-stone-900">Add New Delivery Address</h3>
                    <form onSubmit={handleAddAddressSubmit} className="space-y-3 text-xs">
                      <div>
                        <label className="block font-bold text-stone-700 mb-1">Address Label</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Home, Farmhouse, Studio"
                          value={newAddress.title}
                          onChange={(e) => setNewAddress({ ...newAddress, title: e.target.value })}
                          className="w-full border border-stone-200 rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 mb-1">Flat / Building / Street Address</label>
                        <textarea
                          required
                          rows={2}
                          placeholder="House No., Apartment name, Street"
                          value={newAddress.addressLine}
                          onChange={(e) => setNewAddress({ ...newAddress, addressLine: e.target.value })}
                          className="w-full border border-stone-200 rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-bold text-stone-700 mb-1">City</label>
                          <input
                            type="text"
                            required
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                            className="w-full border border-stone-200 rounded-xl p-2.5 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-stone-700 mb-1">Pincode</label>
                          <input
                            type="text"
                            required
                            placeholder="411001"
                            value={newAddress.pincode}
                            onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                            className="w-full border border-stone-200 rounded-xl p-2.5 font-mono outline-none"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-3 border-t border-stone-100">
                        <button
                          type="button"
                          onClick={() => setShowAddAddressModal(false)}
                          className="px-4 py-2 font-bold text-stone-600 hover:text-stone-800"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 font-bold text-white bg-emerald-800 rounded-xl hover:bg-emerald-900"
                        >
                          Save Address
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CONTACT US & HELPLINE */}
          {activeTab === 'contact' && (
            <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h3 className="text-lg font-black text-stone-900 tracking-tight">Contact Us & Customer Support</h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Reach our dedicated Ratnagiri agro team for harvest orders, logistics tracking, or farm visits.
                </p>
              </div>

              {/* Channels Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                    Phone & Helpline
                  </span>
                  <p className="font-black text-sm text-stone-900">+91 2352 250100</p>
                  <p className="text-[11px] text-stone-500">Mon - Sat, 08:00 AM - 08:00 PM</p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                    WhatsApp Desk
                  </span>
                  <p className="font-black text-sm text-emerald-950">+91 98220 11223</p>
                  <p className="text-[11px] text-stone-500">Instant harvest photos & order queries</p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                    Email Desk
                  </span>
                  <p className="font-black text-xs text-stone-900 font-mono">support@gogateproducts.com</p>
                  <p className="text-[11px] text-stone-500">Average response within 2 hours</p>
                </div>
              </div>

              {/* Orchard Location Info */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-700 space-y-1">
                <p className="font-bold text-stone-900">Farm Head Office & Processing Facility:</p>
                <p>Gogate Agro Orchards, Pawas Coastal Highway, Taluka Ratnagiri, Maharashtra 415616, India</p>
                <p className="text-stone-400 text-[11px]">GI Registration Tag: GI-MH-00129 • FSSAI Lic: 11521045000123</p>
              </div>

              {/* Submit Ticket Form */}
              <div className="pt-2 border-t border-stone-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
                  Send Customer Care Ticket
                </h4>

                {ticketSent ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Your ticket #TCK-2026-8812 has been recorded. Our team will contact you shortly!</span>
                  </div>
                ) : (
                  <form onSubmit={handleTicketSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Inquiry Topic</label>
                      <select
                        value={ticketSubject}
                        onChange={(e) => setTicketSubject(e.target.value)}
                        className="w-full text-xs border border-stone-200 rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                      >
                        <option>Order Delivery Inquiry</option>
                        <option>Alphonso Mango Pre-Order Clarification</option>
                        <option>Corporate Bulk & Gifting Orders</option>
                        <option>Cold-Chain Vehicle Temperature Log Request</option>
                        <option>Feedback & Quality Review</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Message Details</label>
                      <textarea
                        required
                        rows={3}
                        value={ticketMessage}
                        onChange={(e) => setTicketMessage(e.target.value)}
                        placeholder="Please write your message or query here..."
                        className="w-full text-xs border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-700 outline-none"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition shadow-xs flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: PRIVACY & DANGER ZONE */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs space-y-4">
                <h3 className="text-lg font-black text-stone-900 tracking-tight">Privacy & Data Governance</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Gogate Products adheres strictly to national personal data protection regulations. Your data is stored encrypted and only used to fulfill farm deliveries and cold-chain dispatches.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-stone-50 rounded-xl">
                    <span className="text-[10px] text-stone-400 uppercase font-bold block">Storage Duration</span>
                    <span className="font-semibold text-stone-800">Transactional logs retained for 90 days</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl">
                    <span className="text-[10px] text-stone-400 uppercase font-bold block">Encryption</span>
                    <span className="font-semibold text-stone-800">TLS 1.3 / AES-256 for all communications</span>
                  </div>
                </div>
              </div>

              {/* Danger Zone: Delete Account */}
              <div className="bg-rose-50/70 border border-rose-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-rose-800">
                  <AlertTriangle className="w-5 h-5 text-rose-700" />
                  <h3 className="font-black text-base">Danger Zone: Permanent Account Deletion</h3>
                </div>
                <p className="text-xs text-rose-700 leading-relaxed">
                  Permanently delete your customer account. All saved delivery addresses, past order history, and store credit balance (₹450.00) will be irrevocably purged.
                </p>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="px-5 py-2.5 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  Delete My Account Permanently
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-4">
            <h3 className="text-lg font-black text-rose-900">Confirm Account Deletion</h3>
            <p className="text-xs text-stone-600">
              To proceed with permanent deletion, type <strong className="text-rose-700">DELETE MY ACCOUNT</strong> below:
            </p>

            <form onSubmit={handleDeleteAccount} className="space-y-4">
              <input
                type="text"
                required
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder="Type DELETE MY ACCOUNT"
                className="w-full text-xs font-bold border border-rose-300 rounded-xl p-3 focus:ring-2 focus:ring-rose-600 outline-none"
              />

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={deleteConfirmation !== 'DELETE MY ACCOUNT'}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-rose-700 hover:bg-rose-800 disabled:opacity-40 rounded-xl transition shadow-xs"
                >
                  Confirm & Erase All Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CustomerAccountPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-stone-400">Loading Account Portal...</div>}>
      <AccountContent />
    </Suspense>
  );
}
