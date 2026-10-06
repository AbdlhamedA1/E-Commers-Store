import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useCart();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 left-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bg = 'bg-brand-50 border-brand-200 text-brand-900';
        let Icon = CheckCircle2;
        let iconColor = 'text-brand-500';

        if (toast.type === 'error') {
          bg = 'bg-red-50 border-red-200 text-red-900';
          Icon = XCircle;
          iconColor = 'text-red-500';
        } else if (toast.type === 'warning') {
          bg = 'bg-amber-50 border-amber-200 text-amber-900';
          Icon = AlertTriangle;
          iconColor = 'text-amber-500';
        } else if (toast.type === 'info') {
          bg = 'bg-blue-50 border-blue-200 text-blue-900';
          Icon = Info;
          iconColor = 'text-blue-500';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-2xl border shadow-lg transition-all duration-300 animate-slide-in ${bg}`}
          >
            <div className="flex items-center gap-2.5">
              <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-full hover:bg-black/5 text-gray-400 hover:text-gray-600 transition"
              aria-label="إغلاق التنبيه"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
