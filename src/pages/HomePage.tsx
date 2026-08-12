import React, { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { BrandUSPs } from '../components/BrandUSPs';
import { ReviewsSection } from '../components/ReviewsSection';
import { InstagramGallery } from '../components/InstagramGallery';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Flame } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo, setSelectedCategoryFilter, products } = useShop();
  const [activeTab, setActiveTab] = useState<'all' | 'bestsellers' | 'trending' | 'new'>('all');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'bestsellers') return p.isBestseller;
    if (activeTab === 'trending') return p.isTrending;
    if (activeTab === 'new') return p.isNewArrival;
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Brand USPs: The Suchi Guarantee / Why Women Choose Suchi Jewellery */}
      <BrandUSPs />

      {/* Featured Products Section (8 - 12 Products) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] bg-[#FDE7EF] px-3 py-1 rounded-full border border-[#F7AFC4]/50">
              <Flame className="w-3.5 h-3.5 fill-[#E07090] text-[#E07090]" />
              Curated for You
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-[#595959] mt-2 leading-tight">
              Featured Suchi Jewellery
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Skin-friendly daily wear artificial jewellery with 100% anti-tarnish guarantee.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-[#FDE7EF] p-1.5 rounded-2xl border border-[#F7AFC4]/50 text-xs font-bold overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap text-[11px] uppercase tracking-wider ${
                activeTab === 'all'
                  ? 'bg-[#F7AFC4] text-gray-900 shadow-xs'
                  : 'text-gray-700 hover:text-[#E07090]'
              }`}
            >
              All (12)
            </button>
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap text-[11px] uppercase tracking-wider ${
                activeTab === 'bestsellers'
                  ? 'bg-[#F7AFC4] text-gray-900 shadow-xs'
                  : 'text-gray-700 hover:text-[#E07090]'
              }`}
            >
              ★ Bestsellers
            </button>
            <button
              onClick={() => setActiveTab('trending')}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap text-[11px] uppercase tracking-wider ${
                activeTab === 'trending'
                  ? 'bg-[#F7AFC4] text-gray-900 shadow-xs'
                  : 'text-gray-700 hover:text-[#E07090]'
              }`}
            >
              Trending
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap text-[11px] uppercase tracking-wider ${
                activeTab === 'new'
                  ? 'bg-[#F7AFC4] text-gray-900 shadow-xs'
                  : 'text-gray-700 hover:text-[#E07090]'
              }`}
            >
              New Arrivals
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Shop CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={() => {
              setSelectedCategoryFilter(null);
              navigateTo('shop');
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#F7AFC4] hover:bg-[#E587A3] text-gray-900 text-xs font-bold uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-[#F7AFC4]/30 transition-all group cursor-pointer border border-[#F7AFC4]"
          >
            <span>Explore Entire Shop ({PRODUCTS.length} Items)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <ReviewsSection />

      {/* Instagram Gallery */}
      <InstagramGallery />
    </div>
  );
};
