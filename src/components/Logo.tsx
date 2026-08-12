import React, { useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { processImageFile } from '../utils/imageUtils';
import { Camera, Sparkles } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  allowQuickUpload?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  allowQuickUpload = false,
}) => {
  const { customLogoUrl, imageOnlyLogo, updateCustomLogo, isAdminLoggedIn } = useShop();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const titleSizes = {
    sm: 'text-2xl sm:text-3xl',
    md: 'text-3xl sm:text-4xl md:text-5xl',
    lg: 'text-4xl sm:text-5xl md:text-6xl',
  };

  // Circular logo container dimensions (generous sizing so big logos are prominent)
  const circularLogoDimensions = {
    sm: 'w-10 h-10 sm:w-12 sm:h-12',
    md: 'w-14 h-14 sm:w-18 sm:h-18 md:w-22 md:h-22',
    lg: 'w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32',
  };

  const taglineMargins = {
    sm: 'mt-0.5',
    md: 'mt-1 sm:mt-1.5',
    lg: 'mt-2 sm:mt-2.5',
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const dataUrl = await processImageFile(file);
        updateCustomLogo(dataUrl);
      } catch (err: any) {
        alert(err.message || 'Error processing logo image file.');
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const showUploadOverlay = allowQuickUpload && isAdminLoggedIn;

  return (
    <div className={`relative inline-flex items-center justify-center cursor-pointer select-none group ${className}`}>
      {/* Hidden file input for quick upload */}
      {showUploadOverlay && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      )}

      {imageOnlyLogo && customLogoUrl ? (
        /* Mode 1: Image Only Logo in Circular Frame */
        <div className="relative inline-flex items-center justify-center">
          <div className={`${circularLogoDimensions[size]} rounded-full bg-gradient-to-br from-rose-50/80 via-white to-pink-50/90 border border-rose-200/80 shadow-2xs overflow-hidden flex items-center justify-center p-1 sm:p-1.5 group-hover:scale-108 transition-transform duration-300 ease-out`}>
            <img
              src={customLogoUrl}
              alt="Suchi Jewellery Brand Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          {showUploadOverlay && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              title="Upload brand logo image from device"
              className="absolute -top-1 -right-1 bg-white/95 hover:bg-[#F33A6A] hover:text-white text-gray-700 p-1.5 rounded-full shadow-md border border-rose-200 transition-all opacity-0 group-hover:opacity-100 cursor-pointer z-20"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ) : (
        /* Mode 2: Brand Logo Image ALIGNED TO THE LEFT in Circular Frame + Brand Name */
        <div className="flex items-center justify-center gap-2.5 sm:gap-4 md:gap-5">
          {/* Left Aligned Circular Logo Image (or Fallback Brand Seal) */}
          {customLogoUrl ? (
            <div className="relative inline-flex items-center justify-center shrink-0">
              <div className={`${circularLogoDimensions[size]} rounded-full bg-gradient-to-br from-rose-50/80 via-white to-pink-50/90 border border-rose-200/80 shadow-2xs overflow-hidden flex items-center justify-center p-1 sm:p-1.5 group-hover:scale-108 transition-transform duration-300 ease-out`}>
                <img
                  src={customLogoUrl}
                  alt="Brand Logo Emblem"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              {showUploadOverlay && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  title="Upload brand logo image from device"
                  className="absolute -top-1.5 -right-1.5 bg-white/95 hover:bg-[#F33A6A] hover:text-white text-gray-700 p-1.5 rounded-full shadow-md border border-rose-200 transition-all opacity-0 group-hover:opacity-100 cursor-pointer z-20"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : (
            /* Elegant Fallback Circular Emblem if no custom logo uploaded yet */
            <div className="relative inline-flex items-center justify-center shrink-0">
              <div className={`${circularLogoDimensions[size]} rounded-full bg-gradient-to-br from-rose-50 via-white to-pink-100 border border-rose-200/80 shadow-2xs flex items-center justify-center p-2 group-hover:scale-108 transition-transform duration-300`}>
                <Sparkles className="w-3/5 h-3/5 text-[#F33A6A]" />
              </div>
              {showUploadOverlay && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  title="Upload brand logo image from device"
                  className="absolute -top-1.5 -right-1.5 bg-white/95 hover:bg-[#F33A6A] hover:text-white text-gray-700 p-1.5 rounded-full shadow-md border border-rose-200 transition-all opacity-0 group-hover:opacity-100 cursor-pointer z-20"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Right Side Brand Name & Tagline */}
          <div className="flex flex-col items-start text-left justify-center">
            <h1
              style={{ fontFamily: "'Great Vibes', 'Dancing Script', 'Brush Script MT', cursive" }}
              className={`${titleSizes[size]} font-bold text-[#F33A6A] tracking-wide leading-none select-none drop-shadow-2xs group-hover:scale-102 transition-transform pb-0.5`}
            >
              Suchi Jewellery
            </h1>
            {showTagline && (
              <span className={`${taglineMargins[size]} text-[10px] sm:text-[11px] md:text-[12px] font-bold tracking-[0.2em] text-gray-500 uppercase font-sans`}>
                Made to Make You Happy
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};



