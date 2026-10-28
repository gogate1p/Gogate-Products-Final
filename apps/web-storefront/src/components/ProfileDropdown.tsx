'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Package,
  MapPin,
  Headphones,
  UserCog,
  Heart,
  CreditCard,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click or ESC key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full border transition-all duration-200 outline-none select-none ${
          isOpen
            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-sm ring-2 ring-emerald-600/20'
            : 'bg-white border-stone-200 text-stone-800 hover:border-emerald-600/40 hover:bg-stone-50'
        }`}
      >
        {/* User Avatar Circle */}
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-800 to-teal-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
          AS
        </div>

        {/* User Label */}
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-bold leading-tight text-stone-900">Ananya S.</span>
          <span className="text-[10px] text-emerald-700 font-semibold leading-none flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5 inline" /> Member
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-emerald-800' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu Modal / Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-stone-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* User Account Header Brief */}
          <div className="px-4 py-3 border-b border-stone-100 bg-gradient-to-b from-stone-50/80 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                AS
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-stone-900 text-sm truncate">Ananya Sharma</h4>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 shrink-0">
                    Verified
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 truncate">ananya.sharma@example.com</p>
              </div>
            </div>

            {/* Quick Wallet / Store Credit Strip */}
            <div className="mt-2.5 pt-2 border-t border-stone-100/80 flex items-center justify-between text-xs">
              <span className="text-stone-500 text-[11px] font-medium flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
                Store Credits
              </span>
              <span className="font-bold text-emerald-800 font-mono text-xs">₹450.00</span>
            </div>
          </div>

          {/* Primary Navigation Options */}
          <div className="py-1.5 px-2 space-y-0.5">
            {/* 1. My Orders */}
            <Link
              href="/track"
              onClick={handleLinkClick}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100/80 transition"
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4 text-emerald-700" />
                <span>My Orders</span>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-900 rounded-full">
                1 In Transit
              </span>
            </Link>

            {/* 2. Address */}
            <Link
              href="/account?tab=address"
              onClick={handleLinkClick}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100/80 transition"
            >
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <span>Saved Addresses</span>
              </div>
              <span className="text-[10px] text-stone-400 font-normal">2 Saved</span>
            </Link>

            {/* 3. Contact Us */}
            <Link
              href="/account?tab=contact"
              onClick={handleLinkClick}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100/80 transition"
            >
              <div className="flex items-center gap-2.5">
                <Headphones className="w-4 h-4 text-emerald-700" />
                <span>Contact Us & Helpline</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold">24/7 Live</span>
            </Link>

            {/* 4. Edit Profile */}
            <Link
              href="/account?tab=profile"
              onClick={handleLinkClick}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100/80 transition"
            >
              <div className="flex items-center gap-2.5">
                <UserCog className="w-4 h-4 text-emerald-700" />
                <span>Edit Profile</span>
              </div>
              <span className="text-[10px] text-stone-400 font-normal">Security & Info</span>
            </Link>
          </div>

          {/* Secondary Actions: Wishlist & Account */}
          <div className="py-1 px-2 border-t border-stone-100 space-y-0.5">
            <Link
              href="/wishlist"
              onClick={handleLinkClick}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100/80 transition"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>My Wishlist</span>
            </Link>

            <Link
              href="/account?tab=privacy"
              onClick={handleLinkClick}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100/80 transition"
            >
              <ShieldCheck className="w-4 h-4 text-stone-500" />
              <span>Privacy & Account Settings</span>
            </Link>
          </div>

          {/* Sign Out Action */}
          <div className="pt-1.5 pb-1 px-2 border-t border-stone-100">
            <Link
              href="/login"
              onClick={handleLinkClick}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-stone-500 hover:text-rose-700 hover:bg-rose-50/70 transition w-full"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out / Switch Account</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
