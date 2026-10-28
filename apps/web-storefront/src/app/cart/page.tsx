'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, Truck, Store, Lock, ArrowRight, ShoppingBag } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  weightGrams: number;
}

const initialCart: CartItem[] = [
  {
    id: 'prod_1',
    name: 'Original Ratnagiri Alphonso Mango (Hapus) - Grade A (1 Dozen)',
    price: 1450,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800',
    weightGrams: 3200,
  },
  {
    id: 'prod_2',
    name: 'Konkan Jumbo Roasted & Salted Cashews - W180 (500g)',
    price: 799,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=800',
    weightGrams: 500,
  },
];

const FREE_SHIPPING_THRESHOLD = 2000;

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(initialCart);
  const [deliveryType, setDeliveryType] = useState<'SHIPPING' | 'STORE_PICKUP'>('SHIPPING');

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
    );
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const subtotal = items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const shippingFee = deliveryType === 'STORE_PICKUP' ? 0 : subtotal > FREE_SHIPPING_THRESHOLD ? 0 : 80;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shippingFee + tax;
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const fmt = (n: number) => `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <span className="w-16 h-16 rounded-full bg-forest-50 text-forest-700 inline-flex items-center justify-center">
          <ShoppingBag className="w-7 h-7" />
        </span>
        <h1 className="heading-display text-3xl mt-6">Your basket is empty</h1>
        <p className="text-sm text-stone-500 mt-2">This season’s Alphonso harvest is live — don’t miss out.</p>
        <Link href="/" className="btn-primary mt-6">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow">Step 1 of 2</p>
        <h1 className="heading-display text-3xl sm:text-4xl mt-2">Your basket</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          {/* Free shipping progress */}
          {deliveryType === 'SHIPPING' && (
            <div className="card p-5">
              <p className="text-sm text-forest-900">
                {subtotal > FREE_SHIPPING_THRESHOLD ? (
                  <span className="font-semibold">You’ve unlocked free cold-chain shipping.</span>
                ) : (
                  <>Add <span className="font-semibold">₹{(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString('en-IN')}</span> more for free cold-chain shipping.</>
                )}
              </p>
              <div className="mt-3 h-1.5 rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full rounded-full bg-forest-700 transition-all duration-500" style={{ width: `${freeShippingProgress}%` }} />
              </div>
            </div>
          )}

          {/* Items */}
          <div className="card divide-y divide-stone-100">
            {items.map((item) => (
              <div key={item.id} className="p-5 flex gap-4 sm:gap-5">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-cream-200 shrink-0">
                  <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-forest-950 leading-snug line-clamp-2">{item.name}</h3>
                      <p className="text-xs text-stone-500 mt-1">{item.weightGrams.toLocaleString('en-IN')} g · Farm-direct</p>
                    </div>
                    <p className="font-semibold text-forest-950 whitespace-nowrap">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="mt-auto pt-3 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border border-stone-200">
                      <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity" className="w-9 h-9 flex items-center justify-center text-stone-600 hover:text-forest-900 disabled:opacity-40" disabled={item.quantity <= 1}>
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold tabular-nums">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity" className="w-9 h-9 flex items-center justify-center text-stone-600 hover:text-forest-900">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-rose-700 transition">
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery method */}
          <div className="card p-6 space-y-4">
            <h2 className="font-semibold text-forest-950">Delivery method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: 'SHIPPING' as const, icon: Truck, title: 'Doorstep delivery', text: 'Refrigerated fleet & priority couriers', badge: null },
                { key: 'STORE_PICKUP' as const, icon: Store, title: 'Click & collect', text: 'Gogate Orchards flagship, Pawas', badge: 'Free' },
              ].map(({ key, icon: Icon, title, text, badge }) => {
                const active = deliveryType === key;
                return (
                  <label
                    key={key}
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                      active ? 'border-forest-700 bg-forest-50/60 ring-1 ring-forest-700' : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <input type="radio" name="delivery" checked={active} onChange={() => setDeliveryType(key)} className="sr-only" />
                    <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${active ? 'bg-forest-800 text-white' : 'bg-stone-100 text-stone-600'}`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="flex-1">
                      <span className="flex items-center gap-2 text-sm font-semibold text-forest-950">
                        {title}
                        {badge && <span className="chip bg-mango-100 text-mango-600 py-0.5">{badge}</span>}
                      </span>
                      <span className="block text-xs text-stone-500 mt-0.5">{text}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Summary */}
        <aside className="card p-6 space-y-5 lg:sticky lg:top-36">
          <h2 className="heading-display text-xl">Order summary</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between text-stone-600">
              <dt>Subtotal</dt>
              <dd className="font-medium text-forest-950">{fmt(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-stone-600">
              <dt>Shipping</dt>
              <dd className="font-medium text-forest-700">{shippingFee === 0 ? 'Free' : fmt(shippingFee)}</dd>
            </div>
            <div className="flex justify-between text-stone-600">
              <dt>GST (5%)</dt>
              <dd className="font-medium text-forest-950">{fmt(tax)}</dd>
            </div>
            <div className="border-t border-stone-200 pt-4 flex justify-between items-baseline">
              <dt className="font-semibold text-forest-950">Total</dt>
              <dd className="text-2xl font-bold text-forest-950">{fmt(total)}</dd>
            </div>
          </dl>

          <Link href="/checkout" className="btn-primary w-full py-3.5">
            Proceed to checkout <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="flex items-center justify-center gap-1.5 text-xs text-stone-500">
            <Lock className="w-3.5 h-3.5" /> Secure 256-bit SSL checkout
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {['Razorpay', 'Paytm', 'Cashfree', 'Easebuzz', 'PayU'].map((g) => (
              <span key={g} className="text-[10px] font-medium px-2 py-1 rounded-md bg-cream-100 border border-stone-200 text-stone-600">{g}</span>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
