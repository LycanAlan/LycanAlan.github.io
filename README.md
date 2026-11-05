# lycanalan.github.io

My portfolio: https://lycanalan.github.io

The hero is a live Micromouse maze. Flood fill spreads out from the goal, then the mouse runs the
shortest path. Click any cell to move the goal. It is the same algorithm my Micromouse used to win
three national competitions; the logic is in [`src/lib/maze.ts`](src/lib/maze.ts).

Every fact on the page lives in [`src/data/profile.ts`](src/data/profile.ts). The Codeforces rating
chart reads a snapshot in `src/data/cf-rating.json`.

## Run it

```bash
npm install
npm run dev     # http://localhost:5173
npm test        # maze generation, flood fill and shortest path
npm run build   # static site in dist/
```

Pushing to `main` builds and deploys to GitHub Pages (`.github/workflows/deploy.yml`).

## Refresh the Codeforces snapshot

```bash
curl -s "https://codeforces.com/api/user.rating?handle=LycanAlan" \
  | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{const r=JSON.parse(s).result;console.log(JSON.stringify(r.map(x=>({t:x.ratingUpdateTimeSeconds,r:x.newRating,rank:x.rank,name:x.contestName}))))})" \
  > src/data/cf-rating.json
```

Then update the ratings and `CHECKED_ON` in `src/data/profile.ts`.

Built with Vite, React, TypeScript, Tailwind and shadcn/ui. Type: Archivo and Martian Mono.
