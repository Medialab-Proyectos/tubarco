'use client'

import useSWR from 'swr'
import { NewsCard } from './news-card'
import { SectionHeader } from './section-header'
import type { NewsResponse } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function ViralesSection() {
  const { data, isLoading } = useSWR<NewsResponse>(
    '/api/news?category=virales&perPage=4',
    fetcher,
  )

  if (isLoading || !data || data.articles.length === 0) return null

  return (
    <section className="py-10">
      <div className="max-w-[1400px] mx-auto px-4">
        <SectionHeader title="Virales" subtitle="Lo que más se comparte" href="/categoria/virales" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.articles.map((article) => (
            <NewsCard key={article.id} article={article} variant="default" />
          ))}
        </div>
      </div>
    </section>
  )
}
