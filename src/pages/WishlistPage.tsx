import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, navigateTo } = useShop();

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  if (savedProducts.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-24 h-24 bg-rose-100/80 text-rose-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <Heart className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-gray-900">Your Wishlist is Empty</h1>
        <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
          Tap the heart icon on any Suchi Jewellery piece to save your favorite daily wear anti-tarnish designs here!
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-8 py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-full shadow-md transition-all inline-flex items-center gap-2"
        >
          <span>Discover Jewellery</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between border-b border-rose-100 pb-4">
        <div>
          <span className="text-xs font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 fill-rose-500" /> Saved Favourites
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-1">
            My Wishlist ({savedProducts.length} items)
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {savedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
