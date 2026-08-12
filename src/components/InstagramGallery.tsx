import React from 'react';
import { INSTAGRAM_POSTS } from '../data/products';
import { Instagram, Heart, Camera } from 'lucide-react';

export const InstagramGallery: React.FC = () => {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F7AFC4] uppercase tracking-widest bg-[#FDE7EF] px-3 py-1 rounded-full border border-[#F7AFC4]/50">
          <Instagram className="w-3.5 h-3.5" />
          @SuchiJewellery on Instagram
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#595959] mt-2">
          Real Happy Customers & Gallery
        </h2>
        <p className="text-xs text-gray-600 mt-1 max-w-md mx-auto">
          Tag us #SuchiJewellery or #MadeToMakeYouHappy on Instagram to get featured in our daily glow feed!
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {INSTAGRAM_POSTS.map((post) => (
          <div
            key={post.id}
            className="group relative rounded-2xl overflow-hidden aspect-square border border-rose-100 shadow-xs cursor-pointer bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50/60 flex flex-col items-center justify-center"
          >
            {post.imageUrl ? (
              <>
                <img
                  src={post.imageUrl}
                  alt="Suchi Jewellery Instagram post"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-rose-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-1">
                      <Instagram className="w-4 h-4" />
                      {post.handle}
                    </span>
                    <span className="flex items-center gap-1 text-rose-300">
                      <Heart className="w-3.5 h-3.5 fill-rose-300" />
                      {post.likes}
                    </span>
                  </div>
                  <p className="text-[11px] text-rose-100 leading-tight line-clamp-2">
                    {post.caption}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <div className="w-10 h-10 rounded-2xl bg-white text-[#F33A6A] flex items-center justify-center shadow-xs border border-rose-100 mb-2 group-hover:scale-110 transition-transform">
                  <Camera className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-gray-800">
                  {post.handle}
                </span>
                <span className="text-[10px] text-rose-600 font-medium mt-1">
                  Photo Pending
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
