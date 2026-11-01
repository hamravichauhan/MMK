import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react'
import { getCloudinaryUrl } from '@/utils/mediaUrl'

interface MerchandisePromoProps {
  featuredProduct?: {
    title?: string
    price?: number
    description?: string
    image?: any
  } | null
}

export default function MerchandisePromoCard({ featuredProduct }: MerchandisePromoProps) {
  const fallbackImage =
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600'
  const imageUrl = featuredProduct?.image
    ? getCloudinaryUrl(featuredProduct.image) || fallbackImage
    : fallbackImage

  const title = featuredProduct?.title || 'MMK Official Tactical Apparel & Gear'
  const price = featuredProduct?.price ?? 999
  const description =
    featuredProduct?.description ||
    'Wear the spirit of national pride. Explore official tactical caps, tees, and commemorative accessories.'

  return (
    <div className="editorial-card-item overflow-hidden rounded-lg">
      {/* Header Bar */}
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
            <ShoppingBag size={11} />
            MMK Store
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
            Official Gear
          </span>
        </div>

        <span
          style={{
            fontSize: '10.5px',
            color: 'var(--muted-text, #94A3B8)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontWeight: 600,
          }}
        >
          <ShieldCheck size={12} color="#656e36" />
          Verified Store
        </span>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Product Visual Container */}
        <Link
          href="/merchandise"
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/10',
            borderRadius: '4px',
            overflow: 'hidden',
            display: 'block',
            marginBottom: '12px',
            border: '1px solid var(--border-color, #1E293B)',
            backgroundColor: 'var(--card-bg, #0F1526)',
          }}
          className="group"
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 400px"
            style={{ objectFit: 'cover' }}
          />

          {/* Price Badge */}
          {typeof price === 'number' && (
            <span
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: '#656e36',
                color: '#FFFFFF',
                padding: '4px 10px',
                fontSize: '12px',
                fontWeight: 800,
                borderRadius: '2px',
                letterSpacing: '0.02em',
                boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Tag size={11} />
              ₹{price.toLocaleString('en-IN')}
            </span>
          )}
        </Link>

        {/* Product Title and Description */}
        <Link
          href="/merchandise"
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
        </Link>

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

        {/* CTA: Explore MMK Store */}
        <Link
          href="/merchandise"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            padding: '11px 16px',
            backgroundColor: 'var(--button-bg, #656e36)',
            color: '#FFFFFF',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '13.5px',
            borderRadius: '4px',
            letterSpacing: '0.02em',
            transition: 'opacity 0.2s ease, transform 0.15s ease',
          }}
          className="hover:opacity-90 hover:-translate-y-0.5"
        >
          <span>Explore MMK Store</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
