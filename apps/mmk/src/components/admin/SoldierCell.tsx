'use client'

import React from 'react'

export function SoldierCell(props: any) {
  const { rowData } = props
  const name = rowData?.full_name || 'Unknown Soldier'
  const rank = rowData?.rank || ''
  const isMartyr = rowData?.is_martyr
  const branch = rowData?.branch || 'army'

  // Resolve portrait image
  let imgUrl = ''
  if (rowData?.photo) {
    if (typeof rowData.photo === 'object') {
      imgUrl = rowData.photo.url || (rowData.photo.filename ? `https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp,q_auto/payload-media/${rowData.photo.filename.split('.')[0]}.webp` : '')
    } else if (typeof rowData.photo === 'string') {
      imgUrl = rowData.photo
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '4px 0' }}>
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: '#1E293B',
          overflow: 'hidden',
          flexShrink: 0,
          border: isMartyr ? '2px solid #DC2626' : '1.5px solid #4B5320',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span style={{ fontSize: '14px' }}>🎖️</span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#F1F5F9' }}>
            {rank ? `${rank} ` : ''}{name}
          </span>
          {isMartyr && (
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
              Martyr
            </span>
          )}
        </div>
        <span style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px', textTransform: 'capitalize' }}>
          {branch === 'parasf' ? '⚔️ Para SF' : branch === 'navy' ? '⚓ Navy' : branch === 'airforce' ? '✈️ Air Force' : '🇮🇳 Army'}
        </span>
      </div>
    </div>
  )
}

export default SoldierCell
