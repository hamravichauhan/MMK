import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Media } from '@/payload-types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function SoldierProfilePage({ params }: PageProps) {
  const { slug } = await params

  const payload = await getPayload({ config: configPromise })

  // Query database targeting your explicitly updated field schemas
  const result = await payload.find({
    collection: 'soldiers',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
  })

  const soldier = result.docs[0]
  if (!soldier) return notFound()

  // Safely grab the absolute photo reference object
  const soldierPhoto =
    soldier.photo && typeof soldier.photo === 'object' ? (soldier.photo as Media) : null

  return (
    <main
      style={{
        maxWidth: '700px',
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
        {/* Render Cloudinary Hosted Photo Asset */}
        {soldierPhoto?.url ? (
          <div
            style={{
              marginBottom: '24px',
              overflow: 'hidden',
              borderRadius: '8px',
              border: '1px solid #f1f5f9',
            }}
          >
            <img
              src={soldierPhoto.url}
              alt={soldierPhoto.alt || soldier.full_name}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        ) : (
          <div
            style={{
              padding: '60px 0',
              backgroundColor: '#f8fafc',
              textAlign: 'center',
              marginBottom: '24px',
              borderRadius: '8px',
              border: '1px dashed #cbd5e1',
              color: '#94a3b8',
            }}
          >
            No Profile Photo Available
          </div>
        )}

        {/* Soldier Meta Headers */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '12px',
          }}
        >
          <span
            style={{
              textTransform: 'uppercase',
              fontSize: '12px',
              fontWeight: 'bold',
              padding: '4px 8px',
              borderRadius: '4px',
              backgroundColor: '#eff6ff',
              color: '#1d4ed8',
            }}
          >
            {soldier.rank}
          </span>
          <span
            style={{
              textTransform: 'uppercase',
              fontSize: '12px',
              fontWeight: 'bold',
              padding: '4px 8px',
              borderRadius: '4px',
              backgroundColor: '#f0fdf4',
              color: '#166534',
            }}
          >
            {soldier.branch}
          </span>
          {soldier.is_martyr && (
            <span
              style={{
                textTransform: 'uppercase',
                fontSize: '12px',
                fontWeight: 'bold',
                padding: '4px 8px',
                borderRadius: '4px',
                backgroundColor: '#fef2f2',
                color: '#991b1b',
              }}
            >
              Martyr (Fallen Hero)
            </span>
          )}
        </div>

        <h1
          style={{
            fontSize: '36px',
            fontWeight: '800',
            margin: '0 0 16px 0',
            color: '#0f172a',
            letterSpacing: '-0.5px',
          }}
        >
          {soldier.full_name}
        </h1>

        {/* Informative Profile Summary List */}
        <div
          style={{
            backgroundColor: '#f8fafc',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '24px',
            fontSize: '15px',
          }}
        >
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Regiment / Unit:</strong> {soldier.regiment_unit}
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Home State:</strong> {soldier.home_state}
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Service Timeline:</strong> {soldier.service_from || 'N/A'} –{' '}
            {soldier.service_to || (soldier.is_martyr ? 'Martyred' : 'Present')}
          </p>
          {soldier.awards && (
            <p style={{ margin: '8px 0 0 0', paddingTop: '8px', borderTop: '1px solid #e2e8f0' }}>
              <strong>Decorations / Awards:</strong> {soldier.awards}
            </p>
          )}
        </div>

        <p
          style={{
            fontSize: '16px',
            lineHeight: '1.6',
            color: '#475569',
            fontStyle: 'italic',
            marginBottom: '28px',
            borderLeft: '4px solid #cbd5e1',
            paddingLeft: '16px',
          }}
        >
          {soldier.short_bio}
        </p>

        {/* Narrative Biography RichText Content Area */}
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
          <h3
            style={{ fontSize: '20px', fontWeight: '700', marginBottom: '14px', color: '#0f172a' }}
          >
            Detailed Biography
          </h3>
          <div
            className="prose prose-slate"
            style={{ fontSize: '16px', lineHeight: '1.7', color: '#334155' }}
          >
            <RichText data={soldier.story} />
          </div>
        </div>

        {/* Martyr Tribute Section Condition block */}
        {soldier.is_martyr && soldier.tribute && (
          <div
            style={{
              marginTop: '32px',
              padding: '24px',
              borderRadius: '8px',
              backgroundColor: '#fff5f5',
              border: '1px solid #fee2e2',
            }}
          >
            <h4
              style={{ fontSize: '18px', fontWeight: '700', color: '#991b1b', margin: '0 0 6px 0' }}
            >
              Veer Gatha Tribute {soldier.operation_name ? `— ${soldier.operation_name}` : ''}
            </h4>
            {soldier.martyrdom_location && (
              <p style={{ fontSize: '14px', color: '#b91c1c', margin: '0 0 12px 0' }}>
                Supreme Sacrifice at {soldier.martyrdom_location}
              </p>
            )}
            <div
              className="prose prose-red"
              style={{ fontSize: '15px', lineHeight: '1.6', color: '#7f1d1d' }}
            >
              <RichText data={soldier.tribute} />
            </div>
          </div>
        )}
      </article>
    </main>
  )
}
