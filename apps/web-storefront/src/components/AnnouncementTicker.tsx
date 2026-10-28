'use client';

import { useState, useEffect } from 'react';

const offers = [
  'Use code HAPUS200 for ₹200 off your first dozen Ratnagiri Alphonso',
  'Express 15–30 minute delivery now live across Pune & Mumbai',
  'This morning’s Pawas harvest is in — tree-ripened and carbide-free',
  'Free express delivery on all orders above ₹1,999',
];

export default function AnnouncementTicker() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % offers.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-forest-950 text-forest-50 text-xs py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <span className="hidden sm:inline text-[10px] uppercase tracking-[0.2em] font-semibold text-mango-300">
          Harvest 2026
        </span>
        <span className="hidden sm:inline w-px h-3 bg-white/20" />
        <span key={currentIdx} className="animate-fade-up line-clamp-1 font-medium text-center">
          {offers[currentIdx]}
        </span>
      </div>
    </div>
  );
}
