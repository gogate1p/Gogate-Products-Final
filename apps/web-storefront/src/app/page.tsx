'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeroSlideshow from '../components/HeroSlideshow';
import SellerRatingModal from '../components/SellerRatingModal';

interface OrganicItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price: number;
  mrp: number;
  fssaiNo: string;
  udyamNo: string;
  rating: number;
  ratingCount: number;
  isQuickDelivery: boolean;
  quickDeliveryEta: string;
  isBestseller?: boolean;
  isPreOrder?: boolean;
  harvestMonth?: string;
  origin: string;
  sellerName: string;
}

const catalog: OrganicItem[] = [
  {
    id: 'prod_1',
    slug: 'ratnagiri-alphonso-mango-grade-a',
    name: 'Original Ratnagiri Alphonso Mango (Hapus) - Grade A (1 Dozen)',
    category: 'MANGOES',
    description: 'Naturally tree-ripened, GI Tagged Alphonso Mangoes handpicked from our 80-year-old family orchards in Pawas, Ratnagiri.',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800',
    price: 1450,
    mrp: 1800,
    fssaiNo: '11521045000123',
    udyamNo: 'UDYAM-MH-27-0012345',
    rating: 4.9,
    ratingCount: 382,
    isQuickDelivery: true,
    quickDeliveryEta: '20 MINS',
    isBestseller: true,
    isPreOrder: true,
    harvestMonth: 'May 2026 Batch',
    origin: 'Pawas, Ratnagiri',
    sellerName: 'Gogate Organic Orchards (Flagship)',
  },
  {
    id: 'prod_2',
    slug: 'konkan-jumbo-cashews-w180',
    name: 'Konkan Jumbo Roasted & Salted Cashews - W180 King Size (500g)',
    category: 'CASHEWS',
    description: 'Hand-shelled Grade W180 King Size organic cashew nuts from coastal Konkan. Lightly wood-fire roasted with natural rock salt.',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=800',
    price: 799,
    mrp: 950,
    fssaiNo: '11521045000123',
    udyamNo: 'UDYAM-MH-27-0012345',
    rating: 4.8,
    ratingCount: 245,
    isQuickDelivery: true,
    quickDeliveryEta: '15 MINS',
    isBestseller: true,
    isPreOrder: false,
    origin: 'Ratnagiri, Maharashtra',
    sellerName: 'Gogate Organic Orchards (Flagship)',
  },
  {
    id: 'prod_3',
    slug: 'pure-kokum-agal-750ml',
    name: 'Pure Cold-Pressed Kokum Agal (Zero Sugar / Wild Foraged - 750ml)',
    category: 'KOKUM_PRODUCTS',
    description: 'Pure coastal Garcinia indica extract infused with natural sea salt. Ideal for traditional Sol Kadhi and organic tonics.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800',
    price: 260,
    mrp: 320,
    fssaiNo: '11521045000123',
    udyamNo: 'UDYAM-MH-27-0012345',
    rating: 4.9,
    ratingCount: 190,
    isQuickDelivery: true,
    quickDeliveryEta: '25 MINS',
    isPreOrder: false,
    origin: 'Konkan Coastline',
    sellerName: 'Devgad Cashew & Spice Guild',
  },
  {
    id: 'prod_4',
    slug: 'authentic-malvani-masala-500g',
    name: 'Stone-Pounded Konkan Malvani Special Masala (500g)',
    category: 'SPICES_AND_MASALAS',
    description: 'Handcrafted blend of 28 sun-dried organic spices including Dagad Phool, Star Anise, and Byadgi chillies.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800',
    price: 380,
    mrp: 450,
    fssaiNo: '11521045000123',
    udyamNo: 'UDYAM-MH-27-0012345',
    rating: 4.7,
    ratingCount: 142,
    isQuickDelivery: false,
    quickDeliveryEta: '1-2 Days',
    isPreOrder: false,
    origin: 'Sindhudurg, Maharashtra',
    sellerName: 'Devgad Cashew & Spice Guild',
  },
];

