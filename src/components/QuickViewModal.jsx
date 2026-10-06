import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CONFIG } from '../config';
import { generateProductInquiryUrl } from '../utils/whatsapp';
import { X, ShoppingBag, Heart, Plus, Minus, MessageCircle, Star, ShieldCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleClose = () => {
    setQuickViewProduct(null);
    setSelectedImage(0);
    setQuantity(1);
  };

  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity((q) => q + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    handleClose();
  };

  const handleDirectWhatsApp = () => {
    window.open(generateProductInquiryUrl(product), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div
        className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-8 shadow-2xl border border-brand-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition z-10"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Images Section */}
          <div className="space-y-3">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-brand-50 border border-brand-100">
              <img
                src={images[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {hasDiscount && (
                <span className="absolute top-3 right-3 px-3 py-1 bg-brand-700 text-white text-xs font-bold rounded-full">
                  وفرتي {product.oldPrice - product.price} {CONFIG.currency}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition ${
                      selectedImage === idx ? 'border-brand-500 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold rounded-full">
                  {product.category}
                </span>
                {product.rating && (
                  <div className="flex items-center gap-1 text-amber-500 text-sm font-semibold">
                    <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-gray-400 text-xs">({product.reviewsCount} تقييم)</span>
                  </div>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 my-3">
                <span className="text-2xl font-extrabold text-brand-600">
                  {product.price} {CONFIG.currency}
                </span>
                {hasDiscount && (
                  <span className="text-base text-gray-400 line-through">
                    {product.oldPrice} {CONFIG.currency}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                {product.description}
              </p>
            </div>

            {/* Stock indicator */}
            <div className="p-3 bg-brand-50/60 rounded-2xl flex items-center justify-between text-xs">
              <span className="text-gray-600">حالة المخزون:</span>
              <span
                className={`font-bold ${
                  isOutOfStock
                    ? 'text-red-500'
                    : isLowStock
                    ? 'text-amber-600'
                    : 'text-emerald-600'
                }`}
              >
                {isOutOfStock ? 'غير متوفر حالياً' : `متوفر بالمخزون (${product.stock} قطع)`}
              </span>
            </div>

            {/* Quantity Selector & Action Buttons */}
            {!isOutOfStock && (
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-medium text-gray-600">الكمية:</span>
                  <div className="flex items-center border border-gray-200 rounded-full bg-gray-50 px-2 py-1">
                    <button
                      onClick={handleDecrease}
                      disabled={quantity <= 1}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-gray-600 disabled:opacity-30"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-gray-800">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrease}
                      disabled={quantity >= product.stock}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-gray-600 disabled:opacity-30"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-[11px] text-gray-400">
                    (الحد الأقصى: {product.stock})
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-6 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>أضيفي للسلة</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 rounded-full border transition ${
                      isFavorited
                        ? 'border-rose-200 bg-rose-50 text-rose-500'
                        : 'border-gray-200 hover:border-rose-200 text-gray-400 hover:text-rose-500'
                    }`}
                    aria-label="المفضلة"
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>
              </div>
            )}

            {/* Direct WhatsApp button & details page link */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handleDirectWhatsApp}
                className="w-full py-2.5 px-4 rounded-full border border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>استفسري عن المنتج عبر واتساب</span>
              </button>

              <Link
                to={`/product/${product.id}`}
                onClick={handleClose}
                className="text-center text-xs text-brand-600 hover:underline font-medium pt-1"
              >
                عرض كل تفاصيل المنتج والمزيد من الصور ←
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
