import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ArrowRight, Lock, Sparkles } from 'lucide-react'
import { getCloudinaryUrl } from '@/utils/mediaUrl'

export default async function SpecialArticlesCard() {
  const payload = await getPayload({ config: configPromise })

  let article: any = null

  try {
    const specialResult = await payload.find({
      collection: 'articles' as any,
      where: {
        and: [
          { status: { equals: 'published' } },
          {
            or: [{ is_special: { equals: true } }, { is_featured: { equals: true } }],
          },
        ],
      },
      depth: 1,
      limit: 1,
      sort: '-published_at',
    })

    article = specialResult.docs[0] || null
  } catch (_err) {
    try {
      const fallbackResult = await payload.find({
        collection: 'articles' as any,
        where: {
          status: { equals: 'published' },
        },
        depth: 1,
        limit: 1,
        sort: '-published_at',
      })
      article = fallbackResult.docs[0] || null
    } catch (ignore) {
      article = null
    }
  }

  // Fallback showcase data matching the specification requirements if no published special article in database
  const fallbackImage =
    'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=800'
  const imageUrl = article?.featured_image
    ? getCloudinaryUrl(article.featured_image) || fallbackImage
    : fallbackImage

  const title = article?.title || 'Inside the Story of Operation Sindoor'
  const description =
    article?.excerpt ||
    'Exclusive insights, analysis and stories from the MMK team.'
  const publishedDate = article?.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })

  const articleHref = article?.slug ? `/articles/${article.slug}` : '/articles'

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
              backgroundColor: '#D97706',
              color: '#FFFFFF',
              fontSize: '10px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '3px 8px',
              borderRadius: '2px',
            }}
          >
            <Sparkles size={11} />
            Special Article
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
            Exclusive
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
          <Lock size={11} color="#D97706" />
          Subscribers Only
        </span>
      </div>

      {/* Thumbnail with Exclusive Badge */}
      <Link href={articleHref} className="block">
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/10',
            overflow: 'hidden',
            backgroundColor: 'var(--card-bg, #0F1526)',
          }}
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            style={{ objectFit: 'cover' }}
          />

          {/* Gradient scrim for depth */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 60%)',
            }}
          />
        </div>
      </Link>

      {/* Content Narrative Box */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column' }}>
        <p
          className="themed-sub-text"
          style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            margin: '0 0 6px 0',
            color: 'var(--muted-text, #94A3B8)',
          }}
        >
          {publishedDate}
        </p>

        <Link href={articleHref} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3
            style={{
              fontSize: '17px',
              fontWeight: 800,
              lineHeight: '1.3',
              margin: '0 0 8px 0',
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
            margin: '0 0 16px 0',
            color: 'var(--muted-text, #94A3B8)',
          }}
        >
          {description}
        </p>

        {/* Read Article CTA Button */}
        <Link
          href={articleHref}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            backgroundColor: 'transparent',
            border: '1px solid var(--border-color, #1E293B)',
            color: '#D97706',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.02em',
            transition: 'all 0.2s ease',
          }}
          className="hover:bg-amber-500/10 hover:border-amber-500"
        >
          <span>Read Article</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
