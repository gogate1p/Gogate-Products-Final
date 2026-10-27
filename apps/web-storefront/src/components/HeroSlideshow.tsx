'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SlideItem {
  id: number;
  tag: string;
  tagColor: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  bgGradient: string;
}

const slides: SlideItem[] = [
  {
    id: 1,
    tag: '🥭 2026 SEASON HARVEST LIVE',
    tagColor: 'bg-amber-400 text-stone-950',
    title: 'GI-Certified Ratnagiri Alphonso (Hapus)',
    subtitle: 'Direct from 80-year-old family orchards in Pawas. Naturally tree-ripened, zero carbide ripening. Packed in refrigerated cold containers.',
    ctaText: 'Pre-Order Mangoes (1 Dozen) ➔',
    ctaLink: '/product/ratnagiri-alphonso-mango-grade-a',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800',
    bgGradient: 'from-emerald-950 via-emerald-900 to-amber-950',
  },
  {
    id: 2,
    tag: '🥜 JUMBO W180 KING CASHEWS',
    tagColor: 'bg-emerald-500 text-white',
    title: 'Wood-Fire Roasted Devgad Cashews',
    subtitle: 'Extra large W180 cashew kernels hand-harvested from coastal red soil orchards. Lightly seasoned with natural sea salt.',
    ctaText: 'Shop Jumbo Cashews (500g) ➔',
    ctaLink: '/product/konkan-jumbo-cashews-w180',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=800',
    bgGradient: 'from-amber-950 via-stone-900 to-emerald-950',
  },
  {
    id: 3,
    tag: '🍷 WILD FORAGED COASTAL BOTANICALS',
    tagColor: 'bg-rose-500 text-white',
    title: 'Pure Cold-Pressed Kokum Agal (Zero Sugar)',
    subtitle: 'Wild Garcinia indica coastal berries cold-pressed for authentic Sol Kadhi, refreshing coolers, and natural digestive vitality.',
    ctaText: 'Order Kokum Agal (750ml) ➔',
    ctaLink: '/product/pure-kokum-agal-750ml',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800',
    bgGradient: 'from-rose-950 via-stone-900 to-purple-950',
  },
];

export default function HeroSlideshow() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = slides[activeSlide];

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-xl">
      <div className={`relative min-h-[340px] sm:min-h-[380px] bg-gradient-to-r ${current.bgGradient} p-6 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-700`}>
        {/* Background glow overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/30 pointer-events-none" />

        {/* Text Content */}
        <div className="relative z-10 max-w-xl space-y-3.5">
          <span className={`inline-block text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs ${current.tagColor}`}>
            {current.tag}
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {current.title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-lg">
            {current.subtitle}
          </p>
          <div className="pt-2 flex items-center gap-3">
            <Link
              href={current.ctaLink}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs sm:text-sm rounded-2xl transition shadow-lg inline-block"
            >
              {current.ctaText}
            </Link>
            <Link
              href="/track"
              className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-2xl border border-white/20 backdrop-blur-xs transition"
            >
              Live Tracking
            </Link>
          </div>
        </div>

        {/* Visual Product Image with Floating Tag */}
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 shrink-0">
          <Image
            src={current.image}
            alt={current.title}
            fill
            className="object-cover scale-105 hover:scale-110 transition duration-700"
            priority
          />
          <div className="absolute bottom-3 left-3 right-3 bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] text-center font-bold text-amber-300">
            🌿 100% Tree-Ripened • FSSAI Certified
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white text-sm flex items-center justify-center backdrop-blur-xs transition z-20"
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white text-sm flex items-center justify-center backdrop-blur-xs transition z-20"
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/40'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
