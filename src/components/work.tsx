import { OutLink, Section } from "@/components/section"
import { links, projects, type Bar, type Measure, type Project } from "@/data/profile"
import { cn } from "@/lib/utils"

export function Work() {
  return (
    <Section
      id="work"
      title="Selected work"
      intro="Each project leads with the number I measured, not the stack I used."
    >
      <ol className="border-t">
        {projects.map((p) => (
          <ProjectRow key={p.name} project={p} />
        ))}
      </ol>
      <p className="mt-8 text-muted-foreground">
        More on <OutLink href={links.github}>GitHub</OutLink>, including VoidQA, a
        MERN question-and-answer site with voting and tag search.
      </p>
    </Section>
  )
}

function ProjectRow({ project: p }: { project: Project }) {
  return (
    <li
      id={p.name.toLowerCase().replaceAll(" ", "-")}
      className={cn("grid gap-8 border-b md:grid-cols-12 md:gap-10", p.flagship ? "py-12 md:py-16" : "py-10")}
    >
      <div className="md:col-span-5">
        <p className="font-mono text-xs text-muted-foreground">
          {p.when}
          {p.context && <span> · {p.context}</span>}
        </p>
        <h3 className={cn("wide mt-3 font-bold tracking-tight", p.flagship ? "text-3xl sm:text-[2.125rem]" : "text-2xl")}>
          {p.name}
        </h3>
        <p className="mt-4 max-w-[52ch] text-[0.98rem]">{p.summary}</p>
        <p className="mt-4 font-mono text-xs leading-relaxed text-muted-foreground">
          {p.stack.join(" · ")}
        </p>
        <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem]">
          {p.links.map((l) => (
            <OutLink key={l.href} href={l.href}>
              {l.label}
            </OutLink>
          ))}
        </p>
      </div>

      {(p.measure || p.facts.length > 0) && (
        <div className="md:col-span-7 md:pt-7">
          {p.measure && <MeasureView measure={p.measure} />}
          {p.facts.length > 0 && (
            <ul className={cn("space-y-3 text-[0.95rem] text-muted-foreground", p.measure && "mt-8")}>
              {p.facts.map((f) => (
                <li key={f} className="flex gap-3">
                  <span aria-hidden className="mt-[0.6rem] size-1.5 shrink-0 bg-red" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </li>
  )
}

function MeasureView({ measure }: { measure: Measure }) {
  if (measure.kind === "single") {
    return (
      <dl className="grid gap-6 sm:grid-cols-2">
        {measure.items.map((m) => (
          <div key={m.label} className="border-t-2 border-foreground pt-3">
            <dt className="sr-only">{m.label}</dt>
            <dd className="font-mono text-2xl font-medium tabular">{m.value}</dd>
            <dd className="mt-1 text-sm text-muted-foreground">{m.label}</dd>
          </div>
        ))}
      </dl>
    )
  }

  const max = Math.max(measure.before.value, measure.after.value)
  return (
    <figure className="rounded-xl bg-muted/70 p-5 sm:p-6">
      <figcaption className="text-sm font-medium">{measure.what}</figcaption>
      <div className="mt-5 grid grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 sm:grid-cols-[9.5rem_minmax(0,1fr)_auto]">
        <BarRow bar={measure.before} max={max} tone="before" />
        <BarRow bar={measure.after} max={max} tone="after" />
      </div>
    </figure>
  )
}

function BarRow({ bar, max, tone }: { bar: Bar; max: number; tone: "before" | "after" }) {
  const width = Math.max((bar.value / max) * 100, 1.5)
  return (
    <>
      <span className="text-sm text-muted-foreground">{bar.label}</span>
      <span className="h-2.5 w-full" aria-hidden>
        <span
          className={cn("block h-full rounded-r-[4px]", tone === "after" ? "bg-red" : "bg-foreground/30")}
          style={{ width: `${width}%` }}
        />
      </span>
      <span className="text-right font-mono text-lg font-medium tabular">{bar.display}</span>
    </>
  )
}
