'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LightboxAnnouncementModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem('gogate_poster_dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = (dontShowAgain = false) => {
    setIsOpen(false);
    if (dontShowAgain) {
      sessionStorage.setItem('gogate_poster_dismissed', 'true');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200">
        {/* Close Button */}
        <button
          onClick={() => handleDismiss(false)}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white text-xs flex items-center justify-center backdrop-blur-xs transition"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Poster Top Banner Image */}
        <div className="relative aspect-[16/9] w-full bg-stone-900">
          <Image
            src="https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800"
            alt="2026 Alphonso Mango Season"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent flex flex-col justify-end p-5">
            <span className="bg-amber-400 text-stone-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider w-fit mb-1">
              SEASON POSTER & ANNOUNCEMENT
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              2026 Ratnagiri Hapus Harvest is Live!
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-stone-600 leading-relaxed">
            The first flowering flush in our Pawas family orchards has matured. Pre-order your Grade A Alphonso mango crates with authentic GI-Tag certification and guaranteed cold-chain arrival.
          </p>

          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-800 block">Season Welcome Offer</span>
              <p className="font-mono font-black text-stone-900 text-sm">COUPON: HAPUS200</p>
              <p className="text-[11px] text-amber-900">Flat ₹200 OFF on all 1-Dozen & 2-Dozen orders</p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText('HAPUS200');
                alert('Coupon HAPUS200 copied to clipboard!');
              }}
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-black rounded-xl transition shadow-2xs"
            >
              Copy Code
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => handleDismiss(true)}
              className="text-[11px] text-stone-400 hover:text-stone-600 underline"
            >
              Don't show again in this session
            </button>

            <Link
              href="/product/ratnagiri-alphonso-mango-grade-a"
              onClick={() => handleDismiss(false)}
              className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs rounded-xl shadow-md transition"
            >
              Order Hapus Mangoes Now ➔
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
