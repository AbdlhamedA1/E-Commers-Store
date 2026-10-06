import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Sparkles, ArrowLeft, Heart, ShieldCheck, Truck } from 'lucide-react';
import { CONFIG } from '../config';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-100/60 via-brand-50/40 to-white py-12 sm:py-20">
      {/* Decorative background glow circles */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-brand-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Right Text Column (RTL main column) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
            {/* Soft Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-brand-600 text-xs sm:text-sm font-bold shadow-soft border border-brand-200/60">
              <Sparkles className="w-4 h-4 text-brand-500 animate-spin" style={{ animationDuration: '6s' }} />
              <span>أحدث صيحات الجمال والعناية للبنات 🌸</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.25] tracking-tight">
              أهلاً بكِ في <span className="text-brand-500 relative inline-block">
                {CONFIG.brandName}
                <svg className="absolute -bottom-2 inset-x-0 w-full text-brand-300/50" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              <br />
              جمالكِ يبدأ من التفاصيل
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              تسوقي تشكيلة مختارة بعناية فائقة من مستحضرات التجميل الأصلية، وأقوى منتجات العناية بالبشرة والشعر، والإكسسوارات الراقية بأسعار منافسة ودفع عند الاستلام.
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/shop"
                className="min-h-[48px] px-8 py-3.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-brand-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>تسوقي الآن</span>
              </Link>

              <Link
                to="/offers"
                className="min-h-[48px] px-7 py-3.5 rounded-full bg-white hover:bg-brand-50 text-brand-700 font-bold text-sm sm:text-base flex items-center gap-2 shadow-soft border border-brand-200 transition-all transform hover:-translate-y-0.5"
              >
                <span>عروض وخصومات حصرية</span>
                <ArrowLeft className="w-4 h-4 text-brand-500" />
              </Link>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 border-t border-brand-200/60 grid grid-cols-3 gap-2 max-w-lg mx-auto lg:mx-0 text-center">
              <div className="p-2 bg-white/80 rounded-2xl border border-brand-100 shadow-sm">
                <span className="block font-black text-brand-600 text-base sm:text-lg">100%</span>
                <span className="text-[11px] text-gray-500 font-medium">منتجات أصلية</span>
              </div>
              <div className="p-2 bg-white/80 rounded-2xl border border-brand-100 shadow-sm">
                <span className="block font-black text-brand-600 text-base sm:text-lg">سريع</span>
                <span className="text-[11px] text-gray-500 font-medium">شحن لكل مصر</span>
              </div>
              <div className="p-2 bg-white/80 rounded-2xl border border-brand-100 shadow-sm">
                <span className="block font-black text-brand-600 text-base sm:text-lg">واتساب</span>
                <span className="text-[11px] text-gray-500 font-medium">طلب سهل ومباشر</span>
              </div>
            </div>
          </div>

          {/* Left Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Rounded Image */}
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-brand-100">
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80"
                  alt="مستحضرات تجميل أركان"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <div className="absolute bottom-6 inset-x-6 text-white text-center">
                  <p className="text-xs font-semibold opacity-90">تشكيلة حصرية للبنات</p>
                  <p className="text-lg font-black mt-0.5">ثقة، أنوثة، ونضارة تدوم 🌸</p>
                </div>
              </div>

              {/* Floating Badge 1 (Top Left) */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-xl border border-brand-100 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3.5s' }}>
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-500 flex items-center justify-center">
                  <Heart className="w-5 h-5 fill-rose-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">أكثر من</p>
                  <p className="text-sm font-bold text-gray-900">+15,000 عميلة سعيدة</p>
                </div>
              </div>

              {/* Floating Badge 2 (Bottom Right) */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-xl border border-brand-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">ضمان الجودة</p>
                  <p className="text-sm font-bold text-gray-900">أصلي ومضمون 100%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
