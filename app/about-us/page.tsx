import Link from 'next/link'

const WP = ''
const UP  = '/img'

const IMG = {
  banner:   `${UP}/about-1.jpg`,
  side:     `${UP}/about-2.jpg`,
  logoIcon: '/logo-white.svg',
}

type TeamMember = {
  name: string
  role: string
  /** Path under /public. Omit to render the placeholder avatar. */
  photo?: string
  /** Short third-person bio. Omit to render name + role only. */
  bio?: string
}

// TODO(John): roles reading "Gulf Life Team" are placeholders until each person
// sends their title + bio. Swap the role string and add photo/bio as they arrive.
const TEAM: TeamMember[] = [
  { name: "John O'Hanlan", role: 'Owner' },
  {
    name: 'Jeremy',
    role: 'Property Operations',
    photo: '/team/jeremy.jpg',
    bio:
      'Jeremy helps keep our vacation homes guest-ready by coordinating maintenance, ' +
      'solving property issues, and working with trusted local vendors. He is committed ' +
      'to providing reliable service, clear communication, and ensuring every guest has ' +
      'a comfortable, worry-free stay.',
  },
  { name: 'Jim McGehee', role: 'Gulf Life Team' },
  { name: 'Samantha Reid', role: 'Gulf Life Team' },
  { name: 'Mark', role: 'Gulf Life Team' },
  {
    name: 'Erin Brockman',
    role: 'Property Inspector & Compliance Coordinator',
    bio:
      'Erin helps ensure every Gulf Life Concierge vacation home is guest-ready through ' +
      'detailed property inspections, and supports the onboarding of new properties by ' +
      'assisting with county compliance requirements. She has proudly called the Emerald ' +
      'Coast home for nearly 10 years. As a wife and mother, Erin values faith, family, ' +
      'and serving others, and she enjoys spending time with her family and making the ' +
      'most of life at the beach.',
  },
]

const STATS = [
  { number: '200+', label: 'Properties Managed' },
  { number: '5★',   label: 'Average Guest Rating' },
  { number: '30A',  label: 'Local Specialists' },
  { number: '100%', label: 'Owner Satisfaction' },
]

