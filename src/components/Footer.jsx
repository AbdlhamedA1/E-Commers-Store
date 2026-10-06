import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONFIG } from '../config';
import {
  Heart,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, TikTokIcon } from './SocialIcons';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const categories = [
    'مكياج',
    'عناية بالبشرة',
    'عناية بالشعر',
    'عطور',
    'إكسسوارات',
    'أدوات شخصية',
  ];

  return (
    <footer className="bg-gradient-to-b from-brand-50/50 to-brand-100/40 border-t border-brand-200/60 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-brand-500 flex items-center justify-center text-white text-xl shadow-md">
                🌸
              </div>
              <div>
                <span className="text-2xl font-black text-gray-900 tracking-tight">
                  {CONFIG.brandName}
                </span>
                <span className="text-xs text-brand-500 font-bold block -mt-1">
                  Arkan Cosmetics & Care
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-sm">
              {CONFIG.brandDescription}
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              {CONFIG.instagram && (
                <a
                  href={CONFIG.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-brand-200 text-brand-600 flex items-center justify-center hover:bg-brand-500 hover:text-white transition shadow-sm"
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
                  className="w-10 h-10 rounded-full bg-white border border-brand-200 text-brand-600 flex items-center justify-center hover:bg-brand-500 hover:text-white transition shadow-sm"
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
                  className="w-10 h-10 rounded-full bg-white border border-brand-200 text-brand-600 flex items-center justify-center hover:bg-brand-500 hover:text-white transition shadow-sm"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
              )}
              <a
                href={`https://wa.me/${CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition shadow-sm"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900 border-r-2 border-brand-500 pr-2">
              روابط سريعة
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
              <li>
                <Link to="/" className="hover:text-brand-600 transition">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-brand-600 transition">
                  المتجر والمنتجات
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-brand-600 transition">
                  العروض والخصومات
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-brand-600 transition">
                  مدونة الجمال
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-600 transition">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-600 transition">
                  تواصل معنا
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-brand-600 transition">
                  الأسئلة الشائعة
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900 border-r-2 border-brand-500 pr-2">
              أقسام المتجر
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/shop?category=${encodeURIComponent(cat)}`}
                    className="hover:text-brand-600 transition"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900 border-r-2 border-brand-500 pr-2">
              خدمة العملاء
            </h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                <span>{CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                <span>{CONFIG.workingHours}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                <span dir="ltr">{CONFIG.phoneDisplay}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                <span>{CONFIG.email}</span>
              </li>
            </ul>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-gray-800 mb-1.5">
                اشتركي ليصلكِ جديد العروض 💌
              </p>
              {subscribed ? (
                <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-semibold py-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>شكراً لاشتراككِ في نشرتنا!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-1.5">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="بريدك الإلكتروني"
                    required
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-brand-200 focus:outline-none focus:border-brand-500 bg-white"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl transition shadow-sm"
                    aria-label="اشتراك"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-brand-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} لمتجر {CONFIG.brandName}.
          </p>
          <p className="flex items-center gap-1 text-brand-600 font-medium">
            <span>صُنع بحب وعناية للجميلات</span>
            <Heart className="w-3.5 h-3.5 fill-brand-500 text-brand-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
}
