import { ArrowUpRight } from "lucide-react"

import { RatingChart } from "@/components/rating-chart"
import { Section } from "@/components/section"
import { profiles } from "@/data/profile"

export function Profiles() {
  return (
    <Section
      id="profiles"
      title="Competitive programming"
      intro="Contests are where I practise thinking fast and being exactly right under a clock."
    >
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-7">
          <RatingChart />
        </div>

        <ul className="border-t lg:col-span-5">
          {profiles.map((p) => (
            <li key={p.site} className="border-b">
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 py-5"
              >
                <span>
                  <span className="wide block text-lg font-bold tracking-tight">
                    {p.site}
                    <span className="sr-only"> profile (opens in a new tab)</span>
                  </span>
                  <span className="mt-0.5 block font-mono text-xs text-muted-foreground">@{p.handle}</span>
                  <span className="mt-2 block text-sm text-muted-foreground">{p.detail}</span>
                </span>
                <span className="flex items-center gap-3 text-right">
                  {p.rating && (
                    <span>
                      <span className="block font-mono text-xl font-medium tabular">{p.rating}</span>
                      <span className="block text-xs text-muted-foreground">{p.title}</span>
                    </span>
                  )}
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-red"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
