import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import {
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Sparkles,
  Gift,
  MapPin,
  Check,
  Share2,
  ArrowLeft,
  RotateCcw,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    showToast,
    reviews,
    products,
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [giftWrap, setGiftWrap] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryChecked, setDeliveryChecked] = useState(false);

  const product = products.find((p) => p.id === selectedProductId) || products[0] || {
    id: 'placeholder',
    name: 'Sample Product',
    category: 'Earrings',
    price: 0,
    originalPrice: 0,
    rating: 5,
    reviewCount: 0,
    images: [],
    description: '',
    specifications: {}
  };

  const isLiked = isInWishlist(product.id);

  const discountPercent = product.originalPrice > 0
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const productReviews = reviews.filter((r) => r.productId === product.id);

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const hasImage = product.images && product.images.length > 0 && product.images[selectedImageIdx || 0];

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setDeliveryChecked(true);
    } else {
      showToast('Please enter a valid 6-digit Indian Pincode', 'info');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on Suchi Jewellery!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back Button */}
      <button
        onClick={() => navigateTo('shop')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-rose-600 transition-colors bg-white px-3 py-1.5 rounded-full border border-rose-100 shadow-xs"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Jewellery</span>
      </button>

      {/* Main Product PDP Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-xs grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50/50 border border-rose-100 shadow-xs group">
            {hasImage ? (
              <img
                src={product.images[selectedImageIdx] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white text-[#F33A6A] flex items-center justify-center shadow-sm mb-3 border border-rose-100">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-gray-900 text-lg">
                  {product.name}
                </h3>
                <p className="text-xs text-rose-600 font-medium mt-1">
                  Suchi Exclusive
                </p>
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isBestseller && (
                <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  ★ Bestseller
                </span>
              )}
              {discountPercent > 0 && (
                <span className="bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* Wishlist Floating Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all active:scale-90 shadow-md ${
                isLiked
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/80 text-gray-700 hover:bg-white hover:text-rose-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIdx(idx)}
                className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                  idx === selectedImageIdx
                    ? 'border-rose-500 scale-105 shadow-md'
                    : 'border-rose-100 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Details & Order Controls */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-rose-500 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                {product.category}
              </span>
              <button
                onClick={handleShare}
                className="text-gray-400 hover:text-rose-600 text-xs font-bold flex items-center gap-1"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center text-amber-400 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-xs font-bold text-gray-900 ml-1">{product.rating}</span>
              </div>
              <span className="text-xs text-gray-500 font-medium">
                ({product.reviewCount} Ratings & Reviews)
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                In Stock & Ready to Ship
              </span>
            </div>

            {/* Price Row */}
            <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100 flex items-baseline gap-3">
              <span className="text-3xl font-serif font-extrabold text-gray-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-bold text-rose-600 bg-white px-2.5 py-1 rounded-full border border-rose-200">
                {discountPercent}% OFF
              </span>
              <span className="text-[11px] text-gray-500 ml-auto hidden sm:inline-block">
                (Inclusive of all taxes)
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-700 leading-relaxed font-normal">
              {product.description}
            </p>

            {/* Specifications Card */}
            <div className="bg-white p-4 rounded-2xl border border-rose-100 text-xs space-y-2">
              <h3 className="font-serif font-bold text-gray-900 text-xs uppercase tracking-wider text-rose-600 mb-2">
                Craftsmanship Details
              </h3>
              <div className="grid grid-cols-2 gap-2 text-gray-600">
                <div>
                  <strong className="text-gray-900">Base Metal:</strong> {product.specifications.material}
                </div>
                <div>
                  <strong className="text-gray-900">Polish:</strong> {product.specifications.finish}
                </div>
                <div>
                  <strong className="text-gray-900">Stone Work:</strong> {product.specifications.stoneType}
                </div>
                <div>
                  <strong className="text-gray-900">Weight:</strong> {product.specifications.weight}
                </div>
              </div>
              <p className="text-[11px] text-amber-800 bg-amber-50/80 p-2 rounded-xl mt-2 italic">
                💡 Care: {product.specifications.careInstructions}
              </p>
            </div>

            {/* Gift Wrap Checkbox */}
            <div className="flex items-center gap-3 bg-pink-50/60 p-3 rounded-2xl border border-pink-100">
              <input
                type="checkbox"
                id="giftwrap"
                checked={giftWrap}
                onChange={(e) => setGiftWrap(e.target.checked)}
                className="w-4 h-4 text-rose-500 rounded focus:ring-rose-400"
              />
              <label htmlFor="giftwrap" className="text-xs font-bold text-gray-800 flex items-center gap-1.5 cursor-pointer">
                <Gift className="w-4 h-4 text-rose-500" />
                <span>Add Suchi Signature Pink Gift Box Wrap (+ ₹49)</span>
              </label>
            </div>

            {/* Pincode Delivery Estimator */}
            <form onSubmit={handlePincodeCheck} className="flex items-center gap-2 bg-rose-50/40 p-3 rounded-2xl border border-rose-100">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit Pincode"
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value.replace(/\D/g, ''));
                  setDeliveryChecked(false);
                }}
                className="w-full bg-white px-3 py-1.5 text-xs rounded-xl border border-rose-200 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-gray-900 text-white hover:bg-rose-600 text-xs font-bold rounded-xl transition-colors shrink-0"
              >
                Check
              </button>
            </form>

            {deliveryChecked && (
              <p className="text-xs font-bold text-emerald-600 flex items-center gap-1 pl-2">
                <Check className="w-4 h-4" /> Express Delivery available to {pincode} in 3-4 days!
              </p>
            )}

            {/* Quantity Stepper */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-bold text-gray-700">Quantity:</span>
              <div className="flex items-center border border-rose-200 rounded-full bg-rose-50/50 overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-1.5 font-bold text-gray-700 hover:bg-rose-200 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-bold text-gray-900 min-w-[36px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 py-1.5 font-bold text-gray-700 hover:bg-rose-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-rose-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => addToCart(product, quantity, giftWrap)}
                className="w-full py-4 bg-[#D42D51] hover:bg-[#b02241] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart (₹{(product.price * quantity + (giftWrap ? 49 : 0)).toLocaleString('en-IN')})</span>
              </button>

              <button
                onClick={() => {
                  addToCart(product, quantity, giftWrap);
                  navigateTo('cart');
                }}
                className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Buy Now with GPay / UPI</span>
              </button>
            </div>

            {/* Delivery Guarantees */}
            <div className="flex items-center justify-around text-[11px] text-gray-500 pt-2 font-medium">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-rose-500" /> 100% Anti-Tarnish</span>
              <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-amber-600" /> Cash on Delivery Available</span>
              <span className="flex items-center gap-1"><RotateCcw className="w-3.5 h-3.5 text-rose-500" /> 7 Days Easy Return</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Carousel / Grid */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6">
          <h2 className="text-2xl font-serif font-bold text-gray-900">
            You Might Also Love
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
