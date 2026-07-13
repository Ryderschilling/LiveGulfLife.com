'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const WP = 'https://livegulflife.com'
const LOGO_WHITE = `${WP}/wp-content/uploads/2025/11/GLC-logo-white.svg`
const LOGO_DARK  = `${WP}/wp-content/uploads/2025/11/GLC-logo.svg`

export default function Nav() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const [scrolled, setScrolled] = useState(false)
  const [rentalOpen, setRentalOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const transparent = isHome && !scrolled

  const navBg = transparent
    ? 'transparent'
    : 'rgba(255,255,255,0.90)'

  const linkColor = transparent ? '#fff' : '#2B354E'

  const baseLink: React.CSSProperties = {
    color: linkColor,
    textDecoration: 'none',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    transition: 'color 0.2s, opacity 0.2s',
    fontFamily: 'Montserrat, sans-serif',
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: navBg,
          backdropFilter: transparent ? 'none' : 'blur(22px)',
          WebkitBackdropFilter: transparent ? 'none' : 'blur(22px)',
          borderBottom: transparent ? 'none' : '1px solid rgba(171,144,85,0.18)',
          boxShadow: transparent ? 'none' : '0 1px 0 rgba(171,144,85,0.12), 0 4px 20px rgba(0,0,0,0.05)',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        {/* Desktop */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 36px',
            height: '78px',
          }}
        >
          {/* LEFT */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            {/* Vacation Rentals dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setRentalOpen(true)}
              onMouseLeave={() => setRentalOpen(false)}
            >
              <span
                style={{
                  ...baseLink,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                Vacation Rentals
                <svg
                  width="9"
                  height="6"
                  viewBox="0 0 10 7"
                  fill="none"
                  style={{ marginTop: 1, transition: 'transform 0.2s', transform: rentalOpen ? 'rotate(180deg)' : 'none' }}
                >
                  <path d="M1 1l4 4 4-4" stroke={linkColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>

              {/* Dropdown */}
              <div
                style={{
                  position: 'absolute',
                  top: '100%',       // flush with trigger — no gap to fall through
                  left: '-16px',
                  paddingTop: '8px', // visual offset lives inside the hover zone
                  background: 'transparent',
                  minWidth: '200px',
                  zIndex: 200,
                  opacity: rentalOpen ? 1 : 0,
                  pointerEvents: rentalOpen ? 'all' : 'none',
                  transition: 'opacity 0.2s ease',
                }}
              >
                <div style={{
                  background: '#fff',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                  borderTop: '2px solid #AB9055',
                }}>
                  {[
                    { label: 'Beach Front', href: `${WP}/beach-front-vacation-rentals/` },
                    { label: 'Resort Stays', href: `${WP}/resort-vacation-rentals/` },
                    { label: 'Private Pools', href: `${WP}/vacation-rentals-with-a-private-pool/` },
                  ].map(item => (
                    <a
                      key={item.label}
                      href={item.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '13px 20px',
                        color: '#2B354E',
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        fontFamily: 'Montserrat, sans-serif',
                        transition: 'background 0.15s, padding-left 0.15s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#F7F4EE'
                        e.currentTarget.style.paddingLeft = '26px'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.paddingLeft = '20px'
                      }}
                    >
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#AB9055', flexShrink: 0 }} />
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <a href={`${WP}/search-results/`} style={baseLink}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.65')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              See Properties
            </a>
            <Link href="/about-us" style={baseLink}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.65')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              About Us
            </Link>
          </div>

          {/* CENTER — Logo: drops down slightly on transparent hero, animates back up on scroll */}
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: `translateX(-50%) translateY(${transparent ? '10px' : '0px'})`,
            transition: 'transform 0.4s ease',
          }}>
            <Link href="/">
              <img
                src={transparent ? LOGO_WHITE : LOGO_DARK}
                alt="Gulf Life Concierge"
                style={{
                  height: transparent ? '96px' : '68px',
                  width: 'auto',
                  display: 'block',
                  transition: 'height 0.35s ease, opacity 0.3s ease',
                }}
              />
            </Link>
          </div>

          {/* RIGHT */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link href="/property-management" style={baseLink}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.65')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              For Owners
            </Link>

            <Link
              href="/contact-us"
              style={{
                ...baseLink,
                border: `1.5px solid ${transparent ? 'rgba(255,255,255,0.6)' : 'rgba(43,53,78,0.35)'}`,
                padding: '7px 18px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#AB9055'
                e.currentTarget.style.borderColor = '#AB9055'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = transparent ? 'rgba(255,255,255,0.6)' : 'rgba(43,53,78,0.35)'
                e.currentTarget.style.color = linkColor
              }}
            >
              Contact
            </Link>

            <a
              href="tel:8508427619"
              style={{ ...baseLink, opacity: 0.8 }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
            >
              (850) 842-7619
            </a>

            {/* Divider */}
            <div style={{ width: 1, height: 18, background: transparent ? 'rgba(255,255,255,0.3)' : '#ddd' }} />

            {/* Search */}
            <a
              href={`${WP}/search-results/`}
              style={{ color: linkColor, display: 'flex', transition: 'opacity 0.2s' }}
              aria-label="Search properties"
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </a>

            {/* Email */}
            <a
              href="mailto:Connect@LiveGulfLife.com"
              style={{ color: linkColor, display: 'flex', transition: 'opacity 0.2s' }}
              aria-label="Email us"
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <svg width="20" height="16" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="16" rx="2" /><polyline points="2,2 12,11 22,2" />
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}
