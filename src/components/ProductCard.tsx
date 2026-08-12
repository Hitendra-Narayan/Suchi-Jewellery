import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Star, Eye, ShoppingBag, Check, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProductId,
    cart,
  } = useShop();

  const isLiked = isInWishlist(product.id);
  const inCart = cart.some((item) => item.product.id === product.id);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const hasImage = product.images && product.images.length > 0 && product.images[0].trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group bg-white rounded-2xl border border-[#FDE7EF] shadow-xs hover:shadow-xl hover:border-[#F7AFC4] transition-all duration-300 flex flex-col overflow-hidden relative"
    >
      {/* Product Image Area */}
      <div className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-gradient-to-br from-rose-50/80 via-pink-50/50 to-amber-50/40 cursor-pointer">
        {hasImage ? (
          <img
            src={product.images[0]}
            alt={product.name}
            referrerPolicy="no-referrer"
            onClick={() => navigateTo('product-detail', product.id)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          /* Placeholder Box when no photo is uploaded yet */
          <div
            onClick={() => navigateTo('product-detail', product.id)}
            className="w-full h-full flex flex-col items-center justify-center p-4 text-center group/cardimg relative"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/80 text-[#F33A6A] flex items-center justify-center shadow-xs mb-2 border border-rose-100 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xs font-serif font-bold text-gray-800 line-clamp-1 px-2">
              {product.name}
            </span>
            <span className="text-[10px] text-rose-600/90 font-medium mt-1 bg-white/90 px-2.5 py-0.5 rounded-full border border-rose-200">
              Suchi Exclusive
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.isBestseller && (
            <span className="bg-[#F7AFC4] text-gray-900 text-[9px] font-bold px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-[0.15em] border border-white/60">
              Bestseller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-emerald-700 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-[0.15em]">
              New
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-white text-gray-900 border border-[#F7AFC4] text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 z-10 shadow-xs ${
            isLiked
              ? 'bg-[#F7AFC4] text-gray-900 border border-white'
              : 'bg-white/90 text-gray-600 hover:bg-white hover:text-[#E07090]'
          }`}
          title={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-gray-900' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-0 bottom-3 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex justify-center z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProductId(product.id);
            }}
            className="w-full py-2 bg-white/95 text-gray-900 hover:bg-[#F7AFC4] text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5 backdrop-blur-xs cursor-pointer border border-[#F7AFC4]/50"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
        <div>
          <span className="text-[10px] font-bold text-[#E07090] uppercase tracking-[0.2em] block">
            {product.category}
          </span>

          <h3
            onClick={() => navigateTo('product-detail', product.id)}
            className="font-serif font-bold text-gray-900 text-sm hover:text-[#E07090] transition-colors cursor-pointer line-clamp-1 mt-1"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-bold text-gray-800 ml-1">
                {product.rating}
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-medium">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Price & Add to Cart Footer */}
        <div className="pt-2.5 border-t border-[#FDE7EF] flex items-center justify-between gap-2 mt-auto">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-extrabold text-gray-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-gray-400 line-through font-normal">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold">
              Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className={`p-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
              inCart
                ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                : 'bg-[#F7AFC4] text-gray-900 hover:bg-[#E587A3] hover:shadow-md border border-[#F7AFC4]'
            }`}
            title="Add to Shopping Cart"
          >
            {inCart ? (
              <>
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline-block">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline-block">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
