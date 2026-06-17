import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { notFound } from 'next/navigation'
import type { Media, ArticleTag, Video, Article } from '@/payload-types'
import Link from 'next/link'
import { Play, ArrowLeft, Calendar, FileText, Film } from 'lucide-react'

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
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#fcfcfc',
        padding: '40px 0',
        fontFamily: '"Inter", system-ui, sans-serif',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
        {/* Back Link Anchor Navigation */}
        <Link
          href="/videos"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#4B5320',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '24px',
          }}
        >
          <ArrowLeft size={16} /> Back to Video Hub
        </Link>

        {/* 📺 MAIN THEATRE FRAME AND CONTENT DISPLAY CARD */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.03)',
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
              borderRadius: '10px',
              backgroundColor: '#000',
              marginBottom: '28px',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
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
                fontWeight: '700',
                padding: '5px 12px',
                borderRadius: '4px',
                backgroundColor: '#4B5320',
                color: '#ffffff',
                letterSpacing: '0.5px',
              }}
            >
              {video.category}
            </span>
            <span
              style={{
                fontSize: '13px',
                color: '#16a34a',
                fontWeight: '600',
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
                  backgroundColor: '#16a34a',
                }}
              ></span>
              Intelligence Briefing
            </span>
          </div>

          {/* Dynamic Title and Description */}
          <h1
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '32px',
              fontWeight: '800',
              color: '#0B1D3A',
              margin: '0 0 16px 0',
              lineHeight: '1.3',
            }}
          >
            {video.title}
          </h1>

          <p
            style={{
              color: '#334155',
              fontSize: '16px',
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
                pt: '16px',
                borderTop: '1px solid #f1f5f9',
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

        {/* 📄 BOX BLOCK I: CROSS-SUGGESTED INTEL DOCUMENTS (READING GUIDE) */}
        {crossArticles.length > 0 && (
          <section
            style={{ borderTop: '1px solid #e2e8f0', paddingTop: '40px', marginBottom: '56px' }}
          >
            <h3
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '24px',
                fontWeight: '700',
                color: '#0B1D3A',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <FileText size={22} style={{ color: '#4B5320' }} /> Related Tactical Briefing Papers
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {crossArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      gap: '20px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #f1f5f9',
                      borderRadius: '10px',
                      padding: '16px',
                      alignItems: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.01)',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        color: '#0B1D3A',
                        width: '44px',
                        height: '44px',
                        borderRadius: '8px',
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
                          fontSize: '16px',
                          fontWeight: '700',
                          color: '#0B1D3A',
                        }}
                      >
                        {article.title}
                      </h4>
                      <p
                        style={{
                          margin: 0,
                          fontSize: '13px',
                          color: '#64748b',
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
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#4B5320',
                        paddingRight: '8px',
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
          <section style={{ borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
            <h3
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '24px',
                fontWeight: '700',
                color: '#0B1D3A',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Film size={22} style={{ color: '#4B5320' }} /> Recommended Video Broadcasts
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '24px',
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
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #f1f5f9',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)',
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
                            backgroundColor: 'rgba(11, 29, 58, 0.85)',
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
                            top: '12px',
                            left: '12px',
                            backgroundColor: '#4B5320',
                            color: '#ffffff',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            padding: '3px 8px',
                            borderRadius: '4px',
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
                            fontWeight: '700',
                            color: '#0B1D3A',
                            margin: '0 0 6px 0',
                            lineHeight: '1.4',
                          }}
                        >
                          {relVideo.title}
                        </h4>
                        <p
                          style={{
                            color: '#64748b',
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
      </div>
    </main>
  )
}
