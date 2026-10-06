import { CONFIG } from '../config';

/**
 * يبني رابط واتساب مع نص الرسالة المنظم للطلب
 * @param {Array} items - عناصر السلة [{ name, quantity, price }]
 * @param {Object} customer - بيانات العميل { name, phone, address, notes, discountCode, discountAmount, total }
 * @returns {string} رابط واتساب المشفر
 */
export function generateWhatsAppOrderUrl(items, customer = {}) {
  const { name = '', phone = '', address = '', notes = '', discountCode = '', discountAmount = 0, total = 0 } = customer;

  let message = `مرحباً ${CONFIG.brandName} 🌸\nعايزة أطلب الطلب ده:\n\n`;

  items.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    message += `${index + 1}) ${item.name} - ${item.quantity} × ${item.price} ${CONFIG.currency} = ${itemTotal} ${CONFIG.currency}\n`;
  });

  message += `\n💰 الإجمالي: ${total} ${CONFIG.currency}`;

  if (discountCode && discountAmount > 0) {
    message += ` (تم تطبيق كود خصم: ${discountCode} بخصم ${discountAmount} ${CONFIG.currency})`;
  }

  message += `\n\n👤 الاسم: ${name || 'غير محدد'}`;
  if (phone) {
    message += `\n📱 الموبايل: ${phone}`;
  }
  if (address) {
    message += `\n📍 العنوان: ${address}`;
  }
  if (notes) {
    message += `\n📝 ملاحظات: ${notes}`;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
}

/**
 * يبني رابط استفسار مباشر وسريع للمنتج أو الدعم الفني
 * @param {string} customText - نص الاستفسار
 * @returns {string} رابط واتساب
 */
export function generateQuickWhatsAppUrl(customText = '') {
  const text = customText || `مرحباً ${CONFIG.brandName} 🌸، عندي استفسار بخصوص المنتجات المتاحة في المتجر.`;
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * يبني رابط استفسار لمنتج معين
 * @param {Object} product - المنتج
 * @returns {string} رابط واتساب
 */
export function generateProductInquiryUrl(product) {
  const text = `مرحباً ${CONFIG.brandName} 🌸، كنت عايزة استفسر عن منتج: "${product.name}" (كود: #${product.id}) - سعره: ${product.price} ${CONFIG.currency}`;
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