const VALUES = [
  {
    num: '01',
    title: 'Local Expertise',
    body: "Born and raised on the Gulf Coast, our team knows every beach, restaurant, and hidden gem the area has to offer. We don't just manage properties. We live the life we help our guests experience.",
  },
  {
    num: '02',
    title: 'Personalized Service',
    body: 'No call centers, no hold times. You get a dedicated property manager who answers the phone, knows your name, and treats your home like their own.',
  },
  {
    num: '03',
    title: 'Transparent Pricing',
    body: 'No hidden fees or unnecessary charges. We believe in honest, straightforward pricing that maximizes your return and builds trust that lasts for years.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ── Page Banner ─────────────────────────────────── */}
      <div className="page-banner about-banner">
        <img src={IMG.banner} alt="Gulf Coast at sunset" className="banner-bg" />
        <div
          className="banner-overlay"
          style={{ background: 'linear-gradient(to top, rgba(13,21,32,0.78) 0%, rgba(13,21,32,0.28) 55%, transparent 100%)' }}
        />
        <div className="banner-content">
          <img
            src={IMG.logoIcon}
            alt=""
            className="banner-icon"
            style={{ filter: 'brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(5deg)', width: '52px', marginBottom: '18px' }}
          />
          <h1 className="about-banner-h1">About Us</h1>
          <div className="underline-bar" style={{ width: '70px' }} />
        </div>
      </div>

      {/* ── Breadcrumb ──────────────────────────────────── */}
      <div>
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>About Us</span>
        </div>
      </div>

      {/* ── Our Story ───────────────────────────────────── */}
      <section style={{ background: '#fff', overflow: 'hidden' }}>
        <div className="about-story-grid">

          {/* Image col */}
          <div className="img-zoom" style={{ position: 'relative' }}>
            <img
              src={IMG.side}
              alt="Gulf Coast aerial"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '320px' }}
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(to top, rgba(13,21,32,0.88) 0%, transparent 100%)',
              padding: '56px 44px 40px',
            }}>
              <p style={{
                fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700,
                letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)',
                marginBottom: '10px',
              }}>
                Emerald Coast, Florida
              </p>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.65 }}>
                Where the Gulf meets luxury. This is where we call home.
              </p>
            </div>
          </div>

          {/* Content col */}
          <div className="about-story-content">
            <p style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)',
              marginBottom: '20px',
            }}>
              Our Story
            </p>
            <h2 className="about-story-h2">
              More Than a Property<br />
              <em style={{ fontStyle: 'italic', fontWeight: 400 }}>Management Company</em>
            </h2>
            <div style={{ width: '50px', height: '2px', background: 'var(--gold)', marginBottom: '36px' }} />

            <blockquote style={{ borderLeft: '3px solid var(--gold)', paddingLeft: '26px', marginBottom: '32px' }}>
              <p style={{
                fontFamily: 'Outfit, sans-serif', fontSize: '19px', fontWeight: 300,
                fontStyle: 'italic', color: '#2B354E', lineHeight: 1.7,
              }}>
                "We treat every property as if it were our own, and every guest as if they were family."
              </p>
            </blockquote>

            <p style={{ fontSize: '16px', color: '#4A4A4A', lineHeight: 1.9, marginBottom: '20px' }}>
              Gulf Life Concierge was built on a simple belief: the Gulf Coast deserves world-class hospitality. As a family and veteran owned business, we bring integrity, dedication, and genuine care to every property we manage and every guest we serve.
            </p>
            <p style={{ fontSize: '16px', color: '#4A4A4A', lineHeight: 1.9, marginBottom: '44px' }}>
              From the moment a guest books to the second they check out, we handle every detail, so owners rest easy and guests focus on what matters: making memories on one of the most beautiful coastlines in the world.
            </p>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact-us" className="btn-navy">Work With Us</Link>
              <Link href="/property-management" style={{
                fontFamily: 'Montserrat, sans-serif', fontSize: '12px', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)',
                textDecoration: 'none', borderBottom: '1px solid var(--gold)', paddingBottom: '2px',
              }}>
                List Your Property →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ─────────────────────────────────── */}
      <section className="about-stats-section">
        <div className="about-stats-grid">
          {STATS.map((s, i) => (
            <div key={i} className="about-stat-item" data-last={i === STATS.length - 1 ? 'true' : 'false'}>
              <div style={{
                fontFamily: 'Outfit, sans-serif', fontSize: '52px', fontWeight: 300,
                lineHeight: 1, marginBottom: '12px',
                background: 'linear-gradient(135deg, #d4b87a 0%, #AB9055 60%, #c9a96e 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                {s.number}
              </div>
              <div style={{
                fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700,
                letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What Sets Us Apart ──────────────────────────── */}
      <section className="about-values-section">
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)',
              marginBottom: '18px',
            }}>
              Why Gulf Life Concierge
            </p>
            <h2 className="about-values-h2">
              What Sets Us Apart
            </h2>
            <div style={{ width: '50px', height: '2px', background: 'var(--gold)', margin: '0 auto' }} />
          </div>

          {/* Value cards: single column on mobile, 3-col on desktop */}
          <div className="about-values-grid">
            {VALUES.map((v, i) => (
              <div key={i} className="value-card">
                <div style={{
                  fontFamily: 'Outfit, sans-serif', fontSize: '72px', fontWeight: 300,
                  color: '#EEEBE5', lineHeight: 1, marginBottom: '24px',
                  userSelect: 'none',
                }}>
                  {v.num}
                </div>
                <h3 style={{
                  fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1A1A1A',
                  marginBottom: '16px',
                }}>
                  {v.title}
                </h3>
                <div style={{ width: '30px', height: '2px', background: 'var(--gold)', marginBottom: '18px' }} />
                <p style={{ fontSize: '15px', color: '#4A4A4A', lineHeight: 1.85 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dark Quote / Commitment Section ─────────────── */}
      <section className="about-commitment-section">
        {/* Ghost watermark */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'Montserrat, sans-serif', fontSize: '180px', fontWeight: 900,
          letterSpacing: '-0.04em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.022)', whiteSpace: 'nowrap',
          userSelect: 'none', pointerEvents: 'none',
        }}>
          GULF LIFE
        </div>

        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '1px', height: '64px', background: 'linear-gradient(to bottom, transparent, var(--gold))',
        }} />

        <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center', marginBottom: '48px' }}>
            <div style={{ height: '1px', width: '90px', background: 'rgba(171,144,85,0.5)' }} />
            <div style={{ width: '7px', height: '7px', background: 'var(--gold)', transform: 'rotate(45deg)' }} />
            <div style={{ height: '1px', width: '90px', background: 'rgba(171,144,85,0.5)' }} />
          </div>

          <p style={{
            fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)',
            marginBottom: '32px',
          }}>
            Our Commitment
          </p>
          <h2 className="about-commitment-quote">
            "The Gulf Coast isn't just where we work. It's where we live, love, and build our lives. That's the difference you feel when you choose Gulf Life Concierge."
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center' }}>
            <div style={{ height: '1px', width: '90px', background: 'rgba(171,144,85,0.5)' }} />
            <div style={{ width: '7px', height: '7px', background: 'var(--gold)', transform: 'rotate(45deg)' }} />
            <div style={{ height: '1px', width: '90px', background: 'rgba(171,144,85,0.5)' }} />
          </div>
        </div>

        <div style={{
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '1px', height: '64px', background: 'linear-gradient(to top, transparent, var(--gold))',
        }} />
      </section>

      {/* ── Meet Our Team ──────────────────────────────── */}
      <section className="about-team-section">
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)',
              marginBottom: '18px',
            }}>
              The People Behind the Experience
            </p>
            <h2 className="about-team-h2">Meet Our Team</h2>
            <div style={{ width: '50px', height: '2px', background: 'var(--gold)', margin: '0 auto' }} />
          </div>

          <div className="about-team-grid">
            {TEAM.map((member) => (
              <div key={member.name} className="team-card">
                <div className="team-photo">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={`${member.name}, ${member.role} at Gulf Life Concierge`}
                      loading="lazy"
                      className="team-photo-img"
                    />
                  ) : (
                    <>
                      <div className="team-photo-texture" />
                      <div className="team-photo-center">
                        <div className="team-photo-ring">
                          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="rgba(171,144,85,0.55)" strokeWidth="1.25">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                          </svg>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="team-photo-rule" />
                </div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                {member.bio && <p className="team-bio">{member.bio}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ─────────────────────────────────── */}
      <section className="about-cta-section">
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: 'linear-gradient(90deg, transparent 0%, var(--gold) 25%, var(--gold-light) 50%, var(--gold) 75%, transparent 100%)',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)',
            marginBottom: '24px',
          }}>
            Let's Get Started
          </p>
          <h2 className="about-cta-h2">
            Ready to Work<br />
            <em style={{ fontStyle: 'italic' }}>With Us?</em>
          </h2>
          <p style={{
            fontSize: '17px', color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.8, marginBottom: '48px',
          }}>
            Whether you&rsquo;re planning your dream Gulf Coast vacation or looking to maximize your property&rsquo;s income potential, we&rsquo;re here to make it happen.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact-us" className="btn-gold">Contact Us Today</Link>
            <Link href="/property-management" className="btn-outline-white">List Your Property</Link>
          </div>
        </div>
      </section>
    </>
  )
}
