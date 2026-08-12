import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  User,
  Package,
  MapPin,
  Heart,
  Gift,
  ShieldCheck,
  LogOut,
  Edit3,
  Plus,
  Trash2,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  Check,
  Copy,
  Clock,
  Award,
  Crown,
  ChevronRight,
  Phone,
  Mail,
  Home,
  X
} from 'lucide-react';
import { ShippingAddress } from '../types';

export const ProfilePage: React.FC = () => {
  const {
    userProfile,
    isUserLoggedIn,
    logoutUser,
    updateUserProfile,
    addSavedAddress,
    deleteSavedAddress,
    orders,
    wishlist,
    products,
    navigateTo,
    addToCart,
    showToast,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist' | 'rewards' | 'settings'>('orders');
  
  // Edit Profile modal/form state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(userProfile?.name || '');
  const [editEmail, setEditEmail] = useState(userProfile?.email || '');
  const [editPhone, setEditPhone] = useState(userProfile?.phone || '');

  // Add Address Modal state
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [newAddr, setNewAddr] = useState<ShippingAddress>({
    fullName: userProfile?.name || '',
    email: userProfile?.email || '',
    phone: userProfile?.phone || '',
    addressLine: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
  });

  if (!isUserLoggedIn || !userProfile) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-6">
        <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto text-[#D42D51]">
          <User className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-serif font-bold text-gray-900">You Are Not Signed In</h2>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Please sign in to your Suchi account to view your past orders, manage saved shipping addresses, and check your VIP rewards.
          </p>
        </div>
        <button
          onClick={() => navigateTo('login')}
          className="px-8 py-3 bg-[#D42D51] hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-lg inline-flex items-center gap-2"
        >
          <User className="w-4 h-4" /> Go to Login Page
        </button>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: editName,
      email: editEmail,
      phone: editPhone,
    });
    setIsEditingProfile(false);
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.addressLine || !newAddr.city || !newAddr.pincode) {
      alert('Please fill out all required address fields.');
      return;
    }
    addSavedAddress(newAddr);
    setIsAddAddressOpen(false);
    setNewAddr({
      fullName: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone,
      addressLine: '',
      apartment: '',
      city: '',
      state: '',
      pincode: '',
      landmark: '',
    });
  };

  const copyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast(`Coupon code "${code}" copied to clipboard! ✨`);
  };

  // Filter wishlist products
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Profile Banner Header */}
      <div className="bg-gradient-to-r from-stone-900 via-rose-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-stone-800">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* User Avatar & Details */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-lg bg-rose-900 shrink-0">
                {userProfile.avatarUrl ? (
                  <img
                    src={userProfile.avatarUrl}
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-rose-200 m-auto" />
                )}
              </div>
              <span className="absolute -bottom-2 -right-2 bg-amber-400 text-stone-950 p-1.5 rounded-full shadow-md" title="VIP Member">
                <Crown className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {userProfile.name}
                </h1>
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> {userProfile.membershipTier} Member
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-rose-200/80">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-rose-400" /> {userProfile.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-rose-400" /> {userProfile.phone}
                </span>
                <span className="flex items-center gap-1 text-stone-400">
                  <Clock className="w-3.5 h-3.5" /> Joined {userProfile.memberSince}
                </span>
              </div>

              {/* Reward points counter */}
              <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
                <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 flex items-center gap-2 text-xs">
                  <Gift className="w-4 h-4 text-amber-300" />
                  <span>
                    Reward Balance: <strong className="text-amber-300 font-bold">{userProfile.rewardPoints} PTS</strong> (₹{Math.floor(userProfile.rewardPoints / 2)} off)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons: Edit & Logout */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setEditName(userProfile.name);
                setEditEmail(userProfile.email);
                setEditPhone(userProfile.phone);
                setIsEditingProfile(true);
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 backdrop-blur-sm"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Profile
            </button>
            <button
              onClick={() => {
                logoutUser();
                navigateTo('home');
              }}
              className="px-4 py-2 bg-rose-600/80 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-rose-100 pb-3">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-[#D42D51] text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-rose-50 border border-gray-200'
          }`}
        >
          <Package className="w-4 h-4" /> My Orders ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
            activeTab === 'addresses'
              ? 'bg-[#D42D51] text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-rose-50 border border-gray-200'
          }`}
        >
          <MapPin className="w-4 h-4" /> Saved Addresses ({userProfile.savedAddresses.length})
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
            activeTab === 'wishlist'
              ? 'bg-[#D42D51] text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-rose-50 border border-gray-200'
          }`}
        >
          <Heart className="w-4 h-4" /> Wishlist ({wishlist.length})
        </button>

        <button
          onClick={() => setActiveTab('rewards')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
            activeTab === 'rewards'
              ? 'bg-[#D42D51] text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-rose-50 border border-gray-200'
          }`}
        >
          <Gift className="w-4 h-4 text-amber-500" /> VIP Rewards & Coupons
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
            activeTab === 'settings'
              ? 'bg-[#D42D51] text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-rose-50 border border-gray-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> Account Settings
        </button>
      </div>

      {/* TAB CONTENT 1: MY ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-rose-100 space-y-4">
              <ShoppingBag className="w-14 h-14 text-rose-300 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-xl font-serif font-bold text-gray-900">No Orders Placed Yet</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Discover our daily wear anti-tarnish earrings, lightweight pendants, and sparkling rings.
                </p>
              </div>
              <button
                onClick={() => navigateTo('shop')}
                className="px-6 py-2.5 bg-[#D42D51] text-white text-xs font-bold rounded-xl shadow-md hover:bg-rose-700 transition-all"
              >
                Browse Jewellery Store
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl border border-rose-100 p-5 shadow-xs space-y-4">
                  
                  {/* Order Top Summary */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-rose-50 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-sm">{order.id}</span>
                        <span className="text-xs text-gray-400">• {order.date}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Delivering to: <strong className="text-gray-700">{order.shippingAddress.fullName}</strong>, {order.shippingAddress.city} ({order.shippingAddress.pincode})
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'Processing'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        ● {order.status}
                      </span>
                      <strong className="text-base font-bold text-gray-900">₹{order.total}</strong>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="divide-y divide-rose-50">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-2.5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 overflow-hidden shrink-0">
                            {item.product.images && item.product.images[0] ? (
                              <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                            ) : (
                              <Sparkles className="w-5 h-5 text-rose-300 m-auto" />
                            )}
                          </div>
                          <div>
                            <h5 className="font-bold text-xs text-gray-900">{item.product.name}</h5>
                            <span className="text-[10px] text-gray-500">Qty: {item.quantity} • ₹{item.product.price} each</span>
                          </div>
                        </div>

                        <button
                          onClick={() => addToCart(item.product, 1)}
                          className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-[#D42D51] font-bold text-[11px] rounded-lg border border-rose-200 transition-all shrink-0"
                        >
                          Buy Again
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer Actions */}
                  <div className="bg-rose-50/40 p-3 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-gray-600">Estimated Delivery: <strong>{order.estimatedDelivery}</strong></span>
                    <button
                      onClick={() => navigateTo('order-confirmation')}
                      className="text-[#D42D51] font-bold hover:underline flex items-center gap-1"
                    >
                      View Invoice / Track Package <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 2: SAVED ADDRESSES */}
      {activeTab === 'addresses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-gray-900 text-lg">Your Shipping Addresses</h3>
            <button
              onClick={() => setIsAddAddressOpen(true)}
              className="px-4 py-2 bg-[#D42D51] hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add New Address
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userProfile.savedAddresses.map((addr, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-rose-200 p-5 shadow-xs relative space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-[#D42D51]" />
                    <strong className="font-bold text-gray-900 text-xs">{addr.fullName}</strong>
                    {idx === 0 && (
                      <span className="bg-rose-100 text-[#D42D51] text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                        DEFAULT
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => deleteSavedAddress(idx)}
                    className="p-1 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                    title="Delete address"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs text-gray-600 space-y-0.5">
                  <p>{addr.addressLine}</p>
                  {addr.apartment && <p>{addr.apartment}</p>}
                  <p>{addr.city}, {addr.state} - <strong>{addr.pincode}</strong></p>
                  {addr.landmark && <p className="text-[11px] text-gray-400">Landmark: {addr.landmark}</p>}
                  <p className="text-[11px] text-gray-500 pt-1">Phone: {addr.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: WISHLIST PREVIEW */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-gray-900 text-lg">Your Saved Wishlist ({wishlistProducts.length})</h3>
            <button
              onClick={() => navigateTo('wishlist')}
              className="text-xs font-bold text-[#D42D51] hover:underline flex items-center gap-1"
            >
              Open Full Wishlist <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-rose-100 space-y-3">
              <Heart className="w-12 h-12 text-rose-300 mx-auto" />
              <p className="text-xs text-gray-500">Your wishlist is currently empty.</p>
              <button
                onClick={() => navigateTo('shop')}
                className="px-6 py-2 bg-[#D42D51] text-white text-xs font-bold rounded-xl shadow-md"
              >
                Browse Jewellery Designs
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {wishlistProducts.map((prod) => (
                <div key={prod.id} className="bg-white rounded-2xl border border-rose-100 p-3 shadow-xs space-y-2 flex flex-col justify-between">
                  <div className="aspect-square rounded-xl overflow-hidden bg-rose-50 border border-rose-100 relative">
                    <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-gray-900 truncate">{prod.name}</h5>
                    <strong className="text-xs text-rose-600 block">₹{prod.price}</strong>
                  </div>
                  <button
                    onClick={() => addToCart(prod, 1)}
                    className="w-full py-1.5 bg-[#D42D51] text-white text-[11px] font-bold rounded-xl shadow-2xs hover:bg-rose-700 transition-all"
                  >
                    Add to Bag
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 4: REWARDS & COUPONS */}
      {activeTab === 'rewards' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-500 to-rose-600 text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-200 block">VIP Loyalty Privilege</span>
              <h3 className="text-2xl font-serif font-bold">You Have {userProfile.rewardPoints} Royal Points</h3>
              <p className="text-xs text-amber-100">100 Points = ₹50 discount on any Daily Wear & Anti-Tarnish purchase!</p>
            </div>
            <button
              onClick={() => showToast('✨ Your 650 points (₹325 off) will automatically apply at checkout!')}
              className="px-6 py-2.5 bg-white text-rose-700 hover:bg-amber-50 text-xs font-bold rounded-xl shadow-md shrink-0"
            >
              Redeem at Checkout
            </button>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif font-bold text-gray-900 text-base">Active Customer Promo Coupons</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="bg-white rounded-2xl border-2 border-dashed border-rose-300 p-4 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="bg-rose-100 text-[#D42D51] text-[10px] font-bold px-2 py-0.5 rounded">10% OFF</span>
                  <span className="text-[10px] text-gray-400">Valid All Orders</span>
                </div>
                <div>
                  <strong className="text-base font-bold text-gray-900 font-mono">SUCHI10</strong>
                  <p className="text-[11px] text-gray-500">Get instant 10% discount on entire jewellery catalog.</p>
                </div>
                <button
                  onClick={() => copyCouponCode('SUCHI10')}
                  className="w-full py-1.5 bg-rose-50 hover:bg-rose-100 text-[#D42D51] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Code
                </button>
              </div>

              <div className="bg-white rounded-2xl border-2 border-dashed border-amber-300 p-4 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded">₹500 OFF</span>
                  <span className="text-[10px] text-gray-400">Min Order ₹2,999</span>
                </div>
                <div>
                  <strong className="text-base font-bold text-gray-900 font-mono">DAILY500</strong>
                  <p className="text-[11px] text-gray-500">Flat ₹500 discount on daily wear anti-tarnish sets.</p>
                </div>
                <button
                  onClick={() => copyCouponCode('ROYAL500')}
                  className="w-full py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Code
                </button>
              </div>

              <div className="bg-white rounded-2xl border-2 border-dashed border-emerald-300 p-4 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded">FREE GIFT</span>
                  <span className="text-[10px] text-gray-400">Min Order ₹1,999</span>
                </div>
                <div>
                  <strong className="text-base font-bold text-gray-900 font-mono">GOLDENBOX</strong>
                  <p className="text-[11px] text-gray-500">Free Velvet Jewellery Box + Silver Polishing Cloth included.</p>
                </div>
                <button
                  onClick={() => copyCouponCode('GOLDENBOX')}
                  className="w-full py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Code
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-xs space-y-6">
          <h3 className="font-serif font-bold text-gray-900 text-xl">Account Information & Security</h3>

          <form onSubmit={handleSaveProfile} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-4 py-2.5 bg-rose-50/30 border border-rose-200 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-rose-50/30 border border-rose-200 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mobile Phone Number</label>
              <input
                type="tel"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full px-4 py-2.5 bg-rose-50/30 border border-rose-200 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#D42D51] text-white font-bold text-xs rounded-xl shadow-md hover:bg-rose-700 transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" /> Save Profile Details
            </button>
          </form>
        </div>
      )}

      {/* Modal: Edit Profile Info */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-rose-100">
            <div className="flex items-center justify-between border-b border-rose-100 pb-3">
              <h3 className="font-serif font-bold text-gray-900 text-lg">Edit Personal Profile</h3>
              <button onClick={() => setIsEditingProfile(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2 bg-rose-50/30 border border-rose-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-rose-50/30 border border-rose-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-4 py-2 bg-rose-50/30 border border-rose-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#D42D51] text-white text-xs font-bold rounded-xl shadow-md hover:bg-rose-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Saved Address */}
      {isAddAddressOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-rose-100 my-8">
            <div className="flex items-center justify-between border-b border-rose-100 pb-3">
              <h3 className="font-serif font-bold text-gray-900 text-lg">Add New Shipping Address</h3>
              <button onClick={() => setIsAddAddressOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAddress} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Recipient Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Priya Sharma"
                  value={newAddr.fullName}
                  onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                  className="w-full px-3.5 py-2 bg-rose-50/30 border border-rose-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Address Line *</label>
                <input
                  type="text"
                  required
                  placeholder="Flat No, House/Building Name, Street"
                  value={newAddr.addressLine}
                  onChange={(e) => setNewAddr({ ...newAddr, addressLine: e.target.value })}
                  className="w-full px-3.5 py-2 bg-rose-50/30 border border-rose-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="Mumbai"
                    value={newAddr.city}
                    onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                    className="w-full px-3.5 py-2 bg-rose-50/30 border border-rose-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">PIN Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="400001"
                    value={newAddr.pincode}
                    onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                    className="w-full px-3.5 py-2 bg-rose-50/30 border border-rose-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">State</label>
                  <input
                    type="text"
                    placeholder="Maharashtra"
                    value={newAddr.state}
                    onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                    className="w-full px-3.5 py-2 bg-rose-50/30 border border-rose-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={newAddr.phone}
                    onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                    className="w-full px-3.5 py-2 bg-rose-50/30 border border-rose-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D42D51]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddAddressOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#D42D51] text-white text-xs font-bold rounded-xl shadow-md hover:bg-rose-700"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
