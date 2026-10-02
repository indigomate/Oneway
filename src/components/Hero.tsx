import React from 'react';
import { ASSETS } from '../data/rawImages';

interface HeroProps {
  onShopClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick }) => {
  return (
    <section className="relative w-full min-h-[90vh] sm:min-h-screen flex items-end bg-[#000000] overflow-hidden">
      {/* Background Image */}
      <img
        src={ASSETS.heroPhoto}
        alt="ONEWYVE Streetwear Editorial"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Subtle Dark Gradient Overlay for contrast and readability */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"
        aria-hidden="true"
      />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 pb-16 sm:pb-24 pt-20 flex flex-col items-start">
        {/* Headline: Catch your wave (one word per line, Unbounded 800, uppercase, slanted 10 deg) */}
        <h1 
          className="font-['Unbounded'] font-[800] uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#ebe8e1] tracking-tighter leading-[0.92] mb-5"
          style={{ fontStyle: 'oblique 10deg' }}
        >
          <span className="block">Catch</span>
          <span className="block">your</span>
          <span className="block">wave</span>
        </h1>

        {/* One line of copy */}
        <p className="text-[#9a968e] text-base sm:text-lg max-w-md mb-8">
          Every wyve starts small. Heavyweight silhouettes engineered for movement.
        </p>

        {/* One button: Shop Wyve 01 */}
        <button
          onClick={onShopClick}
          className="min-h-[48px] px-8 py-3.5 rounded-full bg-[#ebe8e1] hover:bg-white text-[#000000] font-medium text-base transition-all duration-200 shadow-lg active:scale-95 cursor-pointer flex items-center justify-center"
        >
          Shop Wyve 01
        </button>
      </div>
    </section>
  );
};
