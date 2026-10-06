import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import productsData from '../data/products.json';
import { useCart } from '../context/CartContext';
import { CONFIG } from '../config';
import { generateProductInquiryUrl } from '../utils/whatsapp';
import ProductCard from '../components/ProductCard';
import {
  ShoppingBag,
  Heart,
  Plus,
  Minus,
  MessageCircle,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  ArrowRight,
  Check,
  Share2,
} from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, showToast } = useCart();

  const product = useMemo(() => {
    return productsData.find((p) => p.id === parseInt(id, 10));
  }, [id]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white rounded-3xl border border-brand-100 shadow-soft space-y-4">
        <h2 className="text-xl font-bold text-gray-900">المنتج غير موجود 🌸</h2>
        <p className="text-xs text-gray-500">
          يبدو أن هذا المنتج غير متوفر أو تم نقله. يمكنكِ استكشاف بقية منتجاتنا في المتجر.
        </p>
        <Link
          to="/shop"
          className="inline-block px-6 py-2.5 rounded-full bg-brand-500 text-white font-bold text-xs"
        >
          العودة للمتجر
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;

  const discountPercentage = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  // Related products from same category
  const relatedProducts = useMemo(() => {
    return productsData
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

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
  };

  const handleDirectWhatsApp = () => {
    window.open(generateProductInquiryUrl(product), '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `شاهدي هذا المنتج الرائع من متجر ${CONFIG.brandName}: ${product.name}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('تم نسخ رابط المنتج لمشاركته 🌸', 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <Link to="/" className="hover:text-brand-600">
          الرئيسية
        </Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-brand-600">
          المتجر
        </Link>
        <span>/</span>
        <Link
          to={`/shop?category=${encodeURIComponent(product.category)}`}
          className="hover:text-brand-600"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Gallery on Desktop */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-brand-50 border border-brand-100 shadow-soft">
            <img
              src={images[selectedImage] || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {/* Badges */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {hasDiscount && (
                <span className="px-3 py-1.5 text-xs font-black rounded-full bg-brand-700 text-white shadow-md">
                  خصم {discountPercentage}%
                </span>
              )}
              {product.isNew && (
                <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-brand-400 text-white shadow-md">
                  وصل حديثاً
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 left-4 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
                isFavorited
                  ? 'bg-rose-50 text-rose-500 scale-105'
                  : 'bg-white/90 text-gray-400 hover:text-rose-500 hover:bg-white'
              }`}
              aria-label="المفضلة"
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500' : ''}`} />
            </button>

            {isOutOfStock && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center">
                <span className="px-5 py-2.5 bg-gray-900 text-white font-black text-sm rounded-full shadow-lg">
                  نفدت الكمية بالمخزون
                </span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 justify-center sm:justify-start">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition ${
                    selectedImage === idx
                      ? 'border-brand-500 scale-105 shadow-md'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Order Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-3.5 py-1 bg-brand-50 text-brand-700 text-xs font-bold rounded-full border border-brand-200">
                {product.category}
              </span>
              <button
                onClick={handleShare}
                className="p-2 text-gray-400 hover:text-brand-600 rounded-full hover:bg-brand-50 transition"
                title="مشاركة المنتج"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-snug">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mt-2 text-amber-500 text-sm font-semibold">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 stroke-amber-400'
                          : 'stroke-amber-300'
                      }`}
                    />
                  ))}
                </div>
                <span>{product.rating}</span>
                <span className="text-gray-400 text-xs">
                  ({product.reviewsCount || 25} تقييم حقيقي)
                </span>
              </div>
            )}
          </div>

          {/* Price Showcase */}
          <div className="p-4 rounded-2xl bg-brand-50/50 border border-brand-100 flex items-baseline gap-4">
            <span className="text-3xl sm:text-4xl font-black text-brand-600">
              {product.price} {CONFIG.currency}
            </span>
            {hasDiscount && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  {product.oldPrice} {CONFIG.currency}
                </span>
                <span className="text-xs font-bold text-brand-700 bg-brand-100 px-2.5 py-1 rounded-full">
                  وفرتي {product.oldPrice - product.price} {CONFIG.currency}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-gray-900">عن هذا المنتج:</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Stock state */}
          <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-gray-500 font-medium">حالة توفر المنتج:</span>
            <span
              className={`font-bold ${
                isOutOfStock
                  ? 'text-red-500'
                  : isLowStock
                  ? 'text-amber-600'
                  : 'text-emerald-600'
              }`}
            >
              {isOutOfStock
                ? 'نفدت الكمية حالياً'
                : isLowStock
                ? `كمية محدودة جداً (${product.stock} قطع فقط متبقية)`
                : `متوفر بالمخزون (${product.stock} قطع)`}
            </span>
          </div>

          {/* Quantity & Add to Cart Controls */}
          {!isOutOfStock ? (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-gray-700">الكمية المطلوبة:</span>
                <div className="flex items-center border border-brand-200 rounded-full bg-white px-2 py-1 shadow-sm">
                  <button
                    onClick={handleDecrease}
                    disabled={quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-brand-50 text-gray-700 disabled:opacity-30"
                    aria-label="تقليل"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-black text-sm text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    disabled={quantity >= product.stock}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-brand-50 text-gray-700 disabled:opacity-30"
                    aria-label="زيادة"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-gray-400">
                  (الحد الأقصى: {product.stock} قطع)
                </span>
              </div>

              {/* Main Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 min-h-[50px] py-3.5 px-6 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 transition transform active:scale-95"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>أضيفي إلى السلة</span>
                </button>

                <button
                  onClick={handleDirectWhatsApp}
                  className="flex-1 min-h-[50px] py-3.5 px-6 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition transform active:scale-95"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>اطلبي فوراً عبر واتساب</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 pt-2">
              <button
                disabled
                className="w-full py-4 rounded-full bg-gray-200 text-gray-500 font-bold text-sm cursor-not-allowed"
              >
                المنتج غير متاح حالياً للطلب
              </button>
              <button
                onClick={handleDirectWhatsApp}
                className="w-full py-3 rounded-full border border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>أبلغيني عند توفر المنتج عبر واتساب</span>
              </button>
            </div>
          )}

          {/* Guarantees Box */}
          <div className="pt-6 border-t border-brand-100 grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-brand-50/50 border border-brand-100">
              <ShieldCheck className="w-5 h-5 text-brand-600 mx-auto mb-1" />
              <span className="block text-[11px] font-bold text-gray-800">أصلي 100%</span>
              <span className="text-[10px] text-gray-500">مضمون المصدر</span>
            </div>
            <div className="p-3 rounded-2xl bg-brand-50/50 border border-brand-100">
              <Truck className="w-5 h-5 text-brand-600 mx-auto mb-1" />
              <span className="block text-[11px] font-bold text-gray-800">شحن سريع</span>
              <span className="text-[10px] text-gray-500">2-4 أيام عمل</span>
            </div>
            <div className="p-3 rounded-2xl bg-brand-50/50 border border-brand-100">
              <RotateCcw className="w-5 h-5 text-brand-600 mx-auto mb-1" />
              <span className="block text-[11px] font-bold text-gray-800">معاينة قبل الدفع</span>
              <span className="text-[10px] text-gray-500">دفع عند الاستلام</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-brand-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full mb-1 inline-block">
                قد يعجبكِ أيضاً
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                منتجات مشابهة من قسم {product.category} 🌸
              </h2>
            </div>
            <Link
              to={`/shop?category=${encodeURIComponent(product.category)}`}
              className="text-xs font-bold text-brand-600 hover:underline"
            >
              عرض الكل
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
