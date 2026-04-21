'use client'

import useSWR from 'swr'
import { NewsCard } from './news-card'
import { SectionHeader } from './section-header'
import type { NewsResponse } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function ColombiaSection() {
  const { data, isLoading } = useSWR<NewsResponse>(
    '/api/news?category=tubarco-colombia&perPage=4',
    fetcher,
  )

  if (isLoading || !data || data.articles.length === 0) return null

  const [featured, ...rest] = data.articles

  return (
    <section className="py-10">
      <div className="max-w-[1400px] mx-auto px-4">
        <SectionHeader title="Colombia" href="/categoria/tubarco-colombia" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Featured Colombia */}
          <div className="lg:col-span-5">
            <NewsCard article={featured} variant="featured" />
          </div>
          {/* Grid of smaller cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {rest.slice(0, 3).map((article) => (
              <NewsCard key={article.id} article={article} variant="default" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
