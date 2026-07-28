'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import StatCounter from '@/components/StatCounter'
import Map30A from '@/components/Map30A'
import WaveDivider from '@/components/WaveDivider'

const WP = ''
const UP = '/img'

const IMG = {
  hero:       `${UP}/hero.jpg`,
  propMgmt:   `${UP}/property-management.jpg`,
  ctaDiff:    `${UP}/concierge-cta.jpg`,
  commitment: `${UP}/commitment.jpg`,
  checkIcon:  `${UP}/check-light.svg`,
  logoIcon:   '/logo-white.svg',
  locPool:    `${UP}/private-pool.jpg`,
  locResort:  `${UP}/resort.jpg`,
  locBeach:   `${UP}/beachfront.jpg`,
  locAll:     `${UP}/all-rentals.jpg`,
}

// ── Mobile detection ─────────────────────────────────────
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

// ── Reusable scroll-reveal hook ──────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

const revealStyle = (visible: boolean, delay = 0): React.CSSProperties => ({
  opacity: visible ? 1 : 0,
  transform: visible ? 'translateY(0)' : 'translateY(32px)',
  transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
})

// ── Why Gulf Life feature items ──────────────────────────
const FEATURES = [
  { num: '01', title: 'No Additional Fees',           body: 'Transparent pricing, always. No surprise charges, no nickel-and-diming — ever.' },
  { num: '02', title: 'Professional Guest Comms',     body: 'Every inquiry handled promptly. Guests feel taken care of from first message to checkout.' },
  { num: '03', title: 'Dedicated Property Manager',   body: 'One real person who knows your property. No call centers, no hold times.' },
  { num: '04', title: 'Full Marketing Coverage',      body: 'Listed everywhere guests book — at no extra cost to you.' },
  { num: '05', title: 'Guest-Covered Cleaning Fees',  body: 'Cleaning and inspection fees are passed to guests. You keep more of what you earn.' },
]

// ── Reviews ──────────────────────────────────────────────
const REVIEWS = [
  {
    text: 'The house had everything we needed and more — we felt right at home. Perfect family vacation with 4 kids and parents! Communication was excellent from start to finish.',
    reviewer: 'Sarah M.',
    property: '30A Beach House',
    rating: 5,
  },
  {
    text: 'Everything was exactly as described and the team was knowledgeable about all amenities. The proximity to the private beach was truly unbeatable. This area is very special to us.',
    reviewer: 'The Johnson Family',
    property: 'Watersound Origins',
    rating: 5,
    featured: true,
  },
  {
    text: 'The Gulf Life team were wonderful! Great recommendations on things to do. The community pool was fantastic. We are already planning our return trip — this place has our hearts.',
    reviewer: 'Michael & Lisa T.',
    property: 'Grayton Beach Villa',
    rating: 5,
  },
]

// ── Vibe data ─────────────────────────────────────────────
const VIBES = [
  { id: 'all',      label: 'All Rentals',     href: `${WP}/search-results/` },
  { id: 'family',   label: 'Family Getaway',  href: `${WP}/search-results/?bedrooms_min=3` },
  { id: 'romantic', label: 'Romantic Escape', href: `${WP}/search-results/?bedrooms_max=2` },
  { id: 'group',    label: 'Large Groups',    href: `${WP}/search-results/?bedrooms_min=6` },
  { id: 'pets',     label: 'Pet-Friendly',    href: `${WP}/search-results/?pets=1` },
]

const LOCATION_CARDS = [
  { label: 'Homes With Private Pools', sub: 'Rentals', img: IMG.locPool, href: `${WP}/vacation-rentals-with-a-private-pool/` },
  { label: 'Resort Vacation',          sub: 'Rentals', img: IMG.locResort, href: `${WP}/resort-vacation-rentals/` },
  { label: 'Beach Front',              sub: 'Rentals', img: IMG.locBeach, href: `${WP}/beach-front-vacation-rentals/` },
  { label: 'All Vacation',             sub: 'Rentals', img: IMG.locAll,   href: `${WP}/search-results/` },
]

// Streamline area_id map
const AREA_IDS: Record<string, string> = {
  '30A':               '24725',
  'Destin':            '25579',
  'Grayton Beach':     '25581',
  'Inlet Beach':       '24834',
  'Miramar Beach':     '25578',
  'Rosemary Beach':    '25173',
  'Santa Rosa Beach':  '24833',
}

