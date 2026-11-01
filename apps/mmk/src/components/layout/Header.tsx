'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/context/ThemeContext'
import { Search, Menu, X, Sun, Moon, ShieldAlert, ShoppingBag } from 'lucide-react'
import GlobalSearchModal from '../GlobalSearchModal'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const { theme, setTheme, colors } = useTheme()
  const pathname = usePathname()

  // Listen for Cmd+K or Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchModalOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname?.startsWith(href)
  }

  return (
    <header
      style={{
        backgroundColor: colors.headerBg,
        borderBottom: `1px solid ${colors.border}`,
        fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'background-color 0.2s ease, border-color 0.2s ease',
      }}
    >
      {/* Embedded CSS for clean responsive adaptive layouts */}
      <style>{`
        .desktop-nav-group {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .mobile-actions-wrapper {
          display: none;
        }
        .theme-pill-btn {
          background: none;
          border: none;
          padding: 6px;
          cursor: pointer;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .nav-link {
          text-decoration: none;
          font-size: 14.5px;
          font-weight: 500;
          transition: color 0.2s ease;
          position: relative;
          white-space: nowrap;
        }
        .nav-link:hover {
          color: ${colors.accent} !important;
        }
        .nav-link.active {
          color: ${colors.accent} !important;
          font-weight: 600;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: ${colors.accent};
          transition: width 0.2s ease;
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        @media (max-width: 991px) {
          .desktop-nav-group {
            display: none !important;
          }
          .mobile-actions-wrapper {
            display: flex !important;
            align-items: center;
            gap: 16px;
          }
          .mobile-toggle-btn {
            background: none;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            padding: 4px;
            color: ${colors.text};
            transition: color 0.2s ease;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {/* Left Side: Brand Logo with Olive Accent Box */}
        <Link
          href="/"
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
              flexShrink: 0,
            }}
          >
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
                fontSize: 'clamp(16px, 4vw, 24px)',
                fontWeight: '800',
                color: colors.text,
                lineHeight: '1.2',
                transition: 'color 0.2s ease',
              }}
            >
              Major Madhan Kumar
            </span>
            <span
              style={{
                fontSize: '9px',
                fontWeight: '700',
                color: colors.textMuted,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginTop: '2px',
                transition: 'color 0.2s ease',
              }}
            >
              Geopolitical Analysis
            </span>
          </div>
        </Link>

        {/* Right Side Desktop Navigation Panel */}
        <div className="desktop-nav-group">
          <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link
              href="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              style={{ color: isActive('/') ? colors.accent : colors.text }}
            >
              Home
            </Link>
            <Link
              href="/articles"
              className={`nav-link ${isActive('/articles') ? 'active' : ''}`}
              style={{ color: isActive('/articles') ? colors.accent : colors.text }}
            >
              Articles
            </Link>
            <Link
              href="/videos"
              className={`nav-link ${isActive('/videos') ? 'active' : ''}`}
              style={{ color: isActive('/videos') ? colors.accent : colors.text }}
            >
              Videos
            </Link>
            <Link
              href="/soldiers"
              className={`nav-link ${isActive('/soldiers') ? 'active' : ''}`}
              style={{ color: isActive('/soldiers') ? colors.accent : colors.text }}
            >
              Soldiers
            </Link>
            <Link
              href="/events"
              className={`nav-link ${isActive('/events') ? 'active' : ''}`}
              style={{ color: isActive('/events') ? colors.accent : colors.text }}
            >
              Events
            </Link>
            <Link
              href="/gallery"
              className={`nav-link ${isActive('/gallery') ? 'active' : ''}`}
              style={{ color: isActive('/gallery') ? colors.accent : colors.text }}
            >
              Gallery
            </Link>
            <Link
              href="/merchandise"
              className={`nav-link ${isActive('/merchandise') ? 'active' : ''}`}
              style={{ color: isActive('/merchandise') ? colors.accent : colors.text }}
            >
              Store
            </Link>
            <Link
              href="/about"
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              style={{ color: isActive('/about') ? colors.accent : colors.text }}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
              style={{ color: isActive('/contact') ? colors.accent : colors.text }}
            >
              Contact
            </Link>
          </nav>

          <div style={{ width: '1px', height: '24px', backgroundColor: colors.border }} />

          {/* Theme Selection Capsule Controller Frame */}
          <div
            style={{
              display: 'flex',
              backgroundColor: theme === 'light' ? '#F1F5F9' : '#070A14',
              padding: '4px',
              borderRadius: '6px',
              border: `1px solid ${colors.border}`,
              gap: '2px',
            }}
            role="group"
            aria-label="Theme selector"
          >
            <button
              className="theme-pill-btn"
              onClick={() => setTheme('light')}
              style={{
                backgroundColor: theme === 'light' ? '#FFFFFF' : 'transparent',
                color: theme === 'light' ? '#D97706' : '#64748B',
              }}
              title="Light Mode"
              aria-label="Switch to light theme"
              aria-pressed={theme === 'light'}
            >
              <Sun size={15} />
            </button>
            <button
              className="theme-pill-btn"
              onClick={() => setTheme('dark')}
              style={{
                backgroundColor: theme === 'dark' ? '#334155' : 'transparent',
                color: theme === 'dark' ? '#38BDF8' : '#64748B',
              }}
              title="Dark Mode"
              aria-label="Switch to dark theme"
              aria-pressed={theme === 'dark'}
            >
              <Moon size={15} />
            </button>
            <button
              className="theme-pill-btn"
              onClick={() => setTheme('classic')}
              style={{
                backgroundColor: theme === 'classic' ? '#656E36' : 'transparent',
                color: theme === 'classic' ? '#FFFFFF' : '#64748B',
              }}
              title="Classic Theme"
              aria-label="Switch to classic theme"
              aria-pressed={theme === 'classic'}
            >
              <ShieldAlert size={15} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setSearchModalOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              color: colors.text,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 8px',
              borderRadius: '6px',
            }}
            aria-label="Open search dialog (Cmd + K)"
            title="Search Intelligence (Cmd + K)"
          >
            <Search size={18} />
            <span
              style={{
                fontSize: '11px',
                padding: '2px 5px',
                borderRadius: '4px',
                backgroundColor: theme === 'light' ? '#E2E8F0' : '#1E293B',
                color: colors.textMuted,
                fontWeight: 600,
              }}
            >
              ⌘K
            </span>
          </button>
        </div>

        {/* Mobile Actions Overlay Trigger Area */}
        <div className="mobile-actions-wrapper">
          <Link
            href="/merchandise"
            style={{
              color: colors.text,
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Store"
          >
            <ShoppingBag size={20} />
          </Link>
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          style={{
            backgroundColor: colors.cardBg,
            borderTop: `1px solid ${colors.border}`,
            borderBottom: `1px solid ${colors.border}`,
            padding: '24px',
            position: 'absolute',
            top: '80px',
            left: 0,
            right: 0,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
            animation: 'slideDown 0.2s ease',
            zIndex: 999,
            maxHeight: 'calc(100vh - 80px)',
            overflowY: 'auto',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { href: '/', label: 'Home' },
              { href: '/articles', label: 'Articles' },
              { href: '/videos', label: 'Videos' },
              { href: '/soldiers', label: 'Soldiers' },
              { href: '/events', label: 'Events' },
              { href: '/gallery', label: 'Gallery' },
              { href: '/merchandise', label: 'Store' },
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
            ].map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    textDecoration: 'none',
                    color: active ? colors.accent : colors.text,
                    fontSize: '16px',
                    fontWeight: active ? '600' : '500',
                    padding: '12px 0',
                    borderBottom: `1px solid ${colors.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: colors.accent,
                      }}
                    />
                  )}
                </Link>
              )
            })}

            <div style={{ height: '1px', backgroundColor: colors.border, margin: '12px 0' }} />

            {/* Quick Mobile Theme Matrix Capsule Selector Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
              }}
            >
              <span
                style={{
                  fontSize: '13px',
                  color: colors.textMuted,
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                }}
              >
                Theme:
              </span>
              <div
                style={{
                  display: 'flex',
                  backgroundColor: theme === 'light' ? '#F1F5F9' : '#070A14',
                  padding: '4px',
                  borderRadius: '6px',
                  border: `1px solid ${colors.border}`,
                  gap: '4px',
                }}
              >
                <button
                  className="theme-pill-btn"
                  onClick={() => setTheme('light')}
                  style={{
                    backgroundColor: theme === 'light' ? '#FFFFFF' : 'transparent',
                    color: '#D97706',
                    padding: '8px',
                  }}
                  aria-label="Switch to light theme"
                  aria-pressed={theme === 'light'}
                >
                  <Sun size={14} />
                </button>
                <button
                  className="theme-pill-btn"
                  onClick={() => setTheme('dark')}
                  style={{
                    backgroundColor: theme === 'dark' ? '#334155' : 'transparent',
                    color: '#38BDF8',
                    padding: '8px',
                  }}
                  aria-label="Switch to dark theme"
                  aria-pressed={theme === 'dark'}
                >
                  <Moon size={14} />
                </button>
                <button
                  className="theme-pill-btn"
                  onClick={() => setTheme('classic')}
                  style={{
                    backgroundColor: theme === 'classic' ? '#656E36' : 'transparent',
                    color: '#FFFFFF',
                    padding: '8px',
                  }}
                  aria-label="Switch to classic theme"
                  aria-pressed={theme === 'classic'}
                >
                  <ShieldAlert size={14} />
                </button>
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: colors.border, margin: '4px 0' }} />

            {/* Mobile Search Item */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false)
                setSearchModalOpen(true)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: colors.text,
                fontSize: '16px',
                fontWeight: '500',
                padding: '12px 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
              }}
            >
              <Search size={18} />
              <span>Search Intelligence (⌘K)</span>
            </button>
          </nav>
        </div>
      )}

      {/* Global Interactive Command Search Modal */}
      <GlobalSearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </header>
  )
}
