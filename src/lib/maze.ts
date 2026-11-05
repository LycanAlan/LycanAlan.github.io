/*
 * Micromouse maze + flood fill.
 *
 * A Micromouse maze is a square grid of cells. Each cell stores which of its
 * four walls are up as a 4-bit mask:
 *
 *        N=1
 *      +-----+
 *  W=8 |     | E=2
 *      +-----+
 *        S=4
 *
 * Flood fill is a breadth-first search that starts at the goal (distance 0)
 * and spreads outwards through open walls, writing each cell's step count:
 *
 *   +---+---+---+
 *   | 2   1 | 2 |        Any cell can reach the goal by moving to a
 *   +   +   +   +        neighbour whose number is exactly one lower.
 *   | 3 | 0   1 |        That greedy walk is the shortest path, which
 *   +---+---+---+        is what the mouse follows.
 *
 * The real robot re-runs this every time its sensors find a new wall. Here the
 * whole maze is known, so one pass is enough.
 */

export const N = 1
export const E = 2
export const S = 4
export const W = 8

export type Maze = {
  size: number
  walls: Uint8Array // one wall mask per cell, index = row * size + col
}

type Step = { wall: number; opposite: number; dRow: number; dCol: number }

const STEPS: Step[] = [
  { wall: N, opposite: S, dRow: -1, dCol: 0 },
  { wall: E, opposite: W, dRow: 0, dCol: 1 },
  { wall: S, opposite: N, dRow: 1, dCol: 0 },
  { wall: W, opposite: E, dRow: 0, dCol: -1 },
]

// Share of the remaining walls knocked down after carving. Real contest mazes
// have loops so that the first route found is rarely the best one.
const LOOP_RATIO = 0.12

/** The 2x2 centre square, where real Micromouse mazes put the goal. */
export function goalCells(size: number): number[] {
  const hi = size / 2
  const lo = hi - 1
  return [lo * size + lo, lo * size + hi, hi * size + lo, hi * size + hi]
}

/** Builds a solvable maze with a few loops. The same seed gives the same maze. */
export function makeMaze(size: number, seed: number): Maze {
  const random = seededRandom(seed)
  const walls = new Uint8Array(size * size).fill(N | E | S | W)
  const maze = { size, walls }

  carvePassages(maze, random)
  openGoalSquare(maze)
  addLoops(maze, random)
  return maze
}

/** Distance in steps from every cell to the nearest goal; -1 if unreachable. */
export function floodFill(maze: Maze, goals: number[]): Int16Array {
  const dist = new Int16Array(maze.size * maze.size).fill(-1)
  const queue: number[] = []
  for (const g of goals) {
    dist[g] = 0
    queue.push(g)
  }

  for (let head = 0; head < queue.length; head++) {
    const cell = queue[head]
    for (const next of openNeighbours(maze, cell)) {
      if (dist[next] !== -1) continue
      dist[next] = dist[cell] + 1
      queue.push(next)
    }
  }
  return dist
}

/** Walks downhill on the flood-fill numbers from `from` to a goal. */
export function shortestPath(maze: Maze, dist: Int16Array, from: number): number[] {
  if (dist[from] < 0) return [from]

  const path = [from]
  let cell = from
  while (dist[cell] > 0) {
    const lower = openNeighbours(maze, cell).find((n) => dist[n] === dist[cell] - 1)
    if (lower === undefined) break // cannot happen for a consistent flood fill
    cell = lower
    path.push(cell)
  }
  return path
}

export function hasWall(maze: Maze, cell: number, wall: number): boolean {
  return (maze.walls[cell] & wall) !== 0
}

// ---------------------------------------------------------------------------

/** Iterative depth-first "recursive backtracker": produces a perfect maze. */
function carvePassages(maze: Maze, random: () => number) {
  const visited = new Uint8Array(maze.size * maze.size)
  const stack = [(maze.size - 1) * maze.size] // start where the mouse starts
  visited[stack[0]] = 1

  while (stack.length > 0) {
    const cell = stack[stack.length - 1]
    const options = STEPS.filter((step) => {
      const next = neighbour(maze.size, cell, step)
      return next !== -1 && !visited[next]
    })
    if (options.length === 0) {
      stack.pop()
      continue
    }
    const step = options[Math.floor(random() * options.length)]
    const next = neighbour(maze.size, cell, step)
    removeWall(maze, cell, next, step)
    visited[next] = 1
    stack.push(next)
  }
}

function openGoalSquare(maze: Maze) {
  const [topLeft, topRight, bottomLeft, bottomRight] = goalCells(maze.size)
  removeWall(maze, topLeft, topRight, STEPS[1])
  removeWall(maze, bottomLeft, bottomRight, STEPS[1])
  removeWall(maze, topLeft, bottomLeft, STEPS[2])
  removeWall(maze, topRight, bottomRight, STEPS[2])
}

function addLoops(maze: Maze, random: () => number) {
  const count = Math.round(maze.size * maze.size * LOOP_RATIO)
  for (let i = 0; i < count; i++) {
    const cell = Math.floor(random() * maze.walls.length)
    const step = STEPS[Math.floor(random() * STEPS.length)]
    const next = neighbour(maze.size, cell, step)
    if (next !== -1) removeWall(maze, cell, next, step)
  }
}

function openNeighbours(maze: Maze, cell: number): number[] {
  return STEPS.filter((step) => !hasWall(maze, cell, step.wall)).map((step) =>
    neighbour(maze.size, cell, step)
  )
}

function neighbour(size: number, cell: number, step: Step): number {
  const row = Math.floor(cell / size) + step.dRow
  const col = (cell % size) + step.dCol
  if (row < 0 || row >= size || col < 0 || col >= size) return -1
  return row * size + col
}

function removeWall(maze: Maze, cell: number, next: number, step: Step) {
  maze.walls[cell] &= ~step.wall
  maze.walls[next] &= ~step.opposite
}

/** mulberry32: a tiny deterministic PRNG, so a seed always rebuilds the same maze. */
function seededRandom(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
