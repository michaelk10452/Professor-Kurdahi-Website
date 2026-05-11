"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import type { Publication, ScholarData } from "@/lib/scholar"

const SCHOLAR_PROFILE_URL = "https://scholar.google.com/citations?user=AF8zRPwAAAAJ&hl"

type Track = "academic" | "industry"
type PubSort = "recent" | "cited"

const ACCENTS = [
  { value: "#3b3a36", label: "Graphite" },
  { value: "#3d4f3a", label: "Sage" },
  { value: "#3a4658", label: "Slate blue" },
  { value: "#5a3e36", label: "Walnut" },
]

const ACADEMIC = [
  { when: "2025 — Present", what: "Distinguished Professor", where: "EECS, UC Irvine", meta: "Current" },
  { when: "2022 — Present", what: "Director, MECPS Program", where: "UC Irvine", meta: "Current" },
  { when: "2012 — Present", what: "Director, CECS", where: "Center for Embedded & Cyber-Physical Systems", meta: "Current" },
  { when: "2017 — 2022", what: "Associate Dean", where: "Samueli School of Engineering", meta: "5 yrs" },
  { when: "1998 — 2025", what: "Professor", where: "EECS, UC Irvine", meta: "27 yrs" },
  { when: "1993 — 1998", what: "Associate Professor", where: "EECS, UC Irvine", meta: "5 yrs" },
  { when: "1987 — 1993", what: "Assistant Professor", where: "EECS, UC Irvine", meta: "6 yrs" },
]

const INDUSTRY = [
  { when: "2019 — Present", what: "Chief Scientific Advisor", where: "The Blue Box Biomedical Solutions, Barcelona", meta: "Current" },
  { when: "2000 — 2002", what: "Founder, VP Engineering & CTO", where: "Morpho Technologies, Irvine, CA", meta: "2 yrs" },
  { when: "1995 — 1996", what: "Consultant", where: "United Nations Development Program (UNDP)", meta: "1 yr" },
]

const EDUCATION = [
  { when: "1987", what: "Ph.D., Computer Engineering", where: "University of Southern California", meta: "USC" },
  { when: "1983", what: "M.S., Computer Engineering", where: "University of Southern California", meta: "USC" },
  { when: "1981", what: "B.E., Electrical Engineering", where: "American University of Beirut", meta: "AUB" },
]

const HONORS = [
  { when: "2016", what: "Best Paper Award", where: "IEEE Asia-Pacific Design Automation Conference" },
  { when: "2009", what: "AAAS Fellow", where: "American Association for the Advancement of Science" },
  { when: "2008", what: "Distinguished Alumnus Award", where: "American University of Beirut" },
  { when: "2006", what: "Best Paper Award", where: "IEEE Int'l Conference on Quality Electronic Design" },
  { when: "2005", what: "IEEE Fellow", where: "Institute of Electrical and Electronics Engineers" },
  { when: "2002", what: "Best Paper Award", where: "IEEE VLSI Transactions" },
]

const RESEARCH = [
  {
    title: "VLSI System Design & Automation",
    description: "High-level synthesis, custom datapath design, and methodologies for moving from specification to silicon.",
  },
  {
    title: "Embedded & Cyber-Physical Systems",
    description: "Computing systems that engage with the physical world — across biomedical, mobile, and real-time applications.",
  },
  {
    title: "Low-Power Process-Aware SoCs",
    description: "Co-design across the stack: making the tradeoff between energy, performance, and process variability explicit.",
  },
  {
    title: "Reconfigurable Computing",
    description: "Programmable fabrics and adaptive architectures bridging flexibility and the efficiency of dedicated hardware.",
  },
]

const VIDEOS = [
  { href: "https://youtu.be/A6Hv6njW3CE", title: "Computer Engineering at UCI", src: "UC Irvine" },
  { href: "https://youtu.be/DjzEbJ_6NeE", title: "MProg Program Overview", src: "UC Irvine" },
  { href: "https://mecps.uci.edu/wp-content/uploads/2018/03/MECPS-Intro-to-Cyber-Physical-Systems-by-Fadi.mp4", title: "Intro to Cyber-Physical Systems", src: "MECPS, UCI" },
]

