import Link from 'next/link'

export const metadata = {
  title: 'Page Not Found | Gulf Life Concierge',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#2B354E',
        color: '#fff',
        textAlign: 'center',
        padding: '80px 24px',
      }}
    >
      <div style={{ maxWidth: '560px' }}>
        <p
          style={{
            color: '#c9a96e',
            letterSpacing: '.22em',
            fontSize: '12px',
            textTransform: 'uppercase',
            marginBottom: '18px',
          }}
        >
          30A &amp; Emerald Coast, Florida
        </p>
        <h1 style={{ fontSize: '34px', fontWeight: 600, margin: '0 0 18px', lineHeight: 1.2 }}>
          We could not find that page
        </h1>
        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,.72)',
            margin: '0 0 34px',
          }}
        >
          Our site is being updated and some rental pages have moved. Call us at{' '}
          <a href="tel:+18508427619" style={{ color: '#c9a96e', fontWeight: 600, textDecoration: 'none' }}>
            (850) 842-7619
          </a>{' '}
          and we will find you the right home today.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              background: '#AB9055',
              color: '#fff',
              textDecoration: 'none',
              padding: '15px 30px',
              letterSpacing: '.12em',
              fontSize: '13px',
              textTransform: 'uppercase',
            }}
          >
            Back Home
          </Link>
          <Link
            href="/contact-us"
            style={{
              display: 'inline-block',
              border: '1px solid rgba(255,255,255,.35)',
              color: '#fff',
              textDecoration: 'none',
              padding: '15px 30px',
              letterSpacing: '.12em',
              fontSize: '13px',
              textTransform: 'uppercase',
            }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
