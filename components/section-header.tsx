import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  href?: string
  className?: string
  ctaLabel?: string
  accent?: boolean
}

export function SectionHeader({
  title,
  subtitle,
  href,
  className,
  ctaLabel = 'Ver más',
  accent = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-end justify-between mb-6 pb-3 section-accent-line',
        className,
      )}
    >
      <div className="pt-2">
        <h2
          className={cn(
            'text-xl md:text-2xl font-sans font-black tracking-tight leading-tight',
            accent ? 'text-white' : 'text-foreground',
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              'text-xs mt-1.5 tracking-wide',
              accent ? 'text-white/60' : 'text-muted-foreground',
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className={cn(
            'flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors shrink-0',
            accent
              ? 'text-[oklch(0.72_0.14_210)] hover:text-white'
              : 'text-[oklch(0.72_0.14_210)] hover:text-[oklch(0.62_0.24_22)]',
          )}
        >
          {ctaLabel}
          <ArrowRight size={13} strokeWidth={2.5} />
        </Link>
      )}
    </div>
  )
}
