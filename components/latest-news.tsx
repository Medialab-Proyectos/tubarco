'use client'

import Link from 'next/link'
import useSWR from 'swr'
import { NewsCard } from './news-card'
import { SectionHeader } from './section-header'
import type { NewsResponse } from '@/lib/types'
import { Clock } from 'lucide-react'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function LatestNews() {
  const { data, isLoading } = useSWR<NewsResponse>('/api/news?perPage=10', fetcher)

  if (isLoading || !data) return null

  return (
    <section className="py-10">
      <div className="max-w-[1400px] mx-auto px-4">
        <SectionHeader title="Lo último" subtitle="Noticias de las últimas 24 horas" href="/recientes" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.articles.slice(0, 9).map((article) => (
            <NewsCard key={article.id} article={article} variant="default" />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/recientes"
            className="inline-flex items-center gap-2 bg-[oklch(0.22_0.06_260)] hover:bg-[oklch(0.18_0.05_260)] text-white text-sm font-semibold uppercase tracking-wider px-8 py-3.5 rounded-xl transition-colors"
            id="load-more-btn"
          >
            <Clock size={15} />
            Ver más noticias
          </Link>
        </div>
      </div>
    </section>
  )
}