// ── Search bar ────────────────────────────────────────────
function SearchBar({ isMobile }: { isMobile: boolean }) {
  const [arrival, setArrival]     = useState('')
  const [departure, setDeparture] = useState('')
  const [bedrooms, setBedrooms]   = useState('')
  const [location, setLocation]   = useState('')

  function toStreamlineDate(iso: string) {
    const [y, m, d] = iso.split('-')
    return `${m}/${d}/${y}`
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const p = new URLSearchParams()
    if (arrival)   p.set('sd', toStreamlineDate(arrival))
    if (departure) p.set('ed', toStreamlineDate(departure))
    if (bedrooms)  p.set('beds', bedrooms)
    if (location && AREA_IDS[location]) p.set('area_id', AREA_IDS[location])
    window.location.href = `/search-results?${p.toString()}`
  }

  const lbl: React.CSSProperties = {
    fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 700,
    letterSpacing: '0.16em', textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.5)', marginBottom: '5px',
  }
  const inp: React.CSSProperties = {
    background: 'transparent', border: 'none', outline: 'none',
    color: '#fff', fontSize: '14px', fontFamily: 'Outfit, sans-serif',
    fontWeight: 400, width: '100%', padding: 0, appearance: 'none',
  }

  if (isMobile) {
    // ── Mobile: card layout stacked ────────────────────
    return (
      <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
        <div style={{
          background: 'rgba(15,25,48,0.72)',
          backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.14)',
          boxShadow: '0 12px 60px rgba(0,0,0,0.28)',
          overflow: 'hidden',
          padding: '16px',
          display: 'flex', flexDirection: 'column', gap: '0',
          width: '100%', boxSizing: 'border-box',
        }}>
          {/* Row 1: Check In + Check Out */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
            <div style={{ padding: '12px 16px 12px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={lbl}>Check In</span>
              <input type="date" value={arrival} onChange={e => setArrival(e.target.value)}
                style={{ ...inp, color: arrival ? '#fff' : 'rgba(255,255,255,0.45)', fontSize: '13px' }} />
            </div>
            <div style={{ padding: '12px 0 12px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={lbl}>Check Out</span>
              <input type="date" value={departure} onChange={e => setDeparture(e.target.value)}
                style={{ ...inp, color: departure ? '#fff' : 'rgba(255,255,255,0.45)', fontSize: '13px' }} />
            </div>
          </div>

          {/* Row 2: Bedrooms + Location */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
            <div style={{ padding: '12px 16px 16px 0' }}>
              <span style={lbl}>Bedrooms</span>
              <select value={bedrooms} onChange={e => setBedrooms(e.target.value)}
                style={{ ...inp, cursor: 'pointer', color: bedrooms ? '#fff' : 'rgba(255,255,255,0.45)', fontSize: '13px' }}>
                <option value="" style={{ background: '#0f1930' }}>Any</option>
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <option key={n} value={n} style={{ background: '#0f1930' }}>{n} Bed{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div style={{ padding: '12px 0 16px 16px', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={lbl}>Location</span>
              <select value={location} onChange={e => setLocation(e.target.value)}
                style={{ ...inp, cursor: 'pointer', color: location ? '#fff' : 'rgba(255,255,255,0.45)', fontSize: '13px' }}>
                <option value="" style={{ background: '#0f1930' }}>Anywhere</option>
                <option value="30A" style={{ background: '#0f1930' }}>30A</option>
                <option value="Inlet Beach" style={{ background: '#0f1930' }}>Inlet Beach</option>
                <option value="Grayton Beach" style={{ background: '#0f1930' }}>Grayton Beach</option>
                <option value="Rosemary Beach" style={{ background: '#0f1930' }}>Rosemary Beach</option>
                <option value="Miramar Beach" style={{ background: '#0f1930' }}>Miramar Beach</option>
                <option value="Destin" style={{ background: '#0f1930' }}>Destin</option>
                <option value="Santa Rosa Beach" style={{ background: '#0f1930' }}>Santa Rosa Beach</option>
              </select>
            </div>
          </div>

          {/* Search button */}
          <button
            type="submit"
            style={{
              background: 'linear-gradient(135deg, #c9a96e 0%, #AB9055 55%, #907240 100%)',
              color: '#fff', border: 'none', width: '100%', padding: '16px',
              borderRadius: '8px', fontFamily: 'Montserrat, sans-serif',
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em',
              textTransform: 'uppercase', cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(171,144,85,0.45)',
            }}
          >
            Search Rentals
          </button>
        </div>
      </form>
    )
  }

  // ── Desktop: pill layout ────────────────────────────────
  const field: React.CSSProperties = {
    flex: 1, display: 'flex', flexDirection: 'column',
    justifyContent: 'center', padding: '16px 28px', minWidth: 0,
  }
  const div: React.CSSProperties = {
    width: '1px', height: '28px', background: 'rgba(255,255,255,0.15)',
    alignSelf: 'center', flexShrink: 0,
  }

  return (
    <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: '1080px', margin: '0 auto', padding: '0 32px' }}>
      <div style={{
        display: 'flex', alignItems: 'stretch',
        background: 'rgba(15,25,48,0.52)',
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        borderRadius: '120px',
        border: '1px solid rgba(255,255,255,0.14)',
        boxShadow: '0 12px 60px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.07)',
        overflow: 'hidden',
      }}>
        <div style={field}>
          <span style={lbl}>Check In</span>
          <input type="date" value={arrival} onChange={e => setArrival(e.target.value)}
            style={{ ...inp, color: arrival ? '#fff' : 'rgba(255,255,255,0.45)' }} />
        </div>
        <div style={div} />
        <div style={field}>
          <span style={lbl}>Check Out</span>
          <input type="date" value={departure} onChange={e => setDeparture(e.target.value)}
            style={{ ...inp, color: departure ? '#fff' : 'rgba(255,255,255,0.45)' }} />
        </div>
        <div style={div} />
        <div style={field}>
          <span style={lbl}>Bedrooms</span>
          <select value={bedrooms} onChange={e => setBedrooms(e.target.value)}
            style={{ ...inp, cursor: 'pointer', color: bedrooms ? '#fff' : 'rgba(255,255,255,0.45)' }}>
            <option value="" style={{ background: '#0f1930' }}>Any</option>
            {[1,2,3,4,5,6,7,8,9,10].map(n => (
              <option key={n} value={n} style={{ background: '#0f1930' }}>{n} Bed{n > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
        <div style={div} />
        <div style={field}>
          <span style={lbl}>Location</span>
          <select value={location} onChange={e => setLocation(e.target.value)}
            style={{ ...inp, cursor: 'pointer', color: location ? '#fff' : 'rgba(255,255,255,0.45)' }}>
            <option value="" style={{ background: '#0f1930' }}>Anywhere</option>
            <option value="30A" style={{ background: '#0f1930' }}>30A</option>
            <option value="Inlet Beach" style={{ background: '#0f1930' }}>Inlet Beach</option>
            <option value="Grayton Beach" style={{ background: '#0f1930' }}>Grayton Beach</option>
            <option value="Rosemary Beach" style={{ background: '#0f1930' }}>Rosemary Beach</option>
            <option value="Miramar Beach" style={{ background: '#0f1930' }}>Miramar Beach</option>
            <option value="Destin" style={{ background: '#0f1930' }}>Destin</option>
            <option value="Santa Rosa Beach" style={{ background: '#0f1930' }}>Santa Rosa Beach</option>
          </select>
        </div>
        <div style={{ padding: '7px', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          <button
            type="submit"
            style={{
              background: 'linear-gradient(135deg, #c9a96e 0%, #AB9055 55%, #907240 100%)',
              color: '#fff', border: 'none', padding: '0 32px', height: '100%',
              borderRadius: '100px', fontFamily: 'Montserrat, sans-serif',
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em',
              textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'all 0.25s ease',
              boxShadow: '0 4px 20px rgba(171,144,85,0.45)', minHeight: '48px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #d4b87a 0%, #bda065 55%, #9e7e4a 100%)'
              e.currentTarget.style.boxShadow = '0 6px 28px rgba(171,144,85,0.65)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #c9a96e 0%, #AB9055 55%, #907240 100%)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(171,144,85,0.45)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Search Rentals
          </button>
        </div>
      </div>
    </form>
  )
}

// ── Main page ─────────────────────────────────────────────
export default function HomePage() {
  const [activeVibe, setActiveVibe] = useState('all')
  const isMobile = useIsMobile()

  // Hero animation state
  const [heroReady, setHeroReady] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 1900)
    return () => clearTimeout(t)
  }, [])

  const videoRef = useRef<HTMLVideoElement>(null)

  const s2 = useReveal()
  const s3 = useReveal()
  const s4 = useReveal()
  const s5 = useReveal()
  const s6 = useReveal()
  const s7 = useReveal()
  const s8 = useReveal()
  const s9 = useReveal()

  const heroTextStyle = (delay: number): React.CSSProperties => ({
    opacity: heroReady ? 1 : 0,
    transform: heroReady ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
  })

  return (
    <>
      {/* ════════════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: '100dvh', minHeight: '600px', display: 'flex', flexDirection: 'column', background: '#0D1520', overflow: 'hidden' }}>
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        >
          <source src="https://videos.pexels.com/video-files/28244506/12338414_1920_1080_30fps.mp4" type="video/mp4" />
        </video>

        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.52) 100%)',
        }} />

        {/* Hero content */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: isMobile ? '28px' : '44px',
          padding: isMobile ? '0 0 20px' : '0 24px',
        }}>
          {/* Label + H1 */}
          <div style={{ textAlign: 'center', ...heroTextStyle(0), padding: '0 20px', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: isMobile ? '20px' : '40px', height: '1px', background: 'rgba(171,144,85,0.8)', flexShrink: 0 }} />
              <p style={{
                fontFamily: 'Montserrat, sans-serif', fontSize: isMobile ? '8px' : '10px', fontWeight: 700,
                letterSpacing: isMobile ? '0.15em' : '0.3em', textTransform: 'uppercase', color: '#AB9055',
                whiteSpace: isMobile ? 'normal' : 'nowrap',
              }}>
                30A &amp; Emerald Coast, Florida
              </p>
              <div style={{ width: isMobile ? '20px' : '40px', height: '1px', background: 'rgba(171,144,85,0.8)', flexShrink: 0 }} />
            </div>

            <h1 style={{
              ...heroTextStyle(0.15),
              fontFamily: 'Montserrat, sans-serif',
              fontSize: isMobile ? 'clamp(28px, 8vw, 40px)' : 'clamp(42px, 7.5vw, 92px)',
              fontWeight: 700,
              letterSpacing: isMobile ? '0.03em' : '0.08em',
              textTransform: 'uppercase',
              color: '#fff',
              textShadow: '0 2px 24px rgba(0,0,0,0.25)',
              marginBottom: '12px',
              display: 'block',
              lineHeight: 1.15,
              width: '100%',
            }}>
              Live The Gulf Life
            </h1>

            <p style={{
              ...heroTextStyle(0.3),
              fontFamily: 'Montserrat, sans-serif',
              fontSize: isMobile ? '9px' : 'clamp(12px, 1.8vw, 16px)',
              fontWeight: 500,
              letterSpacing: isMobile ? '0.15em' : '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.85)',
              display: 'block',
            }}>
              Book Your Dream Vacation Now
            </p>
          </div>

          {/* Search bar */}
          <div style={{ width: '100%', maxWidth: '100%', ...heroTextStyle(0.5) }}>
            <SearchBar isMobile={isMobile} />
          </div>
        </div>

        {/* Scroll indicator — hide on mobile */}
        {!isMobile && (
          <div style={{
            position: 'absolute', bottom: '32px', left: '50%',
            transform: 'translateX(-50%)',
            ...heroTextStyle(0.8),
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          }}>
            <p style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 700,
              letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
            }}>
              Scroll
            </p>
            <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.3)', animation: 'scrollPulse 2s ease-in-out infinite' }} />
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════════════
          2. STATS STRIP
      ════════════════════════════════════════════════ */}
      <StatCounter />

      {/* ════════════════════════════════════════════════
          3. EXPERIENCE NARRATIVE
      ════════════════════════════════════════════════ */}
      <WaveDivider topColor="#fff" bottomColor="#F7F4EE" />
      <section
        ref={s2.ref as React.RefObject<HTMLElement>}
        style={{ background: '#F7F4EE', padding: isMobile ? '56px 24px' : '88px 40px' }}
      >
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '40px' : '80px',
          alignItems: 'center',
        }}>
          {/* Left — copy */}
          <div style={revealStyle(s2.visible, 0)}>
            <p style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '16px',
            }}>
              The Gulf Life Experience
            </p>
            <h2 style={{
              fontFamily: 'Outfit, sans-serif', fontSize: isMobile ? '28px' : 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 300, color: '#1A1A1A', marginBottom: '24px', lineHeight: 1.2,
            }}>
              Where Every Stay Becomes a Memory
            </h2>
            <div style={{ width: '50px', height: '2px', background: '#AB9055', marginBottom: '28px' }} />
            <p style={{ fontSize: '16px', color: '#4A4A4A', lineHeight: 1.85, marginBottom: '20px' }}>
              At Gulf Life Concierge, we believe a vacation should feel effortless from the moment
              you book to the moment you leave. Our mission is simple — deliver the highest quality
              service, tailored to the unique needs of every guest.
            </p>
            <p style={{ fontSize: '16px', color: '#4A4A4A', lineHeight: 1.85, marginBottom: '40px' }}>
              As a local, veteran-owned company with deep roots in the 30A community, we know
              these properties — and this coastline — like it's our own backyard. Because it is.
            </p>
            <a href={`${WP}/search-results/`} className="btn-navy">
              Browse Properties
            </a>
          </div>

          {/* Right — lifestyle images (hidden on mobile to save space) */}
          {!isMobile && (
            <div style={{ ...revealStyle(s2.visible, 0.15), display: 'grid', gridTemplateRows: '1fr 1fr', gap: '12px', height: '480px' }}>
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px' }}>
                <img
                  src={IMG.locBeach}
                  alt="Beachfront Gulf Life property"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{
                  position: 'absolute', bottom: '16px', left: '16px', right: '16px',
                  background: 'rgba(43,53,78,0.85)', backdropFilter: 'blur(8px)',
                  padding: '12px 16px', borderLeft: '3px solid #AB9055',
                }}>
                  <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)' }}>
                    &ldquo;Wake up to the Gulf. Walk to the beach. Return to your private pool.&rdquo;
                  </p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <img
                  src={IMG.locPool}
                  alt="Private pool vacation rental"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px', transition: 'transform 0.6s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <img
                  src={IMG.locResort}
                  alt="Resort vacation rental"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px', transition: 'transform 0.6s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
            </div>
          )}

          {/* Mobile: single full-width image */}
          {isMobile && (
            <div style={{ ...revealStyle(s2.visible, 0.1), position: 'relative', overflow: 'hidden', borderRadius: '6px', height: '240px' }}>
              <img
                src={IMG.locBeach}
                alt="Beachfront Gulf Life property"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute', bottom: '12px', left: '12px', right: '12px',
                background: 'rgba(43,53,78,0.85)', backdropFilter: 'blur(8px)',
                padding: '10px 14px', borderLeft: '3px solid #AB9055',
              }}>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)' }}>
                  &ldquo;Wake up to the Gulf. Walk to the beach. Return to your private pool.&rdquo;
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
      <WaveDivider topColor="#F7F4EE" bottomColor="#fff" />

      {/* ════════════════════════════════════════════════
          4. VIBE FILTER + LOCATION CARDS
      ════════════════════════════════════════════════ */}
      <section
        ref={s3.ref as React.RefObject<HTMLElement>}
        style={{ background: '#fff', padding: isMobile ? '56px 20px 48px' : '80px 40px 72px' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px', ...revealStyle(s3.visible) }}>
            <p style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '12px',
            }}>
              Find Your Stay
            </p>
            <h2 style={{
              fontFamily: 'Outfit, sans-serif', fontSize: isMobile ? '24px' : 'clamp(26px, 3vw, 40px)',
              fontWeight: 300, color: '#1A1A1A',
            }}>
              What Kind of Trip Are You Planning?
            </h2>
          </div>

          {/* Vibe buttons */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: '8px',
            marginBottom: '32px', flexWrap: 'wrap',
            ...revealStyle(s3.visible, 0.1),
          }}>
            {VIBES.map(v => (
              <a
                key={v.id}
                href={v.href}
                onClick={() => setActiveVibe(v.id)}
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: isMobile ? '10px' : '11px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: isMobile ? '8px 14px' : '10px 22px',
                  border: '1.5px solid',
                  borderColor: activeVibe === v.id ? '#AB9055' : 'rgba(43,53,78,0.2)',
                  background: activeVibe === v.id ? '#AB9055' : 'transparent',
                  color: activeVibe === v.id ? '#fff' : '#2B354E',
                  borderRadius: '100px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {v.label}
              </a>
            ))}
          </div>

          {/* Location cards grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: '10px',
            height: isMobile ? 'auto' : '340px',
            ...revealStyle(s3.visible, 0.2),
          }}>
            {LOCATION_CARDS.map(card => (
              <a
                key={card.label}
                href={card.href}
                style={{
                  position: 'relative', display: 'block', overflow: 'hidden',
                  textDecoration: 'none', borderRadius: '6px',
                  height: isMobile ? '160px' : '100%',
                }}
              >
                <img
                  src={card.img}
                  alt={card.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(43,53,78,0.75) 0%, rgba(0,0,0,0.1) 60%)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'flex-end',
                  padding: isMobile ? '16px 10px' : '24px 16px',
                  textAlign: 'center',
                }}>
                  <p style={{
                    fontFamily: 'Montserrat, sans-serif', color: '#fff',
                    fontSize: isMobile ? '11px' : '14px', fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '0.05em', marginBottom: '4px',
                  }}>
                    {card.label}
                  </p>
                  <p style={{
                    fontFamily: 'Montserrat, sans-serif', color: '#AB9055',
                    fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}>
                    {card.sub} →
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          5. INTERACTIVE 30A MAP
      ════════════════════════════════════════════════ */}
      <Map30A />

      {/* ════════════════════════════════════════════════
          6. WHY GULF LIFE
      ════════════════════════════════════════════════ */}
      <WaveDivider topColor="#F7F4EE" bottomColor="#fff" flip />
      <section
        ref={s4.ref as React.RefObject<HTMLElement>}
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          minHeight: isMobile ? 'auto' : '560px',
        }}
      >
        {/* Image — hidden on mobile OR shown above */}
        {!isMobile && (
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img
              src={IMG.locPool}
              alt="Private pool at a Gulf Life property"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', transition: 'transform 0.7s ease' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(43,53,78,0.5), transparent)' }} />
            <div style={{ position: 'absolute', top: '24px', left: '24px', width: '56px', height: '56px', borderTop: '2px solid #AB9055', borderLeft: '2px solid #AB9055' }} />
            <div style={{ position: 'absolute', bottom: '24px', right: '24px', width: '56px', height: '56px', borderBottom: '2px solid #AB9055', borderRight: '2px solid #AB9055' }} />
          </div>
        )}

        {/* Content */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: isMobile ? '48px 24px' : '60px 72px', background: '#fff',
          ...revealStyle(s4.visible, 0.1),
        }}>
          <p style={{
            fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '14px',
          }}>
            Why Gulf Life
          </p>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif', fontSize: isMobile ? '24px' : 'clamp(22px, 2.5vw, 34px)',
            fontWeight: 300, color: '#1A1A1A', marginBottom: '32px', lineHeight: 1.25,
          }}>
            Everything You Need. Nothing You Don&apos;t.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {FEATURES.map((f, i) => (
              <div
                key={f.num}
                style={{
                  display: 'flex', gap: '18px', alignItems: 'flex-start',
                  padding: '16px 0',
                  borderBottom: i < FEATURES.length - 1 ? '1px solid rgba(43,53,78,0.07)' : 'none',
                }}
              >
                <span style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em',
                  color: '#AB9055', flexShrink: 0, marginTop: '2px', minWidth: '24px',
                }}>
                  {f.num}
                </span>
                <div>
                  <p style={{
                    fontFamily: 'Outfit, sans-serif', fontSize: '15px',
                    fontWeight: 600, color: '#1A1A1A', marginBottom: '3px',
                  }}>
                    {f.title}
                  </p>
                  <p style={{ fontSize: '13px', color: '#4A4A4A', lineHeight: 1.65 }}>
                    {f.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '28px' }}>
            <a href={`${WP}/search-results/`} className="btn-navy" style={{ display: 'inline-block' }}>
              Browse Properties
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          7. LIFESTYLE — Full-bleed cinematic
      ════════════════════════════════════════════════ */}
      <section
        ref={s5.ref as React.RefObject<HTMLElement>}
        style={{ position: 'relative', minHeight: isMobile ? '480px' : '640px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}
      >
        <img
          src={IMG.locAll}
          alt="Gulf Life beachfront experience"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />

        <div style={{
          position: 'absolute', inset: 0,
          background: isMobile
            ? 'rgba(13,21,32,0.75)'
            : 'linear-gradient(to right, rgba(13,21,32,0.92) 0%, rgba(13,21,32,0.75) 45%, rgba(13,21,32,0.15) 75%, transparent 100%)',
        }} />

        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: '1200px', width: '100%',
          margin: '0 auto', padding: isMobile ? '60px 24px' : '80px 60px',
          ...revealStyle(s5.visible, 0),
        }}>
          <div style={{ maxWidth: isMobile ? '100%' : '520px' }}>
            <p style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.28em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '20px',
            }}>
              The Experience
            </p>

            <h2 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: isMobile ? '28px' : 'clamp(32px, 4.5vw, 58px)',
              fontWeight: 300, color: '#fff',
              lineHeight: 1.15, marginBottom: '12px',
            }}>
              This Isn&apos;t Just a Rental.
              <br />
              <span style={{ color: '#AB9055' }}>It&apos;s Your Home on the Gulf.</span>
            </h2>

            <div style={{ width: '50px', height: '2px', background: '#AB9055', margin: '24px 0' }} />

            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.85, marginBottom: '16px' }}>
              Morning coffee with the sound of waves. Evenings by the private pool under Gulf Coast stars.
              Days on the most beautiful stretch of coastline in America.
            </p>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.85, marginBottom: '36px' }}>
              No hassle, no surprises — just an exceptional stay you&apos;ll book again next year.
            </p>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact-us" className="btn-gold">
                Plan Your Visit
              </Link>
              <a
                href={`${WP}/search-results/`}
                style={{
                  fontFamily: 'Montserrat, sans-serif', fontSize: '12px', fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                Browse Properties →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          8. TESTIMONIALS
      ════════════════════════════════════════════════ */}
      <WaveDivider topColor="#2B354E" bottomColor="#fff" flip />
      <section
        ref={s6.ref as React.RefObject<HTMLElement>}
        style={{ background: '#fff', padding: isMobile ? '56px 20px' : '88px 40px' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px', ...revealStyle(s6.visible) }}>
            <p style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '12px',
            }}>
              Don&apos;t Take Our Word For It
            </p>
            <h2 style={{
              fontFamily: 'Outfit, sans-serif', fontSize: isMobile ? '24px' : 'clamp(26px, 3.5vw, 44px)',
              fontWeight: 300, color: '#1A1A1A',
            }}>
              What Our Guests Say
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '12px' : '2px',
            ...revealStyle(s6.visible, 0.1),
          }}>
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                style={{
                  background: r.featured ? '#2B354E' : '#F7F4EE',
                  padding: isMobile ? '36px 28px' : '52px 44px',
                  display: 'flex', flexDirection: 'column', gap: '20px',
                  position: 'relative',
                }}
              >
                <div style={{
                  position: 'absolute', top: '24px', left: '32px',
                  fontFamily: 'Georgia, serif',
                  fontSize: '80px', lineHeight: 1,
                  color: r.featured ? 'rgba(171,144,85,0.25)' : 'rgba(171,144,85,0.15)',
                  userSelect: 'none',
                }}>
                  &ldquo;
                </div>

                <div style={{ display: 'flex', gap: '3px' }}>
                  {Array(r.rating).fill(0).map((_, si) => (
                    <svg key={si} width="16" height="16" viewBox="0 0 24 24" fill="#AB9055">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                    </svg>
                  ))}
                </div>

                <p style={{
                  fontSize: '15px', lineHeight: 1.85,
                  color: r.featured ? 'rgba(255,255,255,0.88)' : '#4A4A4A',
                  fontStyle: 'italic', position: 'relative', zIndex: 1,
                }}>
                  &ldquo;{r.text}&rdquo;
                </p>

                <div>
                  <p style={{
                    fontFamily: 'Montserrat, sans-serif', fontSize: '11px',
                    fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: '#AB9055',
                  }}>
                    {r.reviewer}
                  </p>
                  <p style={{ fontSize: '13px', color: r.featured ? 'rgba(255,255,255,0.45)' : '#bbb', marginTop: '4px' }}>
                    {r.property}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px', ...revealStyle(s6.visible, 0.2) }}>
            <Link href="/guest-reviews" className="btn-navy">
              Read All Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          9. TRUST / PRESS BAR
      ════════════════════════════════════════════════ */}
      <WaveDivider topColor="#fff" bottomColor="#F7F4EE" />
      <section
        ref={s7.ref as React.RefObject<HTMLElement>}
        style={{ background: '#F7F4EE', padding: '24px 20px 32px' }}
      >
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '12px', flexWrap: 'wrap',
          ...revealStyle(s7.visible),
        }}>
          <p style={{
            fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AB9055',
            marginRight: '4px', flexShrink: 0,
          }}>
            As Seen In
          </p>
          <div style={{ width: '1px', height: '20px', background: 'rgba(171,144,85,0.3)', flexShrink: 0 }} />
          {[
            'Emerald Coast Magazine',
            'Visit Florida',
            '30A Life',
            'VacationRenter',
            'Vacation Rental Pro',
          ].map((name, i, arr) => (
            <span key={name} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{
                fontFamily: 'Outfit, sans-serif', fontSize: isMobile ? '13px' : '15px', fontWeight: 600,
                color: 'rgba(43,53,78,0.45)', letterSpacing: '0.02em', whiteSpace: 'nowrap',
              }}>
                {name}
              </span>
              {i < arr.length - 1 && (
                <span style={{ color: 'rgba(171,144,85,0.3)', fontSize: '18px' }}>·</span>
              )}
            </span>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          10. PROPERTY OWNERS CTA
      ════════════════════════════════════════════════ */}
      <WaveDivider topColor="#F7F4EE" bottomColor="#0D1520" />
      <section
        ref={s8.ref as React.RefObject<HTMLElement>}
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          minHeight: isMobile ? 'auto' : '520px',
        }}
      >
        {/* Dark content */}
        <div style={{
          background: '#0D1520',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: isMobile ? '56px 24px' : '80px 72px',
          ...revealStyle(s8.visible),
        }}>
          <p style={{
            fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '16px',
          }}>
            Property Owners
          </p>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif', fontSize: isMobile ? '24px' : 'clamp(26px, 3vw, 44px)',
            fontWeight: 300, color: '#fff', lineHeight: 1.2, marginBottom: '12px',
          }}>
            Own a 30A Property? Let Us Maximize It.
          </h2>
          <div style={{ width: '50px', height: '2px', background: '#AB9055', marginBottom: '32px' }} />

          {[
            'Higher revenue — we market where guests actually book',
            'Zero hidden fees — transparent pricing from day one',
            'Dedicated manager — real person, real phone number',
          ].map((text, i) => (
            <div key={i} style={{ display: 'flex', gap: '14px', marginBottom: '18px', alignItems: 'flex-start' }}>
              <div style={{
                width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                background: 'rgba(171,144,85,0.15)', border: '1px solid rgba(171,144,85,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px',
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#AB9055" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.65 }}>
                {text}
              </p>
            </div>
          ))}

          <div style={{ marginTop: '16px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/property-management" className="btn-gold">
              Learn More
            </Link>
            <a href="tel:8508427619" style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: '12px', fontWeight: 700,
              letterSpacing: '0.1em', color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
            }}>
              (850) 842-7619 →
            </a>
          </div>
        </div>

        {/* Image — hidden on mobile */}
        {!isMobile && (
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img
              src={IMG.locBeach}
              alt="Gulf Coast beachfront property"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', minHeight: '520px', transition: 'transform 0.7s ease' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,21,32,0.4), rgba(13,21,32,0.1))' }} />
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════════════
          11. SERVICES CHECKLIST
      ════════════════════════════════════════════════ */}
      <section
        ref={s9.ref as React.RefObject<HTMLElement>}
        style={{ position: 'relative', color: '#fff', padding: isMobile ? '64px 24px' : '88px 60px', overflow: 'hidden' }}
      >
        <img
          src={IMG.ctaDiff}
          alt=""
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(17,28,48,0.90)' }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 2, ...revealStyle(s9.visible) }}>
          <p style={{
            fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '16px',
          }}>
            Full-Service Management
          </p>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif', fontSize: isMobile ? '22px' : 'clamp(22px, 3vw, 38px)',
            fontWeight: 300, color: '#fff', marginBottom: '12px',
          }}>
            Everything Handled. Nothing Missed.
          </h2>
          <div style={{ width: '50px', height: '2px', background: '#AB9055', marginBottom: '36px' }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '14px' : '16px 64px',
            marginBottom: '48px',
          }}>
            {[
              'Marketing and booking management across all major platforms',
              'Property maintenance and cleaning coordination',
              'Rent collection and monthly distributions with detailed accounting',
              'Personalized owner perks — design, outfitting, and exterior care',
              'Homewatch: regular visual inspections and preventative maintenance',
              'Guest communications and emergency response 24/7',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: 'rgba(171,144,85,0.15)', border: '1px solid rgba(171,144,85,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: '2px',
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#AB9055" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.65 }}>
                  {item}
                </p>
              </div>
            ))}
          </div>

          <a href={`${WP}/search-results/`} className="btn-gold">
            See All Properties
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          12. FREE RENTAL EVALUATION FORM
      ════════════════════════════════════════════════ */}
      <WaveDivider topColor="#111c30" bottomColor="#fff" />
      <section style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        minHeight: isMobile ? 'auto' : '560px',
      }}>
        {/* Left — dark image (hidden on mobile to keep it clean) */}
        {!isMobile && (
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img
              src={IMG.propMgmt}
              alt="Sunset on the Gulf"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.52)' }} />
            <div style={{
              position: 'relative', zIndex: 2, padding: '72px 60px',
              color: '#fff', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              <p style={{
                fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700,
                letterSpacing: '0.15em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '12px',
              }}>
                Property Management
              </p>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '38px', fontWeight: 300, marginBottom: '12px', lineHeight: 1.2 }}>
                Gulf Life Concierge
              </h2>
              <div style={{ width: '50px', height: '2px', background: '#AB9055', marginBottom: '28px' }} />
              <p style={{ fontSize: '16px', lineHeight: 1.85, color: 'rgba(255,255,255,0.82)', marginBottom: '40px' }}>
                As a local company with deep knowledge of the 30A area, we are dedicated to providing
                personalized service that meets your needs and maximizes your rental income.
              </p>
              <div>
                <p style={{
                  fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px',
                  fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  Give Us A Call At:
                </p>
                <a href="tel:8508427619" style={{ color: '#fff', fontSize: '22px', fontWeight: 500, textDecoration: 'none' }}>
                  (850) 842-7619
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Right — form */}
        <div style={{ background: '#fff', padding: isMobile ? '48px 24px' : '64px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Mobile: show abbreviated heading */}
          {isMobile && (
            <div style={{ marginBottom: '24px', textAlign: 'center' }}>
              <p style={{
                fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '8px',
              }}>
                Property Management
              </p>
            </div>
          )}
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: isMobile ? '24px' : '30px', fontWeight: 300, color: '#1A1A1A', textAlign: 'center', marginBottom: '8px' }}>
            Free Rental Evaluation
          </h3>
          <p style={{ textAlign: 'center', color: '#AB9055', fontSize: '12px', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px' }}>
            Discover Your Property&rsquo;s True Potential
          </p>
          <form className="gl-form" onSubmit={e => { e.preventDefault(); window.location.href = `${WP}/contact-us/` }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <input type="text" placeholder="Name*" required />
              <input type="tel" placeholder="Phone" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <input type="email" placeholder="Email*" required />
              <input type="text" placeholder="Property Address" />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <textarea placeholder="Tell us about your property" style={{ width: '100%' }} />
            </div>
            <button type="submit" className="btn-navy" style={{ width: '100%', textAlign: 'center' }}>
              Get My Free Evaluation
            </button>
            <p style={{ textAlign: 'center', fontSize: '12px', color: '#bbb', marginTop: '12px', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.06em' }}>
              🔒 100% Private &amp; Secure
            </p>
          </form>
        </div>
      </section>
    </>
  )
}
