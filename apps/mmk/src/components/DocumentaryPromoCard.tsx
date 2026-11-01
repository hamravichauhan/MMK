'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Play, ExternalLink, Film, X } from 'lucide-react'
import { getCloudinaryUrl } from '@/utils/mediaUrl'

interface DocumentaryPromoProps {
  data?: {
    enabled?: boolean | null
    title?: string | null
    subtitle?: string | null
    description?: string | null
    thumbnail_image?: any
    custom_thumbnail_url?: string | null
    trailer_youtube_id?: string | null
    youtube_url?: string | null
    cta_text?: string | null
    episode_info?: string | null
  } | null
}

export default function DocumentaryPromoCard({ data }: DocumentaryPromoProps) {
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false)

  // If explicitly disabled in admin settings, do not render
  if (data?.enabled === false) return null

  const title = data?.title || 'Making The Unbreakable'
  const subtitle =
    data?.subtitle || "India's 1st Digital Series on the Indian Army"
  const description =
    data?.description ||
    "An exclusive landmark digital series documenting the courage, operational grit, and tactical mastery of the Indian Armed Forces."
  const youtubeUrl =
    data?.youtube_url || 'https://www.youtube.com/@MajorMadhanKumar'
  const trailerVideoId = data?.trailer_youtube_id || 'dQw4w9WgXcQ'
  const ctaText = data?.cta_text || 'Watch Documentary'
  const episodeInfo = data?.episode_info || 'Episode 1 • Streaming on YouTube'

  const uploadedThumbnail = data?.thumbnail_image ? getCloudinaryUrl(data.thumbnail_image, 'documentary-poster') : null
  const posterUrl =
    uploadedThumbnail ||
    (data?.custom_thumbnail_url ? getCloudinaryUrl(data.custom_thumbnail_url, 'documentary-poster') : getCloudinaryUrl(null, 'documentary-poster'))

  return (
    <div className="editorial-card-item overflow-hidden rounded-lg">
      {/* Top Banner Category Header */}
      <div
        style={{
          borderBottom: '1px solid var(--border-color, #1E293B)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: '#DC2626',
              color: '#FFFFFF',
              fontSize: '10px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '3px 8px',
              borderRadius: '2px',
            }}
          >
            <Film size={11} />
            Documentary
          </span>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#DC2626',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            Original Series
          </span>
        </div>

        <span
          style={{
            fontSize: '10.5px',
            color: 'var(--muted-text, #94A3B8)',
            fontWeight: 600,
          }}
        >
          {episodeInfo}
        </span>
      </div>

      {/* Media Window: Either Poster with Trailer Trigger OR Inline 1.3m Trailer Player */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          backgroundColor: '#000000',
          overflow: 'hidden',
        }}
      >
        {isPlayingTrailer ? (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <iframe
              src={`https://www.youtube.com/embed/${trailerVideoId}?autoplay=1&rel=0&modestbranding=1`}
              title="Making The Unbreakable — Official Teaser Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                width: '100%',
                height: '100%',
                border: 0,
              }}
            />
            {/* Close Trailer Button */}
            <button
              onClick={() => setIsPlayingTrailer(false)}
              aria-label="Close trailer"
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                zIndex: 10,
                backgroundColor: 'rgba(0,0,0,0.75)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={15} />
            </button>
          </div>
        ) : (
          <div
            style={{ position: 'relative', width: '100%', height: '100%', cursor: 'pointer' }}
            onClick={() => setIsPlayingTrailer(true)}
            className="group"
          >
            <Image
              src={posterUrl}
              alt={title}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: 'cover' }}
            />
            {/* Dark gradient overlay for contrast */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.4) 100%)',
              }}
            />

            {/* Subtitle Ribbon Over Thumbnail */}
            <div
              style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                right: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  backdropFilter: 'blur(4px)',
                  color: '#FFFFFF',
                  fontSize: '9.5px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '3px 8px',
                  borderRadius: '2px',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                {subtitle}
              </span>
            </div>

            {/* Play Button Overlay with Pulse */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(220, 38, 38, 0.6)',
                  transition: 'transform 0.2s ease',
                }}
              >
                <Play size={22} fill="#FFFFFF" style={{ marginLeft: '3px' }} />
              </div>
              <span
                style={{
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                Play Trailer (1.3m)
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content Narrative Box */}
      <div style={{ padding: '16px' }}>
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 800,
            lineHeight: '1.3',
            margin: '0 0 6px 0',
            color: 'var(--heading-color, #FFFFFF)',
            fontFamily: '"Playfair Display", Georgia, serif',
          }}
        >
          {title}
        </h3>

        <p
          className="themed-sub-text"
          style={{
            fontSize: '12.5px',
            lineHeight: '1.5',
            margin: '0 0 14px 0',
            color: 'var(--muted-text, #94A3B8)',
          }}
        >
          {description}
        </p>

        {/* Watch Documentary YouTube CTA Button */}
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            padding: '11px 16px',
            backgroundColor: '#DC2626',
            color: '#FFFFFF',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '13.5px',
            borderRadius: '4px',
            letterSpacing: '0.02em',
            transition: 'opacity 0.2s ease, transform 0.15s ease',
            boxShadow: '0 2px 8px rgba(220, 38, 38, 0.25)',
          }}
          className="hover:opacity-90 hover:-translate-y-0.5"
        >
          {/* YouTube Triangle Icon SVG */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ display: 'inline-block' }}
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          <span>{ctaText}</span>
          <ExternalLink size={13} style={{ opacity: 0.85 }} />
        </a>
      </div>
    </div>
  )
}
