import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Logo } from './Logo';
import { Search, ShoppingBag, Heart, X, Sparkles, PhoneCall, Gift, ChevronDown, ArrowRight, Tag, User, Menu, ChevronRight, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { filterProductsByQuery } from '../utils/search';
import { processImageFile } from '../utils/imageUtils';

export const Header: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    getCartTotalItems,
    wishlist,
    searchQuery,
    setSearchQuery,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    announcementText,
    isUserLoggedIn,
    userProfile,
    customLogoUrl,
    updateCustomLogo,
    isAdminLoggedIn,
  } = useShop();

  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(true);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const collectionsRef = useRef<HTMLDivElement>(null);
  const headerLogoFileInputRef = useRef<HTMLInputElement>(null);

  const cartCount = getCartTotalItems();
  const wishlistCount = wishlist.length;

  const liveSearchResults = filterProductsByQuery(PRODUCTS, searchQuery);

  const handleHeaderLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const dataUrl = await processImageFile(file);
        updateCustomLogo(dataUrl);
      } catch (err: any) {
        alert(err.message || 'Error uploading brand logo file.');
      }
      if (headerLogoFileInputRef.current) {
        headerLogoFileInputRef.current.value = '';
      }
    }
  };

  // Auto focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close search dropdown and collections dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
        if (!searchQuery.trim()) {
          setIsSearchOpen(false);
        }
      }
      if (collectionsRef.current && !collectionsRef.current.contains(event.target as Node)) {
        setCategoriesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchQuery]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchFocused(false);
    navigateTo('shop');
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategoryFilter(categoryName);
    setCategoriesDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigateTo('shop');
  };

  const handleProductClick = (productId: string) => {
    setIsSearchFocused(false);
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
    navigateTo('product-detail', productId);
  };

  const POPULAR_SEARCH_TAGS = ['Daily Wear', 'Anti-Tarnish', 'Earrings', 'Pendant', 'Rings', 'Affordable', 'Bracelets'];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#FDE7EF] shadow-xs">
      {/* Top Announcement Ribbon */}
      <div className="bg-[#F7AFC4] text-gray-900 text-xs py-2 px-4 text-center font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-gray-800 animate-spin" style={{ animationDuration: '6s' }} />
        <span>{announcementText}</span>
        <Gift className="w-3.5 h-3.5 text-gray-800 hidden sm:inline-block" />
      </div>

      {/* Main Header Container - Balanced Grid for Centered Logo & Brand Name */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="grid grid-cols-12 items-center gap-2 sm:gap-4">
          
          {/* Left Column: Mobile Menu Button + Wishlist and Profile Icons */}
          <div className="col-span-3 sm:col-span-3 flex items-center justify-start gap-1 sm:gap-2">
            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-gray-800 hover:text-[#D42D51] hover:bg-[#FDE7EF] rounded-full transition-colors md:hidden cursor-pointer"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Heart Shape Icon (Wishlist) */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="relative p-2 text-gray-700 hover:text-[#E07090] hover:bg-[#FDE7EF] rounded-full transition-colors cursor-pointer"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#F7AFC4] text-gray-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow-xs border border-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* User Account / Profile Icon Button */}
            <button
              onClick={() => navigateTo(isUserLoggedIn ? 'profile' : 'login')}
              className={`relative p-2 rounded-full transition-colors flex items-center gap-1 cursor-pointer ${
                currentPage === 'profile' || currentPage === 'login'
                  ? 'bg-[#D42D51] text-white shadow-xs'
                  : 'text-gray-700 hover:text-[#E07090] hover:bg-[#FDE7EF]'
              }`}
              title={isUserLoggedIn ? `Profile (${userProfile?.name})` : 'Customer Login'}
            >
              <User className="w-5 h-5" />
              {isUserLoggedIn && (
                <span className="w-2 h-2 bg-emerald-500 rounded-full border border-white absolute top-1 right-1" />
              )}
            </button>

            {/* Optional Premium Tag for larger screens */}
            <span className="hidden xl:inline-block text-[11px] font-semibold text-rose-500 bg-[#FDE7EF] px-2.5 py-1 rounded-full border border-[#F7AFC4]/40 ml-1">
              ✨ Anti-Tarnish
            </span>
          </div>

          {/* Center Column: Big Brand Logo Aligned to Left of Brand Name */}
          <div className="col-span-6 sm:col-span-6 flex items-center justify-center cursor-pointer" onClick={() => navigateTo('home')}>
            <Logo size="md" />
          </div>

          {/* Right Column: Actions (Search, Admin, Cart) */}
          <div className="col-span-3 sm:col-span-3 flex items-center justify-end gap-1.5 sm:gap-2.5 relative">
            
            {/* Search Icon & Expandable Search Bar */}
            <div ref={searchRef} className="relative flex items-center">
              {isSearchOpen ? (
                /* Expandable Search Input Box when Search Icon is Clicked */
                <form
                  onSubmit={handleSearchSubmit}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-[260px] sm:w-[340px] md:w-[380px] bg-white border border-[#F7AFC4] rounded-full shadow-lg p-1 flex items-center gap-1 z-50 animate-in fade-in zoom-in-95 duration-200"
                >
                  <Search className="w-4 h-4 text-[#E07090] ml-3 shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search Daily Wear, Anti-Tarnish, Rings..."
                    value={searchQuery}
                    onFocus={() => setIsSearchFocused(true)}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchFocused(true);
                    }}
                    className="w-full px-2 py-1.5 text-xs font-medium text-gray-800 bg-transparent border-none focus:outline-none placeholder-gray-400"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setIsSearchFocused(true);
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
                      title="Clear"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-3 py-1 bg-[#F7AFC4] hover:bg-[#E587A3] text-gray-900 text-[10px] font-bold uppercase rounded-full shrink-0 shadow-2xs"
                  >
                    Go
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setIsSearchFocused(false);
                    }}
                    className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-[#FDE7EF] rounded-full shrink-0"
                    title="Close Search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                /* Search Icon Button right next to Heart shape icon */
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(true);
                    setIsSearchFocused(true);
                  }}
                  className="p-2 text-gray-700 hover:text-[#E07090] hover:bg-[#FDE7EF] rounded-full transition-colors relative"
                  title="Search Jewellery"
                >
                  <Search className="w-5 h-5" />
                  {searchQuery && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#D42D51] rounded-full" />
                  )}
                </button>
              )}

              {/* Live Search Results & Suggestions Dropdown Overlay */}
              {isSearchOpen && isSearchFocused && (
                <div className="absolute top-full right-0 mt-3 w-[300px] sm:w-[380px] md:w-[420px] bg-white rounded-2xl shadow-2xl border border-[#F7AFC4]/40 py-3 z-50 max-h-[75vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150">
                  {searchQuery.trim() ? (
                    <div>
                      <div className="px-4 py-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center justify-between border-b border-[#FDE7EF] mb-1">
                        <span>Live Results ({liveSearchResults.length})</span>
                        {liveSearchResults.length > 0 && (
                          <button
                            onClick={() => {
                              setIsSearchFocused(false);
                              setIsSearchOpen(false);
                              navigateTo('shop');
                            }}
                            className="text-[#E07090] font-bold hover:underline flex items-center gap-0.5"
                          >
                            View all <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {liveSearchResults.length === 0 ? (
                        <div className="p-6 text-center space-y-2">
                          <Search className="w-8 h-8 text-[#F7AFC4] mx-auto" />
                          <p className="text-xs font-semibold text-gray-800">No matching jewellery designs</p>
                          <p className="text-[11px] text-gray-500">Try searching for Daily Wear, Anti-Tarnish, Rings, or Earrings.</p>
                        </div>
                      ) : (
                        <div className="divide-y divide-[#FDE7EF]">
                          {liveSearchResults.slice(0, 5).map((product) => (
                            <div
                              key={product.id}
                              onClick={() => handleProductClick(product.id)}
                              className="px-4 py-2.5 hover:bg-[#FDE7EF]/60 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                {product.images && product.images[0] ? (
                                  <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    referrerPolicy="no-referrer"
                                    className="w-11 h-11 object-cover rounded-xl border border-[#FDE7EF] group-hover:scale-105 transition-transform shrink-0"
                                  />
                                ) : (
                                  <div className="w-11 h-11 rounded-xl bg-rose-50 border border-[#FDE7EF] flex items-center justify-center shrink-0">
                                    <Sparkles className="w-4 h-4 text-rose-400" />
                                  </div>
                                )}
                                <div className="min-w-0">
                                  <h5 className="font-bold text-xs text-gray-900 group-hover:text-[#E07090] truncate transition-colors">
                                    {product.name}
                                  </h5>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[10px] bg-[#FDE7EF] text-gray-800 px-1.5 py-0.2 rounded font-medium border border-[#F7AFC4]/40">
                                      {product.category}
                                    </span>
                                    <span className="text-[10px] text-amber-600 font-semibold">
                                      ★ {product.rating}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <strong className="text-xs font-bold text-gray-900 block">₹{product.price}</strong>
                                <span className="text-[10px] line-through text-gray-400">₹{product.originalPrice}</span>
                              </div>
                            </div>
                          ))}

                          {liveSearchResults.length > 5 && (
                            <div className="p-3 text-center bg-[#FDE7EF]/40">
                              <button
                                onClick={() => {
                                  setIsSearchFocused(false);
                                  setIsSearchOpen(false);
                                  navigateTo('shop');
                                }}
                                className="w-full py-1.5 bg-[#F7AFC4] text-gray-900 rounded-xl text-xs font-bold hover:bg-[#E587A3] transition-colors flex items-center justify-center gap-1.5"
                              >
                                Show All {liveSearchResults.length} Results in Shop <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                        <Tag className="w-3.5 h-3.5 text-[#E07090]" /> Popular Searches
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {POPULAR_SEARCH_TAGS.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => {
                              setSearchQuery(tag);
                              setIsSearchFocused(false);
                              setIsSearchOpen(false);
                              navigateTo('shop');
                            }}
                            className="px-2.5 py-1 bg-[#FDE7EF] hover:bg-[#F7AFC4] text-gray-900 border border-[#F7AFC4]/50 rounded-full text-xs font-medium transition-colors"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Shopping Bag Button */}
            <button
              onClick={() => navigateTo('cart')}
              className="relative flex items-center gap-2 px-3.5 py-2 bg-[#F7AFC4] hover:bg-[#E587A3] text-gray-900 rounded-full shadow-xs transition-all group cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold uppercase tracking-wider hidden sm:inline-block">Bag</span>
              <span className="bg-white text-gray-900 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-2xs">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links Bar */}
        <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8 pt-2.5 border-t border-[#FDE7EF] mt-2 text-xs font-semibold uppercase tracking-widest text-gray-700 relative z-30">
          <button
            onClick={() => { setSelectedCategoryFilter(null); navigateTo('home'); }}
            className={`hover:text-[#E07090] transition-colors py-1 ${currentPage === 'home' ? 'text-[#E07090] font-bold border-b-2 border-[#F7AFC4]' : ''}`}
          >
            Home
          </button>

          <button
            onClick={() => { setSelectedCategoryFilter(null); navigateTo('shop'); }}
            className={`hover:text-[#E07090] transition-colors py-1 ${currentPage === 'shop' && !selectedCategoryFilter ? 'text-[#E07090] font-bold border-b-2 border-[#F7AFC4]' : ''}`}
          >
            Shop All
          </button>

          {/* Categories Dropdown */}
          <div
            ref={collectionsRef}
            className="relative"
            onMouseEnter={() => setCategoriesDropdownOpen(true)}
            onMouseLeave={() => setCategoriesDropdownOpen(false)}
          >
            <button
              onClick={() => {
                setCategoriesDropdownOpen((prev) => !prev);
              }}
              type="button"
              className={`flex items-center gap-1 hover:text-[#E07090] py-1 transition-colors uppercase tracking-widest cursor-pointer ${
                currentPage === 'collections' || categoriesDropdownOpen ? 'text-[#E07090] font-bold border-b-2 border-[#F7AFC4]' : ''
              }`}
            >
              <span>Categories</span>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 group-hover:text-[#E07090] transition-transform ${categoriesDropdownOpen ? 'rotate-180 text-[#E07090]' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {categoriesDropdownOpen && (
              <div
                className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-2xl border border-[#F7AFC4]/50 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="px-3.5 py-1.5 text-[10px] font-bold text-gray-800 uppercase tracking-[0.2em] bg-[#FDE7EF] mb-1 flex items-center justify-between">
                  <span>Product Categories</span>
                  <Sparkles className="w-3 h-3 text-[#D42D51]" />
                </div>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.name)}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-[#FDE7EF] hover:text-[#D42D51] hover:font-bold flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] bg-[#F7AFC4]/40 text-gray-800 px-2 py-0.5 rounded-full font-semibold">
                      {cat.itemCount} items
                    </span>
                  </button>
                ))}
                <div className="pt-1 mt-1 border-t border-rose-100">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategoryFilter(null);
                      setCategoriesDropdownOpen(false);
                      navigateTo('shop');
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-[#D42D51] hover:bg-[#FDE7EF] flex items-center justify-between cursor-pointer"
                  >
                    <span>View All Categories in Shop</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => navigateTo('reviews')}
            className={`hover:text-[#E07090] transition-colors py-1 ${currentPage === 'reviews' ? 'text-[#E07090] font-bold border-b-2 border-[#F7AFC4]' : ''}`}
          >
            Reviews
          </button>

          <button
            onClick={() => navigateTo('contact')}
            className={`hover:text-[#E07090] transition-colors py-1 ${currentPage === 'contact' ? 'text-[#E07090] font-bold border-b-2 border-[#F7AFC4]' : ''}`}
          >
            Contact
          </button>
        </nav>
      </div>

      {/* Slide-In Mobile Navigation Menu (framer-motion) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              key="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 md:hidden"
            />

            {/* Slide-In Drawer Panel */}
            <motion.div
              key="mobile-menu-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed top-0 left-0 bottom-0 w-[82vw] max-w-sm bg-white z-50 md:hidden shadow-2xl flex flex-col border-r border-[#F7AFC4]/50 overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-4 bg-gradient-to-r from-[#FDE7EF] to-rose-50 border-b border-[#F7AFC4]/50 flex items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setIsMobileMenuOpen(false); navigateTo('home'); }}>
                  <Logo size="sm" />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-full transition-colors cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Greeting / Login Banner */}
              <div className="p-4 bg-[#FDE7EF]/40 border-b border-[#F7AFC4]/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[#F7AFC4] text-gray-900 flex items-center justify-center font-bold text-sm shrink-0 border border-white shadow-2xs">
                    {isUserLoggedIn && userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-gray-900 truncate">
                      {isUserLoggedIn ? `Hello, ${userProfile?.name || 'Customer'}` : 'Welcome to Suchi'}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {isUserLoggedIn ? `${userProfile?.membershipTier || 'Gold'} Member` : 'Sign in for exclusive offers'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo(isUserLoggedIn ? 'profile' : 'login');
                  }}
                  className="px-3 py-1.5 bg-[#D42D51] text-white text-[11px] font-bold rounded-full shadow-2xs hover:bg-[#b0223f] transition-colors shrink-0 cursor-pointer"
                >
                  {isUserLoggedIn ? 'Profile' : 'Sign In'}
                </button>
              </div>

              {/* Drawer Links Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Search Shortcut in Mobile Drawer */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search rings, necklaces, earrings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setIsMobileMenuOpen(false);
                        navigateTo('shop');
                      }
                    }}
                    className="w-full pl-9 pr-4 py-2 bg-rose-50/50 border border-[#F7AFC4]/60 rounded-full text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#D42D51] placeholder-gray-400"
                  />
                  <Search className="w-4 h-4 text-[#E07090] absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                {/* Primary Navigation Items */}
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 py-1">Menu</p>
                  
                  <button
                    onClick={() => { setSelectedCategoryFilter(null); setIsMobileMenuOpen(false); navigateTo('home'); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      currentPage === 'home' ? 'bg-[#FDE7EF] text-[#D42D51]' : 'text-gray-800 hover:bg-rose-50'
                    }`}
                  >
                    <span>Home</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>

                  <button
                    onClick={() => { setSelectedCategoryFilter(null); setIsMobileMenuOpen(false); navigateTo('shop'); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      currentPage === 'shop' && !selectedCategoryFilter ? 'bg-[#FDE7EF] text-[#D42D51]' : 'text-gray-800 hover:bg-rose-50'
                    }`}
                  >
                    <span>Shop All Jewellery</span>
                    <span className="text-[10px] bg-[#F7AFC4] text-gray-900 px-2 py-0.5 rounded-full font-extrabold">All</span>
                  </button>

                  {/* Categories Collapsible */}
                  <div className="pt-1">
                    <button
                      onClick={() => setIsMobileCategoriesOpen((prev) => !prev)}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-gray-800 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#D42D51]" /> Categories
                      </span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isMobileCategoriesOpen ? 'rotate-180 text-[#D42D51]' : ''}`} />
                    </button>

                    {isMobileCategoriesOpen && (
                      <div className="ml-3 pl-3 border-l-2 border-[#F7AFC4]/50 mt-1 space-y-1">
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => handleCategorySelect(cat.name)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                              selectedCategoryFilter === cat.name ? 'text-[#D42D51] font-bold bg-[#FDE7EF]/60' : 'text-gray-700 hover:text-[#D42D51] hover:bg-rose-50/60'
                            }`}
                          >
                            <span>{cat.name}</span>
                            <span className="text-[10px] text-gray-500">{cat.itemCount}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => { setIsMobileMenuOpen(false); navigateTo('wishlist'); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      currentPage === 'wishlist' ? 'bg-[#FDE7EF] text-[#D42D51]' : 'text-gray-800 hover:bg-rose-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-rose-500" /> Wishlist
                    </span>
                    {wishlistCount > 0 && (
                      <span className="bg-[#D42D51] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                        {wishlistCount}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => { setIsMobileMenuOpen(false); navigateTo('reviews'); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      currentPage === 'reviews' ? 'bg-[#FDE7EF] text-[#D42D51]' : 'text-gray-800 hover:bg-rose-50'
                    }`}
                  >
                    <span>Customer Reviews</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>

                  <button
                    onClick={() => { setIsMobileMenuOpen(false); navigateTo('contact'); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      currentPage === 'contact' ? 'bg-[#FDE7EF] text-[#D42D51]' : 'text-gray-800 hover:bg-rose-50'
                    }`}
                  >
                    <span>Contact Us</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                {/* Anti-Tarnish Feature Card in Drawer */}
                <div className="p-3.5 bg-gradient-to-br from-[#FDE7EF] to-amber-50/50 rounded-2xl border border-[#F7AFC4]/50 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                    <Sparkles className="w-4 h-4 text-amber-600" /> 100% Anti-Tarnish Guarantee
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    All Suchi Jewellery pieces are crafted with premium anti-tarnish coating for daily elegance.
                  </p>
                </div>
              </div>

              {/* Drawer Footer with Quick Support */}
              <div className="p-4 bg-gray-50 border-t border-[#F7AFC4]/30 space-y-2">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
                >
                  <MessageCircle className="w-4 h-4" /> Need Help? Chat on WhatsApp
                </a>
                <p className="text-[10px] text-center text-gray-400 font-medium">
                  Suchi Jewellery © {new Date().getFullYear()} • Premium Anti-Tarnish Collection
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

