import React, { useState, useEffect, useMemo } from 'react';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';
import { CONFIG } from '../config';
import { useCart } from '../context/CartContext';
import { Sparkles, Clock, Copy, Check, Percent, Gift, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Offers() {
  const { showToast } = useCart();
  const [copied, setCopied] = useState(false);

  // Simulated countdown timer (e.g. 2 days, 14 hours, 35 minutes)
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 35,
    seconds: 40,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filter all discounted products
  const offerProducts = useMemo(() => {
    return productsData.filter((p) => p.oldPrice && p.oldPrice > p.price);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(CONFIG.defaultDiscountCode);
    setCopied(true);
    showToast(`تم نسخ كود الخصم (${CONFIG.defaultDiscountCode}) 🌸`, 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* 1. Main Hero Offers Banner */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-brand-700 via-brand-600 to-brand-500 text-white p-6 sm:p-12 shadow-2xl">
        {/* Glow effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-center lg:text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-sm">
              <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
              <span>مهرجان الجمال الأسبوعي 🌸</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black leading-tight">
              خصومات حصرية تصل حتى 40% على أرقى المنتجات!
            </h1>

            <p className="text-xs sm:text-sm text-brand-100 max-w-xl">
              استمتعي بأقوى التخفيضات على أحمر الشفاه، منتجات العناية بالبشرة، والفرش الاحترافية. الكميات محدودة والعروض سارية حتى نفاد الكمية!
            </p>

            {/* Promo Code Pill */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <span className="text-xs font-medium text-brand-100">كود الخصم الإضافي:</span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-brand-700 font-mono font-black text-sm hover:bg-brand-50 transition shadow"
              >
                <span>{CONFIG.defaultDiscountCode}</span>
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
              <span className="text-xs text-brand-200">
                (خصم {CONFIG.discountPercentage}% إضافي في السلة)
              </span>
            </div>
          </div>

          {/* Countdown Clock Box */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-inner w-full max-w-sm text-center">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-brand-100 mb-4">
                <Clock className="w-4 h-4 animate-pulse" />
                <span>ينتهي العرض الحالي خلال:</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center" dir="ltr">
                <div className="p-2 sm:p-3 rounded-2xl bg-white/20">
                  <span className="block text-xl sm:text-2xl font-black">{timeLeft.days}</span>
                  <span className="text-[10px] text-brand-100">أيام</span>
                </div>
                <div className="p-2 sm:p-3 rounded-2xl bg-white/20">
                  <span className="block text-xl sm:text-2xl font-black">{timeLeft.hours}</span>
                  <span className="text-[10px] text-brand-100">ساعات</span>
                </div>
                <div className="p-2 sm:p-3 rounded-2xl bg-white/20">
                  <span className="block text-xl sm:text-2xl font-black">{timeLeft.minutes}</span>
                  <span className="text-[10px] text-brand-100">دقائق</span>
                </div>
                <div className="p-2 sm:p-3 rounded-2xl bg-white/20">
                  <span className="block text-xl sm:text-2xl font-black text-rose-200">{timeLeft.seconds}</span>
                  <span className="text-[10px] text-brand-100">ثواني</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Offers Products Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-gray-900">
              جميع المنتجات المشمولة بالعرض 💖
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              متاح حالياً <span className="font-bold text-brand-600">{offerProducts.length}</span> منتج بخصم استثنائي
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700"
          >
            <span>تصفحي كل منتجات المتجر</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {offerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
