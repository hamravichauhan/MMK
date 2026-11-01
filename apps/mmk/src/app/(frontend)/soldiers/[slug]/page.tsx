import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Medal, Shield, Heart } from 'lucide-react'
import HomeThemeWrapper from '@/components/layout/HomeThemeWrapper'
import { getCloudinaryUrl } from '@/utils/mediaUrl'
import PrintCitationButton from '@/components/PrintCitationButton'

interface PageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'soldiers',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })

  const soldier = result.docs[0]
  if (!soldier) {
    return { title: 'Soldier Profile Not Found' }
  }

  const imageUrl = getCloudinaryUrl(soldier.photo, 'vikram-batra')
  const serviceYears = soldier.service_from ? `${soldier.service_from} — ${soldier.service_to || 'Present'}` : 'Indian Armed Forces'
  const description = `${soldier.rank} ${soldier.full_name} (${soldier.regiment_unit || 'Indian Armed Forces'}) — ${soldier.is_martyr ? 'Fallen Martyr & National Hero' : 'Living Veteran'}. Service: ${serviceYears}.`

  const cleanName = soldier.full_name.toLowerCase().startsWith(soldier.rank.toLowerCase())
    ? soldier.full_name
    : `${soldier.rank} ${soldier.full_name}`

  return {
    title: `${cleanName} | Know Your Soldiers`,
    description,
    openGraph: {
      title: `${cleanName} — Indian Armed Forces Tribute`,
      description,
      type: 'profile',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: soldier.full_name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: cleanName,
      description,
      images: [imageUrl],
    },
  }
}

