'use client'

import Link from 'next/link'
import Image from 'next/image'
import useSWR from 'swr'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { MapPin } from 'lucide-react'
import { SectionHeader } from './section-header'
import type { NewsResponse } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function TurismoSection() {
  const { data, isLoading } = useSWR<NewsResponse>(
    '/api/news?category=turismo&perPage=4',
    fetcher,
  )

  if (isLoading || !data || data.articles.length === 0) return null

  const [featured, ...rest] = data.articles

  return (
    <section className="py-10 bg-gradient-to-b from-secondary/60 to-background">
      <div className="max-w-[1400px] mx-auto px-4">
        <SectionHeader title="Turismo" href="/categoria/turismo" ctaLabel="Cargar más" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Hero travel card */}
          {featured && (
            <Link
              href={`/articulo/${featured.slug}`}
              className="group lg:col-span-7 relative block aspect-[16/9] rounded-xl overflow-hidden bg-muted img-zoom"
            >
              <Image
                src={featured.image || '/placeholder.svg'}
                alt={featured.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-[oklch(0.72_0.14_210)] text-white px-2.5 py-1 rounded-md mb-3">
                  <MapPin size={10} />
                  {featured.city}
                </span>
                <h3 className="text-lg md:text-2xl font-serif font-bold text-white leading-tight text-balance">
                  {featured.title}
                </h3>
                <p className="mt-2 text-xs text-white/60">
                  {format(new Date(featured.publishedAt), 'dd/MM/yyyy', { locale: es })}
                </p>
              </div>
            </Link>
          )}

          {/* Secondary travel cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {rest.slice(0, 3).map((article) => (
              <Link
                key={article.id}
                href={`/articulo/${article.slug}`}
                className="group flex gap-4 items-start p-3 rounded-xl hover:bg-muted/60 transition-colors"
              >
                <div className="relative w-28 h-20 shrink-0 rounded-lg overflow-hidden bg-muted img-zoom">
                  <Image
                    src={article.image || '/placeholder.svg'}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[oklch(0.72_0.14_210)]">
                    <MapPin size={10} />
                    {article.city}
                  </span>
                  <h4 className="mt-1 text-sm font-semibold text-foreground leading-snug text-balance line-clamp-2 group-hover:text-[oklch(0.72_0.14_210)] transition-colors">
                    {article.title}
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {format(new Date(article.publishedAt), 'dd/MM/yyyy', { locale: es })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
