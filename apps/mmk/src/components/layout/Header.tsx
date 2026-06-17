import Link from 'next/link'
import { Search } from 'lucide-react'

export default function Header() {
  return (
    <header
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        fontFamily: '"Inter", system-ui, sans-serif',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left Side: Brand Logo with Olive Accent Box */}
        <Link
          href="/articles"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '14px' }}
        >
          <div
            style={{
              backgroundColor: '#4B5320',
              width: '44px',
              height: '44px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            {/* Inline Globe SVG to match your asset branding box */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '24px',
                fontWeight: '700',
                color: '#1A1A1A',
                lineHeight: '1.2',
              }}
            >
              Major Madhan Kumar
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '600',
                color: '#64748b',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginTop: '2px',
              }}
            >
              Geopolitical Analysis
            </span>
          </div>
        </Link>

        {/* Right Side: Links & Search Action Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link
              href="/articles"
              style={{
                textDecoration: 'none',
                color: '#1A1A1A',
                fontSize: '15px',
                fontWeight: '500',
              }}
            >
              Home
            </Link>
            <Link
              href="/articles"
              style={{
                textDecoration: 'none',
                color: '#4B5320',
                fontSize: '15px',
                fontWeight: '600',
              }}
            >
              Analysis
            </Link>
            <Link
              href="/videos"
              style={{
                textDecoration: 'none',
                color: '#1A1A1A',
                fontSize: '15px',
                fontWeight: '500',
              }}
            >
              Videos
            </Link>
            <Link
              href="/soldiers"
              style={{
                textDecoration: 'none',
                color: '#1A1A1A',
                fontSize: '15px',
                fontWeight: '500',
              }}
            >
              Soldiers
            </Link>
            <Link
              href="/events"
              style={{
                textDecoration: 'none',
                color: '#1A1A1A',
                fontSize: '15px',
                fontWeight: '500',
              }}
            >
              Events
            </Link>
            <Link
              href="/articles"
              style={{
                textDecoration: 'none',
                color: '#1A1A1A',
                fontSize: '15px',
                fontWeight: '500',
              }}
            >
              Gallery
            </Link>
            <Link
              href="/articles"
              style={{
                textDecoration: 'none',
                color: '#1A1A1A',
                fontSize: '15px',
                fontWeight: '500',
              }}
            >
              About
            </Link>
          </nav>

          <div style={{ width: '1px', height: '24px', backgroundColor: '#e2e8f0' }} />

          <button
            style={{
              background: 'none',
              border: 'none',
              color: '#1A1A1A',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Search size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
