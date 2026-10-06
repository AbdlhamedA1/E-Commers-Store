import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Eye, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CONFIG } from '../config';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useCart();

  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;

  const discountPercentage = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-3xl p-4 sm:p-4 border border-brand-100 shadow-soft hover:shadow-soft-hover transition-all duration-300 transform hover:-translate-y-1 w-full">
      {/* Top Badges & Actions */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-brand-50 mb-3.5">
        {/* Product Image */}
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Badges in Top Right Corner */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {hasDiscount && (
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-brand-700 text-white shadow-sm">
              -{discountPercentage}%
            </span>
          )}
          {product.isNew && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-brand-400 text-white shadow-sm">
              جديد
            </span>
          )}
        </div>

        {/* Wishlist Button in Top Left Corner */}
        <button
          onClick={handleToggleWishlist}
          aria-label={isFavorited ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
          className={`absolute top-3 left-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 z-10 shadow-sm ${
            isFavorited
              ? 'bg-rose-50 text-rose-500 scale-105'
              : 'bg-white/95 text-gray-400 hover:text-rose-500 hover:bg-white'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <button
          onClick={handleQuickView}
          aria-label="نظرة سريعة على المنتج"
          className="absolute inset-x-4 bottom-3 py-2.5 bg-white/95 backdrop-blur-sm text-darktext text-xs sm:text-xs font-semibold rounded-xl shadow opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-1.5 hover:bg-brand-500 hover:text-white"
        >
          <Eye className="w-4 h-4" />
          <span>نظرة سريعة</span>
        </button>

        {/* Stock Status Badge */}
        {isOutOfStock ? (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
            <span className="px-4 py-2 bg-gray-800 text-white text-xs sm:text-sm font-bold rounded-full shadow">
              نفدت الكمية
            </span>
          </div>
        ) : isLowStock ? (
          <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-lg shadow-sm pointer-events-none">
            كمية محدودة 🔥
          </span>
        ) : null}
      </div>

      {/* Product Information */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs sm:text-xs text-gray-500 mb-2">
            <span className="text-brand-600 font-semibold">{product.category}</span>
            {product.rating && (
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                <span>{product.rating}</span>
              </div>
            )}
          </div>

          {/* Product Name */}
          <Link
            to={`/product/${product.id}`}
            className="block text-base sm:text-base font-bold text-darktext hover:text-brand-600 transition-colors line-clamp-2 leading-snug mb-3"
            title={product.name}
          >
            {product.name}
          </Link>
        </div>

        <div>
          {/* Price & Stock info */}
          <div className="flex items-baseline justify-between gap-2 mt-1 mb-3.5">
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-lg font-black text-brand-600">
                {product.price} {CONFIG.currency}
              </span>
              {hasDiscount && (
                <span className="text-xs sm:text-sm text-gray-400 line-through">
                  {product.oldPrice} {CONFIG.currency}
                </span>
              )}
            </div>

            {/* Available stock */}
            <span
              className={`text-xs sm:text-xs font-semibold ${
                isOutOfStock
                  ? 'text-red-500'
                  : isLowStock
                  ? 'text-amber-600 font-bold'
                  : 'text-gray-500'
              }`}
            >
              {isOutOfStock ? 'غير متاح' : `المتاح: ${product.stock} قطع`}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`w-full min-h-[48px] py-3 px-4 rounded-full flex items-center justify-center gap-2 text-sm sm:text-base font-bold transition-all duration-200 active:scale-95 shadow-sm ${
              isOutOfStock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                : 'bg-brand-500 hover:bg-brand-600 text-white shadow-brand-500/25 hover:shadow-md'
            }`}
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{isOutOfStock ? 'نفدت الكمية' : 'أضيفي للسلة'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
