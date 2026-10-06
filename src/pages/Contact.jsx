import React, { useState } from 'react';
import { CONFIG } from '../config';
import { generateQuickWhatsAppUrl } from '../utils/whatsapp';
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Sparkles,
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, TikTokIcon } from '../components/SocialIcons';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `مرحباً ${CONFIG.brandName} 🌸\nأنا ${formData.name || 'عميلة'}\nالموضوع: ${formData.subject || 'استفسار عام'}\n${formData.message}\nرقمي: ${formData.phone || 'غير مسجل'}`;
    const url = generateQuickWhatsAppUrl(text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3.5 py-1 rounded-full">
          يسعدنا تواصلكِ 🌸
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-gray-900">
          تواصل مع فريق أركان
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          جاهزون للرد على كل استفساراتكِ ومساعدتكِ في أي وقت طوال أيام الأسبوع
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main WhatsApp Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-tr from-emerald-500 to-emerald-600 text-white shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <MessageCircle className="w-7 h-7 fill-white text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold">تحدثي معنا مباشرة على واتساب</h3>
              <p className="text-xs text-emerald-100 mt-1 leading-relaxed">
                أسرع وسيلة للاستفسار وتأكيد الطلبات ومتابعة الشحن مع خدمة العملاء
              </p>
            </div>
            <a
              href={`https://wa.me/${CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-emerald-700 font-bold text-xs hover:bg-emerald-50 transition shadow"
            >
              <span>فتح محادثة واتساب الآن</span>
              <MessageCircle className="w-4 h-4 fill-current" />
            </a>
          </div>

          {/* Details list */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-brand-100 shadow-soft space-y-5">
            <h3 className="text-base font-bold text-gray-900 border-r-2 border-brand-500 pr-2">
              بيانات التواصل الرسمية
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-800 block">المقر الرئيسي:</span>
                  <span>{CONFIG.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-800 block">ساعات العمل والدعم:</span>
                  <span>{CONFIG.workingHours}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-800 block">رقم الهاتف:</span>
                  <span dir="ltr">{CONFIG.phoneDisplay}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-800 block">البريد الإلكتروني:</span>
                  <span>{CONFIG.email}</span>
                </div>
              </div>
            </div>

            {/* Social media */}
            <div className="pt-4 border-t border-brand-100">
              <span className="text-xs font-bold text-gray-800 block mb-3">
                تابعينا على وسائل التواصل:
              </span>
              <div className="flex items-center gap-3">
                {CONFIG.instagram && (
                  <a
                    href={CONFIG.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-brand-50 hover:bg-brand-500 hover:text-white text-brand-600 flex items-center justify-center transition border border-brand-200"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                )}
                {CONFIG.facebook && (
                  <a
                    href={CONFIG.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-brand-50 hover:bg-brand-500 hover:text-white text-brand-600 flex items-center justify-center transition border border-brand-200"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                )}
                {CONFIG.tiktok && (
                  <a
                    href={CONFIG.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-brand-50 hover:bg-brand-500 hover:text-white text-brand-600 flex items-center justify-center transition border border-brand-200"
                    aria-label="TikTok"
                  >
                    <TikTokIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-brand-100 shadow-soft">
          <div className="mb-6 space-y-1">
            <h3 className="text-xl font-bold text-gray-900">أرسلي رسالتكِ أو استفساركِ</h3>
            <p className="text-xs text-gray-500">
              املأي الحقول التالية وسنقوم بفتح محادثة واتساب منظمة بها رسالتكِ فوراً
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  الاسم بالكامل <span className="text-brand-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="اسمكِ الكريم"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  رقم الموبايل
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="01012345678"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                موضوع الاستفسار
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="مثال: استفسار عن توفر منتج أو موعد الشحن"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                نص الرسالة <span className="text-brand-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="اكتبي رسالتكِ هنا بالتفصيل..."
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 text-sm resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 transition transform active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>إرسال الرسالة عبر واتساب</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
