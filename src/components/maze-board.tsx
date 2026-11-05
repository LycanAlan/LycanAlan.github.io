import { RefreshCw } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import {
  E,
  N,
  S,
  W,
  floodFill,
  goalCells,
  hasWall,
  makeMaze,
  shortestPath,
} from "@/lib/maze"

const SIZE = 10
const CELL = 40
const PAD = 8 // room for the outer wall posts
const BOARD = SIZE * CELL + PAD * 2
const START = (SIZE - 1) * SIZE // bottom-left, where a real mouse starts
const FIRST_SEED = 2027
const WAVE_MS = 55 // delay per flood-fill step
const STEP_MS = 130 // time the mouse spends per cell
const POST = 6

type Run = { id: number; seed: number; goals: number[]; from: number }

const centre = (cell: number) => ({
  x: PAD + (cell % SIZE) * CELL + CELL / 2,
  y: PAD + Math.floor(cell / SIZE) * CELL + CELL / 2,
})

function headingDegrees(from: number, to: number): number {
  const diff = to - from
  if (diff === -SIZE) return 0
  if (diff === 1) return 90
  if (diff === SIZE) return 180
  return 270
}

function wallsPath(walls: (cell: number, wall: number) => boolean): string {
  let d = ""
  for (let cell = 0; cell < SIZE * SIZE; cell++) {
    const x = PAD + (cell % SIZE) * CELL
    const y = PAD + Math.floor(cell / SIZE) * CELL
    if (walls(cell, N)) d += `M${x} ${y}h${CELL}`
    if (walls(cell, W)) d += `M${x} ${y}v${CELL}`
    if (walls(cell, S) && cell >= SIZE * (SIZE - 1)) d += `M${x} ${y + CELL}h${CELL}`
    if (walls(cell, E) && cell % SIZE === SIZE - 1) d += `M${x + CELL} ${y}v${CELL}`
  }
  return d
}

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

