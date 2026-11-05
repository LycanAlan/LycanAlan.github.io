import { Section } from "@/components/section"
import { experience } from "@/data/profile"

export function Experience() {
  return (
    <Section id="experience" title="Experience and leadership">
      <ul className="border-t">
        {experience.map((e) => (
          <li key={e.role} className="grid gap-3 border-b py-8 md:grid-cols-12 md:gap-10">
            <p className="font-mono text-xs text-muted-foreground md:col-span-3 md:pt-1.5">{e.when}</p>
            <div className="md:col-span-9">
              <h3 className="wide text-lg font-bold tracking-tight">{e.role}</h3>
              <p className="text-sm text-muted-foreground">{e.org}</p>
              <p className="mt-3 max-w-[62ch]">{e.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
