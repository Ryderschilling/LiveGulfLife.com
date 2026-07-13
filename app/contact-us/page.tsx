'use client'

import { useState, useEffect, useRef } from 'react'

const WP = 'https://livegulflife.com'
const UP = `${WP}/wp-content/uploads/2025/11`

const IMG = {
  hero:   `${UP}/AdobeStock_371083969-scaled.jpeg`,
  pool:   `${UP}/original_169209707_private_pool-e1764190709180.jpeg`,
  beach:  `${UP}/original_169210140_beach_front-e1764087084845.jpeg`,
}

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
  transform: visible ? 'translateY(0)' : 'translateY(24px)',
  transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
})

// ── Contact method card ───────────────────────────────────────
function ContactCard({
  icon, label, value, sub, href, delay, visible,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub: string
  href: string
  delay: number
  visible: boolean
}) {
  return (
    <a
      href={href}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '36px 32px',
        background: '#fff',
        borderRadius: '14px',
        border: '1px solid rgba(43,53,78,0.08)',
        boxShadow: '0 4px 20px rgba(43,53,78,0.06)',
        textDecoration: 'none',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        ...reveal(visible, delay),
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(43,53,78,0.12)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(43,53,78,0.06)'
      }}
    >
      {/* Icon circle */}
      <div style={{
        width: '52px', height: '52px', borderRadius: '50%',
        background: 'rgba(171,144,85,0.1)',
        border: '1px solid rgba(171,144,85,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {icon}
      </div>

      <div>
        <p style={{
          fontFamily: 'var(--font-montserrat), Josefin Sans, sans-serif',
          fontSize: '9px', fontWeight: 700,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#AB9055', marginBottom: '6px',
        }}>
          {label}
        </p>
        <p style={{
          fontFamily: 'var(--font-outfit), Plus Jakarta Sans, sans-serif',
          fontSize: '17px', fontWeight: 600,
          color: '#1A1A1A', marginBottom: '4px',
        }}>
          {value}
        </p>
        <p style={{
          fontFamily: 'var(--font-outfit), Plus Jakarta Sans, sans-serif',
          fontSize: '13px', color: '#AB9055', fontWeight: 500,
        }}>
          {sub}
        </p>
      </div>
    </a>
  )
}

