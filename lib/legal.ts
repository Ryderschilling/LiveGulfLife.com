// ─────────────────────────────────────────────────────────────────────────────
// Legal pages (Terms & Conditions, Privacy Policy)
//
// John asked that the Streamline / WordPress rental agreement "comes through"
// to the site. Rather than hand-copying legal text (which goes stale the moment
// anyone edits the source, and risks a transcription error in a document that
// decides refund disputes), these pages pull the LIVE text from the WordPress
// REST API and render it inside the new site's own design.
//
// Update the page in WordPress, the site follows within the hour. Nobody has to
// touch code, and the wording can never drift from the document guests agreed to.
//
// A committed snapshot in lib/legal-snapshot.json is used if the source is
// unreachable, so the page is never blank. Regenerate it with:
//     node scripts/snapshot-legal.mjs
// ─────────────────────────────────────────────────────────────────────────────

import { WP_ORIGIN } from './wp-origin'
import snapshot from './legal-snapshot.json'

/**
 * Where the legal text is read from.
 *
 * Before the DNS cutover, WORDPRESS_URL is unset and livegulflife.com is still
 * WordPress, so we read it straight. After the cutover, WORDPRESS_URL points at
 * the real origin and we read that instead, which avoids Vercel proxying to
 * itself through the [...wp] catch-all.
 */
export function legalSourceOrigin(): string {
  return WP_ORIGIN || 'https://livegulflife.com'
}

export type LegalDoc = {
  title: string
  html: string
  /** true when the live source could not be reached and the snapshot was used. */
  fromSnapshot: boolean
  /** ISO date the source page was last modified, when known. */
  modified: string | null
}

type SnapshotEntry = { title: string; html: string; modified: string | null }
const SNAPSHOT = snapshot as Record<string, SnapshotEntry>

/**
 * Strip everything that has no business rendering inside our layout.
 * WordPress content is trusted (it is John's own site), so this is about
 * removing theme cruft and third-party embeds, not defending against attackers.
 */
function sanitize(html: string): string {
  let out = html

  // Executable / style / embed nodes.
  out = out.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
  out = out.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
  out = out.replace(/<link\b[^>]*>/gi, '')
  out = out.replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, '')
  out = out.replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, '')

  // Inline event handlers and javascript: URLs.
  out = out.replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, '')
  out = out.replace(/\son[a-z]+\s*=\s*'[^']*'/gi, '')
  out = out.replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, '$1="#"')

  // WordPress ships inline colour/size styles that fight our typography.
  out = out.replace(/\sstyle\s*=\s*"[^"]*"/gi, '')
  out = out.replace(/\sstyle\s*=\s*'[^']*'/gi, '')

  // Absolute links back to the public site become relative so they stay on
  // whichever domain the visitor is actually on.
  out = out.replace(/https?:\/\/(www\.)?livegulflife\.com/gi, '')

  // Em-dashes are banned in Gulf Life copy. WordPress editors love them.
  out = out.replace(/\s*[—–]\s*/g, ', ')

  // Empty paragraphs left behind by the block editor.
  out = out.replace(/<p>(\s|&nbsp;)*<\/p>/gi, '')

  return out.trim()
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#038;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8211;/g, ', ')
    .replace(/&#8212;/g, ', ')
}

/**
 * Read a WordPress page by slug. Revalidates hourly, so an edit in WordPress
 * shows up on the site within an hour with no deploy.
 */
export async function getLegalDoc(slug: string): Promise<LegalDoc> {
  const fallback = SNAPSHOT[slug]

  try {
    const res = await fetch(
      `${legalSourceOrigin()}/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}&_fields=title,content,modified`,
      {
        headers: { accept: 'application/json' },
        next: { revalidate: 3600, tags: ['legal', `legal:${slug}`] },
        // Never let a slow or unreachable origin stall a build or a page render.
        // If it does not answer in 8 seconds we fall back to the snapshot.
        signal: AbortSignal.timeout(8000),
      },
    )

    if (!res.ok) throw new Error(`source responded ${res.status}`)

    const rows = (await res.json()) as Array<{
      title?: { rendered?: string }
      content?: { rendered?: string }
      modified?: string
    }>

    const page = rows?.[0]
    const raw = page?.content?.rendered
    if (!raw || raw.trim().length < 200) throw new Error('source returned no usable content')

    return {
      title: decodeEntities(page?.title?.rendered || fallback?.title || ''),
      html: sanitize(raw),
      fromSnapshot: false,
      modified: page?.modified || null,
    }
  } catch {
    if (!fallback) {
      return { title: '', html: '', fromSnapshot: true, modified: null }
    }
    return {
      title: fallback.title,
      html: sanitize(fallback.html),
      fromSnapshot: true,
      modified: fallback.modified,
    }
  }
}
