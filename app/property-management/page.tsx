'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

const WP = 'https://livegulflife.com'
const UP = `${WP}/wp-content/uploads/2025/11`

const IMG = {
  heroBg:    `${UP}/AdobeStock_653632793-scaled.jpeg`,
  propImg:   `${UP}/property-5-2.jpg`,
  poolImg:   `${UP}/original_169209707_private_pool-e1764190709180.jpeg`,
  beachImg:  `${UP}/original_169210140_beach_front-e1764087084845.jpeg`,
  ctaImg:    `${UP}/AdobeStock_214368481.jpeg`,
}

// ── Scroll reveal ────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
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

const reveal = (visible: boolean, delay = 0): React.CSSProperties => ({
  opacity: visible ? 1 : 0,
  transform: visible ? 'translateY(0)' : 'translateY(28px)',
  transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
})

// ── Revenue estimate data ────────────────────────────────────────
type BedKey = 2 | 3 | 4 | 5
type LocKey = 'Watersound' | 'Rosemary Beach' | 'Seaside / WaterColor' | 'Grayton Beach' | 'Santa Rosa Beach'

const ESTIMATES: Record<LocKey, Record<BedKey, [number, number]>> = {
  'Watersound':          { 2: [45,62], 3: [66,88],  4: [88,115],  5: [115,155] },
  'Rosemary Beach':      { 2: [55,76], 3: [80,108], 4: [108,140], 5: [140,185] },
  'Seaside / WaterColor':{ 2: [50,70], 3: [74,100], 4: [98,128],  5: [125,168] },
  'Grayton Beach':       { 2: [40,56], 3: [60,80],  4: [78,104],  5: [100,136] },
  'Santa Rosa Beach':    { 2: [38,52], 3: [56,75],  4: [74,98],   5: [94,128]  },
}

const LOCATIONS = Object.keys(ESTIMATES) as LocKey[]
const BEDROOMS: BedKey[] = [2, 3, 4, 5]

// ── FAQ data ─────────────────────────────────────────────────────
const FAQS = [
  {
    q: "What is your management commission?",
    a: "We offer competitive, transparent rates with zero hidden fees. Every dollar is accounted for in your monthly distribution report. Call us to get a personalized quote — most owners are surprised by how much more they net with us versus larger platforms.",
  },
  {
    q: "Do I have to sign a long-term contract?",
    a: "No. We believe in earning your business every month, not locking you in. We work on flexible agreements because we're confident our results speak for themselves.",
  },
  {
    q: "How do you handle maintenance issues?",
    a: "We have a network of trusted local contractors and handle all coordination on your behalf. You're notified for anything above a pre-agreed threshold. Small things get fixed fast — you don't have to manage a thing.",
  },
  {
    q: "What platforms do you list my property on?",
    a: "We list across all major platforms including Airbnb, VRBO, Booking.com, and our own direct booking channel — plus targeted social and email marketing. We optimize pricing dynamically to maximize your revenue.",
  },
  {
    q: "How and when do I get paid?",
    a: "Monthly distributions with a full accounting breakdown. You know exactly what came in, what went out, and what's yours — every single month.",
  },
  {
    q: "Can I still use my property for personal stays?",
    a: "Absolutely. Owner blocks are built into our system. Just give us notice and your dates are reserved — we work around your schedule, not the other way around.",
  },
]

// ── Owner testimonials ───────────────────────────────────────────
const OWNER_REVIEWS = [
  {
    text: "After 3 years with a national company, we switched to Gulf Life. Revenue jumped 28% in year one — and we finally have someone who actually picks up the phone.",
    reviewer: "Mark & Diane S.",
    location: "Watersound Origins",
    stat: "+28% revenue",
  },
  {
    text: "They treat our home like it's their own. Not a number in a system. John knows every inch of our property and every guest who's stayed there.",
    reviewer: "Patricia L.",
    location: "Rosemary Beach",
    stat: "5★ every month",
    featured: true,
  },
  {
    text: "We were hesitant to list with anyone local, but Gulf Life proved us wrong. Zero issues in two seasons. Our property earns more and we stress less.",
    reviewer: "The Roberts Family",
    location: "Grayton Beach",
    stat: "2 seasons, 0 issues",
  },
]

