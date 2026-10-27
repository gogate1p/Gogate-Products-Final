'use client';

import { useState } from 'react';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  verifiedBuyer: boolean;
  headline: string;
  comment: string;
  location: string;
}

const reviewsData: Review[] = [
  {
    id: 'rev_1',
    author: 'Kavita Joshi',
    rating: 5,
    date: '24 Oct 2026',
    verifiedBuyer: true,
    headline: 'Incredible saffron flesh and natural orchard aroma!',
    comment: 'You can immediately tell these Alphonso mangoes were never treated with carbide. The fragrance filled the whole kitchen when opening the crate. The hay packaging is very authentic and eco-friendly.',
    location: 'Pune, Maharashtra',
  },
  {
    id: 'rev_2',
    author: 'Sunil Deshmukh',
    rating: 5,
    date: '22 Oct 2026',
    verifiedBuyer: true,
    headline: 'Delivered in less than 24 hours in cold van',
    comment: 'The fruits arrived cool and perfectly intact without any bruising. Outstanding flavor profile, just like the ones we used to buy directly in Ratnagiri during childhood.',
    location: 'Mumbai, Maharashtra',
  },
  {
    id: 'rev_3',
    author: 'Dr. Neha Rao',
    rating: 4,
    date: '19 Oct 2026',
    verifiedBuyer: true,
    headline: 'Very sweet mangoes, two needed 1 more day to ripen',
    comment: '10 mangoes were ready to eat immediately, and 2 were slightly firm which was great so we could enjoy them across the week. Will reorder for May harvest.',
    location: 'Bengaluru, Karnataka',
  },
];

export default function ProductReviewsSection({
  productName = 'Original Ratnagiri Alphonso Mango',
  onSellerClick,
}: {
  productName?: string;
  onSellerClick?: () => void;
}) {
  const [reviews, setReviews] = useState<Review[]>(reviewsData);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newHeadline, setNewHeadline] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Review = {
      id: `rev_${Date.now()}`,
      author: newAuthor || 'Verified Gourmet',
      rating: newRating,
      date: 'Just now',
      verifiedBuyer: true,
      headline: newHeadline,
      comment: newComment,
      location: 'India',
    };
    setReviews([created, ...reviews]);
    setShowAddReviewModal(false);
    setNewAuthor('');
    setNewHeadline('');
    setNewComment('');
  };

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-8">
      {/* Header and Summary Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-6 border-b border-stone-100">
        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
            Customer Feedback & Verification
          </span>
          <h3 className="text-2xl font-black text-stone-900 tracking-tight mt-1">
            Ratings & Reviews ({reviews.length})
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Seller: {' '}
            <button
              onClick={onSellerClick}
              className="font-bold text-emerald-800 underline hover:text-emerald-950 inline-flex items-center gap-1"
            >
              <span>Gogate Organic Orchards (Pawas)</span>
              <span className="text-[10px] bg-emerald-100 px-1.5 py-0.5 rounded text-emerald-900 font-extrabold">
                View Seller SLA Ratings ➔
              </span>
            </button>
          </p>
        </div>

        <button
          onClick={() => setShowAddReviewModal(true)}
          className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs transition shrink-0"
        >
          ★ Write a Product Review
        </button>
      </div>

      {/* Ratings Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
        {/* Score */}
        <div className="text-center sm:border-r sm:border-stone-100 sm:pr-6">
          <span className="text-5xl font-black text-stone-900">4.9</span>
          <div className="text-amber-500 text-lg mt-1">★★★★★</div>
          <p className="text-xs text-stone-500 mt-1 font-medium">Based on 382 verified orders</p>
        </div>

        {/* Star Bars */}
        <div className="sm:col-span-2 space-y-2 text-xs">
          {[
            { stars: '5 Stars', pct: '92%' },
            { stars: '4 Stars', pct: '6%' },
            { stars: '3 Stars', pct: '2%' },
            { stars: '2 Stars', pct: '0%' },
            { stars: '1 Star', pct: '0%' },
          ].map((bar, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-14 text-stone-600 font-medium">{bar.stars}</span>
              <div className="flex-1 bg-stone-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-700 h-full rounded-full"
                  style={{ width: bar.pct }}
                />
              </div>
              <span className="w-10 text-right font-mono font-bold text-stone-500">{bar.pct}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="divide-y divide-stone-100 space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="pt-4 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-900 text-sm">{rev.author}</span>
                {rev.verifiedBuyer && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    ✓ Verified Harvest Buyer
                  </span>
                )}
              </div>
              <span className="text-stone-400 font-mono text-[11px]">{rev.date}</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-amber-500 text-xs font-black">
                {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
              </div>
              <span className="font-bold text-stone-900 text-xs">{rev.headline}</span>
            </div>

            <p className="text-stone-600 leading-relaxed text-xs">{rev.comment}</p>
            <p className="text-[11px] text-stone-400">📍 {rev.location}</p>
          </div>
        ))}
      </div>

      {/* Write Review Modal */}
      {showAddReviewModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <h3 className="text-lg font-bold text-stone-900">Review {productName}</h3>
            <p className="text-xs text-stone-500">
              Share your feedback on fruit ripeness, sweetness, aroma, and packaging.
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kulkarni"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full text-xs border border-stone-300 rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Rating</label>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(parseInt(e.target.value))}
                  className="w-full text-xs border border-stone-300 rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                >
                  <option value={5}>★★★★★ (5 Stars - Exceptional Harvest)</option>
                  <option value={4}>★★★★☆ (4 Stars - Very Good)</option>
                  <option value={3}>★★★☆☆ (3 Stars - Average)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Review Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Superb aroma, natural sweetness!"
                  value={newHeadline}
                  onChange={(e) => setNewHeadline(e.target.value)}
                  className="w-full text-xs border border-stone-300 rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Review Comments *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="How was the fruit texture, ripeness, packaging..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full text-xs border border-stone-300 rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowAddReviewModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-800 rounded-xl hover:bg-emerald-900 shadow-xs"
                >
                  Submit Verified Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
