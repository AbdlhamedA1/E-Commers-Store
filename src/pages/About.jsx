import React from 'react';
import { CONFIG } from '../config';
import { Sparkles, Heart, ShieldCheck, Users, Award, Smile, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const stats = [
    { value: '+15,000', label: 'عميلة سعيدة تثق بنا' },
    { value: '+200', label: 'منتج أصلي مختار بعناية' },
    { value: '5', label: 'سنوات من الخبرة والتميز' },
    { value: '4.9/5', label: 'متوسط تقييم منتجاتنا' },
  ];

  const values = [
    {
      title: 'الأصالة والموثوقية',
      description: 'لا نتهاون أبداً في جودة المنتجات، كل قطعة مضمونة وأصلية 100% من مصادرها الرسمية.',
      icon: ShieldCheck,
    },
    {
      title: 'العناية بالأنثى',
      description: 'نختار مستحضرات تناسب الفتيات بمختلف أنواع بشرتهن وأذواقهن بروح ناعمة وراقية.',
      icon: Heart,
    },
    {
      title: 'الشفافية وسهولة التعامل',
      description: 'بدون شروط معقدة، طلبكِ يتم بسهولة عبر واتساب مع الدفع عند الاستلام بعد المعاينة.',
      icon: Award,
    },
    {
      title: 'خدمة دافئة وودودة',
      description: 'فريق دعم أركان جاهز دائماً للرد على كل استفساراتكِ ومساعدتكِ كصديقة مقربة.',
      icon: Smile,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* 1. Header & Story */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3.5 py-1 rounded-full">
          قصتنا وهوية متجرنا 🌸
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 leading-tight">
          عن براند {CONFIG.brandName}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          بدأت قصة "أركان" من شغف حقيقي بالجمال الطبيعي، وإيمان بأن كل فتاة تستحق الحصول على أفضل مستحضرات التجميل والعناية الشخصية الأصلية بكل سهولة وثقة وأمان.
        </p>
      </section>

      {/* 2. Visual Story Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-brand-50">
          <img
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80"
            alt="منتجات أركان"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold text-brand-600 bg-brand-100/60 px-3 py-1 rounded-full">
              رؤيتنا ورسالتنا
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              نجعل الجمال تجربة ممتعة وبسيطة 🌸
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              نهدف إلى أن نكون الوجهة الأولى والمفضلة لكل فتاة تبحث عن مستحضرات تجميل أصلية، وأدوات عناية بالبشرة والشعر موثوقة في مصر، مع تقديم تجربة تسوق دافئة وسلسة عبر تطبيق واتساب بدون أي عناء.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-brand-50/70 border border-brand-200">
            <h3 className="text-sm font-bold text-brand-800 mb-1">رسالتنا لكِ:</h3>
            <p className="text-xs text-brand-900/80 leading-relaxed">
              "جمالكِ يبدأ من تفاصيل اهتمامكِ بنفسكِ. في أركان نوفر لكِ كل ما يجعلكِ تتألقين بثقة كل يوم."
            </p>
          </div>
        </div>
      </div>

      {/* 3. Fast Stats */}
      <section className="bg-gradient-to-r from-brand-600 to-brand-500 rounded-[2.5rem] p-8 sm:p-12 text-white shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <span className="block text-3xl sm:text-5xl font-black tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-brand-100 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Brand Values */}
      <section className="space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            قيمنا الأساسية
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            ما نؤمن به في أركان 💖
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-brand-100 shadow-soft text-center space-y-3 hover:border-brand-300 transition"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center mx-auto">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-gray-900">{v.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{v.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. CTA banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-brand-50 border border-brand-200 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-black text-gray-900">
          جاهزة لتجديد إشراقتكِ؟ 🌸
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
          تصفحي تشكيلة متجر أركان واستمتعي بخصومات حصرية وتوصيل سريع حتى باب منزلكِ.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-md transition"
        >
          <span>تصفحي المتجر الآن</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
