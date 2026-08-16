import { usePortfolio } from '../hooks/usePortfolio'
import SectionHeading from './SectionHeading'

export default function SkillsSection() {
  const { skills, capabilities } = usePortfolio()

  return (
    <section id="skills" className="relative z-10 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="03" title="What I work with" kicker="SKILLS" />

        <div className="grid gap-5 sm:grid-cols-2">
          {skills.categories.map((cat) => (
            <div key={cat.name} className="card card-hover p-7">
              <h3 className="mb-5 text-sm font-medium tracking-wide text-neutral-200">{cat.name}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((s) => (
                  <span key={s} className="pill px-3 py-1.5 text-xs text-neutral-400">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Capabilities — numbered rows, same design language as Experience */}
        <div className="mt-20">
          <span className="mono text-[11px] tracking-[0.2em] accent-text">04 / CAPABILITIES</span>
          <h2 className="chrome-text mb-11 mt-3 text-3xl font-semibold sm:text-4xl">How I can help</h2>

          <div className="divide-y divide-line border-y border-line">
            {capabilities.map((cap, i) => (
              <div key={cap.title} className="grid gap-5 py-8 md:grid-cols-[90px_1fr_1.3fr]">
                <span className="chrome-text text-4xl font-semibold leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-base font-medium text-neutral-200">{cap.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">{cap.summary}</p>
                </div>
                <ul className="space-y-2">
                  {cap.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-neutral-400">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-neutral-600" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
