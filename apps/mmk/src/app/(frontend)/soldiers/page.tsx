'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Soldier } from '@/payload-types'
import { Search, RotateCcw, Shield, Medal, Award, MapPin, Heart } from 'lucide-react'
import HomeThemeWrapper from '@/components/layout/HomeThemeWrapper'
import { getCloudinaryUrl } from '@/utils/mediaUrl'

export default function SoldiersListPage() {
  const [allSoldiers, setAllSoldiers] = useState<Soldier[]>([])
  const [filteredSoldiers, setFilteredSoldiers] = useState<Soldier[]>([])
  const [loading, setLoading] = useState(true)

  // Multi-Filter States
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('all')
  const [selectedRank, setSelectedRank] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const branches = [
    { label: 'All Branches', value: 'all' },
    { label: '🇮🇳 Indian Army', value: 'army' },
    { label: '⚓ Indian Navy', value: 'navy' },
    { label: '✈️ Air Force', value: 'airforce' },
    { label: '🛡️ Para SF', value: 'parasf' },
  ]

  const ranks = [
    { label: 'All Ranks', value: 'all' },
    { label: 'Major', value: 'major' },
    { label: 'Captain', value: 'captain' },
    { label: 'Subedar Major', value: 'subedar major' },
    { label: 'Naik', value: 'naik' },
    { label: 'Brigadier', value: 'brigadier' },
    { label: 'Flying Officer', value: 'flying officer' },
  ]

  const statusOptions = [
    { label: 'All Heroes', value: 'all' },
    { label: '🇮🇳 Veer Gatha (Martyrs)', value: 'martyr' },
    { label: '🎖️ Living Veterans', value: 'veteran' },
  ]

  useEffect(() => {
    async function fetchSoldiers() {
      try {
        const res = await fetch('/api/soldiers?limit=100&depth=1')
        const data = await res.json()
        if (data && data.docs && Array.isArray(data.docs)) {
          setAllSoldiers(data.docs)
          setFilteredSoldiers(data.docs)
        }
      } catch (err) {
        console.error('Failed to parse database records:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchSoldiers()
  }, [])

  useEffect(() => {
    let result = [...allSoldiers]

    // 1. Search Query Match
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        (s) =>
          s.full_name?.toLowerCase().includes(q) ||
          s.regiment_unit?.toLowerCase().includes(q) ||
          s.awards?.toLowerCase().includes(q) ||
          s.home_state?.toLowerCase().includes(q) ||
          s.rank?.toLowerCase().includes(q),
      )
    }

    // 2. Branch Match
    if (selectedBranch !== 'all') {
      result = result.filter((s) => s.branch?.toLowerCase() === selectedBranch)
    }

    // 3. Rank Match
    if (selectedRank !== 'all') {
      result = result.filter((s) => s.rank?.toLowerCase().includes(selectedRank))
    }

    // 4. Status Match
    if (selectedStatus === 'martyr') {
      result = result.filter((s) => s.is_martyr === true)
    } else if (selectedStatus === 'veteran') {
      result = result.filter((s) => s.is_martyr !== true)
    }

    setFilteredSoldiers(result)
  }, [searchQuery, selectedBranch, selectedRank, selectedStatus, allSoldiers])

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedBranch('all')
    setSelectedRank('all')
    setSelectedStatus('all')
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Inter", sans-serif',
          color: 'var(--muted-text, #94a3b8)',
          backgroundColor: 'var(--bg-color, #070A14)',
        }}
      >
        Loading Armed Forces registry...
      </div>
    )
  }

  return (
    <HomeThemeWrapper breakingNewsTrack={null} trendingNavTrack={null}>
      <main
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--bg-color, #070A14)',
          color: 'var(--text-color, #E2E8F0)',
          fontFamily: '"Inter", system-ui, sans-serif',
          margin: 0,
          padding: 0,
          paddingBottom: '80px',
        }}
      >
        {/* 1. BRAND HERO SECTION */}
        <section
          style={{
            padding: '56px 24px',
            borderBottom: '1px solid var(--border-color, #1E293B)',
            background: 'radial-gradient(circle at top right, var(--card-bg, #0F172A) 0%, var(--bg-color, #070A14) 100%)',
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(217, 119, 6, 0.15)',
                border: '1px solid #D97706',
                color: '#F59E0B',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                padding: '4px 10px',
                borderRadius: '4px',
                marginBottom: '16px',
                letterSpacing: '0.05em',
              }}
            >
              <Medal size={12} /> Roll of Honour • Know Your Soldiers
            </div>
            <h1
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 800,
                color: 'var(--heading-color, #FFFFFF)',
                margin: '0 0 12px 0',
                letterSpacing: '-0.5px',
              }}
            >
              Indian Armed Forces Memorial & Archives
            </h1>
            <p
              style={{
                color: 'var(--muted-text, #cbd5e1)',
                fontSize: '16px',
                maxWidth: '740px',
                lineHeight: '1.6',
                margin: 0,
              }}
            >
              Dedicated tribute portal documenting the service, citations, unit histories, and supreme valor of India&apos;s living veterans and fallen martyrs.
            </p>
          </div>
        </section>

        {/* 2. ADVANCED MULTI-FILTER SUITE */}
        <section style={{ maxWidth: '1280px', margin: '36px auto 0 auto', padding: '0 24px' }}>
          <div
            style={{
              backgroundColor: 'var(--card-bg, #0F1526)',
              border: '1px solid var(--border-color, #1E293B)',
              borderRadius: '8px',
              padding: '24px',
              marginBottom: '32px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            {/* Search + Reset Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '16px',
                alignItems: 'end',
                marginBottom: '20px',
              }}
            >
              <div style={{ flex: 2 }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--muted-text, #94A3B8)',
                    marginBottom: '8px',
                    letterSpacing: '0.05em',
                  }}
                >
                  <Search size={13} /> Search Officer, Unit, Decoration, or State
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Search
                    size={16}
                    style={{ position: 'absolute', left: '12px', color: 'var(--muted-text, #94A3B8)' }}
                  />
                  <input
                    type="text"
                    placeholder="e.g., Vikram Batra, 13 JAK RIF, Param Vir Chakra, Himachal Pradesh..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '4px',
                      border: '1px solid var(--border-color, #1E293B)',
                      backgroundColor: 'var(--input-bg, #0A0E1A)',
                      color: 'var(--text-color, #FFFFFF)',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={resetFilters}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '11px 16px',
                    backgroundColor: 'var(--subtle-bg, rgba(255,255,255,0.05))',
                    color: 'var(--text-color, #E2E8F0)',
                    border: '1px solid var(--border-color, #1E293B)',
                    borderRadius: '4px',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <RotateCcw size={14} /> Clear All Filters
                </button>
              </div>
            </div>

            {/* Filter Pills Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderTop: '1px solid var(--border-color, #1E293B)', paddingTop: '16px' }}>
              {/* Category: Status / Veer Gatha */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted-text, #94A3B8)', minWidth: '100px', letterSpacing: '0.04em' }}>
                  Category:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {statusOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSelectedStatus(opt.value)}
                      style={{
                        padding: '6px 14px',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        borderRadius: '4px',
                        border: '1px solid',
                        borderColor: selectedStatus === opt.value ? '#DC2626' : 'var(--border-color, #1E293B)',
                        backgroundColor: selectedStatus === opt.value ? 'rgba(220, 38, 38, 0.2)' : 'var(--card-bg, #0F1526)',
                        color: selectedStatus === opt.value ? '#EF4444' : 'var(--text-color, #94A3B8)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Branch */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted-text, #94A3B8)', minWidth: '100px', letterSpacing: '0.04em' }}>
                  Branch:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {branches.map((b) => (
                    <button
                      key={b.value}
                      onClick={() => setSelectedBranch(b.value)}
                      style={{
                        padding: '6px 14px',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        borderRadius: '4px',
                        border: '1px solid',
                        borderColor: selectedBranch === b.value ? '#656E36' : 'var(--border-color, #1E293B)',
                        backgroundColor: selectedBranch === b.value ? '#656E36' : 'var(--card-bg, #0F1526)',
                        color: selectedBranch === b.value ? '#ffffff' : 'var(--text-color, #94A3B8)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Military Rank */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted-text, #94A3B8)', minWidth: '100px', letterSpacing: '0.04em' }}>
                  Rank:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {ranks.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => setSelectedRank(r.value)}
                      style={{
                        padding: '5px 12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        borderRadius: '4px',
                        border: '1px solid',
                        borderColor: selectedRank === r.value ? '#D97706' : 'var(--border-color, #1E293B)',
                        backgroundColor: selectedRank === r.value ? '#D97706' : 'var(--card-bg, #0F1526)',
                        color: selectedRank === r.value ? '#ffffff' : 'var(--text-color, #94A3B8)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3. SOLDIERS CARDS GRID */}
          {filteredSoldiers.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 0',
                border: '1px dashed var(--border-color, #1E293B)',
                borderRadius: '8px',
                color: 'var(--muted-text, #94A3B8)',
                backgroundColor: 'var(--card-bg, #0F1526)',
              }}
            >
              No soldier or veteran records match your combined filtering parameters.
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                gap: '24px',
              }}
            >
              {filteredSoldiers.map((soldier) => {
                const isMartyr = soldier.is_martyr === true
                const photoUrl = getCloudinaryUrl(soldier.photo || (soldier as any).profile_image)

                return (
                  <Link
                    key={soldier.id}
                    href={`/soldiers/${soldier.slug || soldier.id}`}
                    style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}
                  >
                    <div
                      className="soldier-card-item"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        border: '1px solid var(--border-color, #1E293B)',
                        borderLeft: isMartyr ? '4px solid #DC2626' : '4px solid #656E36',
                        backgroundColor: 'var(--card-bg, #0F1526)',
                        transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                      }}
                    >
                      {/* Top Header Tag Strip */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 16px',
                          borderBottom: '1px solid var(--border-color, #1E293B)',
                          backgroundColor: isMartyr ? 'rgba(220, 38, 38, 0.08)' : 'transparent',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '10.5px',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            color: isMartyr ? '#EF4444' : '#656E36',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          {isMartyr ? (
                            <>
                              <Heart size={12} fill="#EF4444" />
                              Veer Gatha • Supreme Sacrifice
                            </>
                          ) : (
                            <>
                              <Shield size={12} />
                              Living Veteran • Armed Forces
                            </>
                          )}
                        </span>

                        <span
                          style={{
                            fontSize: '11px',
                            color: 'var(--muted-text, #94A3B8)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px',
                          }}
                        >
                          <MapPin size={11} />
                          {soldier.home_state || 'India'}
                        </span>
                      </div>

                      {/* Content Body with Portrait Thumbnail */}
                      <div style={{ display: 'flex', gap: '16px', padding: '16px', alignItems: 'flex-start', flex: 1 }}>
                        {/* Portrait */}
                        <div
                          style={{
                            position: 'relative',
                            width: '84px',
                            height: '108px',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            backgroundColor: '#090D1A',
                            flexShrink: 0,
                            border: '1px solid var(--border-color, #1E293B)',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                          }}
                        >
                          <Image
                            src={photoUrl}
                            alt={soldier.full_name || 'Soldier Photo'}
                            fill
                            unoptimized
                            sizes="84px"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>

                        {/* Details */}
                        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              color: '#D97706',
                              textTransform: 'uppercase',
                              letterSpacing: '0.04em',
                            }}
                          >
                            {soldier.rank}
                          </span>

                          <h3
                            style={{
                              fontSize: '17px',
                              fontWeight: 800,
                              color: 'var(--heading-color, #FFFFFF)',
                              margin: '2px 0 6px 0',
                              lineHeight: '1.3',
                            }}
                          >
                            {soldier.full_name}
                          </h3>

                          <div style={{ fontSize: '12px', color: 'var(--muted-text, #94A3B8)', marginBottom: '8px' }}>
                            {soldier.regiment_unit}
                          </div>

                          {soldier.awards && (
                            <div
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '11px',
                                fontWeight: 700,
                                color: '#FCD34D',
                                backgroundColor: 'rgba(217, 119, 6, 0.12)',
                                padding: '3px 8px',
                                borderRadius: '3px',
                                width: 'fit-content',
                                marginTop: 'auto',
                              }}
                            >
                              <Award size={12} />
                              <span>{soldier.awards}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Footer Quote or Action Strip */}
                      <div
                        style={{
                          borderTop: '1px solid var(--border-color, #1E293B)',
                          padding: '10px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '11px',
                          backgroundColor: 'rgba(255,255,255,0.02)',
                        }}
                      >
                        <span style={{ color: 'var(--muted-text, #94A3B8)', fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '75%' }}>
                          {soldier.short_bio ? `"${soldier.short_bio}"` : `Honour & Gallantry Citation`}
                        </span>
                        <span style={{ fontWeight: 700, color: '#656E36', whiteSpace: 'nowrap' }}>
                          View Citation →
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </section>
      </main>
    </HomeThemeWrapper>
  )
}
