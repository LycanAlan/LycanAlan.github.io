import { Approach } from "@/components/approach"
import { Contact } from "@/components/contact"
import { Experience } from "@/components/experience"
import { Hero } from "@/components/hero"
import { Profiles } from "@/components/profiles"
import { Record } from "@/components/record"
import { SiteHeader } from "@/components/site-header"
import { Work } from "@/components/work"

export default function App() {
  return (
    <>
      <a
        href="#work"
        className="sr-only z-50 rounded-md bg-foreground px-3 py-2 text-background focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to work
      </a>
      <SiteHeader />
      <main>
        <Hero />
        <Work />
        <Record />
        <Profiles />
        <Approach />
        <Experience />
      </main>
      <Contact />
    </>
  )
}
