import React from 'react';
import { generateQuickWhatsAppUrl } from '../utils/whatsapp';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const handleClick = () => {
    window.open(generateQuickWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      <div className="absolute -top-10 right-0 hidden md:group-hover:flex items-center px-3 py-1.5 bg-gray-900 text-white text-xs rounded-xl shadow-lg whitespace-nowrap transition-all duration-200">
        تحدثي معنا مباشرة عبر واتساب 🌸
        <div className="w-2 h-2 bg-gray-900 rotate-45 absolute -bottom-1 right-4"></div>
      </div>
      <button
        onClick={handleClick}
        aria-label="تواصل عبر واتساب"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none"></span>
        <MessageCircle className="w-7 h-7 relative z-10 fill-current" />
      </button>
    </div>
  );
}
