import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import postsData from '../data/posts.json';
import { BookOpen, Calendar, Clock, ArrowLeft, Sparkles } from 'lucide-react';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const categories = ['الكل', 'عناية بالبشرة', 'مكياج', 'عناية بالشعر', 'أدوات شخصية'];

  const filteredPosts = postsData.filter((post) => {
    if (selectedCategory === 'الكل') return true;
    return post.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3.5 py-1 rounded-full">
          مدونة أركان للجمال 🌸
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-gray-900">
          نصائح وأسرار العناية والمكياج
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          مقالات ونصائح خبراء التجميل لتساعدكِ في اختيار روتينكِ اليومي وإبراز إشراقتكِ الطبيعية
        </p>
      </div>

      {/* Categories Filter */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-brand-500 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-brand-50 border border-brand-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="group flex flex-col justify-between bg-white rounded-3xl overflow-hidden border border-brand-100 shadow-soft hover:shadow-soft-hover transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Image */}
            <Link to={`/blog/${post.id}`} className="relative aspect-[16/10] overflow-hidden bg-brand-50 block">
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 right-3 px-3 py-1 bg-white/95 backdrop-blur-sm text-brand-700 text-xs font-bold rounded-full shadow-sm">
                {post.category}
              </span>
            </Link>

            {/* Post Content */}
            <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center gap-4 text-[11px] text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-brand-400" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-400" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <Link to={`/blog/${post.id}`} className="block">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-xs sm:text-sm text-gray-500 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Read More Link */}
              <div className="pt-4 border-t border-brand-50">
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 group-hover:text-brand-700 group-hover:translate-x-1 transition-all"
                >
                  <span>اقرأي المقال كاملاً</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
