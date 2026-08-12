import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export const ProductQuickViewModal: React.FC = () => {
  const {
    quickViewProductId,
    setQuickViewProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    products,
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const product = products.find((p) => p.id === quickViewProductId);

  const isLiked = product ? isInWishlist(product.id) : false;

  const handleClose = () => {
    setQuickViewProductId(null);
    setQuantity(1);
    setSelectedImageIdx(0);
  };

  const handleAddToCart = () => {
    if (product) addToCart(product, quantity);
    handleClose();
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      handleClose();
      navigateTo('cart');
    }
  };

  return (
    <AnimatePresence>
      {quickViewProductId && product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden max-h-[90vh] flex flex-col md:flex-row z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-20 p-2 bg-white/80 hover:bg-rose-500 hover:text-white rounded-full text-gray-600 transition-colors shadow-sm cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Image Gallery */}
            <div className="w-full md:w-1/2 p-6 bg-[#FDE7EF]/40 flex flex-col justify-between items-center">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50/50 shadow-xs border border-[#FDE7EF] mb-3 flex items-center justify-center">
                {product.images && product.images[selectedImageIdx || 0] ? (
                  <img
                    src={product.images[selectedImageIdx] || product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-4 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-white text-[#F33A6A] flex items-center justify-center shadow-xs mb-2 border border-rose-100">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-serif font-bold text-gray-800 line-clamp-1">
                      {product.name}
                    </span>
                    <span className="text-[10px] text-rose-600 font-medium mt-1">
                      Photo Pending
                    </span>
                  </div>
                )}
                {product.isBestseller && (
                  <span className="absolute top-3 left-3 bg-[#F7AFC4] text-gray-900 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border border-[#F7AFC4]">
                    ★ Bestseller
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-2 overflow-x-auto w-full justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      idx === selectedImageIdx ? 'border-[#F7AFC4] scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Specs & Actions */}
            <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#E07090] uppercase tracking-widest">
                    {product.category}
                  </span>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="text-gray-400 hover:text-[#E07090] transition-colors cursor-pointer"
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-[#F7AFC4] text-[#E07090]' : ''}`} />
                  </button>
                </div>

                <h2 className="text-xl font-serif font-bold text-gray-900 mt-1">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-bold text-gray-900 ml-1">{product.rating}</span>
                  </div>
                  <span className="text-xs text-gray-400">({product.reviewCount} customer reviews)</span>
                </div>

                {/* Pricing */}
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-bold text-gray-900 bg-[#FDE7EF] px-2.5 py-0.5 rounded-full border border-[#F7AFC4]/50">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed mt-3 border-t border-[#FDE7EF] pt-3">
                  {product.description}
                </p>

                {/* Features badges */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] text-gray-600 font-medium">
                  <div className="flex items-center gap-1.5 bg-[#FDE7EF]/60 p-2 rounded-xl">
                    <ShieldCheck className="w-4 h-4 text-[#E07090]" />
                    <span>Anti-Tarnish Polish</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#FDE7EF]/60 p-2 rounded-xl">
                    <Truck className="w-4 h-4 text-amber-600" />
                    <span>Express Shipping</span>
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="mt-5 flex items-center gap-4">
                  <span className="text-xs font-bold text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-[#F7AFC4]/60 rounded-full overflow-hidden bg-[#FDE7EF]/40">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-1 text-gray-700 hover:bg-[#F7AFC4] font-bold transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-gray-900 min-w-[32px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-1 text-gray-700 hover:bg-[#F7AFC4] font-bold transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4 border-t border-[#FDE7EF]">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 bg-[#F7AFC4] hover:bg-[#E587A3] text-gray-900 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#F7AFC4]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart (₹{(product.price * quantity).toLocaleString('en-IN')})</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3 bg-[#FDE7EF] hover:bg-[#F7AFC4] text-gray-900 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#F7AFC4]/50"
                >
                  <Sparkles className="w-4 h-4 text-[#E07090]" />
                  <span>Buy Now with GPay / UPI</span>
                </button>

                <button
                  onClick={() => {
                    handleClose();
                    navigateTo('product-detail', product.id);
                  }}
                  className="w-full text-center text-xs text-[#E07090] font-bold hover:underline pt-1 cursor-pointer"
                >
                  View Full Product Details →
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
