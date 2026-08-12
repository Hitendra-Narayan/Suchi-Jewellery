import React from 'react';
import { motion } from 'motion/react';
import { CATEGORIES } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  const { setSelectedCategoryFilter, navigateTo } = useShop();

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategoryFilter(categoryName);
    navigateTo('shop');
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-2"
      >
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#E07090] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Collections</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#595959] mt-1">
            Explore Suchi Categories
          </h2>
        </div>
        <button
          onClick={() => {
            setSelectedCategoryFilter(null);
            navigateTo('collections');
          }}
          className="text-xs font-bold text-[#E07090] hover:text-gray-900 flex items-center gap-1 group cursor-pointer"
        >
          <span>View All Collections</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {CATEGORIES.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => handleCategoryClick(cat.name)}
            className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-3/4 border border-rose-100 shadow-xs hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-rose-900 via-rose-950 to-gray-950 flex flex-col justify-between"
          >
            {cat.image ? (
              <>
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-900/20 to-transparent group-hover:from-rose-950/90 transition-colors" />
              </>
            ) : (
              /* Fallback Gradient Card when category image is waiting to be uploaded */
              <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center bg-gradient-to-br from-rose-950 via-rose-900 to-amber-950 group-hover:from-rose-900 group-hover:to-pink-950 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-rose-200 border border-white/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
            )}

            <div className="absolute bottom-0 inset-x-0 p-3 text-center flex flex-col items-center z-10">
              <h3 className="font-serif font-bold text-white text-sm group-hover:text-amber-200 transition-colors">
                {cat.name}
              </h3>
              <span className="text-[10px] text-rose-200 font-medium mt-0.5 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/10">
                {cat.itemCount} Designs
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
