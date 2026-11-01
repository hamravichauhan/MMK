'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, FileText, Shield, Video, ShoppingBag, ArrowRight } from 'lucide-react'

interface SearchResultItem {
  id: string | number
  title: string
  slug?: string
  youtube_id?: string
  category?: string
  branch?: string
  price?: number
  type: 'article' | 'soldier' | 'video' | 'merch'
}

interface SearchResults {
  articles: SearchResultItem[]
  soldiers: SearchResultItem[]
  videos: SearchResultItem[]
  merchandise: SearchResultItem[]
}

interface GlobalSearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SearchResults>({
    articles: [],
    soldiers: [],
    videos: [],
    merchandise: [],
  })
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
      setResults({ articles: [], soldiers: [], videos: [], merchandise: [] })
    }
  }, [isOpen])

  // Debounced search query
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults({ articles: [], soldiers: [], videos: [], merchandise: [] })
      setLoading(false)
      return
    }

    setLoading(true)
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`)
        if (res.ok) {
          const data = await res.json()
          setResults(data)
        }
      } catch (err) {
        console.error('Search fetch failed:', err)
      } finally {
        setLoading(false)
      }
    }, 200)

    return () => clearTimeout(timeout)
  }, [query])

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSelect = (url: string) => {
    onClose()
    router.push(url)
  }

  const totalResults =
    results.articles.length +
    results.soldiers.length +
    results.videos.length +
    results.merchandise.length

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(5, 8, 16, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '80px 16px 24px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          backgroundColor: '#0F1526',
          border: '1px solid #1E293B',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid #1E293B',
            gap: '12px',
          }}
        >
          <Search size={20} color="#94A3B8" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search defense briefings, soldiers, videos, or gear..."
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '16px',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748B',
                cursor: 'pointer',
                padding: '4px',
              }}
              title="Clear search query"
            >
              <X size={16} />
            </button>
          )}
          <span
            style={{
              fontSize: '11px',
              backgroundColor: '#1E293B',
              color: '#94A3B8',
              padding: '2px 6px',
              borderRadius: '4px',
              fontFamily: 'monospace',
            }}
          >
            ESC
          </span>
        </div>

        {/* Results Container */}
        <div style={{ overflowY: 'auto', padding: '16px 20px', flex: 1 }}>
          {loading && (
            <div style={{ textAlign: 'center', padding: '32px 0', color: '#94A3B8', fontSize: '14px' }}>
              Scanning intelligence databases...
            </div>
          )}

          {!loading && query.length >= 2 && totalResults === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748B', fontSize: '14px' }}>
              No intelligence records found matching &ldquo;{query}&rdquo;.
            </div>
          )}

          {!loading && query.length < 2 && (
            <div style={{ padding: '24px 8px', color: '#64748B', fontSize: '13px', lineHeight: '1.6' }}>
              <div style={{ fontWeight: 600, color: '#94A3B8', marginBottom: '8px', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.06em' }}>
                Quick Strategic Searches
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['Drone Swarm', 'Vikram Batra', 'Operation Sindoor', 'Carrier Group', 'Mohit Sharma'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    style={{
                      backgroundColor: '#161F30',
                      border: '1px solid #1E293B',
                      color: '#CBD5E1',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Articles Group */}
          {results.articles.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#656E36',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '10px',
                }}
              >
                Strategic Analyses ({results.articles.length})
              </div>
              {results.articles.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(`/articles/${item.slug}`)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease',
                  }}
                  className="hover:bg-slate-800"
                >
                  <FileText size={16} color="#A3B158" />
                  <span style={{ fontSize: '14px', color: '#F1F5F9', flex: 1 }}>{item.title}</span>
                  <ArrowRight size={14} color="#64748B" />
                </div>
              ))}
            </div>
          )}

          {/* Soldiers Group */}
          {results.soldiers.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#D97706',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '10px',
                }}
              >
                Know Your Soldiers ({results.soldiers.length})
              </div>
              {results.soldiers.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(`/know-your-soldiers/${item.slug}`)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease',
                  }}
                  className="hover:bg-slate-800"
                >
                  <Shield size={16} color="#F59E0B" />
                  <span style={{ fontSize: '14px', color: '#F1F5F9', flex: 1 }}>{item.title}</span>
                  <ArrowRight size={14} color="#64748B" />
                </div>
              ))}
            </div>
          )}

          {/* Videos Group */}
          {results.videos.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#38BDF8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '10px',
                }}
              >
                Video Intelligence ({results.videos.length})
              </div>
              {results.videos.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(`/videos/${item.youtube_id || item.id}`)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease',
                  }}
                  className="hover:bg-slate-800"
                >
                  <Video size={16} color="#38BDF8" />
                  <span style={{ fontSize: '14px', color: '#F1F5F9', flex: 1 }}>{item.title}</span>
                  <ArrowRight size={14} color="#64748B" />
                </div>
              ))}
            </div>
          )}

          {/* Merchandise Group */}
          {results.merchandise.length > 0 && (
            <div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#A855F7',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '10px',
                }}
              >
                Tactical Merchandise ({results.merchandise.length})
              </div>
              {results.merchandise.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect('/merchandise')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease',
                  }}
                  className="hover:bg-slate-800"
                >
                  <ShoppingBag size={16} color="#C084FC" />
                  <span style={{ fontSize: '14px', color: '#F1F5F9', flex: 1 }}>{item.title}</span>
                  {item.price && (
                    <span style={{ fontSize: '12px', color: '#D4AF37', fontWeight: 700 }}>
                      ₹{item.price}
                    </span>
                  )}
                  <ArrowRight size={14} color="#64748B" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div
          style={{
            padding: '10px 20px',
            backgroundColor: '#090D1A',
            borderTop: '1px solid #1E293B',
            fontSize: '11.5px',
            color: '#64748B',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>Use <strong>ESC</strong> to close</span>
          <span>Unified Defense Intelligence Engine</span>
        </div>
      </div>
    </div>
  )
}
