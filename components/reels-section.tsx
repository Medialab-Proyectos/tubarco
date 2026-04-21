'use client'

import Image from 'next/image'
import { Play } from 'lucide-react'
import { SectionHeader } from './section-header'
import { MOCK_REELS } from '@/lib/mock-data'

export function ReelsSection() {
  return (
    <section className="py-10">
      <div className="max-w-[1400px] mx-auto px-4">
        <SectionHeader title="Reels" subtitle="Videos cortos de nuestras redes" href="#" ctaLabel="Ver todos" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MOCK_REELS.map((reel) => (
            <button
              key={reel.id}
              type="button"
              className="group relative aspect-[9/16] rounded-xl overflow-hidden bg-muted card-lift"
            >
              <Image
                src={reel.thumbnail || '/placeholder.svg'}
                alt={reel.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              {/* Play icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-14 h-14 rounded-full bg-[oklch(0.62_0.24_22)]/80 group-hover:bg-[oklch(0.62_0.24_22)] flex items-center justify-center transition-all group-hover:scale-110 shadow-xl">
                  <Play size={22} className="text-white ml-0.5" fill="white" />
                </span>
              </div>
              {/* Duration badge */}
              <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                {reel.duration}
              </span>
              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-sm font-semibold leading-tight line-clamp-2 text-balance text-left">
                  {reel.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
