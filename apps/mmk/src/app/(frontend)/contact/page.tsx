'use client'

import React, { useState } from 'react'
import { MapPin, Send, CheckCircle2, Shield, Calendar, Tv, Briefcase } from 'lucide-react'
import HomeThemeWrapper from '@/components/layout/HomeThemeWrapper'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    inquiry_type: 'speaking',
    subject: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      if (formData.full_name.trim().length < 3) {
        throw new Error('Name must be at least 3 characters long.')
      }

      const res = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.errors?.[0]?.message || 'Failed to dispatch inquiry.')
      }

      setSuccess(true)
      setFormData({
        full_name: '',
        email: '',
        inquiry_type: 'speaking',
        subject: '',
        message: '',
      })
    } catch (err: any) {
      setError(err.message || 'An error occurred while submitting your inquiry.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <HomeThemeWrapper breakingNewsTrack={null} trendingNavTrack={null}>
      <main style={{ minHeight: '100vh', paddingBottom: '80px' }}>
        {/* Hero Banner Header */}
        <section
          style={{
            padding: '56px 24px',
            borderBottom: '1px solid var(--border-color, #1E293B)',
            background: 'radial-gradient(circle at top right, var(--card-bg, #0F172A) 0%, var(--bg-color, #070A14) 100%)',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(101, 110, 54, 0.15)',
                border: '1px solid #656e36',
                color: '#A3B158',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                padding: '4px 10px',
                borderRadius: '4px',
                marginBottom: '14px',
                letterSpacing: '0.05em',
              }}
            >
              <Shield size={12} /> Strategic Communications Desk
            </div>
            <h1
              style={{
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 800,
                margin: '0 0 12px 0',
                color: 'var(--heading-color, #FFFFFF)',
                lineHeight: '1.2',
              }}
            >
              Contact & Inquiries
            </h1>
            <p
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                maxWidth: '720px',
                margin: 0,
                color: 'var(--muted-text, #94A3B8)',
              }}
            >
              Direct institutional channel for keynote speaking invitations, defense summits, television and podcast appearances, strategic security consultations, and publication licensing.
            </p>
          </div>
        </section>

        {/* Content Section: 2 Columns */}
        <section style={{ maxWidth: '1200px', margin: '48px auto 0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'flex-start',
            }}
          >
            {/* Left Column: Direct Channels & Information */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div
                style={{
                  backgroundColor: 'var(--card-bg, #0F1526)',
                  border: '1px solid var(--border-color, #1E293B)',
                  borderRadius: '8px',
                  padding: '28px',
                }}
              >
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    margin: '0 0 16px 0',
                    color: 'var(--heading-color, #FFFFFF)',
                  }}
                >
                  Direct Department Contacts
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(101, 110, 54, 0.15)',
                        border: '1px solid #656e36',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#A3B158',
                        flexShrink: 0,
                      }}
                    >
                      <Calendar size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted-text, #94A3B8)', letterSpacing: '0.04em' }}>
                        Keynote & Speaking Engagements
                      </div>
                      <a href="mailto:speaking@majormadhankumar.com" style={{ textDecoration: 'none', color: 'var(--text-color, #E2E8F0)', fontSize: '14.5px', fontWeight: 600 }}>
                        speaking@majormadhankumar.com
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(217, 119, 6, 0.15)',
                        border: '1px solid #D97706',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#F59E0B',
                        flexShrink: 0,
                      }}
                    >
                      <Tv size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted-text, #94A3B8)', letterSpacing: '0.04em' }}>
                        Press, Television & Media Interviews
                      </div>
                      <a href="mailto:media@majormadhankumar.com" style={{ textDecoration: 'none', color: 'var(--text-color, #E2E8F0)', fontSize: '14.5px', fontWeight: 600 }}>
                        media@majormadhankumar.com
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(56, 189, 248, 0.15)',
                        border: '1px solid #38BDF8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#38BDF8',
                        flexShrink: 0,
                      }}
                    >
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted-text, #94A3B8)', letterSpacing: '0.04em' }}>
                        Defense Advisory & Strategic Research
                      </div>
                      <a href="mailto:advisory@majormadhankumar.com" style={{ textDecoration: 'none', color: 'var(--text-color, #E2E8F0)', fontSize: '14.5px', fontWeight: 600 }}>
                        advisory@majormadhankumar.com
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid var(--border-color, #1E293B)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--muted-text, #94A3B8)',
                        flexShrink: 0,
                      }}
                    >
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted-text, #94A3B8)', letterSpacing: '0.04em' }}>
                        Operations Base
                      </div>
                      <div style={{ color: 'var(--text-color, #E2E8F0)', fontSize: '14px' }}>
                        New Delhi • Chennai, India
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Note about response times */}
              <div
                style={{
                  padding: '20px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--subtle-bg, rgba(255,255,255,0.03))',
                  border: '1px solid var(--border-color, #1E293B)',
                  fontSize: '13.5px',
                  lineHeight: '1.6',
                  color: 'var(--muted-text, #94A3B8)',
                }}
              >
                <strong style={{ color: 'var(--heading-color, #FFFFFF)' }}>Operational Notice:</strong> Due to active defense speaking commitments and research deadlines, media inquiries and formal conference invites receive response priority within 24 to 48 operational hours.
              </div>
            </div>

            {/* Right Column: Lead Form */}
            <div
              style={{
                backgroundColor: 'var(--card-bg, #0F1526)',
                border: '1px solid var(--border-color, #1E293B)',
                borderRadius: '8px',
                padding: '32px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              }}
            >
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  margin: '0 0 8px 0',
                  color: 'var(--heading-color, #FFFFFF)',
                }}
              >
                Dispatch Formal Inquiry
              </h3>
              <p
                style={{
                  fontSize: '13.5px',
                  color: 'var(--muted-text, #94A3B8)',
                  margin: '0 0 24px 0',
                }}
              >
                Please fill out the requisition brief below. All dispatches are archived securely into the operational management ledger.
              </p>

              {success ? (
                <div
                  style={{
                    padding: '24px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(34, 197, 94, 0.12)',
                    border: '1px solid #22c55e',
                    textAlign: 'center',
                  }}
                >
                  <CheckCircle2 size={40} color="#22c55e" style={{ margin: '0 auto 12px auto' }} />
                  <h4 style={{ color: '#22c55e', margin: '0 0 6px 0', fontSize: '18px', fontWeight: 700 }}>
                    Inquiry Transmitted Successfully
                  </h4>
                  <p style={{ color: 'var(--text-color, #E2E8F0)', fontSize: '14px', margin: '0 0 16px 0', lineHeight: '1.5' }}>
                    Thank you. Your strategic inquiry has been recorded and routed to Major Madhan Kumar&apos;s executive office.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    style={{
                      padding: '8px 18px',
                      backgroundColor: '#22c55e',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '4px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Send Another Dispatch
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {error && (
                    <div
                      style={{
                        padding: '12px 16px',
                        borderRadius: '4px',
                        backgroundColor: 'rgba(220, 38, 38, 0.15)',
                        border: '1px solid #DC2626',
                        color: '#EF4444',
                        fontSize: '13.5px',
                      }}
                    >
                      {error}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted-text, #94A3B8)', marginBottom: '6px' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Col. Vikram Rathore / Dr. A. Sharma"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          padding: '10px 14px',
                          borderRadius: '4px',
                          backgroundColor: 'var(--input-bg, #0A0E1A)',
                          border: '1px solid var(--border-color, #1E293B)',
                          color: 'var(--text-color, #FFFFFF)',
                          fontSize: '14px',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted-text, #94A3B8)', marginBottom: '6px' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@organization.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          padding: '10px 14px',
                          borderRadius: '4px',
                          backgroundColor: 'var(--input-bg, #0A0E1A)',
                          border: '1px solid var(--border-color, #1E293B)',
                          color: 'var(--text-color, #FFFFFF)',
                          fontSize: '14px',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted-text, #94A3B8)', marginBottom: '6px' }}>
                      Inquiry Category *
                    </label>
                    <select
                      value={formData.inquiry_type}
                      onChange={(e) => setFormData({ ...formData, inquiry_type: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 14px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--input-bg, #0A0E1A)',
                        border: '1px solid var(--border-color, #1E293B)',
                        color: 'var(--text-color, #FFFFFF)',
                        fontSize: '14px',
                        outline: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="speaking">Keynote Speaking & Defense Conclave</option>
                      <option value="media">Television, Podcast & Press Interview</option>
                      <option value="consulting">Strategic Defense Advisory & Institutional Consultation</option>
                      <option value="general">General Inquiries & Book Signings</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted-text, #94A3B8)', marginBottom: '6px' }}>
                      Subject Line *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Invitation: Keynote Speaker for National Defense Conclave 2026"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 14px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--input-bg, #0A0E1A)',
                        border: '1px solid var(--border-color, #1E293B)',
                        color: 'var(--text-color, #FFFFFF)',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted-text, #94A3B8)', marginBottom: '6px' }}>
                      Message & Requisition Brief *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Please include event dates, venue location, target audience size, or specific intelligence topics requested..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '12px 14px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--input-bg, #0A0E1A)',
                        border: '1px solid var(--border-color, #1E293B)',
                        color: 'var(--text-color, #FFFFFF)',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        outline: 'none',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '13px 24px',
                      backgroundColor: '#656E36',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      opacity: submitting ? 0.7 : 1,
                      transition: 'all 0.2s ease',
                      marginTop: '6px',
                    }}
                    className="hover:opacity-90"
                  >
                    <Send size={15} />
                    <span>{submitting ? 'Transmitting Dispatch...' : 'Submit Strategic Inquiry'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
    </HomeThemeWrapper>
  )
}
