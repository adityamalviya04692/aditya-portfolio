import { useEffect, useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { usePortfolio, asset } from '../hooks/usePortfolio'

const NAV = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'contact', label: 'CONTACT' },
]

export default function Navbar() {
  const { profile } = usePortfolio()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-line bg-ink/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#home" className="mono text-sm tracking-tight text-neutral-300 hover:text-white">
          {profile.shortName.toLowerCase()}<span className="accent-text">.</span>malviya
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="mono text-[11px] tracking-[0.15em] text-neutral-500 transition-colors hover:text-white">
              {n.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={asset(profile.resume)}
            download
            className="hidden items-center gap-2 rounded-full accent-bg px-4 py-2 text-xs font-medium text-white sm:inline-flex"
          >
            <Download size={14} /> Resume
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="pill p-2 text-neutral-300 md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-ink px-5 pb-5 md:hidden">
          <div className="flex flex-col gap-1 pt-3">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="mono py-2 text-xs tracking-[0.15em] text-neutral-400 hover:text-white"
              >
                {n.label}
              </a>
            ))}
            <a
              href={asset(profile.resume)}
              download
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full accent-bg px-4 py-2.5 text-sm font-medium text-white"
            >
              <Download size={15} /> Download Resume
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
