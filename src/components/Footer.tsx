import React from 'react';
import { Logo } from './Logo';
import { useShop } from '../context/ShopContext';
import { Mail, Phone, MapPin, Heart, ShieldCheck, Truck, RefreshCw, Award, Send } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export const Footer: React.FC = () => {
  const { navigateTo, setSelectedCategoryFilter, showToast } = useShop();

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategoryFilter(categoryName);
    navigateTo('shop');
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('🎉 Thank you for subscribing! Check your inbox for your 10% discount code.');
  };

  return (
    <footer className="bg-[#FDE7EF]/60 text-gray-800 border-t border-[#F7AFC4]/50 pt-12 pb-8 mt-16">
      {/* Brand USPs Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-10 border-b border-[#F7AFC4]/40">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center p-4 rounded-2xl bg-white shadow-xs border border-[#FDE7EF]">
            <ShieldCheck className="w-8 h-8 text-[#E07090] mb-2" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">100% Anti-Tarnish</h4>
            <p className="text-[11px] text-gray-500 mt-1">Skin friendly Clear Seal</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-white shadow-xs border border-[#FDE7EF]">
            <Truck className="w-8 h-8 text-[#E07090] mb-2" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Express Shipping</h4>
            <p className="text-[11px] text-gray-500 mt-1">Across India in 3-5 days</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-white shadow-xs border border-[#FDE7EF]">
            <RefreshCw className="w-8 h-8 text-[#E07090] mb-2" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Easy Returns</h4>
            <p className="text-[11px] text-gray-500 mt-1">7 days hassle-free return</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-white shadow-xs border border-[#FDE7EF]">
            <Award className="w-8 h-8 text-[#E07090] mb-2" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Crafted with Love</h4>
            <p className="text-[11px] text-gray-500 mt-1">Made to make you happy</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Column 1: Brand Logo & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-xs text-gray-600 leading-relaxed pr-4 max-w-sm mt-3">
              Suchi Jewellery brings you skin-friendly, anti-tarnish daily wear artificial jewellery crafted for affordable luxury and effortless everyday elegance.
            </p>
            <div className="flex items-center gap-3 text-xs font-semibold text-gray-900 pt-1">
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#F7AFC4] shadow-xs">
                <Heart className="w-3.5 h-3.5 fill-[#F7AFC4] text-[#E07090]" />
                Over 10,000+ Happy Customers
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07090] font-serif">Quick Navigation</h3>
            <ul className="space-y-2 text-xs font-medium text-gray-600">
              <li>
                <button onClick={() => { setSelectedCategoryFilter(null); navigateTo('home'); }} className="hover:text-[#E07090] transition-colors cursor-pointer">
                  Home Page
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategoryFilter(null); navigateTo('shop'); }} className="hover:text-[#E07090] transition-colors cursor-pointer">
                  Shop All Products
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('reviews')} className="hover:text-[#E07090] transition-colors cursor-pointer">
                  Customer Reviews
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#E07090] transition-colors cursor-pointer">
                  Contact & Support
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('profile')} className="hover:text-[#E07090] transition-colors cursor-pointer flex items-center gap-1 font-semibold text-gray-800">
                  👤 My VIP Account & Profile
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('login')} className="hover:text-[#E07090] transition-colors cursor-pointer">
                  Customer Sign In / Register
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('cart')} className="hover:text-[#E07090] transition-colors cursor-pointer">
                  My Cart
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07090] font-serif text-left">
              Categories
            </h3>
            <ul className="space-y-2 text-xs font-medium text-gray-600">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.name)}
                    className="hover:text-[#E07090] transition-colors text-left cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Customer Care & Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07090] font-serif">Contact Us</h3>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E07090] shrink-0 mt-0.5" />
                <span>Suchi Jewellery Studio, Pink City Galleria, Jaipur, Rajasthan 302001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E07090] shrink-0" />
                <span>+91 79995 99363 (WhatsApp Available)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E07090] shrink-0" />
                <span>support@suchijewellery.com</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-[11px] font-bold text-gray-800 mb-1.5 uppercase tracking-wider">Happiness Club (10% Off)</p>
              <form onSubmit={handleNewsletter} className="flex items-center gap-1">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-[#F7AFC4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#F7AFC4]"
                />
                <button
                  type="submit"
                  className="bg-[#F7AFC4] hover:bg-[#E587A3] text-gray-900 font-bold p-2 rounded-xl transition-colors shrink-0 cursor-pointer shadow-xs"
                  title="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Payment Methods & Bottom Ribbon */}
        <div className="pt-6 border-t border-[#F7AFC4]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 Suchi Jewellery. All rights reserved. Handcrafted with Love.</p>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Accepted Payments:</span>
            <span className="px-2.5 py-1 bg-white border border-[#F7AFC4]/50 rounded-lg text-[10px] font-bold text-blue-600 shadow-xs">
              Google Pay
            </span>
            <span className="px-2.5 py-1 bg-white border border-[#F7AFC4]/50 rounded-lg text-[10px] font-bold text-green-700 shadow-xs">
              BHIM / UPI
            </span>
            <span className="px-2.5 py-1 bg-white border border-[#F7AFC4]/50 rounded-lg text-[10px] font-bold text-purple-700 shadow-xs">
              PhonePe / Paytm
            </span>
            <span className="px-2.5 py-1 bg-white border border-[#F7AFC4]/50 rounded-lg text-[10px] font-bold text-gray-800 shadow-xs">
              Cards & COD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
