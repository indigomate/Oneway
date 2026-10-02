import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { Story } from './components/Story';
import { EmailSignup } from './components/EmailSignup';
import { Footer } from './components/Footer';
import { BagDrawer } from './components/BagDrawer';
import { PRODUCTS, Product, Size, CartItem } from './data/products';

export default function App() {
  const [bagItems, setBagItems] = useState<CartItem[]>([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'tees' | 'hoodies'>('all');

  // Total quantity in bag for Header counter
  const bagCount = bagItems.reduce((total, item) => total + item.quantity, 0);

  // Add item to bag handler
  const handleAddToBag = (product: Product, size: Size) => {
    const cartItemId = `${product.id}-${size}`;
    setBagItems((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          name: product.name,
          edition: product.edition,
          size,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  };

  // Quantity stepper handler
  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setBagItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove single item handler
  const handleRemoveItem = (cartItemId: string) => {
    setBagItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  // Clear bag after successful checkout
  const handleClearBag = () => {
    setBagItems([]);
  };

  // Filter products for Shop section
  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeFilter === 'tees') return p.category === 'tees';
    if (activeFilter === 'hoodies') return p.category === 'hoodies';
    return true;
  });

  const handleShopScroll = () => {
    const shopEl = document.getElementById('shop');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#ebe8e1] flex flex-col selection:bg-[#ebe8e1] selection:text-[#000000] overflow-x-hidden">
      
      {/* 1. Header: wordmark on left, Bag (n) button on right */}
      <Header 
        bagCount={bagCount} 
        onOpenBag={() => setIsBagOpen(true)} 
      />

      {/* 2. Hero: full-screen photo, headline, one line copy, one button */}
      <Hero 
        onShopClick={handleShopScroll} 
      />

      {/* 3. Shop: heading "Wyve 01 / The first wave", filter buttons, 1-col mobile & 3-col desktop */}
      <section id="shop" className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 
              className="font-['Unbounded'] font-[800] uppercase text-2xl sm:text-4xl text-[#ebe8e1] tracking-tighter"
              style={{ fontStyle: 'oblique 10deg' }}
            >
              Wyve 01 / The first wave
            </h2>
          </div>

          {/* Filter buttons All / Tees / Hoodies that fit on screen without scrolling sideways */}
          <div className="flex gap-2 w-full max-w-xs sm:w-auto">
            {(['all', 'tees', 'hoodies'] as const).map((filter) => {
              const label = filter === 'all' ? 'All' : filter === 'tees' ? 'Tees' : 'Hoodies';
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`flex-1 sm:px-6 min-h-[48px] rounded-full text-base font-medium transition-all cursor-pointer flex items-center justify-center border ${
                    isActive
                      ? 'bg-[#ebe8e1] text-[#000000] border-[#ebe8e1]'
                      : 'bg-[#0d0d0d] text-[#9a968e] hover:text-[#ebe8e1] border-[#2a2a2a]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 1-column grid on mobile (390px-safe) and 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToBag={handleAddToBag}
            />
          ))}
        </div>
      </section>

      {/* 4. Story: logo sheet image, 2 short sentences, short specs list */}
      <Story />

      {/* 5. Email signup, then a footer */}
      <EmailSignup />
      <Footer />

      {/* Slide-in Bag Drawer with Checkout & Order Confirmation */}
      <BagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        items={bagItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearBag={handleClearBag}
      />

    </div>
  );
}
