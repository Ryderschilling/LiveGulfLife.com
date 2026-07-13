'use client'

import Link from 'next/link'

const WP = 'https://livegulflife.com'
const LOGO_WHITE = `${WP}/wp-content/uploads/2025/11/GLC-logo-white.svg`

export default function Footer() {
  return (
    <footer>
      {/* Wave top */}
      <div style={{ background: '#2B354E', lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 56"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: '56px' }}
        >
          <path
            d="M0,0 C360,56 720,0 1080,40 C1260,56 1380,24 1440,0 L1440,56 L0,56 Z"
            fill="#2B354E"
          />
        </svg>
      </div>

      <div style={{ background: '#2B354E', color: '#fff', fontFamily: 'Outfit, sans-serif' }}>

        {/* Main footer grid */}
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '48px 40px 36px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'start',
              gap: '48px',
              marginBottom: '52px',
            }}
          >
            {/* LEFT */}
            <div>
              <h4 style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#AB9055',
                marginBottom: '16px',
              }}>
                Contact Us
              </h4>
              <a
                href="tel:8508427619"
                style={{ display: 'block', color: '#fff', fontSize: '16px', textDecoration: 'none', marginBottom: '8px', fontWeight: 500 }}
              >
                (850) 842-7619
              </a>
              <a
                href="mailto:Connect@LiveGulfLife.com"
                style={{ display: 'block', color: 'rgba(255,255,255,0.65)', fontSize: '14px', textDecoration: 'none', marginBottom: '20px' }}
              >
                Connect@LiveGulfLife.com
              </a>

              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                30A & Emerald Coast, FL<br />
                Serving Watersound, Rosemary Beach,<br />
                Seaside, Grayton Beach & beyond
              </p>
            </div>

            {/* CENTER — Logo + subscribe */}
            <div style={{ textAlign: 'center', minWidth: '320px' }}>
              {/* Ambient glow behind logo */}
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: '28px' }}>
                <div style={{
                  position: 'absolute',
                  inset: '-20px',
                  background: 'radial-gradient(circle, rgba(171,144,85,0.15) 0%, transparent 70%)',
                  borderRadius: '50%',
                }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ width: '60px', height: '1px', background: 'rgba(171,144,85,0.35)' }} />
                  <img
                    src={LOGO_WHITE}
                    alt="Gulf Life Concierge"
                    style={{ height: '64px', width: 'auto', position: 'relative', zIndex: 1 }}
                  />
                  <div style={{ width: '60px', height: '1px', background: 'rgba(171,144,85,0.35)' }} />
                </div>
              </div>

              <h4 style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
                marginBottom: '16px',
              }}>
                Subscribe To Our Mailing List
              </h4>
              <form
                style={{ display: 'flex', gap: 0, maxWidth: '360px', margin: '0 auto' }}
                onSubmit={e => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  style={{
                    flex: 1,
                    padding: '13px 16px',
                    border: 'none',
                    outline: 'none',
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '14px',
                    color: '#1A1A1A',
                    background: 'rgba(255,255,255,0.92)',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #c9a96e 0%, #AB9055 100%)',
                    color: '#fff',
                    border: 'none',
                    padding: '13px 20px',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* RIGHT — Links */}
            <div style={{ textAlign: 'right' }}>
              <h4 style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#AB9055',
                marginBottom: '16px',
              }}>
                Quick Links
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                {[
                  { label: 'Vacation Rentals', href: `${WP}/search-results/` },
                  { label: 'Beachfront Properties', href: `${WP}/beach-front-vacation-rentals/` },
                  { label: 'Private Pools', href: `${WP}/vacation-rentals-with-a-private-pool/` },
                  { label: 'Property Management', href: '/property-management' },
                  { label: 'Guest Reviews', href: '/guest-reviews' },
                  { label: 'About Us', href: '/about-us' },
                  { label: 'Contact', href: '/contact-us' },
                ].map(link => (
                  link.href.startsWith('http') ? (
                    <a
                      key={link.label}
                      href={link.href}
                      style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#AB9055')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#AB9055')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                    >
                      {link.label}
                    </Link>
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Gold divider */}
          <div style={{ width: '100%', height: '1px', background: 'rgba(171,144,85,0.2)', marginBottom: '24px' }} />

          {/* Bottom copyright */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.35)',
            fontFamily: 'Montserrat, sans-serif',
            letterSpacing: '0.04em',
          }}>
            <span>© 2026 Gulf Life Concierge. All rights reserved.</span>
            <div style={{ display: 'flex', gap: '24px' }}>
              <a href={`${WP}/terms-and-conditions/`} style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
                Terms &amp; Conditions
              </a>
              <a href={`${WP}/privacy-policy/`} style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
