import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Trash2, Tag, ArrowRight, ShieldCheck, Truck, Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    getCartSubtotal,
    navigateTo,
    showToast,
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const subtotal = getCartSubtotal();

  let promoDiscount = 0;
  if (appliedPromo === 'SUCHI10') {
    promoDiscount = Math.round(subtotal * 0.1);
  } else if (appliedPromo === 'SPARKLE20') {
    promoDiscount = 200;
  }

  const giftWrapTotal = cart.reduce(
    (acc, item) => acc + (item.giftWrap ? 49 * item.quantity : 0),
    0
  );

  const shippingFee = subtotal >= 999 ? 0 : 99;
  const finalTotal = Math.max(0, subtotal - promoDiscount + giftWrapTotal + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === 'SUCHI10' || code === 'SPARKLE20') {
      setAppliedPromo(code);
      showToast(`🎉 Promo Code "${code}" applied successfully!`);
      setPromoInput('');
    } else {
      showToast('Invalid Coupon Code. Try SUCHI10 for 10% off.', 'info');
    }
  };

  if (cart.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6"
      >
        <div className="w-24 h-24 bg-rose-100/80 text-rose-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-gray-900">Your Shopping Bag is Empty</h1>
        <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
          Looks like you haven't added any Suchi Jewellery pieces to your bag yet. Explore our daily wear anti-tarnish artificial jewellery collections!
        </p>
        <button
          onClick={() => navigateTo('collections')}
          className="px-8 py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-full shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Explore Jewellery Collections</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
    >
      {/* Top Banner */}
      <div className="flex items-center justify-between border-b border-rose-100 pb-4">
        <div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs text-rose-600 font-bold hover:underline flex items-center gap-1 mb-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
          </button>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
            Shopping Bag ({cart.length} items)
          </h1>
        </div>

        {subtotal < 999 ? (
          <span className="text-xs text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full font-medium">
            Add ₹{(999 - subtotal).toLocaleString('en-IN')} more for <strong>FREE Shipping!</strong>
          </span>
        ) : (
          <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full font-bold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free Express Shipping Applied!
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Item List */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-white p-4 sm:p-5 rounded-3xl border border-rose-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover bg-rose-50 shrink-0 cursor-pointer"
                    onClick={() => navigateTo('product-detail', item.product.id)}
                  />

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">
                      {item.product.category}
                    </span>
                    <h3
                      onClick={() => navigateTo('product-detail', item.product.id)}
                      className="font-serif font-bold text-gray-900 text-sm hover:text-rose-600 transition-colors cursor-pointer line-clamp-1"
                    >
                      {item.product.name}
                    </h3>
                    <div className="text-xs font-bold text-gray-900">
                      ₹{item.product.price.toLocaleString('en-IN')}{' '}
                      <span className="text-[10px] text-gray-400 line-through font-normal">
                        ₹{item.product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    {item.giftWrap && (
                      <span className="text-[10px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full block">
                        🎁 Pink Gift Box (+₹49)
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Stepper & Remove */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-rose-50">
                  <div className="flex items-center border border-rose-200 rounded-full overflow-hidden bg-rose-50/40">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="px-3 py-1 font-bold text-gray-700 hover:bg-rose-200 text-xs transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-gray-900 min-w-[28px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="px-3 py-1 font-bold text-gray-700 hover:bg-rose-200 text-xs transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-extrabold text-gray-900 block">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[11px] font-bold text-rose-500 hover:text-rose-700 flex items-center gap-1 mt-1 ml-auto cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Quick Perks Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-center text-xs text-gray-600 font-medium">
            <div className="bg-rose-50/60 p-3 rounded-2xl border border-rose-100 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-rose-500" />
              <span>Anti-Tarnish Coating</span>
            </div>
            <div className="bg-rose-50/60 p-3 rounded-2xl border border-rose-100 flex items-center justify-center gap-1.5">
              <Truck className="w-4 h-4 text-amber-600" />
              <span>Express Delivery</span>
            </div>
            <div className="bg-rose-50/60 p-3 rounded-2xl border border-rose-100 col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span>Made to Make You Happy</span>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-6">
          <h2 className="font-serif font-bold text-lg text-gray-900 border-b border-rose-50 pb-3">
            Price Breakdown
          </h2>

          {/* Promo Code Input */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Have a Promo Coupon?</label>
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Try SUCHI10"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="w-full uppercase font-bold text-xs px-3 py-2 bg-rose-50/50 border border-rose-200 rounded-xl focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gray-900 hover:bg-rose-600 text-white font-bold text-xs rounded-xl transition-colors shrink-0 cursor-pointer"
              >
                Apply
              </button>
            </form>
            {appliedPromo && (
              <p className="text-[11px] font-bold text-emerald-600 mt-1 flex items-center gap-1">
                <Tag className="w-3 h-3" /> Coupon "{appliedPromo}" Applied!
              </p>
            )}
            <p className="text-[10px] text-gray-500 mt-1.5 leading-tight">
              *Note: Coupon discounts apply to Online Payments (Google Pay/Cards). Selecting Cash on Delivery removes coupon discounts and requires a ₹100 upfront deposit.
            </p>
          </div>

          {/* Calculation Rows */}
          <div className="space-y-2.5 text-xs text-gray-600 border-t border-rose-50 pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            {promoDiscount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Coupon Discount</span>
                <span>- ₹{promoDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}

            {giftWrapTotal > 0 && (
              <div className="flex justify-between">
                <span>Gift Wrapping</span>
                <span className="font-bold text-gray-900">₹{giftWrapTotal.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping Fee</span>
              {shippingFee === 0 ? (
                <span className="font-bold text-emerald-600">FREE</span>
              ) : (
                <span className="font-bold text-gray-900">₹{shippingFee}</span>
              )}
            </div>

            <div className="border-t border-rose-100 pt-3 flex justify-between items-baseline text-base font-extrabold text-gray-900">
              <span>Total Payable</span>
              <span className="text-xl text-rose-600">₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Proceed Button */}
          <button
            onClick={() => navigateTo('checkout')}
            className="w-full py-4 bg-[#D42D51] hover:bg-[#b02241] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-rose-200 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
