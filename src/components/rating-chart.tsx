import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react"

import history from "@/data/cf-rating.json"

type Contest = { t: number; r: number; rank: number; name: string }

const DATA = history as Contest[]
const HEIGHT = 300
const MARGIN = { top: 20, right: 20, bottom: 30, left: 44 }
const Y_MIN = 300
const Y_MAX = 1500
const GRID = [400, 800]
const BANDS = [
  { rating: 1200, name: "Pupil" },
  { rating: 1400, name: "Specialist" },
]
const BEST = DATA.reduce((best, c) => (c.rank < best.rank ? c : best))
const YEARS = [2024, 2025, 2026]

const date = (t: number, withDay = true) =>
  new Date(t * 1000).toLocaleDateString("en-US", {
    day: withDay ? "numeric" : undefined,
    month: "short",
    year: "numeric",
  })

/** Codeforces rating after each rated contest. Single series, so no legend. */
export function RatingChart() {
  const box = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(640)
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const el = box.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const t0 = DATA[0].t
  const t1 = DATA[DATA.length - 1].t
  const x = (t: number) => MARGIN.left + ((t - t0) / (t1 - t0)) * (width - MARGIN.left - MARGIN.right)
  const y = (r: number) => MARGIN.top + (1 - (r - Y_MIN) / (Y_MAX - Y_MIN)) * (HEIGHT - MARGIN.top - MARGIN.bottom)
  const line = DATA.map((c, i) => `${i ? "L" : "M"}${x(c.t).toFixed(1)} ${y(c.r).toFixed(1)}`).join("")
  const last = DATA[DATA.length - 1]

  const nearest = (px: number) => {
    let best = 0
    for (let i = 1; i < DATA.length; i++) {
      if (Math.abs(x(DATA[i].t) - px) < Math.abs(x(DATA[best].t) - px)) best = i
    }
    return best
  }
  const onPointerMove = (e: PointerEvent<SVGSVGElement>) =>
    setActive(nearest(e.clientX - e.currentTarget.getBoundingClientRect().left))
  const onKeyDown = (e: KeyboardEvent<SVGSVGElement>) => {
    const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 }
    if (e.key === "Home") setActive(0)
    else if (e.key === "End") setActive(DATA.length - 1)
    else if (e.key in moves) setActive((a) => Math.min(Math.max((a ?? DATA.length - 1) + moves[e.key], 0), DATA.length - 1))
    else return
    e.preventDefault()
  }

  const shown = active === null ? null : DATA[active]
  const tipLeft = shown ? Math.min(Math.max(x(shown.t), 110), width - 110) : 0

  return (
    <figure>
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="wide text-xl font-bold tracking-tight">Codeforces rating</span>
        <span className="text-sm text-muted-foreground">
          {DATA.length} rated contests since {date(t0, false)}
        </span>
      </figcaption>

      <div ref={box} className="relative mt-5">
        <svg
          width={width}
          height={HEIGHT}
          className="block touch-pan-y overflow-visible rounded-md focus-visible:outline-offset-4"
          tabIndex={0}
          role="img"
          aria-label={`Codeforces rating over ${DATA.length} contests, from ${DATA[0].r} to ${last.r}. Use the arrow keys to step through contests.`}
          onPointerMove={onPointerMove}
          onPointerLeave={() => setActive(null)}
          onKeyDown={onKeyDown}
          onBlur={() => setActive(null)}
        >
          {GRID.map((g) => (
            <g key={g}>
              <line x1={MARGIN.left} x2={width - MARGIN.right} y1={y(g)} y2={y(g)} stroke="var(--border)" />
              <text x={MARGIN.left - 10} y={y(g)} dy="0.35em" textAnchor="end" className="fill-muted-foreground font-mono text-[10px]">
                {g}
              </text>
            </g>
          ))}
          {BANDS.map((b) => (
            <g key={b.rating}>
              <line x1={MARGIN.left} x2={width - MARGIN.right} y1={y(b.rating)} y2={y(b.rating)} stroke="var(--muted-foreground)" strokeOpacity={0.5} strokeDasharray="4 4" />
              <text x={MARGIN.left - 10} y={y(b.rating)} dy="0.35em" textAnchor="end" className="fill-muted-foreground font-mono text-[10px]">
                {b.rating}
              </text>
              <text x={MARGIN.left + 6} y={y(b.rating) - 6} className="fill-muted-foreground text-[11px]">
                {b.name}
              </text>
            </g>
          ))}
          {YEARS.map((yr) => {
            const t = Date.UTC(yr, 0, 1) / 1000
            return (
              <text key={yr} x={x(t)} y={HEIGHT - 6} textAnchor="middle" className="fill-muted-foreground font-mono text-[10px]">
                {yr}
              </text>
            )
          })}

          <path d={line} fill="none" stroke="var(--red)" strokeWidth={2} strokeLinejoin="round" />

          <circle cx={x(BEST.t)} cy={y(BEST.r)} r={5} fill="var(--background)" stroke="var(--foreground)" strokeWidth={2} />
          <text x={x(BEST.t)} y={y(BEST.r) - 12} textAnchor="middle" paintOrder="stroke" stroke="var(--background)" strokeWidth={4} className="fill-foreground text-[11px] font-medium">
            Rank {BEST.rank}
          </text>
          <circle cx={x(last.t)} cy={y(last.r)} r={5} fill="var(--red)" stroke="var(--background)" strokeWidth={2} />
          <text x={x(last.t) - 10} y={y(last.r) - 12} textAnchor="end" paintOrder="stroke" stroke="var(--background)" strokeWidth={4} className="fill-foreground font-mono text-xs font-semibold">
            {last.r}
          </text>

          {shown && (
            <g pointerEvents="none">
              <line x1={x(shown.t)} x2={x(shown.t)} y1={MARGIN.top} y2={HEIGHT - MARGIN.bottom} stroke="var(--foreground)" strokeOpacity={0.35} />
              <circle cx={x(shown.t)} cy={y(shown.r)} r={4.5} fill="var(--red)" stroke="var(--background)" strokeWidth={2} />
            </g>
          )}
        </svg>

        {shown && (
          <div
            role="status"
            className="pointer-events-none absolute top-0 w-[13.5rem] -translate-x-1/2 rounded-lg border bg-background px-3 py-2 text-xs shadow-md"
            style={{ left: tipLeft }}
          >
            <p className="font-medium text-foreground">{shown.name}</p>
            <p className="mt-1 text-muted-foreground">{date(shown.t)}</p>
            <p className="mt-1.5 flex justify-between font-mono tabular">
              <span>rating {shown.r}</span>
              <span>rank {shown.rank}</span>
            </p>
          </div>
        )}
      </div>

      <details className="mt-4 text-sm">
        <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
          Show every contest as a table
        </summary>
        <div className="mt-3 max-h-72 overflow-auto rounded-md border">
          <table className="w-full text-left text-xs">
            <thead className="sticky top-0 bg-muted">
              <tr>
                <th className="px-3 py-2 font-medium">Date</th>
                <th className="px-3 py-2 font-medium">Contest</th>
                <th className="px-3 py-2 text-right font-medium">Rank</th>
                <th className="px-3 py-2 text-right font-medium">Rating</th>
              </tr>
            </thead>
            <tbody className="font-mono tabular">
              {[...DATA].reverse().map((c) => (
                <tr key={c.t} className="border-t">
                  <td className="px-3 py-1.5 whitespace-nowrap">{date(c.t)}</td>
                  <td className="px-3 py-1.5 font-sans">{c.name}</td>
                  <td className="px-3 py-1.5 text-right">{c.rank}</td>
                  <td className="px-3 py-1.5 text-right">{c.r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  )
}
