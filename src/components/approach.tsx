import { Section } from "@/components/section"
import { person, principles, timeline, toolbox } from "@/data/profile"

const HABITS = [
  ...principles,
  {
    title: "Learn fast, then ship",
    body: "Embedded C++ to retrieval to distributed systems in under two years. Each new field ended in something running, with numbers attached.",
  },
]

export function Approach() {
  return (
    <Section id="approach" title="How I work">
      <ol className="grid gap-5 md:grid-cols-3">
        {HABITS.map((h, i) => (
          <li key={h.title} className="rounded-xl border border-foreground/15 p-6 sm:p-7">
            <span className="font-mono text-sm text-red">0{i + 1}</span>
            <h3 className="wide mt-3 text-xl font-bold tracking-tight">{h.title}</h3>
            <p className="mt-3 text-muted-foreground">{h.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-20 grid gap-14 border-t pt-12 sm:mt-24 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          <h3 className="wide text-xl font-bold tracking-tight">What I'm looking for</h3>
          <p className="wide mt-5 max-w-[30ch] text-[clamp(1.4rem,2.6vw,2rem)] leading-snug font-semibold tracking-tight text-balance">
            I want to build the systems other teams depend on, where nobody notices the work
            when it's done right.
          </p>
          <p className="mt-5 max-w-[58ch] text-muted-foreground">
            Backends, platforms and infrastructure, where correctness and latency both matter
            and I can measure the difference. I'm looking for a team that lets me go deep. I'll
            pick up whatever stack it runs on. {person.availability}
          </p>
        </div>

        <ol className="relative self-start md:col-span-5 md:pt-1" aria-label="What I learned, and when">
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

      <dl className="mt-14 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
        {toolbox.map((t) => (
          <div key={t.area}>
            <dt className="font-mono text-xs text-muted-foreground">{t.area}</dt>
            <dd className="mt-2.5 flex flex-wrap gap-1.5">
              {t.items.split(", ").map((item) => (
                <span key={item} className="rounded-sm border border-foreground/20 bg-background px-2 py-1 text-sm">
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
