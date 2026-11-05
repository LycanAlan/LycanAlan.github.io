import { Download } from "lucide-react"

import { person } from "@/data/profile"

const NAV = [
  { href: "#work", label: "Projects" },
  { href: "#record", label: "Record" },
  { href: "#profiles", label: "Contests" },
  { href: "#approach", label: "About" },
  { href: "#contact", label: "Contact" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md">
      <div className="container-page grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4">
        <a href="#top" aria-label={`${person.name}, back to top`} className="justify-self-start">
          <Monogram />
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-[0.95rem] font-medium text-foreground/65 decoration-red decoration-2 underline-offset-[7px] transition-colors hover:text-foreground hover:underline"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href={person.resume} download className="btn btn-solid col-start-3 h-10 justify-self-end px-4 text-sm">
          <Download aria-hidden className="size-4" />
          Résumé
        </a>
      </div>
    </header>
  )
}

/** "AA" on a square of maze floor, with the maze's red posts in the corners. */
function Monogram() {
  return (
    <svg viewBox="0 0 40 40" className="size-10" aria-hidden>
      <rect width={40} height={40} rx={7} fill="var(--floor)" />
      {[4, 31].map((x) => [4, 31].map((y) => <rect key={`${x}-${y}`} x={x} y={y} width={5} height={5} fill="var(--red)" />))}
      <text x={20} y={26} textAnchor="middle" fontSize={15} fontWeight={800} letterSpacing={-0.5} fill="var(--floor-ink)">
        AA
      </text>
    </svg>
  )
}
