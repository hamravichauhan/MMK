'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Event } from '@/payload-types'
import { format, isAfter, isBefore } from 'date-fns'
import HomeThemeWrapper from '@/components/layout/HomeThemeWrapper'

export default function EventsListPage() {
  const [allEvents, setAllEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  // Tab control states: 'upcoming' | 'past' | 'all'
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'all'>('upcoming')

  // FETCH ENGINE: Safely extracts data from database context
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/events?limit=100&sort=event_date')
        const data = await res.json()

        if (data && data.docs && Array.isArray(data.docs)) {
          setAllEvents(data.docs)
        } else if (Array.isArray(data)) {
          setAllEvents(data)
        }
      } catch (err) {
        console.error('Failed to parse active events database connection:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  // CHRONOLOGICAL TIMELINE FILTER ENGINE
  useEffect(() => {
    const now = new Date()
    let result = [...allEvents]

    if (activeTab === 'upcoming') {
      result = result.filter((e) => e?.event_date && isAfter(new Date(e.event_date), now))
    } else if (activeTab === 'past') {
      result = result.filter((e) => e?.event_date && isBefore(new Date(e.event_date), now))
    }

    setFilteredEvents(result)
  }, [activeTab, allEvents])

  const now = new Date()
  const upcomingCount = allEvents.filter(
    (e) => e?.event_date && isAfter(new Date(e.event_date), now),
  ).length
  const pastCount = allEvents.filter(
    (e) => e?.event_date && isBefore(new Date(e.event_date), now),
  ).length

  if (loading) {
    return (
      <div
        style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Inter", sans-serif',
          color: 'var(--muted-text, #94A3B8)',
          backgroundColor: 'var(--bg-canvas, #070A14)',
        }}
      >
        Loading strategic event listings...
      </div>
    )
  }

  return (
    <HomeThemeWrapper breakingNewsTrack={null} trendingNavTrack={null}>
      <main
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--bg-canvas, #070A14)',
          fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
          color: 'var(--text-main, #E2E8F0)',
          padding: '48px 24px',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Header Section Indicator */}
          <div style={{ paddingLeft: '2px', marginBottom: '28px' }}>
            <span
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 800,
                color: 'var(--muted-text, #64748B)',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              STRATEGIC BRIEFINGS REGISTRY
            </span>
            <h1
              style={{
                fontSize: 'clamp(28px, 4vw, 38px)',
                margin: 0,
                fontWeight: 800,
                fontFamily: '"Playfair Display", Georgia, serif',
                color: 'var(--heading-color, #FFFFFF)',
                letterSpacing: '-0.01em',
              }}
            >
              Register Now & Join Conclaves
            </h1>
          </div>

          {/* 1. HORIZONTAL INTERACTIVE TIMELINE TABS */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '36px',
              borderBottom: '1px solid var(--border-color, #1E293B)',
              paddingBottom: '24px',
            }}
          >
            <button
              onClick={() => setActiveTab('upcoming')}
              style={{
                padding: '8px 18px',
                fontSize: '11px',
                fontWeight: '800',
                borderRadius: '4px',
                border: '1px solid',
                borderColor: activeTab === 'upcoming' ? '#656e36' : 'var(--border-color, #1E293B)',
                cursor: 'pointer',
                backgroundColor: activeTab === 'upcoming' ? '#656e36' : 'var(--card-bg, #0F1526)',
                color: activeTab === 'upcoming' ? '#FFFFFF' : 'var(--muted-text, #64748B)',
                letterSpacing: '0.03em',
              }}
            >
              UPCOMING EVENTS ({upcomingCount})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              style={{
                padding: '8px 18px',
                fontSize: '11px',
                fontWeight: '800',
                borderRadius: '4px',
                border: '1px solid',
                borderColor: activeTab === 'past' ? '#656e36' : 'var(--border-color, #1E293B)',
                cursor: 'pointer',
                backgroundColor: activeTab === 'past' ? '#656e36' : 'var(--card-bg, #0F1526)',
                color: activeTab === 'past' ? '#FFFFFF' : 'var(--muted-text, #64748B)',
                letterSpacing: '0.03em',
              }}
            >
              PAST EVENTS ({pastCount})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              style={{
                padding: '8px 18px',
                fontSize: '11px',
                fontWeight: '800',
                borderRadius: '4px',
                border: '1px solid',
                borderColor: activeTab === 'all' ? '#656e36' : 'var(--border-color, #1E293B)',
                cursor: 'pointer',
                backgroundColor: activeTab === 'all' ? '#656e36' : 'var(--card-bg, #0F1526)',
                color: activeTab === 'all' ? '#FFFFFF' : 'var(--muted-text, #64748B)',
                letterSpacing: '0.03em',
              }}
            >
              ALL INITIATIVES ({allEvents.length})
            </button>
          </div>

          {/* 2. MAIN SPECIFICATION CARD STACK */}
          {filteredEvents.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '64px 16px',
                border: '1px dashed var(--border-color, #1E293B)',
                borderRadius: '4px',
                color: 'var(--muted-text, #94A3B8)',
                backgroundColor: 'var(--card-bg, #0F1526)',
              }}
            >
              No dynamic event parameters matching this chronological scope.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {filteredEvents.map((event) => {
                const eventDateTime = event.event_date ? new Date(event.event_date) : null
                const formattedDay = eventDateTime ? format(eventDateTime, 'MMMM dd, yyyy') : 'TBD'
                const formattedTime = eventDateTime ? format(eventDateTime, 'hh:mm a') : 'TBD'
                const isUpcomingEvent = eventDateTime ? isAfter(eventDateTime, now) : true

                return (
                  <div
                    key={event.id}
                    className="editorial-card-item"
                    style={{
                      backgroundColor: 'var(--card-bg, #0F1526)',
                      border: '1px solid var(--border-color, #1E293B)',
                      borderRadius: '4px',
                      padding: '32px',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                    }}
                  >
                    {/* Badge Strip Layer */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '24px',
                      }}
                    >
                      <span
                        style={{
                          backgroundColor: isUpcomingEvent
                            ? '#D97706'
                            : 'var(--border-color, #1E293B)',
                          color: '#FFFFFF',
                          fontSize: '10px',
                          fontWeight: 800,
                          padding: '4px 10px',
                          borderRadius: '2px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {isUpcomingEvent ? 'Upcoming' : 'Concluded'}
                      </span>

                      <span
                        style={{
                          backgroundColor: event.registration_open ? '#10B981' : '#DC2626',
                          color: '#FFFFFF',
                          fontSize: '10px',
                          fontWeight: 800,
                          padding: '4px 10px',
                          borderRadius: '2px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {event.registration_open ? 'OPEN' : 'CLOSED'}
                      </span>
                    </div>

                    {/* Headline Matrix */}
                    <div style={{ marginBottom: '24px' }}>
                      <h2
                        style={{
                          fontSize: '24px',
                          fontFamily: '"Playfair Display", Georgia, serif',
                          fontWeight: 800,
                          color: 'var(--heading-color, #FFFFFF)',
                          margin: '0 0 14px 0',
                          lineHeight: '1.25',
                        }}
                      >
                        {event.title}
                      </h2>

                      {/* Lexical rich text description placeholder snippet extraction */}
                      <p
                        style={{
                          fontSize: '14.5px',
                          lineHeight: '1.65',
                          color: 'var(--text-main, #CBD5E1)',
                          margin: 0,
                        }}
                      >
                        {event.description && typeof event.description === 'object'
                          ? (event.description as any).root?.children?.[0]?.children?.[0]?.text ||
                            'Click details to view full timeline parameters.'
                          : 'Click details to view full timeline parameters.'}
                      </p>
                    </div>

                    {/* Meta Parameter Lines */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        fontSize: '13.5px',
                        color: 'var(--muted-text, #94A3B8)',
                        paddingTop: '20px',
                        borderTop: '1px solid var(--border-color, #1E293B)',
                        marginBottom: '24px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--muted-text, #64748B)' }}>📅</span>
                        <span>{formattedDay}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--muted-text, #64748B)' }}>🕒</span>
                        <span>{formattedTime}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--muted-text, #64748B)' }}>📍</span>
                        <span>
                          {event.location_name},{' '}
                          <span style={{ color: 'var(--heading-color, #FFFFFF)', fontWeight: 500 }}>
                            {event.location_city}
                          </span>
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: event.registration_open ? '#10B981' : '#DC2626' }}>
                          {event.registration_open ? '✓' : '✕'}
                        </span>
                        <span
                          style={{
                            color: event.registration_open ? '#10B981' : '#DC2626',
                            fontWeight: 600,
                          }}
                        >
                          {event.registration_open
                            ? 'Accepting delegate admission applications'
                            : 'Registration closed for this brief session'}
                        </span>
                      </div>
                    </div>

                    {/* Footer Row Controls */}
                    <div
                      style={{
                        paddingTop: '20px',
                        borderTop: '1px solid var(--border-color, #1E293B)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Link
                        href={`/events/${event.slug}`}
                        style={{
                          color: '#656e36',
                          textDecoration: 'none',
                          fontSize: '12px',
                          fontWeight: '800',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        DETAILS OVERVIEW →
                      </Link>

                      {event.registration_open && event.registration_url && (
                        <a
                          href={event.registration_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            backgroundColor: '#656e36',
                            color: '#FFFFFF',
                            padding: '10px 20px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '800',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                          }}
                        >
                          JOIN PANEL ↗
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </HomeThemeWrapper>
  )
}
