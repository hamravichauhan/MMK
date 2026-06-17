'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Soldier } from '@/payload-types'
import { Search, RotateCcw, ShieldAlert, Filter, Medal } from 'lucide-react'

export default function SoldiersListPage() {
  // DB Dataset States
  const [allSoldiers, setAllSoldiers] = useState<Soldier[]>([])
  const [filteredSoldiers, setFilteredSoldiers] = useState<Soldier[]>([])
  const [loading, setLoading] = useState(true)

  // Active Multi-Filter Configuration States
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRank, setSelectedRank] = useState('all')

  const ranks = [
    { label: 'All Ranks', value: 'all' },
    { label: 'Major', value: 'major' },
    { label: 'Captain', value: 'captain' },
    { label: 'Naik', value: 'naik' },
  ]

  // 📡 FETCH ENGINE: Safely extracts data arrays from Payload REST context
  useEffect(() => {
    async function fetchSoldiers() {
      try {
        const res = await fetch('/api/soldiers?limit=100&depth=1')
        const data = await res.json()

        if (data && data.docs && Array.isArray(data.docs)) {
          setAllSoldiers(data.docs)
          setFilteredSoldiers(data.docs)
        } else if (Array.isArray(data)) {
          setAllSoldiers(data)
          setFilteredSoldiers(data)
        }
      } catch (err) {
        console.error('Failed to parse database records:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchSoldiers()
  }, [])

  // 🧠 ADVANCED MULTI-FILTER MATRIX ENGINE
  useEffect(() => {
    let result = [...allSoldiers]

    // 1. Text Search Filter (Handles Name, Regiment, and Decorations safely)
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter(
        (soldier) =>
          soldier?.name?.toLowerCase().includes(query) ||
          soldier?.regiment?.toLowerCase().includes(query) ||
          soldier?.decorations?.toLowerCase().includes(query),
      )
    }

    // 2. Rank Pill Filter Match
    if (selectedRank !== 'all') {
      result = result.filter((soldier) => soldier?.rank?.toLowerCase() === selectedRank)
    }

    setFilteredSoldiers(result)
  }, [searchQuery, selectedRank, allSoldiers])

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedRank('all')
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: '75vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-sans)',
          color: 'var(--muted-foreground)',
          backgroundColor: 'var(--background)',
        }}
      >
        Loading Armed Forces registry...
      </div>
    )
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--background)',
        fontFamily: 'var(--font-sans)',
        color: 'var(--foreground)',
        margin: 0,
        padding: 0,
      }}
    >
      {/* 1. BRAND HERO SECTION */}
      <section style={{ backgroundColor: '#0B1D3A', color: '#ffffff', padding: '64px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#cbd5e1',
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              padding: '4px 10px',
              borderRadius: '4px',
              marginBottom: '16px',
              letterSpacing: '0.5px',
            }}
          >
            Roll of Honour
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '44px',
              fontWeight: '700',
              margin: '0 0 16px 0',
              letterSpacing: '-0.5px',
              color: '#ffffff',
            }}
          >
            Armed Forces Profiles & Tributes
          </h1>
          <p
            style={{
              color: '#cbd5e1',
              fontSize: '18px',
              margin: 0,
              maxWidth: '768px',
              lineHeight: '1.6',
              fontWeight: '300',
            }}
          >
            Preserving the immortal stories of valour, operational milestones, and strategic
            histories of our nation&apos;s greatest defenders.
          </p>
        </div>
      </section>

      {/* Main Framework Content Bounds */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        {/* 2. ADVANCED INTERACTIVE FILTER PANEL */}
        <div
          style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '32px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              alignItems: 'end',
            }}
          >
            {/* Live Text Field Input */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--muted-foreground)',
                  marginBottom: '8px',
                }}
              >
                <Search size={14} /> Search Records
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Search
                  size={16}
                  style={{ position: 'absolute', left: '14px', color: 'var(--muted-foreground)' }}
                />
                <input
                  type="text"
                  placeholder="Search by officer name, decoration, or regiment unit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '10px 14px 10px 42px',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--input-background)',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    outline: 'none',
                    color: 'var(--foreground)',
                  }}
                />
              </div>
            </div>

            {/* Clear Button Trigger */}
            <div>
              <button
                onClick={resetFilters}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '11px 14px',
                  backgroundColor: '#f1f5f9',
                  color: '#475569',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
              >
                <RotateCcw size={14} /> Clear Filters
              </button>
            </div>
          </div>

          {/* Horizontal Filtering Tags Row */}
          <div
            style={{ marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: '600',
                color: 'var(--muted-foreground)',
                marginBottom: '12px',
              }}
            >
              <Filter size={14} /> Filter by Rank Designation
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {ranks.map((rk) => (
                <button
                  key={rk.value}
                  onClick={() => setSelectedRank(rk.value)}
                  style={{
                    padding: '6px 16px',
                    fontSize: '13px',
                    fontWeight: '500',
                    borderRadius: '9999px',
                    border: '1px solid',
                    borderColor: selectedRank === rk.value ? 'var(--accent)' : 'var(--border)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: selectedRank === rk.value ? 'var(--accent)' : 'var(--card)',
                    color:
                      selectedRank === rk.value
                        ? 'var(--accent-foreground)'
                        : 'var(--muted-foreground)',
                  }}
                >
                  {rk.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Counter Results Label Text */}
        <div
          style={{
            fontSize: '14px',
            color: 'var(--muted-foreground)',
            marginBottom: '24px',
            fontWeight: '500',
          }}
        >
          Showing <strong>{filteredSoldiers.length}</strong> of {allSoldiers.length} profile entries
        </div>

        {/* 3. RESPONSIVE HORIZONTAL CARD LAYOUT GRID */}
        {filteredSoldiers.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 0',
              border: '1px dashed var(--border)',
              borderRadius: '16px',
              color: 'var(--muted-foreground)',
              backgroundColor: 'var(--card)',
            }}
          >
            No profile entries match your search filters inside the system.
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '32px',
            }}
          >
            {filteredSoldiers.map((soldier) => {
              const profileImage =
                soldier.profile_image && typeof soldier.profile_image === 'object'
                  ? (soldier.profile_image as any)
                  : null

              return (
                <Link
                  key={soldier.id}
                  href={`/soldiers/${soldier.slug}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <article
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                      height: '180px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {/* Left Frame: Officer Portrait Image Container */}
                    <div
                      style={{
                        width: '130px',
                        height: '100%',
                        backgroundColor: 'var(--input-background)',
                        flexShrink: 0,
                        borderRight: '1px solid var(--border)',
                        overflow: 'hidden',
                      }}
                    >
                      {profileImage?.url ? (
                        <img
                          src={profileImage.url}
                          alt={soldier.name || 'Armed Forces Officer'}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--muted-foreground)',
                          }}
                        >
                          <ShieldAlert size={22} />
                        </div>
                      )}
                    </div>

                    {/* Right Frame: Text Parameters Info Scope */}
                    <div
                      style={{
                        padding: '20px',
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          gap: '6px',
                          alignItems: 'center',
                          marginBottom: '6px',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            color: 'var(--accent-foreground)',
                            backgroundColor: 'var(--accent)',
                            padding: '2px 6px',
                            borderRadius: '3px',
                            letterSpacing: '0.5px',
                          }}
                        >
                          {soldier.rank || 'Officer'}
                        </span>
                      </div>

                      <h2
                        style={{
                          fontSize: '20px',
                          fontFamily: 'var(--font-serif)',
                          fontWeight: 'bold',
                          color: 'var(--foreground)',
                          margin: '0 0 6px 0',
                          lineHeight: '1.2',
                        }}
                      >
                        {soldier.name || 'Unnamed Profile Record'}
                      </h2>

                      {soldier.regiment && (
                        <p
                          style={{
                            color: 'var(--muted-foreground)',
                            fontSize: '13px',
                            margin: '0 0 10px 0',
                            fontWeight: '500',
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {soldier.regiment}
                        </p>
                      )}

                      {soldier.decorations && (
                        <div
                          style={{
                            marginTop: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '12px',
                            color: 'var(--destructive)',
                            fontWeight: '600',
                          }}
                        >
                          <span
                            style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            🏅 {soldier.decorations}
                          </span>
                        </div>
                      )}
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}
