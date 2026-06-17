import React from 'react'
import Image from 'next/image'

export const HeroNewsGrid = ({ articles }: { articles: any[] }) => {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-slate-500 italic">No reports found. Add some in the command center.</div>
    )
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <div
          key={article.id}
          className="group bg-[#161F30] border border-slate-800 rounded-xl overflow-hidden hover:border-[#D4AF37]/50 transition-all"
        >
          <div className="p-5">
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
              {article.category || 'Analysis'}
            </span>
            <h2 className="text-lg font-bold text-white mt-2 mb-3 leading-snug group-hover:text-[#D4AF37]">
              {article.title}
            </h2>
            <p className="text-xs text-slate-400 line-clamp-3">{article.excerpt}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
