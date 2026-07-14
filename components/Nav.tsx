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

  const [scrolled, setScrolled]     = useState(false)
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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const transparent = isHome && !scrolled && !mobileOpen
  const navBg       = transparent ? 'transparent' : 'rgba(255,255,255,0.96)'
  const linkColor   = transparent ? '#fff' : '#2B354E'

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
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          background: navBg,
          backdropFilter: transparent ? 'none' : 'blur(22px)',
          WebkitBackdropFilter: transparent ? 'none' : 'blur(22px)',
          borderBottom: transparent ? 'none' : '1px solid rgba(171,144,85,0.18)',
          boxShadow: transparent ? 'none' : '0 1px 0 rgba(171,144,85,0.12), 0 4px 20px rgba(0,0,0,0.05)',
          transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        {/* ── MOBILE HEADER (CSS-controlled: visible <768px) ── */}
        <div className="nav-mobile-header" style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          height: '64px',
          width: '100%',
          boxSizing: 'border-box',
        }}>
          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              background: 'none', border: 'none', outline: 'none',
              padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px',
              cursor: 'pointer', zIndex: 1100,
              WebkitTapHighlightColor: 'transparent',
              flexShrink: 0,
            }}
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2B354E" strokeWidth="2.2" strokeLinecap="round">
                <line x1="4" y1="4" x2="20" y2="20" /><line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            ) : (
              <>
                <span style={{ display: 'block', width: '22px', height: '2px', background: linkColor }} />
                <span style={{ display: 'block', width: '22px', height: '2px', background: linkColor }} />
                <span style={{ display: 'block', width: '14px', height: '2px', background: linkColor }} />
              </>
            )}
          </button>

          {/* Logo centered */}
          <Link href="/" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <img
              src={transparent ? LOGO_WHITE : LOGO_DARK}
              alt="Gulf Life Concierge"
              style={{ height: '48px', width: 'auto', display: 'block' }}
            />
          </Link>

          {/* Phone icon */}
          <a href="tel:8508427619" aria-label="Call us" style={{ color: linkColor, display: 'flex', padding: '8px', flexShrink: 0 }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.02 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.36 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
          </a>
        </div>

        {/* ── DESKTOP HEADER (CSS-controlled: visible ≥768px) ── */}
        <div className="nav-desktop-header" style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 36px',
          height: '78px',
        }}>
          {/* LEFT */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setRentalOpen(true)}
              onMouseLeave={() => setRentalOpen(false)}
            >
              <span style={{ ...baseLink, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                Vacation Rentals
                <svg width="9" height="6" viewBox="0 0 10 7" fill="none"
                  style={{ marginTop: 1, transition: 'transform 0.2s', transform: rentalOpen ? 'rotate(180deg)' : 'none' }}>
                  <path d="M1 1l4 4 4-4" stroke={linkColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div style={{
                position: 'absolute', top: '100%', left: '-16px', paddingTop: '8px',
                background: 'transparent', minWidth: '200px', zIndex: 200,
                opacity: rentalOpen ? 1 : 0, pointerEvents: rentalOpen ? 'all' : 'none',
                transition: 'opacity 0.2s ease',
              }}>
                <div style={{ background: '#fff', boxShadow: '0 12px 40px rgba(0,0,0,0.12)', borderTop: '2px solid #AB9055' }}>
                  {[
                    { label: 'Beach Front',   href: `${WP}/beach-front-vacation-rentals/` },
                    { label: 'Resort Stays',  href: `${WP}/resort-vacation-rentals/` },
                    { label: 'Private Pools', href: `${WP}/vacation-rentals-with-a-private-pool/` },
                  ].map(item => (
                    <a key={item.label} href={item.href}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px', padding: '13px 20px',
                        color: '#2B354E', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em',
                        textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'Montserrat, sans-serif',
                        transition: 'background 0.15s, padding-left 0.15s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#F7F4EE'; e.currentTarget.style.paddingLeft = '26px' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.paddingLeft = '20px' }}
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
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              See Properties
            </a>
            <Link href="/about-us" style={baseLink}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.65')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              About Us
            </Link>
          </div>

          {/* CENTER — Logo */}
          <div style={{
            position: 'absolute', left: '50%',
            transform: `translateX(-50%) translateY(${transparent ? '10px' : '0px'})`,
            transition: 'transform 0.4s ease',
          }}>
            <Link href="/">
              <img src={transparent ? LOGO_WHITE : LOGO_DARK} alt="Gulf Life Concierge"
                style={{ height: transparent ? '96px' : '68px', width: 'auto', display: 'block', transition: 'height 0.35s ease' }} />
            </Link>
          </div>

          {/* RIGHT */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link href="/property-management" style={baseLink}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.65')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              For Owners
            </Link>
            <Link href="/contact-us" style={{
              ...baseLink,
              border: `1.5px solid ${transparent ? 'rgba(255,255,255,0.6)' : 'rgba(43,53,78,0.35)'}`,
              padding: '7px 18px', transition: 'all 0.2s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#AB9055'; e.currentTarget.style.borderColor = '#AB9055'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = transparent ? 'rgba(255,255,255,0.6)' : 'rgba(43,53,78,0.35)'; e.currentTarget.style.color = linkColor }}>
              Contact
            </Link>
            <a href="tel:8508427619" style={{ ...baseLink, opacity: 0.8 }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}>
              (850) 842-7619
            </a>
            <div style={{ width: 1, height: 18, background: transparent ? 'rgba(255,255,255,0.3)' : '#ddd' }} />
            <a href={`${WP}/search-results/`} style={{ color: linkColor, display: 'flex', transition: 'opacity 0.2s' }} aria-label="Search"
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </a>
            <a href="mailto:Connect@LiveGulfLife.com" style={{ color: linkColor, display: 'flex', transition: 'opacity 0.2s' }} aria-label="Email"
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              <svg width="20" height="16" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="16" rx="2" /><polyline points="2,2 12,11 22,2" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ─────────────────────────────── */}
      <div
        className="nav-mobile-header"
        style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: '#fff',
          flexDirection: 'column',
          paddingTop: '64px',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          overflowY: 'auto',
          display: mobileOpen ? 'flex' : 'none',
        }}
      >
        <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: '0' }}>
          <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'center' }}>
            <img src={LOGO_DARK} alt="Gulf Life Concierge" style={{ height: '64px', width: 'auto' }} />
          </div>

          {[
            { label: 'All Vacation Rentals', href: `${WP}/search-results/` },
            { label: '— Beach Front',  href: `${WP}/beach-front-vacation-rentals/`, sub: true },
            { label: '— Resort Stays', href: `${WP}/resort-vacation-rentals/`, sub: true },
            { label: '— Private Pools',href: `${WP}/vacation-rentals-with-a-private-pool/`, sub: true },
            { label: 'About Us',           href: '/about-us' },
            { label: 'For Owners',         href: '/property-management' },
            { label: 'Guest Reviews',      href: '/guest-reviews' },
            { label: 'Contact Us',         href: '/contact-us' },
          ].map(item => (
            <a key={item.label + item.href} href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                padding: item.sub ? '9px 20px' : '14px 0',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: item.sub ? '11px' : '13px',
                fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                color: item.sub ? '#AB9055' : '#2B354E',
                textDecoration: 'none',
                borderBottom: item.sub ? 'none' : '1px solid rgba(43,53,78,0.06)',
              }}
            >
              {item.label}
            </a>
          ))}

          <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a href={`${WP}/search-results/`} className="btn-navy" style={{ textAlign: 'center', display: 'block' }}>
              Search Properties
            </a>
            <a href="tel:8508427619" style={{
              display: 'block', textAlign: 'center',
              fontFamily: 'Montserrat, sans-serif', fontSize: '13px',
              fontWeight: 700, letterSpacing: '0.1em', color: '#2B354E',
              textDecoration: 'none', padding: '14px',
              border: '1.5px solid rgba(43,53,78,0.2)',
            }}>
              (850) 842-7619
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