const ARTICLES = [
  { year: "2025", href: "https://www.cecs.uci.edu/event/prof-fadi-kurdahi-honored-at-waaaub-orange-county-chapter-annual-dinner/", title: "Prof. Fadi Kurdahi Honored at WAAAUB Orange County Chapter Annual Dinner", src: "UCI CECS" },
  { year: "2024", href: "https://elpais.com/cat/2021/05/10/tecnologia/1620657621_446415.html", title: "Judit Giró, la jove catalana que utilitza intel·ligència artificial per detectar el càncer", src: "El País" },
  { year: "2022", href: "https://engineering.uci.edu/news/2022/3/blue-box-wants-democratize-early-breast-cancer-detection", title: "The Blue Box Wants to Democratize Early Breast Cancer Detection", src: "UCI Samueli School News" },
  { year: "2021", href: "https://innovation.uci.edu/2021/01/whats-in-the-blue-box-breast-cancer-detection/", title: "What's in The Blue Box? Breast Cancer Detection", src: "UCI Beall Applied Innovation" },
  { year: "2020", href: "https://engineering.uci.edu/news/2020/12/samueli-school-researcher-wins-international-design-award", title: "Samueli School Researcher Wins International Design Award", src: "UCI Samueli School News" },
  { year: "2019", href: "https://www.espn.com/esports/story/_/id/26788969/uci-descraton-sharpens-college-league-legends-championship", title: "UCI's Descraton Sharpens Up for College League of Legends Championship", src: "ESPN" },
  { year: "1998", href: "https://books.google.com/books?id=C5-l28dcz50C&lpg=PA1&pg=PA9", title: "PC Magazine: Adaptive Chips", src: "PC Magazine" },
]

function MoonIcon() {
  return (
    <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function Stat({ target, format, label, prefix }: { target: number; format?: (n: number) => string; label: string; prefix?: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setValue(target)
      return
    }
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setValue(target)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const duration = 1400
          const start = performance.now()
          const tick = (t: number) => {
            const k = Math.min(1, (t - start) / duration)
            const eased = 1 - Math.pow(1 - k, 3)
            setValue(Math.round(target * eased))
            if (k < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          io.unobserve(e.target)
        })
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target])

  const display = value === null ? "—" : format ? format(value) : value.toLocaleString()

  return (
    <div className="stat">
      <span className="stat-num">
        {prefix}
        <span ref={ref}>{display}</span>
      </span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

function PublicationRow({ pub }: { pub: Publication }) {
  const meta = [pub.authors, pub.venue].filter(Boolean).join(" · ")
  return (
    <a className="pub-row" href={pub.link} target="_blank" rel="noopener noreferrer">
      <span className="pub-year">{pub.year}</span>
      <div className="pub-body">
        <h4>{pub.title}</h4>
        {meta && <p className="pub-meta">{meta}</p>}
      </div>
      <span className="pub-cites" aria-label={`${pub.citations} citations`}>
        {pub.citations.toLocaleString()}
        <span className="pub-cites-label">cites</span>
      </span>
    </a>
  )
}

function PublicationsSkeleton() {
  return (
    <div className="pub-skel" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <div className="pub-skel-row" key={i}>
          <div className="pub-skel-line s"></div>
          <div>
            <div className={`pub-skel-line ${i === 2 ? "m" : "l"}`}></div>
            <div className={`pub-skel-line ${i === 1 ? "s" : "m"}`}></div>
          </div>
          <div className="pub-skel-line s"></div>
        </div>
      ))}
    </div>
  )
}

