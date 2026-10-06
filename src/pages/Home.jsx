import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import { CONFIG } from '../config';
import {
  Sparkles,
  ArrowLeft,
  Truck,
  ShieldCheck,
  CreditCard,
  MessageCircle,
  Star,
  Quote,
  Gift,
  Heart,
} from 'lucide-react';

export default function Home() {
  // Categories metadata with images
  const categories = [
    {
      name: 'مكياج',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'عناية بالبشرة',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'عناية بالشعر',
      image: 'https://images.unsplash.com/photo-1608248597359-5975053229b1?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'عطور',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'إكسسوارات',
      image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'أدوات شخصية',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80',
    },
  ];

  // Count products per category
  const categoriesWithCounts = useMemo(() => {
    return categories.map((cat) => ({
      ...cat,
      count: productsData.filter((p) => p.category === cat.name).length,
    }));
  }, []);

  // Discounted products (Offers)
  const discountedProducts = useMemo(() => {
    return productsData.filter((p) => p.oldPrice && p.oldPrice > p.price).slice(0, 4);
  }, []);

  // Best sellers
  const bestSellers = useMemo(() => {
    return productsData.filter((p) => p.isBestSeller).slice(0, 8);
  }, []);

  // New arrivals
  const newArrivals = useMemo(() => {
    return productsData.filter((p) => p.isNew).slice(0, 4);
  }, []);

  // Testimonials demo data
  const testimonials = [
    {
      id: 1,
      name: 'نورهان سعيد',
      city: 'القاهرة',
      comment: 'أحلى تجربة تسوق أونلاين بجد! الروج والفرش وصلوا في يومين والتغليف كان تحفة وكيوت أوي وريحته جميلة 🌸',
      rating: 5,
      date: 'منذ يومين',
    },
    {
      id: 2,
      name: 'مريم عبد العزيز',
      city: 'الإسكندرية',
      comment: 'سيروم الهيالورونيك أصلي وممتاز وفرق جداً في نضارة وشي. وخدمة العملاء على واتساب ذوق ومحترمين جداً.',
      rating: 5,
      date: 'منذ أسبوع',
    },
    {
      id: 3,
      name: 'سارة خالد',
      city: 'المنصورة',
      comment: 'الموقع تصميمه جميل والطلب على الواتساب مريح جداً وسريع بدون تعقيد بطاقات الدفع. تسلموا يا أحلى أركان!',
      rating: 5,
      date: 'منذ أسبوعين',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero Section */}
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* 2. Categories Section */}
        <section>
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              تصفحي حسب القسم
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              أقسام متجر أركان 🌸
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              كل ما تحتاجينه لإطلالة ساحرة وعناية يومية متكاملة
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {categoriesWithCounts.map((cat) => (
              <CategoryCard
                key={cat.name}
                category={cat.name}
                image={cat.image}
                count={cat.count}
              />
            ))}
          </div>
        </section>

        {/* 3. Featured Offers Section */}
        {discountedProducts.length > 0 && (
          <section className="bg-gradient-to-r from-brand-50 via-white to-brand-50 p-6 sm:p-10 rounded-[2.5rem] border border-brand-200/60 shadow-soft">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 text-brand-700 text-xs font-bold mb-1">
                  <Gift className="w-4 h-4" />
                  <span>توفير لا يُفوت</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                  عروض وخصومات مميزة 💖
                </h2>
              </div>
              <Link
                to="/offers"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-600 hover:text-brand-700 hover:underline"
              >
                <span>مشاهدة كل العروض</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {discountedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* 4. Best Sellers Section */}
        <section>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full mb-1 inline-block">
                اختيارات عميلاتنا
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                الأكثر مبيعاً في أركان ✨
              </h2>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-600 hover:text-brand-700 hover:underline"
            >
              <span>تصفحي كل المنتجات</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 5. Promotional Promo Code Banner */}
        <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-brand-600 to-brand-500 text-white p-8 sm:p-12 shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
            <div className="space-y-2 max-w-xl">
              <span className="px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-sm inline-block">
                كود خصم حصري لفترة محدودة 🌸
              </span>
              <h3 className="text-2xl sm:text-4xl font-black">
                احصلي على خصم 10% إضافي على طلبكِ!
              </h3>
              <p className="text-xs sm:text-sm text-brand-100">
                استخدمي الكود الترويجي عند الطلب في السلة أو عبر واتساب للاستمتاع بخصم فوري على كافة المنتجات.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="px-5 py-3 rounded-2xl bg-white text-brand-700 font-mono font-black text-lg tracking-widest shadow-inner border border-brand-200">
                {CONFIG.defaultDiscountCode}
              </div>
              <Link
                to="/shop"
                className="px-6 py-3 rounded-full bg-gray-900 hover:bg-black text-white font-bold text-xs sm:text-sm transition shadow-lg"
              >
                تسوقي بالكود الآن
              </Link>
            </div>
          </div>
        </section>

        {/* 6. Why Arkan? (Features) */}
        <section>
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              مميزاتنا
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              لماذا تختارين متجر أركان؟ 💖
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              نهتم بأدق التفاصيل لتكون تجربة تسوقكِ آمنة، مريحة، ومليئة بالبهجة
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-brand-100 shadow-soft text-center space-y-3 hover:border-brand-300 transition">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-gray-900">منتجات أصلية 100%</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                نضمن لكِ جودة جميع المستحضرات ومصادرها الموثوقة لحماية بشرتكِ وأناقتكِ.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-brand-100 shadow-soft text-center space-y-3 hover:border-brand-300 transition">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center mx-auto">
                <Truck className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-gray-900">توصيل سريع وآمن</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                شحن لجميع محافظات مصر وتغليف فاخر ومحكم يحافظ على المنتجات أثناء الشحن.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-brand-100 shadow-soft text-center space-y-3 hover:border-brand-300 transition">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center mx-auto">
                <CreditCard className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-gray-900">الدفع عند الاستلام</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                ادفعي براحة تامة كاش عند وصول المندوب لباب منزلكِ بعد معاينة الطلب.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-brand-100 shadow-soft text-center space-y-3 hover:border-brand-300 transition">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center mx-auto">
                <MessageCircle className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-gray-900">خدمة عملاء على واتساب</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                فريقنا متاح لمساعدتكِ في اختيار المنتجات وتأكيد طلبكِ خطوة بخطوة.
              </p>
            </div>
          </div>
        </section>

        {/* 7. Customer Reviews / Testimonials */}
        <section className="bg-brand-50/50 p-8 sm:p-12 rounded-[2.5rem] border border-brand-100">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-brand-600 bg-white px-3 py-1 rounded-full shadow-sm">
              آراء عميلاتنا
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              تجارب حقيقية لبنات أركان 🌸
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              نفخر دائماً برضا عميلاتنا وسعادتهن بالمنتجات والتوصيل
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="bg-white p-6 rounded-3xl border border-brand-100 shadow-soft flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                    "{test.comment}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-brand-50 text-xs">
                  <div>
                    <h4 className="font-bold text-gray-900">{test.name}</h4>
                    <span className="text-gray-400">{test.city}</span>
                  </div>
                  <span className="text-[11px] text-brand-500 font-medium">{test.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
