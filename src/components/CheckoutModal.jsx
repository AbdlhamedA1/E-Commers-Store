import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CONFIG } from '../config';
import { generateWhatsAppOrderUrl } from '../utils/whatsapp';
import { X, MessageCircle, User, Phone, MapPin, FileText, CheckCircle } from 'lucide-react';

export default function CheckoutModal() {
  const {
    cart,
    totalPrice,
    discountAmount,
    promoCode,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  const [error, setError] = useState('');
  const [orderSent, setOrderSent] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError('يرجى كتابة الاسم لإتمام الطلب');
      return;
    }

    // Build the WhatsApp order URL
    const url = generateWhatsAppOrderUrl(cart, {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      notes: formData.notes.trim(),
      discountCode: promoCode,
      discountAmount: discountAmount,
      total: totalPrice,
    });

    // Open WhatsApp in a new tab
    window.open(url, '_blank', 'noopener,noreferrer');
    setOrderSent(true);
  };

  const handleFinishAndClear = () => {
    clearCart();
    setIsCheckoutOpen(false);
    setOrderSent(false);
  };

  const handleFinishKeep = () => {
    setIsCheckoutOpen(false);
    setOrderSent(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-brand-100 max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            setIsCheckoutOpen(false);
            setOrderSent(false);
          }}
          className="absolute top-4 left-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {!orderSent ? (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-8 h-8 fill-emerald-500 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                إتمام الطلب عبر واتساب 🌸
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                املأي بياناتك البسيطة وسيتم فتح محادثة واتساب فوراً بطلبكِ منسقاً
              </p>
            </div>

            {/* Order Brief Summary */}
            <div className="bg-brand-50/60 p-4 rounded-2xl mb-6 text-xs text-gray-700 space-y-1.5 border border-brand-100">
              <div className="flex justify-between font-semibold">
                <span>عدد المنتجات:</span>
                <span>{cart.length} منتج</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-brand-700 font-semibold">
                  <span>كود الخصم ({promoCode}):</span>
                  <span>-{discountAmount} {CONFIG.currency}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-sm text-brand-900 pt-1 border-t border-brand-200">
                <span>الإجمالي للدفع عند الاستلام:</span>
                <span className="text-brand-600">{totalPrice} {CONFIG.currency}</span>
              </div>
            </div>

            {/* Customer Information Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-semibold">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  الاسم بالكامل <span className="text-brand-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="مثال: ياسمين أحمد"
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 text-sm"
                    required
                  />
                  <User className="w-4 h-4 text-gray-400 absolute right-3 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  رقم الموبايل
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="مثال: 01012345678"
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 text-sm"
                  />
                  <Phone className="w-4 h-4 text-gray-400 absolute right-3 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  العنوان / المحافظة
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="مثال: المعادي، القاهرة"
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 text-sm"
                  />
                  <MapPin className="w-4 h-4 text-gray-400 absolute right-3 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  ملاحظات إضافية (اختياري)
                </label>
                <div className="relative">
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="2"
                    placeholder="أي ملاحظة بخصوص ميعاد التوصيل أو تفاصيل المنتج..."
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 text-sm resize-none"
                  ></textarea>
                  <FileText className="w-4 h-4 text-gray-400 absolute right-3 top-3.5" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full min-h-[48px] py-3 px-6 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all transform active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>إرسال الطلب عبر واتساب الآن</span>
              </button>
            </form>
          </>
        ) : (
          /* Confirmation screen after opening WhatsApp */
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              تم تحويلكِ إلى واتساب بنجاح! 🌸
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed max-w-sm mx-auto">
              تأكدي من الضغط على زر "إرسال" داخل واتساب لتصل رسالتكِ لفريق أركان وسيقومون بتأكيد الطلب والشحن معكِ فوراً.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleFinishAndClear}
                className="flex-1 py-3 px-4 rounded-full bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition shadow"
              >
                إفراغ السلة وبدء تسوق جديد
              </button>
              <button
                onClick={handleFinishKeep}
                className="flex-1 py-3 px-4 rounded-full border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold transition"
              >
                الاحتفاظ بالمنتجات في السلة
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
