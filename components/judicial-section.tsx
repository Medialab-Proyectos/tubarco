'use client'

import Link from 'next/link'
import Image from 'next/image'
import useSWR from 'swr'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Scale } from 'lucide-react'
import { SectionHeader } from './section-header'
import type { NewsResponse } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function JudicialSection() {
  const { data, isLoading } = useSWR<NewsResponse>(
    '/api/news?category=judicial&perPage=5',
    fetcher,
  )

  if (isLoading || !data || data.articles.length === 0) return null

  const [featured, ...rest] = data.articles

  return (
    <section className="py-10">
      <div className="max-w-[1400px] mx-auto px-4">
        <SectionHeader title="Judicial" href="/categoria/judicial" ctaLabel="Cargar más" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Featured judicial */}
          {featured && (
            <Link
              href={`/articulo/${featured.slug}`}
              className="group lg:col-span-7 block"
            >
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-muted img-zoom">
                <Image
                  src={featured.image || '/placeholder.svg'}
                  alt={featured.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
              <div className="mt-4">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[oklch(0.62_0.24_22)]">
                  <Scale size={11} />
                  Judicial · {featured.city}
                </span>
                <h3 className="mt-2 text-xl md:text-2xl font-serif font-bold text-foreground leading-tight text-balance group-hover:text-[oklch(0.72_0.14_210)] transition-colors">
                  {featured.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {featured.excerpt}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {format(new Date(featured.publishedAt), "d 'de' MMMM, yyyy", { locale: es })}
                </p>
              </div>
            </Link>
          )}

          {/* List of judicial items */}
          <div className="lg:col-span-5 bg-card border border-border/60 rounded-xl p-5">
            <div className="flex flex-col divide-y divide-border/60">
              {rest.slice(0, 4).map((article) => (
                <Link
                  key={article.id}
                  href={`/articulo/${article.slug}`}
                  className="group py-3.5 first:pt-0 last:pb-0"
                >
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[oklch(0.62_0.24_22)] mb-1">
                    {article.city}
                  </span>
                  <h4 className="text-sm font-semibold text-foreground leading-snug text-balance line-clamp-2 group-hover:text-[oklch(0.72_0.14_210)] transition-colors">
                    {article.title}
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {format(new Date(article.publishedAt), 'dd/MM/yyyy', { locale: es })}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
