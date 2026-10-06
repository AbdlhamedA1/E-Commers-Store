import React from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { wishlist } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold text-rose-500 bg-rose-50 px-3.5 py-1 rounded-full">
          قائمتكِ المفضلة ❤️
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-gray-900">
          المنتجات المحفوظة
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          المنتجات التي نالت إعجابكِ، يمكنكِ إضافتها إلى السلة بضغطة زر واحدة
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 px-4 bg-white rounded-3xl border border-brand-100 shadow-soft max-w-md mx-auto space-y-6">
          <div className="w-20 h-20 bg-rose-50 text-rose-400 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              قائمة المفضلة فارغة حالياً
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              اضغطي على علامة القلب على أي منتج أثناء التصفح لحفظه هنا والرجوع إليه لاحقاً.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md transition"
          >
            <span>استكشفي المنتجات الآن</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-xs text-gray-500 font-medium">
            لديكِ <span className="font-bold text-brand-600">{wishlist.length}</span> منتج محفوظ
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
