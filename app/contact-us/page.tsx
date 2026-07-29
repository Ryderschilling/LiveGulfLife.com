'use client'

import { useState, useEffect, useRef } from 'react'

const WP = ''
const UP = '/img'

const IMG = {
  hero:  `${UP}/concierge-cta.jpg`,
  beach: `${UP}/beachfront.jpg`,
}

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

export default function ContactPage() {
  const isMobile = useIsMobile()
  const [form, setForm]         = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef<HTMLElement>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  function handleSubmit(e: React.FormEvent) { e.preventDefault(); setSubmitted(true) }
  function scrollToForm() { formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }

  const s1 = useReveal()
  const s2 = useReveal()
  const s3 = useReveal()

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    padding: '14px 16px',
    fontFamily: 'Outfit, sans-serif',
    fontSize: '15px', color: '#fff', outline: 'none',
    borderRadius: '8px', transition: 'border-color 0.2s',
    width: '100%',
  }

  return (
    <>
      {/* ══ 1. HERO ══════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: isMobile ? '480px' : '580px', display: 'flex', alignItems: 'center', paddingTop: isMobile ? '64px' : '78px' }}>
        <img src={IMG.hero} alt="Gulf Coast" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(13,21,32,0.92) 0%, rgba(43,53,78,0.80) 50%, rgba(43,53,78,0.35) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '48px 24px' : '72px 60px', width: '100%' }}>
          <div style={{ maxWidth: '580px' }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '16px', animation: 'floatUp 0.8s ease 0.2s both' }}>
              We&rsquo;d Love to Hear From You
            </p>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: isMobile ? '30px' : 'clamp(34px, 4.5vw, 58px)', fontWeight: 300, color: '#fff', lineHeight: 1.2, marginBottom: '12px', animation: 'floatUp 0.8s ease 0.35s both' }}>
              Let&rsquo;s Plan Your<br />
              <span style={{ color: '#AB9055' }}>Perfect Gulf Life.</span>
            </h1>
            <div style={{ width: '50px', height: '2px', background: '#AB9055', margin: '20px 0', animation: 'floatUp 0.8s ease 0.45s both' }} />
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.8, marginBottom: '36px', animation: 'floatUp 0.8s ease 0.55s both' }}>
              Whether you&rsquo;re booking your dream vacation or considering listing your property, our team is real people who actually answer the phone.
            </p>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', animation: 'floatUp 0.8s ease 0.65s both', flexWrap: 'wrap' }}>
              <a href="tel:8508427619" className="btn-gold" style={{ fontSize: '13px' }}>Call (850) 842-7619</a>
              <button onClick={scrollToForm} style={{ background: 'none', border: '1.5px solid rgba(255,255,255,0.45)', color: '#fff', padding: '14px 24px', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Send a Message ↓
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. THREE WAYS TO CONNECT ═════════════════════ */}
      <section ref={s1.ref as React.RefObject<HTMLElement>} style={{ background: '#F7F4EE', padding: isMobile ? '48px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '28px' : '48px', ...reveal(s1.visible) }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '10px' }}>
              Reach Us Directly
            </p>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: isMobile ? '24px' : 'clamp(24px, 3vw, 38px)', fontWeight: 300, color: '#1A1A1A' }}>
              Three Ways to Connect
            </h2>
          </div>

          {/* Cards: single column on mobile */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', ...reveal(s1.visible, 0.05) }}>
            {[
              {
                href: 'tel:8508427619', label: 'Call Us', value: '(850) 842-7619', sub: 'We pick up.',
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#AB9055" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.8 19.79 19.79 0 0 1 2 1.18 2 2 0 0 1 3.98 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
              },
              {
                href: 'sms:8508427619', label: 'Text Us', value: '(850) 842-7619', sub: 'Fastest response',
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#AB9055" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
              },
              {
                href: 'mailto:Host@LiveGulfLife.com', label: 'Email Us', value: 'Host@LiveGulfLife.com', sub: 'Within 24 hours',
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#AB9055" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
              },
            ].map((card, i) => (
              <a key={i} href={card.href} style={{
                display: 'flex',
                flexDirection: isMobile ? 'row' : 'column',
                alignItems: isMobile ? 'center' : 'flex-start',
                gap: isMobile ? '16px' : '16px',
                padding: isMobile ? '20px 20px' : '36px 32px',
                background: '#fff',
                borderRadius: '14px',
                border: '1px solid rgba(43,53,78,0.08)',
                boxShadow: '0 4px 20px rgba(43,53,78,0.06)',
                textDecoration: 'none',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}>
                {/* Icon circle */}
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(171,144,85,0.1)', border: '1px solid rgba(171,144,85,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {card.icon}
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '4px' }}>
                    {card.label}
                  </p>
                  <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: isMobile ? '16px' : '17px', fontWeight: 600, color: '#1A1A1A', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {card.value}
                  </p>
                  <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: '#AB9055', fontWeight: 500 }}>
                    {card.sub}
                  </p>
                </div>
                {/* Arrow on mobile */}
                {isMobile && (
                  <svg style={{ marginLeft: 'auto', flexShrink: 0 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#AB9055" strokeWidth="2" strokeLinecap="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. A NOTE FROM JOHN ══════════════════════════ */}
      <section ref={s2.ref as React.RefObject<HTMLElement>} style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        minHeight: isMobile ? 'auto' : '400px',
      }}>
        {/* Image: top on mobile, left on desktop */}
        <div style={{ position: 'relative', overflow: 'hidden', minHeight: isMobile ? '220px' : '400px' }}>
          <img src={IMG.beach} alt="30A beachfront" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', position: 'absolute', inset: 0 }} />
          <div style={{ position: 'absolute', top: '16px', left: '16px', width: '36px', height: '36px', borderTop: '2px solid #AB9055', borderLeft: '2px solid #AB9055' }} />
          <div style={{ position: 'absolute', bottom: '16px', right: '16px', width: '36px', height: '36px', borderBottom: '2px solid #AB9055', borderRight: '2px solid #AB9055' }} />
        </div>

        {/* Content */}
        <div style={{
          background: '#2B354E',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: isMobile ? '40px 24px' : '72px 64px',
          ...reveal(s2.visible, 0.1),
        }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '14px' }}>
            A Note From John
          </p>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: isMobile ? '24px' : 'clamp(22px, 2.8vw, 36px)', fontWeight: 300, color: '#fff', lineHeight: 1.3, marginBottom: '12px' }}>
            There&rsquo;s No Call Center Here.
          </h2>
          <div style={{ width: '40px', height: '2px', background: '#AB9055', marginBottom: '24px' }} />
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.85, marginBottom: '16px' }}>
            When you reach out to Gulf Life Concierge, you&rsquo;re talking directly to the person who manages your property or booked your stay. I personally respond to every inquiry, usually within a few hours, never more than 24.
          </p>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.85, marginBottom: '32px' }}>
            If you have a question, a request, or just need a local recommendation, call, text, or email. We&rsquo;re here.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="tel:8508427619" className="btn-gold" style={{ fontSize: '12px' }}>Call Now</a>
            <button onClick={scrollToForm} style={{ background: 'none', border: '1.5px solid rgba(171,144,85,0.4)', color: 'rgba(255,255,255,0.7)', padding: '14px 20px', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Send a Message ↓
            </button>
          </div>
        </div>
      </section>

      {/* ══ 4. FORM ══════════════════════════════════════ */}
      <section
        ref={(el) => {
          (s3.ref as React.MutableRefObject<HTMLElement | null>).current = el
          ;(formRef as React.MutableRefObject<HTMLElement | null>).current = el
        }}
        style={{ background: '#0D1520', padding: isMobile ? '56px 20px' : '88px 40px' }}
      >
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '36px' : '52px', ...reveal(s3.visible) }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '12px' }}>
              Send a Message
            </p>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: isMobile ? '26px' : 'clamp(24px, 3vw, 40px)', fontWeight: 300, color: '#fff', marginBottom: '10px' }}>
              Tell Us How We Can Help
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', maxWidth: '440px', margin: '0 auto' }}>
              Vacation booking, property inquiry, local recommendations. Anything goes.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(171,144,85,0.18)', borderRadius: '16px', padding: isMobile ? '28px 20px' : '52px 56px', ...reveal(s3.visible, 0.1) }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(171,144,85,0.12)', border: '1.5px solid rgba(171,144,85,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#AB9055" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '26px', fontWeight: 300, color: '#fff', marginBottom: '12px' }}>Message Sent</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.6 }}>John will personally respond within 24 hours. Usually a lot sooner.</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  {[
                    { name: 'name',  placeholder: 'Your Name *',                      type: 'text',  required: true  },
                    { name: 'email', placeholder: 'Email Address *',                  type: 'email', required: true  },
                    { name: 'phone', placeholder: 'Phone Number',                     type: 'tel',   required: false },
                    { name: 'trip',  placeholder: 'Travel Dates or Property Address', type: 'text',  required: false },
                  ].map(f => (
                    <input key={f.name} type={f.type} name={f.name} placeholder={f.placeholder} required={f.required} onChange={handleChange}
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(171,144,85,0.6)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  ))}
                </div>
                <textarea name="message" placeholder="Tell us what you're looking for: dream vacation, property management inquiry, local tips, anything..." value={form.message} onChange={handleChange}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '120px', marginBottom: '20px' }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(171,144,85,0.6)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
                <button onClick={handleSubmit} className="btn-gold" style={{ width: '100%', textAlign: 'center', padding: '16px', fontSize: '13px' }}>
                  Send My Message
                </button>
                <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? '14px' : '32px', marginTop: '16px', flexWrap: 'wrap' }}>
                  {['Personal response from John', 'No spam, ever', 'Usually within hours'].map(t => (
                    <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(171,144,85,0.5)', flexShrink: 0 }} />
                      <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.3)' }}>{t}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ══ 5. QUICK ANSWERS ═════════════════════════════ */}
      <section style={{ background: '#F7F4EE', padding: isMobile ? '48px 20px' : '72px 40px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AB9055', textAlign: 'center', marginBottom: isMobile ? '24px' : '40px' }}>
            Quick Answers
          </p>

          {/* Single column on mobile */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { q: 'What areas do you cover?',     a: '30A and the full Emerald Coast: Watersound, Rosemary Beach, Seaside, Grayton Beach, and beyond.' },
              { q: 'How fast will I hear back?',   a: 'John personally responds to every message. During business hours, usually within 2 hours.' },
              { q: 'Can I book directly with you?',a: "Yes. Reach out and we'll work with you directly, with no third-party platform fees involved." },
            ].map((item, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: isMobile ? '22px 20px' : '28px 28px', border: '1px solid rgba(43,53,78,0.07)', boxShadow: '0 2px 12px rgba(43,53,78,0.05)', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                {/* Gold number */}
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(171,144,85,0.1)', border: '1px solid rgba(171,144,85,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, color: '#AB9055' }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div>
                  <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '15px', fontWeight: 600, color: '#1A1A1A', marginBottom: '6px' }}>{item.q}</p>
                  <p style={{ fontSize: '14px', color: '#4A4A4A', lineHeight: 1.75 }}>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
