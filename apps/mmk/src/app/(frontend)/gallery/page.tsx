import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import HomeThemeWrapper from '@/components/layout/HomeThemeWrapper'
import { getCloudinaryUrl } from '@/utils/mediaUrl'

export default async function GalleryIndexPage() {
  const payload = await getPayload({ config: configPromise })

  // Extract all albums that are flagged as public
  const albumsData = await payload.find({
    collection: 'gallery-albums',
    where: {
      visibility: { equals: 'public' },
    },
    sort: '-event_date',
    limit: 40,
  })

  const albums = albumsData.docs || []

  return (
    <HomeThemeWrapper breakingNewsTrack={null} trendingNavTrack={null}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 24px 80px' }}>
        {/* Header Indicator */}
        <div style={{ borderLeft: '4px solid var(--accent-color, #656e36)', paddingLeft: '14px', marginBottom: '12px' }}>
          <span
            style={{
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 700,
            }}
            className="themed-sub-text"
          >
            Visual Archives Registry
          </span>
        </div>
        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 800,
            margin: '0 0 36px 0',
            fontFamily: '"Playfair Display", Georgia, serif',
            color: 'var(--text-color, #E2E8F0)',
          }}
        >
          Photo Gallery & Visual Archives
        </h1>

        {/* Album Grids Matrix */}
        {albums.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {albums.map((album: any) => (
              <Link
                key={album.id}
                href={`/gallery/${album.slug}`}
                className="editorial-card-item"
                style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  color: 'inherit',
                  backgroundColor: 'var(--card-bg, #0F1526)',
                  border: '1px solid var(--border-color, #1E293B)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease',
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '16/10', width: '100%', backgroundColor: '#000' }}>
                  <Image
                    src={getCloudinaryUrl(album.cover_photo)}
                    alt={album.name || 'Album Cover'}
                    fill
                    unoptimized
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div
                  style={{
                    padding: '20px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '11px', color: '#D97706', fontWeight: 700, textTransform: 'uppercase' }}>
                      {album.event_date
                        ? new Date(album.event_date).toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric',
                          })
                        : 'Archive Record'}
                    </span>
                    <h3
                      style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        margin: '6px 0 8px',
                        color: 'var(--text-color, #E2E8F0)',
                        lineHeight: '1.3',
                      }}
                    >
                      {album.name}
                    </h3>
                    <p
                      style={{ fontSize: '13.5px', margin: 0, lineHeight: '1.5', color: 'var(--muted-text, #94A3B8)' }}
                    >
                      {album.description}
                    </p>
                  </div>
                  <div
                    style={{
                      paddingTop: '16px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: 'var(--accent-color, #656e36)',
                    }}
                  >
                    View Photos Collection →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="themed-sub-text">No active photographic galleries indexed.</p>
        )}
      </div>
    </HomeThemeWrapper>
  )
}
