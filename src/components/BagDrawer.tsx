import React, { useState } from 'react';
import { CartItem } from '../data/products';
import { X, Plus, Minus, Trash2, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface BagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearBag: () => void;
}

type CheckoutStep = 'bag' | 'form' | 'success';

export const BagDrawer: React.FC<BagDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearBag
}) => {
  const [step, setStep] = useState<CheckoutStep>('bag');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: ''
  });
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleStartCheckout = () => {
    setStep('form');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address) return;
    
    // Generate an order number
    const randomOrder = 'WYVE-' + Math.floor(10000 + Math.random() * 90000);
    setOrderNumber(randomOrder);
    setStep('success');
    onClearBag();
  };

  const handleClose = () => {
    if (step === 'success') {
      setStep('bag');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-[#0d0d0d] text-[#ebe8e1] border-l border-[#2a2a2a] flex flex-col justify-between shadow-2xl">
          
          {/* Drawer Header */}
          <div className="px-5 py-4 border-b border-[#2a2a2a] flex items-center justify-between">
            <div className="flex items-center gap-3">
              {step === 'form' && (
                <button
                  onClick={() => setStep('bag')}
                  className="p-2 -ml-2 rounded-lg text-[#9a968e] hover:text-[#ebe8e1] transition-colors cursor-pointer"
                  aria-label="Back to bag"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <h2 
                className="font-['Unbounded'] font-[800] uppercase text-lg text-[#ebe8e1] tracking-tight"
                style={{ fontStyle: 'oblique 10deg' }}
              >
                {step === 'bag' && `Bag (${items.reduce((acc, i) => acc + i.quantity, 0)})`}
                {step === 'form' && 'Checkout'}
                {step === 'success' && 'Order received'}
              </h2>
            </div>

            <button
              onClick={handleClose}
              className="p-2 -mr-2 rounded-lg text-[#9a968e] hover:text-[#ebe8e1] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close bag"
            >
              <X size={20} />
            </button>
          </div>

          {/* Drawer Content Body */}
          <div className="flex-1 overflow-y-auto p-5">
            
            {/* Step 1: Bag Items List */}
            {step === 'bag' && (
              <>
                {items.length === 0 ? (
                  <div className="py-20 text-center space-y-4">
                    <p className="text-base text-[#9a968e]">Your bag is currently empty.</p>
                    <button
                      onClick={onClose}
                      className="min-h-[48px] px-6 rounded-full bg-[#ebe8e1] text-[#000000] font-medium text-base hover:bg-white transition-all cursor-pointer"
                    >
                      Shop Wyve 01
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-[#2a2a2a]">
                    {items.map((item) => (
                      <div key={item.cartItemId} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-24 object-cover rounded-xl bg-[#000000] border border-[#2a2a2a] shrink-0"
                        />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <h3 className="text-base font-semibold text-[#ebe8e1] leading-tight">
                                {item.name}
                              </h3>
                              <span className="text-base font-semibold text-[#ebe8e1] shrink-0">
                                ${item.price * item.quantity}
                              </span>
                            </div>
                            <p className="text-sm text-[#9a968e] mt-0.5">{item.edition}</p>
                            <p className="text-sm text-[#ebe8e1] font-medium mt-1">Size: {item.size}</p>
                          </div>

                          {/* Quantity control & remove */}
                          <div className="flex items-center justify-between mt-3 pt-2">
                            <div className="flex items-center border border-[#2a2a2a] rounded-lg bg-[#141414]">
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-[#9a968e] hover:text-[#ebe8e1] cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-8 text-center text-sm font-medium text-[#ebe8e1]">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-[#9a968e] hover:text-[#ebe8e1] cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.cartItemId)}
                              className="text-sm text-[#9a968e] hover:text-[#b3121a] flex items-center gap-1 cursor-pointer transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Step 2: Simple Checkout Form */}
            {step === 'form' && (
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                <div>
                  <label className="block text-sm text-[#9a968e] mb-1.5">Full name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full min-h-[48px] px-4 rounded-xl bg-[#000000] border border-[#2a2a2a] text-[#ebe8e1] placeholder-[#9a968e] text-base focus:outline-none focus:border-[#ebe8e1]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#9a968e] mb-1.5">Email address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full min-h-[48px] px-4 rounded-xl bg-[#000000] border border-[#2a2a2a] text-[#ebe8e1] placeholder-[#9a968e] text-base focus:outline-none focus:border-[#ebe8e1]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#9a968e] mb-1.5">Street address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="123 Street name, Apt or Suite"
                    className="w-full min-h-[48px] px-4 rounded-xl bg-[#000000] border border-[#2a2a2a] text-[#ebe8e1] placeholder-[#9a968e] text-base focus:outline-none focus:border-[#ebe8e1]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-[#9a968e] mb-1.5">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="City"
                      className="w-full min-h-[48px] px-4 rounded-xl bg-[#000000] border border-[#2a2a2a] text-[#ebe8e1] placeholder-[#9a968e] text-base focus:outline-none focus:border-[#ebe8e1]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#9a968e] mb-1.5">Postal code</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="Postal code"
                      className="w-full min-h-[48px] px-4 rounded-xl bg-[#000000] border border-[#2a2a2a] text-[#ebe8e1] placeholder-[#9a968e] text-base focus:outline-none focus:border-[#ebe8e1]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#2a2a2a] text-sm text-[#9a968e]">
                  <span>Free express shipping included. Cash on delivery or test order mode.</span>
                </div>
              </form>
            )}

            {/* Step 3: Order Received Screen */}
            {step === 'success' && (
              <div className="py-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#181818] border border-[#2a2a2a] flex items-center justify-center mx-auto text-[#ebe8e1]">
                  <CheckCircle2 size={36} />
                </div>

                <div className="space-y-2">
                  <h3 
                    className="font-['Unbounded'] font-[800] uppercase text-2xl text-[#ebe8e1] tracking-tight"
                    style={{ fontStyle: 'oblique 10deg' }}
                  >
                    Order received
                  </h3>
                  <p className="text-base text-[#9a968e]">
                    Thank you, {formData.name || 'there'}. We have received your order.
                  </p>
                </div>

                <div className="bg-[#141414] p-4 rounded-xl border border-[#2a2a2a] text-left space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9a968e]">Order reference</span>
                    <span className="text-[#ebe8e1] font-semibold">{orderNumber}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9a968e]">Shipping to</span>
                    <span className="text-[#ebe8e1] truncate max-w-[200px]">{formData.city || 'Standard Address'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9a968e]">Estimated delivery</span>
                    <span className="text-[#ebe8e1]">2–4 business days</span>
                  </div>
                </div>

                <p className="text-sm text-[#9a968e]">
                  A confirmation email has been dispatched to {formData.email || 'your email'}.
                </p>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full min-h-[48px] rounded-xl bg-[#ebe8e1] text-[#000000] font-medium text-base hover:bg-white transition-all cursor-pointer"
                >
                  Continue shopping
                </button>
              </div>
            )}

          </div>

          {/* Drawer Footer Actions */}
          {items.length > 0 && step !== 'success' && (
            <div className="p-5 border-t border-[#2a2a2a] bg-[#0a0a0a] space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-base text-[#9a968e]">Subtotal</span>
                <span className="text-xl font-bold text-[#ebe8e1]">${subtotal}</span>
              </div>

              {step === 'bag' && (
                <button
                  type="button"
                  onClick={handleStartCheckout}
                  className="w-full min-h-[48px] rounded-xl bg-[#ebe8e1] hover:bg-white text-[#000000] font-medium text-base transition-all cursor-pointer flex items-center justify-center active:scale-[0.98]"
                >
                  Checkout
                </button>
              )}

              {step === 'form' && (
                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full min-h-[48px] rounded-xl bg-[#ebe8e1] hover:bg-white text-[#000000] font-medium text-base transition-all cursor-pointer flex items-center justify-center active:scale-[0.98]"
                >
                  Place order
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
