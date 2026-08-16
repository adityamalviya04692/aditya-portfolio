import { GraduationCap, BadgeCheck, MapPin, Languages } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'
import SectionHeading from './SectionHeading'

export default function AboutSection() {
  const { profile, certifications, education, languages } = usePortfolio()

  return (
    <section id="about" className="relative z-10 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" title="Engineer behind the pipelines" kicker="ABOUT" />

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="card p-7 sm:p-9">
            <p className="text-[15px] leading-relaxed text-neutral-300">{profile.bio}</p>
            <p className="mt-5 text-[15px] leading-relaxed text-neutral-400">{profile.bioSecondary}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {['Data Engineering', 'Azure', 'PySpark', 'Databricks', 'ETL/ELT'].map((t) => (
                <span key={t} className="pill px-3 py-1.5 text-xs text-neutral-400">{t}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="card p-7">
              <div className="mb-4 flex items-center gap-2 text-neutral-300">
                <BadgeCheck size={17} className="text-purple-400" />
                <h3 className="text-sm font-medium tracking-wide">Certifications</h3>
              </div>
              <ul className="space-y-3.5">
                {certifications.map((c) => (
                  <li key={c.code}>
                    <div className="text-sm text-neutral-200">{c.name}</div>
                    <div className="mono mt-0.5 text-[11px] text-neutral-500">{c.issuer} · {c.code}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-7">
              <div className="mb-4 flex items-center gap-2 text-neutral-300">
                <GraduationCap size={17} className="text-pink-400" />
                <h3 className="text-sm font-medium tracking-wide">Education</h3>
              </div>
              {education.map((e) => (
                <div key={e.degree}>
                  <div className="text-sm text-neutral-200">{e.degree}</div>
                  <div className="mt-0.5 text-xs text-neutral-500">{e.institution}</div>
                  <div className="mono mt-1 text-[11px] text-neutral-600">{e.period} · {e.result}</div>
                </div>
              ))}
            </div>

            <div className="card p-7">
              <div className="mb-3 flex items-center gap-2 text-neutral-300">
                <MapPin size={17} className="text-orange-400" />
                <h3 className="text-sm font-medium tracking-wide">Based in</h3>
              </div>
              <p className="text-sm text-neutral-400">{profile.location}</p>
              <div className="mt-4 flex items-center gap-2 text-neutral-500">
                <Languages size={15} />
                <span className="text-xs">{languages.join(' · ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
