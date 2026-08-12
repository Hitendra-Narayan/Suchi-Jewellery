import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Package, Truck, Calendar, MapPin, Phone, ArrowRight, Heart, Sparkles } from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { lastPlacedOrder, navigateTo } = useShop();

  if (!lastPlacedOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-2xl font-serif font-bold text-gray-900">No Recent Order Found</h1>
        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-2.5 bg-rose-500 text-white font-bold text-xs rounded-full shadow-xs"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-500">
      {/* Celebration Header */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 rounded-3xl p-8 text-white text-center space-y-3 shadow-xl relative overflow-hidden">
        <div className="w-16 h-16 bg-white text-rose-500 rounded-full flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-200 bg-black/20 px-3 py-1 rounded-full">
          Order Confirmed
        </span>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold">
          Thank You, {lastPlacedOrder.shippingAddress.fullName.split(' ')[0]}!
        </h1>

        <p className="text-xs sm:text-sm text-rose-100 max-w-md mx-auto leading-relaxed font-light">
          Your Suchi Jewellery order <strong className="text-amber-200 font-mono font-bold">#{lastPlacedOrder.id}</strong> has been received and is being prepared in our pink velvet box!
        </p>

        <div className="pt-2 text-xs font-bold text-amber-200 flex items-center justify-center gap-1">
          <Sparkles className="w-4 h-4" /> Made to Make You Happy
        </div>
      </div>

      {/* Order Status Timeline */}
      <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-6">
        <h3 className="font-serif font-bold text-base text-gray-900 border-b border-rose-50 pb-3 flex items-center gap-2">
          <Truck className="w-5 h-5 text-rose-500" />
          Delivery Status & Timeline
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-rose-50 p-3 rounded-2xl border border-rose-200">
            <span className="text-[10px] text-rose-600 font-bold uppercase block">Status</span>
            <span className="text-xs font-extrabold text-gray-900">{lastPlacedOrder.status}</span>
          </div>

          <div className="bg-rose-50 p-3 rounded-2xl border border-rose-200">
            <span className="text-[10px] text-rose-600 font-bold uppercase block">Order Date</span>
            <span className="text-xs font-extrabold text-gray-900">{lastPlacedOrder.date}</span>
          </div>

          <div className="bg-rose-50 p-3 rounded-2xl border border-rose-200">
            <span className="text-[10px] text-rose-600 font-bold uppercase block">Estimated Arrival</span>
            <span className="text-xs font-extrabold text-gray-900">{lastPlacedOrder.estimatedDelivery}</span>
          </div>

          <div className="bg-rose-50 p-3 rounded-2xl border border-rose-200">
            <span className="text-[10px] text-rose-600 font-bold uppercase block">Payment Method</span>
            <span className="text-xs font-extrabold text-gray-900 uppercase">
              {lastPlacedOrder.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : lastPlacedOrder.paymentMethod}
            </span>
          </div>
        </div>

        {/* Address & Items Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-rose-50">
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-1 text-rose-600">
              <MapPin className="w-4 h-4" /> Shipping Address
            </h4>
            <div className="text-xs text-gray-600 space-y-1 bg-rose-50/40 p-3.5 rounded-2xl border border-rose-100">
              <p className="font-bold text-gray-900">{lastPlacedOrder.shippingAddress.fullName}</p>
              <p>{lastPlacedOrder.shippingAddress.addressLine}</p>
              {lastPlacedOrder.shippingAddress.apartment && <p>{lastPlacedOrder.shippingAddress.apartment}</p>}
              <p>{lastPlacedOrder.shippingAddress.city}, {lastPlacedOrder.shippingAddress.state} - {lastPlacedOrder.shippingAddress.pincode}</p>
              <p className="flex items-center gap-1 pt-1 font-semibold text-gray-800">
                <Phone className="w-3.5 h-3.5 text-rose-500" /> {lastPlacedOrder.shippingAddress.phone}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-1 text-rose-600">
              <Package className="w-4 h-4" /> Purchased Items ({lastPlacedOrder.items.length})
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {lastPlacedOrder.items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between text-xs bg-rose-50/30 p-2.5 rounded-xl border border-rose-100">
                  <div className="flex items-center gap-2">
                    <img src={item.product.images[0]} alt="" referrerPolicy="no-referrer" className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="font-bold text-gray-900 line-clamp-1">{item.product.name}</p>
                      <p className="text-[10px] text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-900">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-rose-100 mt-3 space-y-1.5 text-xs text-gray-700">
              <div className="flex justify-between items-baseline font-extrabold text-gray-900">
                <span>Total Order Value:</span>
                <span className="text-rose-600 text-base">₹{lastPlacedOrder.total.toLocaleString('en-IN')}</span>
              </div>

              {lastPlacedOrder.paymentMethod === 'cod' ? (
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 space-y-1 text-xs">
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Upfront Advance Deposit Paid (UPI):</span>
                    <span className="font-mono">₹{lastPlacedOrder.advancePaid ?? 100}</span>
                  </div>
                  <div className="flex justify-between text-amber-900 font-extrabold border-t border-amber-200 pt-1 mt-1">
                    <span>Remaining Balance Payable Cash on Delivery:</span>
                    <span className="font-mono text-sm text-amber-700">₹{(lastPlacedOrder.balanceOnDelivery ?? Math.max(0, lastPlacedOrder.total - 100)).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ) : (
                <div className="text-[11px] font-bold text-emerald-600 bg-emerald-50 p-2 rounded-lg border border-emerald-200 text-center">
                  ✨ 100% Online Payment Received via {lastPlacedOrder.paymentMethod.toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={() => navigateTo('shop')}
          className="px-8 py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-full shadow-md transition-all inline-flex items-center gap-2"
        >
          <span>Continue Shopping More Jewellery</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
