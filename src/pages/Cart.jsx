import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CONFIG } from '../config';
import CartItem from '../components/CartItem';
import { ShoppingBag, Trash2, Tag, ArrowLeft, MessageCircle, ShieldCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const {
    cart,
    cartCount,
    subtotal,
    totalPrice,
    discountAmount,
    appliedDiscount,
    promoCode,
    promoError,
    applyPromo,
    removePromo,
    clearCart,
    setIsCheckoutOpen,
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (applyPromo(inputCode)) {
      setInputCode('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3.5 py-1 rounded-full">
          مراجعة الطلب 🌸
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-gray-900">
          سلة المشتريات
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          راجعي منتجاتكِ المختارة وأكملي طلبكِ بسهولة تامة عبر تطبيق واتساب
        </p>
      </div>

      {cart.length === 0 ? (
        /* Empty Cart State */
        <div className="text-center py-20 px-4 bg-white rounded-3xl border border-brand-100 shadow-soft max-w-lg mx-auto space-y-6">
          <div className="w-24 h-24 bg-brand-50 text-brand-500 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-12 h-12" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              سلتكِ فارغة حالياً 🌸
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
              لم تقومي بإضافة أي منتجات بعد. استكشفي أقسام المتجر واختاري ما يناسب جمالكِ!
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-md transition"
          >
            <span>ابدئي التسوق الآن</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Active Cart Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List (Left Column) */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-brand-100 shadow-soft space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-brand-100">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>المنتجات المحددة</span>
                <span className="text-xs text-brand-600 font-normal">
                  ({cartCount} قطعة)
                </span>
              </h2>

              <button
                onClick={clearCart}
                className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1.5 transition font-semibold"
              >
                <Trash2 className="w-4 h-4" />
                <span>تفريغ السلة</span>
              </button>
            </div>

            {/* Cart Items */}
            <div className="space-y-2">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Continue Shopping Link */}
            <div className="pt-4 border-t border-brand-100">
              <Link
                to="/shop"
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1.5"
              >
                <span>← مواصلة التسوق وإضافة منتجات أخرى</span>
              </Link>
            </div>
          </div>

          {/* Summary Card (Right Column) */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-brand-100 shadow-soft space-y-6 sticky top-28">
            <h3 className="text-base font-bold text-gray-900 pb-3 border-b border-brand-100">
              ملخص الطلب
            </h3>

            {/* Promo Code Input */}
            <div className="space-y-2">
              {appliedDiscount > 0 ? (
                <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800">
                  <div className="flex items-center gap-2 font-semibold">
                    <Tag className="w-4 h-4" />
                    <span>كود الخصم: {promoCode} ({appliedDiscount}%)</span>
                  </div>
                  <button
                    onClick={removePromo}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    إلغاء
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="كود الخصم (جربي ARKAN10)"
                    className="flex-1 px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-500 bg-brand-50/20"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold rounded-xl transition"
                  >
                    تطبيق
                  </button>
                </form>
              )}
              {promoError && (
                <p className="text-[11px] text-red-500">{promoError}</p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-3 text-xs sm:text-sm text-gray-600 pt-2 border-t border-brand-50">
              <div className="flex justify-between">
                <span>المجموع الفرعي:</span>
                <span className="font-bold text-gray-800">
                  {subtotal} {CONFIG.currency}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-brand-600 font-semibold">
                  <span>قيمة الخصم ({promoCode}):</span>
                  <span>-{discountAmount} {CONFIG.currency}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>الشحن والتوصيل:</span>
                <span className="text-emerald-600 font-bold">
                  {subtotal >= 600 ? 'مجاني 🌸' : 'يُحدد مع المندوب حسب المحافظة'}
                </span>
              </div>

              <div className="flex justify-between text-base font-black text-gray-900 pt-3 border-t border-brand-200">
                <span>الإجمالي المقدر:</span>
                <span className="text-xl text-brand-600">
                  {totalPrice} {CONFIG.currency}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full min-h-[50px] py-3.5 px-6 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition transform active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>إتمام الطلب عبر واتساب</span>
            </button>

            {/* Trust Points */}
            <div className="pt-4 border-t border-brand-50 space-y-2 text-[11px] text-gray-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <span>الدفع كاش عند الاستلام بعد معاينة المنتجات</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <span>شحن سريع لجميع محافظات مصر</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
