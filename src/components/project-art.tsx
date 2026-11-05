// Drawn pictures for the two projects that have no screenshot. Both use the
// maze's colours: dark floor, light ink, red for the part that matters.
// viewBox is 600x375, the same 16:10 as the photos on the other cards.

const INK = "var(--floor-ink)"
const MUTED = "var(--floor-muted)"
const RED = "var(--red)"

/** Three gateways hash every key onto a ring, and the ring picks the Redis shard. */
export function RateLimiterArt() {
  const ring = { x: 300, y: 188, r: 78 }
  const rows = [112, 188, 264]
  const shardColour = [INK, MUTED, RED]
  // Which shard owns each of the 24 drawn virtual nodes, spread around the ring.
  const owners = "ABCBACCABCABBCACBABCACBA"

  // Point just outside the ring, facing (px, py).
  const edge = (px: number, py: number) => {
    const d = Math.hypot(px - ring.x, py - ring.y)
    return { x: ring.x + ((px - ring.x) / d) * (ring.r + 14), y: ring.y + ((py - ring.y) / d) * (ring.r + 14) }
  }

  return (
    <svg viewBox="0 0 600 375" className="size-full" role="img" aria-label="Diagram: three gateway nodes hash each key onto a consistent hash ring, which maps it to one of three Redis shards.">
      <text x={24} y={40} className="font-mono" fontSize={13} fill={MUTED}>
        3 gateways · 1 hash ring · 3 redis shards
      </text>

      {rows.map((y, i) => {
        const a = edge(160, y)
        const b = edge(480, y)
        return (
          <g key={y}>
            <line x1={160} y1={y} x2={a.x} y2={a.y} stroke={MUTED} strokeOpacity={0.5} strokeWidth={1.5} strokeDasharray="4 4" />
            <line x1={b.x} y1={b.y} x2={480} y2={y} stroke={shardColour[i]} strokeOpacity={0.7} strokeWidth={1.5} strokeDasharray="4 4" />

            <rect x={24} y={y - 26} width={136} height={52} rx={6} fill={MUTED} fillOpacity={0.08} stroke={MUTED} strokeOpacity={0.6} />
            <text x={40} y={y - 2} fontSize={15} fontWeight={600} fill={INK}>gateway {i + 1}</text>
            <text x={40} y={y + 15} className="font-mono" fontSize={11} fill={MUTED}>epoll loop</text>

            <ellipse cx={520} cy={y - 17} rx={40} ry={9} fill="none" stroke={shardColour[i]} strokeWidth={1.5} />
            <path d={`M480 ${y - 17} v34 a40 9 0 0 0 80 0 v-34`} fill="none" stroke={shardColour[i]} strokeWidth={1.5} />
            <text x={520} y={y + 10} textAnchor="middle" className="font-mono" fontSize={12} fill={INK}>
              redis {"ABC"[i]}
            </text>
          </g>
        )
      })}

      <circle cx={ring.x} cy={ring.y} r={ring.r} fill="none" stroke={MUTED} strokeOpacity={0.6} strokeWidth={2} />
      {[...owners].map((owner, i) => {
        const angle = ((i * 15 + 4) * Math.PI) / 180
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        return (
          <line
            key={i}
            x1={ring.x + cos * (ring.r - 7)}
            y1={ring.y + sin * (ring.r - 7)}
            x2={ring.x + cos * (ring.r + 7)}
            y2={ring.y + sin * (ring.r + 7)}
            stroke={shardColour["ABC".indexOf(owner)]}
            strokeWidth={4}
            strokeLinecap="round"
          />
        )
      })}
      <text x={ring.x} y={ring.y - 2} textAnchor="middle" fontSize={15} fontWeight={600} fill={INK}>hash ring</text>
      <text x={ring.x} y={ring.y + 16} textAnchor="middle" className="font-mono" fontSize={11} fill={MUTED}>100 vnodes</text>

      <text x={24} y={350} className="font-mono" fontSize={13} fill={RED}>
        check + count in one atomic Lua script
      </text>
    </svg>
  )
}

/** Pitch-deck pages go to the PDF text layer if they have one, or to a vision model if they are images. */
export function PitchLensArt() {
  // 9 sample pages, about two thirds of them images with no text layer.
  const pages = "ITIIITIIT"
  const W = 60
  const H = 40
  const GAP = 12
  const left = 24
  const top = 120
  const router = { x: 300, y: 196 }

  return (
    <svg viewBox="0 0 600 375" className="size-full" role="img" aria-label="Diagram: each pitch-deck page goes to the PDF text layer if it has one, or to a vision model if it is only an image.">
      <text x={24} y={40} className="font-mono" fontSize={13} fill={MUTED}>
        19 real decks · 65% of pages have no text
      </text>

      {[...pages].map((kind, i) => {
        const x = left + (i % 3) * (W + GAP)
        const y = top + Math.floor(i / 3) * (H + GAP)
        return (
          <g key={i}>
            <rect x={x} y={y} width={W} height={H} rx={4} fill={MUTED} fillOpacity={0.08} stroke={kind === "I" ? RED : MUTED} strokeOpacity={kind === "I" ? 0.9 : 0.6} />
            {kind === "T" ? (
              [10, 19, 28].map((dy, j) => (
                <line key={dy} x1={x + 9} y1={y + dy} x2={x + [42, 34, 38][j]} y2={y + dy} stroke={MUTED} strokeWidth={3} strokeLinecap="round" />
              ))
            ) : (
              <>
                <circle cx={x + 44} cy={y + 12} r={4} fill={RED} />
                <path d={`M${x + 8} ${y + 33} l14 -14 l10 10 l8 -6 l14 10`} fill="none" stroke={RED} strokeWidth={2} strokeLinejoin="round" />
              </>
            )}
          </g>
        )
      })}

      <line x1={left + 3 * W + 2 * GAP + 8} y1={router.y} x2={router.x - 22} y2={router.y} stroke={MUTED} strokeWidth={1.5} />
      <circle cx={router.x} cy={router.y} r={20} fill="none" stroke={INK} strokeWidth={2} />
      <path d={`M${router.x - 7} ${router.y} h14 M${router.x + 2} ${router.y - 5} l5 5 l-5 5`} fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

      <path d={`M${router.x + 20} ${router.y - 6} C 335 ${router.y - 40}, 330 128, 352 128`} fill="none" stroke={MUTED} strokeWidth={1.5} />
      <rect x={352} y={104} width={224} height={48} rx={6} fill={MUTED} fillOpacity={0.08} stroke={MUTED} strokeOpacity={0.6} />
      <text x={368} y={125} fontSize={15} fontWeight={600} fill={INK}>text layer</text>
      <text x={368} y={142} className="font-mono" fontSize={11} fill={MUTED}>page has real text</text>

      <path d={`M${router.x + 20} ${router.y + 6} C 335 ${router.y + 40}, 330 264, 352 264`} fill="none" stroke={RED} strokeWidth={2} />
      <rect x={352} y={240} width={224} height={48} rx={6} fill={RED} fillOpacity={0.12} stroke={RED} />
      <text x={368} y={261} fontSize={15} fontWeight={600} fill={INK}>vision model</text>
      <text x={368} y={278} className="font-mono" fontSize={11} fill={MUTED}>page is a picture</text>

      <text x={24} y={350} className="font-mono" fontSize={13} fill={INK}>
        <tspan fill={RED}>19 of 19</tspan> decks readable, up from 4
      </text>
    </svg>
  )
}
