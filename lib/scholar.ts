import { readFile } from "node:fs/promises"
import path from "node:path"

export type Publication = {
  id: string
  title: string
  authors: string
  venue: string
  year: number
  citations: number
  link: string
}

export type ScholarData = {
  mostRecent: Publication[]
  mostCited: Publication[]
  updatedAt: string
  source: "scholar" | "openalex" | "fallback"
}

const SCHOLAR_USER = "AF8zRPwAAAAJ"
const SCHOLAR_BASE = "https://scholar.google.com"
const SCHOLAR_URL = `${SCHOLAR_BASE}/citations?user=${SCHOLAR_USER}&hl=en`
const PAGE_SIZE = 20

const OPENALEX_AUTHOR_ID = "A5008034875"
const OPENALEX_BASE = "https://api.openalex.org"
const MAILTO = process.env.OPENALEX_MAILTO || "kurdahi@uci.edu"

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15"

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
}

function stripTags(s: string): string {
  return s.replace(/<[^>]*>/g, "")
}

function parseScholarPubs(html: string): Publication[] {
  const result: Publication[] = []
  const rowRe = /<tr class="gsc_a_tr">([\s\S]*?)<\/tr>/g
  let m: RegExpExecArray | null
  while ((m = rowRe.exec(html))) {
    const row = m[1]

    // Title anchor: attribute order isn't fixed in Scholar's markup, so grab
    // the full anchor first and pull href/title body out separately.
    const titleAnchor = row.match(/<a\b[^>]*class="gsc_a_at"[^>]*>([\s\S]*?)<\/a>/)
    const hrefMatch = titleAnchor?.[0].match(/\bhref="([^"]+)"/)
    if (!titleAnchor || !hrefMatch) continue

    const grayMatches = [...row.matchAll(/<div class="gs_gray">([\s\S]*?)<\/div>/g)]
    const citesMatch = row.match(/<a\b[^>]*class="gsc_a_ac[^"]*"[^>]*>(\d+)<\/a>/)
    const yearMatch = row.match(/<span class="gsc_a_h[^"]*">(\d{4})<\/span>/)
    if (!yearMatch) continue

    const authors = decodeEntities(stripTags(grayMatches[0]?.[1] || "")).trim()
    const venue = decodeEntities(stripTags(grayMatches[1]?.[1] || ""))
      .replace(/,\s*\d{4}\s*$/, "")
      .trim()

    const href = decodeEntities(hrefMatch[1])
    const idMatch = href.match(/citation_for_view=([^&]+)/)
    const id = idMatch ? idMatch[1] : href

    result.push({
      id,
      title: decodeEntities(stripTags(titleAnchor[1])).trim(),
      authors,
      venue,
      year: Number(yearMatch[1]),
      citations: citesMatch ? Number(citesMatch[1]) : 0,
      link: href.startsWith("http") ? href : `${SCHOLAR_BASE}${href}`,
    })
  }
  return result
}

async function fetchScholarPage(sortByPubDate: boolean): Promise<string> {
  const url = sortByPubDate
    ? `${SCHOLAR_URL}&cstart=0&pagesize=${PAGE_SIZE}&sortby=pubdate`
    : `${SCHOLAR_URL}&cstart=0&pagesize=${PAGE_SIZE}`
  const res = await fetch(url, {
    next: { revalidate: 86400 },
    headers: {
      "User-Agent": UA,
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
    },
  })
  if (!res.ok) throw new Error(`Scholar HTTP ${res.status}`)
  return await res.text()
}

async function getScholarPublications(): Promise<{
  mostCited: Publication[]
  mostRecent: Publication[]
}> {
  const [citedHtml, recentHtml] = await Promise.all([
    fetchScholarPage(false),
    fetchScholarPage(true),
  ])
  const mostCited = parseScholarPubs(citedHtml)
  const mostRecent = parseScholarPubs(recentHtml)
  if (mostCited.length === 0 && mostRecent.length === 0) {
    throw new Error("Scholar response had no parseable rows (likely a CAPTCHA)")
  }
  return { mostCited, mostRecent }
}

// ───────── OpenAlex fallback ─────────

const OA_SELECT = [
  "id",
  "doi",
  "title",
  "publication_year",
  "publication_date",
  "cited_by_count",
  "primary_location",
  "best_oa_location",
  "authorships",
].join(",")

type OpenAlexWork = {
  id?: string
  doi?: string | null
  title?: string | null
  publication_year?: number | null
  publication_date?: string | null
  cited_by_count?: number | null
  primary_location?: {
    landing_page_url?: string | null
    source?: { display_name?: string | null } | null
  } | null
  best_oa_location?: { landing_page_url?: string | null } | null
  authorships?: Array<{ author?: { display_name?: string | null } | null }> | null
}

