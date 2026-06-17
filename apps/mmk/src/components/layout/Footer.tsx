import Link from 'next/link'
import { X, LinkIcon, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      style={{
        backgroundColor: '#171717',
        color: '#a3a3a3',
        padding: '64px 24px 32px 24px',
        fontFamily: '"Inter", system-ui, sans-serif',
        fontSize: '15px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Top Grid Area */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '48px',
            marginBottom: '64px',
          }}
        >
          {/* Column 1: Info and Social Handles */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
                color: '#ffffff',
              }}
            >
              <div style={{ color: '#ffffff', display: 'flex', alignItems: 'center' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#656e36"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: '22px',
                  fontWeight: 'bold',
                  margin: 0,
                }}
              >
                Major Madhan Kumar
              </h3>
            </div>
            <p
              style={{
                color: '#a3a3a3',
                margin: '0 0 24px 0',
                maxWidth: '380px',
                lineHeight: '1.6',
                fontSize: '14px',
              }}
            >
              Independent defense analyst providing authoritative commentary on geopolitical
              affairs, military strategy, and regional security dynamics.
            </p>

            {/* Circular Social Buttons Wrapper */}
            <div style={{ display: 'flex', gap: '12px' }}>
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
                  href: '#',
                },
                { icon: <X size={16} />, href: '#' },
                { icon: <LinkIcon size={16} />, href: '#' },
                { icon: <Mail size={16} />, href: '#' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#262626',
                    color: '#d4d4d4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    transition: 'background-color 0.2s',
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4
              style={{
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                margin: '0 0 20px 0',
              }}
            >
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/articles" style={{ textDecoration: 'none', color: '#a3a3a3' }}>
                Analysis
              </Link>
              <Link href="/videos" style={{ textDecoration: 'none', color: '#a3a3a3' }}>
                Videos
              </Link>
              <Link href="/events" style={{ textDecoration: 'none', color: '#a3a3a3' }}>
                Events
              </Link>
              <Link href="/soldiers" style={{ textDecoration: 'none', color: '#a3a3a3' }}>
                Roll of Honour
              </Link>
            </div>
          </div>

          {/* Column 3: Contact Channels */}
          <div>
            <h4
              style={{
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                margin: '0 0 20px 0',
              }}
            >
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/contact" style={{ textDecoration: 'none', color: '#a3a3a3' }}>
                Media Inquiries
              </Link>
              <Link href="/contact" style={{ textDecoration: 'none', color: '#a3a3a3' }}>
                Speaking Events
              </Link>
              <Link href="/contact" style={{ textDecoration: 'none', color: '#a3a3a3' }}>
                Consultancy
              </Link>
              <Link href="/contact" style={{ textDecoration: 'none', color: '#a3a3a3' }}>
                Newsletter
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar Content */}
        <div
          style={{
            borderTop: '1px solid #262626',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '13px',
            color: '#737373',
          }}
        >
          <p style={{ margin: 0 }}>© {currentYear} Major Madhan Kumar. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
