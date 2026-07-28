'use client'

import { useState, useEffect, useRef } from 'react'

const WP = ''

const REVIEWS = [
  {
    id: 1,
    title: 'Absolutely Perfect — Already Booked Again',
    reviewer: 'Sarah M.',
    date: 'October 2025',
    rating: 5,
    text: 'The house had everything we needed and more — we felt right at home and had plenty of space!! Perfect family vacation with 4 kiddos and parents! Communication was excellent from start to finish. Gulf Life made everything effortless.',
    property: '30A Beach House',
    propertyUrl: `${WP}/search-results/`,
    tag: 'Family',
    featured: true,
  },
  {
    id: 2,
    title: 'Unbeatable Location',
    reviewer: 'The Johnson Family',
    date: 'September 2025',
    rating: 5,
    text: 'Everything was exactly as described and the team was knowledgeable about all of the amenities. The proximity to the PRIVATE beach was truly unbeatable. This area is very special to us, and this location helped us maximize our stay.',
    property: 'Watersound Origins',
    propertyUrl: `${WP}/search-results/`,
    tag: 'Family',
  },
  {
    id: 3,
    title: 'Highly Recommend Gulf Life',
    reviewer: 'Michael & Lisa T.',
    date: 'August 2025',
    rating: 5,
    text: 'The living space both downstairs and upstairs gave us room to spread out. The community pool was fantastic. Friendly reminders were provided to make our stay pleasant, as well as great recommendations on things to do.',
    property: 'Grayton Beach Villa',
    propertyUrl: `${WP}/search-results/`,
    tag: 'Couples',
  },
  {
    id: 4,
    title: 'Excellent Stay!',
    reviewer: 'David Butler',
    date: 'December 2025',
    rating: 5,
    text: 'Incredible experience from start to finish. The property was immaculate and exactly as shown. We enjoyed the area so much that we have already started looking at buying here. Gulf Life Concierge made this trip truly special.',
    property: 'SGBBSIDE213',
    propertyUrl: `${WP}/property-info/?unit=SGBBSIDE213`,
    tag: 'Couples',
  },
  {
    id: 5,
    title: 'Best Gulf Coast Rental Experience',
    reviewer: 'Kelly Evard',
    date: 'December 2025',
    rating: 5,
    text: 'We have stayed at many vacation rentals along the Gulf Coast and this was by far the best managed property we have encountered. Quick responses, spotless home, and a team that genuinely cares about your experience.',
    property: 'INB24BVIEW',
    propertyUrl: `${WP}/property-info/?unit=INB24BVIEW`,
    tag: 'Family',
  },
  {
    id: 6,
    title: 'Will Be Back Every Year',
    reviewer: 'Adam Harris',
    date: 'November 2025',
    rating: 5,
    text: 'This is our second time staying with Gulf Life and it gets better every visit. Everything was arranged perfectly and the team went above and beyond to make sure we had everything we needed. Already planning next year.',
    property: 'SRB128SEAEAGLE',
    propertyUrl: `${WP}/property-info/?unit=SRB128SEAEAGLE`,
    tag: 'Groups',
  },
]

function useIsMobile(bp = 768) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < bp)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [bp])
  return isMobile
}

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function Stars({ count, size = 16 }: { count: number; size?: number }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {Array(count).fill(0).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="#AB9055">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  )
}

// Uniform card — same layout on both mobile and desktop
function ReviewCard({ review, delay = 0, featured = false }: {
  review: typeof REVIEWS[0]
  delay?: number
  featured?: boolean
}) {
  const [expanded, setExpanded] = useState(false)
  const { ref, visible } = useReveal()
  const PREVIEW_LEN = 200
  const isLong = review.text.length > PREVIEW_LEN
  const displayText = (!isLong || expanded) ? review.text : review.text.slice(0, PREVIEW_LEN) + '…'

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        background: featured ? '#2B354E' : '#fff',
        borderRadius: '14px',
        padding: '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        boxShadow: featured
          ? '0 8px 32px rgba(43,53,78,0.20)'
          : '0 2px 16px rgba(43,53,78,0.06)',
        border: featured
          ? '1px solid rgba(171,144,85,0.3)'
          : '1px solid rgba(43,53,78,0.06)',
        position: 'relative',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {/* Decorative quote — top right */}
      <div style={{
        position: 'absolute', top: '10px', right: '18px',
        fontFamily: 'Georgia, serif', fontSize: '64px', lineHeight: 1,
        color: featured ? 'rgba(171,144,85,0.15)' : 'rgba(171,144,85,0.10)',
        userSelect: 'none', pointerEvents: 'none',
      }}>
        &ldquo;
      </div>

      {/* Top row: tag + stars */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center',
          background: featured ? 'rgba(171,144,85,0.18)' : 'rgba(171,144,85,0.08)',
          border: '1px solid rgba(171,144,85,0.25)',
          borderRadius: '100px', padding: '3px 12px',
        }}>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#AB9055' }}>
            {review.tag}
          </span>
        </div>
        <Stars count={review.rating} size={14} />
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'Outfit, sans-serif',
        fontSize: '17px', fontWeight: 600,
        color: featured ? '#fff' : '#1A1A1A',
        lineHeight: 1.3, marginBottom: '2px',
      }}>
        {review.title}
      </h3>

      {/* Review text */}
      <div>
        <p style={{
          fontSize: '14px',
          color: featured ? 'rgba(255,255,255,0.82)' : '#4A4A4A',
          lineHeight: 1.8, fontStyle: 'italic',
        }}>
          &ldquo;{displayText}&rdquo;
        </p>
        {isLong && (
          <button onClick={() => setExpanded(v => !v)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'Montserrat, sans-serif', fontSize: '10px',
            fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#AB9055', padding: '6px 0 0', display: 'block',
          }}>
            {expanded ? '↑ Show less' : 'Read more ↓'}
          </button>
        )}
      </div>

      {/* Footer: reviewer + property */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginTop: 'auto', paddingTop: '12px',
        borderTop: `1px solid ${featured ? 'rgba(255,255,255,0.1)' : 'rgba(43,53,78,0.07)'}`,
        gap: '12px', flexWrap: 'wrap',
      }}>
        <div>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: featured ? '#fff' : '#2B354E', marginBottom: '2px' }}>
            {review.reviewer}
          </p>
          <p style={{ fontSize: '12px', color: featured ? 'rgba(255,255,255,0.4)' : '#bbb', fontFamily: 'Outfit, sans-serif' }}>
            {review.date}
          </p>
        </div>
        <a href={review.propertyUrl} style={{
          fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          color: '#AB9055', textDecoration: 'none', whiteSpace: 'nowrap',
        }}>
          {review.property} →
        </a>
      </div>
    </div>
  )
}

