import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug, getRelatedPosts, SITE_URL, type BlogBlock } from '@/lib/blog'

// ─── STATIC GENERATION ────────────────────────────────────

export function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  const url = `${SITE_URL}/blog/${post.slug}`
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.image],
    },
  }
}

// ─── INLINE [label](href) LINK RENDERING ──────────────────

function renderInline(text: string) {
  const parts: React.ReactNode[] = []
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index))
    const [, label, href] = match
    parts.push(
      href.startsWith('http') ? (
        <a key={key++} href={href} className="blog-inline-link">{label}</a>
      ) : (
        <Link key={key++} href={href} className="blog-inline-link">{label}</Link>
      )
    )
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return parts
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="blog-article-h2">{block.text}</h2>
    case 'h3':
      return <h3 className="blog-article-h3">{block.text}</h3>
    case 'p':
      return <p className="blog-article-p">{renderInline(block.text)}</p>
    case 'ul':
      return (
        <ul className="blog-article-ul">
          {block.items.map((item, i) => <li key={i}>{renderInline(item)}</li>)}
        </ul>
      )
    case 'quote':
      return <blockquote className="blog-article-quote">{block.text}</blockquote>
  }
}

// ─── PAGE ─────────────────────────────────────────────────

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const related = getRelatedPosts(post.slug, 2)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'Gulf Life Concierge',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Gulf Life Concierge',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo-dark.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Article banner ────────────────────────────── */}
      <section className="blog-post-hero">
        <img src={post.image} alt={post.imageAlt} className="blog-post-hero-img" />
        <div className="blog-post-hero-overlay" />
        <div className="blog-post-hero-content">
          <div className="blog-card-meta" style={{ justifyContent: 'center', marginBottom: '18px' }}>
            <span className="blog-pill blog-pill-onDark">{post.category}</span>
          </div>
          <h1 className="blog-post-h1">{post.title}</h1>
          <p className="blog-post-hero-meta">
            {post.dateDisplay} &nbsp;·&nbsp; {post.readMinutes} min read &nbsp;·&nbsp; Gulf Life Concierge
          </p>
        </div>
      </section>

      {/* ── Article body ──────────────────────────────── */}
      <article className="blog-article">
        <nav className="blog-breadcrumb" aria-label="Breadcrumb">
          <Link href="/blog">← All Articles</Link>
        </nav>
        {post.blocks.map((block, i) => <Block key={i} block={block} />)}
      </article>

      {/* ── Related posts ─────────────────────────────── */}
      {related.length > 0 && (
        <section style={{ background: '#F7F4EE', padding: '64px 24px 80px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="section-divider">
              <span style={{
                fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700,
                letterSpacing: '0.2em', textTransform: 'uppercase', color: '#AB9055',
              }}>
                Keep Reading
              </span>
            </div>
            <div className="blog-grid" style={{ marginTop: '8px' }}>
              {related.map(rp => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="blog-card">
                  <div className="blog-card-img img-zoom">
                    <img src={rp.image} alt={rp.imageAlt} loading="lazy" />
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span className="blog-pill">{rp.category}</span>
                      <span className="blog-date">{rp.dateDisplay}</span>
                    </div>
                    <h2 className="blog-card-title">{rp.title}</h2>
                    <span className="blog-read-link">Read Article →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────── */}
      <section style={{ background: '#2B354E', padding: '80px 24px', textAlign: 'center' }}>
        <p style={{
          fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700,
          letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '16px',
        }}>
          Experience It Yourself
        </p>
        <h2 style={{
          fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(26px, 3.5vw, 40px)',
          fontWeight: 300, color: '#fff', marginBottom: '16px',
        }}>
          Your 30A Getaway Starts Here
        </h2>
        <p style={{
          fontSize: '16px', color: 'rgba(255,255,255,0.65)', maxWidth: '440px',
          margin: '0 auto 36px', lineHeight: 1.75,
        }}>
          Premium vacation homes, local concierge service, and a team that treats your stay
          like it&rsquo;s our own.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/search-results/" className="btn-gold">Browse Rentals</a>
          <Link href="/contact-us" className="btn-outline-white">Contact Us</Link>
        </div>
      </section>
    </>
  )
}
