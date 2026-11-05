import { Download, Mail } from "lucide-react"

import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons"
import { MazeBoard } from "@/components/maze-board"
import { buttonVariants } from "@/components/ui/button"
import { links, person, record } from "@/data/profile"
import { cn } from "@/lib/utils"

const CREDENTIALS = [
  "LeetCode Knight",
  "Codeforces Specialist",
  "1,000+ problems",
  "3× national Micromouse champion",
]

export function Hero() {
  return (
    <section id="top" className="container-page grid items-center gap-14 pt-12 pb-20 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,29rem)] lg:gap-16 lg:pt-20 lg:pb-28">
      <div>
        <h1 className="display text-[clamp(3.4rem,9vw,6rem)]">
          Ali
          <br />
          Ansari
        </h1>
        <p className="wide mt-7 max-w-[20ch] text-[clamp(1.5rem,3vw,2.125rem)] leading-[1.15] font-semibold tracking-tight text-balance">
          I build systems, then measure them before I say they work.
        </p>
        <p className="mt-5 max-w-[54ch] text-muted-foreground">
          Final-year ECE student at LNMIIT Jaipur,{" "}
          <strong className="font-semibold text-foreground">
            ranked 1st of {record.classSize} for {record.semesters} straight semesters
          </strong>
          . I work on backend systems, retrieval and ML, and embedded C++, and I
          compete on Codeforces and LeetCode.
        </p>

        <p className="mt-6 flex items-start gap-2.5 text-[0.95rem] font-medium">
          <span aria-hidden className="mt-[0.45rem] size-2 shrink-0 bg-red" />
          {person.availability}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <a href={person.resume} download className={cn(buttonVariants({ size: "lg" }), "h-11 px-4 text-[0.95rem]")}>
            <Download aria-hidden />
            Download résumé
          </a>
          <a href={`mailto:${person.email}`} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-4 text-[0.95rem]")}>
            <Mail aria-hidden />
            Email me
          </a>
          <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub (opens in a new tab)" className={cn(buttonVariants({ variant: "ghost", size: "icon-lg" }), "size-11")}>
            <GitHubIcon className="size-5" />
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn (opens in a new tab)" className={cn(buttonVariants({ variant: "ghost", size: "icon-lg" }), "size-11")}>
            <LinkedInIcon className="size-5" />
          </a>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t pt-5 font-mono text-xs text-muted-foreground">
          {CREDENTIALS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>

      <MazeBoard />
    </section>
  )
}
