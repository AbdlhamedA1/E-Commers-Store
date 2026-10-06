import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import postsData from '../data/posts.json';
import { Calendar, Clock, ArrowRight, Share2, Sparkles, BookOpen } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useCart();

  const post = useMemo(() => {
    return postsData.find((p) => p.id === parseInt(id, 10));
  }, [id]);

  if (!post) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white rounded-3xl border border-brand-100 shadow-soft space-y-4">
        <h2 className="text-xl font-bold text-gray-900">المقال غير موجود 🌸</h2>
        <p className="text-xs text-gray-500">
          لم نتمكن من العثور على المقال المطلوب. تصفحي مقالاتنا الأخرى في المدونة.
        </p>
        <Link
          to="/blog"
          className="inline-block px-6 py-2.5 rounded-full bg-brand-500 text-white font-bold text-xs"
        >
          العودة للمدونة
        </Link>
      </div>
    );
  }

  // Related articles
  const otherPosts = postsData.filter((p) => p.id !== post.id).slice(0, 2);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('تم نسخ رابط المقال 🌸', 'info');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-600 hover:text-brand-700"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لجميع المقالات</span>
        </Link>

        <button
          onClick={handleShare}
          className="p-2 text-gray-400 hover:text-brand-600 rounded-full hover:bg-brand-50 transition"
          title="مشاركة المقال"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Article Header */}
      <header className="space-y-4 text-center sm:text-right">
        <span className="px-3.5 py-1 bg-brand-50 text-brand-700 text-xs font-bold rounded-full border border-brand-200 inline-block">
          {post.category}
        </span>

        <h1 className="text-2xl sm:text-4xl font-black text-gray-900 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-brand-400" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-brand-400" />
            <span>وقت القراءة: {post.readTime}</span>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-soft border border-brand-100 bg-brand-50">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body */}
      <article className="bg-white p-6 sm:p-10 rounded-3xl border border-brand-100 shadow-soft space-y-6 text-gray-700 text-sm sm:text-base leading-loose">
        {post.content && post.content.map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed">
            {paragraph}
          </p>
        ))}

        {/* Tip Box */}
        <div className="p-5 rounded-2xl bg-brand-50/70 border border-brand-200 text-brand-900 text-xs sm:text-sm space-y-1">
          <div className="flex items-center gap-2 font-bold text-brand-700">
            <Sparkles className="w-4 h-4" />
            <span>نصيحة أركان لكِ:</span>
          </div>
          <p className="text-gray-700">
            تذكري دائماً أن الجمال يبدأ من العناية اللطيفة والثقة بالنفس. يمكنكِ استكشاف منتجاتنا المطابقة لهذه النصائح في المتجر!
          </p>
        </div>
      </article>

      {/* Related Posts */}
      {otherPosts.length > 0 && (
        <section className="pt-10 border-t border-brand-100 space-y-6">
          <h3 className="text-xl font-bold text-gray-900">مقالات أخرى قد تهمكِ 🌸</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {otherPosts.map((p) => (
              <Link
                key={p.id}
                to={`/blog/${p.id}`}
                className="group flex gap-4 p-4 rounded-2xl bg-white border border-brand-100 shadow-sm hover:shadow-soft transition"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-brand-50 flex-shrink-0">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] text-brand-600 font-bold">{p.category}</span>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-brand-600 transition line-clamp-2">
                    {p.title}
                  </h4>
                  <span className="text-[10px] text-gray-400 block">{p.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
