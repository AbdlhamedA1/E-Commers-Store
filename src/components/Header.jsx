import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CONFIG } from '../config';
import { useCart } from '../context/CartContext';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Sparkles,
  PhoneCall,
  Home,
  Store,
  Percent,
  BookOpen,
  Info,
  Mail,
  HelpCircle,
} from 'lucide-react';

export default function Header() {
  const { cartCount, wishlist, setIsCartOpen, cartBounce } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerSearchOpen, setHeaderSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setHeaderSearchOpen(false);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'الرئيسية', path: '/', icon: Home },
    { name: 'المتجر', path: '/shop', icon: Store },
    { name: 'العروض', path: '/offers', icon: Percent },
    { name: 'المدونة', path: '/blog', icon: BookOpen },
    { name: 'من نحن', path: '/about', icon: Info },
    { name: 'تواصل معنا', path: '/contact', icon: Mail },
    { name: 'الأسئلة الشائعة', path: '/faq', icon: HelpCircle },
  ];

  return (
    <>
      {/* 1. Top Announcement Bar */}
      <div className="bg-gradient-to-r from-brand-600 via-brand-500 to-brand-600 text-white text-center py-2 px-4 text-xs font-medium flex items-center justify-center gap-2 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>{CONFIG.announcementText}</span>
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
      </div>

      {/* 2. Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-100 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Right: Hamburger on mobile + Brand Logo */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl text-gray-700 hover:text-brand-600 hover:bg-brand-50 transition"
                aria-label="القائمة الرئيسية"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Brand Logo */}
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-brand-500 to-brand-300 flex items-center justify-center text-white text-xl shadow-md group-hover:scale-105 transition transform">
                  🌸
                </div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 group-hover:text-brand-600 transition">
                    {CONFIG.brandName}
                  </span>
                  <span className="text-[10px] text-brand-500 font-semibold -mt-1 hidden sm:block">
                    Arkan Store
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.slice(0, 6).map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-brand-50 text-brand-600 font-bold'
                        : 'text-gray-600 hover:text-brand-600 hover:bg-brand-50/50'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Left: Actions (Search, Wishlist, Cart) */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search Toggle Button */}
              <button
                onClick={() => setHeaderSearchOpen(!headerSearchOpen)}
                className="p-2.5 rounded-full text-gray-600 hover:text-brand-600 hover:bg-brand-50 transition"
                aria-label="البحث"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="relative p-2.5 rounded-full text-gray-600 hover:text-brand-600 hover:bg-brand-50 transition"
                aria-label="المفضلة"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 left-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className={`relative p-2.5 rounded-full text-gray-600 hover:text-brand-600 hover:bg-brand-50 transition ${
                  cartBounce ? 'animate-bounce' : ''
                }`}
                aria-label="سلة المشتريات"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 left-1 min-w-[18px] h-[18px] px-1 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Contact WhatsApp pill on larger screens */}
              <Link
                to="/cart"
                className="hidden md:flex items-center gap-2 mr-2 px-4 py-2 rounded-full bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold transition border border-brand-200"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-brand-600" />
                <span>السلة</span>
              </Link>
            </div>
          </div>

          {/* Expandable Search Input below header */}
          {headerSearchOpen && (
            <div className="py-3 border-t border-brand-100 animate-slide-down">
              <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحثي عما ترغبين به واضغطي Enter..."
                  autoFocus
                  className="w-full py-2.5 pl-10 pr-11 bg-brand-50/50 rounded-full border border-brand-200 focus:outline-none focus:border-brand-500 text-sm"
                />
                <Search className="w-4 h-4 text-brand-500 absolute right-4 top-3" />
                <button
                  type="button"
                  onClick={() => setHeaderSearchOpen(false)}
                  className="absolute left-3 top-2.5 p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* 3. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-fade-in">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer container */}
          <div className="fixed inset-y-0 right-0 w-4/5 max-w-xs bg-white shadow-2xl flex flex-col justify-between p-6 animate-slide-left z-10 border-l border-brand-100">
            <div>
              {/* Top brand & close */}
              <div className="flex items-center justify-between pb-4 border-b border-brand-100 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white text-lg">
                    🌸
                  </div>
                  <span className="font-extrabold text-lg text-gray-900">
                    {CONFIG.brandName}
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                  aria-label="إغلاق القائمة"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search input */}
              <form onSubmit={handleSearchSubmit} className="relative mb-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحثي عن منتج..."
                  className="w-full py-2.5 pl-8 pr-9 bg-brand-50 rounded-xl text-xs border border-brand-200 focus:outline-none focus:border-brand-500"
                />
                <Search className="w-4 h-4 text-brand-400 absolute right-3 top-3" />
              </form>

              {/* Navigation Links */}
              <nav className="space-y-1.5">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition ${
                          isActive
                            ? 'bg-brand-500 text-white shadow-sm'
                            : 'text-gray-700 hover:bg-brand-50 hover:text-brand-600'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.name}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            {/* Bottom info */}
            <div className="pt-6 border-t border-brand-100 text-center">
              <p className="text-xs text-gray-500 mb-2">
                نسعد بخدمتكِ دائماً 🌸
              </p>
              <div className="text-xs font-bold text-brand-600">
                {CONFIG.brandSubtitle}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
