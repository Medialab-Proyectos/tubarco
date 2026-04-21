'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { Clock } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { NewsCard } from '@/components/news-card'
import type { NewsResponse } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then((r) => r.json())
const PER_PAGE = 12

export default function RecientesPage() {
  const [page, setPage] = useState(1)

  const { data, isLoading } = useSWR<NewsResponse>(
    `/api/news?page=${page}&perPage=${PER_PAGE}`,
    fetcher
  )

  const totalPages = data ? Math.ceil(data.total / PER_PAGE) : 1

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="bg-primary text-primary-foreground py-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-3">
              <Clock size={28} />
              <h1 className="text-3xl font-serif font-black">Últimas noticias</h1>
            </div>
            <p className="text-primary-foreground/70 text-sm mt-2 ml-10">
              Archivo de las noticias más recientes — últimas 24 horas y más
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10">
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(PER_PAGE)].map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden border border-border">
                  <div className="aspect-video bg-muted animate-pulse" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-muted animate-pulse rounded w-1/3" />
                    <div className="h-4 bg-muted animate-pulse rounded" />
                    <div className="h-4 bg-muted animate-pulse rounded w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && data && (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                {data.total} artículos encontrados
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.articles.map((article) => (
                  <NewsCard key={article.id} article={article} variant="default" />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 text-sm rounded-full border border-border hover:bg-muted disabled:opacity-40 transition-colors"
                  >
                    Anterior
                  </button>
                  <span className="text-sm text-muted-foreground">
                    Página {page} de {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 text-sm rounded-full border border-border hover:bg-muted disabled:opacity-40 transition-colors"
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
