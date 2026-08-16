import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../types/portfolio'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card card-hover flex flex-col p-7 sm:p-9">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="mono text-[11px] tracking-[0.18em] accent-text">
            // {project.category.toUpperCase()}
          </span>
          <h3 className="mt-3 text-xl font-medium text-neutral-100 sm:text-2xl">{project.title}</h3>
          <p className="mt-1.5 text-sm text-neutral-500">{project.subtitle}</p>
        </div>
        <span className="pill mono shrink-0 whitespace-nowrap px-3 py-1.5 text-[11px] text-neutral-500">
          {project.year}
        </span>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-neutral-400">{project.description}</p>

      {project.metrics.length > 0 && (
        <div className="mt-7 flex flex-wrap gap-x-10 gap-y-5 border-t border-line pt-6">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <div className="chrome-text text-2xl font-semibold">{m.value}</div>
              <div className="mt-0.5 text-[11px] text-neutral-500">{m.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-7 flex flex-wrap gap-2">
        {project.stack.map((t) => (
          <span key={t} className="pill px-3 py-1.5 text-[11px] text-neutral-500">{t}</span>
        ))}
      </div>

      {/* Guide requirement: hide the link button entirely when there is no URL */}
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="pill mt-7 inline-flex w-fit items-center gap-2 px-4 py-2.5 text-sm text-neutral-200 hover:text-white"
        >
          Visit live project <ArrowUpRight size={15} />
        </a>
      )}
    </article>
  )
}
