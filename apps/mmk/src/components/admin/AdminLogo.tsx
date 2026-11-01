'use client'

import React from 'react'

export function AdminLogo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '6px 0',
      }}
    >
      <div
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '6px',
          backgroundColor: '#4B5320',
          border: '1.5px solid #D4AF37',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 12px rgba(212, 175, 55, 0.25)',
          flexShrink: 0,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontFamily: 'serif',
            fontSize: '17px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            color: '#FFFFFF',
            lineHeight: '1.1',
          }}
        >
          MAJOR MADHAN KUMAR
        </span>
        <span
          style={{
            fontSize: '9.5px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#D4AF37',
            textTransform: 'uppercase',
            marginTop: '3px',
          }}
        >
          STRATEGIC COMMAND • CMS
        </span>
      </div>
    </div>
  )
}

export default AdminLogo
