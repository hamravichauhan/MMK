'use client'

import { useEffect, useState } from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import Link from 'next/link'
import type { Media, Article } from '@/payload-types'
import { format } from 'date-fns'
import { Search, Filter, Languages, RotateCcw } from 'lucide-react'

export default function ArticlesListPage() {
  // DB States
  const [allArticles, setAllArticles] = useState<Article[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  // Active Multi-Filter Configuration States
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLanguage, setSelectedLanguage] = useState('all')

  const categories = [
    { label: 'All Topics', value: 'all' },
    { label: 'Geopolitics', value: 'geopolitics' },
    { label: 'Defence', value: 'defence' },
    { label: 'Blog Feed', value: 'blog' },
    { label: 'Career Guidance', value: 'career' },
    { label: 'Motivation', value: 'motivation' },
  ]

  // 📡 Fetch data directly on mount from Payload local REST API context safely
  useEffect(() => {
    async function fetchArticles() {
      try {
        // Client-side fallback request route or payload context invocation
        const res = await fetch('/api/articles?limit=100&depth=1&sort=-published_at')
        const data = await res.json()
        if (data && data.docs) {
          // Keep only published pieces
          const published = data.docs.filter((a: Article) => a.status === 'published')
          setAllArticles(published)
          setFilteredArticles(published)
        }
      } catch (err) {
        console.error('Failed to resolve dynamic filter dataset', err)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  // 🧠 Fast Multi-Filter Matrix Evaluation Engine
  useEffect(() => {
    let result = [...allArticles]

    // 1. Text Query Filtering
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.excerpt?.toLowerCase().includes(query),
      )
    }

    // 2. Dropdown Select Category Matching
    if (selectedCategory !== 'all') {
      result = result.filter((article) => article.category === selectedCategory)
    }

    // 3. Language Segment Sorting
    if (selectedLanguage !== 'all') {
      result = result.filter((article) => article.language === selectedLanguage)
    }

    setFilteredArticles(result)
  }, [searchQuery, selectedCategory, selectedLanguage, allArticles])

  // Reset helper
  const resetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedLanguage('all')
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Inter", sans-serif',
          color: '#64748b',
        }}
      >
        Loading comprehensive editorial database...
      </div>
    )
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#FDFDFD',
        fontFamily: '"Inter", system-ui, sans-serif',
        color: '#1e293b',
        margin: 0,
        padding: 0,
      }}
    >
      {/* 1. Header Hero Banner */}
      <section style={{ backgroundColor: '#0B1D3A', color: 'white', padding: '56px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: '42px',
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 'bold',
              margin: '0 0 12px 0',
              letterSpacing: '-0.5px',
              color: '#ffffff',
            }}
          >
            Geopolitical Analysis
          </h1>
          <p
            style={{
              color: '#cbd5e1',
              fontSize: '16px',
              margin: 0,
              maxWidth: '750px',
              lineHeight: '1.6',
              fontWeight: '300',
            }}
          >
            In-depth strategic assessments, military analysis, and expert commentary on regional
            security dynamics affecting South Asia and the Indo-Pacific region.
          </p>
        </div>
      </section>

      {/* Main Filter Suite Container */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        {/* 🛠️ ADVANCED MULTI-FILTER PANEL CONTROLS */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '32px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
              alignItems: 'end',
            }}
          >
            {/* Control A: Live Search input */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#475569',
                  marginBottom: '8px',
                }}
              >
                <Search size={14} /> Search Analysis
              </label>
              <input
                type="text"
                placeholder="Search headlines, keywords, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              />
            </div>

            {/* Control B: Language Scope */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#475569',
                  marginBottom: '8px',
                }}
              >
                <Languages size={14} /> Publication Language
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  backgroundColor: '#fff',
                  fontFamily: 'inherit',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="all">All Languages</option>
                <option value="en">English Edition</option>
                <option value="ta">Tamil Edition (தமிழ்)</option>
              </select>
            </div>

            {/* Control C: Reset Button action link */}
            <div>
              <button
                onClick={resetFilters}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '11px 14px',
                  backgroundColor: '#f1f5f9',
                  color: '#475569',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
              >
                <RotateCcw size={14} /> Clear All Filters
              </button>
            </div>
          </div>

          {/* Control D: Category Horizontal Tag Loop Rails */}
          <div style={{ marginTop: '24px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#475569',
                marginBottom: '12px',
              }}
            >
              <Filter size={14} /> Structural Category
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  style={{
                    padding: '8px 18px',
                    fontSize: '13px',
                    fontWeight: '500',
                    borderRadius: '9999px',
                    border: '1px solid',
                    borderColor: selectedCategory === cat.value ? '#4B5320' : '#e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: selectedCategory === cat.value ? '#4B5320' : '#ffffff',
                    color: selectedCategory === cat.value ? '#ffffff' : '#475569',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Metric Counter Area Display */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>
            Showing <strong>{filteredArticles.length}</strong> of {allArticles.length} analytical
            papers
          </div>
        </div>

        {/* 3. DYNAMIC ARTICLE GRID DISPLAY CARDS */}
        {filteredArticles.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 0',
              border: '1px dashed #e2e8f0',
              borderRadius: '16px',
              color: '#94a3b8',
              backgroundColor: '#fff',
            }}
          >
            <p style={{ margin: '0 0 8px 0', fontWeight: '600' }}>
              No articles match your combined search parameters.
            </p>
            <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1' }}>
              Try adjustments or clear active filters to discover more data logs.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '32px',
            }}
          >
            {filteredArticles.map((article) => {
              const image =
                article.featured_image && typeof article.featured_image === 'object'
                  ? (article.featured_image as Media)
                  : null

              const formattedDate = article.published_at
                ? format(new Date(article.published_at), 'MMM d, yyyy')
                : 'Draft'

              return (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <article
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: '#ffffff',
                      border: '1px solid #f1f5f9',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow:
                        '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                      height: '100%',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Media Thumbnail */}
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '210px',
                        backgroundColor: '#f8fafc',
                        overflow: 'hidden',
                      }}
                    >
                      {image?.url ? (
                        <img
                          src={image.url}
                          alt={image.alt || article.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#cbd5e1',
                            fontSize: '14px',
                          }}
                        >
                          No Featured Image Link
                        </div>
                      )}

                      {/* Overlays */}
                      {article.category && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '16px',
                            left: '16px',
                            backgroundColor: '#b91c1c',
                            color: '#ffffff',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            letterSpacing: '0.5px',
                          }}
                        >
                          {article.category}
                        </span>
                      )}

                      {article.language && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            backgroundColor: 'rgba(15, 23, 42, 0.75)',
                            color: '#ffffff',
                            fontSize: '10px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            backdropFilter: 'blur(4px)',
                          }}
                        >
                          {article.language === 'en' ? 'EN' : 'TA'}
                        </span>
                      )}
                    </div>

                    {/* Content Box */}
                    <div
                      style={{
                        padding: '24px',
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <h2
                        style={{
                          fontSize: '22px',
                          fontFamily: '"Playfair Display", Georgia, serif',
                          fontWeight: 'bold',
                          color: '#0B1D3A',
                          margin: '0 0 12px 0',
                          lineHeight: '1.3',
                        }}
                      >
                        {article.title}
                      </h2>

                      <p
                        style={{
                          color: '#64748b',
                          fontSize: '14px',
                          lineHeight: '1.6',
                          margin: '0 0 24px 0',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {article.excerpt}
                      </p>

                      {/* Footer Row */}
                      <div
                        style={{
                          marginTop: 'auto',
                          paddingTop: '16px',
                          borderTop: '1px solid #f8fafc',
                          display: 'flex',
                          alignItems: 'center',
                          justifyInContent: 'space-between',
                          fontSize: '13px',
                          color: '#94a3b8',
                          fontWeight: '500',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>10 min read</span>
                          <span>•</span>
                          <time>{formattedDate}</time>
                        </div>
                        <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#4B5320' }}>
                          →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}
