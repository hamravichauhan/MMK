import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { notFound } from 'next/navigation'
import type { ArticleTag, Video, Article } from '@/payload-types'
import Link from 'next/link'
import { Play, ArrowLeft, FileText, Film } from 'lucide-react'
import HomeThemeWrapper from '@/components/layout/HomeThemeWrapper'

interface PageProps {
  params: Promise<{ youtube_id: string }>
}

export default async function WatchVideoPage({ params }: PageProps) {
  const { youtube_id } = await params
  const payload = await getPayload({ config: configPromise })

  // 1. Fetch the primary active video entry (Depth 1 resolves tags)
  const result = await payload.find({
    collection: 'videos',
    where: {
      youtube_id: { equals: youtube_id },
      status: { equals: 'published' },
    },
    depth: 1,
    limit: 1,
  })

  const video = result.docs[0] as Video
  if (!video) return notFound()

  // Extract current video tag IDs safely to feed recommendation queries
  const currentTagIds = video.tags ? video.tags.map((t) => (typeof t === 'object' ? t.id : t)) : []

  // 🧠 2. ENGINE A: FETCH RELATED VIDEOS (Matching Tags -> Category Fallback)
  let relatedVideos: Video[] = []
  if (currentTagIds.length > 0) {
    const videoTagMatch = await payload.find({
      collection: 'videos',
      where: {
        and: [
          { youtube_id: { not_equals: youtube_id } },
          { status: { equals: 'published' } },
          { tags: { in: currentTagIds } },
        ],
      },
      limit: 3,
      depth: 1,
    })
    relatedVideos = videoTagMatch.docs as Video[]
  }

  if (relatedVideos.length === 0) {
    const videoCatMatch = await payload.find({
      collection: 'videos',
      where: {
        and: [
          { youtube_id: { not_equals: youtube_id } },
          { status: { equals: 'published' } },
          { category: { equals: video.category } },
        ],
      },
      limit: 3,
      depth: 1,
    })
    relatedVideos = videoCatMatch.docs as Video[]
  }

  // 📄 3. ENGINE B: CROSS-SUGGESTED ARTICLES (Find briefing papers sharing the same tags)
  let crossArticles: Article[] = []
  if (currentTagIds.length > 0) {
    const articleCrossMatch = await payload.find({
      collection: 'articles',
      where: {
        and: [{ status: { equals: 'published' } }, { tags: { in: currentTagIds } }],
      },
      limit: 2,
      depth: 1,
    })
    crossArticles = articleCrossMatch.docs as Article[]
  }

  return (
    <HomeThemeWrapper breakingNewsTrack={null} trendingNavTrack={null}>
      <main
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '40px 24px 80px',
        }}
      >
        {/* Back Link Anchor Navigation */}
        <Link
          href="/videos"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--accent-color, #656E36)',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 600,
            marginBottom: '24px',
          }}
        >
          <ArrowLeft size={16} /> Back to Video Hub
        </Link>

        {/* 📺 MAIN THEATRE FRAME AND CONTENT DISPLAY CARD */}
        <div
          style={{
            backgroundColor: 'var(--card-bg, #0F1526)',
            border: '1px solid var(--border-color, #1E293B)',
            borderRadius: '12px',
            padding: '28px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            marginBottom: '48px',
          }}
        >
          {/* Responsive 16:9 Aspect Video Player Viewport */}
          <div
            style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: 0,
              overflow: 'hidden',
              borderRadius: '8px',
              backgroundColor: '#000',
              marginBottom: '24px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${video.youtube_id}?autoplay=1&rel=0`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            />
          </div>

          {/* Core Metadata Alignment Layer */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <span
              style={{
                textTransform: 'uppercase',
                fontSize: '11px',
                fontWeight: 700,
                padding: '5px 12px',
                borderRadius: '4px',
                backgroundColor: 'rgba(101, 110, 54, 0.15)',
                border: '1px solid var(--accent-color, #656E36)',
                color: 'var(--accent-color, #656E36)',
                letterSpacing: '0.05em',
              }}
            >
              {video.category}
            </span>
            <span
              style={{
                fontSize: '13px',
                color: '#22c55e',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#22c55e',
                }}
              />
              Intelligence Briefing
            </span>
          </div>

          {/* Dynamic Title and Description */}
          <h1
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(24px, 3.5vw, 32px)',
              fontWeight: 800,
              color: 'var(--text-color, #E2E8F0)',
              margin: '0 0 16px 0',
              lineHeight: '1.3',
            }}
          >
            {video.title}
          </h1>

          <p
            style={{
              color: 'var(--muted-text, #94A3B8)',
              fontSize: '15.5px',
              lineHeight: '1.7',
              margin: '0 0 24px 0',
              whiteSpace: 'pre-line',
            }}
          >
            {video.description}
          </p>

          {/* Keyword Pill Cloud Rails */}
          {video.tags && video.tags.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                borderTop: '1px solid var(--border-color, #1E293B)',
                paddingTop: '16px',
              }}
            >
              {video.tags.map((tRelation) => {
                const tag = tRelation as ArticleTag
                return (
                  <span
                    key={tag.id}
                    style={{
                      fontSize: '12px',
                      color: 'var(--muted-text, #64748B)',
                      backgroundColor: 'var(--subtle-bg, #090D1A)',
                      border: '1px solid var(--border-color, #1E293B)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontWeight: 500,
                    }}
                  >
                    #{tag.name}
                  </span>
                )
              })}
            </div>
          )}
        </div>

        {/* 📄 BOX BLOCK I: CROSS-SUGGESTED INTEL DOCUMENTS */}
        {crossArticles.length > 0 && (
          <section
            style={{
              borderTop: '1px solid var(--border-color, #1E293B)',
              paddingTop: '36px',
              marginBottom: '48px',
            }}
          >
            <h3
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '22px',
                fontWeight: 700,
                color: 'var(--text-color, #E2E8F0)',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <FileText size={20} color="var(--accent-color, #656E36)" /> Related Tactical Briefing Papers
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {crossArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div
                    className="editorial-card-item"
                    style={{
                      display: 'flex',
                      gap: '16px',
                      backgroundColor: 'var(--card-bg, #0F1526)',
                      border: '1px solid var(--border-color, #1E293B)',
                      borderRadius: '8px',
                      padding: '16px',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--subtle-bg, #090D1A)',
                        border: '1px solid var(--border-color, #1E293B)',
                        color: 'var(--accent-color, #656E36)',
                        width: '42px',
                        height: '42px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <FileText size={20} />
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <h4
                        style={{
                          margin: '0 0 4px 0',
                          fontSize: '15.5px',
                          fontWeight: 700,
                          color: 'var(--text-color, #E2E8F0)',
                        }}
                      >
                        {article.title}
                      </h4>
                      <p
                        style={{
                          margin: 0,
                          fontSize: '13px',
                          color: 'var(--muted-text, #64748B)',
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {article.excerpt}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: 'var(--accent-color, #656E36)',
                        paddingRight: '8px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Read Paper ➔
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 🎬 BOX BLOCK II: RELATED VIDEOS GRID */}
        {relatedVideos.length > 0 && (
          <section
            style={{
              borderTop: '1px solid var(--border-color, #1E293B)',
              paddingTop: '36px',
            }}
          >
            <h3
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '22px',
                fontWeight: 700,
                color: 'var(--text-color, #E2E8F0)',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Film size={20} color="var(--accent-color, #656E36)" /> Recommended Video Broadcasts
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '20px',
              }}
            >
              {relatedVideos.map((relVideo) => {
                const relThumbnail = `https://img.youtube.com/vi/${relVideo.youtube_id}/hqdefault.jpg`

                return (
                  <Link
                    key={relVideo.id}
                    href={`/videos/${relVideo.youtube_id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div
                      className="video-card-item"
                      style={{
                        backgroundColor: 'var(--card-bg, #0F1526)',
                        border: '1px solid var(--border-color, #1E293B)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        cursor: 'pointer',
                      }}
                    >
                      {/* Video Thumbnail Wrap */}
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          height: '150px',
                          backgroundColor: '#000',
                        }}
                      >
                        <img
                          src={relThumbnail}
                          alt={relVideo.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 0.9,
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                          }}
                        >
                          <Play size={14} fill="#ffffff" style={{ marginLeft: '1px' }} />
                        </div>
                        <span
                          style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            backgroundColor: 'var(--accent-color, #656E36)',
                            color: '#ffffff',
                            fontSize: '10px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            padding: '3px 8px',
                            borderRadius: '3px',
                          }}
                        >
                          {relVideo.category}
                        </span>
                      </div>

                      {/* Video Text Content Area */}
                      <div style={{ padding: '16px', flexGrow: 1 }}>
                        <h4
                          style={{
                            fontFamily: '"Playfair Display", Georgia, serif',
                            fontSize: '15px',
                            fontWeight: 700,
                            color: 'var(--text-color, #E2E8F0)',
                            margin: '0 0 6px 0',
                            lineHeight: '1.4',
                          }}
                        >
                          {relVideo.title}
                        </h4>
                        <p
                          style={{
                            color: 'var(--muted-text, #64748B)',
                            fontSize: '12.5px',
                            margin: 0,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: '1.5',
                          }}
                        >
                          {relVideo.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </main>
    </HomeThemeWrapper>
  )
}
