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
        <nav aria-label="Sections" className="col-start-2 hidden items-center gap-1 md:flex">
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

