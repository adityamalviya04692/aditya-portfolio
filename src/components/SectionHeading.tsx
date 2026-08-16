interface Props { index: string; title: string; kicker?: string }

export default function SectionHeading({ index, title, kicker }: Props) {
  return (
    <div className="mb-12">
      <span className="mono text-[11px] tracking-[0.2em] accent-text">{index} / {kicker ?? title.toUpperCase()}</span>
      <h2 className="chrome-text mt-3 text-3xl font-semibold sm:text-5xl">{title}</h2>
    </div>
  )
}