export default function HomeClient({ data }: { data: ScholarData }) {
  const [track, setTrack] = useState<Track>("academic")
  const [pubSort, setPubSort] = useState<PubSort>("cited")
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [accent, setAccent] = useState<string>(ACCENTS[0].value)

  const publications = pubSort === "cited" ? data.mostCited : data.mostRecent

  // Sync theme + accent from localStorage (in addition to the pre-hydration script in layout)
  useEffect(() => {
    const t = (localStorage.getItem("fk-theme-c") as "light" | "dark" | null) ?? "light"
    setTheme(t)
    const a = localStorage.getItem("fk-accent-c")
    if (a) setAccent(a)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", accent)
  }, [accent])

  // IntersectionObserver fade-ins
  useEffect(() => {
    const fades = document.querySelectorAll<HTMLElement>(".fade")
    if (typeof IntersectionObserver === "undefined") {
      fades.forEach((el) => el.classList.add("in"))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in")
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    )
    fades.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light"
    setTheme(next)
    try {
      localStorage.setItem("fk-theme-c", next)
    } catch {}
  }

  const pickAccent = (value: string) => {
    setAccent(value)
    try {
      localStorage.setItem("fk-accent-c", value)
    } catch {}
  }

  const list = track === "academic" ? ACADEMIC : INDUSTRY

  return (
    <>
      <div className="page">
        <div className="bar">
          <span className="mark">Fadi Kurdahi</span>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <MoonIcon />
            <SunIcon />
          </button>
        </div>

        {/* HERO */}
        <header className="hero">
          <div className="hero-row fade">
            <div className="portrait">
              <Image
                src="/kurdahi.png"
                alt="Fadi Kurdahi"
                width={184}
                height={184}
                priority
                sizes="92px"
              />
            </div>
            <div>
              <h1 className="hero-name">Fadi Kurdahi</h1>
              <div className="hero-role">
                Distinguished Professor<span className="sep">·</span>EECS<span className="sep">·</span>UC Irvine
              </div>
            </div>
          </div>
          <p className="hero-lede fade">
            Working at the intersection of VLSI, embedded systems, and the people who design them — since 1987.
          </p>
        </header>

        {/* BIO */}
        <section id="bio">
          <div className="section-label fade">About</div>
          <div className="prose fade">
            <p>
              I'm a faculty member in the{" "}
              <a href="https://engineering.uci.edu/dept/eecs">Department of Electrical Engineering and Computer Science</a> at
              UC Irvine, where I've been since 1987. I currently direct the{" "}
              <a href="https://cecs.uci.edu">Center for Embedded and Cyber-Physical Systems</a> and the{" "}
              <a href="https://mecps.eecs.uci.edu">Master of Embedded and Cyber-Physical Systems</a> program, which I founded to
              address the growing demand for expertise in this area.
            </p>
            <p>
              My research focuses on VLSI system design, digital systems automation, and embedded and cyber-physical systems.
              From 2017 to 2022 I served as Associate Dean for Graduate and Professional Studies at the{" "}
              <a href="https://engineering.uci.edu">Samueli School of Engineering</a>. I also hold a joint appointment in the{" "}
              <a href="https://www.ics.uci.edu">Donald Bren School of Information and Computer Sciences</a>.
            </p>
            <p>
              I earned my M.S. and Ph.D. in Computer Engineering from USC, and my undergraduate degree from the American
              University of Beirut. I'm a Fellow of IEEE and AAAS.
            </p>
          </div>
        </section>

        {/* STATS */}
        <section id="stats" style={{ border: "none", paddingTop: 32, paddingBottom: 32 }}>
          <div className="stats fade">
            <Stat target={data.stats.citations} label="Citations" />
            <Stat target={data.stats.hIndex} label="h-index" prefix={<><span className="h">h</span>·</>} format={(n) => String(n)} />
            <Stat target={data.stats.publications} label="Publications" format={(n) => String(n)} />
            <Stat target={data.stats.yearsAtUCI} label="Years at UCI" format={(n) => String(n)} />
          </div>
        </section>

        {/* APPOINTMENTS */}
        <section id="career">
          <div className="section-label fade">Appointments</div>
          <div className="track-switch fade">
            <button className={track === "academic" ? "active" : ""} onClick={() => setTrack("academic")}>
              Academic
            </button>
            <button className={track === "industry" ? "active" : ""} onClick={() => setTrack("industry")}>
              Industry
            </button>
          </div>
          <div className="list fade">
            {list.map((r) => (
              <div className="row" key={`${r.when}-${r.what}`}>
                <span className="when">{r.when}</span>
                <div className="what">
                  {r.what}
                  <span className="where">{r.where}</span>
                </div>
                <span className="meta">{r.meta}</span>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education">
          <div className="section-label fade">Education</div>
          <div className="list fade">
            {EDUCATION.map((r) => (
              <div className="row" key={`${r.when}-${r.what}`}>
                <span className="when">{r.when}</span>
                <div className="what">
                  {r.what}
                  <span className="where">{r.where}</span>
                </div>
                <span className="meta">{r.meta}</span>
              </div>
            ))}
          </div>
        </section>

        {/* HONORS */}
        <section id="awards">
          <div className="section-label fade">Honors</div>
          <div className="list fade">
            {HONORS.map((r) => (
              <div className="row" key={`${r.when}-${r.what}`}>
                <span className="when">{r.when}</span>
                <div className="what">
                  {r.what}
                  <span className="where">{r.where}</span>
                </div>
                <span className="meta" />
              </div>
            ))}
          </div>
        </section>

        {/* RESEARCH */}
        <section id="research">
          <div className="section-label fade">Research</div>
          <div className="research fade">
            {RESEARCH.map((r) => (
              <div className="r-item" key={r.title}>
                <h3>{r.title}</h3>
                <p>{r.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PUBLICATIONS */}
        <section id="publications">
          <div className="section-label fade">Publications</div>
          <div className="fade">
            <div className="pub-head">
              <div className="track-switch pub-switch">
                <button
                  className={pubSort === "cited" ? "active" : ""}
                  onClick={() => setPubSort("cited")}
                >
                  Most cited
                </button>
                <button
                  className={pubSort === "recent" ? "active" : ""}
                  onClick={() => setPubSort("recent")}
                >
                  Most recent
                </button>
              </div>
              <span>{data.stats.publications.toLocaleString()} indexed</span>
            </div>

            {publications.length > 0 ? (
              <div className="pub-list">
                {publications.map((p) => (
                  <PublicationRow key={p.id} pub={p} />
                ))}
              </div>
            ) : (
              <PublicationsSkeleton />
            )}

            <a
              className="pub-link"
              href={SCHOLAR_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Google Scholar →
            </a>
          </div>
        </section>

        {/* MEDIA */}
        <section id="media">
          <div className="section-label fade">Media</div>

          <div className="media fade">
            <div className="media-sub">Videos</div>
            <div className="videos">
              {VIDEOS.map((v) => (
                <a className="video" href={v.href} key={v.href} target="_blank" rel="noopener noreferrer">
                  <div className="thumb">
                    <PlayIcon />
                  </div>
                  <h4>{v.title}</h4>
                  <div className="src">{v.src}</div>
                </a>
              ))}
            </div>
          </div>

          <div className="media fade">
            <div className="media-sub">Articles &amp; Press</div>
            <div className="articles">
              {ARTICLES.map((a) => (
                <a className="article" href={a.href} key={a.href} target="_blank" rel="noopener noreferrer">
                  <span className="year">{a.year}</span>
                  <div>
                    <h4>{a.title}</h4>
                    <span className="src">{a.src}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ borderBottom: "none" }}>
          <div className="section-label fade">Contact</div>
          <dl className="fade" style={{ margin: 0 }}>
            <div className="contact-row">
              <dt>Email</dt>
              <dd>
                <a href="mailto:kurdahi@uci.edu">kurdahi@uci.edu</a>
              </dd>
            </div>
            <div className="contact-row">
              <dt>Office</dt>
              <dd>
                Engineering Hall, Room 3207
                <br />
                UC Irvine, CA 92697
              </dd>
            </div>
            <div className="contact-row">
              <dt>LinkedIn</dt>
              <dd>
                <a href="https://www.linkedin.com/in/fadikurdahi/" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/fadikurdahi
                </a>
              </dd>
            </div>
            <div className="contact-row">
              <dt>Scholar</dt>
              <dd>
                <a
                  href="https://scholar.google.com/citations?user=AF8zRPwAAAAJ&hl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Scholar profile
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <footer className="colophon">
          <span>© 2025 Fadi Kurdahi</span>
          <span>UC Irvine</span>
        </footer>
      </div>

      <div className="knobs">
        <span className="label">Accent</span>
        {ACCENTS.map((a) => (
          <button
            key={a.value}
            className={`swatch${accent === a.value ? " active" : ""}`}
            style={{ background: a.value }}
            onClick={() => pickAccent(a.value)}
            aria-label={a.label}
          />
        ))}
      </div>
    </>
  )
}
