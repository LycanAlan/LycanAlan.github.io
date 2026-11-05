# Portfolio Implementation Plan

> Executed inline in the session that wrote it (user asked for the build directly).

**Goal:** Build and ship the one-page portfolio described in the spec.
**Architecture:** Static Vite + React SPA. All content in `src/data/profile.ts`; maze logic is a
pure module with a node test; sections are small presentational components.
**Tech Stack:** Vite 8, React 19, TypeScript, Tailwind v4, shadcn/ui (base-nova), Fontsource.
**Spec:** `docs/superpowers/specs/2026-11-06-portfolio-design.md`

## Global Constraints
- No em dashes in copy. Accent red only for maze posts, paths, and measured "after" values.
- Body text contrast at least 4.5:1. Works from 360px wide upward.
- `base: "/"` in Vite (user site lives at the domain root).

---

### Task 1: Maze logic
**Files:** `src/lib/maze.ts`, `src/lib/maze.test.ts`
**Produces:**
- `makeMaze(size: number, seed: number): Maze`; `Maze = { size, walls: Uint8Array }` with
  wall bits N=1, E=2, S=4, W=8 per cell.
- `floodFill(maze, goals: number[]): Int16Array` (BFS distance per cell, -1 when unreachable).
- `shortestPath(maze, dist, from: number): number[]` (cells from `from` down to a goal).
- Test: every cell reachable; distances drop by exactly 1 along the path; the path ends on a goal.
- Run: `node --test src/lib/maze.test.ts`.

### Task 2: Design tokens and shell
**Files:** `src/index.css`, `src/main.tsx`, `index.html`, `vite.config.ts`.
Tokens (ink, paper, line, muted, red, floor), fonts, base type, page metadata, favicon.

### Task 3: Maze component
**Files:** `src/components/maze-board.tsx`. SVG board; wave reveal by distance via CSS
transition delay; mouse steps along the path; click sets a new goal; "New maze" button.

### Task 4: Content and sections
**Files:** `src/data/profile.ts`, `src/data/cf-rating.json`, `src/components/*.tsx`, `src/App.tsx`.
Hero, Work, Record, Profiles (with rating chart), Approach, Experience, Contact, Footer.

### Task 5: Verify
Typecheck, lint, test, build; browser pane at 1440, 1280, 768, 390 widths; console clean;
impeccable detector against the dev server.

### Task 6: Ship
`LycanAlan.github.io` repo, GitHub Actions Pages workflow building `dist/`, confirm the URL loads.
