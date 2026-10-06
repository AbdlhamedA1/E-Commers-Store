import React from 'react';
import { useCart } from '../context/CartContext';
import { CONFIG } from '../config';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartItem({ item, onCloseDrawer }) {
  const { updateQuantity, removeFromCart } = useCart();

  const isAtMaxStock = item.quantity >= item.stock;

  const handleLinkClick = () => {
    if (onCloseDrawer) {
      onCloseDrawer();
    }
  };

  return (
    <div className="flex gap-3 py-3 border-b border-brand-100 last:border-0 items-center">
      {/* Product Image */}
      <Link
        to={`/product/${item.id}`}
        onClick={handleLinkClick}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-brand-50 flex-shrink-0 border border-brand-100"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover object-center"
        />
      </Link>

      {/* Item Info */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <Link
            to={`/product/${item.id}`}
            onClick={handleLinkClick}
            className="text-xs sm:text-sm font-semibold text-gray-800 hover:text-brand-600 line-clamp-1 transition"
          >
            {item.name}
          </Link>
          <button
            onClick={() => removeFromCart(item.id)}
            className="p-1 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition"
            aria-label="حذف العنصر"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-bold text-brand-600">
            {item.price} {CONFIG.currency}
          </span>
          {item.oldPrice && item.oldPrice > item.price && (
            <span className="text-[11px] text-gray-400 line-through">
              {item.oldPrice} {CONFIG.currency}
            </span>
          )}
        </div>

        {/* Quantity Controls & Total */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-brand-200 rounded-full bg-brand-50/50 px-1.5 py-0.5">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white text-gray-700 disabled:opacity-30 transition"
              aria-label="تقليل الكمية"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center text-xs font-bold text-gray-800">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              disabled={isAtMaxStock}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white text-gray-700 disabled:opacity-30 transition"
              aria-label="زيادة الكمية"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <span className="text-xs sm:text-sm font-extrabold text-gray-900">
            {item.price * item.quantity} {CONFIG.currency}
          </span>
        </div>

        {isAtMaxStock && (
          <p className="text-[10px] text-amber-600 font-medium mt-1">
            أقصى كمية متاحة بالمخزون ({item.stock} قطع)
          </p>
        )}
      </div>
    </div>
  );
}