function oaAuthors(authorships: OpenAlexWork["authorships"]): string {
  if (!authorships?.length) return ""
  const names = authorships
    .map((a) => a?.author?.display_name)
    .filter((n): n is string => Boolean(n))
  if (names.length === 0) return ""
  if (names.length <= 6) return names.join(", ")
  return `${names.slice(0, 6).join(", ")}, et al.`
}

function oaNormalize(works: OpenAlexWork[]): Publication[] {
  return works
    .filter((w) => w.title && w.publication_year)
    .map((w) => ({
      id: w.id ?? `${w.title}-${w.publication_year}`,
      title: w.title!.trim(),
      authors: oaAuthors(w.authorships),
      venue: w.primary_location?.source?.display_name?.trim() || "",
      year: w.publication_year!,
      citations: w.cited_by_count ?? 0,
      link:
        w.best_oa_location?.landing_page_url ||
        w.primary_location?.landing_page_url ||
        w.doi ||
        SCHOLAR_URL,
    }))
}

async function getOpenAlexPublications(): Promise<{
  mostCited: Publication[]
  mostRecent: Publication[]
}> {
  const headers = { Accept: "application/json" }
  const cited = `${OPENALEX_BASE}/works?filter=authorships.author.id:${OPENALEX_AUTHOR_ID}&sort=cited_by_count:desc&per_page=15&select=${OA_SELECT}&mailto=${encodeURIComponent(MAILTO)}`
  const recent = `${OPENALEX_BASE}/works?filter=authorships.author.id:${OPENALEX_AUTHOR_ID}&sort=publication_date:desc&per_page=15&select=${OA_SELECT}&mailto=${encodeURIComponent(MAILTO)}`
  const [c, r] = await Promise.all([
    fetch(cited, { next: { revalidate: 86400 }, headers }).then((res) => res.json()),
    fetch(recent, { next: { revalidate: 86400 }, headers }).then((res) => res.json()),
  ])
  return {
    mostCited: oaNormalize(c.results ?? []),
    mostRecent: oaNormalize(r.results ?? []),
  }
}

async function loadFallback(): Promise<{ mostRecent: Publication[]; mostCited: Publication[] }> {
  try {
    const filePath = path.join(process.cwd(), "data", "publications.json")
    const raw = await readFile(filePath, "utf-8")
    const json = JSON.parse(raw) as {
      mostRecent?: Array<Publication & { id: number | string }>
      mostCited?: Array<Publication & { id: number | string }>
    }
    const toPub = (p: Publication & { id: number | string }) => ({ ...p, id: String(p.id) })
    return {
      mostRecent: (json.mostRecent ?? []).map(toPub),
      mostCited: (json.mostCited ?? []).map(toPub),
    }
  } catch {
    return { mostRecent: [], mostCited: [] }
  }
}

export async function getScholarData(): Promise<ScholarData> {
  // 1. Try a live Google Scholar scrape — gives the freshest numbers when
  //    the build machine's IP isn't being throttled.
  try {
    const pubs = await getScholarPublications()
    return {
      mostCited: pubs.mostCited,
      mostRecent: pubs.mostRecent,
      updatedAt: new Date().toISOString(),
      source: "scholar",
    }
  } catch (err) {
    console.warn("[scholar] Scholar scrape failed, using bundled fallback:", err)
  }

  // 2. Fall back to the JSON snapshot in data/publications.json. That file
  //    is produced by `node scripts/update_publications.mjs` from a machine
  //    that Scholar trusts, so the numbers still match Scholar exactly.
  const local = await loadFallback()
  if (local.mostCited.length > 0 || local.mostRecent.length > 0) {
    return {
      mostCited: local.mostCited,
      mostRecent: local.mostRecent,
      updatedAt: new Date().toISOString(),
      source: "fallback",
    }
  }

  // 3. Last resort — OpenAlex. Its citation counts are lower than Scholar's
  //    because it indexes fewer sources, but it never blocks.
  try {
    const pubs = await getOpenAlexPublications()
    return {
      mostCited: pubs.mostCited,
      mostRecent: pubs.mostRecent,
      updatedAt: new Date().toISOString(),
      source: "openalex",
    }
  } catch (err) {
    console.warn("[scholar] OpenAlex fetch failed, returning empty:", err)
  }

  return {
    mostCited: [],
    mostRecent: [],
    updatedAt: new Date().toISOString(),
    source: "fallback",
  }
}

export const SCHOLAR_PROFILE_URL = SCHOLAR_URL
