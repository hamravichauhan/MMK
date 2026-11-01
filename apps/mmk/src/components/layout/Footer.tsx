'use client'

import React from 'react'
import Link from 'next/link'
import { X, Globe, Mail, Shield, ExternalLink } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      style={{
        backgroundColor: 'var(--footer-bg, #0B1120)',
        borderTop: '1px solid var(--border-color, #1E293B)',
        color: 'var(--muted-text, #94A3B8)',
        padding: '64px 24px 32px 24px',
        fontFamily: '"Inter", system-ui, sans-serif',
        fontSize: '14.5px',
        transition: 'background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Top Grid Area */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Column 1: Info and Social Handles */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  backgroundColor: '#4B5320',
                  width: '36px',
                  height: '36px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  flexShrink: 0,
                }}
              >
                <Shield size={20} />
              </div>
              <h3
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  margin: 0,
                  color: 'var(--heading-color, #FFFFFF)',
                }}
              >
                Major Madhan Kumar
              </h3>
            </div>
            <p
              style={{
                color: 'var(--muted-text, #94A3B8)',
                margin: '0 0 20px 0',
                maxWidth: '380px',
                lineHeight: '1.6',
                fontSize: '13.5px',
              }}
            >
              Indian Armed Forces veteran & strategic defense analyst delivering high-density intelligence, geopolitical assessments, and national security insights to over 850,000+ defense followers worldwide.
            </p>

            {/* Circular Social Buttons Wrapper */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                    </svg>
                  ),
                  href: 'https://www.youtube.com/@MajorMadhanKumar',
                  label: 'YouTube',
                },
                { icon: <X size={15} />, href: 'https://twitter.com/MajorMadhanKumar', label: 'Twitter/X' },
                { icon: <Globe size={15} />, href: 'https://majormadhankumar.in', label: 'Website' },
                { icon: <Mail size={15} />, href: 'mailto:contact@majormadhankumar.com', label: 'Email' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--card-bg, #0F1526)',
                    border: '1px solid var(--border-color, #1E293B)',
                    color: 'var(--text-color, #E2E8F0)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  className="hover:border-amber-500 hover:text-amber-400"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Intelligence & Media */}
          <div>
            <h4
              style={{
                color: 'var(--heading-color, #FFFFFF)',
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                margin: '0 0 16px 0',
              }}
            >
              Intelligence Hub
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/articles" style={{ textDecoration: 'none', color: 'var(--muted-text, #94A3B8)' }} className="hover:text-amber-400 transition-colors">
                Strategic Briefings
              </Link>
              <Link href="/videos" style={{ textDecoration: 'none', color: 'var(--muted-text, #94A3B8)' }} className="hover:text-amber-400 transition-colors">
                Video Broadcasts
              </Link>
              <Link href="/events" style={{ textDecoration: 'none', color: 'var(--muted-text, #94A3B8)' }} className="hover:text-amber-400 transition-colors">
                Conclaves & Summits
              </Link>
              <Link href="/gallery" style={{ textDecoration: 'none', color: 'var(--muted-text, #94A3B8)' }} className="hover:text-amber-400 transition-colors">
                Photo Archival Gallery
              </Link>
            </div>
          </div>

          {/* Column 3: Armed Forces & Community */}
          <div>
            <h4
              style={{
                color: 'var(--heading-color, #FFFFFF)',
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                margin: '0 0 16px 0',
              }}
            >
              Armed Forces & Store
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/soldiers" style={{ textDecoration: 'none', color: 'var(--muted-text, #94A3B8)' }} className="hover:text-amber-400 transition-colors">
                Know Your Soldiers (Honour Roll)
              </Link>
              <Link href="/merchandise" style={{ textDecoration: 'none', color: 'var(--muted-text, #94A3B8)' }} className="hover:text-amber-400 transition-colors">
                Official MMK Store
              </Link>
              <Link href="/about" style={{ textDecoration: 'none', color: 'var(--muted-text, #94A3B8)' }} className="hover:text-amber-400 transition-colors">
                Career & Biography
              </Link>
              <Link href="/contact" style={{ textDecoration: 'none', color: 'var(--muted-text, #94A3B8)' }} className="hover:text-amber-400 transition-colors">
                Contact & Speaking Invites
              </Link>
            </div>
          </div>

          {/* Column 4: Platform Operations */}
          <div>
            <h4
              style={{
                color: 'var(--heading-color, #FFFFFF)',
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                margin: '0 0 16px 0',
              }}
            >
              Author Works & Admin
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href="https://www.amazon.in/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'var(--muted-text, #94A3B8)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                className="hover:text-amber-400 transition-colors"
              >
                Operation Sindoor Book <ExternalLink size={11} />
              </a>
              <a
                href="https://www.youtube.com/@MajorMadhanKumar"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'var(--muted-text, #94A3B8)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                className="hover:text-amber-400 transition-colors"
              >
                Making The Unbreakable Series <ExternalLink size={11} />
              </a>
              <Link href="/admin" style={{ textDecoration: 'none', color: 'var(--muted-text, #94A3B8)' }} className="hover:text-amber-400 transition-colors">
                Payload CMS Admin
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar Content */}
        <div
          style={{
            borderTop: '1px solid var(--border-color, #1E293B)',
            paddingTop: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12.5px',
            color: 'var(--muted-text, #64748B)',
            gap: '12px',
          }}
        >
          <p style={{ margin: 0 }}>
            © {currentYear} Major Madhan Kumar (Retd). All defense intelligence dossiers & visual media rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '18px' }}>
            <Link href="/about" style={{ textDecoration: 'none', color: 'inherit' }} className="hover:text-amber-400">
              Media Kit
            </Link>
            <Link href="/contact" style={{ textDecoration: 'none', color: 'inherit' }} className="hover:text-amber-400">
              Inquiries
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
