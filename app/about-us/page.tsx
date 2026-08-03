import Link from 'next/link'

const WP = 'https://livegulflife.com'
const UP  = `${WP}/wp-content/uploads/2025/11`

const IMG = {
  banner:   `${UP}/image-2.jpg`,
  side:     `${UP}/image-3.jpg`,
  logoIcon: '/logo-white.svg',
}

// ─── Founder ────────────────────────────────────────────────────────────────
// John gets his own block rather than a card. His letter is the strongest copy
// on the site and a 6-paragraph story does not belong in a 34-character card.
const FOUNDER = {
  name: "John O'Hanlan",
  role: 'Founder & Owner',
  photo: '/team/john.jpg',
  paragraphs: [
    "Some of the best memories of my life were made on family vacations at the beach. Looking back, I don't remember what we spent or where we ate. I remember the conversations, the laughter, and the time with the people I love. Those vacations became part of our family's story.",
    "I believe that is the true value of a vacation home. It is more than an investment. It is a place where memories are made, traditions begin, and a family's legacy is built one vacation at a time.",
    'Before founding Gulf Life, my career was in finance, business planning, and consulting. I spent years helping businesses make smart financial decisions, improve performance, and maximize returns. Today I bring that same mindset to every property we manage.',
    'I love helping owners get the most from their investment, not just by increasing revenue, but by preserving the home, controlling unnecessary expenses, and making thoughtful decisions that create long term value. I see our role as more than property management. We serve as trusted advisors, helping owners navigate every aspect of their vacation home with confidence.',
    "Having traveled extensively and stayed in vacation rentals across the country, I have also seen what separates a good stay from a truly memorable one. The difference is almost never the size of the house or the number of amenities. It is the care behind the experience.",
    'That is what drives me every day: helping owners succeed while creating places where families gather, reconnect, and make memories that will be talked about for generations.',
  ],
}

type TeamMember = {
  name: string
  role: string
  /** Path under /public. Omit to render the placeholder avatar. */
  photo?: string
  /** Short third-person bio. Omit to render name + role only. */
  bio?: string
  /**
   * Show the whole photo instead of cropping it to the 3:4 frame.
   * For shots where cropping would slice another person in half.
   * The frame fills the gap with a blurred copy of the same photo.
   */
  fullPhoto?: boolean
}

// NOTE(John): every role below is confirmed except Jim's. His bio describes the
// job but he never sent a title, so "Director of Communications" is our wording.
// Say the word and it changes.
const TEAM: TeamMember[] = [
  {
    name: 'Samantha Reid',
    role: 'Director of Onboarding',
    photo: '/team/samantha.jpg',
    bio:
      'Samantha leads owner onboarding at Gulf Life, guiding new clients through every ' +
      'step of turning their property into a successful short term rental. Originally ' +
      'from England, she made Texas home before settling in Santa Rosa Beach five years ' +
      'ago. With more than 34 years in real estate and the experience of building a ' +
      'business from concept to a thriving operation, she also runs the day to day, ' +
      'making sure the team has the systems and support to deliver the five star ' +
      'experience that defines Gulf Life.',
  },
  {
    name: 'Mark Whitten',
    role: 'Operations Director',
    photo: '/team/mark.jpg',
    bio:
      'Before entering the vacation rental industry, Mark served as an overseas ' +
      'missionary, educator, author, restoration specialist, and construction repair ' +
      'superintendent, managing large scale residential and commercial repair projects. ' +
      'That background gave him a rare blend of leadership, communication, and hands on ' +
      'expertise, along with a sharp eye for property maintenance, quality control, and ' +
      'homeowner advocacy. Today he pairs it with a passion for hospitality, helping ' +
      'owners protect their investment while guests enjoy the Emerald Coast.',
  },
  {
    name: 'Jim McGehee',
    role: 'Director of Communications',
    photo: '/team/jim.jpg',
    bio:
      'Jim handles communication with owners and guests, and keeps the Gulf Life team ' +
      'connected day to day. Before joining Gulf Life he started, managed, and sold ' +
      'several companies across technical fields including industrial computer ' +
      'integration and satellite communications. In every one of those ventures the key ' +
      'to success was the same thing: communicating well with the customer.',
  },
  {
    name: 'Jeremy',
    role: 'Property Operations',
    photo: '/team/jeremy.jpg',
    fullPhoto: true,
    bio:
      'Jeremy helps keep our vacation homes guest-ready by coordinating maintenance, ' +
      'solving property issues, and working with trusted local vendors. He is committed ' +
      'to providing reliable service, clear communication, and ensuring every guest has ' +
      'a comfortable, worry-free stay.',
  },
  {
    name: 'Erin Brockman',
    role: 'Property Inspector & Compliance Coordinator',
    photo: '/team/erin.jpg',
    fullPhoto: true,
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

      {/* ── Founder ─────────────────────────────────────── */}
      <section className="founder-section">
        <div className="founder-grid">

          <div className="founder-photo-col">
            <div className="founder-photo-frame">
              <img
                src={FOUNDER.photo}
                alt={`${FOUNDER.name}, ${FOUNDER.role} of Gulf Life Concierge`}
                className="founder-photo-img"
              />
              <div className="founder-photo-rule" />
            </div>
            <p className="founder-photo-name">{FOUNDER.name}</p>
            <p className="founder-photo-role">{FOUNDER.role}</p>
          </div>

          <div className="founder-copy-col">
            <p className="founder-kicker">A Note From Our Founder</p>
            <h2 className="founder-h2">
              Why We Do<br />
              <em style={{ fontStyle: 'italic', fontWeight: 400 }}>This Work</em>
            </h2>
            <div className="founder-rule" />

            {FOUNDER.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? 'founder-p founder-p-lead' : 'founder-p'}>
                {p}
              </p>
            ))}

            <p className="founder-signoff">{FOUNDER.name}</p>
          </div>
        </div>
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
                <div className={member.fullPhoto ? 'team-photo team-photo--full' : 'team-photo'}>
                  {member.photo ? (
                    <>
                      {member.fullPhoto && (
                        <img
                          src={member.photo}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          className="team-photo-blur"
                        />
                      )}
                      <img
                        src={member.photo}
                        alt={`${member.name}, ${member.role} at Gulf Life Concierge`}
                        loading="lazy"
                        className="team-photo-img"
                      />
                    </>
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
