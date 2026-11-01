import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Media } from '@/payload-types'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, MapPin, CheckCircle, XCircle } from 'lucide-react'
import HomeThemeWrapper from '@/components/layout/HomeThemeWrapper'
import { getCloudinaryUrl } from '@/utils/mediaUrl'

interface PageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })

  const eventItem = result.docs[0]
  if (!eventItem) {
    return { title: 'Event Not Found' }
  }

  const imageUrl = getCloudinaryUrl(eventItem.cover_image, 'summit-conclave')
  const venue = eventItem.location_name || eventItem.location_city || 'National Security Conclave'
  const description = `${eventItem.title} — Scheduled event at ${venue}. Date: ${eventItem.event_date ? format(new Date(eventItem.event_date), 'MMMM dd, yyyy') : 'TBA'}.`

  return {
    title: `${eventItem.title} | Events`,
    description,
    openGraph: {
      title: eventItem.title,
      description,
      images: [imageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: eventItem.title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'events',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
    limit: 1,
  })

  const eventItem = result.docs[0]
  if (!eventItem) return notFound()

  const coverImage =
    eventItem.cover_image && typeof eventItem.cover_image === 'object'
      ? (eventItem.cover_image as Media)
      : null

  const formattedDate = eventItem.event_date
    ? format(new Date(eventItem.event_date), 'MMMM dd, yyyy @ hh:mm a')
    : 'Date TBD'

  return (
    <HomeThemeWrapper breakingNewsTrack={null} trendingNavTrack={null}>
      <main
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '40px 24px 80px',
        }}
      >
        {/* Navigation Breadcrumb */}
        <Link
          href="/events"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--accent-color, #656E36)',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 600,
            marginBottom: '28px',
          }}
        >
          <ArrowLeft size={16} /> Back to Strategic Events
        </Link>

        <article
          style={{
            backgroundColor: 'var(--card-bg, #0F1526)',
            border: '1px solid var(--border-color, #1E293B)',
            borderRadius: '12px',
            padding: '36px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          }}
        >
          {/* Cover Image Banner */}
          {coverImage ? (
            <div
              style={{
                position: 'relative',
                marginBottom: '32px',
                overflow: 'hidden',
                borderRadius: '8px',
                height: '420px',
                width: '100%',
                border: '1px solid var(--border-color, #1E293B)',
              }}
            >
              <Image
                src={getCloudinaryUrl(coverImage, 'summit-conclave')}
                alt={coverImage.alt || eventItem.title}
                fill
                priority
                unoptimized
                style={{ objectFit: 'cover' }}
              />
            </div>
          ) : (
            <div
              style={{
                padding: '60px 0',
                backgroundColor: 'var(--subtle-bg, #090D1A)',
                textAlign: 'center',
                marginBottom: '32px',
                borderRadius: '8px',
                color: 'var(--muted-text, #64748B)',
                border: '1px dashed var(--border-color, #1E293B)',
              }}
            >
              No Cover Image Uploaded
            </div>
          )}

          {/* Registration Status Banner Box */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              backgroundColor: eventItem.registration_open
                ? 'rgba(34, 197, 94, 0.12)'
                : 'rgba(239, 68, 68, 0.12)',
              border: `1px solid ${
                eventItem.registration_open
                  ? 'rgba(34, 197, 94, 0.35)'
                  : 'rgba(239, 68, 68, 0.35)'
              }`,
              padding: '14px 20px',
              borderRadius: '8px',
              marginBottom: '28px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {eventItem.registration_open ? (
                <CheckCircle size={18} color="#22c55e" />
              ) : (
                <XCircle size={18} color="#ef4444" />
              )}
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: eventItem.registration_open ? '#22c55e' : '#ef4444',
                }}
              >
                {eventItem.registration_open ? 'Registrations Open' : 'Bookings Closed'}
              </span>
            </div>
            {eventItem.registration_open && eventItem.registration_url && (
              <a
                href={eventItem.registration_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: 'var(--accent-color, #656E36)',
                  color: '#FFFFFF',
                  padding: '9px 18px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '13px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'opacity 0.2s ease',
                }}
              >
                Register Now →
              </a>
            )}
          </div>

          {/* Event Main Headings */}
          <h1
            style={{
              fontSize: 'clamp(26px, 4vw, 38px)',
              fontWeight: 800,
              margin: '0 0 24px 0',
              color: 'var(--text-color, #E2E8F0)',
              fontFamily: '"Playfair Display", Georgia, serif',
              lineHeight: '1.25',
            }}
          >
            {eventItem.title}
          </h1>

          {/* Venue and Timing Parameters Details Card Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              backgroundColor: 'var(--subtle-bg, #090D1A)',
              border: '1px solid var(--border-color, #1E293B)',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '32px',
            }}
          >
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <Calendar size={20} color="var(--accent-color, #656E36)" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <h5
                  style={{
                    margin: '0 0 4px 0',
                    color: 'var(--muted-text, #64748B)',
                    textTransform: 'uppercase',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    fontWeight: 700,
                  }}
                >
                  Date & Schedule
                </h5>
                <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-color, #E2E8F0)', fontSize: '14.5px' }}>
                  {formattedDate}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <MapPin size={20} color="var(--accent-color, #656E36)" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <h5
                  style={{
                    margin: '0 0 4px 0',
                    color: 'var(--muted-text, #64748B)',
                    textTransform: 'uppercase',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    fontWeight: 700,
                  }}
                >
                  Location Venue
                </h5>
                <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-color, #E2E8F0)', fontSize: '14.5px' }}>
                  {eventItem.location_name || 'Auditorium'}
                </p>
                {eventItem.location_city && (
                  <p style={{ margin: '2px 0 0 0', color: 'var(--muted-text, #64748B)', fontSize: '13.5px' }}>
                    {eventItem.location_city}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Dynamic RichText Outline Content Block */}
          <div
            style={{
              borderTop: '1px solid var(--border-color, #1E293B)',
              paddingTop: '28px',
            }}
          >
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 700,
                marginBottom: '16px',
                color: 'var(--text-color, #E2E8F0)',
              }}
            >
              About This Strategic Briefing
            </h3>
            <div
              className="prose"
              style={{
                fontSize: '16px',
                lineHeight: '1.8',
                color: 'var(--text-color, #E2E8F0)',
              }}
            >
              <RichText data={eventItem.description} />
            </div>
          </div>
        </article>
      </main>
    </HomeThemeWrapper>
  )
}
