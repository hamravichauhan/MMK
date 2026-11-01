'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Video } from '@/payload-types'
import { Search, Filter, Play, Film, RotateCcw } from 'lucide-react'
import HomeThemeWrapper from '@/components/layout/HomeThemeWrapper'

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
          color: 'var(--muted-text, #94a3b8)',
          backgroundColor: 'var(--bg-color, #070A14)',
          fontFamily: '"Inter", sans-serif',
        }}
      >
        Loading video streaming library catalogs...
      </div>
    )
  }

  return (
    <HomeThemeWrapper breakingNewsTrack={null} trendingNavTrack={null}>
      <main
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--bg-color, #070A14)',
          fontFamily: '"Inter", system-ui, sans-serif',
          color: 'var(--text-color, #E2E8F0)',
          margin: 0,
          padding: 0,
          paddingBottom: '80px',
        }}
      >
        {/* 1. BRAND HERO BANNER HEADER */}
        <section
          style={{
            padding: '56px 24px',
            borderBottom: '1px solid var(--border-color, #1E293B)',
            background: 'radial-gradient(circle at top right, var(--card-bg, #0F172A) 0%, var(--bg-color, #070A14) 100%)',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(101, 110, 54, 0.15)',
                border: '1px solid #656e36',
                color: '#A3B158',
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
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 'bold',
                margin: '0 0 12px 0',
                color: 'var(--heading-color, #ffffff)',
                letterSpacing: '-0.5px',
              }}
            >
              Media & Live Broadcasts
            </h1>
            <p
              style={{
                color: 'var(--muted-text, #cbd5e1)',
                fontSize: '16px',
                margin: 0,
                maxWidth: '680px',
                lineHeight: '1.6',
              }}
            >
              Authoritative defense assessments, geopolitical television debates, and video briefings from Major Madhan Kumar.
            </p>
          </div>
        </section>

        {/* Main Container Content Scope */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
          {/* 2. PLATFORM ALIGNED FILTER SUITE PANEL */}
          <div
            style={{
              backgroundColor: 'var(--card-bg, #0F1526)',
              border: '1px solid var(--border-color, #1E293B)',
              borderRadius: '10px',
              padding: '24px',
              marginBottom: '32px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
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
                    fontSize: '12px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    color: 'var(--muted-text, #94A3B8)',
                    marginBottom: '8px',
                    letterSpacing: '0.04em',
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
                    backgroundColor: 'var(--input-bg, #0A0E1A)',
                    border: '1px solid var(--border-color, #1E293B)',
                    color: 'var(--text-color, #FFFFFF)',
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
                    backgroundColor: 'var(--subtle-bg, rgba(255,255,255,0.05))',
                    color: 'var(--text-color, #E2E8F0)',
                    border: '1px solid var(--border-color, #1E293B)',
                    borderRadius: '6px',
                    fontSize: '13.5px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <RotateCcw size={14} /> Reset Filters
                </button>
              </div>
            </div>

            {/* Horizontal Structural Categories Rails */}
            <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-color, #1E293B)', paddingTop: '18px' }}>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  color: 'var(--muted-text, #94A3B8)',
                  marginBottom: '12px',
                  letterSpacing: '0.04em',
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
                      padding: '7px 16px',
                      fontSize: '13px',
                      fontWeight: '600',
                      borderRadius: '9999px',
                      border: '1px solid',
                      borderColor: selectedCategory === cat.value ? '#656E36' : 'var(--border-color, #1E293B)',
                      backgroundColor: selectedCategory === cat.value ? '#656E36' : 'var(--card-bg, #0F1526)',
                      color: selectedCategory === cat.value ? '#ffffff' : 'var(--text-color, #94A3B8)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. VIDEO GRID */}
          {filteredVideos.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 0',
                border: '1px dashed var(--border-color, #1E293B)',
                borderRadius: '12px',
                color: 'var(--muted-text, #94a3b8)',
                backgroundColor: 'var(--card-bg, #0F1526)',
              }}
            >
              No video briefings match your combined filtering selection parameters.
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '24px',
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
                      className="video-card-item"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'var(--card-bg, #0F1526)',
                        border: '1px solid var(--border-color, #1E293B)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        height: '100%',
                        cursor: 'pointer',
                      }}
                    >
                      {/* MEDIA THUMBNAIL WRAPPER */}
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          aspectRatio: '16/9',
                          backgroundColor: '#000000',
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

                        {/* Distinctive Play Overlay Button */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'rgba(220, 38, 38, 0.9)',
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                          }}
                        >
                          <Play size={18} fill="#ffffff" style={{ marginLeft: '2px' }} />
                        </div>

                        {/* Category tag */}
                        <span
                          style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            backgroundColor: 'rgba(0,0,0,0.75)',
                            color: '#FFFFFF',
                            fontSize: '10px',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '3px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                          }}
                        >
                          {video.category || 'Broadcast'}
                        </span>
                      </div>

                      {/* Content block */}
                      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <h3
                          style={{
                            fontSize: '16px',
                            fontWeight: 700,
                            margin: '0 0 8px 0',
                            color: 'var(--heading-color, #FFFFFF)',
                            lineHeight: '1.4',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {video.title}
                        </h3>

                        {video.description && (
                          <p
                            style={{
                              fontSize: '13px',
                              lineHeight: '1.5',
                              margin: '0 0 12px 0',
                              color: 'var(--muted-text, #94A3B8)',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              flex: 1,
                            }}
                          >
                            {video.description}
                          </p>
                        )}

                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#656E36',
                            marginTop: 'auto',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          Watch Broadcast →
                        </span>
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
