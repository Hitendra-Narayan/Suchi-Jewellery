import React, { useState } from 'react';
import { X, Sparkles, Send } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = '917999599363';
  const defaultMessage = encodeURIComponent(
    'Hi Suchi Jewellery team! I have a query about your anti-tarnish daily wear jewellery collection.'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  const handleOpenWhatsApp = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Quick Support Popup Card - Only visible when user clicks the WhatsApp button */}
      {isOpen && (
        <div className="mb-3 bg-white/95 backdrop-blur-md border border-emerald-100 shadow-2xl rounded-2xl p-4 max-w-[280px] sm:max-w-[300px] text-left relative animate-in fade-in slide-in-from-bottom-3 duration-200">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute -top-2 -right-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full p-1 transition-colors cursor-pointer border border-gray-200 shadow-xs"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2 border-b border-gray-100 pb-2">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">
                SJ
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 leading-tight">Suchi Customer Support</h4>
              <p className="text-[10px] text-emerald-600 font-medium">Replies in a few minutes</p>
            </div>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed font-medium mb-3 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100/60">
            👋 Hi there! Need help with anti-tarnish care, sizing, or daily wear jewelry options? Chat with us directly on WhatsApp!
          </p>

          <button
            onClick={handleOpenWhatsApp}
            className="w-full py-2 px-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Start WhatsApp Chat</span>
          </button>
        </div>
      )}

      {/* Primary Floating Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle WhatsApp Customer Support"
        title="Contact Customer Support on WhatsApp"
        className="relative group bg-[#25D366] hover:bg-[#1EBE57] text-white p-3.5 sm:p-4 rounded-full shadow-lg hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer border-2 border-white"
      >
        {/* SVG WhatsApp Icon */}
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 fill-current relative z-10 drop-shadow-xs"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m0-18.415C6.545 3.37 1.5 8.413 1.5 14.616c0 2.132.558 4.215 1.62 6.052L1.5 25.5l4.981-1.603a11.2 11.2 0 005.561 1.487h.005c6.202 0 11.248-5.044 11.25-11.248 0-3.003-1.169-5.828-3.293-7.953A11.173 11.173 0 0012.051 3.37" />
        </svg>

        {/* Online Indicator Badge */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-300 border-2 border-white rounded-full" />
      </button>
    </div>
  );
};
