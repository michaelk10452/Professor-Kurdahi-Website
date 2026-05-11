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

export type ScholarStats = {
  citations: number
  hIndex: number
  publications: number
  yearsAtUCI: number
}

export type ScholarData = {
  stats: ScholarStats
  mostRecent: Publication[]
  mostCited: Publication[]
  updatedAt: string
  source: "openalex" | "fallback"
}

const OPENALEX_AUTHOR_ID = "A5008034875" // Fadi Kurdahi, UC Irvine
const OPENALEX_BASE = "https://api.openalex.org"
const MAILTO = process.env.OPENALEX_MAILTO || "kurdahi@uci.edu"
const SCHOLAR_URL = "https://scholar.google.com/citations?user=AF8zRPwAAAAJ&hl"
const UCI_START_YEAR = 1987

// Authoritative values (Google Scholar) — override OpenAlex which undercounts
// because it doesn't index every source Scholar does.
const SCHOLAR_CITATIONS = 8341
const SCHOLAR_H_INDEX = 46

const SELECT_FIELDS = [
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

type OpenAlexAuthor = {
  works_count?: number
  cited_by_count?: number
  summary_stats?: { h_index?: number }
}

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

function authorsLabel(authorships: OpenAlexWork["authorships"]): string {
  if (!authorships?.length) return ""
  const names = authorships
    .map((a) => a?.author?.display_name)
    .filter((n): n is string => Boolean(n))
  if (names.length === 0) return ""
  if (names.length <= 6) return names.join(", ")
  return `${names.slice(0, 6).join(", ")}, et al.`
}

function venueLabel(work: OpenAlexWork): string {
  return work.primary_location?.source?.display_name?.trim() || ""
}

function workLink(work: OpenAlexWork): string {
  return (
    work.best_oa_location?.landing_page_url ||
    work.primary_location?.landing_page_url ||
    work.doi ||
    SCHOLAR_URL
  )
}

function normalize(works: OpenAlexWork[]): Publication[] {
  return works
    .filter((w) => w.title && w.publication_year)
    .map((w) => ({
      id: w.id ?? `${w.title}-${w.publication_year}`,
      title: w.title!.trim(),
      authors: authorsLabel(w.authorships),
      venue: venueLabel(w),
      year: w.publication_year!,
      citations: w.cited_by_count ?? 0,
      link: workLink(w),
    }))
}

async function fetchJSON<T>(url: string): Promise<T> {
  const sep = url.includes("?") ? "&" : "?"
  const res = await fetch(`${url}${sep}mailto=${encodeURIComponent(MAILTO)}`, {
    next: { revalidate: 86400 },
    headers: { Accept: "application/json" },
  })
  if (!res.ok) throw new Error(`OpenAlex ${res.status} on ${url}`)
  return (await res.json()) as T
}

async function loadFallback(): Promise<ScholarData> {
  try {
    const filePath = path.join(process.cwd(), "data", "publications.json")
    const raw = await readFile(filePath, "utf-8")
    const json = JSON.parse(raw) as {
      mostRecent?: Array<Publication & { id: number }>
      mostCited?: Array<Publication & { id: number }>
      lastUpdated?: string
    }
    const toPub = (p: Publication & { id: number | string }) => ({
      ...p,
      id: String(p.id),
    })
    const mostRecent = (json.mostRecent ?? []).map(toPub)
    const mostCited = (json.mostCited ?? []).map(toPub)
    return {
      stats: {
        citations: SCHOLAR_CITATIONS,
        hIndex: SCHOLAR_H_INDEX,
        publications: 351,
        yearsAtUCI: new Date().getFullYear() - UCI_START_YEAR,
      },
      mostRecent,
      mostCited,
      updatedAt: json.lastUpdated ?? new Date().toISOString(),
      source: "fallback",
    }
  } catch {
    return {
      stats: {
        citations: SCHOLAR_CITATIONS,
        hIndex: SCHOLAR_H_INDEX,
        publications: 351,
        yearsAtUCI: new Date().getFullYear() - UCI_START_YEAR,
      },
      mostRecent: [],
      mostCited: [],
      updatedAt: new Date().toISOString(),
      source: "fallback",
    }
  }
}

export async function getScholarData(): Promise<ScholarData> {
  try {
    const [author, recent, cited] = await Promise.all([
      fetchJSON<OpenAlexAuthor>(`${OPENALEX_BASE}/authors/${OPENALEX_AUTHOR_ID}`),
      fetchJSON<{ results: OpenAlexWork[] }>(
        `${OPENALEX_BASE}/works?filter=authorships.author.id:${OPENALEX_AUTHOR_ID}&sort=publication_date:desc&per_page=6&select=${SELECT_FIELDS}`,
      ),
      fetchJSON<{ results: OpenAlexWork[] }>(
        `${OPENALEX_BASE}/works?filter=authorships.author.id:${OPENALEX_AUTHOR_ID}&sort=cited_by_count:desc&per_page=6&select=${SELECT_FIELDS}`,
      ),
    ])

    return {
      stats: {
        citations: SCHOLAR_CITATIONS,
        hIndex: SCHOLAR_H_INDEX,
        publications: author.works_count ?? 351,
        yearsAtUCI: new Date().getFullYear() - UCI_START_YEAR,
      },
      mostRecent: normalize(recent.results),
      mostCited: normalize(cited.results),
      updatedAt: new Date().toISOString(),
      source: "openalex",
    }
  } catch (err) {
    console.error("[scholar] OpenAlex fetch failed, using fallback:", err)
    return loadFallback()
  }
}

export const SCHOLAR_PROFILE_URL = SCHOLAR_URL
