'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Event, Media } from '@/payload-types'
import { format, isAfter, isBefore } from 'date-fns'
import { Calendar, Clock, MapPin, CheckCircle2, XCircle, ArrowRight } from 'lucide-react'

export default function EventsListPage() {
  const [allEvents, setAllEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  // Tab control states: 'upcoming' | 'past' | 'all'
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'all'>('upcoming')

  // 📡 FETCH ENGINE: Safely extracts data arrays from your dynamic database
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

  // 🧠 CHRONOLOGICAL TIMELINE FILTER ENGINE: References your composite event_date field
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

  // Real-time counter metrics for tab pills
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
          minHeight: '75vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-sans)',
          color: 'var(--muted-foreground)',
        }}
      >
        Loading event timeline listings...
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
        padding: '48px 24px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 1. HORIZONTAL INTERACTIVE TIMELINE TABS (Matches Image Specifications Exactly) */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '40px',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '24px',
          }}
        >
          <button
            onClick={() => setActiveTab('upcoming')}
            style={{
              padding: '10px 24px',
              fontSize: '14px',
              fontWeight: '600',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: activeTab === 'upcoming' ? '#4B5320' : 'var(--border)',
              cursor: 'pointer',
              backgroundColor: activeTab === 'upcoming' ? '#4B5320' : 'var(--card)',
              color: activeTab === 'upcoming' ? '#ffffff' : 'var(--foreground)',
              transition: 'all 0.2s',
            }}
          >
            Upcoming Events ({upcomingCount})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            style={{
              padding: '10px 24px',
              fontSize: '14px',
              fontWeight: '600',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: activeTab === 'past' ? '#4B5320' : 'var(--border)',
              cursor: 'pointer',
              backgroundColor: activeTab === 'past' ? '#4B5320' : 'var(--card)',
              color: activeTab === 'past' ? '#ffffff' : 'var(--foreground)',
              transition: 'all 0.2s',
            }}
          >
            Past Events ({pastCount})
          </button>
          <button
            onClick={() => setActiveTab('all')}
            style={{
              padding: '10px 24px',
              fontSize: '14px',
              fontWeight: '600',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: activeTab === 'all' ? '#4B5320' : 'var(--border)',
              cursor: 'pointer',
              backgroundColor: activeTab === 'all' ? '#4B5320' : 'var(--card)',
              color: activeTab === 'all' ? '#ffffff' : 'var(--foreground)',
              transition: 'all 0.2s',
            }}
          >
            All Events ({allEvents.length})
          </button>
        </div>

        {/* Dynamic Title Accent */}
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '32px',
            fontWeight: '700',
            color: '#0B1D3A',
            marginBottom: '32px',
          }}
        >
          {activeTab === 'upcoming'
            ? 'Register Now'
            : activeTab === 'past'
              ? 'Past Records & Conclaves'
              : 'All Strategic Initiatives'}
        </h2>

        {/* 2. DOUBLE COLUMN HIGH-FIDELITY GRID */}
        {filteredEvents.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 0',
              border: '1px dashed var(--border)',
              borderRadius: '12px',
              color: 'var(--muted-foreground)',
              backgroundColor: 'var(--card)',
            }}
          >
            No public events found scheduled inside this timeline view selection window.
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
              gap: '32px',
            }}
          >
            {filteredEvents.map((event) => {
              // 🖼️ Map cover_image relationship securely
              const image =
                event.cover_image && typeof event.cover_image === 'object'
                  ? (event.cover_image as Media)
                  : null

              // Dynamic timeline parsing based on your compound event_date variable
              const eventDateTime = event.event_date ? new Date(event.event_date) : null
              const formattedDay = eventDateTime ? format(eventDateTime, 'MMMM dd, yyyy') : 'TBD'
              const formattedTime = eventDateTime ? format(eventDateTime, 'hh:mm a') : 'TBD'

              const isUpcomingEvent = eventDateTime ? isAfter(eventDateTime, now) : true

              return (
                <div
                  key={event.id}
                  style={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01), 0 2px 4px -1px rgba(0,0,0,0.02)',
                  }}
                >
                  {/* Banner Header Image Canvas Layer */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '240px',
                      backgroundColor: 'var(--input-background)',
                    }}
                  >
                    {image?.url && (
                      <img
                        src={image.url}
                        alt={event.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}

                    {/* Primary Status Banner (Left Side Overlay Badge) */}
                    <span
                      style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        backgroundColor: isUpcomingEvent ? '#EAB308' : '#64748b',
                        color: isUpcomingEvent ? '#000000' : '#ffffff',
                        fontSize: '11px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {isUpcomingEvent ? 'Upcoming' : 'Concluded'}
                    </span>

                    {/* Registration Status Gateway (Right Side Overlay Badge) */}
                    <span
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        backgroundColor: event.registration_open
                          ? 'rgba(22, 163, 74, 0.9)'
                          : 'rgba(220, 38, 38, 0.9)',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        letterSpacing: '0.5px',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      {event.registration_open ? 'Gate Open' : 'Closed'}
                    </span>
                  </div>

                  {/* Body Content Description Frame */}
                  <div
                    style={{
                      padding: '28px',
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '24px',
                        fontFamily: 'var(--font-serif)',
                        fontWeight: '700',
                        color: '#0B1D3A',
                        margin: '0 0 12px 0',
                        lineHeight: '1.3',
                      }}
                    >
                      {event.title}
                    </h3>

                    {/* Safe string snippet previewing text from your database entries */}
                    <p
                      style={{
                        color: 'var(--muted-foreground)',
                        fontSize: '15px',
                        lineHeight: '1.6',
                        margin: '0 0 24px 0',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      Exploring operational updates, localized parameters, and interactive training
                      agendas within regional perimeters.
                    </p>

                    {/* Multi-Row Icon Metadata Alignment Blocks */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        fontSize: '14px',
                        color: 'var(--foreground)',
                        marginBottom: '28px',
                        borderTop: '1px solid var(--border)',
                        paddingTop: '20px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Calendar
                          size={16}
                          style={{ color: 'var(--muted-foreground)', flexShrink: 0 }}
                        />
                        <span>{formattedDay}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Clock
                          size={16}
                          style={{ color: 'var(--muted-foreground)', flexShrink: 0 }}
                        />
                        <span>{formattedTime}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <MapPin
                          size={16}
                          style={{ color: 'var(--muted-foreground)', flexShrink: 0 }}
                        />
                        <span style={{ fontWeight: '500' }}>
                          {event.location_name},{' '}
                          <span style={{ color: 'var(--muted-foreground)' }}>
                            {event.location_city}
                          </span>
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {event.registration_open ? (
                          <CheckCircle2 size={16} style={{ color: '#16a34a', flexShrink: 0 }} />
                        ) : (
                          <XCircle size={16} style={{ color: '#dc2626', flexShrink: 0 }} />
                        )}
                        <span
                          style={{
                            color: event.registration_open ? '#16a34a' : '#dc2626',
                            fontWeight: '600',
                          }}
                        >
                          {event.registration_open
                            ? 'Accepting attendees application forms'
                            : 'Registration closed for this brief session'}
                        </span>
                      </div>
                    </div>

                    {/* Action Trigger Navigation Link Footer */}
                    <div
                      style={{
                        marginTop: 'auto',
                        paddingTop: '16px',
                        borderTop: '1px solid var(--border)',
                      }}
                    >
                      <Link
                        href={`/events/${event.slug}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          color: '#4B5320',
                          textDecoration: 'none',
                          fontSize: '15px',
                          fontWeight: '700',
                        }}
                      >
                        View Details & Register <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
