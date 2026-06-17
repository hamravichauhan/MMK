'use client'

import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import type { Article } from '@/payload-types'
import type { ReadingTheme, FontSizeLevel } from './AdvancedReaderSettings'

interface EditorialContentProps {
  article: Article
  isReadingMode: boolean
  theme: ReadingTheme
  fontSize: FontSizeLevel
  themeStyles: {
    title: string
    text: string
    quoteBorder: string
    strongColor: string
    border: string
  }
  sizeStyles: {
    text: string
    lineSpacing: string
  }
}

interface IntelligenceCalloutFields {
  type: 'info' | 'warning' | 'military'
  text: string
}

interface InlineVideoFields {
  youtube_id: string
  caption?: string | null
}

// Resolve an internal Payload document reference to an href string
function resolveInternalLink(linkNode: any): string {
  const { fields } = linkNode

  // External / custom URL — use as-is
  if (fields.linkType === 'custom' || fields.url) {
    return fields.url ?? '#'
  }

  // Internal document reference
  const doc = fields.doc
  if (!doc?.value) return '#'

  const { relationTo, value } = doc
  const identifier = typeof value === 'object' ? ((value as any).slug ?? (value as any).id) : value

  switch (relationTo) {
    case 'articles':
      return `/articles/${identifier}`
    case 'pages':
      return `/${identifier}`
    case 'posts':
      return `/posts/${identifier}`
    default:
      return `/${relationTo}/${identifier}`
  }
}

export default function EditorialContent({
  article,
  theme,
  fontSize,
  themeStyles,
  sizeStyles,
}: EditorialContentProps) {
  const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
    ...defaultConverters,

    // Override the link converter to handle internal links properly
    link: ({ node, nodesToJSX }: any) => {
      const href = resolveInternalLink(node)
      const { newTab, nofollow } = node.fields

      return (
        <a
          href={href}
          target={newTab ? '_blank' : undefined}
          rel={
            [newTab ? 'noopener noreferrer' : '', nofollow ? 'nofollow' : '']
              .filter(Boolean)
              .join(' ') || undefined
          }
        >
          {nodesToJSX({ nodes: node.children })}
        </a>
      )
    },

    blocks: {
      ...((defaultConverters as any)?.blocks ?? {}),

      intelligenceCallout: ({ node }: { node: { fields: IntelligenceCalloutFields } }) => {
        const fields = node.fields

        const styles = (
          {
            info: { border: '#fbbf24', bg: 'rgba(251,191,36,0.08)' },
            warning: { border: '#ef4444', bg: 'rgba(239,68,68,0.08)' },
            military: { border: '#0B1D3A', bg: 'rgba(11,29,58,0.06)' },
          } as const
        )[fields.type] ?? { border: '#e2e8f0', bg: 'transparent' }

        return (
          <div
            style={{
              borderLeft: `4px solid ${styles.border}`,
              backgroundColor: styles.bg,
              padding: '24px',
              borderRadius: '0 12px 12px 0',
              margin: '3rem 0',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
            }}
          >
            <span
              style={{
                fontWeight: '900',
                textTransform: 'uppercase',
                fontSize: '10px',
                color: styles.border,
                display: 'block',
                marginBottom: '8px',
                letterSpacing: '0.15em',
              }}
            >
              {fields.type === 'military'
                ? '🛡️ MILITARY DIRECTIVE'
                : fields.type === 'warning'
                  ? '⚠️ CRITICAL INTEL'
                  : '💡 STRATEGIC INSIGHT'}
            </span>
            <p
              style={{
                margin: 0,
                color: themeStyles.text,
                fontWeight: '500',
                fontSize: '17px',
                lineHeight: '1.6',
              }}
            >
              {fields.text}
            </p>
          </div>
        )
      },

      inlineVideo: ({ node }: { node: { fields: InlineVideoFields } }) => {
        const fields = node.fields
        if (!fields?.youtube_id) return null

        return (
          <div style={{ margin: '3rem 0' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${fields.youtube_id}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                allowFullScreen
                title={fields.caption || 'YouTube video'}
              />
            </div>
            {fields.caption && (
              <span
                style={{
                  display: 'block',
                  marginTop: '12px',
                  fontSize: '13px',
                  color: '#64748b',
                  textAlign: 'center',
                  fontStyle: 'italic',
                }}
              >
                {fields.caption}
              </span>
            )}
          </div>
        )
      },
    },
  })

  return (
    <>
      <style>{`
        .editorial-container p {
          margin-top: 0px;
          margin-bottom: ${fontSize === 'xl' ? '2.2rem' : '1.85rem'} !important;
          letter-spacing: -0.005em;
        }
        .editorial-container *::selection {
          background-color: #fbbf24 !important;
          color: #0b1d3a !important;
        }
        ${
          theme !== 'dark'
            ? `
          .editorial-container p:first-of-type::first-letter {
            font-family: serif;
            font-size: 5.2rem;
            float: left;
            line-height: 0.8;
            margin-top: 4px;
            margin-right: 12px;
            font-weight: 800;
            color: ${themeStyles.title};
          }
        `
            : ''
        }
        .editorial-container blockquote {
          border-left: 4px solid ${themeStyles.quoteBorder} !important;
          padding-left: 24px !important;
          margin: 3rem 0 !important;
          font-style: italic !important;
          color: ${themeStyles.text};
          background: rgba(0,0,0,0.02);
          padding-top: 10px;
          padding-bottom: 10px;
        }
        .editorial-container strong {
          color: ${themeStyles.strongColor} !important;
          font-weight: 700 !important;
        }
        .editorial-container h2, .editorial-container h3 {
          color: ${themeStyles.title} !important;
          font-weight: 800 !important;
          margin-top: 3.5rem !important;
          margin-bottom: 1.5rem !important;
          scroll-margin-top: 80px;
          letter-spacing: -0.02em;
        }
        .editorial-container a {
          color: #fbbf24;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.2s ease;
        }
        .editorial-container a:hover {
          color: #f59e0b;
        }
      `}</style>

      <div
        className="editorial-container"
        style={{
          fontSize: sizeStyles.text,
          lineHeight: sizeStyles.lineSpacing,
          fontFamily: 'Georgia, Cambria, serif',
          color: themeStyles.text,
          transition: 'all 0.3s ease',
        }}
      >
        <RichText data={article.body} converters={converters} />
      </div>
    </>
  )
}
