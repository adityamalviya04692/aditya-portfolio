import { usePortfolio } from '../hooks/usePortfolio'
import SectionHeading from './SectionHeading'
import ProjectCard from './ProjectCard'

export default function ProjectsSection() {
  const { projects } = usePortfolio()
  // highlight:true pinned first, per the guide
  const ordered = [...projects].sort((a, b) => Number(b.highlight) - Number(a.highlight))

  return (
    <section id="projects" className="relative z-10 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="05" title="Selected work" kicker="PROJECTS" />
        <div className="grid gap-5 lg:grid-cols-2">
          {ordered.map((p) => (
            <div key={p.id} className={p.highlight && p.id === ordered[0].id ? 'lg:col-span-2' : ''}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