// ── Page ──────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const formRef = useRef<HTMLElement>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }
  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const s1 = useReveal()
  const s2 = useReveal()
  const s3 = useReveal()

  return (
    <>
      {/* ════════════════════════════════════════════════
          1. HERO — Full-bleed, personal, warm
      ════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '580px', display: 'flex', alignItems: 'center', paddingTop: '78px' }}>
        <img
          src={IMG.hero}
          alt="Gulf Coast"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(13,21,32,0.92) 0%, rgba(43,53,78,0.80) 50%, rgba(43,53,78,0.35) 100%)' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', padding: '72px 60px', width: '100%' }}>
          <div style={{ maxWidth: '580px' }}>
            <p style={{
              fontFamily: 'var(--font-montserrat), Josefin Sans, sans-serif',
              fontSize: '10px', fontWeight: 700, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: '#AB9055', marginBottom: '20px',
              animation: 'floatUp 0.8s ease 0.2s both',
            }}>
              We&rsquo;d Love to Hear From You
            </p>
            <h1 style={{
              fontFamily: 'var(--font-outfit), Plus Jakarta Sans, sans-serif',
              fontSize: 'clamp(34px, 4.5vw, 58px)',
              fontWeight: 300, color: '#fff', lineHeight: 1.15,
              marginBottom: '12px',
              animation: 'floatUp 0.8s ease 0.35s both',
            }}>
              Let&rsquo;s Plan Your<br />
              <span style={{ color: '#AB9055' }}>Perfect Gulf Life.</span>
            </h1>
            <div style={{ width: '50px', height: '2px', background: '#AB9055', margin: '24px 0', animation: 'floatUp 0.8s ease 0.45s both' }} />
            <p style={{
              fontSize: '17px', color: 'rgba(255,255,255,0.78)',
              lineHeight: 1.8, marginBottom: '44px',
              animation: 'floatUp 0.8s ease 0.55s both',
            }}>
              Whether you&rsquo;re booking your dream vacation or considering listing your property,
              our team is real people who actually answer the phone.
            </p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', animation: 'floatUp 0.8s ease 0.65s both', flexWrap: 'wrap' }}>
              <a href="tel:8508427619" className="btn-gold" style={{ fontSize: '13px' }}>
                Call (850) 842-7619
              </a>
              <button
                onClick={scrollToForm}
                style={{
                  background: 'none', border: '1.5px solid rgba(255,255,255,0.45)',
                  color: '#fff', padding: '15px 28px', cursor: 'pointer',
                  fontFamily: 'var(--font-montserrat), Josefin Sans, sans-serif',
                  fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em',
                  textTransform: 'uppercase', transition: 'border-color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#AB9055'; e.currentTarget.style.background = 'rgba(171,144,85,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)'; e.currentTarget.style.background = 'none' }}
              >
                Send a Message ↓
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          2. THREE WAYS TO REACH US
      ════════════════════════════════════════════════ */}
      <section
        ref={s1.ref as React.RefObject<HTMLElement>}
        style={{ background: '#F7F4EE', padding: '80px 40px' }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px', ...reveal(s1.visible) }}>
            <p style={{
              fontFamily: 'var(--font-montserrat), Josefin Sans, sans-serif',
              fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: '#AB9055', marginBottom: '12px',
            }}>
              Reach Us Directly
            </p>
            <h2 style={{
              fontFamily: 'var(--font-outfit), Plus Jakarta Sans, sans-serif',
              fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 300, color: '#1A1A1A',
            }}>
              Three Ways to Connect
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <ContactCard
              href="tel:8508427619"
              label="Call Us"
              value="(850) 842-7619"
              sub="We pick up."
              delay={0}
              visible={s1.visible}
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#AB9055" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.8 19.79 19.79 0 0 1 2 1.18 2 2 0 0 1 3.98 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              }
            />
            <ContactCard
              href="sms:8508427619"
              label="Text Us"
              value="(850) 842-7619"
              sub="Fastest response"
              delay={0.08}
              visible={s1.visible}
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#AB9055" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              }
            />
            <ContactCard
              href="mailto:Connect@LiveGulfLife.com"
              label="Email Us"
              value="Connect@LiveGulfLife.com"
              sub="Within 24 hours"
              delay={0.16}
              visible={s1.visible}
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#AB9055" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          3. PERSONAL TOUCH
      ════════════════════════════════════════════════ */}
      <section
        ref={s2.ref as React.RefObject<HTMLElement>}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '400px' }}
      >
        {/* Left — image */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src={IMG.beach}
            alt="30A beachfront"
            style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '400px', transition: 'transform 0.8s ease' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          />
          {/* Gold corner accents */}
          <div style={{ position: 'absolute', top: '20px', left: '20px', width: '44px', height: '44px', borderTop: '2px solid #AB9055', borderLeft: '2px solid #AB9055' }} />
          <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '44px', height: '44px', borderBottom: '2px solid #AB9055', borderRight: '2px solid #AB9055' }} />
        </div>

        {/* Right — personal message */}
        <div style={{
          background: '#2B354E',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '72px 64px',
          ...reveal(s2.visible, 0.1),
        }}>
          <p style={{
            fontFamily: 'var(--font-montserrat), Josefin Sans, sans-serif',
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: '#AB9055', marginBottom: '16px',
          }}>
            A Note From John
          </p>
          <h2 style={{
            fontFamily: 'var(--font-outfit), Plus Jakarta Sans, sans-serif',
            fontSize: 'clamp(22px, 2.8vw, 36px)', fontWeight: 300,
            color: '#fff', lineHeight: 1.3, marginBottom: '12px',
          }}>
            There&rsquo;s No Call Center Here.
          </h2>
          <div style={{ width: '40px', height: '2px', background: '#AB9055', marginBottom: '28px' }} />
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.85, marginBottom: '20px' }}>
            When you reach out to Gulf Life Concierge, you&rsquo;re talking directly to the person
            who manages your property or booked your stay. I personally respond to every
            inquiry — usually within a few hours, never more than 24.
          </p>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.85, marginBottom: '36px' }}>
            If you have a question, a request, or just need a local recommendation —
            call, text, or email. We&rsquo;re here.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="tel:8508427619" className="btn-gold" style={{ fontSize: '12px' }}>
              Call Now
            </a>
            <button
              onClick={scrollToForm}
              style={{
                background: 'none', border: '1.5px solid rgba(171,144,85,0.4)',
                color: 'rgba(255,255,255,0.7)', padding: '15px 24px', cursor: 'pointer',
                fontFamily: 'var(--font-montserrat), Josefin Sans, sans-serif',
                fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#AB9055'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(171,144,85,0.4)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
            >
              Send a Message ↓
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          4. DARK PREMIUM FORM
      ════════════════════════════════════════════════ */}
      <section
        ref={(el) => {
          (s3.ref as React.MutableRefObject<HTMLElement | null>).current = el
          ;(formRef as React.MutableRefObject<HTMLElement | null>).current = el
        }}
        style={{ background: '#0D1520', padding: '88px 40px' }}
      >
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px', ...reveal(s3.visible) }}>
            <p style={{
              fontFamily: 'var(--font-montserrat), Josefin Sans, sans-serif',
              fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: '#AB9055', marginBottom: '12px',
            }}>
              Send a Message
            </p>
            <h2 style={{
              fontFamily: 'var(--font-outfit), Plus Jakarta Sans, sans-serif',
              fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 300, color: '#fff',
              marginBottom: '12px',
            }}>
              Tell Us How We Can Help
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.45)', maxWidth: '440px', margin: '0 auto' }}>
              Vacation booking, property inquiry, local recommendations — anything goes.
            </p>
          </div>

          {/* Form card */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(171,144,85,0.18)',
            borderRadius: '16px',
            padding: '52px 56px',
            ...reveal(s3.visible, 0.1),
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'rgba(171,144,85,0.12)', border: '1.5px solid rgba(171,144,85,0.45)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 24px',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#AB9055" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-outfit), Plus Jakarta Sans, sans-serif',
                  fontSize: '28px', fontWeight: 300, color: '#fff', marginBottom: '12px',
                }}>
                  Message Sent
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', lineHeight: 1.6 }}>
                  John will personally respond within 24 hours.<br />Usually a lot sooner.
                </p>
              </div>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  {[
                    { name: 'name',  placeholder: 'Your Name *',     type: 'text',  required: true  },
                    { name: 'email', placeholder: 'Email Address *', type: 'email', required: true  },
                    { name: 'phone', placeholder: 'Phone Number',    type: 'tel',   required: false },
                    { name: 'trip',  placeholder: 'Travel Dates or Property Address', type: 'text', required: false },
                  ].map(f => (
                    <input
                      key={f.name}
                      type={f.type}
                      name={f.name}
                      placeholder={f.placeholder}
                      required={f.required}
                      onChange={handleChange}
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '15px 18px',
                        fontFamily: 'var(--font-outfit), Plus Jakarta Sans, sans-serif',
                        fontSize: '15px', color: '#fff', outline: 'none',
                        borderRadius: '8px', transition: 'border-color 0.2s',
                        width: '100%',
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(171,144,85,0.6)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  ))}
                </div>

                <textarea
                  name="message"
                  placeholder="Tell us what you're looking for — dream vacation, property management inquiry, local tips, anything..."
                  value={form.message}
                  onChange={handleChange}
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '15px 18px',
                    fontFamily: 'var(--font-outfit), Plus Jakarta Sans, sans-serif',
                    fontSize: '15px', color: '#fff', outline: 'none',
                    borderRadius: '8px', resize: 'vertical', minHeight: '130px',
                    marginBottom: '24px', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(171,144,85,0.6)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                />

                <button
                  onClick={handleSubmit}
                  className="btn-gold"
                  style={{ width: '100%', textAlign: 'center', padding: '18px', fontSize: '13px' }}
                >
                  Send My Message
                </button>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '20px' }}>
                  {['Personal response from John', 'No spam, ever', 'Usually within hours'].map(t => (
                    <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(171,144,85,0.5)', flexShrink: 0 }} />
                      <span style={{
                        fontFamily: 'var(--font-montserrat), Josefin Sans, sans-serif',
                        fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em',
                        color: 'rgba(255,255,255,0.3)',
                      }}>
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

      {/* ════════════════════════════════════════════════
          5. QUICK ANSWERS
      ════════════════════════════════════════════════ */}
      <section style={{ background: '#F7F4EE', padding: '72px 40px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-montserrat), Josefin Sans, sans-serif',
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: '#AB9055',
            textAlign: 'center', marginBottom: '40px',
          }}>
            Quick Answers
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { q: 'What areas do you cover?', a: '30A and the full Emerald Coast — Watersound, Rosemary Beach, Seaside, Grayton Beach, and beyond.' },
              { q: 'How fast will I hear back?', a: 'John personally responds to every message. During business hours, usually within 2 hours.' },
              { q: 'Can I book directly with you?', a: 'Yes. Reach out and we\'ll work with you directly — no third-party platform fees involved.' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  padding: '28px 28px',
                  border: '1px solid rgba(43,53,78,0.07)',
                  boxShadow: '0 2px 12px rgba(43,53,78,0.05)',
                }}
              >
                <div style={{ width: '28px', height: '2px', background: '#AB9055', marginBottom: '16px' }} />
                <p style={{
                  fontFamily: 'var(--font-outfit), Plus Jakarta Sans, sans-serif',
                  fontSize: '15px', fontWeight: 600, color: '#1A1A1A', marginBottom: '10px',
                }}>
                  {item.q}
                </p>
                <p style={{ fontSize: '14px', color: '#4A4A4A', lineHeight: 1.75 }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
