import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, X, ArrowUpDown, Sparkles, RefreshCw, Tag } from 'lucide-react';
import { filterProductsByQuery } from '../utils/search';

export const ShopPage: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    products,
  } = useShop();

  const [priceRange, setPriceRange] = useState<number>(6000);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'newest' | 'rating'>('recommended');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState<boolean>(false);

  // Filter products logic using enhanced search query matcher
  const filteredProducts = filterProductsByQuery(products, searchQuery)
    .filter((product) => {
      // Category filter
      if (selectedCategoryFilter) {
        if (product.category !== selectedCategoryFilter) return false;
      }

      // Price range
      if (product.price > priceRange) return false;

      // In stock
      if (onlyInStock && !product.inStock) return false;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0) || b.id.localeCompare(a.id);
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'recommended') return (b.isBestseller ? 2 : 0) + (b.isTrending ? 1 : 0) - ((a.isBestseller ? 2 : 0) + (a.isTrending ? 1 : 0));
      return 0;
    });

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategoryFilter(null);
    setPriceRange(6000);
    setOnlyInStock(false);
    setSortBy('recommended');
  };

  const POPULAR_TAGS = ['Daily Wear', 'Anti-Tarnish', 'Earrings', 'Pendants', 'Rings', 'Affordable', 'Bangles'];

  const hasActiveFilters = searchQuery || selectedCategoryFilter || priceRange < 6000 || onlyInStock;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="bg-[#F7AFC4] rounded-3xl p-6 sm:p-10 text-gray-900 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-[#F7AFC4]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-800 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-gray-900" />
            Suchi Jewellery Catalogue
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold mt-1">
            {selectedCategoryFilter ? `${selectedCategoryFilter} Collection` : 'Shop Daily Wear Jewellery'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-800 font-medium mt-1">
            100% Anti-tarnish, skin-friendly, affordable quality daily wear artificial jewellery.
          </p>
        </div>

        <div className="bg-white/40 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-bold border border-white/60 uppercase tracking-wider text-gray-900 shadow-2xs">
          Showing {filteredProducts.length} of {products.length} Designs
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="flex items-center justify-between bg-white p-4 sm:p-5 rounded-2xl border border-[#FDE7EF] shadow-xs">
        <div className="flex items-center gap-2">
          <span className="font-serif font-bold text-gray-900 text-sm sm:text-base">Catalog Controls</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-[#FDE7EF]/70 border border-[#F7AFC4]/50 px-3 py-2 rounded-xl text-xs shadow-2xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#E07090]" />
            <span className="text-gray-600 font-bold hidden sm:inline-block">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent font-bold text-gray-900 focus:outline-none text-xs cursor-pointer pr-1"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Filters Button */}
          <button
            onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
            className="px-4 py-2 bg-[#FDE7EF] text-gray-900 hover:bg-[#F7AFC4] rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#E07090]" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Filter & Sort Drawer Modal */}
      {filterDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xs h-full p-6 shadow-2xl flex flex-col space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-rose-100 pb-4">
              <h3 className="font-serif font-bold text-gray-900 text-base flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#E07090]" />
                Filter Jewellery
              </h3>
              <button
                onClick={() => setFilterDrawerOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-rose-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sort Dropdown in Drawer */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                Sort Jewellery By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-2.5 bg-rose-50/50 border border-rose-200 rounded-xl text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F7AFC4]"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="space-y-2 pt-4 border-t border-rose-100">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                Category
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedCategoryFilter(null)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    !selectedCategoryFilter
                      ? 'bg-[#D42D51] text-white'
                      : 'bg-rose-50 text-gray-700 hover:bg-rose-100'
                  }`}
                >
                  All
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategoryFilter(cat.name)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      selectedCategoryFilter === cat.name
                        ? 'bg-[#D42D51] text-white'
                        : 'bg-rose-50 text-gray-700 hover:bg-rose-100'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2 pt-4 border-t border-rose-100">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                Max Price: <span className="text-[#E07090] font-black">₹{priceRange.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min={500}
                max={6000}
                step={250}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#F7AFC4] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-semibold">
                <span>₹500</span>
                <span>₹6,000</span>
              </div>
            </div>

            {/* In Stock toggle */}
            <div className="pt-4 border-t border-rose-100">
              <label className="flex items-center gap-2.5 text-xs font-semibold text-gray-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#D42D51]"
                />
                <span>In Stock Only</span>
              </label>
            </div>

            <div className="mt-auto pt-6 border-t border-rose-100 flex items-center justify-between gap-3">
              <button
                onClick={clearAllFilters}
                className="text-xs font-bold text-[#E07090] hover:underline"
              >
                Reset All
              </button>
              <button
                onClick={() => setFilterDrawerOpen(false)}
                className="px-6 py-2.5 bg-[#D42D51] text-white text-xs font-bold rounded-xl shadow-md"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap bg-[#FDE7EF]/60 p-3 rounded-xl border border-[#F7AFC4]/40 text-xs">
          <span className="font-bold text-gray-600">Active Filters:</span>
          {selectedCategoryFilter && (
            <span className="bg-white border border-[#F7AFC4] px-2.5 py-1 rounded-full text-gray-900 font-semibold flex items-center gap-1">
              Category: {selectedCategoryFilter}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategoryFilter(null)} />
            </span>
          )}
          {searchQuery && (
            <span className="bg-white border border-[#F7AFC4] px-2.5 py-1 rounded-full text-gray-900 font-semibold flex items-center gap-1">
              Search: "{searchQuery}"
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
            </span>
          )}
          {priceRange < 6000 && (
            <span className="bg-white border border-[#F7AFC4] px-2.5 py-1 rounded-full text-gray-900 font-semibold flex items-center gap-1">
              Under ₹{priceRange}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceRange(6000)} />
            </span>
          )}
          <button
            onClick={clearAllFilters}
            className="text-[#E07090] font-bold hover:underline ml-auto flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            Clear All
          </button>
        </div>
      )}

      {/* Main Layout: Desktop Sidebar Filters + Product Grid */}
      <div className="flex gap-6 items-start">
        {/* Desktop Sidebar Filter Card */}
        <aside className="hidden lg:block w-64 bg-white p-5 rounded-3xl border border-[#FDE7EF] shadow-xs space-y-6 shrink-0">
          <div className="flex items-center justify-between border-b border-[#FDE7EF] pb-3">
            <h3 className="font-serif font-bold text-gray-900 text-sm flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-[#E07090]" />
              Filter Jewellery
            </h3>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-[11px] font-bold text-[#E07090] hover:underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-2">
              Max Price: <span className="text-[#E07090] font-extrabold">₹{priceRange.toLocaleString('en-IN')}</span>
            </label>
            <input
              type="range"
              min={500}
              max={6000}
              step={250}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#F7AFC4] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-medium mt-1">
              <span>₹500</span>
              <span>₹6,000</span>
            </div>
          </div>

          {/* In Stock toggle */}
          <div className="pt-2 border-t border-[#FDE7EF]">
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded text-[#F7AFC4] focus:ring-[#F7AFC4]"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#FDE7EF] p-8 space-y-4">
              <div className="w-16 h-16 bg-[#FDE7EF] text-[#E07090] rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-serif font-bold text-gray-900">
                No Suchi Jewellery designs match your filters
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Try searching for "Jhumka", "Daily Wear", "Anti-Tarnish", or reset your active filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 bg-[#F7AFC4] hover:bg-[#E587A3] text-gray-900 font-bold text-xs rounded-full shadow-xs cursor-pointer border border-[#F7AFC4]"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