function StatsBar({ isMobile }: { isMobile: boolean }) {
  const { ref, visible } = useReveal(0.2)
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        background: 'rgba(255,255,255,0.06)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        marginTop: '40px',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease 0.3s',
      }}
    >
      {[
        { val: '100+', label: 'Verified Reviews' },
        { val: '4.9',  label: 'Average Rating'  },
        { val: '98%',  label: 'Would Return'    },
      ].map((s, i) => (
        <div key={i} style={{
          padding: isMobile ? '20px 8px' : '28px 16px',
          textAlign: 'center',
          borderRight: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none',
        }}>
          <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: isMobile ? '28px' : '36px', fontWeight: 300, color: '#AB9055', lineHeight: 1, marginBottom: '5px' }}>
            {s.val}
          </p>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
            {s.label}
          </p>
        </div>
      ))}
    </div>
  )
}

export default function GuestReviewsPage() {
  const isMobile = useIsMobile()
  const featured = REVIEWS.find(r => r.featured) ?? REVIEWS[0]
  const rest      = REVIEWS.filter(r => r.id !== featured?.id)

  return (
    <>
      {/* ── Header ────────────────────────────────────── */}
      <section style={{
        background: '#2B354E', color: '#fff',
        padding: isMobile ? '96px 20px 0' : '120px 60px 0',
        textAlign: 'center',
      }}>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '14px', animation: 'floatUp 0.7s ease 0.2s both' }}>
          Verified Guest Stays
        </p>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: isMobile ? '32px' : 'clamp(32px, 5vw, 56px)', fontWeight: 300, letterSpacing: '-0.01em', marginBottom: '16px', animation: 'floatUp 0.7s ease 0.35s both' }}>
          What Our Guests Say
        </h1>
        <div style={{ width: '50px', height: '2px', background: '#AB9055', margin: '0 auto 20px', animation: 'floatUp 0.7s ease 0.45s both' }} />
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', maxWidth: '440px', margin: '0 auto', lineHeight: 1.75, animation: 'floatUp 0.7s ease 0.55s both' }}>
          Real experiences from real guests who chose Gulf Life Concierge for their 30A vacation.
        </p>
        <StatsBar isMobile={isMobile} />
      </section>

      {/* ── Reviews ─────────────────────────────────────── */}
      <section style={{ background: '#F7F4EE', padding: isMobile ? '40px 16px 56px' : '56px 40px 80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {isMobile ? (
            /* Mobile: single uniform column, all cards identical size */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {REVIEWS.map((review, i) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  delay={i * 0.06}
                  featured={review.featured}
                />
              ))}
            </div>
          ) : (
            /* Desktop: featured full-width card + 2-col grid */
            <>
              {featured && (
                <div style={{ marginBottom: '16px' }}>
                  <ReviewCard review={featured} featured delay={0} />
                </div>
              )}
              {rest.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  {rest.map((review, i) => (
                    <ReviewCard key={review.id} review={review} delay={i * 0.08} />
                  ))}
                </div>
              )}
            </>
          )}

        </div>
      </section>

      {/* ── Leave a Review CTA ──────────────────────────── */}
      <section style={{ background: '#2B354E', padding: isMobile ? '56px 24px' : '80px 40px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '16px' }}>
          Share Your Experience
        </p>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: isMobile ? '28px' : 'clamp(24px, 3.5vw, 40px)', fontWeight: 300, color: '#fff', marginBottom: '16px' }}>
          Enjoyed Your Stay?
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', marginBottom: '36px', maxWidth: '440px', margin: '0 auto 36px', lineHeight: 1.75 }}>
          We&rsquo;d love to hear about your Gulf Life experience. Your review helps future guests and means the world to our team.
        </p>
        <a href={`${WP}/review-us/`} className="btn-gold">Leave a Review</a>
      </section>
    </>
  )
}
