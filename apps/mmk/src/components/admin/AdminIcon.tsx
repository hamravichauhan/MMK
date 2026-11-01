'use client'

import React from 'react'

export function AdminIcon() {
  return (
    <div
      style={{
        width: '30px',
        height: '30px',
        borderRadius: '6px',
        backgroundColor: '#4B5320',
        border: '1.5px solid #D4AF37',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 8px rgba(212, 175, 55, 0.3)',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
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
  )
}

export default AdminIcon
