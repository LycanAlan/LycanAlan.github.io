import { Section } from "@/components/section"
import { person, principles, timeline, toolbox } from "@/data/profile"

export function Approach() {
  return (
    <Section id="approach" title="How I work">
      <div className="grid gap-16 md:grid-cols-12 md:gap-12">
        <div className="space-y-10 md:col-span-6">
          {principles.map((p) => (
            <div key={p.title}>
              <h3 className="wide text-xl font-bold tracking-tight">{p.title}</h3>
              <p className="mt-3 max-w-[50ch] text-muted-foreground">{p.body}</p>
            </div>
          ))}
          <div>
            <h3 className="wide text-xl font-bold tracking-tight">Learn fast, then ship</h3>
            <p className="mt-3 max-w-[50ch] text-muted-foreground">
              Embedded C++ to retrieval to distributed systems in under two years.
              Each new field ended in something running, with numbers attached.
            </p>
          </div>
        </div>

        <ol className="relative self-start md:col-span-6 md:pt-1" aria-label="What I learned, and when">
          <span aria-hidden className="absolute top-2 bottom-2 left-[0.1875rem] w-0.5 bg-foreground/15" />
          {timeline.map((t) => (
            <li key={t.when + t.what} className="relative grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-4 pb-6 pl-7 last:pb-0">
              <span aria-hidden className="absolute top-[0.45rem] left-0 size-2 bg-red" />
              <span className="pt-0.5 font-mono text-xs text-muted-foreground">{t.when}</span>
              <span className="text-[0.95rem]">{t.what}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-20 border-t pt-12 sm:mt-24">
        <h3 className="wide text-xl font-bold tracking-tight">What I'm looking for</h3>
        <p className="wide mt-5 max-w-[34ch] text-[clamp(1.4rem,2.6vw,2rem)] leading-snug font-semibold tracking-tight text-balance">
          I want to build the systems other teams depend on, where nobody notices the work
          when it's done right.
        </p>
        <p className="mt-5 max-w-[62ch] text-muted-foreground">
          Backends, platforms and infrastructure, where correctness and latency both matter
          and I can measure the difference. I'm looking for a team that lets me go deep. I'll
          pick up whatever stack it runs on. {person.availability}
        </p>

        <dl className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {toolbox.map((t) => (
            <div key={t.area} className="border-t pt-3">
              <dt className="font-mono text-xs text-muted-foreground">{t.area}</dt>
              <dd className="mt-1.5 text-[0.95rem]">{t.items}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
