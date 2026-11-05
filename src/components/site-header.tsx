import { Download } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { person } from "@/data/profile"

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#record", label: "Record" },
  { href: "#profiles", label: "Profiles" },
  { href: "#contact", label: "Contact" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container-page flex h-14 items-center justify-between gap-6">
        <a href="#top" className="wide text-[0.95rem] font-bold tracking-tight">
          {person.name}
        </a>
        <nav aria-label="Sections" className="ml-auto hidden gap-7 text-sm sm:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a href={person.resume} download className={buttonVariants({ variant: "outline", size: "sm" })}>
          <Download aria-hidden />
          Résumé
        </a>
      </div>
    </header>
  )
}
