import React, { useState } from 'react';
import { Product, Size } from '../data/products';
import { Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToBag: (product: Product, size: Size) => void;
}

const SIZES: Size[] = ['S', 'M', 'L', 'XL'];

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToBag }) => {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    if (!selectedSize) return;
    onAddToBag(product, selectedSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="bg-[#0d0d0d] rounded-2xl overflow-hidden border border-[#2a2a2a]/60 flex flex-col justify-between transition-all duration-300 hover:border-[#2a2a2a]">
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full bg-[#070707] overflow-hidden">
        <img
          src={product.image}
          alt={`${product.name} — ${product.edition}`}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />

        {/* Small Tag (e.g. "Limited" or Edition badge) */}
        {product.tag && (
          <div className="absolute top-3 left-3">
            <span 
              className={`text-xs font-medium px-2.5 py-1 rounded-full text-white ${
                product.isRedEdition 
                  ? 'bg-[#b3121a]' 
                  : product.isBrownEdition 
                  ? 'bg-[#4a3326]' 
                  : 'bg-[#2a2a2a]'
              }`}
            >
              {product.tag}
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between gap-4">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <h3 className="text-base sm:text-lg font-semibold text-[#ebe8e1]">
              {product.name}
            </h3>
            <span className="text-base sm:text-lg font-semibold text-[#ebe8e1] shrink-0">
              ${product.price}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-sm text-[#9a968e]">
              {product.edition}
            </p>
            {product.isBrownEdition && (
              <span className="w-2.5 h-2.5 rounded-full bg-[#4a3326]" title="Cocoa Brown Accent" />
            )}
            {product.isRedEdition && (
              <span className="w-2.5 h-2.5 rounded-full bg-[#b3121a]" title="Oxblood Red Accent" />
            )}
          </div>
        </div>

        {/* Size Selection (Single row S M L XL) */}
        <div className="space-y-2">
          <div className="grid grid-cols-4 gap-2">
            {SIZES.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`min-h-[44px] sm:min-h-[48px] rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center justify-center border ${
                    isSelected
                      ? 'bg-[#ebe8e1] text-[#000000] border-[#ebe8e1]'
                      : 'bg-[#141414] text-[#9a968e] hover:text-[#ebe8e1] hover:bg-[#1f1f1f] border-[#2a2a2a]'
                  }`}
                  aria-label={`Select size ${size}`}
                >
                  {size}
                </button>
              );
            })}
          </div>

          {/* Action Button: "Pick a size" until selected, then "Add to bag" */}
          <button
            type="button"
            onClick={handleAdd}
            disabled={!selectedSize}
            className={`w-full min-h-[48px] rounded-xl text-base font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
              !selectedSize
                ? 'bg-[#181818] text-[#9a968e] border border-[#2a2a2a] cursor-not-allowed'
                : justAdded
                ? 'bg-[#2a2a2a] text-[#ebe8e1]'
                : 'bg-[#ebe8e1] text-[#000000] hover:bg-white active:scale-[0.98]'
            }`}
          >
            {justAdded ? (
              <>
                <Check size={18} />
                <span>Added to bag</span>
              </>
            ) : selectedSize ? (
              <span>Add to bag</span>
            ) : (
              <span>Pick a size</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