// ── Comparison data ──────────────────────────────────────────────
const COMPARE_ROWS = [
  { label: 'Local 30A Expertise',     gl: true,   vacasa: false, evolve: false },
  { label: 'Dedicated Property Manager', gl: true, vacasa: false, evolve: false },
  { label: 'No Hidden Fees',          gl: true,   vacasa: false, evolve: false },
  { label: 'Transparent Accounting',  gl: true,   vacasa: true,  evolve: true  },
  { label: 'Same-Day Owner Response', gl: true,   vacasa: false, evolve: false },
  { label: 'Flexible Contract Terms', gl: true,   vacasa: false, evolve: true  },
  { label: 'Owner Property Use',      gl: true,   vacasa: true,  evolve: true  },
]

// ── Services list ────────────────────────────────────────────────
const SERVICES = [
  'Marketing across Airbnb, VRBO, Booking.com + direct',
  'Professional photography and listing optimization',
  'Dynamic pricing to maximize seasonal revenue',
  'Guest screening and 24/7 communication',
  'Cleaning coordination and property inspections',
  'Maintenance management with vetted local contractors',
  'Monthly revenue distributions with detailed reporting',
  'Homewatch: proactive visual inspections, year-round',
]

// ── Check icon ───────────────────────────────────────────────────
function Check({ gold = false }: { gold?: boolean }) {
  return (
    <div style={{
      width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
      background: gold ? 'rgba(171,144,85,0.15)' : 'rgba(43,53,78,0.1)',
      border: `1.5px solid ${gold ? 'rgba(171,144,85,0.6)' : 'rgba(43,53,78,0.3)'}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      marginTop: '2px',
    }}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
        stroke={gold ? '#AB9055' : '#2B354E'}
        strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  )
}

function X() {
  return (
    <div style={{
      width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
      background: 'rgba(200,50,50,0.08)', border: '1.5px solid rgba(200,50,50,0.25)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px',
    }}>
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
        stroke="rgba(200,50,50,0.6)" strokeWidth="3" strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
export default function PropertyManagementPage() {
  // Revenue estimator state
  const [beds, setBeds]         = useState<BedKey>(3)
  const [location, setLocation] = useState<LocKey>('Watersound')
  const [animated, setAnimated] = useState(false)

  // Trigger re-animation on change
  const triggerAnim = useCallback(() => {
    setAnimated(false)
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)))
  }, [])
  useEffect(() => { triggerAnim() }, [beds, location, triggerAnim])

  const [low, high] = ESTIMATES[location][beds]

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Form state
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  // Refs for form scroll
  const formRef = useRef<HTMLElement>(null)
  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  // Reveal refs
  const s1 = useReveal()
  const s2 = useReveal()
  const s3 = useReveal()
  const s4 = useReveal()
  const s5 = useReveal()
  const s6 = useReveal()
  const s7 = useReveal()
  const s8 = useReveal()

  return (
    <>
      {/* ══════════════════════════════════════════════════
          1. HERO — Full-width, compelling headline
      ══════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '620px', display: 'flex', alignItems: 'center', paddingTop: '78px' }}>
        <img
          src={IMG.heroBg}
          alt="Gulf Coast property"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(13,21,32,0.92) 0%, rgba(43,53,78,0.80) 55%, rgba(43,53,78,0.4) 100%)' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', padding: '72px 60px', width: '100%' }}>
          <div style={{ maxWidth: '640px' }}>
            <p style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.28em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '20px',
              animation: 'floatUp 0.8s ease 0.2s both',
            }}>
              30A Property Management
            </p>
            <h1 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(32px, 4.5vw, 58px)',
              fontWeight: 300,
              color: '#fff',
              lineHeight: 1.15,
              marginBottom: '12px',
              animation: 'floatUp 0.8s ease 0.35s both',
            }}>
              Your 30A Property Could Be Earning{' '}
              <span style={{ color: '#AB9055', fontWeight: 400 }}>$80K+ a Year.</span>
              <br />Let&apos;s Find Out.
            </h1>
            <div style={{ width: '50px', height: '2px', background: '#AB9055', margin: '24px 0', animation: 'floatUp 0.8s ease 0.45s both' }} />
            <p style={{
              fontSize: '18px', color: 'rgba(255,255,255,0.82)', lineHeight: 1.8, marginBottom: '44px',
              animation: 'floatUp 0.8s ease 0.55s both',
            }}>
              Local. Veteran-owned. Zero hidden fees. We manage your Gulf Coast property
              like it&apos;s our own — so you collect checks without lifting a finger.
            </p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', animation: 'floatUp 0.8s ease 0.65s both' }}>
              <button onClick={scrollToForm} className="btn-gold" style={{ fontSize: '13px' }}>
                Get My Free Evaluation
              </button>
              <a href="tel:8508427619" style={{
                fontFamily: 'Montserrat, sans-serif', fontSize: '12px', fontWeight: 700,
                letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
              >
                Or Call (850) 842-7619 →
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        }}>
          <div style={{ width: '1px', height: '36px', background: 'rgba(171,144,85,0.5)', animation: 'scrollPulse 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. REVENUE ESTIMATOR
      ══════════════════════════════════════════════════ */}
      <section
        ref={s1.ref as React.RefObject<HTMLElement>}
        style={{ background: '#F7F4EE', padding: '88px 40px' }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto', ...reveal(s1.visible) }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <p style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '12px',
            }}>
              Revenue Estimator
            </p>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 300, color: '#1A1A1A', marginBottom: '12px' }}>
              What Could Your Property Earn?
            </h2>
            <p style={{ fontSize: '16px', color: '#4A4A4A', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
              Select your property details to see estimated annual gross revenue for Gulf Coast properties managed by Gulf Life Concierge.
            </p>
          </div>

          {/* Estimator card */}
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 16px 56px rgba(43,53,78,0.10)',
            overflow: 'hidden',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '360px' }}>

              {/* Left — controls */}
              <div style={{ padding: '48px 52px', borderRight: '1px solid #f0ede8' }}>
                {/* Bedroom selector */}
                <p style={{
                  fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700,
                  letterSpacing: '0.18em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '16px',
                }}>
                  Bedrooms
                </p>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '36px', flexWrap: 'wrap' }}>
                  {BEDROOMS.map(b => (
                    <button
                      key={b}
                      onClick={() => setBeds(b)}
                      style={{
                        width: '52px', height: '52px',
                        border: '1.5px solid',
                        borderColor: beds === b ? '#AB9055' : 'rgba(43,53,78,0.15)',
                        background: beds === b ? '#AB9055' : '#fff',
                        color: beds === b ? '#fff' : '#2B354E',
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '13px', fontWeight: 700,
                        cursor: 'pointer',
                        borderRadius: '8px',
                        transition: 'all 0.18s ease',
                      }}
                    >
                      {b === 5 ? '5+' : b}
                    </button>
                  ))}
                </div>

                {/* Location selector */}
                <p style={{
                  fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700,
                  letterSpacing: '0.18em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '16px',
                }}>
                  Location
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {LOCATIONS.map(loc => (
                    <button
                      key={loc}
                      onClick={() => setLocation(loc)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '11px 16px',
                        border: '1.5px solid',
                        borderColor: location === loc ? '#AB9055' : 'rgba(43,53,78,0.12)',
                        background: location === loc ? 'rgba(171,144,85,0.08)' : '#fff',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.18s ease',
                        textAlign: 'left',
                      }}
                    >
                      <div style={{
                        width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
                        background: location === loc ? '#AB9055' : 'rgba(43,53,78,0.2)',
                        transition: 'background 0.18s ease',
                      }} />
                      <span style={{
                        fontFamily: 'Outfit, sans-serif', fontSize: '14px',
                        color: location === loc ? '#AB9055' : '#2B354E',
                        fontWeight: location === loc ? 600 : 400,
                        transition: 'color 0.18s ease',
                      }}>
                        {loc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right — result */}
              <div style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                padding: '48px 52px', background: '#2B354E',
                textAlign: 'center',
              }}>
                <p style={{
                  fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700,
                  letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
                  marginBottom: '8px',
                }}>
                  Estimated Annual Revenue
                </p>

                {/* Big number */}
                <div style={{
                  opacity: animated ? 1 : 0,
                  transform: animated ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.96)',
                  transition: 'opacity 0.35s ease, transform 0.35s ease',
                  marginBottom: '8px',
                }}>
                  <div style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 'clamp(42px, 5vw, 64px)',
                    fontWeight: 300,
                    color: '#fff',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}>
                    <span style={{ color: '#AB9055' }}>$</span>
                    {low.toLocaleString()}
                    <span style={{ fontSize: '0.55em', color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>K</span>
                    <span style={{ fontSize: '0.45em', color: 'rgba(255,255,255,0.35)', margin: '0 8px' }}>—</span>
                    <span style={{ color: '#AB9055' }}>$</span>
                    {high.toLocaleString()}
                    <span style={{ fontSize: '0.55em', color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>K</span>
                  </div>
                </div>

                <p style={{
                  fontFamily: 'Outfit, sans-serif', fontSize: '15px',
                  color: 'rgba(255,255,255,0.55)', marginBottom: '32px', lineHeight: 1.6,
                }}>
                  {beds === 5 ? '5+' : beds}-bed · {location}
                  <br />Based on managed properties in this area
                </p>

                {/* Mini stats */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '32px', borderRadius: '8px', overflow: 'hidden' }}>
                  {[
                    { val: '~187', label: 'Avg nights/year' },
                    { val: '0%',   label: 'Hidden fees' },
                    { val: '5★',   label: 'Guest rating' },
                    { val: '24/7', label: 'Guest support' },
                  ].map((s, i) => (
                    <div key={i} style={{ padding: '14px 12px', background: 'rgba(255,255,255,0.04)' }}>
                      <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '18px', fontWeight: 600, color: '#AB9055', marginBottom: '2px' }}>{s.val}</p>
                      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{s.label}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={scrollToForm}
                  className="btn-gold"
                  style={{ width: '100%', textAlign: 'center', fontSize: '12px' }}
                >
                  Get My Exact Estimate
                </button>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '12px', letterSpacing: '0.06em' }}>
                  Free · No commitment · 24hr response
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p style={{ textAlign: 'center', fontSize: '12px', color: '#bbb', marginTop: '16px', fontFamily: 'Montserrat, sans-serif' }}>
            * Estimates are based on Gulf Coast market averages for managed properties. Actual results vary by property.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. HOW IT WORKS
      ══════════════════════════════════════════════════ */}
      <section
        ref={s2.ref as React.RefObject<HTMLElement>}
        style={{ background: '#fff', padding: '88px 40px' }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px', ...reveal(s2.visible) }}>
            <p style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '12px',
            }}>
              The Process
            </p>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 300, color: '#1A1A1A' }}>
              Getting Started Is Simple
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', ...reveal(s2.visible, 0.1) }}>
            {[
              {
                step: '01',
                title: 'Free Evaluation Call',
                body: 'Tell us about your property. We\'ll review its potential, share comparable revenue, and walk you through exactly what we do. No sales pressure — just real information.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#AB9055" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
                  </svg>
                ),
              },
              {
                step: '02',
                title: 'We Handle Everything',
                body: 'Listing, photography, pricing, guests, maintenance, cleaning — all managed by our team. You get access to your owner dashboard and a direct line to your property manager.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#AB9055" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                ),
              },
              {
                step: '03',
                title: 'You Collect Checks',
                body: 'Monthly distributions hit your account with full transparency — every dollar accounted for. Watch your property earn more with less work than you ever thought possible.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#AB9055" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '52px 48px',
                  borderRight: i < 2 ? '1px solid #f0ede8' : 'none',
                  position: 'relative',
                }}
              >
                {/* Step number */}
                <div style={{
                  position: 'absolute', top: '48px', right: '48px',
                  fontFamily: 'Outfit, sans-serif', fontSize: '64px', fontWeight: 300,
                  color: 'rgba(171,144,85,0.08)', lineHeight: 1, userSelect: 'none',
                }}>
                  {item.step}
                </div>

                {/* Icon */}
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: 'rgba(171,144,85,0.1)',
                  border: '1px solid rgba(171,144,85,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '24px',
                }}>
                  {item.icon}
                </div>

                <h3 style={{
                  fontFamily: 'Outfit, sans-serif', fontSize: '20px', fontWeight: 500,
                  color: '#1A1A1A', marginBottom: '14px',
                }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '15px', color: '#4A4A4A', lineHeight: 1.8 }}>
                  {item.body}
                </p>

                {/* Connector arrow */}
                {i < 2 && (
                  <div style={{
                    position: 'absolute', top: '50%', right: '-12px',
                    transform: 'translateY(-50%)',
                    width: '24px', height: '24px',
                    background: '#fff',
                    border: '1px solid #f0ede8',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 2,
                  }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#AB9055" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '56px', ...reveal(s2.visible, 0.2) }}>
            <button onClick={scrollToForm} className="btn-navy">
              Start My Free Evaluation
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. COMPARISON TABLE
      ══════════════════════════════════════════════════ */}
      <section
        ref={s3.ref as React.RefObject<HTMLElement>}
        style={{ background: '#F7F4EE', padding: '88px 40px' }}
      >
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px', ...reveal(s3.visible) }}>
            <p style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '12px',
            }}>
              How We Stack Up
            </p>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 300, color: '#1A1A1A' }}>
              Why Gulf Life Beats the Big Names
            </h2>
          </div>

          <div style={{
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(43,53,78,0.08)',
            overflow: 'hidden',
            ...reveal(s3.visible, 0.1),
          }}>
            {/* Header row */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>
              <div style={{ padding: '20px 28px', background: '#fff' }} />
              {[
                { name: 'Gulf Life', highlight: true },
                { name: 'Vacasa', highlight: false },
                { name: 'Evolve', highlight: false },
              ].map(col => (
                <div key={col.name} style={{
                  padding: '20px 16px', textAlign: 'center',
                  background: col.highlight ? '#2B354E' : '#f8f7f4',
                  borderLeft: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <p style={{
                    fontFamily: 'Montserrat, sans-serif', fontSize: '12px', fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: col.highlight ? '#AB9055' : '#999',
                  }}>
                    {col.name}
                  </p>
                  {col.highlight && (
                    <div style={{ width: '20px', height: '1px', background: 'rgba(171,144,85,0.5)', margin: '6px auto 0' }} />
                  )}
                </div>
              ))}
            </div>

            {/* Data rows */}
            {COMPARE_ROWS.map((row, i) => (
              <div
                key={i}
                style={{
                  display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
                  borderTop: '1px solid #f0ede8',
                }}
              >
                <div style={{ padding: '18px 28px', display: 'flex', alignItems: 'center' }}>
                  <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '15px', color: '#1A1A1A' }}>
                    {row.label}
                  </p>
                </div>
                {[
                  { val: row.gl,     bg: 'rgba(171,144,85,0.04)' },
                  { val: row.vacasa, bg: '#fff' },
                  { val: row.evolve, bg: '#fff' },
                ].map((cell, ci) => (
                  <div key={ci} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '18px 16px',
                    borderLeft: '1px solid #f0ede8',
                    background: ci === 0 ? 'rgba(171,144,85,0.05)' : (i % 2 === 0 ? '#fff' : '#fafafa'),
                  }}>
                    {cell.val ? <Check gold={ci === 0} /> : <X />}
                  </div>
                ))}
              </div>
            ))}

            {/* CTA row */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', borderTop: '1px solid #f0ede8' }}>
              <div style={{ padding: '20px 28px' }} />
              <div style={{ padding: '20px 16px', background: 'rgba(171,144,85,0.05)' }}>
                <button onClick={scrollToForm} className="btn-gold" style={{ width: '100%', textAlign: 'center', padding: '12px 8px', fontSize: '11px' }}>
                  Choose Us
                </button>
              </div>
              <div style={{ padding: '20px 16px' }}>
                <div style={{
                  width: '100%', padding: '12px 8px', textAlign: 'center',
                  fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700,
                  letterSpacing: '0.08em', color: '#bbb',
                }}>
                  National Brand
                </div>
              </div>
              <div style={{ padding: '20px 16px' }}>
                <div style={{
                  width: '100%', padding: '12px 8px', textAlign: 'center',
                  fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700,
                  letterSpacing: '0.08em', color: '#bbb',
                }}>
                  National Brand
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. OWNER TESTIMONIALS
      ══════════════════════════════════════════════════ */}
      <section
        ref={s4.ref as React.RefObject<HTMLElement>}
        style={{ background: '#2B354E', padding: '88px 40px' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px', ...reveal(s4.visible) }}>
            <p style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '12px',
            }}>
              Owner Reviews
            </p>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 300, color: '#fff' }}>
              Straight From Our Property Owners
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', ...reveal(s4.visible, 0.1) }}>
            {OWNER_REVIEWS.map((r, i) => (
              <div
                key={i}
                style={{
                  padding: '52px 44px',
                  background: r.featured ? 'rgba(171,144,85,0.12)' : 'rgba(255,255,255,0.04)',
                  border: r.featured ? '1px solid rgba(171,144,85,0.3)' : '1px solid rgba(255,255,255,0.06)',
                  position: 'relative',
                }}
              >
                {/* Big quote */}
                <div style={{
                  position: 'absolute', top: '20px', left: '32px',
                  fontFamily: 'Georgia, serif', fontSize: '72px', lineHeight: 1,
                  color: 'rgba(171,144,85,0.15)', userSelect: 'none',
                }}>
                  &ldquo;
                </div>

                {/* Stat badge */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center',
                  background: 'rgba(171,144,85,0.15)',
                  border: '1px solid rgba(171,144,85,0.3)',
                  borderRadius: '100px',
                  padding: '5px 14px',
                  marginBottom: '20px',
                }}>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: '#AB9055' }}>
                    {r.stat}
                  </p>
                </div>

                <p style={{ fontSize: '16px', lineHeight: 1.85, color: 'rgba(255,255,255,0.85)', fontStyle: 'italic', marginBottom: '28px', position: 'relative', zIndex: 1 }}>
                  &ldquo;{r.text}&rdquo;
                </p>

                <div>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#AB9055' }}>
                    {r.reviewer}
                  </p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
                    {r.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. SERVICES CHECKLIST (why choose us)
      ══════════════════════════════════════════════════ */}
      <section
        ref={s5.ref as React.RefObject<HTMLElement>}
        style={{ background: '#fff', padding: '88px 60px' }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px', ...reveal(s5.visible) }}>
            <p style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '12px',
            }}>
              What You Get
            </p>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 300, color: '#1A1A1A' }}>
              Full-Service Management. Nothing Left Out.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', ...reveal(s5.visible, 0.1) }}>
            <div style={{ borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
              <img
                src={IMG.poolImg}
                alt="Gulf Life managed property"
                style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
              {/* Gold corner accents */}
              <div style={{ position: 'absolute', top: '16px', left: '16px', width: '40px', height: '40px', borderTop: '2px solid #AB9055', borderLeft: '2px solid #AB9055' }} />
              <div style={{ position: 'absolute', bottom: '16px', right: '16px', width: '40px', height: '40px', borderBottom: '2px solid #AB9055', borderRight: '2px solid #AB9055' }} />
            </div>

            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '40px' }}>
                {SERVICES.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <Check gold />
                    <p style={{ fontSize: '15px', color: '#4A4A4A', lineHeight: 1.65 }}>{item}</p>
                  </div>
                ))}
              </div>
              <button onClick={scrollToForm} className="btn-navy">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          7. FAQ ACCORDION
      ══════════════════════════════════════════════════ */}
      <section
        ref={s6.ref as React.RefObject<HTMLElement>}
        style={{ background: '#F7F4EE', padding: '88px 40px' }}
      >
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px', ...reveal(s6.visible) }}>
            <p style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '12px',
            }}>
              Common Questions
            </p>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 300, color: '#1A1A1A' }}>
              Answers Before You Call
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', ...reveal(s6.visible, 0.1) }}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderBottom: '1px solid rgba(43,53,78,0.1)',
                  background: openFaq === i ? '#fff' : 'transparent',
                  transition: 'background 0.2s ease',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', padding: '22px 28px',
                    background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                    gap: '16px',
                  }}
                >
                  <span style={{
                    fontFamily: 'Outfit, sans-serif', fontSize: '17px',
                    fontWeight: 500, color: '#1A1A1A',
                  }}>
                    {faq.q}
                  </span>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                    background: openFaq === i ? '#AB9055' : 'rgba(43,53,78,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s ease, transform 0.2s ease',
                    transform: openFaq === i ? 'rotate(45deg)' : 'none',
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke={openFaq === i ? '#fff' : '#2B354E'}
                      strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </div>
                </button>

                <div style={{
                  maxHeight: openFaq === i ? '200px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                }}>
                  <p style={{
                    padding: '0 28px 24px',
                    fontSize: '15px', color: '#4A4A4A', lineHeight: 1.8,
                  }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px', ...reveal(s6.visible, 0.15) }}>
            <p style={{ fontSize: '16px', color: '#4A4A4A', marginBottom: '20px' }}>
              Still have questions? We answer calls personally.
            </p>
            <a href="tel:8508427619" className="btn-navy">
              Call (850) 842-7619
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          8. ROI STATS STRIP
      ══════════════════════════════════════════════════ */}
      <section
        ref={s7.ref as React.RefObject<HTMLElement>}
        style={{ position: 'relative', padding: '80px 40px', overflow: 'hidden' }}
      >
        <img
          src={IMG.ctaImg}
          alt="Gulf Coast"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,21,32,0.82)' }} />

        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: '1100px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0', textAlign: 'center',
          ...reveal(s7.visible),
        }}>
          {[
            { val: '$78K',  label: 'Avg 2024 owner gross' },
            { val: '40+',   label: 'Properties managed' },
            { val: '5★',    label: 'Average guest rating' },
            { val: '0%',    label: 'Hidden fees, ever' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '0 32px',
              borderRight: i < 3 ? '1px solid rgba(171,144,85,0.2)' : 'none',
            }}>
              <p style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 300, color: '#fff', lineHeight: 1, marginBottom: '10px',
                letterSpacing: '-0.02em',
              }}>
                <span style={{ color: '#AB9055' }}>{s.val}</span>
              </p>
              <p style={{
                fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
              }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          9. PREMIUM FORM
      ══════════════════════════════════════════════════ */}
      <section
        ref={(el) => {
          (s8.ref as React.MutableRefObject<HTMLElement | null>).current = el;
          (formRef as React.MutableRefObject<HTMLElement | null>).current = el;
        }}
        style={{ background: '#0D1520', padding: '88px 40px' }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px', ...reveal(s8.visible) }}>
            <p style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '12px',
            }}>
              Get Started
            </p>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 300, color: '#fff', marginBottom: '14px' }}>
              Free Property Evaluation
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', maxWidth: '480px', margin: '0 auto' }}>
              Takes 2 minutes. We&apos;ll respond within 24 hours with a full revenue analysis for your property.
            </p>
          </div>

          {/* Form card */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(171,144,85,0.2)',
            borderRadius: '16px',
            padding: '52px 60px',
            ...reveal(s8.visible, 0.1),
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'rgba(171,144,85,0.15)', border: '1.5px solid rgba(171,144,85,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 24px',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#AB9055" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 300, color: '#fff', marginBottom: '12px' }}>
                  Request Received
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px', lineHeight: 1.6 }}>
                  We&apos;ll be in touch within 24 hours with a full revenue analysis<br />for your property.
                </p>
              </div>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  {[
                    { name: 'name',    placeholder: 'Your Name *', type: 'text',  required: true  },
                    { name: 'phone',   placeholder: 'Phone Number', type: 'tel',   required: false },
                    { name: 'email',   placeholder: 'Email Address *', type: 'email', required: true  },
                    { name: 'address', placeholder: 'Property Address', type: 'text', required: false },
                  ].map(f => (
                    <input
                      key={f.name}
                      type={f.type}
                      name={f.name}
                      placeholder={f.placeholder}
                      required={f.required}
                      value={form[f.name as keyof typeof form]}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        padding: '15px 18px',
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: '15px',
                        color: '#fff',
                        outline: 'none',
                        borderRadius: '6px',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(171,144,85,0.6)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                    />
                  ))}
                </div>

                <textarea
                  name="message"
                  placeholder="Tell us about your property — location, bedrooms, current booking status..."
                  value={form.message}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    padding: '15px 18px',
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '15px',
                    color: '#fff',
                    outline: 'none',
                    borderRadius: '6px',
                    resize: 'vertical',
                    minHeight: '120px',
                    marginBottom: '24px',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(171,144,85,0.6)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                />

                <button
                  onClick={handleSubmit}
                  className="btn-gold"
                  style={{ width: '100%', textAlign: 'center', padding: '18px', fontSize: '13px' }}
                >
                  Get My Free Revenue Analysis
                </button>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '28px', marginTop: '20px' }}>
                  {['No commitment required', '24hr response', '100% confidential'].map(t => (
                    <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(171,144,85,0.6)' }} />
                      <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.35)' }}>
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
