'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeroSlideshow from '../components/HeroSlideshow';
import SellerRatingModal from '../components/SellerRatingModal';
import { Zap, Truck, Share2, Star, Plus, Minus, ArrowRight, Check, X, MapPin } from 'lucide-react';

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

const categories = [
  { key: 'ALL', label: 'All Produce' },
  { key: 'MANGOES', label: 'Mangoes' },
  { key: 'CASHEWS', label: 'Cashews' },
  { key: 'KOKUM_PRODUCTS', label: 'Kokum' },
  { key: 'SPICES_AND_MASALAS', label: 'Spices' },
];

const categoryTiles = [
  { key: 'MANGOES', label: 'Alphonso Mangoes', note: 'GI-certified Hapus', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=600' },
  { key: 'CASHEWS', label: 'Konkan Cashews', note: 'W180 king size', image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=600' },
  { key: 'KOKUM_PRODUCTS', label: 'Kokum & Coolers', note: 'Wild-foraged', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600' },
  { key: 'SPICES_AND_MASALAS', label: 'Malvani Spices', note: 'Stone-pounded', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600' },
];

export default function StorefrontHome() {
  const [deliveryMode, setDeliveryMode] = useState<'QUICK' | 'STANDARD'>('STANDARD');
  const [activeCategory, setActiveCategory] = useState('ALL');
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
      showToast('Product link copied to clipboard');
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

  const displayedItems = catalog
    .filter((item) => (deliveryMode === 'QUICK' ? item.isQuickDelivery : true))
    .filter((item) => (activeCategory === 'ALL' ? true : item.category === activeCategory));

  const totalCartCount = Object.values(cartQuantities).reduce((a, b) => a + b, 0);
  const totalCartAmount = Object.entries(cartQuantities).reduce((sum, [id, qty]) => {
    const product = catalog.find((p) => p.id === id);
    return sum + (product ? product.price * qty : 0);
  }, 0);

  const scrollToCatalog = (category: string) => {
    setActiveCategory(category);
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-16 sm:space-y-20 pb-24">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-28 right-6 z-50 bg-forest-950 text-white pl-3 pr-5 py-3 rounded-full shadow-lift text-sm font-medium animate-fade-up flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-mango-400 text-forest-950 flex items-center justify-center">
            <Check className="w-3.5 h-3.5" />
          </span>
          {toastMessage}
        </div>
      )}

      {/* HERO */}
      <HeroSlideshow />

      {/* SHOP BY CATEGORY */}
      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Shop by category</p>
            <h2 className="heading-display text-3xl sm:text-4xl mt-2">From our orchards to your table</h2>
          </div>
          <button onClick={() => scrollToCatalog('ALL')} className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-forest-800 hover:gap-2.5 transition-all">
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {categoryTiles.map((tile) => (
            <button
              key={tile.key}
              onClick={() => scrollToCatalog(tile.key)}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
            >
              <Image src={tile.image} alt={tile.label} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                <p className="text-[11px] uppercase tracking-[0.18em] text-mango-300 font-semibold">{tile.note}</p>
                <p className="font-display text-xl sm:text-2xl font-semibold mt-1 flex items-center justify-between">
                  {tile.label}
                  <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition" />
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="space-y-6 scroll-mt-32">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div>
            <p className="eyebrow">{deliveryMode === 'QUICK' ? 'Express delivery' : 'Full harvest catalog'}</p>
            <h2 className="heading-display text-3xl sm:text-4xl mt-2">
              {deliveryMode === 'QUICK' ? 'At your door in 30 minutes' : 'This season’s harvest'}
            </h2>
            <p className="text-sm text-stone-500 mt-2 max-w-xl">
              {deliveryMode === 'QUICK'
                ? 'Ready-to-eat Alphonso crates, chilled kokum and roasted cashews from your nearest hub.'
                : 'Shipped direct from Ratnagiri in temperature-controlled reefer trucks.'}
            </p>
          </div>

          {/* Delivery mode segmented control */}
          <div className="inline-flex p-1 bg-white border border-stone-200 rounded-full shadow-soft self-start lg:self-auto">
            <button
              onClick={() => setDeliveryMode('STANDARD')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                deliveryMode === 'STANDARD' ? 'bg-forest-800 text-white shadow-soft' : 'text-stone-600 hover:text-forest-900'
              }`}
            >
              <Truck className="w-4 h-4" />
              Cold-chain · 1–2 days
            </button>
            <button
              onClick={() => setDeliveryMode('QUICK')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                deliveryMode === 'QUICK' ? 'bg-mango-400 text-forest-950 shadow-soft' : 'text-stone-600 hover:text-forest-900'
              }`}
            >
              <Zap className="w-4 h-4" />
              Express · 30 min
            </button>
          </div>
        </div>

        {/* Category filter chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCategory(c.key)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition ${
                activeCategory === c.key
                  ? 'bg-forest-950 text-white border-forest-950'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-forest-700 hover:text-forest-900'
              }`}
            >
              {c.label}
            </button>
          ))}
          <span className="ml-auto text-xs text-stone-400 whitespace-nowrap pl-4">{displayedItems.length} products</span>
        </div>

        {/* Product grid */}
        {displayedItems.length === 0 ? (
          <div className="card py-16 text-center">
            <p className="heading-display text-xl">Nothing here for express delivery yet</p>
            <p className="text-sm text-stone-500 mt-2">Switch to cold-chain delivery to see the full catalog.</p>
            <button onClick={() => setDeliveryMode('STANDARD')} className="btn-primary mt-5">Show full catalog</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {displayedItems.map((item) => {
              const qty = cartQuantities[item.id] || 0;
              const discount = Math.round(((item.mrp - item.price) / item.mrp) * 100);

              return (
                <article key={item.id} className="group card overflow-hidden flex flex-col hover:shadow-lift hover:-translate-y-0.5 transition duration-300">
                  {/* Image */}
                  <div className="relative aspect-square bg-cream-200 overflow-hidden">
                    <Link href={`/product/${item.slug}`} aria-label={item.name}>
                      <Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    </Link>
                    <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
                      {item.isBestseller && <span className="chip bg-white/95 text-forest-900 shadow-soft">Bestseller</span>}
                      {discount > 0 && <span className="chip bg-mango-400 text-forest-950">{discount}% off</span>}
                    </div>
                    <button
                      onClick={() => handleShare(item)}
                      aria-label="Share product"
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 text-forest-900 flex items-center justify-center shadow-soft opacity-0 group-hover:opacity-100 focus:opacity-100 transition"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    {item.isQuickDelivery && (
                      <span className="absolute bottom-3 left-3 chip bg-forest-950/85 text-white backdrop-blur">
                        <Zap className="w-3 h-3 text-mango-300" /> {item.quickDeliveryEta.toLowerCase()}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-2 text-xs text-stone-500">
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 shrink-0" /> {item.origin}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-forest-900 shrink-0">
                        <Star className="w-3.5 h-3.5 fill-mango-400 text-mango-400" />
                        {item.rating}
                        <span className="font-normal text-stone-400">({item.ratingCount})</span>
                      </span>
                    </div>

                    <Link href={`/product/${item.slug}`} className="mt-2">
                      <h3 className="font-semibold text-forest-950 leading-snug line-clamp-2 hover:text-forest-700 transition">
                        {item.name}
                      </h3>
                    </Link>

                    <button
                      onClick={() => setShowSellerModal(true)}
                      className="mt-1.5 text-xs text-stone-500 hover:text-forest-800 text-left truncate"
                    >
                      by <span className="underline decoration-stone-300 underline-offset-2">{item.sellerName}</span>
                    </button>

                    {item.isPreOrder && (
                      <button
                        onClick={() => setPreOrderModalItem(item)}
                        className="mt-3 self-start chip bg-mango-50 text-mango-600 border border-mango-100 hover:bg-mango-100"
                      >
                        Pre-order · {item.harvestMonth}
                      </button>
                    )}

                    <div className="mt-auto pt-4 flex items-center justify-between gap-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-forest-950">₹{item.price.toLocaleString('en-IN')}</span>
                        <span className="text-xs text-stone-400 line-through">₹{item.mrp.toLocaleString('en-IN')}</span>
                      </div>

                      {qty === 0 ? (
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-forest-800 text-white text-sm font-semibold hover:bg-forest-900 transition"
                        >
                          <Plus className="w-4 h-4" /> Add
                        </button>
                      ) : (
                        <div className="inline-flex items-center rounded-full bg-forest-800 text-white">
                          <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity" className="w-9 h-9 flex items-center justify-center hover:bg-forest-900 rounded-full transition">
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold tabular-nums">{qty}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity" className="w-9 h-9 flex items-center justify-center hover:bg-forest-900 rounded-full transition">
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* STORY */}
      <section id="story" className="scroll-mt-32 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
          <Image src="https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1200" alt="Mango orchard in Ratnagiri" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur rounded-2xl px-5 py-4 shadow-lift">
            <p className="font-display text-3xl font-semibold text-forest-950">80+ years</p>
            <p className="text-xs text-stone-500 mt-0.5">of family orchards in Pawas</p>
          </div>
        </div>
        <div className="space-y-5">
          <p className="eyebrow">Our story</p>
          <h2 className="heading-display text-3xl sm:text-4xl leading-tight">
            Three generations of growing the world’s finest Alphonso.
          </h2>
          <p className="text-stone-600 leading-relaxed">
            Our trees grow in the laterite soil and sea breeze of the Konkan coast. Every fruit is hand-picked at maturity, ripened naturally in straw, and graded by the same families who have tended these orchards since 1946.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {['GI-tagged Ratnagiri origin', 'Zero carbide, naturally ripened', 'Traceable harvest batches', 'FSSAI-certified packhouse'].map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-sm text-forest-900">
                <span className="w-5 h-5 rounded-full bg-forest-100 text-forest-700 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <div className="pt-3">
            <Link href="/product/ratnagiri-alphonso-mango-grade-a" className="btn-primary">
              Shop the harvest <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-forest-900 text-white rounded-3xl px-6 sm:px-12 py-12 sm:py-16">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mango-300">Loved by 12,000+ families</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mt-2 tracking-tight">What our customers say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {[
            { quote: 'The closest thing to eating Hapus straight off the tree. Arrived chilled and perfectly ripe two days later.', name: 'Ananya S.', city: 'Pune' },
            { quote: 'We order every season for the whole family. Consistent quality, beautiful packaging and honest grading.', name: 'Rahul M.', city: 'Mumbai' },
            { quote: 'The W180 cashews are unreal — huge, crunchy and not over-salted. Express delivery took 22 minutes.', name: 'Priya K.', city: 'Thane' },
          ].map((t) => (
            <figure key={t.name} className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-mango-400 text-mango-400" />
                ))}
              </div>
              <blockquote className="mt-4 text-white/85 leading-relaxed flex-1">“{t.quote}”</blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold">{t.name}</span>
                <span className="text-white/50"> · {t.city}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* STICKY BASKET BAR */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-5 inset-x-4 max-w-xl mx-auto z-40 animate-fade-up">
          <div className="bg-forest-950/95 backdrop-blur-lg text-white pl-6 pr-2 py-2 rounded-full shadow-lift flex items-center justify-between gap-4 border border-white/10">
            <div className="min-w-0">
              <p className="text-sm font-semibold">
                {totalCartCount} item{totalCartCount > 1 ? 's' : ''} · ₹{totalCartAmount.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-white/60 truncate">
                {deliveryMode === 'QUICK' ? 'Express 15–30 min delivery' : 'Cold-chain delivery in 1–2 days'}
              </p>
            </div>
            <Link href="/cart" className="btn-accent py-2.5 shrink-0">
              View basket <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Seller Reputation & SLA Modal */}
      <SellerRatingModal isOpen={showSellerModal} onClose={() => setShowSellerModal(false)} />

      {/* Pre-order Modal */}
      {preOrderModalItem && (
        <div className="fixed inset-0 z-50 bg-forest-950/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setPreOrderModalItem(null)}>
          <div className="bg-white rounded-3xl max-w-md w-full shadow-lift overflow-hidden animate-fade-up" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-40">
              <Image src={preOrderModalItem.image} alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 to-transparent" />
              <button onClick={() => setPreOrderModalItem(null)} aria-label="Close" className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
              <p className="absolute bottom-4 left-6 font-display text-2xl font-semibold text-white">Alphonso pre-order</p>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-stone-600 leading-relaxed">
                Reserve tree-ripened Pawas Hapus from the upcoming harvest. Flowering batches are tracked on our orchard logs.
              </p>
              <dl className="divide-y divide-stone-100 text-sm rounded-2xl border border-stone-200">
                <div className="flex justify-between px-4 py-3"><dt className="text-stone-500">Harvest batch</dt><dd className="font-semibold">May 2026</dd></div>
                <div className="flex justify-between px-4 py-3"><dt className="text-stone-500">Locked price</dt><dd className="font-semibold">₹{preOrderModalItem.price.toLocaleString('en-IN')}</dd></div>
                <div className="flex justify-between px-4 py-3"><dt className="text-stone-500">Transit</dt><dd className="font-semibold">Within 24h, cold-chain</dd></div>
              </dl>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setPreOrderModalItem(null)} className="btn-outline flex-1">Not now</button>
                <button
                  onClick={() => {
                    updateQuantity(preOrderModalItem.id, 1);
                    setPreOrderModalItem(null);
                    showToast('Pre-order added to your basket');
                  }}
                  className="btn-primary flex-1"
                >
                  Reserve box
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
