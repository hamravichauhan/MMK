'use client'

import React from 'react'
import { Sun, Moon, Type, Eye } from 'lucide-react'

export type ReadingTheme = 'light' | 'sepia' | 'dark'
export type FontSizeLevel = 'sm' | 'base' | 'lg' | 'xl'

interface AdvancedReaderSettingsProps {
  isReadingMode: boolean
  setIsReadingMode: (value: boolean) => void
  theme: ReadingTheme
  setTheme: (theme: ReadingTheme) => void
  fontSize: FontSizeLevel
  setFontSize: (size: FontSizeLevel) => void
  themeStyles: { border: string; text: string }
}

export default function AdvancedReaderSettings({
  isReadingMode,
  setIsReadingMode,
  theme,
  setTheme,
  fontSize,
  setFontSize,
  themeStyles,
}: AdvancedReaderSettingsProps) {
  return (
    <div
      style={{
        maxWidth: isReadingMode ? '720px' : '1360px',
        margin: '0 auto 40px auto',
        padding: isReadingMode ? '0 20px 20px 20px' : '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: isReadingMode ? `1px solid ${themeStyles.border}` : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      {isReadingMode ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              border: `1px solid ${themeStyles.border}`,
              borderRadius: '20px',
              overflow: 'hidden',
              padding: '2px',
            }}
          >
            {(['sm', 'base', 'lg', 'xl'] as FontSizeLevel[]).map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: fontSize === size ? '#fbbf24' : 'transparent',
                  color: fontSize === size ? '#0b1d3a' : themeStyles.text,
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  borderRadius: '16px',
                }}
              >
                {size}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {(['light', 'sepia', 'dark'] as ReadingTheme[]).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor:
                    t === 'light' ? '#ffffff' : t === 'sepia' ? '#f4ecd8' : '#0f172a',
                  border: theme === t ? '2px solid #fbbf24' : `1px solid ${themeStyles.border}`,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                {t === 'light' && <Sun size={12} color="#1e293b" />}
                {t === 'dark' && <Moon size={12} color="#94a3b8" />}
                {t === 'sepia' && <Type size={12} color="#433422" />}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{ fontSize: '11px', color: '#64748b', fontWeight: '700', letterSpacing: '0.05em' }}
        >
          <span>READER MODE CONFIG: SYSTEM ACTIVE</span>
        </div>
      )}

      <button
        onClick={() => setIsReadingMode(!isReadingMode)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          borderRadius: '24px',
          cursor: 'pointer',
          backgroundColor: '#0B1D3A',
          color: '#ffffff',
          border: 'none',
          fontSize: '12px',
          fontWeight: '700',
          letterSpacing: '0.03em',
          boxShadow: '0 4px 6px -1px rgba(11,29,58,0.15)',
        }}
      >
        <Eye size={14} /> {isReadingMode ? 'EXIT AD-FREE MODE' : 'DISTRACTION-FREE VIEW'}
      </button>
    </div>
  )
}
