'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideItem {
  id: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
}

const slides: SlideItem[] = [
  {
    id: 1,
    eyebrow: '2026 Season · Harvest Live',
    title: 'GI-certified Ratnagiri Alphonso, picked this morning.',
    subtitle: 'From our 80-year-old family orchards in Pawas. Naturally tree-ripened, never carbide — and shipped in refrigerated containers.',
    ctaText: 'Pre-order a dozen',
    ctaLink: '/product/ratnagiri-alphonso-mango-grade-a',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1600',
  },
  {
    id: 2,
    eyebrow: 'Jumbo W180 · King Size',
    title: 'Wood-fire roasted Konkan cashews.',
    subtitle: 'Extra-large kernels hand-shelled from coastal red-soil orchards, lightly seasoned with natural sea salt.',
    ctaText: 'Shop cashews',
    ctaLink: '/product/konkan-jumbo-cashews-w180',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=1600',
  },
  {
    id: 3,
    eyebrow: 'Wild-Foraged Botanicals',
    title: 'Cold-pressed Kokum Agal, zero sugar.',
    subtitle: 'Wild Garcinia indica berries from the Konkan coast — for authentic sol kadhi and summer coolers.',
    ctaText: 'Order kokum agal',
    ctaLink: '/product/pure-kokum-agal-750ml',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1600',
  },
];

export default function HeroSlideshow() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [activeSlide]);

  const current = slides[activeSlide];
  const go = (delta: number) => setActiveSlide((prev) => (prev + delta + slides.length) % slides.length);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-forest-950 text-white min-h-[440px] sm:min-h-[500px] flex items-end">
      {/* Background images (cross-fade) */}
      {slides.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === activeSlide ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden={idx !== activeSlide}
        >
          <Image src={s.image} alt="" fill priority={idx === 0} sizes="100vw" className="object-cover" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950/95 via-forest-950/70 to-forest-950/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 to-transparent" />

      {/* Content */}
      <div key={current.id} className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl space-y-5 animate-fade-up">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-mango-300">
          <span className="w-6 h-px bg-mango-300" />
          {current.eyebrow}
        </span>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
          {current.title}
        </h1>
        <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-lg">{current.subtitle}</p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link href={current.ctaLink} className="btn-accent">
            {current.ctaText}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/#story" className="btn border border-white/30 text-white px-6 py-3 hover:bg-white/10">
            Our orchard story
          </Link>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-20 flex items-center gap-4">
        <div className="flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-1 rounded-full transition-all duration-500 ${activeSlide === idx ? 'w-10 bg-mango-400' : 'w-4 bg-white/40 hover:bg-white/70'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button onClick={() => go(-1)} aria-label="Previous slide" className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => go(1)} aria-label="Next slide" className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
