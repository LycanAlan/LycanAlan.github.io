import { Section } from "@/components/section"
import { record } from "@/data/profile"

const Post = ({ className }: { className: string }) => (
  <span aria-hidden className={`absolute size-1.5 bg-red ${className}`} />
)

export function Record() {
  const totalSolved = record.solved.reduce((sum, s) => sum + s.count, 0)
  const mostSolved = Math.max(...record.solved.map((s) => s.count))

  return (
    <Section
      id="record"
      title="Record"
      intro="Consistency is the part I'm proudest of. One good semester can be luck. Six is a habit."
    >
      <div className="grid gap-x-12 gap-y-16 md:grid-cols-12">
        <div className="md:col-span-12">
          <h3 className="wide text-2xl font-bold tracking-tight sm:text-3xl">
            Ranked 1st of {record.classSize}, every semester so far
          </h3>
          <ol className="mt-8 grid grid-cols-3 sm:grid-cols-6">
            {Array.from({ length: record.semesters }, (_, i) => (
              <li key={i} className="relative -mt-[2px] -ml-[2px] border-2 border-foreground px-3 py-5 sm:px-4">
                <Post className="-top-1 -left-1" />
                <Post className="-top-1 -right-1" />
                <Post className="-bottom-1 -left-1" />
                <Post className="-right-1 -bottom-1" />
                <span className="block font-mono text-xs whitespace-nowrap text-muted-foreground">Semester {i + 1}</span>
                <span className="wide mt-2 block text-3xl font-extrabold tracking-tight">
                  1st<span className="sr-only"> of {record.classSize}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-muted-foreground">
            {record.degree}, {record.school}. CGPA{" "}
            <span className="font-mono text-foreground tabular">{record.cgpa}</span>, graduating{" "}
            {record.graduating}.
          </p>
        </div>

        <div className="md:col-span-5">
          <h3 className="wide text-xl font-bold tracking-tight">National Micromouse wins</h3>
          <ul className="mt-5 border-t">
            {record.wins.map((w) => (
              <li key={w.event} className="flex items-baseline gap-4 border-b py-4">
                <span className="font-mono text-sm font-semibold text-red">1st</span>
                <span className="font-medium">{w.event}</span>
                <span className="ml-auto text-sm text-muted-foreground">{w.host}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-7">
          <h3 className="wide text-xl font-bold tracking-tight">
            <span className="font-mono tabular">{totalSolved.toLocaleString("en-IN")}</span> problems solved
          </h3>
          <dl className="mt-5 grid grid-cols-[6.5rem_minmax(0,1fr)_3rem] items-center gap-x-4 gap-y-4 border-t pt-5">
            {record.solved.map((s) => (
              <div key={s.site} className="contents">
                <dt className="text-sm text-muted-foreground">{s.site}</dt>
                <dd aria-hidden className="h-2.5">
                  <span
                    className="block h-full rounded-r-[4px] bg-foreground/80"
                    style={{ width: `${(s.count / mostSolved) * 100}%` }}
                  />
                </dd>
                <dd className="text-right font-mono text-sm tabular">{s.count}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}
