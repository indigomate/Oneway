import React from 'react';
import { ASSETS } from '../data/rawImages';

export const Story: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#000000] border-t border-[#2a2a2a] px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Logo sheet image */}
          <div className="rounded-2xl overflow-hidden bg-[#0d0d0d] border border-[#2a2a2a]/80 shadow-2xl aspect-square flex items-center justify-center">
            <img
              src={ASSETS.storyLogoSheet}
              alt="ONEWYVE Brand Architecture"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>

          {/* Story Content */}
          <div className="flex flex-col items-start justify-center">
            <h2 
              className="font-['Unbounded'] font-[800] uppercase text-2xl sm:text-4xl text-[#ebe8e1] tracking-tighter mb-6"
              style={{ fontStyle: 'oblique 10deg' }}
            >
              Story
            </h2>

            {/* 2 short sentences */}
            <div className="space-y-4 mb-8 text-[#ebe8e1] text-base sm:text-lg leading-relaxed">
              <p>
                ONEWYVE was created on a single belief: every wyve starts small.
              </p>
              <p className="text-[#9a968e]">
                We engineer heavyweight garments in pure monochromatic shades, designed to outlast trends through sculptural cuts and subtle architectural details.
              </p>
            </div>

            {/* Short specs list */}
            <div className="w-full pt-6 border-t border-[#2a2a2a]">
              <ul className="space-y-3">
                {[
                  '280 GSM cotton',
                  'Oversized fit',
                  'Embroidered logo',
                  'Contrast piping'
                ].map((spec, index) => (
                  <li key={index} className="flex items-center gap-3 text-base text-[#ebe8e1]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ebe8e1] shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
