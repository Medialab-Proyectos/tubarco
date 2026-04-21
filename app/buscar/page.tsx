'use client'

import { Suspense, useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search as SearchIcon, X } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { NewsCard } from '@/components/news-card'
import type { Article, NewsResponse } from '@/lib/types'

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQ = searchParams.get('q') ?? ''

  const [query, setQuery] = useState(initialQ)
  const [results, setResults] = useState<Article[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const debouncedQuery = useDebounce(query, 350)

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([])
      setTotal(0)
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/news?search=${encodeURIComponent(q)}&perPage=20`)
      const data: NewsResponse = await res.json()
      setResults(data.articles)
      setTotal(data.total)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    doSearch(debouncedQuery)
    if (debouncedQuery) {
      router.replace(`/buscar?q=${encodeURIComponent(debouncedQuery)}`, { scroll: false })
    } else {
      router.replace('/buscar', { scroll: false })
    }
  }, [debouncedQuery, doSearch, router])

  return (
    <>
      {/* Search input */}
      <div className="relative mb-8">
        <SearchIcon
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar noticias, temas, autores..."
          autoFocus
          className="w-full pl-12 pr-12 py-4 text-lg border border-border rounded-2xl bg-card text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Limpiar búsqueda"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Results header */}
      {debouncedQuery && (
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {loading
              ? 'Buscando...'
              : total > 0
              ? `${total} resultado${total !== 1 ? 's' : ''} para "${debouncedQuery}"`
              : `Sin resultados para "${debouncedQuery}"`}
          </p>
        </div>
      )}

      {/* Loading skeletons */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
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

      {/* Results grid */}
      {!loading && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((article) => (
            <NewsCard key={article.id} article={article} variant="default" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && debouncedQuery && results.length === 0 && (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🔍</p>
          <h2 className="text-xl font-serif font-bold text-foreground mb-2">
            Sin resultados
          </h2>
          <p className="text-muted-foreground text-sm">
            Intenta con otras palabras clave o explora nuestras categorías.
          </p>
        </div>
      )}

      {/* Default state (no query) */}
      {!debouncedQuery && !loading && (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📰</p>
          <h2 className="text-xl font-serif font-bold text-foreground mb-2">
            ¿Qué quieres leer hoy?
          </h2>
          <p className="text-muted-foreground text-sm">
            Escribe una palabra clave para encontrar noticias.
          </p>
        </div>
      )}
    </>
  )
}

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Cargando búsqueda...</div>}>
            <SearchContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
