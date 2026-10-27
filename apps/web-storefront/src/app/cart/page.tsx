'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(initialCart);
  const [deliveryType, setDeliveryType] = useState<'SHIPPING' | 'STORE_PICKUP'>('SHIPPING');

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const shippingFee = deliveryType === 'STORE_PICKUP' ? 0 : subtotal > 2000 ? 0 : 80;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shippingFee + tax;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">Your Harvest Basket</h1>
        <p className="text-xs text-stone-500 mt-1">Farm direct fresh items from Pawas, Ratnagiri orchards</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 shadow-xs overflow-hidden">
            {items.map((item) => (
              <div key={item.id} className="p-4 sm:p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm">{item.name}</h3>
                    <p className="text-xs text-stone-400">{item.weightGrams}g • Organic</p>
                    <p className="text-sm font-black text-emerald-800 mt-1">₹{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden text-xs">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-2.5 py-1 text-stone-600 hover:bg-stone-100 font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 font-bold text-stone-900">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-2.5 py-1 text-stone-600 hover:bg-stone-100 font-bold"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-bold text-stone-900 text-sm">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Method Choice */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
            <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
              Choose Delivery Option
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                onClick={() => setDeliveryType('SHIPPING')}
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                  deliveryType === 'SHIPPING'
                    ? 'border-emerald-700 bg-emerald-50/70 ring-1 ring-emerald-700'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryType === 'SHIPPING'}
                  onChange={() => setDeliveryType('SHIPPING')}
                  className="mt-0.5 text-emerald-700"
                />
                <div>
                  <p className="font-bold text-xs text-stone-900">Doorstep Delivery (Cold Chain)</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Dispatched via refrigerated fleet & priority couriers
                  </p>
                </div>
              </label>

              <label
                onClick={() => setDeliveryType('STORE_PICKUP')}
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                  deliveryType === 'STORE_PICKUP'
                    ? 'border-purple-700 bg-purple-50/70 ring-1 ring-purple-700'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryType === 'STORE_PICKUP'}
                  onChange={() => setDeliveryType('STORE_PICKUP')}
                  className="mt-0.5 text-purple-700"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-xs text-stone-900">Store Pickup (Click & Collect)</p>
                    <span className="text-[9px] bg-purple-200 text-purple-900 font-bold px-1.5 py-0.5 rounded">
                      Free
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Collect from Gogate Orchards Flagship counter (Pawas)
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4 h-fit">
          <h3 className="font-bold text-stone-900 text-base">Order Summary</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Items Subtotal</span>
              <span className="font-semibold text-stone-900">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Estimated Shipping</span>
              <span className="font-semibold text-emerald-800">
                {shippingFee === 0 ? 'FREE' : `₹${shippingFee.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>GST (5%)</span>
              <span className="font-semibold text-stone-900">₹{tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-stone-200 pt-3 flex justify-between text-sm font-bold text-stone-900">
              <span>Grand Total</span>
              <span className="text-emerald-800 text-lg">₹{total.toFixed(2)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="block w-full text-center py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-sm transition shadow-md"
          >
            Proceed to Checkout →
          </Link>

          <p className="text-[11px] text-stone-400 text-center">
            🔒 256-bit SSL encrypted. Supports Razorpay, Paytm, Cashfree, Easebuzz, PayU.
          </p>
        </div>
      </div>
    </div>
  );
}