export default async function SoldierProfilePage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

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

  const soldierPhoto =
    soldier.photo && typeof soldier.photo === 'object' ? (soldier.photo as Media) : null

  // Branch badge color coding
  const getBranchBadge = (branch?: string | null) => {
    switch (branch?.toLowerCase()) {
      case 'navy':
        return { bg: 'rgba(56, 189, 248, 0.15)', text: '#38BDF8', border: '#0284c7', label: '⚓ Indian Navy' }
      case 'airforce':
        return { bg: 'rgba(96, 165, 250, 0.15)', text: '#60A5FA', border: '#2563eb', label: '✈️ Indian Air Force' }
      case 'parasf':
        return { bg: 'rgba(239, 68, 68, 0.15)', text: '#F87171', border: '#dc2626', label: '⚔️ Para Special Forces' }
      default:
        return { bg: 'rgba(101, 110, 54, 0.15)', text: '#A3B158', border: '#656e36', label: '🇮🇳 Indian Army' }
    }
  }

  const branchMeta = getBranchBadge(soldier.branch)

  return (
    <HomeThemeWrapper breakingNewsTrack={null} trendingNavTrack={null}>
      <main
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '40px 24px 80px',
        }}
      >
        {/* Navigation Breadcrumb and Print Citation Action */}
        <div
          className="no-print"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '28px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <Link
            href="/know-your-soldiers"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--accent-color, #656E36)',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            <ArrowLeft size={16} /> Back to Know Your Soldiers
          </Link>
          <PrintCitationButton soldierName={soldier.full_name} rank={soldier.rank} />
        </div>

        <article
          style={{
            backgroundColor: 'var(--card-bg, #0F1526)',
            border: soldier.is_martyr
              ? '2px solid rgba(217, 119, 6, 0.4)'
              : '1px solid var(--border-color, #1E293B)',
            borderRadius: '12px',
            padding: '36px',
            boxShadow: soldier.is_martyr
              ? '0 0 25px rgba(217, 119, 6, 0.08)'
              : '0 4px 20px rgba(0,0,0,0.15)',
            position: 'relative',
          }}
        >
          {/* Top Hero Layout: Photo & Core Metadata Split */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px',
              alignItems: 'start',
              marginBottom: '32px',
            }}
          >
            {/* Portrait Asset */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '1/1',
                width: '100%',
                maxHeight: '380px',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: 'var(--subtle-bg, #090D1A)',
                border: '1px solid var(--border-color, #1E293B)',
              }}
            >
              {soldierPhoto ? (
                <Image
                  src={getCloudinaryUrl(soldierPhoto, 'vikram-batra')}
                  alt={soldierPhoto.alt || soldier.full_name}
                  fill
                  priority
                  unoptimized
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--muted-text, #64748B)',
                    gap: '12px',
                  }}
                >
                  <Shield size={48} opacity={0.4} />
                  <span style={{ fontSize: '13px' }}>Official Military Portrait</span>
                </div>
              )}

              {soldier.is_martyr && (
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: '#DC2626',
                    color: '#FFFFFF',
                    padding: '5px 12px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                  }}
                >
                  Veer Gatha Hero
                </div>
              )}
            </div>

            {/* Soldier Header & Dossier Matrix */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                <span
                  style={{
                    backgroundColor: branchMeta.bg,
                    color: branchMeta.text,
                    border: `1px solid ${branchMeta.border}`,
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {branchMeta.label}
                </span>

                <span
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid var(--border-color, #1E293B)',
                    color: 'var(--text-color, #E2E8F0)',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  {soldier.rank}
                </span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(28px, 4vw, 36px)',
                  fontWeight: 800,
                  margin: '0',
                  color: 'var(--text-color, #E2E8F0)',
                  fontFamily: '"Playfair Display", Georgia, serif',
                  lineHeight: '1.2',
                }}
              >
                {soldier.full_name}
              </h1>

              {soldier.short_bio && (
                <p
                  style={{
                    fontSize: '15px',
                    lineHeight: '1.6',
                    color: 'var(--muted-text, #94A3B8)',
                    margin: 0,
                    fontStyle: 'italic',
                    borderLeft: '3px solid var(--accent-color, #656E36)',
                    paddingLeft: '14px',
                  }}
                >
                  &ldquo;{soldier.short_bio}&rdquo;
                </p>
              )}

              {/* Informative Profile Summary List */}
              <div
                style={{
                  backgroundColor: 'var(--subtle-bg, #090D1A)',
                  border: '1px solid var(--border-color, #1E293B)',
                  borderRadius: '8px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  fontSize: '14px',
                }}
              >
                {soldier.regiment_unit && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--muted-text, #64748B)', fontWeight: 600 }}>Regiment / Unit:</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-color, #E2E8F0)' }}>
                      {soldier.regiment_unit}
                    </span>
                  </div>
                )}

                {soldier.home_state && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--muted-text, #64748B)', fontWeight: 600 }}>Home State:</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-color, #E2E8F0)' }}>
                      {soldier.home_state}
                    </span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted-text, #64748B)', fontWeight: 600 }}>Service Timeline:</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-color, #E2E8F0)' }}>
                    {soldier.service_from || 'N/A'} –{' '}
                    {soldier.service_to || (soldier.is_martyr ? 'Supreme Sacrifice' : 'Present')}
                  </span>
                </div>

                {soldier.awards && (
                  <div
                    style={{
                      borderTop: '1px solid var(--border-color, #1E293B)',
                      paddingTop: '10px',
                      marginTop: '4px',
                    }}
                  >
                    <span
                      style={{
                        color: '#D97706',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Medal size={16} /> {soldier.awards}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Narrative Biography RichText Content Area */}
          <div
            style={{
              borderTop: '1px solid var(--border-color, #1E293B)',
              paddingTop: '28px',
              marginBottom: '32px',
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
              Detailed Military Biography & Exploits
            </h3>
            <div
              className="prose"
              style={{
                fontSize: '16px',
                lineHeight: '1.8',
                color: 'var(--text-color, #E2E8F0)',
              }}
            >
              <RichText data={soldier.story} />
            </div>
          </div>

          {/* Veer Gatha Tribute Section condition block */}
          {soldier.is_martyr && (
            <div
              style={{
                padding: '28px',
                borderRadius: '8px',
                backgroundColor: 'rgba(220, 38, 38, 0.08)',
                border: '1px solid rgba(220, 38, 38, 0.35)',
                borderLeft: '6px solid #DC2626',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Heart size={20} color="#DC2626" />
                <h4
                  style={{
                    fontSize: '19px',
                    fontWeight: 800,
                    color: '#EF4444',
                    margin: 0,
                    fontFamily: '"Playfair Display", Georgia, serif',
                  }}
                >
                  Veer Gatha Tribute {soldier.operation_name ? `— ${soldier.operation_name}` : ''}
                </h4>
              </div>

              {(soldier.martyrdom_location || soldier.martyrdom_date) && (
                <p
                  style={{
                    fontSize: '13.5px',
                    color: '#F87171',
                    margin: '0 0 16px 0',
                    fontWeight: 600,
                  }}
                >
                  Supreme Sacrifice{' '}
                  {soldier.martyrdom_location ? `at ${soldier.martyrdom_location}` : ''}
                  {soldier.martyrdom_date ? ` • ${soldier.martyrdom_date}` : ''}
                </p>
              )}

              {soldier.tribute && (
                <div
                  className="prose"
                  style={{
                    fontSize: '15.5px',
                    lineHeight: '1.7',
                    color: 'var(--text-color, #E2E8F0)',
                  }}
                >
                  <RichText data={soldier.tribute} />
                </div>
              )}
            </div>
          )}
        </article>
      </main>
    </HomeThemeWrapper>
  )
}
