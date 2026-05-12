#!/usr/bin/env node
// Re-scrape Google Scholar and write data/publications.json so the bundled
// fallback always carries the most recent numbers seen by the maintainer's
// machine — Vercel's build IP sometimes gets a CAPTCHA from Scholar.
//
// Run: node scripts/update_publications.mjs

import { writeFile } from "node:fs/promises"

const SCHOLAR_USER = "AF8zRPwAAAAJ"
const PAGE_SIZE = 20
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15"

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
const stripTags = (s) => s.replace(/<[^>]*>/g, "")

function parse(html) {
  const rows = []
  const rowRe = /<tr class="gsc_a_tr">([\s\S]*?)<\/tr>/g
  let m
  while ((m = rowRe.exec(html))) {
    const row = m[1]
    const anchor = row.match(/<a\b[^>]*class="gsc_a_at"[^>]*>([\s\S]*?)<\/a>/)
    const hrefMatch = anchor?.[0].match(/\bhref="([^"]+)"/)
    const year = row.match(/<span class="gsc_a_h[^"]*">(\d{4})<\/span>/)
    if (!anchor || !hrefMatch || !year) continue
    const grays = [...row.matchAll(/<div class="gs_gray">([\s\S]*?)<\/div>/g)]
    const cites = row.match(/<a\b[^>]*class="gsc_a_ac[^"]*"[^>]*>(\d+)<\/a>/)
    const href = decode(hrefMatch[1])
    rows.push({
      id: href.match(/citation_for_view=([^&]+)/)?.[1] || href,
      title: decode(stripTags(anchor[1])).trim(),
      authors: decode(stripTags(grays[0]?.[1] || "")).trim(),
      venue: decode(stripTags(grays[1]?.[1] || "")).replace(/,\s*\d{4}\s*$/, "").trim(),
      year: Number(year[1]),
      citations: cites ? Number(cites[1]) : 0,
      link: href.startsWith("http") ? href : `https://scholar.google.com${href}`,
    })
  }
  return rows
}

async function fetchPage(sortByPubDate) {
  const qs = sortByPubDate ? "&sortby=pubdate" : ""
  const url = `https://scholar.google.com/citations?user=${SCHOLAR_USER}&hl=en&cstart=0&pagesize=${PAGE_SIZE}${qs}`
  const res = await fetch(url, {
    headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9" },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return await res.text()
}

const [citedHtml, recentHtml] = await Promise.all([fetchPage(false), fetchPage(true)])
const mostCited = parse(citedHtml)
const mostRecent = parse(recentHtml)

if (mostCited.length === 0 || mostRecent.length === 0) {
  console.error("Scholar returned no rows — likely a CAPTCHA. Retry or run from a different network.")
  process.exit(1)
}

const out = {
  mostRecent,
  mostCited,
  lastUpdated: new Date().toISOString(),
  source: "google-scholar",
  note:
    "Top publications from Professor Kurdahi's Google Scholar profile, pre-baked at update time. " +
    "Loaded as the production fallback when the live Scholar scrape is blocked.",
}

await writeFile("data/publications.json", JSON.stringify(out, null, 2) + "\n")
console.log(`Wrote data/publications.json — cited:${mostCited.length} recent:${mostRecent.length}`)
console.log(`Top cited: ${mostCited[0].title} — ${mostCited[0].citations} cites`)
