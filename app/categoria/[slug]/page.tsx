'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import useSWR from 'swr'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { NewsCard } from '@/components/news-card'
import { AdBanner } from '@/components/ad-banner'
import type { NewsResponse } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const CATEGORY_META: Record<string, { title: string; description: string }> = {
  'tubarco-cali': {
    title: 'TUBARCO CALI',
    description: 'Todas las noticias, eventos y sucesos importantes de Cali.',
  },
  'tubarco-colombia': {
    title: 'TUBARCO COLOMBIA',
    description: 'Cobertura nacional de política, economía, sociedad y cultura colombiana.',
  },
  'tubarco-internacional': {
    title: 'TUBARCO INTERNACIONAL',
    description: 'Noticias del mundo: geopolítica, economía global y eventos internacionales.',
  },
  'tubarco-valle': {
    title: 'TUBARCO VALLE',
    description: 'Noticias del Valle del Cauca: Cali, Palmira, Buga y municipios cercanos.',
  },
  reels: {
    title: 'Reels',
    description: 'Videos cortos de actualidad, entretenimiento y contenido viral.',
  },
  virales: {
    title: 'Virales',
    description: 'Lo más compartido en redes sociales: momentos que todos hablan.',
  },
  turismo: {
    title: 'Turismo',
    description: 'Destinos, viajes y experiencias para descubrir en Colombia y el mundo.',
  },
  judicial: {
    title: 'Judicial',
    description: 'Noticias de justicia, crimen, procesos legales y seguridad.',
  },
  internacional: {
    title: 'Internacional',
    description: 'Lo que pasa en el mundo — geopolítica, diplomacia y análisis global.',
  },
  colombia: {
    title: 'Colombia',
    description: 'Las noticias más importantes del país, con cobertura editorial profunda.',
  },
  cali: {
    title: 'Cali',
    description: 'Todo lo que necesitas saber de la sucursal del cielo.',
  },
  tecnologia: {
    title: 'Tecnología',
    description: 'Innovación, IA y ciencia aplicada en Colombia y el mundo.',
  },
  deportes: {
    title: 'Deportes',
    description: 'Fútbol, ciclismo y los deportes que mueven a Colombia.',
  },
  economia: {
    title: 'Economía',
    description: 'Finanzas, mercados, empresas y el pulso económico global.',
  },
  cultura: {
    title: 'Cultura',
    description: 'Arte, música, cine y las expresiones culturales de nuestra región.',
  },
  ciencia: {
    title: 'Ciencia',
    description: 'Investigación, descubrimientos y el avance del conocimiento humano.',
  },
}

const PER_PAGE = 9

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const [page, setPage] = useState(1)

  const { data, isLoading } = useSWR<NewsResponse>(
    `/api/news?category=${slug}&page=${page}&perPage=${PER_PAGE}`,
    fetcher
  )

  const meta = CATEGORY_META[slug] ?? {
    title: slug.charAt(0).toUpperCase() + slug.slice(1),
    description: '',
  }

  const totalPages = data ? Math.ceil(data.total / PER_PAGE) : 1

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Category header */}
        <div className="bg-primary text-primary-foreground py-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-accent rounded-full" />
              <h1 className="text-3xl md:text-4xl font-serif font-black">{meta.title}</h1>
            </div>
            {meta.description && (
              <p className="text-primary-foreground/70 text-sm ml-4 mt-1 max-w-xl">
                {meta.description}
              </p>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* Loading state */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(9)].map((_, i) => (
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

          {/* Articles grid */}
          {!isLoading && data && data.articles.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.articles.map((article, idx) => (
                  <div key={article.id}>
                    <NewsCard article={article} variant="default" />
                    {/* Inject ad after 6th article */}
                    {idx === 5 && (
                      <div className="col-span-full mt-4">
                        {/* Ad injected inline — handled in the grid below */}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Ad banner */}
              <div className="my-8">
                <AdBanner />
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 text-sm rounded-full border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Anterior
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={
                        p === page
                          ? 'px-4 py-2 text-sm rounded-full bg-primary text-primary-foreground font-semibold'
                          : 'px-4 py-2 text-sm rounded-full border border-border hover:bg-muted transition-colors'
                      }
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 text-sm rounded-full border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </>
          )}

          {/* Empty state */}
          {!isLoading && data && data.articles.length === 0 && (
            <div className="text-center py-24">
              <h2 className="text-xl font-serif font-bold text-foreground mb-2">
                Sin artículos en esta categoría
              </h2>
              <p className="text-sm text-muted-foreground">Vuelve pronto para más noticias.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
