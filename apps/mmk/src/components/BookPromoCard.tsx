import React from 'react'
import Image from 'next/image'
import { BookOpen, ExternalLink, ShoppingBag, Award } from 'lucide-react'
import { getCloudinaryUrl } from '@/utils/mediaUrl'

interface BookPromoProps {
  data?: {
    enabled?: boolean | null
    title?: string | null
    description?: string | null
    cover_image?: any
    custom_cover_url?: string | null
    affiliate_url?: string | null
    cta_text?: string | null
    disclosure?: string | null
  } | null
}

export default function BookPromoCard({ data }: BookPromoProps) {
  // If explicitly disabled in admin settings, do not render
  if (data?.enabled === false) return null

  const title = data?.title || 'Operation Sindoor – The Untold Story'
  const description =
    data?.description || 'Read the untold story behind Operation Sindoor.'
  const affiliateUrl = data?.affiliate_url || 'https://www.amazon.in/'
  const ctaText = data?.cta_text || 'Buy the Book'
  const disclosure = data?.disclosure || 'Purchase through our affiliate link.'

  // Image resolution priority: uploaded media -> custom URL -> high quality military hardcover fallback
  const uploadedImage = data?.cover_image ? getCloudinaryUrl(data.cover_image, 'book-cover') : null
  const coverImageUrl =
    uploadedImage ||
    (data?.custom_cover_url ? getCloudinaryUrl(data.custom_cover_url, 'book-cover') : getCloudinaryUrl(null, 'book-cover'))

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
              backgroundColor: '#656e36',
              color: '#FFFFFF',
              fontSize: '10px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '3px 8px',
              borderRadius: '2px',
            }}
          >
            <BookOpen size={11} />
            Featured Book
          </span>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#D97706',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            Bestseller
          </span>
        </div>
        <span
          style={{
            fontSize: '10px',
            color: 'var(--muted-text, #94A3B8)',
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          <Award size={11} color="#D97706" />
          Official Release
        </span>
      </div>

      <div style={{ padding: '18px 16px' }}>
        {/* Book Cover and Title Layout */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '14px', alignItems: 'flex-start' }}>
          {/* Prominent Book Cover Visual (3D Hardcover depth effect) */}
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'relative',
              width: '105px',
              height: '148px',
              flexShrink: 0,
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: '0 8px 18px rgba(0,0,0,0.35), 0 2px 4px rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.12)',
              display: 'block',
              transition: 'transform 0.25s ease',
              backgroundColor: '#0F172A',
              color: 'transparent',
              textDecoration: 'none',
            }}
            className="group"
          >
            <Image
              src={coverImageUrl}
              alt={title}
              fill
              unoptimized
              sizes="110px"
              style={{ objectFit: 'cover' }}
            />
            {/* Spine Book Sheen Overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: '6px',
                background: 'linear-gradient(to right, rgba(255,255,255,0.25), rgba(0,0,0,0.25))',
                zIndex: 2,
              }}
            />
          </a>

          {/* Book Info Column */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <h3
                style={{
                  fontSize: '17px',
                  fontWeight: 800,
                  lineHeight: '1.3',
                  margin: '0 0 6px 0',
                  color: 'var(--heading-color, #FFFFFF)',
                  fontFamily: '"Playfair Display", Georgia, serif',
                }}
              >
                {title}
              </h3>
            </a>
            <p
              className="themed-sub-text"
              style={{
                fontSize: '12.5px',
                lineHeight: '1.5',
                margin: '0 0 8px 0',
                color: 'var(--muted-text, #94A3B8)',
              }}
            >
              {description}
            </p>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#656e36',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              Hardcover • Kindle • Audiobook
            </span>
          </div>
        </div>

        {/* Clear CTA Button */}
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            padding: '11px 16px',
            backgroundColor: '#D97706',
            color: '#FFFFFF',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '13.5px',
            borderRadius: '4px',
            letterSpacing: '0.02em',
            transition: 'opacity 0.2s ease, transform 0.15s ease',
            boxShadow: '0 2px 6px rgba(217, 119, 6, 0.25)',
          }}
          className="hover:opacity-90 hover:-translate-y-0.5"
        >
          <ShoppingBag size={15} />
          <span>{ctaText}</span>
          <ExternalLink size={13} style={{ opacity: 0.85 }} />
        </a>

        {/* Small Affiliate Disclosure */}
        <p
          style={{
            margin: '8px 0 0 0',
            fontSize: '10.5px',
            textAlign: 'center',
            color: 'var(--muted-text, #64748B)',
            fontStyle: 'italic',
            letterSpacing: '0.01em',
          }}
        >
          {disclosure}
        </p>
      </div>
    </div>
  )
}
