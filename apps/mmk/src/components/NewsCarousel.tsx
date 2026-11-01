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
    }, 5500)

    return () => clearInterval(interval)
  }, [items])

  if (!items || items.length === 0) return null

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 14px',
        margin: '12px 0 6px 0',
        borderRadius: '6px',
        backgroundColor: 'var(--card-bg, #0F1526)',
        border: '1px solid var(--border-color, #1E293B)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        minHeight: '44px',
      }}
    >
      {/* Left Anchor Label Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            backgroundColor: '#DC2626',
            color: '#FFFFFF',
            fontSize: '10.5px',
            fontWeight: 800,
            padding: '3px 9px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            borderRadius: '3px',
            flexShrink: 0,
            boxShadow: '0 0 10px rgba(220, 38, 38, 0.45)',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              display: 'inline-block',
              animation: 'pulse 1.5s infinite',
            }}
          />
          BREAKING
        </span>

        {/* Sliding Transition Shell */}
        <div style={{ position: 'relative', flex: 1, height: '22px', overflow: 'hidden' }}>
          {items.map((article, index) => {
            const isCurrent = index === currentIndex
            const pubDate = article.published_at || article.createdAt
            const timeString = pubDate
              ? new Date(pubDate).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'LIVE'

            return (
              <div
                key={article.id}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  opacity: isCurrent ? 1 : 0,
                  transform: isCurrent ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  pointerEvents: isCurrent ? 'auto' : 'none',
                }}
              >
                <Link
                  href={`/articles/${article.slug}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--text-color, #E2E8F0)',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: 600,
                    maxWidth: '92%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '11px',
                      color: 'var(--muted-text, #94A3B8)',
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      padding: '1px 5px',
                      borderRadius: '3px',
                    }}
                  >
                    [{timeString}]
                  </span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {article.title}
                  </span>
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      {/* Manual Slide Toggles */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', paddingLeft: '12px', flexShrink: 0 }}>
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: idx === currentIndex ? '16px' : '6px',
              height: '6px',
              borderRadius: '3px',
              border: 0,
              padding: 0,
              backgroundColor: idx === currentIndex ? '#656E36' : 'var(--border-color, #334155)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
