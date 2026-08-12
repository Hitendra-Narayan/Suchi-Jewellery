import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, X, CheckCircle2, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useShop();

  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3 p-4 bg-gray-900/95 text-white rounded-2xl shadow-2xl border border-rose-500/40 backdrop-blur-md">
        {toast.type === 'success' ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        ) : (
          <Info className="w-5 h-5 text-rose-400 shrink-0" />
        )}

        <div className="flex-1 text-xs font-medium pr-2">
          {toast.message}
        </div>

        <button
          onClick={hideToast}
          className="p-1 hover:bg-white/20 rounded-full transition-colors text-gray-300 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
