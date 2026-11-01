'use client'

import React from 'react'
import { useTheme } from '@/context/ThemeContext'

interface HomeThemeWrapperProps {
  children: React.ReactNode
  breakingNewsTrack?: React.ReactNode
  trendingNavTrack?: React.ReactNode
}

export default function HomeThemeWrapper({
  children,
  breakingNewsTrack,
  trendingNavTrack,
}: HomeThemeWrapperProps) {
  const { colors } = useTheme()

  return (
    <div
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        minHeight: '100vh',
        fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
        paddingBottom: '80px',
        transition: 'background-color 0.25s ease, color 0.25s ease',
        ['--bg-color' as any]: colors.bg,
        ['--card-bg' as any]: colors.cardBg,
        ['--text-color' as any]: colors.text,
        ['--heading-color' as any]: colors.text,
        ['--border-color' as any]: colors.border,
        ['--muted-text' as any]: colors.textMuted,
        ['--accent-color' as any]: colors.accent,
        ['--header-bg' as any]: colors.headerBg,
        ['--subtle-bg' as any]: colors.subtleBg,
        ['--input-bg' as any]: colors.inputBg,
        ['--footer-bg' as any]: colors.footerBg,
      }}
    >
      {/* Structural Styles Custom Rules Overrides Matrix */}
      <style>{`
        :root {
          --bg-color: ${colors.bg};
          --card-bg: ${colors.cardBg};
          --text-color: ${colors.text};
          --heading-color: ${colors.text};
          --border-color: ${colors.border};
          --muted-text: ${colors.textMuted};
          --accent-color: ${colors.accent};
          --header-bg: ${colors.headerBg};
          --subtle-bg: ${colors.subtleBg};
          --input-bg: ${colors.inputBg};
          --footer-bg: ${colors.footerBg};
        }

        .editorial-blueprint-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
          padding-top: 24px;
          padding-bottom: 48px;
        }
        .events-layout-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }
        .four-column-grid-layout {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
        }
        .dispatches-2col-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
          gap: 20px;
        }

        /* Dynamic Theme Specific Component Cards Matrix Overrides */
        .editorial-card-item, .soldier-card-item, .event-card-item, .video-card-item {
          background-color: ${colors.cardBg} !important;
          border: 1px solid ${colors.border} !important;
          color: ${colors.text} !important;
          border-radius: 6px;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .editorial-card-item:hover, .soldier-card-item:hover, .event-card-item:hover, .video-card-item:hover {
          border-color: ${colors.accent} !important;
          box-shadow: 0 4px 18px rgba(0,0,0,0.22);
        }

        .dynamic-theme-tag-badge {
          background-color: ${colors.cardBg};
          border: 1px solid ${colors.border};
          color: ${colors.textMuted};
          transition: all 0.2s ease;
        }
        .dynamic-theme-tag-badge:hover {
          border-color: #656E36;
          color: ${colors.text};
          background-color: rgba(101, 110, 54, 0.12);
        }

        /* Layout borders and text rules overrides */
        .themed-sub-text { color: ${colors.textMuted} !important; }
        .themed-border-top { border-top: 1px solid ${colors.border} !important; }
        .themed-border-bottom { border-bottom: 1px solid ${colors.border} !important; }

        @media (min-width: 992px) {
          .editorial-blueprint-grid {
            grid-template-columns: 2.1fr 1fr !important;
          }
          .briefing-blueprint-side {
            border-left: 1px solid ${colors.border} !important;
            padding-left: 28px !important;
          }
        }
        @media (max-width: 767px) {
          .home-canvas-container { padding: 0 16px !important; }
          .briefing-blueprint-side {
            border-top: 1px solid ${colors.border} !important;
            padding-top: 32px !important;
          }
          .events-layout-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .dispatches-2col-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Render tracks only when provided (homepage only) */}
      {breakingNewsTrack}
      {trendingNavTrack}

      {/* Main Content */}
      {children}
    </div>
  )
}
