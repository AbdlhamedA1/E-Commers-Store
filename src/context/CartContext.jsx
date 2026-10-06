import React, { createContext, useContext, useState, useEffect } from 'react';
import { CONFIG } from '../config';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Cart state persisted in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('arkan_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
      return [];
    }
  });

  // Wishlist state persisted in localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('arkan_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load wishlist from localStorage', e);
      return [];
    }
  });

  // UI Drawer & Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Discount code state
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // e.g. 10%
  const [promoError, setPromoError] = useState('');

  // Toast notifications
  const [toasts, setToasts] = useState([]);
  const [cartBounce, setCartBounce] = useState(false);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('arkan_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Save wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('arkan_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  // Trigger brief bounce animation on cart icon when items are added
  const triggerCartBounce = () => {
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 600);
  };

  // Add toast helper
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  /**
   * Add product to cart with quantity, respecting maximum available stock
   */
  const addToCart = (product, quantityToAdd = 1) => {
    if (!product || product.stock <= 0) {
      showToast('عذراً، هذا المنتج غير متوفر حالياً بالمخزون', 'error');
      return false;
    }

    let success = false;
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);

      if (existingIndex > -1) {
        const currentQty = prevCart[existingIndex].quantity;
        const newQty = currentQty + quantityToAdd;

        if (newQty > product.stock) {
          const allowedAdd = product.stock - currentQty;
          if (allowedAdd <= 0) {
            showToast(`وصلتِ للحد الأقصى المتاح من هذا المنتج (${product.stock} قطع)`, 'warning');
            return prevCart;
          }
          showToast(`تمت إضافة المتبقي فقط (${allowedAdd} قطع) ليكتمل المخزون المتاح`, 'warning');
          const updated = [...prevCart];
          updated[existingIndex] = { ...updated[existingIndex], quantity: product.stock };
          success = true;
          return updated;
        }

        const updated = [...prevCart];
        updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
        showToast(`تمت إضافة "${product.name}" إلى السلة 🌸`, 'success');
        success = true;
        return updated;
      } else {
        const qty = Math.min(quantityToAdd, product.stock);
        showToast(`تمت إضافة "${product.name}" إلى السلة 🌸`, 'success');
        success = true;
        return [...prevCart, { ...product, quantity: qty }];
      }
    });

    if (success || true) {
      triggerCartBounce();
    }
    return true;
  };

  /**
   * Update quantity directly in cart, bounded by [1, stock]
   */
  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === productId) {
          if (newQuantity <= 0) return item;
          if (newQuantity > item.stock) {
            showToast(`أقصى كمية متاحة بالمخزون هي ${item.stock} قطع`, 'warning');
            return { ...item, quantity: item.stock };
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  /**
   * Remove item from cart
   */
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const item = prevCart.find((i) => i.id === productId);
      if (item) {
        showToast(`تم حذف "${item.name}" من السلة`, 'info');
      }
      return prevCart.filter((i) => i.id !== productId);
    });
  };

  /**
   * Clear all items in cart
   */
  const clearCart = () => {
    setCart([]);
    showToast('تم إفراغ السلة بالكامل', 'info');
  };

  /**
   * Wishlist toggling
   */
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) {
        showToast(`تمت إزالة "${product.name}" من المفضلة`, 'info');
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        showToast(`تمت إضافة "${product.name}" إلى المفضلة ❤️`, 'success');
        return [...prevWishlist, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  /**
   * Apply promo discount code
   */
  const applyPromo = (code) => {
    const trimmed = (code || '').trim().toUpperCase();
    if (!trimmed) {
      setPromoError('يرجى إدخال كود الخصم');
      return false;
    }
    if (trimmed === CONFIG.defaultDiscountCode.toUpperCase()) {
      setPromoCode(trimmed);
      setAppliedDiscount(CONFIG.discountPercentage);
      setPromoError('');
      showToast(`تم تفعيل خصم ${CONFIG.discountPercentage}% بنجاح! 🎉`, 'success');
      return true;
    } else {
      setPromoError('كود الخصم غير صالح أو منتهي الصلاحية');
      showToast('كود الخصم غير صالح', 'error');
      return false;
    }
  };

  const removePromo = () => {
    setPromoCode('');
    setAppliedDiscount(0);
    setPromoError('');
    showToast('تمت إزالة كود الخصم', 'info');
  };

  // Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = appliedDiscount > 0 ? Math.round((subtotal * appliedDiscount) / 100) : 0;
  const totalPrice = Math.max(0, subtotal - discountAmount);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        totalPrice,
        discountAmount,
        appliedDiscount,
        promoCode,
        promoError,
        applyPromo,
        removePromo,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        quickViewProduct,
        setQuickViewProduct,
        toasts,
        showToast,
        removeToast,
        cartBounce,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
