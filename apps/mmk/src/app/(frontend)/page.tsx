import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import NewsCarousel from '@/components/NewsCarousel'
import SpecialArticlesCard from '@/components/SpecialArticlesCard'
import MerchandisePromoCard from '@/components/MerchandisePromoCard'
import BookPromoCard from '@/components/BookPromoCard'
import DocumentaryPromoCard from '@/components/DocumentaryPromoCard'
import Link from 'next/link'
import Image from 'next/image'
import HomeThemeWrapper from '@/components/layout/HomeThemeWrapper'
import { getCloudinaryUrl } from '@/utils/mediaUrl'
const getRichTextSnippet = (richTextObj: any, maxLength = 160) => {
  if (!richTextObj) return ''
  try {
    let text = ''
    if (richTextObj.root && Array.isArray(richTextObj.root.children)) {
      richTextObj.root.children.forEach((child: any) => {
        if (child.children && Array.isArray(child.children)) {
          child.children.forEach((node: any) => {
            if (node.text) text += node.text + ' '
          })
        }
      })
    }
    text = text.trim()
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...'
    }
    return text || 'View full briefing specifications inside event matrix ledger.'
  } catch (_e) {
    return 'View full briefing specifications inside event matrix ledger.'
  }
}

export const revalidate = 60

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  // Parallel database extraction tier fetching across all system schemas
  const [articlesData, videosData, eventsData, soldiersData, tagsData, merchData, siteSettings] =
    await Promise.all([
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
      // 👕 Merchandise featured item query
      payload.find({
        collection: 'merchandise' as any,
        where: {
          and: [{ status: { equals: 'published' } }, { is_featured: { equals: true } }],
        },
        depth: 1,
        limit: 1,
      }),
      payload.findGlobal({
        slug: 'site-settings',
      }),
    ])

  const articles = articlesData.docs || []
  const videos = videosData.docs || []
  const events = eventsData.docs || []
  const soldiers = soldiersData.docs || []
  const tags = tagsData.docs || []
  const featuredMerch = (merchData as any)?.docs?.[0] || null

  const breakingArticles = articles.filter((art: any) => art.is_breaking)
  const featuredArticle = articles.find((art: any) => art.is_featured) || articles[0]
  const secondaryBriefings = articles
    .filter((art: any) => art.id !== featuredArticle?.id)
    .slice(0, 5)

  // 1. Breaking news track
  const breakingNewsTrackNode =
    breakingArticles.length > 0 ? (
      <section key="breaking-news-track">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <NewsCarousel items={breakingArticles} />
        </div>
      </section>
    ) : null

  // 2. Trending nav track
  const trendingNavTrackNode =
    tags.length > 0 ? (
      <nav
        key="trending-nav-track"
        style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}
      >
        <div
          style={
            {
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              overflowX: 'auto',
              padding: '16px 0 14px 0',
              scrollbarWidth: 'none',
            } as React.CSSProperties
          }
        >
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: 'var(--muted-text, #64748B)',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              letterSpacing: '0.08em',
              marginRight: '6px',
            }}
          >
            Trending:
          </span>
          {tags.map((tag: any) => (
            <Link
              key={tag.id}
              href={`/articles?tag=${tag.slug}`}
              className="dynamic-theme-tag-badge"
              style={{
                fontSize: '11px',
                fontWeight: '600',
                padding: '5px 12px',
                borderRadius: '4px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                letterSpacing: '0.03em',
              }}
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </nav>
    ) : null

  return (
    <HomeThemeWrapper
      breakingNewsTrack={breakingNewsTrackNode}
      trendingNavTrack={trendingNavTrackNode}
    >
      {/* 3. ASYMMETRICAL INTEL SPLIT HERO GRID */}
      <section
        className="home-canvas-container"
        style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}
      >
        <div className="editorial-blueprint-grid">
          {/* Left Block: Spotlight Main Column */}
          <div>
            <div
              style={{
                borderLeft: '4px solid #656e36',
                paddingLeft: '12px',
                marginBottom: '4px',
              }}
            >
              <span
                style={{
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  fontWeight: 700,
                  color: 'var(--heading-color, #FFFFFF)',
                }}
              >
                Spotlight Analysis
              </span>
            </div>

            {featuredArticle ? (
              <Link
                href={`/articles/${featuredArticle.slug}`}
                style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}
              >
                <div
                  className="editorial-card-item"
                  style={{
                    position: 'relative',
                    aspectRatio: '16/9',
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: '2px',
                    backgroundColor: 'var(--card-bg, #0F1526)',
                    border: '1px solid var(--border-color, #1E293B)',
                  }}
                >
                  <Image
                    src={getCloudinaryUrl(featuredArticle.featured_image)}
                    alt={featuredArticle.title || 'Spotlight Cover'}
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 992px) 100vw, 66vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      backgroundColor: '#656e36',
                      color: '#FFFFFF',
                      padding: '5px 12px',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      borderRadius: '2px',
                      zIndex: 10,
                    }}
                  >
                    {featuredArticle.category || 'Strategic Threat'}
                  </span>
                </div>
                <h1
                  style={{
                    fontSize: 'clamp(24px, 4vw, 36px)',
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontWeight: 800,
                    color: 'var(--heading-color, #FFFFFF)',
                    lineHeight: '1.2',
                    margin: '12px 0 10px 0',
                    textDecoration: 'none',
                  }}
                >
                  {featuredArticle.title}
                </h1>
                <p
                  className="themed-sub-text"
                  style={{
                    fontSize: '15.5px',
                    lineHeight: '1.6',
                    margin: '0 0 14px 0',
                    color: 'var(--muted-text, #94A3B8)',
                  }}
                >
                  {featuredArticle.excerpt}
                </p>
                <div
                  className="themed-sub-text"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '12px',
                    color: 'var(--muted-text, #64748B)',
                  }}
                >
                  <span style={{ color: 'var(--heading-color, #F8FAFC)', fontWeight: 600 }}>
                    By Major Madhan Kumar
                  </span>
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
              <p className="themed-sub-text">No primary publications indexed.</p>
            )}

            {/* Secondary Tactical Dispatches Grid */}
            {secondaryBriefings.length > 0 && (
              <div style={{ marginTop: '36px' }}>
                <div
                  style={{
                    borderLeft: '4px solid #656e36',
                    paddingLeft: '12px',
                    marginBottom: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontSize: '13px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      fontWeight: 700,
                      color: 'var(--heading-color, #FFFFFF)',
                    }}
                  >
                    Tactical Dispatches & Strategic Intelligence
                  </span>
                  <Link
                    href="/articles"
                    className="themed-sub-text"
                    style={{
                      fontSize: '11px',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontWeight: 600,
                    }}
                  >
                    All Articles →
                  </Link>
                </div>

                <div className="dispatches-2col-grid">
                  {secondaryBriefings.map((art: any) => (
                    <Link
                      key={art.id}
                      href={`/articles/${art.slug}`}
                      className="editorial-card-item"
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        borderRadius: '6px',
                      }}
                    >
                      <div
                        style={{
                          position: 'relative',
                          aspectRatio: '16/10',
                          width: '100%',
                          overflow: 'hidden',
                          backgroundColor: '#090D1A',
                        }}
                      >
                        <Image
                          src={getCloudinaryUrl(art.featured_image)}
                          alt={art.title || 'Dispatch Image'}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 100vw, 320px"
                          style={{ objectFit: 'cover' }}
                        />
                        <span
                          style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            backgroundColor: 'rgba(15, 23, 42, 0.85)',
                            backdropFilter: 'blur(4px)',
                            color: '#F8FAFC',
                            padding: '3px 8px',
                            fontSize: '9.5px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            borderRadius: '3px',
                            border: '1px solid rgba(255,255,255,0.1)',
                          }}
                        >
                          {art.category || 'Intelligence'}
                        </span>
                      </div>
                      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <span
                          className="themed-sub-text"
                          style={{ fontSize: '10.5px', marginBottom: '6px', fontWeight: 600 }}
                        >
                          {new Date(art.published_at || art.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <h3
                          style={{
                            fontSize: '15px',
                            fontWeight: 700,
                            lineHeight: '1.4',
                            margin: '0 0 8px 0',
                            color: 'var(--heading-color, #FFFFFF)',
                          }}
                        >
                          {art.title}
                        </h3>
                        <p
                          className="themed-sub-text"
                          style={{
                            fontSize: '12.5px',
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
                          {art.excerpt}
                        </p>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            color: '#656e36',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            marginTop: 'auto',
                          }}
                        >
                          Read Analysis →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Block: High-Density Sidebar Feed */}
          <div className="briefing-blueprint-side" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* 1. 📖 BUY OPERATION SINDOOR BOOK PROMO CARD */}
            <BookPromoCard data={siteSettings?.book_promo} />

            {/* 2. 🎬 MAKING THE UNBREAKABLE DOCUMENTARY PROMO CARD */}
            <DocumentaryPromoCard data={siteSettings?.doc_promo} />

            {/* 3. 👕 MERCHANDISE PROMO CARD */}
            <MerchandisePromoCard
              featuredProduct={
                featuredMerch
                  ? {
                      title: featuredMerch.title,
                      price: featuredMerch.price,
                      description: featuredMerch.description,
                      image:
                        (Array.isArray(featuredMerch.images) &&
                          featuredMerch.images.length > 0 &&
                          featuredMerch.images[0]) ||
                        featuredMerch.image,
                    }
                  : null
              }
            />

            {/* 4. 📰 SPECIAL ARTICLES CARD (auto-fetched, self-contained) */}
            <SpecialArticlesCard />
          </div>
        </div>
      </section>

      {/* 4. HONOUR DECK: KNOW YOUR SOLDIERS DATABASE */}
      {soldiers.length > 0 && (
        <section
          className="home-canvas-container themed-border-top"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '32px 24px 20px 24px',
            borderTop: '1px solid var(--border-color, rgba(30, 41, 59, 0.8))',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <div style={{ borderLeft: '4px solid #D97706', paddingLeft: '12px' }}>
              <h2
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--heading-color, #FFFFFF)',
                  letterSpacing: '0.05em',
                }}
              >
                Know Your Soldiers
              </h2>
            </div>
            <Link
              href="/soldiers"
              className="themed-sub-text"
              style={{
                fontSize: '11px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'color 0.2s ease',
              }}
            >
              Explore Profiles →
            </Link>
          </div>

          <div className="four-column-grid-layout">
            {soldiers.map((soldier: any) => (
              <Link
                href={`/soldiers/${soldier.slug || soldier.id}`}
                key={soldier.id}
                className="soldier-card-item"
                style={{
                  padding: '10px 14px',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  transition: 'all 0.2s ease',
                  borderRadius: '4px',
                  backgroundColor: 'var(--card-bg, #0F1526)',
                  border: '1px solid var(--border-color, #1E293B)',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '48px',
                    height: '48px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    backgroundColor: '#090D1A',
                    flexShrink: 0,
                    border: '1px solid var(--border-color, rgba(255, 255, 255, 0.05))',
                  }}
                >
                  <Image
                    src={getCloudinaryUrl(soldier.photo || soldier.profile_image)}
                    alt={soldier.full_name || soldier.name || 'Soldier Photo'}
                    fill
                    unoptimized
                    sizes="48px"
                    style={{ objectFit: 'cover', filter: 'grayscale(15%)' }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '10px',
                        color: '#D97706',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {soldier.rank || 'Officer'}
                    </span>
                    {soldier.is_martyr && (
                      <span
                        style={{
                          backgroundColor: '#DC2626',
                          color: '#FFFFFF',
                          fontSize: '8px',
                          fontWeight: 800,
                          padding: '1px 5px',
                          borderRadius: '2px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.02em',
                        }}
                      >
                        Martyr
                      </span>
                    )}
                    {soldier.decorations && (
                      <span
                        style={{
                          fontSize: '10px',
                          color: '#FCD34D',
                          fontWeight: '600',
                        }}
                        title={soldier.decorations}
                      >
                        🏅
                      </span>
                    )}
                  </div>
                  <h3
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: 'var(--heading-color, #FFFFFF)',
                      margin: '2px 0',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    title={soldier.full_name || soldier.name}
                  >
                    {soldier.full_name || soldier.name || 'Unknown Soldier'}
                  </h3>
                  <span
                    className="themed-sub-text"
                    style={{ fontSize: '11px', color: 'var(--muted-text, #64748B)' }}
                  >
                    {soldier.branch || soldier.regiment || 'Indian Army'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 5. MULTIMEDIA SECTION: VIDEO INTELLIGENCE CARD DECK */}
      {videos.length > 0 && (
        <section
          className="themed-border-top themed-border-bottom"
          style={{
            backgroundColor: 'var(--section-bg, #090D1A)',
            borderTop: '1px solid var(--border-color, #1E293B)',
            borderBottom: '1px solid var(--border-color, #1E293B)',
            padding: '56px 0',
            margin: '40px 0',
          }}
        >
          <div
            className="home-canvas-container"
            style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '32px',
              }}
            >
              <div style={{ borderLeft: '4px solid #656e36', paddingLeft: '12px' }}>
                <h2
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'var(--heading-color, #FFFFFF)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Video Intelligence
                </h2>
              </div>
              <Link
                href="/videos"
                className="themed-sub-text"
                style={{
                  fontSize: '12px',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                View All Broadcasts →
              </Link>
            </div>

            <div className="four-column-grid-layout">
              {videos.map((vid: any) => (
                <div
                  key={vid.id}
                  className="video-card-item"
                  style={{
                    padding: '12px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--card-bg, #0F1526)',
                    border: '1px solid var(--border-color, #1E293B)',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '16/9',
                      width: '100%',
                      backgroundColor: '#000000',
                      overflow: 'hidden',
                      borderRadius: '2px',
                    }}
                  >
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
                        backgroundColor: 'var(--tag-bg, #1E293B)',
                        color: 'var(--text-color, #E2E8F0)',
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
                        color: 'var(--heading-color, #FFFFFF)',
                        lineHeight: '1.4',
                      }}
                    >
                      {vid.title || 'Strategic Defense Update'}
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
        <section
          className="home-canvas-container"
          style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px 48px 24px' }}
        >
          <div
            style={{
              borderLeft: '4px solid #DC2626',
              paddingLeft: '12px',
              marginBottom: '28px',
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--heading-color, #FFFFFF)',
                letterSpacing: '-0.01em',
              }}
            >
              Upcoming Briefings & Events
            </h2>
          </div>
          <div className="events-layout-grid">
            {events.map((evt: any) => (
              <div
                key={evt.id}
                className="event-card-item"
                style={{
                  padding: '24px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--card-bg, #0F1526)',
                  border: '1px solid var(--border-color, #1E293B)',
                }}
              >
                <Link
                  href={`/events/${evt.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <div style={{ marginBottom: '20px' }}>
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
                        color: 'var(--heading-color, #FFFFFF)',
                        margin: 0,
                        lineHeight: '1.4',
                      }}
                    >
                      {evt.title}
                    </h3>
                    <p
                      className="themed-sub-text"
                      style={{
                        fontSize: '13.5px',
                        marginTop: '8px',
                        lineHeight: '1.5',
                        color: 'var(--muted-text, #94A3B8)',
                      }}
                    >
                      {getRichTextSnippet(evt.description)}
                    </p>
                  </div>
                </Link>
                <div
                  className="themed-sub-text"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '14px',
                    borderTop: '1px solid var(--border-color, #1E293B)',
                    fontSize: '12px',
                    color: 'var(--muted-text, #64748B)',
                  }}
                >
                  <span style={{ fontWeight: '500' }}>📍 {evt.location_city || 'New Delhi'}</span>
                  {evt.registration_open && evt.registration_url ? (
                    <a
                      href={evt.registration_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#10B981',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        textDecoration: 'none',
                      }}
                    >
                      OPEN ↗
                    </a>
                  ) : (
                    <span
                      style={{
                        color: evt.registration_open ? '#10B981' : '#EF4444',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {evt.registration_open ? 'OPEN' : 'CLOSED'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </HomeThemeWrapper>
  )
}
