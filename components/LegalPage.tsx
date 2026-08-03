import Link from 'next/link'
import { getLegalDoc, legalSourceOrigin } from '@/lib/legal'

type Props = {
  /** WordPress page slug, e.g. 'terms-and-conditions' */
  slug: string
  /** Heading shown in the banner. Falls back to the WordPress title. */
  heading: string
  /** One line under the heading. */
  kicker: string
  /** Short plain-English summary shown above the legal text. */
  summary?: string[]
}

/**
 * Renders a legal document pulled live from WordPress inside the Gulf Life
 * design. Deliberately text-first: the whole point is that guests can actually
 * find and read this before they book.
 */
export default async function LegalPage({ slug, heading, kicker, summary }: Props) {
  const doc = await getLegalDoc(slug)
  const hasBody = doc.html.length > 0

  const modified = doc.modified
    ? new Date(doc.modified).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <>
      {/* ── Banner ──────────────────────────────────────── */}
      <div className="legal-banner">
        <div className="legal-banner-glow" />
        <div className="legal-banner-inner">
          <img
            src="/logo-white.svg"
            alt=""
            className="legal-banner-icon"
          />
          <h1 className="legal-banner-h1">{heading}</h1>
          <div className="legal-banner-rule" />
          <p className="legal-banner-kicker">{kicker}</p>
        </div>
      </div>

      {/* ── Breadcrumb ──────────────────────────────────── */}
      <div>
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>{heading}</span>
        </div>
      </div>

      {/* ── Document ────────────────────────────────────── */}
      <section className="legal-section">
        <div className="legal-wrap">

          {summary && summary.length > 0 && (
            <aside className="legal-summary">
              <p className="legal-summary-label">The Short Version</p>
              <ul>
                {summary.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
              <p className="legal-summary-note">
                This box is a plain-English courtesy, not the agreement. The full text below
                is what applies to your reservation.
              </p>
            </aside>
          )}

          {modified && (
            <p className="legal-updated">Last updated {modified}</p>
          )}

          {hasBody ? (
            <div
              className="legal-prose"
              dangerouslySetInnerHTML={{ __html: doc.html }}
            />
          ) : (
            <div className="legal-prose">
              <p>
                This document is temporarily unavailable. You can read the current version
                at{' '}
                <a href={`${legalSourceOrigin()}/${slug}/`} rel="noopener">
                  our booking site
                </a>
                , or call us at <a href="tel:8508427619">(850) 842-7619</a> and we will send
                it to you directly.
              </p>
            </div>
          )}

          {/* ── Foot of document ──────────────────────────── */}
          <div className="legal-foot">
            <div className="legal-foot-rule" />
            <p className="legal-foot-name">Gulf Life Concierge</p>
            <p className="legal-foot-line">10 Topside Drive, Rosemary Beach, FL 32461</p>
            <p className="legal-foot-line">
              <a href="tel:8508427619">(850) 842-7619</a>
              <span className="legal-foot-dot">•</span>
              <a href="mailto:Host@LiveGulfLife.com">Host@LiveGulfLife.com</a>
            </p>
            <p className="legal-foot-help">
              Questions about any of this before you book?{' '}
              <Link href="/contact-us">Get in touch</Link> and a real person will answer.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
