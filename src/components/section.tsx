import { ArrowUpRight } from "lucide-react"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type SectionProps = {
  id: string
  title: string
  intro?: ReactNode
  className?: string
  children: ReactNode
}

/** Shared section frame: one heading rhythm for the whole page. */
export function Section({ id, title, intro, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("border-t", className)}>
      <div className="container-page py-20 sm:py-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
          <h2 id={`${id}-title`} className="section-title">
            {title}
          </h2>
          {intro && <p className="max-w-[44ch] text-muted-foreground md:text-right">{intro}</p>}
        </div>
        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  )
}

/** A text link that leaves the site, with the arrow that says so. */
export function OutLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-baseline gap-0.5 font-medium underline decoration-border decoration-[1.5px] underline-offset-[5px] transition-colors hover:decoration-red"
    >
      {children}
      <ArrowUpRight
        aria-hidden
        className="size-3.5 self-center text-muted-foreground transition-colors group-hover:text-red"
      />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
