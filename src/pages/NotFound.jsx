import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Store, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto my-16 sm:my-24 px-4 text-center space-y-6">
      <div className="relative inline-block">
        <span className="text-8xl sm:text-9xl font-black text-brand-100 tracking-wider">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center text-4xl">
          🌸
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
          عذراً، الصفحة غير موجودة!
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
          يبدو أن الرابط الذي حاولتِ الوصول إليه غير صحيح أو تم نقل هذه الصفحة إلى مكان آخر.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition"
        >
          <Home className="w-4 h-4" />
          <span>الصفحة الرئيسية</span>
        </Link>

        <Link
          to="/shop"
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-brand-50 text-brand-700 border border-brand-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition"
        >
          <Store className="w-4 h-4" />
          <span>تصفحي المتجر</span>
        </Link>
      </div>
    </div>
  );
}
