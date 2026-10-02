import React from 'react';

/**
 * Official ONEWYVE brand glyph and wordmark.
 */
export const WaveSymbol: React.FC<{ className?: string; size?: number; color?: string }> = ({
  className = "w-7 h-7",
  size = 28,
  color = "#ebe8e1"
}) => {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size }}
      aria-label="ONEWYVE wave symbol"
    >
      <path
        d="M24 64C24 64 34 50 56 46C76 42.5 86 28 88 18C90 14 96 14 98 17C104 26 102 44 88 56C72 70 54 74 36 73C24 72.5 12 77 6 82C4 84 2 83 3 80C6 72 14 65 24 64Z"
        fill={color}
      />
      <path
        d="M96 56C96 56 86 70 64 74C44 77.5 34 92 32 102C30 106 24 106 22 103C16 94 18 76 32 64C48 50 66 46 84 47C96 47.5 108 43 114 38C116 36 118 37 117 40C114 48 106 55 96 56Z"
        fill={color}
      />
      <path
        d="M38 65C48 57 60 54 74 53C80 52.8 84 55 86 58C76 66 64 69 50 70C44 70.2 40 68 38 65Z"
        fill="#000000"
        opacity="0.9"
      />
    </svg>
  );
};

export const WaveWordmark: React.FC<{ className?: string; size?: number }> = ({
  className = ""
}) => {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <WaveSymbol size={24} className="shrink-0" />
      <span 
        className="font-['Unbounded'] font-[800] uppercase text-lg sm:text-xl text-[#ebe8e1] tracking-tighter"
        style={{ fontStyle: 'oblique 10deg' }}
      >
        ONEWYVE
      </span>
    </div>
  );
};
