'use client'

import React, { useState, useEffect, useRef } from 'react'
import type { Media, Article, Video, Ad } from '@/payload-types'
import { Play, Calendar, ListIcon } from 'lucide-react'
import Link from 'next/link'
import AdvancedReaderSettings, { ReadingTheme, FontSizeLevel } from './AdvancedReaderSettings'
import EditorialContent from './EditorialContent'

interface ArticleReaderViewProps {
  article: Article
  formattedDate: string
  image: Media | null
  matchedVideo: Video | null
  adsData: Ad | null
  relatedArticles: Article[]
  recommendedVideos: Video[]
}

const AdSlot = ({ ad }: { ad: Ad | null }) => {
  const media = typeof ad?.adContent?.image === 'object' ? (ad.adContent.image as Media) : null
  if (!media?.url) return null
  return (
    <a
      href={ad?.adContent?.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'block',
        width: '240px',
        marginBottom: '32px',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
      }}
    >
      <img
        src={media.url}
        alt="Advertisement"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </a>
  )
}

export default function ArticleReaderView({
  article,
  formattedDate,
  image,
  matchedVideo,
  adsData,
  relatedArticles = [],
  recommendedVideos = [],
}: ArticleReaderViewProps) {
  const [isReadingMode, setIsReadingMode] = useState<boolean>(false)
  const [theme, setTheme] = useState<ReadingTheme>('light')
  const [fontSize, setFontSize] = useState<FontSizeLevel>('base')
  const [scrollProgress, setScrollProgress] = useState<number>(0)

  const docBodyRef = useRef<HTMLDivElement>(null)

  const getReadingDurationEstimate = (): number => {
    try {
      const words = JSON.stringify(article.body || '').split(/\s+/).length
      const minutes = Math.ceil(words / 225)
      return minutes > 0 ? minutes : 1
    } catch {
      return 4
    }
  }

  useEffect(() => {
    const trackScrollDepth = () => {
      if (!docBodyRef.current) return
      const heightDelta = docBodyRef.current.clientHeight - window.innerHeight
      if (heightDelta <= 0) return
      const scrolled = (window.scrollY / heightDelta) * 100
      setScrollProgress(Math.min(Math.max(scrolled, 0), 100))
    }
    window.addEventListener('scroll', trackScrollDepth)
    return () => window.removeEventListener('scroll', trackScrollDepth)
  }, [isReadingMode])

  const themeStyles = {
    light: {
      bg: '#ffffff',
      text: '#2c3e50',
      title: '#0B1D3A',
      cardBg: '#ffffff',
      border: '#e2e8f0',
      quoteBorder: '#0B1D3A',
      strongColor: '#0b1d3a',
    },
    sepia: {
      bg: '#f4ecd8',
      text: '#433422',
      title: '#2b1d0c',
      cardBg: '#ebdcb9',
      border: '#d9cbb0',
      quoteBorder: '#8c6239',
      strongColor: '#1a0f00',
    },
    dark: {
      bg: '#0f172a',
      text: '#cbd5e1',
      title: '#f8fafc',
      cardBg: '#1e293b',
      border: '#334155',
      quoteBorder: '#fbbf24',
      strongColor: '#ffffff',
    },
  }[isReadingMode ? theme : 'light']

  const sizeStyles = {
    sm: { text: '16px', title: '32px', sectionHeading: '22px', lineSpacing: '1.8' },
    base: { text: '20px', title: '42px', sectionHeading: '28px', lineSpacing: '1.9' },
    lg: { text: '23px', title: '48px', sectionHeading: '34px', lineSpacing: '2.0' },
    xl: { text: '26px', title: '54px', sectionHeading: '40px', lineSpacing: '2.1' },
  }[fontSize]

  // Extract table of contents cleanly to map anchors loop list references
  const tocLinks = (article as any).table_of_contents || []

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: themeStyles.bg,
        color: themeStyles.text,
        padding: '40px 0',
        transition: 'background-color 0.2s ease, color 0.2s ease',
      }}
    >
      {isReadingMode && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            backgroundColor: 'rgba(0,0,0,0.05)',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: `${scrollProgress}%`,
              height: '100%',
              backgroundColor: '#fbbf24',
              transition: 'width 0.1s ease-out',
            }}
          />
        </div>
      )}

      <AdvancedReaderSettings
        isReadingMode={isReadingMode}
        setIsReadingMode={setIsReadingMode}
        theme={theme}
        setTheme={setTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
        themeStyles={themeStyles}
      />

      <div
        ref={docBodyRef}
        style={{
          maxWidth: isReadingMode ? '720px' : '1360px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'grid',
          gridTemplateColumns: isReadingMode ? '1fr' : '240px 1fr 240px',
          gap: isReadingMode ? '0px' : '50px',
          transition: 'max-width 0.3s ease',
        }}
      >
        {!isReadingMode && (
          <aside style={{ gridColumn: '1' }}>
            <AdSlot ad={adsData} />
          </aside>
        )}

        <article style={{ gridColumn: isReadingMode ? '1' : '2' }}>
          <div style={{ marginBottom: '20px' }}>
            <span
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                color: isReadingMode ? themeStyles.text : '#64748b',
                opacity: isReadingMode ? 0.7 : 1,
                fontWeight: '700',
                letterSpacing: '0.08em',
              }}
            >
              {article.category || 'Geopolitical Intelligence Briefing'}
            </span>
          </div>

          <h1
            style={{
              fontSize: isReadingMode ? sizeStyles.title : 'clamp(2.2rem, 4.5vw, 3.2rem)',
              fontWeight: '900',
              color: themeStyles.title,
              lineHeight: '1.15',
              marginBottom: '24px',
              letterSpacing: '-0.02em',
              transition: 'font-size 0.2s ease',
            }}
          >
            {article.title}
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '30px',
              color: isReadingMode ? themeStyles.text : '#64748b',
              opacity: isReadingMode ? 0.7 : 1,
              fontSize: '13px',
              fontWeight: '500',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={13} />
              <span>{formattedDate}</span>
            </div>
            <span>•</span>
            <div>DURATION: {getReadingDurationEstimate()} MINS</div>
          </div>

          {/* Inline Table of Contents Quick Navigation Segment */}
          {tocLinks.length > 0 && (
            <div
              style={{
                padding: '20px',
                borderRadius: '8px',
                border: `1px solid ${themeStyles.border}`,
                backgroundColor: themeStyles.cardBg,
                marginBottom: '40px',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: '700',
                  fontSize: '14px',
                  color: themeStyles.title,
                  textTransform: 'uppercase',
                  marginBottom: '14px',
                  letterSpacing: '0.02em',
                }}
              >
                <ListIcon size={16} /> Quick Section Navigation
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {tocLinks.map((link: any, idx: number) => (
                  <li key={idx} style={{ fontSize: '15px' }}>
                    <a
                      href={`#${link.anchor_id}`}
                      style={{ color: '#fbbf24', fontWeight: '600', textDecoration: 'none' }}
                      onClick={(e) => {
                        e.preventDefault()
                        document
                          .getElementById(link.anchor_id)
                          ?.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {image?.url && (
            <img
              src={image.url}
              alt={article.title}
              style={{
                width: '100%',
                borderRadius: '12px',
                marginBottom: '44px',
                border: isReadingMode ? `1px solid ${themeStyles.border}` : 'none',
                boxShadow: isReadingMode ? 'none' : '0 10px 25px -5px rgba(0,0,0,0.05)',
              }}
            />
          )}

          <EditorialContent
            article={article}
            isReadingMode={isReadingMode}
            theme={theme}
            fontSize={fontSize}
            themeStyles={themeStyles}
            sizeStyles={sizeStyles}
          />

          {/* Footer Recommendations loops */}
          <footer
            style={{
              marginTop: '80px',
              borderTop: `2px solid ${themeStyles.border}`,
              paddingTop: '50px',
            }}
          >
            {relatedArticles.length > 0 && (
              <div style={{ marginBottom: '50px' }}>
                <h2
                  style={{
                    fontSize: isReadingMode ? sizeStyles.sectionHeading : '18px',
                    fontWeight: '800',
                    color: themeStyles.title,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span
                    style={{
                      width: '4px',
                      height: '18px',
                      backgroundColor: '#fbbf24',
                      display: 'inline-block',
                    }}
                  />{' '}
                  Related Analysis
                </h2>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '20px',
                  }}
                >
                  {relatedArticles.map((art) => (
                    <Link
                      href={`/articles/${art.slug}`}
                      key={art.id}
                      style={{
                        textDecoration: 'none',
                        display: 'block',
                        padding: '20px',
                        border: `1px solid ${themeStyles.border}`,
                        borderRadius: '10px',
                        backgroundColor: themeStyles.cardBg,
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#fbbf24'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = themeStyles.border
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                    >
                      <h3
                        style={{
                          fontSize: '15px',
                          color: themeStyles.text,
                          margin: '0',
                          lineHeight: '1.4',
                          fontWeight: '700',
                        }}
                      >
                        {art.title}
                      </h3>
                      <span
                        style={{
                          display: 'inline-block',
                          marginTop: '12px',
                          fontSize: '12px',
                          color: '#fbbf24',
                          fontWeight: '700',
                        }}
                      >
                        Read Dossier →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {recommendedVideos.length > 0 && (
              <div style={{ marginBottom: '30px' }}>
                <h2
                  style={{
                    fontSize: isReadingMode ? sizeStyles.sectionHeading : '18px',
                    fontWeight: '800',
                    color: themeStyles.title,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span
                    style={{
                      width: '4px',
                      height: '18px',
                      backgroundColor: '#0B1D3A',
                      display: 'inline-block',
                    }}
                  />{' '}
                  Video Briefings
                </h2>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '20px',
                  }}
                >
                  {recommendedVideos.map((vid) => (
                    <Link
                      href={`/videos/${vid.youtube_id || vid.id}`}
                      key={vid.id}
                      style={{ textDecoration: 'none', display: 'block' }}
                    >
                      <div
                        style={{
                          borderRadius: '10px',
                          overflow: 'hidden',
                          backgroundColor: themeStyles.cardBg,
                          border: `1px solid ${themeStyles.border}`,
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)'
                          e.currentTarget.style.borderColor = '#fbbf24'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)'
                          e.currentTarget.style.borderColor = themeStyles.border
                        }}
                      >
                        <div
                          style={{
                            position: 'relative',
                            aspectRatio: '16/9',
                            backgroundColor: '#000',
                          }}
                        >
                          <img
                            src={`https://img.youtube.com/vi/${vid.youtube_id}/mqdefault.jpg`}
                            alt={vid.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              opacity: 0.85,
                            }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <div
                              style={{
                                backgroundColor: 'rgba(11, 29, 58, 0.95)',
                                padding: '10px',
                                borderRadius: '50%',
                                display: 'flex',
                              }}
                            >
                              <Play size={16} fill="#fff" color="#fff" />
                            </div>
                          </div>
                        </div>
                        <div style={{ padding: '14px' }}>
                          <h3
                            style={{
                              fontSize: '14px',
                              lineHeight: '1.4',
                              color: themeStyles.text,
                              fontWeight: '700',
                              margin: 0,
                            }}
                          >
                            {vid.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </footer>
        </article>

        {!isReadingMode && (
          <aside style={{ gridColumn: '3' }}>
            {matchedVideo && (
              <div style={{ marginBottom: '32px' }}>
                <h4
                  style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    color: '#64748b',
                    marginBottom: '16px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  FEATURED BRIEFING
                </h4>
                <Link
                  href={`/videos/${matchedVideo.youtube_id || matchedVideo.id}`}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div
                    style={{
                      position: 'relative',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: '#000',
                      aspectRatio: '16/9',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                    }}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${matchedVideo.youtube_id}/mqdefault.jpg`}
                      alt={matchedVideo.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: 'rgba(11, 29, 58, 0.95)',
                          padding: '12px',
                          borderRadius: '50%',
                          backdropFilter: 'blur(4px)',
                          display: 'flex',
                        }}
                      >
                        <Play size={20} fill="#fff" color="#fff" />
                      </div>
                    </div>
                  </div>
                  <h3
                    style={{
                      fontSize: '14px',
                      lineHeight: '1.4',
                      marginTop: '12px',
                      color: '#0B1D3A',
                      fontWeight: '700',
                      margin: 0,
                    }}
                  >
                    {matchedVideo.title}
                  </h3>
                </Link>
              </div>
            )}
            <AdSlot ad={adsData} />
          </aside>
        )}
      </div>
    </main>
  )
}
