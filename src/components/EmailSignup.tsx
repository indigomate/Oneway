import React, { useState } from 'react';
import { Check } from 'lucide-react';

export const EmailSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#0d0d0d] border-t border-[#2a2a2a] px-4 sm:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h3 
          className="font-['Unbounded'] font-[800] uppercase text-xl sm:text-3xl text-[#ebe8e1] tracking-tighter mb-3"
          style={{ fontStyle: 'oblique 10deg' }}
        >
          Join the wave
        </h3>
        <p className="text-base text-[#9a968e] mb-8">
          Subscribe for notification of future releases and private drops.
        </p>

        {submitted ? (
          <div className="min-h-[48px] px-6 py-3 rounded-full bg-[#181818] border border-[#2a2a2a] inline-flex items-center gap-2 text-[#ebe8e1] text-base">
            <Check size={18} className="text-[#ebe8e1]" />
            <span>You're on the list. We'll be in touch.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 min-h-[48px] px-5 rounded-full bg-[#000000] border border-[#2a2a2a] text-[#ebe8e1] placeholder-[#9a968e] text-base focus:outline-none focus:border-[#ebe8e1] transition-colors"
            />
            <button
              type="submit"
              className="min-h-[48px] px-8 rounded-full bg-[#ebe8e1] hover:bg-white text-[#000000] font-medium text-base transition-all active:scale-95 cursor-pointer shrink-0"
            >
              Sign up
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
