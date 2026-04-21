'use client'

import useSWR from 'swr'
import { Globe } from 'lucide-react'
import { NewsCard } from './news-card'
import { SectionHeader } from './section-header'
import type { NewsResponse } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function InternacionalSection() {
  const { data, isLoading } = useSWR<NewsResponse>(
    '/api/news?category=tubarco-internacional&perPage=5',
    fetcher,
  )

  if (isLoading || !data || data.articles.length === 0) return null

  const [featured, ...rest] = data.articles

  return (
    <section className="py-10 bg-[oklch(0.22_0.06_260)]">
      <div className="max-w-[1400px] mx-auto px-4">
        <SectionHeader
          title="Internacional"
          subtitle="Lo más relevante de América Latina y el mundo"
          href="/categoria/tubarco-internacional"
          accent
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Featured international */}
          <div className="lg:col-span-7">
            <NewsCard article={featured} variant="featured" />
          </div>
          {/* Side list on dark bg */}
          <div className="lg:col-span-5 bg-white/5 rounded-xl p-4">
            <div className="flex flex-col divide-y divide-white/10">
              {rest.slice(0, 4).map((article) => (
                <div key={article.id} className="py-3 first:pt-0 last:pb-0">
                  <NewsCard
                    article={article}
                    variant="compact"
                    className="text-white/90 [&_h3]:text-white/90 [&_h3]:hover:text-[oklch(0.72_0.14_210)] [&_span]:text-white/40 border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
