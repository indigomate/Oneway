import React from 'react';
import { WaveWordmark } from './WaveLogo';

interface HeaderProps {
  bagCount: number;
  onOpenBag: () => void;
}

export const Header: React.FC<HeaderProps> = ({ bagCount, onOpenBag }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#000000] border-b border-[#2a2a2a] px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between transition-colors">
      <a 
        href="#" 
        className="flex items-center gap-2 group outline-none"
        aria-label="ONEWYVE Home"
      >
        <WaveWordmark />
      </a>

      <button
        onClick={onOpenBag}
        className="min-h-[48px] px-5 py-2.5 rounded-full bg-[#0d0d0d] hover:bg-[#1a1a1a] text-[#ebe8e1] border border-[#2a2a2a] transition-all flex items-center justify-center gap-2 text-base font-medium cursor-pointer active:scale-95"
        aria-label={`Shopping bag with ${bagCount} items`}
      >
        <span>Bag ({bagCount})</span>
      </button>
    </header>
  );
};
