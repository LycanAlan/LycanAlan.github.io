import { ExternalLink, Play, Plus } from "lucide-react"
import type { ComponentType } from "react"

import { GitHubIcon } from "@/components/brand-icons"
import { PitchLensArt, RateLimiterArt } from "@/components/project-art"
import { OutLink, Section } from "@/components/section"
import { links, projects, type Bar, type Measure, type Project } from "@/data/profile"
import { cn } from "@/lib/utils"

// Projects with no screenshot or photo get a drawn diagram instead.
const ART: Record<string, ComponentType> = {
  "Distributed Rate Limiter": RateLimiterArt,
  PitchLens: PitchLensArt,
}

export function Work() {
  return (
    <Section
      id="work"
      title="Selected work"
      intro="Each project leads with the number I measured, not the stack I used."
    >
      <ul className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </ul>
      <p className="mt-10 text-muted-foreground">
        More on <OutLink href={links.github}>GitHub</OutLink>, including VoidQA, a
        MERN question-and-answer site with voting and tag search.
      </p>
    </Section>
  )
}

function ProjectCard({ project: p }: { project: Project }) {
  const Art = ART[p.name]
  return (
    <li
      id={p.name.toLowerCase().replaceAll(" ", "-")}
      className="group flex flex-col overflow-hidden rounded-xl border border-foreground/15 bg-background transition-colors duration-300 hover:border-foreground/60"
    >
      <div className="aspect-[16/10] overflow-hidden border-b border-foreground/15 bg-floor">
        {p.picture ? (
          <img
            src={p.picture.src}
            alt={p.picture.alt}
            width={1200}
            height={750}
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          Art && <Art />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="font-mono text-xs text-muted-foreground">
          {p.when}
          {p.context && <span className="text-red"> · {p.context}</span>}
        </p>
        <h3 className="wide mt-2.5 text-2xl font-bold tracking-tight sm:text-[1.75rem]">{p.name}</h3>
        <p className="mt-2 text-muted-foreground">{p.tagline}</p>

        {p.measure && <Headline measure={p.measure} />}

        <p className="mt-6 flex flex-wrap gap-2.5">
          {p.links.map((l) => (
            <LinkButton key={l.href} label={l.label} href={l.href} />
          ))}
        </p>

        {/* mt-auto keeps "How it works" level across a row of cards. */}
        <div className="mt-auto pt-6">
          <details className="group/more border-t border-foreground/15 pt-4">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold [&::-webkit-details-marker]:hidden">
              How it works
              <Plus aria-hidden className="size-4 transition-transform duration-200 group-open/more:rotate-45" />
            </summary>
            <div className="mt-4 space-y-4 text-[0.95rem] text-muted-foreground">
              <p>{p.summary}</p>
              {p.facts.length > 0 && (
                <ul className="space-y-2.5">
                  {p.facts.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span aria-hidden className="mt-[0.6rem] size-1.5 shrink-0 bg-red" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}
              <p className="font-mono text-xs leading-relaxed">{p.stack.join(" · ")}</p>
            </div>
          </details>
        </div>
      </div>
    </li>
  )
}

function LinkButton({ label, href }: { label: string; href: string }) {
  const Icon = label.startsWith("Code") ? GitHubIcon : label.startsWith("Demo") ? Play : ExternalLink
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn("btn h-9 px-3 text-sm", label === "Live" ? "btn-solid" : "btn-line")}
    >
      <Icon aria-hidden className="size-4" />
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

/** The project's one measured result: two bars for a before/after, or a big number. */
function Headline({ measure }: { measure: Measure }) {
  if (measure.kind === "single") {
    const [m] = measure.items
    return (
      <p className="mt-5 flex items-baseline gap-3">
        <span className="font-mono text-3xl font-medium whitespace-nowrap text-red tabular">{m.value}</span>
        <span className="text-sm text-muted-foreground">{m.label}</span>
      </p>
    )
  }

  const max = Math.max(measure.before.value, measure.after.value)
  return (
    <figure className="mt-5">
      <figcaption className="text-sm font-medium">{measure.what}</figcaption>
      <div className="mt-3 grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2">
        <BarRow bar={measure.before} max={max} after={false} />
        <BarRow bar={measure.after} max={max} after />
      </div>
    </figure>
  )
}

function BarRow({ bar, max, after }: { bar: Bar; max: number; after: boolean }) {
  const width = Math.max((bar.value / max) * 100, 2)
  return (
    <>
      <span className="truncate text-sm text-muted-foreground">{bar.label}</span>
      <span className="h-2 w-full" aria-hidden>
        <span
          className={cn("block h-full rounded-r-[3px]", after ? "bg-red" : "bg-foreground/25")}
          style={{ width: `${width}%` }}
        />
      </span>
      <span className={cn("text-right font-mono text-base font-medium tabular", !after && "text-muted-foreground")}>
        {bar.display}
      </span>
    </>
  )
}
