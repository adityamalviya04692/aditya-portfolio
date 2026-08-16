import { usePortfolio } from '../hooks/usePortfolio'

/**
 * Guide note: "If you don't have real ones yet, leave the array empty rather than
 * filling with obviously-fake quotes. Fake testimonials are detected instantly and
 * damage credibility." This section renders nothing until real quotes exist.
 */
export default function TestimonialsSection() {
  const { testimonials } = usePortfolio()
  if (testimonials.length === 0) return null

  const loop = [...testimonials, ...testimonials]

  return (
    <section id="testimonials" className="relative z-10 overflow-hidden py-24">
      <div className="mx-auto mb-11 max-w-6xl px-5 sm:px-8">
        <span className="mono text-[11px] tracking-[0.2em] accent-text">06 / TESTIMONIALS</span>
        <h2 className="chrome-text mt-3 text-3xl font-semibold sm:text-4xl">What people say</h2>
      </div>
      <div className="marquee flex gap-5">
        {loop.map((t, i) => (
          <div key={`${t.id}-${i}`} className="card w-[340px] shrink-0 p-7">
            <p className="text-sm italic leading-relaxed text-neutral-300">"{t.quote}"</p>
            <div className="mt-6 flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium text-white"
                style={{ background: t.avatarColor }}
              >
                {t.name.charAt(0)}
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-neutral-200">{t.name}</div>
                <div className="text-[11px] text-neutral-500">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