export default function SwiggyStyleStorefront() {
  const [deliveryMode, setDeliveryMode] = useState<'QUICK' | 'STANDARD'>('QUICK');
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({
    prod_1: 1,
    prod_2: 1,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [preOrderModalItem, setPreOrderModalItem] = useState<OrganicItem | null>(null);
  const [showSellerModal, setShowSellerModal] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShare = (item: OrganicItem) => {
    const shareUrl = `${window.location.origin}/product/${item.slug}`;
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: `Order fresh farm organic ${item.name} from Gogate Products!`,
        url: shareUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      showToast(`Link copied for ${item.name}! Share on WhatsApp.`);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const displayedItems =
    deliveryMode === 'QUICK'
      ? catalog.filter((item) => item.isQuickDelivery)
      : catalog;

  const totalCartCount = Object.values(cartQuantities).reduce((a, b) => a + b, 0);
  const totalCartAmount = Object.entries(cartQuantities).reduce((sum, [id, qty]) => {
    const product = catalog.find((p) => p.id === id);
    return sum + (product ? product.price * qty : 0);
  }, 0);

  return (
    <div className="space-y-6 pb-24">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold animate-fade-in flex items-center gap-2">
          <span>🥭</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SWIGGY / ZOMATO PROMOTIONAL HERO SLIDESHOW */}
      <HeroSlideshow />

      {/* DELIVERY MODE TOGGLE BAR */}
      <div className="bg-white rounded-3xl p-2 border border-stone-200 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setDeliveryMode('QUICK')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs font-black transition ${
              deliveryMode === 'QUICK'
                ? 'bg-amber-400 text-stone-950 shadow-sm'
                : 'text-stone-600 hover:bg-stone-50'
            }`}
          >
            <span className="text-base">⚡</span>
            <span>Quick Delivery (10-30 Mins)</span>
            <span className="text-[10px] bg-stone-950 text-white px-2 py-0.5 rounded-full font-bold">
              3 Items
            </span>
          </button>

          <button
            onClick={() => setDeliveryMode('STANDARD')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs font-black transition ${
              deliveryMode === 'STANDARD'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-stone-600 hover:bg-stone-50'
            }`}
          >
            <span className="text-base">🚚</span>
            <span>Standard Linehaul (1-2 Days)</span>
            <span className="text-[10px] bg-white text-emerald-900 px-2 py-0.5 rounded-full font-bold">
              All Produce
            </span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-3 pr-4 text-xs font-bold text-stone-500">
          <span>❄️ Temperature-controlled linehaul container (17.5°C)</span>
        </div>
      </div>

      {/* Product Section Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h2 className="text-xl font-black text-stone-900 tracking-tight">
            {deliveryMode === 'QUICK' ? '⚡ Quick 15-Min Delivery Near You' : '🚚 Full Harvest Catalog & Pre-Orders'}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {deliveryMode === 'QUICK'
              ? 'Ready-to-eat ripe Alphonso crates, chilled kokum agal, and roasted cashew jars'
              : 'Direct linehaul shipment with cold-chain refrigerated trucks from Ratnagiri'}
          </p>
        </div>
        <span className="text-xs font-bold text-stone-400 font-mono">
          {displayedItems.length} Products
        </span>
      </div>

      {/* SWIGGY / ZOMATO FOOD CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {displayedItems.map((item) => {
          const qty = cartQuantities[item.id] || 0;

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200 hover:border-emerald-700/50 hover:shadow-md transition flex gap-4 sm:gap-6 justify-between items-start"
            >
              {/* Left Column: Details */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="veg-badge" title="100% Pure Organic Veg">
                    <span className="veg-dot" />
                  </span>
                  {item.isBestseller && (
                    <span className="text-[10px] font-extrabold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
                      ★ Bestseller
                    </span>
                  )}
                  {item.isQuickDelivery && (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <span>⚡</span> {item.quickDeliveryEta}
                    </span>
                  )}
                </div>

                <Link href={`/product/${item.slug}`}>
                  <h3 className="font-extrabold text-stone-900 text-sm sm:text-base leading-snug hover:text-emerald-800 transition">
                    {item.name}
                  </h3>
                </Link>

                {/* Seller Name (Clickable to open Seller SLA & Rating Modal) */}
                <button
                  onClick={() => setShowSellerModal(true)}
                  className="text-[11px] font-bold text-emerald-800 hover:underline flex items-center gap-1"
                >
                  <span>By: {item.sellerName}</span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-900 px-1.5 py-0.2 rounded border border-emerald-200">
                    ★ 4.9 Rating ➔
                  </span>
                </button>

                <div className="flex items-baseline gap-2">
                  <span className="text-base font-black text-stone-900">₹{item.price}</span>
                  <span className="text-xs text-stone-400 line-through">₹{item.mrp}</span>
                </div>

                <div className="flex items-center gap-1 text-xs">
                  <span className="bg-emerald-700 text-white font-bold text-[10px] px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    ★ {item.rating}
                  </span>
                  <span className="text-[11px] text-stone-400 font-medium">({item.ratingCount} reviews)</span>
                </div>

                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleShare(item)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-xl transition"
                    title="Share item"
                  >
                    <span>📤</span> Share
                  </button>

                  {item.isPreOrder && (
                    <button
                      onClick={() => setPreOrderModalItem(item)}
                      className="text-[11px] font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-xl transition"
                    >
                      🥭 Pre-Order Info
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column: Image & Add Button */}
              <div className="relative w-32 sm:w-36 flex flex-col items-center shrink-0">
                <div className="relative w-32 h-28 sm:w-36 sm:h-32 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="absolute -bottom-3 z-10 w-24">
                  {qty === 0 ? (
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-full py-2 bg-white text-emerald-800 font-black text-xs uppercase tracking-wider rounded-xl border border-stone-200 hover:bg-emerald-50 shadow-md transition text-center"
                    >
                      ADD +
                    </button>
                  ) : (
                    <div className="w-full py-1.5 bg-emerald-800 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-between px-2.5">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="text-white hover:text-amber-300 font-black text-sm"
                      >
                        -
                      </button>
                      <span className="font-mono">{qty}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-white hover:text-amber-300 font-black text-sm"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SWIGGY STICKY FLOATING CART BAR */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 max-w-2xl mx-auto z-40 animate-slide-up">
          <div className="bg-emerald-950 text-white p-4 rounded-3xl shadow-2xl flex items-center justify-between border border-emerald-800 backdrop-blur-md">
            <div>
              <p className="font-black text-sm">
                {totalCartCount} ITEM{totalCartCount > 1 ? 'S' : ''} | ₹{totalCartAmount.toFixed(2)}
              </p>
              <p className="text-[11px] text-emerald-300">
                {deliveryMode === 'QUICK' ? '⚡ 15-30 Mins Express Delivery' : '🚚 Cold-Chain Linehaul Delivery'}
              </p>
            </div>
            <Link
              href="/cart"
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black rounded-2xl text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              <span>View Cart</span>
              <span>➔</span>
            </Link>
          </div>
        </div>
      )}

      {/* Seller Reputation & SLA Modal */}
      <SellerRatingModal
        isOpen={showSellerModal}
        onClose={() => setShowSellerModal(false)}
      />

      {/* Pre-order Explanation Modal */}
      {preOrderModalItem && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🥭</span>
              <h3 className="font-black text-stone-900 text-base">Alphonso Mango Pre-Order</h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Tree-ripened Pawas Hapus Mangoes. Flowering batches are tracked on our orchard tree logs.
            </p>
            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1">
              <p><strong>Harvest Batch:</strong> May 2026 Direct Picking</p>
              <p><strong>Price Lock:</strong> ₹{preOrderModalItem.price} (No price spikes)</p>
              <p><strong>Transit:</strong> Delivered within 24h of harvest in cold-chain containers</p>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
              <button
                onClick={() => setPreOrderModalItem(null)}
                className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-800"
              >
                Close
              </button>
              <button
                onClick={() => {
                  updateQuantity(preOrderModalItem.id, 1);
                  setPreOrderModalItem(null);
                  showToast('Pre-order added to your basket!');
                }}
                className="px-5 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold"
              >
                Add Pre-Order Box
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
