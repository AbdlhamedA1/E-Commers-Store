import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CONFIG } from '../config';
import CartItem from './CartItem';
import { X, ShoppingBag, Trash2, ArrowLeft, Tag, Check, MessageCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function CartDrawer() {
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
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (applyPromo(inputCode)) {
      setInputCode('');
    }
  };

  const handleStartShopping = () => {
    setIsCartOpen(false);
    navigate('/shop');
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-brand-100 animate-slide-left">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-brand-100 flex items-center justify-between bg-brand-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-600" />
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                سلة المشتريات
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-brand-200 text-brand-800 text-xs font-bold">
                {cartCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-white text-gray-400 hover:text-gray-700 transition"
              aria-label="إغلاق السلة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-brand-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center text-brand-500">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-800 mb-1">
                    سلتكِ فارغة حالياً 🌸
                  </h3>
                  <p className="text-xs text-gray-500 max-w-xs">
                    لم تقومي بإضافة أي منتج بعد. تصفحي مجموعاتنا الرائعة واختاري ما يناسب جمالكِ!
                  </p>
                </div>
                <button
                  onClick={handleStartShopping}
                  className="py-2.5 px-6 rounded-full bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-md transition transform active:scale-95"
                >
                  ابدئي التسوق الآن
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onCloseDrawer={() => setIsCartOpen(false)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-brand-100 bg-brand-50/30 space-y-3">
              {/* Promo Code section */}
              <div className="space-y-1">
                {appliedDiscount > 0 ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>كود مفعّل: {promoCode} (خصم {appliedDiscount}%)</span>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-red-500 hover:text-red-700 font-bold text-[11px]"
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
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-500 bg-white"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-brand-100 hover:bg-brand-200 text-brand-800 text-xs font-bold rounded-xl transition"
                    >
                      تطبيق
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-500 px-1">{promoError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600 pt-1">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span className="font-semibold text-gray-800">
                    {subtotal} {CONFIG.currency}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-brand-600">
                    <span>قيمة الخصم:</span>
                    <span className="font-semibold">
                      -{discountAmount} {CONFIG.currency}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-brand-200">
                  <span>الإجمالي:</span>
                  <span className="text-base font-extrabold text-brand-600">
                    {totalPrice} {CONFIG.currency}
                  </span>
                </div>
              </div>

              {/* Main Actions */}
              <button
                onClick={handleProceedCheckout}
                className="w-full min-h-[48px] py-3 px-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition transform active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>إتمام الطلب عبر واتساب</span>
              </button>

              <div className="flex items-center justify-between pt-1 text-xs">
                <Link
                  to="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="text-brand-600 hover:text-brand-700 font-semibold underline flex items-center gap-1"
                >
                  <span>صفحة السلة كاملة</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={clearCart}
                  className="text-gray-400 hover:text-red-500 font-medium flex items-center gap-1 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>تفريغ السلة</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
