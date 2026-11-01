'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Media, Article } from '@/payload-types'
import { format } from 'date-fns'
import { Search, Filter, Languages, RotateCcw, Calendar, Clock } from 'lucide-react'
import HomeThemeWrapper from '@/components/layout/HomeThemeWrapper'

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

  // Fetch data directly on mount from Payload local REST API context safely
  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch('/api/articles?limit=100&depth=1&sort=-published_at')
        const data = await res.json()
        if (data && data.docs) {
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

  // Fast Multi-Filter Matrix Engine
  useEffect(() => {
    let result = [...allArticles]

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.excerpt?.toLowerCase().includes(query),
      )
    }

    if (selectedCategory !== 'all') {
      result = result.filter((article) => article.category === selectedCategory)
    }

    if (selectedLanguage !== 'all') {
      result = result.filter((article) => article.language === selectedLanguage)
    }

    setFilteredArticles(result)
  }, [searchQuery, selectedCategory, selectedLanguage, allArticles])

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
          color: 'var(--muted-text, #94A3B8)',
          backgroundColor: 'var(--bg-canvas, #070A14)',
        }}
      >
        Loading comprehensive editorial database...
      </div>
    )
  }

  return (
    <HomeThemeWrapper breakingNewsTrack={null} trendingNavTrack={null}>
      <main
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--bg-canvas, #070A14)',
          color: 'var(--text-main, #E2E8F0)',
          fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
          margin: 0,
          padding: 0,
          paddingBottom: '80px',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }}
      >
        {/* Dynamic Native CSS Engine overrides bound to multi-mode tokens */}
        <style>{`
          .hero-banner-section {
            padding: 64px 24px;
            border-bottom: 1px solid var(--border-color, #1E293B);
            background: radial-gradient(circle at top right, var(--card-bg, #0F172A) 0%, var(--bg-canvas, #070A14) 100%);
          }
          .main-content-wrap {
            padding: 40px 24px;
          }
          .filter-panel-box {
            background-color: var(--card-bg, #0F1526) !important;
            border: 1px solid var(--border-color, #1E293B) !important;
          }
          .filter-controls-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            align-items: end;
          }
          .dynamic-input-field {
            background-color: var(--bg-canvas, #070A14) !important;
            border: 1px solid var(--border-color, #1E293B) !important;
            color: var(--heading-color, #FFFFFF) !important;
          }
          .articles-display-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
            gap: 32px;
          }
          .category-rails-track {
            display: flex; 
            flex-wrap: wrap; 
            gap: 8px;
          }
          .editorial-card {
            background-color: var(--card-bg, #0F1526) !important;
            border: 1px solid var(--border-color, #1E293B) !important;
            transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
          }
          .editorial-card:hover {
            transform: translateY(-4px);
            border-color: #656E36 !important;
            box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.4);
          }
          .themed-header-text {
            color: var(--heading-color, #FFFFFF) !important;
          }
          .themed-sub-text-node {
            color: var(--muted-text, #94A3B8) !important;
          }
          .themed-border-divider {
            border-top: 1px solid var(--border-color, #1E293B) !important;
          }

          @media (max-width: 767px) {
            .hero-banner-section {
              padding: 48px 16px !important;
            }
            .main-content-wrap {
              padding: 24px 16px !important;
            }
            .filter-controls-grid {
              grid-template-columns: 1fr !important;
              gap: 16px !important;
            }
            .articles-display-grid {
              grid-template-columns: 1fr !important;
              gap: 24px !important;
            }
            .category-rails-track {
              overflow-x: auto !important;
              flex-wrap: nowrap !important;
              padding-bottom: 8px;
              -webkit-overflow-scrolling: touch;
              scrollbar-width: none;
            }
            .category-rails-track::-webkit-scrollbar {
              display: none;
            }
            .category-rail-btn {
              white-space: nowrap !important;
              flex-shrink: 0;
            }
          }
        `}</style>

        {/* 1. Header Hero Banner */}
        <section className="hero-banner-section">
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ borderLeft: '4px solid #656E36', paddingLeft: '16px' }}>
              <h1
                className="themed-header-text"
                style={{
                  fontSize: 'clamp(28px, 4.5vw, 40px)',
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 800,
                  margin: '0 0 12px 0',
                  letterSpacing: '-0.02em',
                  lineHeight: '1.2',
                }}
              >
                Geopolitical Analysis
              </h1>
            </div>
            <p
              className="themed-sub-text-node"
              style={{
                fontSize: 'clamp(14px, 2vw, 15.5px)',
                margin: 0,
                maxWidth: '800px',
                lineHeight: '1.6',
                fontWeight: '400',
                paddingLeft: '20px',
              }}
            >
              In-depth strategic assessments, military analysis, and expert commentary on regional
              security dynamics affecting South Asia and the Indo-Pacific theater.
            </p>
          </div>
        </section>

        {/* Main Filter Suite Container */}
        <section className="main-content-wrap" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* 🛠️ ADVANCED MULTI-FILTER PANEL CONTROLS */}
          <div
            className="filter-panel-box"
            style={{
              borderRadius: '6px',
              padding: '24px',
              marginBottom: '40px',
            }}
          >
            <div className="filter-controls-grid">
              {/* Control A: Live Search input */}
              <div>
                <label
                  className="themed-sub-text-node"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    fontWeight: '700',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  <Search size={12} /> Search Matrix
                </label>
                <input
                  type="text"
                  placeholder="Search headlines, keywords, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="dynamic-input-field"
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '11px 14px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Control B: Language Scope */}
              <div>
                <label
                  className="themed-sub-text-node"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    fontWeight: '700',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  <Languages size={12} /> Intelligence Edition
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="dynamic-input-field"
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '4px',
                    fontSize: '14px',
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

              {/* Control C: Reset Action */}
              <div>
                <button
                  onClick={resetFilters}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '12px 14px',
                    backgroundColor: 'var(--border-color, #1E293B)',
                    color: 'var(--text-main, #E2E8F0)',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    letterSpacing: '0.02em',
                  }}
                >
                  <RotateCcw size={13} /> Reset Controls
                </button>
              </div>
            </div>

            {/* Control D: Category Horizontal Rails */}
            <div
              className="themed-border-divider"
              style={{
                marginTop: '24px',
                paddingTop: '20px',
              }}
            >
              <span
                className="themed-sub-text-node"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  fontWeight: '700',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                <Filter size={12} /> Filter by Category
              </span>
              <div className="category-rails-track">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    className="category-rail-btn"
                    onClick={() => setSelectedCategory(cat.value)}
                    style={{
                      padding: '6px 14px',
                      fontSize: '12px',
                      fontWeight: '600',
                      borderRadius: '4px',
                      border: '1px solid',
                      borderColor:
                        selectedCategory === cat.value ? '#656E36' : 'var(--border-color, #1E293B)',
                      cursor: 'pointer',
                      backgroundColor:
                        selectedCategory === cat.value ? '#656E36' : 'var(--bg-canvas, #111827)',
                      color:
                        selectedCategory === cat.value ? '#FFFFFF' : 'var(--muted-text, #94A3B8)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Total Counters displaying current collection state */}
          <div style={{ marginBottom: '24px', paddingLeft: '2px' }}>
            <div className="themed-sub-text-node" style={{ fontSize: '13px', fontWeight: '500' }}>
              Displaying{' '}
              <strong style={{ color: 'var(--heading-color, #F8FAFC)' }}>
                {filteredArticles.length}
              </strong>{' '}
              of {allArticles.length} strategic briefs
            </div>
          </div>

          {/* 3. DYNAMIC ARTICLE GRID DISPLAY CARDS */}
          {filteredArticles.length === 0 ? (
            <div
              className="filter-panel-box"
              style={{
                textAlign: 'center',
                padding: '64px 16px',
                borderStyle: 'dashed',
                borderRadius: '4px',
              }}
            >
              <p className="themed-header-text" style={{ margin: '0 0 6px 0', fontWeight: '600' }}>
                No publications matched your query fields.
              </p>
              <p className="themed-sub-text-node" style={{ margin: 0, fontSize: '13px' }}>
                Reset filters above to browse the total intelligence database logs.
              </p>
            </div>
          ) : (
            <div className="articles-display-grid">
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
                      className="editorial-card"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        height: '100%',
                        cursor: 'pointer',
                      }}
                    >
                      {/* Media Thumbnail Container */}
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          aspectRatio: '16/10',
                          backgroundColor: 'var(--bg-canvas, #070A14)',
                          overflow: 'hidden',
                          borderBottom: '1px solid var(--border-color, #1E293B)',
                        }}
                      >
                        {image?.url ? (
                          <Image
                            src={image.url}
                            alt={image.alt || article.title}
                            fill
                            unoptimized
                            sizes="(max-width: 768px) 100vw, 30vw"
                            style={{ objectFit: 'cover' }}
                          />
                        ) : (
                          <div
                            className="themed-sub-text-node"
                            style={{
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '13px',
                            }}
                          >
                            No Document Image Available
                          </div>
                        )}

                        {/* Overlays Tags */}
                        {article.category && (
                          <span
                            style={{
                              position: 'absolute',
                              top: '12px',
                              left: '12px',
                              backgroundColor: '#656E36',
                              color: '#FFFFFF',
                              fontSize: '10px',
                              fontWeight: '700',
                              textTransform: 'uppercase',
                              padding: '4px 10px',
                              borderRadius: '2px',
                              letterSpacing: '0.04em',
                              zIndex: 10,
                            }}
                          >
                            {article.category}
                          </span>
                        )}

                        {article.language && (
                          <span
                            style={{
                              position: 'absolute',
                              top: '12px',
                              right: '12px',
                              backgroundColor: 'rgba(7, 10, 20, 0.85)',
                              color: '#94A3B8',
                              fontSize: '9px',
                              fontWeight: '700',
                              textTransform: 'uppercase',
                              padding: '4px 8px',
                              borderRadius: '2px',
                              border: '1px solid var(--border-color, rgba(255, 255, 255, 0.05))',
                            }}
                          >
                            {article.language === 'en' ? 'EN' : 'TA'}
                          </span>
                        )}
                      </div>

                      {/* Content Meta Box Area */}
                      <div
                        style={{
                          padding: '20px',
                          flexGrow: 1,
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <h2
                          className="themed-header-text"
                          style={{
                            fontSize: '18px',
                            fontFamily: '"Playfair Display", Georgia, serif',
                            fontWeight: 700,
                            margin: '0 0 10px 0',
                            lineHeight: '1.35',
                          }}
                        >
                          {article.title}
                        </h2>

                        <p
                          className="themed-sub-text-node"
                          style={{
                            fontSize: '13.5px',
                            lineHeight: '1.55',
                            margin: '0 0 20px 0',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {article.excerpt}
                        </p>

                        {/* Info Footer Block */}
                        <div
                          className="themed-border-divider themed-sub-text-node"
                          style={{
                            marginTop: 'auto',
                            paddingTop: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '12px',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Clock size={12} /> 10 min
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Calendar size={12} /> {formattedDate}
                            </span>
                          </div>
                          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#656E36' }}>
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
    </HomeThemeWrapper>
  )
}
