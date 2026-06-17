'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Video, ArticleTag } from '@/payload-types'
import { Search, Filter, Play, Film, RotateCcw } from 'lucide-react'

export default function VideosListPage() {
  const [allVideos, setAllVideos] = useState<Video[]>([])
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  // Filtering states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { label: 'All Broadcasts', value: 'all' },
    { label: 'Geopolitics', value: 'geopolitics' },
    { label: 'Defence', value: 'defence' },
    { label: 'Career Guidance', value: 'career' },
    { label: 'Motivation', value: 'motivation' },
  ]

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch('/api/videos?limit=100&depth=1')
        const data = await res.json()
        if (data && data.docs) {
          const published = data.docs.filter((v: Video) => v.status === 'published')
          setAllVideos(published)
          setFilteredVideos(published)
        }
      } catch (err) {
        console.error('Error fetching dashboard video logs', err)
      } finally {
        setLoading(false)
      }
    }
    fetchVideos()
  }, [])

  useEffect(() => {
    let result = [...allVideos]

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(query) || v.description?.toLowerCase().includes(query),
      )
    }

    if (selectedCategory !== 'all') {
      result = result.filter((v) => v.category === selectedCategory)
    }

    setFilteredVideos(result)
  }, [searchQuery, selectedCategory, allVideos])

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
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
          backgroundColor: '#fcfcfc',
        }}
      >
        Loading video streaming library catalogs...
      </div>
    )
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#fcfcfc',
        fontFamily: '"Inter", system-ui, sans-serif',
        color: '#1e293b',
        margin: 0,
        padding: 0,
      }}
    >
      {/* 1. BRAND HERO BANNER HEADER (Matches your exact Corporate Navy style) */}
      <section
        style={{
          backgroundColor: '#0B1D3A',
          color: 'white',
          padding: '56px 48px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#cbd5e1',
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              padding: '4px 10px',
              borderRadius: '4px',
              marginBottom: '16px',
              letterSpacing: '0.5px',
            }}
          >
            <Film size={12} /> Video Broadcast Hub
          </div>
          <h1
            style={{
              fontSize: '42px',
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 'bold',
              margin: '0 0 12px 0',
              color: '#ffffff',
              letterSpacing: '-0.5px',
            }}
          >
            Media & Live Briefings
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
            Authoritative visual analysis, strategic intelligence breakdowns, and video commentary
            directly from the operational perimeter.
          </p>
        </div>
      </section>

      {/* Main Container Content Scope */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        {/* 2. PLATFORM ALIGNED FILTER SUITE PANEL */}
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              alignItems: 'end',
            }}
          >
            {/* Search Input Box Layout */}
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
                <Search size={14} /> Search Video Library
              </label>
              <input
                type="text"
                placeholder="Search briefings, titles, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  color: '#1e293b',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              />
            </div>

            {/* Clear Filters Reset Option Trigger */}
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
                <RotateCcw size={14} /> Reset Filters
              </button>
            </div>
          </div>

          {/* Horizontal Structural Categories Rails */}
          <div style={{ marginTop: '20px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
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
              <Filter size={14} /> Filter by Category
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

        {/* Total Parameter Metric Count Summary */}
        <div
          style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px', fontWeight: '500' }}
        >
          Showing <strong>{filteredVideos.length}</strong> of {allVideos.length} broadcast clips
        </div>

        {/* 3. LIGHT BRIGHT GRAPHICAL VIDEO GRID (Aligned perfectly with Articles card deck) */}
        {filteredVideos.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 0',
              border: '1px dashed #e2e8f0',
              borderRadius: '16px',
              color: '#94a3b8',
              backgroundColor: '#ffffff',
            }}
          >
            No video briefings match your combined filtering selection parameters.
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '32px',
            }}
          >
            {filteredVideos.map((video) => {
              const thumbnailUrl = `https://img.youtube.com/vi/${video.youtube_id}/maxresdefault.jpg`

              return (
                <Link
                  key={video.id}
                  href={`/videos/${video.youtube_id}`}
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
                    {/* MEDIA THUMBNAIL WRAPPER WITH EMBEDDED PLAY STATE ACCENT OVERLAYS */}
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '210px',
                        backgroundColor: '#f8fafc',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={thumbnailUrl}
                        alt={video.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src =
                            `https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`
                        }}
                      />

                      {/* Clear, distinctive Play Overlay Button (Lets users know immediately it is video media) */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: 'rgba(11, 29, 58, 0.9)', // Solid brand Navy overlay shell
                          width: '52px',
                          height: '52px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff',
                          boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                        }}
                      >
                        <Play size={18} fill="#ffffff" style={{ marginLeft: '2px' }} />
                      </div>

                      {/* Core Category Pill Overlay Badge */}
                      <span
                        style={{
                          position: 'absolute',
                          top: '16px',
                          left: '16px',
                          backgroundColor: '#4B5320', // Olive drab brand token
                          color: '#ffffff',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {video.category}
                      </span>
                    </div>

                    {/* Content Details Area Box */}
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
                          color: '#0B1D3A', // Matches primary brand header font color tokens
                          margin: '0 0 12px 0',
                          lineHeight: '1.3',
                        }}
                      >
                        {video.title}
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
                        {video.description}
                      </p>

                      {/* Relational Tag Row Footer Alignment Block */}
                      {video.tags && video.tags.length > 0 && (
                        <div
                          style={{
                            marginTop: 'auto',
                            paddingTop: '16px',
                            borderTop: '1px solid #f8fafc',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '6px',
                          }}
                        >
                          {video.tags.slice(0, 3).map((tRelation) => {
                            const tag = tRelation as ArticleTag
                            return (
                              <span
                                key={tag.id}
                                style={{
                                  fontSize: '12px',
                                  color: '#475569',
                                  backgroundColor: '#f1f5f9',
                                  padding: '4px 10px',
                                  borderRadius: '4px',
                                  fontWeight: '500',
                                }}
                              >
                                #{tag.name}
                              </span>
                            )
                          })}
                        </div>
                      )}
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
