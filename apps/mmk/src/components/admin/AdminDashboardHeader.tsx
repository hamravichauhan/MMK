'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface DashboardStats {
  articlesCount: number
  soldiersCount: number
  videosCount: number
  submissionsCount: number
}

export function AdminDashboardHeader() {
  const [stats, setStats] = useState<DashboardStats>({
    articlesCount: 0,
    soldiersCount: 0,
    videosCount: 0,
    submissionsCount: 0,
  })
  const [syncing, setSyncing] = useState(false)
  const [syncResult, setSyncResult] = useState<string | null>(null)

  useEffect(() => {
    async function loadStats() {
      try {
        const [artRes, solRes, vidRes, subRes] = await Promise.all([
          fetch('/api/articles?limit=0', { credentials: 'include' }).then((r) => r.json()).catch(() => ({ totalDocs: 0 })),
          fetch('/api/soldiers?limit=0', { credentials: 'include' }).then((r) => r.json()).catch(() => ({ totalDocs: 0 })),
          fetch('/api/videos?limit=0', { credentials: 'include' }).then((r) => r.json()).catch(() => ({ totalDocs: 0 })),
          fetch('/api/contact-submissions?limit=0', { credentials: 'include' }).then((r) => r.json()).catch(() => ({ totalDocs: 0 })),
        ])

        setStats({
          articlesCount: artRes?.totalDocs || 0,
          soldiersCount: solRes?.totalDocs || 0,
          videosCount: vidRes?.totalDocs || 0,
          submissionsCount: subRes?.totalDocs || 0,
        })
      } catch (err) {
        console.error('Failed to load dashboard stats:', err)
      }
    }
    loadStats()
  }, [])

  const handleSyncYouTube = async () => {
    setSyncing(true)
    setSyncResult(null)
    try {
      const res = await fetch('/api/sync/youtube')
      const data = await res.json()
      if (data.success) {
        setSyncResult(`✓ Synced ${data.syncedCount} new videos from channel ${data.channel}`)
        setStats((prev) => ({ ...prev, videosCount: prev.videosCount + (data.syncedCount || 0) }))
      } else {
        setSyncResult(`Notice: ${data.message || 'API key configuration required'}`)
      }
    } catch (err: any) {
      setSyncResult(`Sync error: ${err.message || 'Network error'}`)
    } finally {
      setSyncing(false)
    }
  }

  return (
    <div
      style={{
        backgroundColor: '#0F1526',
        border: '1px solid #1E293B',
        borderRadius: '12px',
        padding: '24px 28px',
        marginBottom: '32px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4)',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Top Banner Row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          borderBottom: '1px solid #1E293B',
          paddingBottom: '20px',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              backgroundColor: '#4B5320',
              border: '2px solid #D4AF37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)',
            }}
          >
            <span style={{ fontSize: '20px' }}>🛡️</span>
          </div>
          <div>
            <h1
              style={{
                fontSize: '20px',
                fontWeight: 800,
                color: '#FFFFFF',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              Major Madhan Kumar — Strategic Intelligence Command
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '12.5px', color: '#94A3B8' }}>
              High-Fidelity Defense Intelligence, Armed Forces Archives & Editorial Distribution Control
            </p>
          </div>
        </div>

        {/* Sync Action Area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            type="button"
            onClick={handleSyncYouTube}
            disabled={syncing}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: syncing ? '#334155' : '#DC2626',
              color: '#FFFFFF',
              border: 'none',
              padding: '9px 16px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: syncing ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s ease',
              boxShadow: '0 2px 8px rgba(220, 38, 38, 0.35)',
            }}
          >
            <span>{syncing ? '⏳ Syncing...' : '🔄 Sync YouTube Channel'}</span>
          </button>

          <Link
            href="/admin/globals/site-settings"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#1E293B',
              color: '#F1F5F9',
              border: '1px solid #334155',
              padding: '9px 16px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            ⚙️ Site Settings
          </Link>
        </div>
      </div>

      {syncResult && (
        <div
          style={{
            backgroundColor: syncResult.startsWith('✓') ? 'rgba(75, 83, 32, 0.25)' : 'rgba(217, 119, 6, 0.2)',
            border: `1px solid ${syncResult.startsWith('✓') ? '#A3B158' : '#D97706'}`,
            borderRadius: '6px',
            padding: '10px 16px',
            marginBottom: '20px',
            fontSize: '13px',
            color: syncResult.startsWith('✓') ? '#D4E187' : '#FCD34D',
            fontWeight: 600,
          }}
        >
          {syncResult}
        </div>
      )}

      {/* 4 Core Intelligence Metrics Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}
      >
        <Link
          href="/admin/collections/articles"
          style={{
            backgroundColor: '#161F30',
            border: '1px solid #1E293B',
            borderRadius: '8px',
            padding: '16px',
            textDecoration: 'none',
            display: 'block',
            transition: 'border-color 0.2s ease',
          }}
          className="hover:border-amber-500"
        >
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#A3B158', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Defense Briefings
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#FFFFFF', marginTop: '6px' }}>
            {stats.articlesCount}
          </div>
          <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
            Published Intelligence Analyses
          </div>
        </Link>

        <Link
          href="/admin/collections/soldiers"
          style={{
            backgroundColor: '#161F30',
            border: '1px solid #1E293B',
            borderRadius: '8px',
            padding: '16px',
            textDecoration: 'none',
            display: 'block',
            transition: 'border-color 0.2s ease',
          }}
          className="hover:border-amber-500"
        >
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Armed Forces Heroes
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#FFFFFF', marginTop: '6px' }}>
            {stats.soldiersCount}
          </div>
          <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
            Living Veterans & Fallen Martyrs
          </div>
        </Link>

        <Link
          href="/admin/collections/videos"
          style={{
            backgroundColor: '#161F30',
            border: '1px solid #1E293B',
            borderRadius: '8px',
            padding: '16px',
            textDecoration: 'none',
            display: 'block',
            transition: 'border-color 0.2s ease',
          }}
          className="hover:border-amber-500"
        >
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Video Intelligence
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#FFFFFF', marginTop: '6px' }}>
            {stats.videosCount}
          </div>
          <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
            YouTube Broadcast Feeds
          </div>
        </Link>

        <Link
          href="/admin/collections/contact-submissions"
          style={{
            backgroundColor: '#161F30',
            border: '1px solid #1E293B',
            borderRadius: '8px',
            padding: '16px',
            textDecoration: 'none',
            display: 'block',
            transition: 'border-color 0.2s ease',
          }}
          className="hover:border-amber-500"
        >
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#A855F7', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Speaking & Leads
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#FFFFFF', marginTop: '6px' }}>
            {stats.submissionsCount}
          </div>
          <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
            Conclaves, TV & Inquiries
          </div>
        </Link>
      </div>
    </div>
  )
}

export default AdminDashboardHeader
