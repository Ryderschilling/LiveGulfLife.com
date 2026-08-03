#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Saves an offline copy of the legal pages so /terms-and-conditions and
// /privacy-policy are never blank if the WordPress source is unreachable.
//
// Run from gulf-life-next/:
//     node scripts/snapshot-legal.mjs
//
// Then commit the updated lib/legal-snapshot.json.
//
// Re-run this any time John changes the rental agreement in WordPress or in
// Streamline. The live site already follows those edits within an hour, this
// only refreshes the safety net.
// ─────────────────────────────────────────────────────────────────────────────

import { writeFileSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const OUT = join(HERE, '..', 'lib', 'legal-snapshot.json')

const ORIGIN = process.env.WORDPRESS_URL?.replace(/\/+$/, '') || 'https://livegulflife.com'
const SLUGS = ['terms-and-conditions', 'privacy-policy']

const out = {}
let failures = 0

for (const slug of SLUGS) {
  const url = `${ORIGIN}/wp-json/wp/v2/pages?slug=${slug}&_fields=title,content,modified`
  process.stdout.write(`fetching ${slug} ... `)

  try {
    const res = await fetch(url, {
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const rows = await res.json()
    const page = rows?.[0]
    const html = page?.content?.rendered

    if (!html || html.trim().length < 200) throw new Error('no usable content returned')

    out[slug] = {
      title: (page?.title?.rendered || '').replace(/&#0?38;|&amp;/g, '&'),
      html,
      modified: page?.modified || null,
    }

    const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
    console.log(`ok  (${words} words, modified ${page?.modified || 'unknown'})`)
  } catch (err) {
    failures++
    console.log(`FAILED: ${err.message}`)

    // Keep whatever was already saved rather than wiping a good copy.
    try {
      const prev = JSON.parse(readFileSync(OUT, 'utf8'))
      if (prev[slug]) {
        out[slug] = prev[slug]
        console.log(`      kept the previous snapshot for ${slug}`)
      }
    } catch {}
  }
}

writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n')
console.log(`\nwrote ${OUT}`)

if (failures) {
  console.log(`\n${failures} page(s) could not be fetched from ${ORIGIN}.`)
  process.exit(1)
}
