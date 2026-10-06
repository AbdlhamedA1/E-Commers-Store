import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryCard({ category, image, count }) {
  return (
    <Link
      to={`/shop?category=${encodeURIComponent(category)}`}
      className="group flex flex-col items-center p-3 rounded-3xl bg-white hover:bg-brand-50 border border-brand-100 hover:border-brand-300 shadow-soft hover:shadow-soft-hover transition-all duration-300 transform hover:-translate-y-1 text-center"
    >
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden mb-3 bg-brand-100 flex items-center justify-center p-1 border-2 border-brand-200/60 group-hover:border-brand-500 transition">
        <img
          src={image}
          alt={category}
          loading="lazy"
          className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <h3 className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-brand-600 transition">
        {category}
      </h3>
      {count !== undefined && (
        <span className="text-[11px] text-gray-400 mt-0.5">
          {count} منتج
        </span>
      )}
    </Link>
  );
}
