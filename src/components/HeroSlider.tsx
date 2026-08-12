import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

interface Slide {
  id: number;
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  categoryFilter?: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    image: '',
    badge: '✨ Everyday Anti-Tarnish Collection',
    title: 'Daily Wear Jewellery That Never Fades',
    subtitle: 'Explore ultra-lightweight, anti-tarnish artificial jewellery designed for work, coffee dates, and everyday elegance.',
    ctaText: 'Shop Daily Wear',
    categoryFilter: 'Pendants'
  },
  {
    id: 2,
    image: '',
    badge: '💎 Affordable Premium Quality',
    title: 'Sparkle Every Day Without Compromise',
    subtitle: 'Charming earrings, rings, and pendants engineered with skin-friendly anti-tarnish coating at budget-friendly prices.',
    ctaText: 'Explore Affordable Quality',
    categoryFilter: 'Earrings'
  },
  {
    id: 3,
    image: '',
    badge: '🛡️ 100% Skin-Friendly & Water-Resistant',
    title: 'Designed For Active, Effortless Daily Style',
    subtitle: 'Tarnish-proof artificial jewellery crafted with clear coat seal so your daily pieces stay flawless all day, every day.',
    ctaText: 'Browse Daily Must-Haves',
  }
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { navigateTo, setSelectedCategoryFilter, heroSlides } = useShop();

  const activeSlides = heroSlides && heroSlides.length > 0 ? heroSlides : [
    {
      id: 1,
      image: '',
      badge: '✨ Everyday Anti-Tarnish Collection',
      title: 'Daily Wear Jewellery That Never Fades',
      subtitle: 'Explore ultra-lightweight, anti-tarnish artificial jewellery designed for work, coffee dates, and everyday elegance.',
      ctaText: 'Shop Daily Wear',
      categoryFilter: 'Pendants'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);

  const handleCta = (slide: Slide) => {
    if (slide.categoryFilter) {
      setSelectedCategoryFilter(slide.categoryFilter);
    } else {
      setSelectedCategoryFilter(null);
    }
    navigateTo('shop');
  };

  return (
    <div className="relative w-full overflow-hidden bg-rose-950 text-white rounded-3xl shadow-xl my-4 max-w-7xl mx-auto border border-rose-200/30">
      {/* Slider Banner Track */}
      <div className="relative min-h-[460px] md:min-h-[520px] flex items-center">
        {activeSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center ${
              index === currentSlide ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with Ambient Gradient Overlay */}
            {slide.image ? (
              <img
                src={slide.image}
                alt={slide.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-10000"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-rose-950 via-rose-900 to-amber-950" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-900/70 to-rose-950/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent md:hidden" />

            {/* Content Box */}
            <div className="relative max-w-2xl px-6 sm:px-12 py-10 z-20 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-rose-500/80 to-amber-500/80 backdrop-blur-md rounded-full text-xs font-medium text-amber-100 border border-amber-300/30 tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                {slide.badge}
              </span>

              <h1 className="text-3xl sm:text-5xl font-serif font-normal text-white leading-tight tracking-wide drop-shadow-md">
                {slide.title}
              </h1>

              <p className="text-sm sm:text-base text-rose-100/90 font-light leading-relaxed max-w-xl">
                {slide.subtitle}
              </p>

              {/* Perks Row */}
              <div className="flex items-center gap-4 text-xs text-amber-200 pt-1 font-medium flex-wrap">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-rose-400" /> Anti-Tarnish Coating</span>
                <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-rose-400" /> Made to Make You Happy</span>
              </div>

              {/* Action Button */}
              <div className="pt-3 flex items-center gap-4">
                <button
                  onClick={() => handleCta(slide)}
                  className="px-8 py-3.5 bg-[#F7AFC4] hover:bg-[#E587A3] text-gray-900 font-extrabold text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-black/40 transition-all flex items-center gap-2 group cursor-pointer border border-[#F7AFC4]"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/30 hover:bg-rose-600/80 text-white backdrop-blur-md transition-all border border-white/20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/30 hover:bg-rose-600/80 text-white backdrop-blur-md transition-all border border-white/20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slider Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {activeSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentSlide ? 'w-8 bg-rose-400' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
