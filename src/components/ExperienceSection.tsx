import { usePortfolio } from '../hooks/usePortfolio'
import SectionHeading from './SectionHeading'

export default function ExperienceSection() {
  const { experience } = usePortfolio()

  return (
    <section id="experience" className="relative z-10 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="02" title="Production work, at scale" kicker="EXPERIENCE" />

        {experience.map((job) => (
          <div key={job.company} className="card p-7 sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-6">
              <div>
                <h3 className="text-xl font-medium text-neutral-100 sm:text-2xl">{job.role}</h3>
                <p className="mt-1.5 text-sm text-neutral-400">{job.company}</p>
                <p className="mono mt-1 text-[11px] text-neutral-600">{job.account} · {job.location}</p>
              </div>
              <span className="pill mono whitespace-nowrap px-3.5 py-1.5 text-[11px] text-neutral-400">
                {job.period}
              </span>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-neutral-400">{job.summary}</p>

            <div className="mt-9 space-y-10">
              {job.projects.map((proj, i) => (
                <div key={proj.name}>
                  <div className="mb-4 flex items-baseline gap-4">
                    <span className="chrome-text text-3xl font-semibold leading-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h4 className="text-base font-medium text-neutral-200">{proj.name}</h4>
                      <span className="mono text-[11px] text-neutral-600">{proj.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 border-l border-line pl-5">
                    {proj.highlights.map((h, hi) => (
                      <li key={hi} className="text-sm leading-relaxed text-neutral-400">{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
