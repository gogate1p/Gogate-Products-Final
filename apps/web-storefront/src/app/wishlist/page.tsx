'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">Your Wishlist ({items.length})</h1>
        <p className="text-xs text-stone-500 mt-1">Saved organic produce to purchase later</p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200">
          <span className="text-4xl block mb-2">🤍</span>
          <h3 className="font-bold text-stone-900">Your wishlist is empty</h3>
          <p className="text-xs text-stone-500 mt-1 mb-4">Explore our seasonal mangoes and cashews catalog.</p>
          <Link
            href="/"
            className="px-5 py-2.5 bg-emerald-800 text-white rounded-xl text-xs font-bold hover:bg-emerald-900"
          >
            Explore Organic Produce
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square w-full bg-stone-100">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-xs flex items-center justify-center hover:bg-white text-stone-600 shadow-sm"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    📍 {item.origin}
                  </span>
                  <Link href={`/product/${item.slug}`}>
                    <h3 className="font-bold text-stone-900 text-sm line-clamp-2 hover:text-emerald-800">
                      {item.name}
                    </h3>
                  </Link>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-base font-black text-stone-900">₹{item.price}</span>
                    <span className="text-xs text-stone-400 line-through">₹{item.mrp}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <Link
                  href={`/product/${item.slug}`}
                  className="block w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-center text-xs font-bold rounded-xl transition"
                >
                  Move to Basket
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
