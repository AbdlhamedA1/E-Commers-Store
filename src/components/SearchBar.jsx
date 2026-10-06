import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  value = '',
  onChange,
  placeholder = 'ابحثي عن منتج، روج، سيروم، أو قسم...',
  className = '',
  autoFocus = false,
}) {
  const [searchTerm, setSearchTerm] = useState(value);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  // Debounce notification to parent
  useEffect(() => {
    const handler = setTimeout(() => {
      if (onChange && searchTerm !== value) {
        onChange(searchTerm);
      }
    }, 250);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, onChange, value]);

  const handleClear = () => {
    setSearchTerm('');
    if (onChange) onChange('');
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full py-2.5 sm:py-3 pl-10 pr-11 bg-white text-darktext text-sm rounded-full border border-brand-200 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200/50 shadow-soft transition-all"
        />
        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400 absolute right-3.5 sm:right-4 pointer-events-none" />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 absolute left-3 transition"
            aria-label="مسح البحث"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
