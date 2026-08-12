import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, Gem, Truck, Heart, RefreshCw } from 'lucide-react';

const usps = [
  {
    icon: <ShieldCheck className="w-5 h-5 text-[#E07090]" />,
    bg: 'bg-[#FDE7EF]',
    title: 'Anti-Tarnish',
    desc: 'Protective Clear Seal'
  },
  {
    icon: <Gem className="w-5 h-5 text-amber-700" />,
    bg: 'bg-amber-100',
    title: 'Daily Wear Quality',
    desc: 'Affordable & durable'
  },
  {
    icon: <Heart className="w-5 h-5 text-pink-600" />,
    bg: 'bg-pink-100',
    title: 'Skin Friendly',
    desc: '100% Nickel-Free'
  },
  {
    icon: <Truck className="w-5 h-5 text-emerald-700" />,
    bg: 'bg-emerald-100',
    title: 'Express Delivery',
    desc: 'Dispatched in 24 Hours'
  },
  {
    icon: <RefreshCw className="w-5 h-5 text-purple-700" />,
    bg: 'bg-purple-100',
    title: '7-Day Returns',
    desc: 'No Questions Asked'
  },
  {
    icon: <Sparkles className="w-5 h-5 text-rose-600" />,
    bg: 'bg-rose-100',
    title: 'Luxury Box',
    desc: 'Ready for Gifting'
  }
];

export const BrandUSPs: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="py-10 my-8 bg-gradient-to-r from-[#FDE7EF] via-[#FFF5F8] to-[#FDE7EF] rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border border-[#F7AFC4]/40 shadow-xs"
    >
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-bold text-[#E07090] uppercase tracking-widest font-serif">
          The Suchi Guarantee
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#595959] mt-1">
          Why Women Choose Suchi Jewellery
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
        {usps.map((usp, index) => (
          <motion.div
            key={usp.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
            className="bg-white/90 p-4 rounded-2xl border border-[#FDE7EF] shadow-xs flex flex-col items-center"
          >
            <div className={`p-2.5 ${usp.bg} rounded-2xl mb-2`}>
              {usp.icon}
            </div>
            <h4 className="text-xs font-bold text-gray-900">{usp.title}</h4>
            <p className="text-[10px] text-gray-500 mt-0.5">{usp.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
