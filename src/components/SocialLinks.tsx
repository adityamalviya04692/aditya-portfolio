import { Linkedin, Github, Mail, Phone, Briefcase, Globe } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'

interface Props { compact?: boolean }

export default function SocialLinks({ compact = false }: Props) {
  const { profile } = usePortfolio()
  const s = profile.social

  // Guide requirement: hide empty social links rather than render dead anchors
  const links = [
    { href: s.linkedin, label: 'LinkedIn', Icon: Linkedin },
    { href: s.github, label: 'GitHub', Icon: Github },
    { href: s.naukri, label: 'Naukri', Icon: Briefcase },
    { href: s.website, label: 'Moriveda', Icon: Globe },
    { href: s.email ? `mailto:${s.email}` : '', label: 'Email', Icon: Mail },
    { href: s.phone ? `tel:${s.phone.replace(/\s/g, '')}` : '', label: 'Phone', Icon: Phone },
  ].filter((l) => l.href)

  return (
    <div className={`flex flex-wrap items-center ${compact ? 'gap-2' : 'gap-2.5'}`}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noreferrer' : undefined}
          aria-label={label}
          className="pill group flex items-center gap-2 px-3.5 py-2 text-sm text-neutral-400 transition-colors hover:border-neutral-600 hover:text-white"
        >
          <Icon size={15} className="shrink-0" />
          {!compact && <span>{label}</span>}
        </a>
      ))}
    </div>
  )
}
