import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Media } from '@/payload-types'
import { format } from 'date-fns'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function EventDetailPage({ params }: PageProps) {
  // Await the Next.js dynamic routing path parameters
  const { slug } = await params

  const payload = await getPayload({ config: configPromise })

  // Find the unique event matching the URL segment slug
  const result = await payload.find({
    collection: 'events',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1, // Resolves the relationship link object to the Media collection
    limit: 1,
  })

  const eventItem = result.docs[0]
  if (!eventItem) return notFound()

  // Safely grab your linked cover image mapping object
  const coverImage =
    eventItem.cover_image && typeof eventItem.cover_image === 'object'
      ? (eventItem.cover_image as Media)
      : null

  // Format the event date/time cleanly (e.g., May 30, 2026 at 06:30 PM)
  const formattedDate = eventItem.event_date
    ? format(new Date(eventItem.event_date), 'MMMM dd, yyyy @ hh:mm a')
    : 'Date TBD'

  return (
    <main
      style={{
        maxWidth: '800px',
        margin: '40px auto',
        padding: '0 20px',
        fontFamily: 'sans-serif',
        color: '#1e293b',
      }}
    >
      <article
        style={{
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '32px',
          backgroundColor: '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        {/* Render Cloudinary Hosted Cover Image Banner */}
        {coverImage?.url ? (
          <div
            style={{
              marginBottom: '28px',
              overflow: 'hidden',
              borderRadius: '8px',
              maxHeight: '400px',
              border: '1px solid #f1f5f9',
            }}
          >
            <img
              src={coverImage.url}
              alt={coverImage.alt || eventItem.title}
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
            />
          </div>
        ) : (
          <div
            style={{
              padding: '60px 0',
              backgroundColor: '#f8fafc',
              textAlign: 'center',
              marginBottom: '28px',
              borderRadius: '8px',
              color: '#94a3b8',
              border: '1px dashed #cbd5e1',
            }}
          >
            No Cover Image Uploaded
          </div>
        )}

        {/* Dynamic Registration Status Banner Box */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: eventItem.registration_open ? '#f0fdf4' : '#fef2f2',
            border: `1px solid ${eventItem.registration_open ? '#bbf7d0' : '#fee2e2'}`,
            padding: '12px 20px',
            borderRadius: '8px',
            marginBottom: '24px',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: eventItem.registration_open ? '#166534' : '#991b1b',
              }}
            >
              {eventItem.registration_open ? '● Registrations Open' : '✕ Bookings Closed'}
            </span>
          </div>
          {eventItem.registration_open && (
            <button
              style={{
                backgroundColor: '#0f172a',
                color: '#fff',
                border: '0',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              Register Now
            </button>
          )}
        </div>

        {/* Event Main Headings */}
        <h1
          style={{
            fontSize: '38px',
            fontWeight: '800',
            margin: '0 0 20px 0',
            color: '#0f172a',
            // ✅ FIXED TYPO: Changed from trackingWidth to type-safe letterSpacing
            letterSpacing: '-0.5px',
            lineHeight: '1.2',
          }}
        >
          {eventItem.title}
        </h1>

        {/* Venue and Timing Parameters Details Card Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            backgroundColor: '#f8fafc',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '32px',
            fontSize: '15px',
          }}
        >
          <div>
            <h5
              style={{
                margin: '0 0 6px 0',
                color: '#64748b',
                textTransform: 'uppercase',
                fontSize: '11px',
                letterSpacing: '0.5px',
              }}
            >
              Date & Schedule
            </h5>
            <p style={{ margin: 0, fontWeight: '600', color: '#334155' }}>{formattedDate}</p>
          </div>
          <div>
            <h5
              style={{
                margin: '0 0 6px 0',
                color: '#64748b',
                textTransform: 'uppercase',
                fontSize: '11px',
                letterSpacing: '0.5px',
              }}
            >
              Location Venue
            </h5>
            <p style={{ margin: 0, fontWeight: '600', color: '#334155' }}>
              {eventItem.location_name}
            </p>
            <p style={{ margin: '2px 0 0 0', color: '#475569', fontSize: '14px' }}>
              {eventItem.location_city}
            </p>
          </div>
        </div>

        {/* Dynamic RichText Outline Content Block */}
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '28px' }}>
          <h3
            style={{ fontSize: '20px', fontWeight: '700', marginBottom: '14px', color: '#0f172a' }}
          >
            About This Event
          </h3>
          <div
            className="prose prose-slate"
            style={{ fontSize: '16px', lineHeight: '1.7', color: '#334155' }}
          >
            <RichText data={eventItem.description} />
          </div>
        </div>
      </article>
    </main>
  )
}
