import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import HomeThemeWrapper from '@/components/layout/HomeThemeWrapper'
import { getCloudinaryUrl } from '@/utils/mediaUrl'

export const dynamic = 'force-dynamic'

export default async function MerchandisePage() {
  const payload = await getPayload({ config: configPromise })

  // Query merchandise items (using `as any` to prevent build failures until `generate:types` is run)
  const merchandiseData = await payload.find({
    collection: 'merchandise' as any,
    where: {
      status: { equals: 'published' },
    },
    depth: 1,
    sort: '-createdAt',
  })

  const products = merchandiseData?.docs || []

  return (
    <HomeThemeWrapper breakingNewsTrack={null} trendingNavTrack={null}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 24px' }}>
        {/* Header Indicator */}
        <div
          style={{
            borderLeft: '4px solid #656e36',
            paddingLeft: '12px',
            marginBottom: '8px',
          }}
        >
          <span
            style={{
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 700,
            }}
            className="themed-sub-text"
          >
            Official Store Registry
          </span>
        </div>
        <h1
          style={{
            fontSize: '36px',
            fontWeight: 800,
            margin: '0 0 16px 0',
            fontFamily: '"Playfair Display", Georgia, serif',
            color: 'var(--heading-color, #FFFFFF)',
          }}
        >
          MMK Merchandise
        </h1>
        <p
          className="themed-sub-text"
          style={{
            fontSize: '15px',
            lineHeight: '1.6',
            margin: '0 0 40px 0',
            maxWidth: '720px',
          }}
        >
          Wear the spirit of national pride. Explore official apparel, commemorative accessories,
          and gear supporting the platform.
        </p>

        {/* Product Grid Matrix */}
        {products.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {products.map((product: any) => {
              const firstImage =
                Array.isArray(product.images) && product.images.length > 0
                  ? product.images[0]
                  : product.image
              const imageUrl = getCloudinaryUrl(firstImage)
              const inStock = product.in_stock !== false

              return (
                <div
                  key={product.id}
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
                  {/* Image Thumbnail Container */}
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '1/1',
                      width: '100%',
                      backgroundColor: 'var(--section-bg, #090D1A)',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={imageUrl}
                      alt={product.title || 'Merchandise'}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      style={{ objectFit: 'cover' }}
                    />
                    {!inStock && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'rgba(0, 0, 0, 0.6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 2,
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: '#DC2626',
                            color: '#FFFFFF',
                            fontSize: '11px',
                            fontWeight: 800,
                            padding: '6px 14px',
                            borderRadius: '2px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                          }}
                        >
                          Out of Stock
                        </span>
                      </div>
                    )}

                    {/* Price Badge Overlay */}
                    {typeof product.price === 'number' && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          backgroundColor: '#656e36',
                          color: '#FFFFFF',
                          padding: '5px 12px',
                          fontSize: '12px',
                          fontWeight: 800,
                          letterSpacing: '0.02em',
                          borderRadius: '2px',
                          zIndex: 3,
                        }}
                      >
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  {/* Product Content Details */}
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
                      {/* Category / Brand Tag */}
                      <span
                        style={{
                          fontSize: '11px',
                          color: '#D97706',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {product.category || 'Official Gear'}
                      </span>

                      <h3
                        style={{
                          fontSize: '18px',
                          fontWeight: 700,
                          margin: '6px 0',
                          color: 'var(--heading-color, #FFFFFF)',
                          lineHeight: '1.3',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {product.title}
                      </h3>

                      {product.description && (
                        <p
                          className="themed-sub-text"
                          style={{
                            fontSize: '13.5px',
                            margin: '0 0 12px 0',
                            lineHeight: '1.5',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {product.description}
                        </p>
                      )}

                      {/* Available Sizes List */}
                      {product.sizes &&
                        Array.isArray(product.sizes) &&
                        product.sizes.length > 0 && (
                          <div
                            style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: '6px',
                              marginBottom: '16px',
                            }}
                          >
                            {product.sizes.map((size: string, idx: number) => (
                              <span
                                key={idx}
                                style={{
                                  fontSize: '10.5px',
                                  fontWeight: 700,
                                  padding: '3px 9px',
                                  borderRadius: '2px',
                                  letterSpacing: '0.04em',
                                  backgroundColor: 'var(--tag-bg, #1E293B)',
                                  color: 'var(--text-color, #E2E8F0)',
                                  textTransform: 'uppercase',
                                  border: '1px solid var(--border-color, #1E293B)',
                                }}
                              >
                                {size}
                              </span>
                            ))}
                          </div>
                        )}
                    </div>

                    {/* Store Action CTA */}
                    <div style={{ paddingTop: '16px' }}>
                      {product.external_buy_url ? (
                        <a
                          href={product.external_buy_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 14px',
                            borderRadius: '2px',
                            fontSize: '12px',
                            fontWeight: 700,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            textDecoration: 'none',
                            backgroundColor: inStock ? '#656e36' : 'rgba(100, 116, 139, 0.4)',
                            color: inStock ? '#FFFFFF' : 'var(--muted-text, #94A3B8)',
                            pointerEvents: inStock ? 'auto' : 'none',
                            cursor: inStock ? 'pointer' : 'not-allowed',
                            transition: 'background-color 0.2s ease',
                          }}
                        >
                          <span>{inStock ? 'Buy Now' : 'Out of Stock'}</span>
                          <span>{inStock ? '→' : '✕'}</span>
                        </a>
                      ) : (
                        <Link
                          href={`/merchandise/${product.slug || product.id}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 14px',
                            borderRadius: '2px',
                            fontSize: '12px',
                            fontWeight: 700,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            textDecoration: 'none',
                            backgroundColor: inStock ? '#656e36' : 'rgba(100, 116, 139, 0.4)',
                            color: inStock ? '#FFFFFF' : 'var(--muted-text, #94A3B8)',
                            pointerEvents: inStock ? 'auto' : 'none',
                            cursor: inStock ? 'pointer' : 'not-allowed',
                            transition: 'background-color 0.2s ease',
                          }}
                        >
                          <span>{inStock ? 'View Product' : 'Out of Stock'}</span>
                          <span>{inStock ? '→' : '✕'}</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="themed-sub-text">No active merchandise indexed.</p>
        )}
      </div>
    </HomeThemeWrapper>
  )
}
