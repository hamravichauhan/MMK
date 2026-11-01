import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft, Calendar } from 'lucide-react'
import HomeThemeWrapper from '@/components/layout/HomeThemeWrapper'
import GalleryLightbox from '@/components/GalleryLightbox'
import { getCloudinaryUrl } from '@/utils/mediaUrl'

interface SingleAlbumPageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateMetadata({ params }: SingleAlbumPageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const albumResult = await payload.find({
    collection: 'gallery-albums',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const album = albumResult.docs[0]
  if (!album) {
    return { title: 'Photo Album Not Found' }
  }

  const imageUrl = getCloudinaryUrl(album.cover_photo, 'summit-conclave')
  const description = album.description || `Photo album archives: ${album.name}.`

  return {
    title: `${album.name} | Strategic Gallery`,
    description,
    openGraph: {
      title: album.name,
      description,
      images: [imageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: album.name,
      description,
      images: [imageUrl],
    },
  }
}

export default async function SingleAlbumPage({ params }: SingleAlbumPageProps) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  // 1. Locate current request target album configuration doc entry
  const albumResult = await payload.find({
    collection: 'gallery-albums',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const album = albumResult.docs[0]
  if (!album) return notFound()

  // 2. Fetch photos cross-relational logs referencing this album entry
  const photosResult = await payload.find({
    collection: 'gallery-photos',
    where: {
      album: { equals: album.id },
    },
    sort: 'sort_order',
    limit: 100,
    depth: 1,
  })

  const rawPhotos = photosResult.docs || []
  const photos = rawPhotos.map((p: any) => ({
    id: p.id,
    url: getCloudinaryUrl(p.media_id || p.media),
    caption: p.caption,
  }))

  return (
    <HomeThemeWrapper breakingNewsTrack={null} trendingNavTrack={null}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px 80px' }}>
        {/* Breadcrumb Context Navigation Header */}
        <div style={{ marginBottom: '24px' }}>
          <Link
            href="/gallery"
            style={{
              fontSize: '13.5px',
              textDecoration: 'none',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--accent-color, #656E36)',
            }}
          >
            <ArrowLeft size={16} /> Back to Visual Archives
          </Link>
        </div>

        {/* Album Branding Metadata Title Block */}
        <div
          style={{
            borderLeft: '4px solid var(--accent-color, #656e36)',
            paddingLeft: '14px',
            marginBottom: '36px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Calendar size={14} color="var(--muted-text, #64748B)" />
            <span
              style={{
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 700,
                color: 'var(--muted-text, #64748B)',
              }}
            >
              {album.event_date
                ? new Date(album.event_date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Archive Collection'}
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 38px)',
              fontWeight: 800,
              margin: '4px 0 8px 0',
              fontFamily: '"Playfair Display", Georgia, serif',
              color: 'var(--text-color, #E2E8F0)',
            }}
          >
            {album.name}
          </h1>

          {album.description && (
            <p
              style={{
                fontSize: '15.5px',
                margin: 0,
                lineHeight: '1.6',
                maxWidth: '850px',
                color: 'var(--muted-text, #94A3B8)',
              }}
            >
              {album.description}
            </p>
          )}
        </div>

        {/* Fluid Mosaic Photograph Photo Deck Grid with Lightbox */}
        <GalleryLightbox photos={photos} />
      </div>
    </HomeThemeWrapper>
  )
}
