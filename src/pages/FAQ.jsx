import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { CONFIG } from '../config';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'كيف يتم الطلب من متجر أركان؟',
      a: 'الطلب بسيط جداً ومريح! اختاري المنتجات التي ترغبين بها وأضيفيها إلى السلة، ثم اضغطي على زر "إتمام الطلب عبر واتساب". سيتم فتح تطبيق واتساب فوراً برسالة منسقة تحتوي على تفاصيل طلبكِ ليقوم فريقنا بتأكيده وشحنه لكِ مباشرة.',
    },
    {
      q: 'ما هي طرق الدفع المتاحة؟',
      a: 'الدفع يتم "نقداً عند الاستلام" بعد وصول مندوب الشحن وتفقد الطرد، أو يمكن التحويل عبر المحافظ الإلكترونية مثل فودافون كاش أو إنستاباي بعد التنسيق مع خدمة العملاء على واتساب.',
    },
    {
      q: 'كم يستغرق شحن وتوصيل الطلب؟',
      a: 'يستغرق التوصيل داخل القاهرة والجيزة من 24 إلى 48 ساعة فقط. ولباقي المحافظات من 2 إلى 4 أيام عمل كحد أقصى.',
    },
    {
      q: 'هل جميع منتجات أركان أصلية ومضمونة؟',
      a: 'نعم بكل تأكيد! نحن نتعهد بتقديم منتجات ومستحضرات تجميل أصلية 100% ومستوردة من مصادرها الرسمية المعتمدة، ولا نتعامل أبداً مع المقلد أو رديء الجودة.',
    },
    {
      q: 'ما هي سياسة الاستبدال والاسترجاع؟',
      a: 'يحق لكِ معاينة الشحنة والتأكد من سلامتها مع المندوب. وفي حال وجود أي عيب مصنعي أو تلف ناتج عن الشحن، يتم استبدال المنتج أو إرجاع قيمته فوراً وبدون أي مصاريف إضافية.',
    },
    {
      q: 'هل يمكنني تعديل طلبي بعد إرساله عبر واتساب؟',
      a: 'نعم بالتأكيد، طالما أن الطلب لم يتم تسليمه لشركة الشحن بعد، يمكنكِ إخبار خدمة العملاء في نفس المحادثة بإضافة أو تغيير أي منتج ترغبين به.',
    },
  ];

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3.5 py-1 rounded-full">
          إجابات فورية 🌸
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-gray-900">
          الأسئلة الشائعة
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          جمّعنا لكِ أهم الأسئلة المتكررة حول الشحن، الدفع، وجودة المنتجات
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-brand-100 shadow-soft overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-5 text-right flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-gray-900 hover:text-brand-600 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0 text-xs">
                    {idx + 1}
                  </div>
                  <span>{faq.q}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-brand-500 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-brand-50">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Need more help box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-brand-50/70 border border-brand-200 text-center space-y-3">
        <h3 className="text-base font-bold text-gray-900">لم تجدي إجابة لسؤالكِ؟</h3>
        <p className="text-xs text-gray-600">
          فريق خدمة عملاء {CONFIG.brandName} يسعده الإجابة على أي استفسار فوراً عبر واتساب.
        </p>
        <a
          href={`https://wa.me/${CONFIG.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition shadow"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>اسألينا على واتساب</span>
        </a>
      </div>
    </div>
  );
}
