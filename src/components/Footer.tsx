import React from 'react';
import { WaveWordmark } from './WaveLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#000000] border-t border-[#2a2a2a] py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Brand identity */}
        <div className="space-y-2">
          <WaveWordmark />
          <p className="text-base text-[#9a968e]">
            Catch your wave. Every wyve starts small.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-sm text-[#9a968e]">
          © {new Date().getFullYear()} ONEWYVE. All rights reserved.
        </div>

      </div>
    </footer>
  );
};
