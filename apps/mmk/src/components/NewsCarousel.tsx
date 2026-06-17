'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface CarouselProps {
  items: any[]
}

export default function NewsCarousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Automatic scrolling loop
  useEffect(() => {
    if (items.length <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    }, 5000) // Rotates every 5 seconds

    return () => clearInterval(interval)
  }, [items])

  if (!items || items.length === 0) return null

  return (
    <div className="relative w-full overflow-hidden flex items-center justify-between min-h-[40px]">
      {/* Left Anchor Label Badge */}
      <div className="flex items-center space-x-3 w-full">
        <span className="flex-shrink-0 bg-red-600 text-white font-black text-[10px] md:text-xs px-2.5 py-1 tracking-widest uppercase rounded animate-pulse">
          BREAKING
        </span>

        {/* Sliding Transition Shell */}
        <div className="relative flex-1 h-6 overflow-hidden">
          {items.map((article, index) => (
            <div
              key={article.id}
              className={`absolute inset-0 w-full transform transition-all duration-700 ease-in-out flex items-center ${
                index === currentIndex
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <Link
                href={`/articles/${article.slug}`}
                className="text-xs md:text-sm font-medium text-gray-200 hover:text-[#656e36] transition-colors truncate block max-w-[85%]"
              >
                <span className="text-[#a3a3a3] font-mono mr-2">
                  [
                  {new Date(article.published_at).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  ]
                </span>
                {article.title}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Slide Toggles */}
      <div className="flex items-center space-x-1 pl-4 flex-shrink-0">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-[#656e36] w-3' : 'bg-gray-600'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
