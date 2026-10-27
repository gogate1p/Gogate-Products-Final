'use client';

import { useState, useEffect } from 'react';

const offers = [
  '🎉 USE CODE: HAPUS200 — Get ₹200 OFF on your first 1 Dozen Ratnagiri Alphonso Mango box!',
  '⚡ QUICK DELIVERY: 15-30 Min express delivery live in Pune & Mumbai local hubs!',
  '🥭 HARVEST ALERT: Pawas family orchard batches harvested this morning. Tree-ripened & carbide-free.',
  '🚚 FREE SHIPPING: Cold-chain linehaul delivery on all orders above ₹1,999!',
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
    <div className="bg-amber-400 text-stone-950 font-bold text-xs py-2 px-4 overflow-hidden border-b border-amber-500 shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-center w-full justify-center">
          <span className="bg-stone-950 text-amber-300 text-[10px] uppercase font-black px-2 py-0.5 rounded-full shrink-0">
            OFFER
          </span>
          <span className="transition-all duration-500 ease-in-out line-clamp-1">
            {offers[currentIdx]}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1 shrink-0 text-[10px]">
          {offers.map((_, i) => (
            <span
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition ${
                currentIdx === i ? 'bg-stone-950 scale-125' : 'bg-stone-950/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
