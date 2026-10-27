'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CustomerAccountPage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [accountDeleted, setAccountDeleted] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const handleDeleteAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (deleteConfirmation === 'DELETE MY ACCOUNT') {
      setAccountDeleted(true);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">Customer Account & Privacy</h1>
        <p className="text-xs text-stone-500 mt-1">Manage personal data, stored addresses, store credits, and account deletion</p>
      </div>

      {accountDeleted ? (
        <div className="bg-rose-50 border border-rose-200 rounded-3xl p-8 text-center space-y-3">
          <span className="text-4xl block">🗑️</span>
          <h2 className="text-xl font-bold text-rose-900">Your Account Has Been Permanently Deleted</h2>
          <p className="text-xs text-rose-700 max-w-md mx-auto">
            All stored shipping addresses, order references, and personal data have been completely erased from our databases in compliance with data privacy regulations.
          </p>
          <Link href="/" className="inline-block mt-4 px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold">
            Return to Storefront
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Profile Overview */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider">Profile Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block text-[10px]">Name:</span>
                <span className="font-bold text-stone-900 text-sm">Ananya Sharma</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block text-[10px]">Mobile Phone:</span>
                <span className="font-bold text-stone-900 font-mono text-sm">+91 99887 76655</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block text-[10px]">Email Address:</span>
                <span className="font-medium text-stone-900">ananya.sharma@example.com</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="text-emerald-800 block text-[10px] font-bold">Available Store Credit Balance:</span>
                <span className="font-black text-emerald-900 text-base">₹450.00</span>
              </div>
            </div>
          </div>

          {/* Danger Zone: Delete Account */}
          <div className="bg-rose-50/60 border border-rose-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-3">
            <h3 className="font-bold text-rose-900 text-sm uppercase tracking-wider">Danger Zone</h3>
            <p className="text-xs text-rose-700 leading-relaxed">
              Permanently delete your Gogate Products customer account. This action cannot be undone. All active orders, saved addresses, and remaining store credits will be permanently removed.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2.5 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              ⚠️ Delete My Account Permanently
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-4">
            <h3 className="text-lg font-black text-rose-900">Confirm Account Deletion</h3>
            <p className="text-xs text-stone-600">
              To confirm, please type <strong className="text-rose-700">DELETE MY ACCOUNT</strong> into the box below:
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
