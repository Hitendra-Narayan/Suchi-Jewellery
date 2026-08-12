import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { Star, CheckCircle, MessageSquarePlus, X, Heart } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const ReviewsSection: React.FC = () => {
  const { reviews, addReview } = useShop();
  const [modalOpen, setModalOpen] = useState(false);

  // Form state
  const [customerName, setCustomerName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');

  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !comment.trim()) return;

    const prod = PRODUCTS.find((p) => p.id === selectedProductId);

    addReview({
      customerName,
      location: location.trim() || 'Verified Customer',
      rating,
      comment,
      productId: selectedProductId || undefined,
      productName: prod ? prod.name : 'Suchi Jewellery Purchase',
    });

    setCustomerName('');
    setLocation('');
    setComment('');
    setRating(5);
    setSelectedProductId('');
    setModalOpen(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="py-12 bg-rose-50/40 rounded-3xl border border-rose-100 my-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Header & Rating Summary */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-rose-200/80">
        <div>
          <span className="text-xs font-bold text-[#E07090] uppercase tracking-widest flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 fill-[#E07090]" />
            Loved By Thousands
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#595959] mt-1">
            Real Happy Customers
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            Real feedback from verified buyers across India.
          </p>
        </div>

        {/* Rating Card */}
        <div className="flex items-center gap-6 bg-white p-4 rounded-2xl shadow-xs border border-rose-100">
          <div className="text-center">
            <span className="text-3xl font-serif font-extrabold text-gray-900">
              {averageRating}
            </span>
            <span className="text-xs text-gray-400 font-bold block">out of 5</span>
          </div>

          <div className="space-y-1">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs font-semibold text-gray-700">
              Based on {reviews.length} Verified Reviews
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>
      </div>

      {/* Reviews Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {reviews.slice(0, 6).map((rev, index) => (
          <motion.div
            key={rev.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            className="bg-white p-5 rounded-2xl border border-rose-100 shadow-xs flex flex-col justify-between space-y-3 relative hover:shadow-md transition-shadow"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] text-gray-400">{rev.date}</span>
              </div>

              {rev.productName && (
                <p className="text-[11px] font-bold text-rose-600 bg-rose-50/80 px-2 py-0.5 rounded inline-block">
                  Item: {rev.productName}
                </p>
              )}

              <p className="text-xs text-gray-700 italic leading-relaxed">
                "{rev.comment}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-rose-50 mt-auto">
              <img
                src={rev.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
                alt={rev.customerName}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover border border-rose-200"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-gray-900">{rev.customerName}</span>
                  {rev.verified && (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
                  )}
                </div>
                <span className="text-[10px] text-gray-400">{rev.location}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Write a Review Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 border border-rose-100 space-y-4 z-10"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-serif font-bold text-gray-900">
                Write a Review for Suchi Jewellery
              </h3>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-rose-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Mumbai, Maharashtra"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-rose-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Select Purchased Product (Optional)</label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-rose-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400"
                  >
                    <option value="">-- General Store Review --</option>
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (₹{p.price})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Rating</label>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-none cursor-pointer"
                      >
                        <Star className={`w-6 h-6 ${star <= rating ? 'fill-current' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Feedback</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us about the jewellery shine, finish, packaging, and delivery..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-rose-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
