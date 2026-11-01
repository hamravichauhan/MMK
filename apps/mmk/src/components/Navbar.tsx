import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import Link from 'next/link'
import type { Media } from '@/payload-types'
import { format } from 'date-fns'
import getCloudinaryUrl from '@/utils/mediaUrl'

export const revalidate = 0

export default async function ArticlesListPage() {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'articles',
    depth: 1,
    sort: '-published_at',
  })

  const articles = result.docs
  const categories = ['All', 'India', 'China', 'Pakistan', 'Technology']

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
      {/* 1. HERO BANNER (Using your exact Navy identity brand color #0B1D3A) */}
      <section style={{ backgroundColor: '#0B1D3A', color: 'white', padding: '64px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: '46px',
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 'bold',
              margin: '0 0 16px 0',
              letterSpacing: '-0.5px',
              color: '#ffffff',
            }}
          >
            Geopolitical Analysis
          </h1>
          <p
            style={{
              color: '#cbd5e1',
              fontSize: '18px',
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

      {/* Main Container Scope */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        {/* 2. FILTER TAG BAR CONTROLS */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
            borderBottom: '1px solid #f1f5f9',
            paddingBottom: '24px',
          }}
        >
          <span
            style={{
              color: '#94a3b8',
              fontSize: '14px',
              fontWeight: '500',
              marginRight: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            Filter:
          </span>
          {categories.map((cat, idx) => (
            <button
              key={cat}
              style={{
                padding: '8px 20px',
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '9999px',
                border: '1px solid #e2e8f0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                // First pill defaults seamlessly to your olive drab brand color (#4B5320)
                backgroundColor: idx === 0 ? '#4B5320' : '#ffffff',
                color: idx === 0 ? '#ffffff' : '#475569',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Total Item Count display text */}
        <div
          style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px', fontWeight: '500' }}
        >
          Showing {articles.length} articles
        </div>

        {/* 3. RESPONSIVE CARD COLUMNS GRID */}
        {articles.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 0',
              border: '1px dashed #e2e8f0',
              borderRadius: '16px',
              color: '#94a3b8',
            }}
          >
            No analytical papers published yet.
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '32px',
            }}
          >
            {articles.map((article) => {
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
                    {/* Media Thumbnail Container Box */}
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
                        src={getCloudinaryUrl(image, 'drone-shield')}
                        alt={image?.alt || article.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />

                      {/* Bold Red Category Tag Badge Overlay */}
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
                    </div>

                    {/* Card Content Description Box */}
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
                        Exploring structural configurations, localized developments, and strategic
                        implementations within regional perimeters.
                      </p>

                      {/* Card Metadata Footer row */}
                      <div
                        style={{
                          marginTop: 'auto',
                          paddingTop: '16px',
                          borderTop: '1px solid #f8fafc',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '13px',
                          color: '#94a3b8',
                          fontWeight: '500',
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
