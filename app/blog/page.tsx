import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, SITE_URL } from '@/lib/blog'

export const metadata: Metadata = {
  title: '30A Travel Guide & Blog | Gulf Life Concierge',
  description:
    'Local guides to 30A and the Emerald Coast — the best time to visit, things to do, where to stay, and vacation rental tips from the Gulf Life Concierge team.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: '30A Travel Guide & Blog | Gulf Life Concierge',
    description:
      'Local guides to 30A and the Emerald Coast from the Gulf Life Concierge team.',
    url: `${SITE_URL}/blog`,
    type: 'website',
  },
}

export default function BlogIndexPage() {
  const posts = getAllPosts()
  const [featured, ...rest] = posts

  return (
    <>
      {/* ── Header ────────────────────────────────────── */}
      <section className="blog-hero">
        <p className="blog-hero-eyebrow" style={{ animation: 'floatUp 0.7s ease 0.2s both' }}>
          The Gulf Life Journal
        </p>
        <h1 className="blog-hero-h1" style={{ animation: 'floatUp 0.7s ease 0.35s both' }}>
          30A Travel Guides &amp; Local Tips
        </h1>
        <div
          style={{ width: '50px', height: '2px', background: '#AB9055', margin: '0 auto 20px', animation: 'floatUp 0.7s ease 0.45s both' }}
        />
        <p className="blog-hero-sub" style={{ animation: 'floatUp 0.7s ease 0.55s both' }}>
          Where to stay, when to come, and what to do on the Emerald Coast — written by the
          local team that lives it year-round.
        </p>
      </section>

      {/* ── Posts ─────────────────────────────────────── */}
      <section style={{ background: '#F7F4EE' }}>
        <div className="blog-grid-wrap">
          {/* Featured post */}
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="blog-card blog-card-featured">
              <div className="blog-card-img img-zoom">
                <img src={featured.image} alt={featured.imageAlt} loading="eager" />
              </div>
              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <span className="blog-pill">{featured.category}</span>
                  <span className="blog-date">{featured.dateDisplay} · {featured.readMinutes} min read</span>
                </div>
                <h2 className="blog-card-title">{featured.title}</h2>
                <p className="blog-card-excerpt">{featured.excerpt}</p>
                <span className="blog-read-link">Read Article →</span>
              </div>
            </Link>
          )}

          {/* Grid of remaining posts */}
          <div className="blog-grid">
            {rest.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-card-img img-zoom">
                  <img src={post.image} alt={post.imageAlt} loading="lazy" />
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span className="blog-pill">{post.category}</span>
                    <span className="blog-date">{post.dateDisplay} · {post.readMinutes} min read</span>
                  </div>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <span className="blog-read-link">Read Article →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section style={{ background: '#2B354E', padding: '80px 24px', textAlign: 'center' }}>
        <p style={{
          fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700,
          letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '16px',
        }}>
          Plan Your Stay
        </p>
        <h2 style={{
          fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(26px, 3.5vw, 40px)',
          fontWeight: 300, color: '#fff', marginBottom: '16px',
        }}>
          Ready to Experience the Gulf Life?
        </h2>
        <p style={{
          fontSize: '16px', color: 'rgba(255,255,255,0.65)', maxWidth: '440px',
          margin: '0 auto 36px', lineHeight: 1.75,
        }}>
          Browse our collection of vacation homes across 30A and the Emerald Coast, or let our
          concierge team match you with the perfect stay.
        </p>
        <a href="https://livegulflife.com/search-results/" className="btn-gold">Browse Rentals</a>
      </section>
    </>
  )
}
