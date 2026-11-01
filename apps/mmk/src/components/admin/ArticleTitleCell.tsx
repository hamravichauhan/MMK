'use client'

import React from 'react'

export function ArticleTitleCell(props: any) {
  const { rowData } = props
  const title = rowData?.title || 'Untitled Article'
  const isBreaking = rowData?.is_breaking
  const isSpecial = rowData?.is_special
  const category = rowData?.category

  // Resolve thumbnail from featured_image
  let imgUrl = ''
  if (rowData?.featured_image) {
    if (typeof rowData.featured_image === 'object') {
      imgUrl = rowData.featured_image.url || (rowData.featured_image.filename ? `https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp,q_auto/payload-media/${rowData.featured_image.filename.split('.')[0]}.webp` : '')
    } else if (typeof rowData.featured_image === 'string') {
      imgUrl = rowData.featured_image
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '4px 0' }}>
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '4px',
          backgroundColor: '#1E293B',
          overflow: 'hidden',
          flexShrink: 0,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span style={{ fontSize: '14px' }}>📰</span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '13.5px',
              fontWeight: 600,
              color: '#F1F5F9',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '380px',
            }}
            title={title}
          >
            {title}
          </span>
          {isBreaking && (
            <span
              style={{
                fontSize: '9px',
                fontWeight: 800,
                backgroundColor: '#DC2626',
                color: '#FFFFFF',
                padding: '1px 5px',
                borderRadius: '3px',
                textTransform: 'uppercase',
              }}
            >
              FLASH
            </span>
          )}
          {isSpecial && (
            <span
              style={{
                fontSize: '9px',
                fontWeight: 800,
                backgroundColor: '#4B5320',
                color: '#D4AF37',
                border: '1px solid #D4AF37',
                padding: '1px 5px',
                borderRadius: '3px',
                textTransform: 'uppercase',
              }}
            >
              SPECIAL
            </span>
          )}
        </div>
        {category && (
          <span style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
            {category}
          </span>
        )}
      </div>
    </div>
  )
}

export default ArticleTitleCell
