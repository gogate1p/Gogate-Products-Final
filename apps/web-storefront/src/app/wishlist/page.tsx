'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, X, MapPin, ShoppingBag } from 'lucide-react';

interface WishlistItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  mrp: number;
  image: string;
  fssaiNo: string;
  origin: string;
}

const initialWishlist: WishlistItem[] = [
  {
    id: 'prod_1',
    slug: 'ratnagiri-alphonso-mango-grade-a',
    name: 'Original Ratnagiri Alphonso Mango (Hapus) - Grade A (1 Dozen)',
    price: 1450,
    mrp: 1800,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800',
    fssaiNo: '11521045000123',
    origin: 'Pawas Orchards, Ratnagiri',
  },
  {
    id: 'prod_3',
    slug: 'pure-kokum-agal-750ml',
    name: 'Pure Cold-Pressed Kokum Agal (Zero Sugar / Wild Foraged - 750ml)',
    price: 260,
    mrp: 320,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800',
    fssaiNo: '11521045000123',
    origin: 'Konkan Coastline',
  },
];

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>(initialWishlist);

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow">Saved for later</p>
        <h1 className="heading-display text-3xl sm:text-4xl mt-2">
          Wishlist <span className="text-stone-400 font-normal">({items.length})</span>
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="card text-center py-20 px-6">
          <span className="w-16 h-16 rounded-full bg-forest-50 text-forest-700 inline-flex items-center justify-center">
            <Heart className="w-7 h-7" />
          </span>
          <h2 className="heading-display text-2xl mt-6">Nothing saved yet</h2>
          <p className="text-sm text-stone-500 mt-2 mb-6">Explore this season’s mangoes, cashews and coastal produce.</p>
          <Link href="/" className="btn-primary">Explore the harvest</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <article key={item.id} className="group card overflow-hidden flex flex-col">
              <div className="relative aspect-square bg-cream-200 overflow-hidden">
                <Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove from wishlist"
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center text-stone-600 hover:text-rose-700 shadow-soft transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <p className="flex items-center gap-1 text-xs text-stone-500">
                  <MapPin className="w-3 h-3" /> {item.origin}
                </p>
                <Link href={`/product/${item.slug}`} className="mt-2">
                  <h3 className="font-semibold text-forest-950 leading-snug line-clamp-2 hover:text-forest-700">{item.name}</h3>
                </Link>
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-lg font-bold text-forest-950">₹{item.price.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-stone-400 line-through">₹{item.mrp.toLocaleString('en-IN')}</span>
                </div>
                <Link href={`/product/${item.slug}`} className="btn-primary w-full mt-4 py-2.5">
                  <ShoppingBag className="w-4 h-4" /> Move to basket
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