export function MazeBoard() {
  const [run, setRun] = useState<Run>({
    id: 0,
    seed: FIRST_SEED,
    goals: goalCells(SIZE),
    from: START,
  })
  const [step, setStep] = useState(0)
  const [reduced] = useState(reducedMotion)

  const maze = useMemo(() => makeMaze(SIZE, run.seed), [run.seed])
  const dist = useMemo(() => floodFill(maze, run.goals), [maze, run.goals])
  const path = useMemo(
    () => shortestPath(maze, dist, run.from),
    [maze, dist, run.from]
  )
  const walls = useMemo(
    () => wallsPath((cell, wall) => hasWall(maze, cell, wall)),
    [maze]
  )
  const floodMs = Math.max(...dist) * WAVE_MS

  // After the wave settles, walk the mouse down the path one cell at a time.
  useEffect(() => {
    if (reduced) return
    let walk = 0
    const begin = window.setTimeout(() => {
      walk = window.setInterval(() => {
        setStep((s) => {
          if (s >= path.length - 1) window.clearInterval(walk)
          return Math.min(s + 1, path.length - 1)
        })
      }, STEP_MS)
    }, floodMs + 300)
    return () => {
      window.clearTimeout(begin)
      window.clearInterval(walk)
    }
  }, [run.id, path, floodMs, reduced])

  const shown = reduced ? path.length - 1 : step
  const mouseCell = path[shown]
  const arrived = shown === path.length - 1
  const mouse = centre(mouseCell)
  const heading = shown > 0 ? headingDegrees(path[shown - 1], mouseCell) : 0
  const routeTo = (n: number) => path.slice(0, n + 1).map(centre)
  const visited = new Set(path.slice(0, shown + 1))

  const restart = (next: Omit<Run, "id">) => {
    setRun((r) => ({ id: r.id + 1, ...next }))
    setStep(0)
  }
  const moveGoal = (cell: number) =>
    restart({ seed: run.seed, goals: [cell], from: mouseCell })
  const newMaze = () =>
    restart({
      seed: Math.floor(Math.random() * 1e9),
      goals: goalCells(SIZE),
      from: START,
    })

  return (
    <figure className="w-full">
      <div className="rounded-xl bg-floor p-2.5 shadow-[0_30px_60px_-30px_oklch(0.2_0.02_262/0.55)] sm:p-3">
        <div className="flex items-center justify-between px-1.5 pt-0.5 pb-2 font-mono text-[0.6875rem] text-floor-muted">
          <span>flood fill · {SIZE}×{SIZE}</span>
          <span aria-live="polite" className="tabular">
            {arrived
              ? `${path.length - 1} steps to goal`
              : `step ${shown} of ${path.length - 1}`}
          </span>
        </div>

        <svg
          viewBox={`0 0 ${BOARD} ${BOARD}`}
          className="block h-auto w-full select-none"
          role="img"
          aria-label="A Micromouse maze. Each number is that cell's distance to the goal; the red line is the shortest path the mouse takes."
        >
          <polyline
            points={routeTo(path.length - 1).map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="var(--red)"
            strokeOpacity={0.35}
            strokeWidth={2}
            strokeDasharray="3 5"
          />
          <polyline
            points={routeTo(shown).map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="var(--red)"
            strokeWidth={3}
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          <g key={run.id}>
            {Array.from(dist, (d, cell) => {
              const { x, y } = centre(cell)
              const delay = { animationDelay: `${d * WAVE_MS}ms` }
              return (
                <g key={cell}>
                  <rect
                    className="maze-flash"
                    style={delay}
                    x={x - CELL / 2}
                    y={y - CELL / 2}
                    width={CELL}
                    height={CELL}
                    fill="var(--red)"
                    fillOpacity={0}
                  />
                  <text
                    className="maze-num font-mono"
                    style={delay}
                    x={x}
                    y={y}
                    dy="0.36em"
                    textAnchor="middle"
                    fontSize={12}
                    paintOrder="stroke"
                    stroke="var(--floor)"
                    strokeWidth={4}
                    fill={
                      d === 0
                        ? "var(--red)"
                        : visited.has(cell)
                          ? "var(--floor-ink)"
                          : "var(--floor-muted)"
                    }
                  >
                    {d}
                  </text>
                </g>
              )
            })}
          </g>

          <path
            d={walls}
            stroke="var(--floor-ink)"
            strokeWidth={3}
            strokeLinecap="square"
            fill="none"
          />
          {Array.from({ length: (SIZE + 1) ** 2 }, (_, i) => (
            <rect
              key={i}
              x={PAD + (i % (SIZE + 1)) * CELL - POST / 2}
              y={PAD + Math.floor(i / (SIZE + 1)) * CELL - POST / 2}
              width={POST}
              height={POST}
              fill="var(--red)"
            />
          ))}

          <g
            style={{
              transform: `translate(${mouse.x}px, ${mouse.y}px)`,
              transition: reduced ? undefined : `transform ${STEP_MS}ms linear`,
            }}
            aria-hidden
          >
            <g transform={`rotate(${heading})`}>
              <rect x={-9} y={-11} width={18} height={22} rx={5} fill="var(--floor-ink)" />
              <rect x={-7} y={-11} width={14} height={4} rx={1.5} fill="var(--red)" />
            </g>
          </g>

          {Array.from({ length: SIZE * SIZE }, (_, cell) => {
            const { x, y } = centre(cell)
            return (
              <rect
                key={cell}
                x={x - CELL / 2}
                y={y - CELL / 2}
                width={CELL}
                height={CELL}
                className="cursor-pointer fill-transparent transition-colors hover:fill-white/[0.07]"
                onClick={() => moveGoal(cell)}
              />
            )
          })}
        </svg>
      </div>

      <figcaption className="mt-3 flex items-start justify-between gap-4 text-sm text-muted-foreground">
        <span className="max-w-[40ch]">
          The flood fill my Micromouse used at three national wins, running
          live. Click any cell to move the goal.
        </span>
        <button
          type="button"
          onClick={newMaze}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-red"
        >
          <RefreshCw className="size-3.5" aria-hidden />
          New maze
        </button>
      </figcaption>
    </figure>
  )
}
