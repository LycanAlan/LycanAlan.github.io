import { Section } from "@/components/section"
import { experience } from "@/data/profile"

export function Experience() {
  return (
    <Section id="experience" title="Experience and leadership">
      <ul className="grid gap-5 md:grid-cols-2">
        {experience.map((e) => (
          <li key={e.role} className="rounded-xl border border-foreground/15 p-6 sm:p-7">
            <p className="font-mono text-xs text-red">{e.when}</p>
            <h3 className="wide mt-3 text-lg font-bold tracking-tight">{e.role}</h3>
            <p className="text-sm text-muted-foreground">{e.org}</p>
            <p className="mt-4 text-muted-foreground">{e.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
