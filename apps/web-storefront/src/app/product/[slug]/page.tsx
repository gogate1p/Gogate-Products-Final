'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { calculateEdd } from '@gogate/logistics-engine';
import ProductReviewsSection from '../../../components/ProductReviewsSection';
import SellerRatingModal from '../../../components/SellerRatingModal';
import { Share2, Heart, Truck, MapPin, Zap, Star, ShieldCheck } from 'lucide-react';

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [pincode, setPincode] = useState('411001');
  const [eddResult, setEddResult] = useState(() => calculateEdd('415616', '411001', true));
  const [pincodeMessage, setPincodeMessage] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartCount, setCartCount] = useState(1);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [showSellerModal, setShowSellerModal] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800',
    'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=800',
  ];

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'Original Ratnagiri Alphonso Mango',
        text: 'Check out authentic GI-tagged Ratnagiri Alphonso Mangoes on Gogate Products!',
        url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      showToast('Product link copied to clipboard!');
    }
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length !== 6) {
      setPincodeMessage('Please enter a valid 6-digit Indian PIN code');
      return;
    }
    const res = calculateEdd('415616', pincode, true);
    setEddResult(res);
    setPincodeMessage(`✓ Serviceable! Expected Delivery: ${res.formattedDeliveryDate}`);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-12">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-24 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-full shadow-2xl text-xs font-semibold animate-fade-in flex items-center gap-2">
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Breadcrumb & Share */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <nav className="flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-800">
            Home
          </Link>
          <span>/</span>
          <span className="text-stone-700">Mangoes</span>
          <span>/</span>
          <span className="font-semibold text-stone-900">Original Ratnagiri Alphonso Mango</span>
        </nav>
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 font-bold hover:bg-stone-50 transition"
        >
          <Share2 className="w-3.5 h-3.5 text-stone-500" />
          <span>Share Product</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-xs">
            <Image
              src={images[selectedImage]}
              alt="Ratnagiri Alphonso Mango"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              <span className="bg-emerald-800 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                GI Tagged Origin
              </span>
              <span className="bg-amber-400 text-stone-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase shadow-xs">
                ⚡ Quick Delivery Eligible
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition ${
                  selectedImage === idx ? 'border-emerald-700 ring-2 ring-emerald-200' : 'border-stone-200 opacity-70'
                }`}
              >
                <Image src={img} alt="Thumbnail" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Details & EDD */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="veg-badge" title="100% Pure Organic Veg">
                <span className="veg-dot" />
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> 4.9 (382 reviews)
              </span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                <Zap className="w-3 h-3 fill-emerald-700 text-emerald-700" /> 20 MINS Quick Drop
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-snug">
              Original Ratnagiri Alphonso Mango (Hapus) - Grade A (1 Dozen)
            </h1>
            <p className="text-xs text-stone-500 mt-1 font-mono">SKU: GGT-MNG-ALPH-1DZ • Net Weight: 3.2 kg</p>

            {/* Clickable Seller Link */}
            <div className="mt-2">
              <button
                onClick={() => setShowSellerModal(true)}
                className="text-xs font-bold text-emerald-800 hover:underline inline-flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200"
              >
                <span>Sold By: Gogate Organic Orchards (Ratnagiri Flagship)</span>
                <span className="text-[10px] bg-emerald-700 text-white font-bold px-1.5 py-0.5 rounded">
                  ★ 4.9 SLA Ratings ➔
                </span>
              </button>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200 flex items-baseline gap-3 shadow-2xs">
            <span className="text-3xl font-black text-stone-900">₹1,450</span>
            <span className="text-sm text-stone-400 line-through">MRP: ₹1,800</span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Save ₹350 (20% OFF)
            </span>
          </div>

          {/* Swiggy Style Add Counter */}
          <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-200">
            <span className="text-xs font-bold text-stone-700">Quantity:</span>
            <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => setCartCount(Math.max(1, cartCount - 1))}
                className="px-3.5 py-1.5 text-stone-600 hover:bg-stone-100 font-black text-sm"
              >
                -
              </button>
              <span className="px-4 py-1.5 font-bold text-stone-900 text-sm">{cartCount}</span>
              <button
                onClick={() => setCartCount(cartCount + 1)}
                className="px-3.5 py-1.5 text-stone-600 hover:bg-stone-100 font-black text-sm"
              >
                +
              </button>
            </div>
            <span className="text-xs font-bold text-emerald-800 ml-auto">
              Total: ₹{(1450 * cartCount).toFixed(2)}
            </span>
          </div>

          {/* Regulatory Badges */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2 text-xs">
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
              Compliance & Farm Details
            </h4>
            <div className="grid grid-cols-2 gap-2 text-stone-600">
              <div className="p-2 bg-stone-50 rounded-lg">
                <span className="text-stone-400 block text-[10px]">FSSAI License:</span>
                <span className="font-mono font-bold text-emerald-900">11521045000123</span>
              </div>
              <div className="p-2 bg-stone-50 rounded-lg">
                <span className="text-stone-400 block text-[10px]">MSME Udyam:</span>
                <span className="font-mono font-bold text-amber-900">UDYAM-MH-27-0012345</span>
              </div>
            </div>

            {/* Return / Replacement Eligibility Assurance */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-950 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong>Eligible for 48-Hour Freshness Replacement & Return</strong>
                <p className="text-[10px] text-emerald-800 mt-0.5">
                  Organic transit guarantee applies to whole mango boxes. Cancellations handled exclusively by Superadmin support.
                </p>
              </div>
            </div>
          </div>

          {/* EDD Pincode Checker */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
            <h4 className="font-bold text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-800" /> Check Estimated Delivery Date (EDD)
            </h4>
            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter Pincode..."
                className="flex-1 text-sm font-mono border border-emerald-300 rounded-xl px-3 py-2 bg-white focus:ring-2 focus:ring-emerald-600 outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-800 text-white font-bold text-xs rounded-xl hover:bg-emerald-900 transition"
              >
                Check
              </button>
            </form>

            {pincodeMessage && (
              <p className="text-xs font-semibold text-emerald-800">{pincodeMessage}</p>
            )}
            <p className="text-[11px] text-stone-600 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-800" />
              <span>Expected: <strong>{eddResult.formattedDeliveryDate}</strong> (Refrigerated Linehaul)</span>
            </p>
          </div>

          {/* Actions: Pre-Order Now and Add to Cart */}
          <div className="flex items-center gap-3 pt-2">
            <Link
              href="/checkout"
              className="flex-1 py-4 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black rounded-2xl text-xs sm:text-sm transition shadow-md text-center"
            >
              Pre-Order Now (May Harvest)
            </Link>
            <Link
              href="/cart"
              className="flex-1 py-4 bg-emerald-800 hover:bg-emerald-900 text-white font-black rounded-2xl text-xs sm:text-sm transition shadow-md text-center"
            >
              Add to Basket ({cartCount})
            </Link>
            <button
              onClick={() => {
                setIsWishlisted(!isWishlisted);
                showToast(isWishlisted ? 'Removed from wishlist' : 'Saved to wishlist');
              }}
              aria-label="Wishlist"
              className="w-12 h-12 rounded-2xl border border-stone-300 bg-white hover:bg-stone-50 flex items-center justify-center transition"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-stone-400'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* RATINGS & REVIEWS SECTION UNDER PRODUCT */}
      <ProductReviewsSection
        productName="Original Ratnagiri Alphonso Mango (Hapus)"
        onSellerClick={() => setShowSellerModal(true)}
      />

      {/* Seller SLA & Product Quality Reputation Modal */}
      <SellerRatingModal
        isOpen={showSellerModal}
        onClose={() => setShowSellerModal(false)}
      />
    </div>
  );
}
