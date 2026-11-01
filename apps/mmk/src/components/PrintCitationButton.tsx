'use client'

import React from 'react'
import { Printer } from 'lucide-react'

interface PrintCitationButtonProps {
  soldierName: string
  rank: string
}

export default function PrintCitationButton({ soldierName, rank }: PrintCitationButtonProps) {
  const handlePrint = () => {
    window.print()
  }

  return (
    <button
      onClick={handlePrint}
      type="button"
      className="no-print"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'rgba(75, 83, 32, 0.15)',
        color: '#A3B158',
        border: '1px solid rgba(75, 83, 32, 0.5)',
        padding: '8px 16px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      title={`Print or Save PDF Citation Dossier for ${rank} ${soldierName}`}
    >
      <Printer size={15} />
      <span>Print / PDF Citation</span>
    </button>
  )
}
