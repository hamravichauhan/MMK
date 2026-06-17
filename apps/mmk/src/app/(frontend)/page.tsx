import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import NewsCarousel from '@/components/NewsCarousel'
import Link from 'next/link'
import Image from 'next/image'

// Helper function to extract and map Cloudinary image assets safely
const getCloudinaryUrl = (mediaObj: any) => {
  if (!mediaObj) return '/placeholder.jpg'
  if (typeof mediaObj === 'string') return mediaObj
  return mediaObj.url || '/placeholder.jpg'
}

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  // Parallel database extraction tier fetching across all system schemas
  const [articlesData, videosData, eventsData, soldiersData, tagsData] = await Promise.all([
    payload.find({
      collection: 'articles',
      where: { status: { equals: 'published' } },
      sort: '-published_at',
      limit: 12,
    }),
    payload.find({
      collection: 'videos',
      where: { status: { equals: 'published' } },
      sort: '-createdAt',
      limit: 4,
    }),
    payload.find({
      collection: 'events',
      sort: '-event_date',
      limit: 3,
    }),
    payload.find({
      collection: 'soldiers',
      sort: '-createdAt',
      limit: 4,
    }),
    payload.find({
      collection: 'article-tags',
      limit: 8,
    }),
  ])

  const articles = articlesData.docs || []
  const videos = videosData.docs || []
  const events = eventsData.docs || []
  const soldiers = soldiersData.docs || []
  const tags = tagsData.docs || []

  const breakingArticles = articles.filter((art: any) => art.is_breaking)
  const featuredArticle = articles.find((art: any) => art.is_featured) || articles[0]
  const secondaryBriefings = articles
    .filter((art: any) => art.id !== featuredArticle?.id)
    .slice(0, 5)

  // Premium High-Density Editorial Style Dictionary
  const styles = {
    main: {
      backgroundColor: '#070A14', // Ultra-dark defense canvas base
      color: '#E2E8F0',
      minHeight: '100vh',
      fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
      paddingBottom: '80px',
    },
    tickerSection: {
      backgroundColor: '#0F1526',
      borderBottom: '1px solid #1E293B',
      padding: '6px 0',
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 24px',
    },
    tagNav: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      overflowX: 'auto' as const,
      padding: '16px 0 14px 0',
      borderBottom: '1px solid rgba(30, 41, 59, 0.8)',
      scrollbarWidth: 'none' as const,
    },
    tagBadge: {
      fontSize: '11px',
      fontWeight: '600',
      backgroundColor: '#111827',
      border: '1px solid #1E293B',
      padding: '6px 14px',
      borderRadius: '4px', // Sharp premium edges instead of round pills
      color: '#94A3B8',
      textDecoration: 'none',
      whiteSpace: 'nowrap' as const,
      letterSpacing: '0.03em',
    },
    editorialGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '40px',
      paddingTop: '32px',
      paddingBottom: '48px',
    },
    spotlightCol: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '20px',
    },
    briefingCol: {
      display: 'flex',
      flexDirection: 'column' as const,
      borderLeft: '1px solid rgba(30, 41, 59, 0.8)',
      paddingLeft: '24px',
    },
    sectionIndicator: {
      borderLeft: '4px solid #656e36', // Brand Olive Accent
      paddingLeft: '12px',
      marginBottom: '4px',
    },
    indicatorText: {
      fontSize: '13px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.12em',
      fontWeight: 700,
      color: '#FFFFFF',
    },
    imageWrapper: {
      position: 'relative' as const,
      aspectRatio: '16/9',
      width: '100%',
      overflow: 'hidden',
      borderRadius: '2px',
      backgroundColor: '#0F1526',
      border: '1px solid #1E293B',
    },
    categoryBadge: {
      position: 'absolute' as const,
      top: '16px',
      left: '16px',
      backgroundColor: '#656e36',
      color: '#FFFFFF',
      padding: '5px 12px',
      fontSize: '11px',
      fontWeight: 700,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.06em',
      borderRadius: '2px',
      zIndex: 10,
    },
    mainTitle: {
      fontSize: 'clamp(26px, 3.8vw, 38px)',
      fontFamily: '"Playfair Display", Georgia, serif', // Editorial Headings
      fontWeight: 800,
      color: '#FFFFFF',
      lineHeight: '1.2',
      margin: '12px 0 10px 0',
      textDecoration: 'none',
    },
    excerpt: {
      color: '#94A3B8',
      fontSize: '15.5px',
      lineHeight: '1.6',
      margin: '0 0 14px 0',
    },
    metaRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '12px',
      color: '#64748B',
    },
    briefingItem: {
      display: 'flex',
      gap: '16px',
      padding: '20px 0',
      borderBottom: '1px solid rgba(30, 41, 59, 0.6)',
      alignItems: 'flex-start',
    },
    briefingTextContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column' as const,
    },
    briefingTitle: {
      fontSize: '16px',
      fontWeight: 700,
      color: '#F8FAFC',
      margin: '4px 0 6px 0',
      lineHeight: '1.4',
    },
    briefingImgWrapper: {
      position: 'relative' as const,
      width: '100px',
      height: '70px',
      flexShrink: 0,
      borderRadius: '2px',
      overflow: 'hidden',
      border: '1px solid #1E293B',
    },
    mediaSection: {
      backgroundColor: '#090D1A',
      borderTop: '1px solid #1E293B',
      borderBottom: '1px solid #1E293B',
      padding: '56px 0',
      margin: '40px 0',
    },
    flexHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
    },
    fourColumnGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px',
    },
    videoCard: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '12px',
      backgroundColor: '#0F1526',
      border: '1px solid #1E293B',
      padding: '12px',
      borderRadius: '4px',
    },
    videoFrameWrapper: {
      position: 'relative' as const,
      aspectRatio: '16/9',
      width: '100%',
      backgroundColor: '#000000',
      overflow: 'hidden',
    },
    soldierCard: {
      backgroundColor: '#0F1526',
      border: '1px solid #1E293B',
      borderRadius: '4px',
      padding: '16px',
      textDecoration: 'none',
      color: 'inherit',
    },
    soldierImage: {
      position: 'relative' as const,
      aspectRatio: '1/1',
      width: '100%',
      borderRadius: '2px',
      overflow: 'hidden',
      backgroundColor: '#090D1A',
      marginBottom: '14px',
    },
    martyrBadge: {
      position: 'absolute' as const,
      top: '8px',
      right: '8px',
      backgroundColor: '#DC2626',
      color: '#FFFFFF',
      fontSize: '10px',
      fontWeight: 700,
      padding: '3px 8px',
      borderRadius: '2px',
      letterSpacing: '0.05em',
      textTransform: 'uppercase' as const,
    },
    eventCard: {
      backgroundColor: '#0F1526',
      border: '1px solid #1E293B',
      borderRadius: '4px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'space-between',
      gap: '20px',
    },
  }

  return (
    <div style={styles.main}>
      {/* 1. BREAKING NEWS AUTOMATED TRACK */}
      {breakingArticles.length > 0 && (
        <section style={styles.tickerSection}>
          <div style={styles.container}>
            <NewsCarousel items={breakingArticles} />
          </div>
        </section>
      )}

      {/* 2. DYNAMIC TRENDING INDEX */}
      {tags.length > 0 && (
        <nav style={styles.container}>
          <div style={styles.tagNav}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#64748B',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                letterSpacing: '0.08em',
                marginRight: '6px',
              }}
            >
              Trending:
            </span>
            {tags.map((tag: any) => (
              <Link key={tag.id} href={`/articles?tag=${tag.slug}`} style={styles.tagBadge}>
                #{tag.name}
              </Link>
            ))}
          </div>
        </nav>
      )}

      {/* 3. ASYMMETRICAL INTEL SPLIT HERO GRID */}
      <section style={styles.container}>
        <div style={styles.editorialGrid} className="editorial-blueprint-grid">
          {/* Left Block: Spotlight Main Column */}
          <div style={styles.spotlightCol}>
            <div style={styles.sectionIndicator}>
              <span style={styles.indicatorText}>Spotlight Analysis</span>
            </div>

            {featuredArticle ? (
              <Link
                href={`/articles/${featuredArticle.slug}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div style={styles.imageWrapper}>
                  <Image
                    src={getCloudinaryUrl(featuredArticle.featured_image)}
                    alt={featuredArticle.title || 'Spotlight Cover'}
                    fill
                    priority
                    style={{ objectFit: 'cover' }}
                  />
                  <span style={styles.categoryBadge}>
                    {featuredArticle.category || 'Strategic Threat'}
                  </span>
                </div>
                <h1 style={styles.mainTitle}>{featuredArticle.title}</h1>
                <p style={styles.excerpt}>{featuredArticle.excerpt}</p>
                <div style={styles.metaRow}>
                  <span style={{ color: '#F8FAFC', fontWeight: 600 }}>By Major Madhan Kumar</span>
                  <span>•</span>
                  <span>
                    {new Date(
                      featuredArticle.published_at || featuredArticle.createdAt,
                    ).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </Link>
            ) : (
              <p style={{ color: '#64748B' }}>No primary publications indexed.</p>
            )}
          </div>

          {/* Right Block: High-Density Sidebar Feed */}
          <div style={styles.briefingCol} className="briefing-blueprint-side">
            <div
              style={{ borderLeft: '4px solid #DC2626', paddingLeft: '12px', marginBottom: '16px' }}
            >
              <h2 style={{ ...styles.indicatorText, color: '#FFFFFF' }}>Latest Briefings</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {secondaryBriefings.length > 0 ? (
                secondaryBriefings.map((art: any) => (
                  <article key={art.id} style={styles.briefingItem}>
                    {/* Sidebar Left Aligned Text Content */}
                    <div style={styles.briefingTextContainer}>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          color: '#656e36',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {art.category || 'Geopolitics'}
                      </span>
                      <Link
                        href={`/articles/${art.slug}`}
                        style={{ textDecoration: 'none', display: 'block' }}
                      >
                        <h3 style={styles.briefingTitle}>{art.title}</h3>
                      </Link>
                      <span style={{ fontSize: '11px', color: '#64748B' }}>
                        {new Date(art.published_at || art.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    {/* Sidebar Right Aligned Fixed Image Box */}
                    <div style={styles.briefingImgWrapper}>
                      <Image
                        src={getCloudinaryUrl(art.featured_image)}
                        alt={art.title}
                        fill
                        sizes="100px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </article>
                ))
              ) : (
                <p style={{ color: '#64748B' }}>No dynamic briefings queued.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. HONOUR DECK: KNOW YOUR SOLDIERS DATABASE */}
      {soldiers.length > 0 && (
        <section
          style={{
            ...styles.container,
            borderTop: '1px solid rgba(30, 41, 59, 0.8)',
            paddingTop: '48px',
            paddingBottom: '24px',
          }}
        >
          <div style={styles.flexHeader}>
            <div style={{ borderLeft: '4px solid #D97706', paddingLeft: '12px' }}>
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  letterSpacing: '0.05em',
                }}
              >
                Know Your Soldiers
              </h2>
            </div>
            <Link
              href="/soldiers"
              style={{
                fontSize: '12px',
                color: '#94A3B8',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Explore Profiles →
            </Link>
          </div>

          <div style={styles.fourColumnGrid}>
            {soldiers.map((soldier: any) => (
              <Link href={`/soldiers/${soldier.id}`} key={soldier.id} style={styles.soldierCard}>
                <div style={styles.soldierImage}>
                  <Image
                    src={getCloudinaryUrl(soldier.photo)}
                    alt={soldier.full_name}
                    fill
                    style={{ objectFit: 'cover', filter: 'grayscale(20%)' }}
                  />
                  {soldier.is_martyr && <span style={styles.martyrBadge}>Martyr</span>}
                </div>
                <span
                  style={{
                    fontSize: '10px',
                    color: '#D97706',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {soldier.rank} • {soldier.branch}
                </span>
                <h3
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    margin: '4px 0 0 0',
                  }}
                >
                  {soldier.full_name}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 5. MULTIMEDIA SECTION: VIDEO INTELLIGENCE CARD DECK */}
      {videos.length > 0 && (
        <section style={styles.mediaSection}>
          <div style={styles.container}>
            <div style={styles.flexHeader}>
              <div style={{ borderLeft: '4px solid #656e36', paddingLeft: '12px' }}>
                <h2
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Video Intelligence
                </h2>
              </div>
              <Link
                href="/videos"
                style={{
                  fontSize: '12px',
                  color: '#94A3B8',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                View All Broadcasts →
              </Link>
            </div>

            <div style={styles.fourColumnGrid}>
              {videos.map((vid: any) => (
                <div key={vid.id} style={styles.videoCard}>
                  <div style={styles.videoFrameWrapper}>
                    <iframe
                      src={`https://www.youtube.com/embed/${vid.youtube_id}`}
                      title={vid.title || 'YouTube Video Player'}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 0,
                      }}
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <div style={{ padding: '4px 2px 0 2px' }}>
                    <span
                      style={{
                        fontSize: '9px',
                        backgroundColor: '#1E293B',
                        color: '#E2E8F0',
                        padding: '3px 8px',
                        borderRadius: '2px',
                        textTransform: 'uppercase',
                        fontWeight: '700',
                        letterSpacing: '0.05em',
                        display: 'inline-block',
                        marginBottom: '8px',
                      }}
                    >
                      {vid.category || 'Briefing'}
                    </span>
                    <h4
                      style={{
                        fontSize: '13.5px',
                        fontWeight: '600',
                        margin: 0,
                        color: '#FFFFFF',
                        lineHeight: '1.4',
                      }}
                    >
                      {vid.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. STRATEGIC REGISTRY: UPCOMING EVENTS RECORD */}
      {events.length > 0 && (
        <section style={{ ...styles.container, paddingTop: '16px' }}>
          <div
            style={{ borderLeft: '4px solid #DC2626', paddingLeft: '12px', marginBottom: '28px' }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-0.01em',
              }}
            >
              Upcoming Briefings & Events
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {events.map((evt: any) => (
              <div key={evt.id} style={styles.eventCard}>
                <div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#656e36',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '6px',
                    }}
                  >
                    {new Date(evt.event_date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                  <h3
                    style={{
                      fontSize: '17px',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      margin: 0,
                      lineHeight: '1.4',
                    }}
                  >
                    {evt.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '13.5px',
                      color: '#94A3B8',
                      marginTop: '8px',
                      lineHeight: '1.5',
                      margin: '8px 0 0 0',
                    }}
                  >
                    {evt.description}
                  </p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '14px',
                    borderTop: '1px solid #1E293B',
                    fontSize: '12px',
                    color: '#64748B',
                  }}
                >
                  <span style={{ color: '#94A3B8', fontWeight: '500' }}>
                    📍 {evt.location_city || 'New Delhi'}
                  </span>
                  <span
                    style={{
                      color: evt.registration_open ? '#10B981' : '#EF4444',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {evt.registration_open ? 'OPEN' : 'CLOSED'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
