import { Check, Copy } from "lucide-react"
import { useState } from "react"

import { CHECKED_ON, links, person } from "@/data/profile"

const ELSEWHERE = [
  { label: "LinkedIn", href: links.linkedin },
  { label: "GitHub", href: links.github },
  { label: "Codeforces", href: links.codeforces },
  { label: "LeetCode", href: links.leetcode },
  { label: "CodeChef", href: links.codechef },
]

export function Contact() {
  const [copied, setCopied] = useState(false)
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${person.email}`
    }
  }

  return (
    <footer id="contact" aria-labelledby="contact-title" className="bg-floor text-floor-ink">
      <div className="container-page py-20 sm:py-28">
        <h2 id="contact-title" className="section-title">
          Contact
        </h2>
        <p className="mt-5 max-w-[48ch] text-floor-muted">
          Email is the fastest way to reach me. Hiring for 2027, or want to talk about
          rate limiters, retrieval or robots? Write in.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4">
          <a
            href={`mailto:${person.email}`}
            className="wide text-[clamp(1.35rem,4.2vw,3rem)] font-bold tracking-tight break-all underline decoration-red decoration-2 underline-offset-[0.2em] hover:decoration-floor-ink sm:break-normal"
          >
            {person.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="btn btn-line h-10 px-3.5 text-sm"
          >
            {copied ? <Check aria-hidden className="size-4 text-red" /> : <Copy aria-hidden className="size-4" />}
            <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
          </button>
        </div>

        <ul className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-floor-line pt-6">
          {ELSEWHERE.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noreferrer" className="text-floor-muted transition-colors hover:text-floor-ink">
                {l.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
          <li>
            <a href={person.resume} download className="text-floor-muted transition-colors hover:text-floor-ink">
              Résumé (PDF)
            </a>
          </li>
        </ul>

        <div className="mt-16 flex flex-col gap-2 font-mono text-xs text-floor-muted sm:flex-row sm:justify-between">
          <p>{person.location}</p>
          <p>
            Ratings checked {CHECKED_ON} ·{" "}
            <a href={links.source} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-floor-ink">
              Site source
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
