'use client'

import Link from 'next/link'
import Image from 'next/image'
import useSWR from 'swr'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { ArrowRight, Sparkles, Clock, Eye, ThumbsUp } from 'lucide-react'
import type { NewsResponse } from '@/lib/types'
import { categoryName } from '@/lib/mock-data'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function HeroSection() {
  const { data, isLoading } = useSWR<NewsResponse>('/api/news?perPage=7', fetcher)

  if (isLoading || !data) {
    return (
      <section className="py-6">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-7 aspect-[16/9] rounded-xl bg-muted animate-pulse" />
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="aspect-[4/3] rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  const [featured, ...rest] = data.articles
  const gridCards = rest.slice(0, 4)
  const sideList = rest.slice(4, 6)

  return (
    <section className="py-5 md:py-6">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* MSN-Style Grid: 1 big + 4 smaller */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
          {/* Featured article — spans 7 columns */}
          {featured && (
            <Link
              href={`/articulo/${featured.slug}`}
              className="lg:col-span-7 group block relative rounded-xl overflow-hidden bg-muted img-zoom"
              id="hero-featured"
            >
              <div className="relative aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[460px]">
                <Image
                  src={featured.image || '/placeholder.svg'}
                  alt={featured.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                {/* Breaking badge */}
                {featured.breaking && (
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="flex items-center gap-1.5 bg-[oklch(0.62_0.24_22)] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-white pulse-live" />
                      Última hora
                    </span>
                  </div>
                )}

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                  {featured.tags?.[0] && (
                    <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[oklch(0.72_0.14_210)] mb-3">
                      {featured.tags[0]}
                    </span>
                  )}
                  <h1 className="text-xl md:text-2xl lg:text-4xl font-serif font-black text-white leading-[1.12] tracking-tight text-balance">
                    {featured.title}
                  </h1>
                  <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed line-clamp-2 max-w-2xl hidden md:block">
                    {featured.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-white/50 text-xs">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {featured.readTime} min
                    </span>
                    {featured.views && (
                      <span className="flex items-center gap-1">
                        <Eye size={12} />
                        {(featured.views / 1000).toFixed(1)}K
                      </span>
                    )}
                    <span>
                      {format(new Date(featured.publishedAt), "d 'de' MMMM", { locale: es })}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* 4 secondary cards — 2x2 grid in 5 columns */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {gridCards.map((article, idx) => (
              <Link
                key={article.id}
                href={`/articulo/${article.slug}`}
                className="group relative rounded-xl overflow-hidden bg-muted card-lift img-zoom"
                id={`hero-card-${idx}`}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={article.image || '/placeholder.svg'}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                    <span className="inline-block text-[9px] font-bold uppercase tracking-widest text-[oklch(0.72_0.14_210)] mb-1">
                      {categoryName(article.category)}
                    </span>
                    <h3 className="text-xs md:text-sm font-serif font-bold text-white leading-snug line-clamp-3 text-balance">
                      {article.title}
                    </h3>
                    <div className="mt-1.5 flex items-center gap-2 text-white/40 text-[10px]">
                      <span className="flex items-center gap-0.5">
                        <Clock size={9} />
                        {article.readTime}m
                      </span>
                      {article.views && (
                        <span className="flex items-center gap-0.5">
                          <Eye size={9} />
                          {(article.views / 1000).toFixed(0)}K
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
