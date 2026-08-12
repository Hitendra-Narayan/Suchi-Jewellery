import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, Sparkles, Gem, ShieldCheck, Heart, Layers } from 'lucide-react';

export const CollectionsPage: React.FC = () => {
  const { products, setSelectedCategoryFilter, navigateTo } = useShop();

  const handleOpenCollection = (categoryName: string) => {
    setSelectedCategoryFilter(categoryName);
    navigateTo('shop');
  };

  return (
    <div className="min-h-screen bg-[#FFF8FA] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FDE7EF] via-[#F7AFC4]/40 to-[#FDE7EF] p-8 sm:p-12 border border-[#F7AFC4]/50 text-center shadow-sm">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-xs rounded-full text-xs font-bold text-[#D42D51] uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handcrafted & Anti-Tarnish</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Curated Jewellery Collections
            </h1>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Explore our premium range of skin-friendly, anti-tarnish daily wear jewellery. Designed for effortless elegance, lightweight comfort, and long-lasting shine.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-gray-800">
              <span className="flex items-center gap-1 bg-white/70 px-3 py-1 rounded-full border border-rose-200">
                <ShieldCheck className="w-4 h-4 text-[#D42D51]" /> Anti-Tarnish Coating
              </span>
              <span className="flex items-center gap-1 bg-white/70 px-3 py-1 rounded-full border border-rose-200">
                <Heart className="w-4 h-4 text-[#D42D51]" /> Skin-Friendly Alloy
              </span>
              <span className="flex items-center gap-1 bg-white/70 px-3 py-1 rounded-full border border-rose-200">
                <Gem className="w-4 h-4 text-[#D42D51]" /> High-Shine Finish
              </span>
            </div>
          </div>
        </div>

        {/* Collections Overview Cards */}
        <div className="space-y-12">
          {CATEGORIES.map((category) => {
            const categoryProducts = products.filter((p) => p.category === category.name);
            const lowestPrice = categoryProducts.length > 0 
              ? Math.min(...categoryProducts.map((p) => p.price))
              : 599;

            // Representative image
            const bannerImage = categoryProducts.length > 0 && categoryProducts[0].images?.[0]
              ? categoryProducts[0].images[0]
              : '';

            return (
              <div 
                key={category.id} 
                className="bg-white rounded-3xl border border-[#FDE7EF] shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 space-y-6 overflow-hidden"
              >
                {/* Collection Header Banner */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-b border-rose-100 pb-6">
                  {/* Image Preview */}
                  <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-rose-50 border border-rose-200 group">
                    {bannerImage ? (
                      <img 
                        src={bannerImage} 
                        alt={category.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-rose-100/50">
                        <Gem className="w-12 h-12 text-[#E07090]" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4">
                      <span className="text-white text-xs font-bold bg-[#D42D51] px-3 py-1 rounded-full shadow-xs">
                        {categoryProducts.length} Items Available
                      </span>
                    </div>
                  </div>

                  {/* Collection Info */}
                  <div className="md:col-span-2 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="p-2 bg-[#FDE7EF] text-[#D42D51] rounded-xl">
                        <Layers className="w-5 h-5" />
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                        {category.name} Collection
                      </h2>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <span className="text-xs font-bold text-gray-900 bg-rose-50 border border-rose-200 px-3 py-1 rounded-lg">
                        Starting at ₹{lowestPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-rose-700 font-semibold">
                        Daily Wear • Anti-Tarnish • Lightweight
                      </span>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => handleOpenCollection(category.name)}
                        className="px-6 py-2.5 bg-[#D42D51] hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 group/btn cursor-pointer"
                      >
                        <span>Explore {category.name} Collection</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Top Featured Products Preview Grid */}
                {categoryProducts.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                        Featured in {category.name}
                      </h3>
                      <button
                        onClick={() => handleOpenCollection(category.name)}
                        className="text-xs font-bold text-[#D42D51] hover:underline flex items-center gap-1"
                      >
                        View All ({categoryProducts.length}) <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {categoryProducts.slice(0, 4).map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Banner */}
        <div className="bg-stone-900 text-white p-8 sm:p-12 rounded-3xl text-center space-y-4 shadow-xl">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Looking for something specific?
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto">
            Browse our full catalog with custom price sorting, stock availability, and detailed craftsmanship specifications.
          </p>
          <div>
            <button
              onClick={() => {
                setSelectedCategoryFilter(null);
                navigateTo('shop');
              }}
              className="px-8 py-3 bg-[#D42D51] hover:bg-rose-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              Browse All Products in Shop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
