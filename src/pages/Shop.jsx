import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import productsData from '../data/products.json';
import { Filter, ArrowUpDown, Sparkles, RefreshCcw, Check, ShoppingBag } from 'lucide-react';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL query params initialization
  const initialCategory = searchParams.get('category') || 'الكل';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'price-asc', 'price-desc', 'discount'
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Sync state with URL params when they change externally
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
    const urlSearch = searchParams.get('search');
    if (urlSearch !== null) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);

  // Categories list
  const categories = [
    'الكل',
    'مكياج',
    'عناية بالبشرة',
    'عناية بالشعر',
    'عطور',
    'إكسسوارات',
    'أدوات شخصية',
  ];

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'الكل') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    if (val.trim()) {
      searchParams.set('search', val.trim());
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory('الكل');
    setSearchQuery('');
    setSortBy('newest');
    setOnlyInStock(false);
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return productsData
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'الكل' && product.category !== selectedCategory) {
          return false;
        }

        // In-stock only filter
        if (onlyInStock && product.stock <= 0) {
          return false;
        }

        // Search Query filter (by name or category or description)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = product.name.toLowerCase().includes(q);
          const matchCategory = product.category.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          return matchName || matchCategory || matchDesc;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') {
          return a.price - b.price;
        }
        if (sortBy === 'price-desc') {
          return b.price - a.price;
        }
        if (sortBy === 'discount') {
          const discA = a.oldPrice ? ((a.oldPrice - a.price) / a.oldPrice) : 0;
          const discB = b.oldPrice ? ((b.oldPrice - b.price) / b.oldPrice) : 0;
          return discB - discA;
        }
        // Default: newest (or id descending)
        if (sortBy === 'newest') {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return b.id - a.id;
        }
        return 0;
      });
  }, [selectedCategory, searchQuery, sortBy, onlyInStock]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Title & Breadcrumb Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3.5 py-1 rounded-full">
          المتجر الكامل 🌸
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-gray-900">
          تألقي مع تشكيلة أركان
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          اكتشفي مستحضرات التجميل والعناية الشخصية بأسعار مميزة وجودة أصلية
        </p>
      </div>

      {/* Search & Main Filter Controls */}
      <div className="bg-brand-50/40 p-4 sm:p-6 rounded-3xl border border-brand-100 shadow-soft space-y-4">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="ابحثي بالاسم (مثال: روج، سيروم، ماسكارا، أرجان)..."
          />
        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20 scale-105'
                    : 'bg-white text-gray-600 hover:bg-brand-100/60 hover:text-brand-700 border border-brand-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Sorting & Availability Secondary Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-brand-200/50 text-xs sm:text-sm">
          {/* Results Count */}
          <div className="text-gray-500 font-medium">
            عرض <span className="font-bold text-brand-600">{filteredProducts.length}</span> من أصل{' '}
            <span className="font-bold text-gray-700">{productsData.length}</span> منتج
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Stock filter checkbox */}
            <label className="flex items-center gap-2 cursor-pointer select-none text-gray-700 font-medium bg-white px-3 py-1.5 rounded-xl border border-brand-100 shadow-sm">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="accent-brand-500 w-4 h-4 rounded"
              />
              <span>المتوفر بالمخزون فقط</span>
            </label>

            {/* Sort selector */}
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-brand-100 shadow-sm">
              <ArrowUpDown className="w-3.5 h-3.5 text-brand-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-gray-700 font-medium text-xs sm:text-sm focus:outline-none cursor-pointer"
              >
                <option value="newest">الأحدث والأميز</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
                <option value="discount">الأكثر خصماً</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-brand-100 shadow-soft max-w-md mx-auto space-y-4">
          <div className="w-20 h-20 bg-brand-50 text-brand-400 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-10 h-10 stroke-1" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              لا توجد منتجات مطابقة لبحثكِ 🌸
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              جرّبي البحث بكلمات أخرى أو إزالة الفلاتر المحددة لعرض كافة منتجات المتجر.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition shadow-sm"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>إعادة ضبط الفلاتر والبحث</span>
          </button>
        </div>
      )}
    </div>
  );
}
