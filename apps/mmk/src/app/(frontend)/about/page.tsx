import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { Download, Tv } from 'lucide-react'
import HomeThemeWrapper from '@/components/layout/HomeThemeWrapper'
import { getCloudinaryUrl } from '@/utils/mediaUrl'

export const revalidate = 120

export const metadata: Metadata = {
  title: 'About Major Madhan Kumar (Retd) — Career, Honors & Authority Profile',
  description:
    'Biographical timeline, military decorations, corporate leadership, and media citations of Major Madhan Kumar (Retd), veteran Indian Army officer and defense analyst.',
}

export default async function AboutPage() {
  const payload = await getPayload({ config: configPromise })

  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  const mediaKitUrl =
    (siteSettings as any)?.media_kit?.download_url ||
    'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/major-madhan.webp'

  const careerMilestones = [
    {
      period: '1996 — 2010',
      title: 'Indian Armed Forces (Tactical Command)',
      description:
        'Commissioned officer serving across critical forward operational sectors. Led frontline mountain warfare operations, counter-insurgency deployments, and border security detachments along contested northern and western sectors.',
      badge: 'Military Service',
    },
    {
      period: '2011 — 2018',
      title: 'Corporate Leadership & Risk Strategy',
      description:
        'Advised multinational defense corporations, enterprise security infrastructure providers, and supply-chain logistics networks on geopolitical threat assessments, crisis management, and cross-border regulatory compliance.',
      badge: 'Executive Advisory',
    },
    {
      period: '2019 — Present',
      title: 'Geopolitical Analyst, Author & Public Voice',
      description:
        'Established India’s premier independent strategic intelligence platform with over 850,000 global subscribers. Author of Operation Sindoor and creator of the landmark digital series Making The Unbreakable.',
      badge: 'National Security Authority',
    },
  ]

  const mediaCitations = [
    {
      outlet: 'Firstpost Defense Briefing',
      role: 'Special Geopolitical Columnist',
      topic: 'Indo-Pacific maritime chokepoints and asymmetric drone air defense models',
    },
    {
      outlet: 'National Television Panels (Times Now / Republic)',
      role: 'Prime Time Defense Analyst',
      topic: 'Live analysis on border tactical developments, theater commands, and cross-border security',
    },
    {
      outlet: 'Raisina Geopolitical Conclaves',
      role: 'Keynote Speaker & Moderator',
      topic: 'Future of autonomous warfare, supply chain security, and subcontinental defense strategy',
    },
    {
      outlet: 'Defense Expo & Strategic Seminars',
      role: 'Subject Matter Expert',
      topic: 'Indigenous defense manufacturing (Make in India) and next-gen electronic warfare',
    },
  ]

  return (
    <HomeThemeWrapper breakingNewsTrack={null} trendingNavTrack={null}>
      <div style={{ padding: '60px 0 80px', minHeight: '80vh' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          {/* Section Indicator */}
          <div
            style={{ borderLeft: '4px solid var(--accent-color, #656e36)', paddingLeft: '14px', marginBottom: '32px' }}
          >
            <span
              style={{
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 700,
                color: 'var(--muted-text, #64748B)',
              }}
            >
              Profile & Authority Hub
            </span>
            <h1
              style={{
                fontSize: 'clamp(30px, 5vw, 44px)',
                margin: '8px 0 0 0',
                fontWeight: 800,
                fontFamily: '"Playfair Display", Georgia, serif',
                color: 'var(--text-color, #E2E8F0)',
              }}
            >
              About Major Madhan Kumar (Retd)
            </h1>
          </div>

          {/* Editorial Split Row Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              alignItems: 'start',
              marginBottom: '64px',
            }}
          >
            {/* Left Box Portrait Headshot Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '4/5',
                  width: '100%',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color, #1E293B)',
                  backgroundColor: 'var(--card-bg, #0F1526)',
                }}
                className="editorial-card-item"
              >
                <Image
                  src={getCloudinaryUrl((siteSettings as any)?.profile_photo, 'major-madhan')}
                  alt={siteSettings?.site_name || 'Major Madhan Kumar'}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 40vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Stat Counters Matrix Block */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    padding: '16px 8px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--card-bg, #0F1526)',
                    border: '1px solid var(--border-color, #1E293B)',
                  }}
                  className="editorial-card-item"
                >
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#D97706' }}>850K+</div>
                  <div
                    style={{ fontSize: '11px', textTransform: 'uppercase', marginTop: '4px' }}
                    className="themed-sub-text"
                  >
                    Global Reach
                  </div>
                </div>
                <div
                  style={{
                    padding: '16px 8px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--card-bg, #0F1526)',
                    border: '1px solid var(--border-color, #1E293B)',
                  }}
                  className="editorial-card-item"
                >
                  <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--accent-color, #656e36)' }}>609K+</div>
                  <div
                    style={{ fontSize: '11px', textTransform: 'uppercase', marginTop: '4px' }}
                    className="themed-sub-text"
                  >
                    YouTube
                  </div>
                </div>
                <div
                  style={{
                    padding: '16px 8px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--card-bg, #0F1526)',
                    border: '1px solid var(--border-color, #1E293B)',
                  }}
                  className="editorial-card-item"
                >
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#DC2626' }}>28+</div>
                  <div
                    style={{ fontSize: '11px', textTransform: 'uppercase', marginTop: '4px' }}
                    className="themed-sub-text"
                  >
                    Service Yrs
                  </div>
                </div>
              </div>
            </div>

            {/* Right Box Biography Dossier Narrative Text Matrix */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  lineHeight: '1.6',
                  color: 'var(--text-color, #E2E8F0)',
                }}
              >
                Major Madhan Kumar (Retd) is a veteran of the Indian Armed Forces, strategic
                defense analyst, and an authoritative voice on global geopolitics, national security, and
                military technology affairs.
              </div>

              <div
                style={{
                  fontSize: '15.5px',
                  lineHeight: '1.8',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
                className="themed-sub-text"
              >
                <p>
                  Throughout a distinguished military and executive career spanning nearly three decades,
                  Major Kumar has commanded tactical assets across contested frontiers, providing firsthand
                  command perspectives on low-intensity conflicts, asymmetric warfare, and high-altitude
                  operational logistics.
                </p>
                <p>
                  Following his transition to public strategic advisory, he has spearheaded national defense
                  literacy. Today, his analytical publications, live broadcast briefings, and documentary
                  productions reach an audience exceeding 850,000 security specialists, defense personnel, and
                  citizens worldwide.
                </p>
                <p>
                  This digital authority platform functions as an automated intelligence repository—housing
                  daily breaking geopolitics analyses, in-depth defense reviews, honor rolls for fallen
                  and decorated soldiers (&ldquo;Know Your Soldiers&rdquo;), and registrations for national security conclaves.
                </p>
              </div>

              {/* Action Buttons Link Bar */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '12px' }}>
                <Link
                  href="/articles"
                  style={{
                    padding: '12px 24px',
                    backgroundColor: 'var(--accent-color, #656e36)',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontWeight: 700,
                    borderRadius: '4px',
                    fontSize: '14px',
                    textAlign: 'center',
                  }}
                >
                  Read Strategic Analysis
                </Link>
                <Link
                  href="/know-your-soldiers"
                  style={{
                    padding: '12px 24px',
                    textDecoration: 'none',
                    fontWeight: 700,
                    borderRadius: '4px',
                    fontSize: '14px',
                    border: '1px solid var(--border-color, #1E293B)',
                    textAlign: 'center',
                    color: 'inherit',
                    backgroundColor: 'var(--card-bg, #0F1526)',
                  }}
                  className="editorial-card-item"
                >
                  Honor List Database
                </Link>
                <Link
                  href="/contact"
                  style={{
                    padding: '12px 24px',
                    textDecoration: 'none',
                    fontWeight: 700,
                    borderRadius: '4px',
                    fontSize: '14px',
                    border: '1px solid var(--border-color, #1E293B)',
                    textAlign: 'center',
                    color: 'inherit',
                    backgroundColor: 'var(--card-bg, #0F1526)',
                  }}
                  className="editorial-card-item"
                >
                  Speaking Inquiries
                </Link>
              </div>
            </div>
          </div>

          {/* Section: Career Milestones Timeline */}
          <section style={{ marginBottom: '64px' }}>
            <div style={{ borderLeft: '4px solid var(--accent-color, #656e36)', paddingLeft: '14px', marginBottom: '28px' }}>
              <span
                style={{
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 700,
                  color: 'var(--muted-text, #64748B)',
                }}
              >
                Track Record & Pedigree
              </span>
              <h2
                style={{
                  fontSize: '28px',
                  margin: '6px 0 0',
                  fontWeight: 800,
                  fontFamily: '"Playfair Display", Georgia, serif',
                  color: 'var(--text-color, #E2E8F0)',
                }}
              >
                Career Milestones Timeline
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {careerMilestones.map((milestone, idx) => (
                <div
                  key={idx}
                  className="editorial-card-item"
                  style={{
                    backgroundColor: 'var(--card-bg, #0F1526)',
                    border: '1px solid var(--border-color, #1E293B)',
                    borderRadius: '8px',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          color: 'var(--accent-color, #656e36)',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {milestone.badge}
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted-text, #64748B)' }}>
                        {milestone.period}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        margin: '0 0 12px 0',
                        color: 'var(--text-color, #E2E8F0)',
                        lineHeight: '1.3',
                      }}
                    >
                      {milestone.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '14px',
                        lineHeight: '1.6',
                        color: 'var(--muted-text, #94A3B8)',
                        margin: 0,
                      }}
                    >
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Media Mentions & Citations */}
          <section style={{ marginBottom: '64px' }}>
            <div style={{ borderLeft: '4px solid #D97706', paddingLeft: '14px', marginBottom: '28px' }}>
              <span
                style={{
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 700,
                  color: 'var(--muted-text, #64748B)',
                }}
              >
                Press & TV Debates
              </span>
              <h2
                style={{
                  fontSize: '28px',
                  margin: '6px 0 0',
                  fontWeight: 800,
                  fontFamily: '"Playfair Display", Georgia, serif',
                  color: 'var(--text-color, #E2E8F0)',
                }}
              >
                Media Mentions & Citations
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {mediaCitations.map((item, idx) => (
                <div
                  key={idx}
                  className="editorial-card-item"
                  style={{
                    backgroundColor: 'var(--card-bg, #0F1526)',
                    border: '1px solid var(--border-color, #1E293B)',
                    borderRadius: '8px',
                    padding: '24px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <Tv size={16} color="#D97706" />
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: '#D97706' }}>
                      {item.role}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 8px 0', color: 'var(--text-color, #E2E8F0)' }}>
                    {item.outlet}
                  </h4>
                  <p style={{ fontSize: '13.5px', color: 'var(--muted-text, #94A3B8)', margin: 0, lineHeight: '1.5' }}>
                    {item.topic}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Downloadable Media Kit */}
          <section>
            <div
              className="editorial-card-item"
              style={{
                backgroundColor: 'var(--card-bg, #0F1526)',
                border: '1px solid var(--border-color, #1E293B)',
                borderRadius: '12px',
                padding: '36px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '24px',
              }}
            >
              <div style={{ maxWidth: '680px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 700,
                    color: 'var(--accent-color, #656e36)',
                  }}
                >
                  Event Organizers & Press Desk
                </span>
                <h3
                  style={{
                    fontSize: '24px',
                    fontWeight: 800,
                    margin: '8px 0 10px 0',
                    fontFamily: '"Playfair Display", Georgia, serif',
                    color: 'var(--text-color, #E2E8F0)',
                  }}
                >
                  Download Official Speaker & Press Kit (v2.0)
                </h3>
                <p
                  style={{
                    fontSize: '14.5px',
                    color: 'var(--muted-text, #94A3B8)',
                    margin: 0,
                    lineHeight: '1.6',
                  }}
                >
                  Includes comprehensive biography, approved high-resolution portraits, speaking engagement guidelines,
                  panel discussion topics, and technical rider for national security seminars and defense conclaves.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href={mediaKitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Major_Madhan_Kumar_PressKit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    backgroundColor: 'var(--accent-color, #656e36)',
                    color: '#FFFFFF',
                    borderRadius: '4px',
                    fontWeight: 700,
                    fontSize: '13.5px',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  <Download size={16} /> Download Press Kit
                </a>
                <Link
                  href="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    border: '1px solid var(--border-color, #1E293B)',
                    color: 'var(--text-color, #E2E8F0)',
                    backgroundColor: 'var(--subtle-bg, #090D1A)',
                    borderRadius: '4px',
                    fontWeight: 700,
                    fontSize: '13.5px',
                    textDecoration: 'none',
                  }}
                >
                  Book for Keynote
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </HomeThemeWrapper>
  )
}
