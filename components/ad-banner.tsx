'use client'

import useSWR from 'swr'
import type { Ad } from '@/lib/types'
import { ExternalLink, X } from 'lucide-react'
import { useState } from 'react'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function AdBanner() {
  const { data } = useSWR<{ ad: Ad }>('/api/ads', fetcher)
  const [dismissed, setDismissed] = useState(false)

  if (!data || dismissed) return null

  const { ad } = data

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-4">
      <div className="relative w-full bg-gradient-to-r from-[oklch(0.965_0.006_260)] to-[oklch(0.96_0.01_210)] border border-border/50 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
        {/* Dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          aria-label="Cerrar anuncio"
        >
          <X size={14} />
        </button>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 border border-border/60 px-2 py-0.5 rounded-full">
              Patrocinado
            </span>
            <span className="text-[10px] text-muted-foreground/60">{ad.sponsor}</span>
          </div>
          <p className="text-sm font-semibold text-foreground">{ad.title}</p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed max-w-xl">{ad.description}</p>
        </div>
        <a
          href={ad.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="shrink-0 inline-flex items-center gap-1.5 bg-[oklch(0.72_0.14_210)] hover:bg-[oklch(0.65_0.14_210)] text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          {ad.cta}
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  )
}
