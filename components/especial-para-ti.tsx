'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, ArrowRight, Clock } from 'lucide-react'
import { MOCK_ARTICLES } from '@/lib/mock-data'

export function EspecialParaTi() {
  const especiales = MOCK_ARTICLES.filter(
    (a) => a.category === 'especiales' || a.secondaryCategories?.includes('especiales'),
  ).slice(0, 3)

  if (especiales.length === 0) return null

  return (
    <section className="py-12 bg-gradient-to-br from-[oklch(0.22_0.06_260)] via-[oklch(0.18_0.05_260)] to-[oklch(0.20_0.07_250)]">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[oklch(0.78_0.14_80)] mb-2">
              <Sparkles size={12} />
              TUBARCO Especiales
            </span>
            <h2 className="text-2xl md:text-3xl font-sans font-black text-white tracking-tight">
              Especial para ti
            </h2>
          </div>
          <Link
            href="/articulo/narcocensura-mexico-periodistas-democracia"
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[oklch(0.72_0.14_210)] hover:text-white transition-colors"
          >
            Ver todos
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {especiales.map((article, idx) => (
            <Link
              key={article.id}
              href={`/articulo/${article.slug}`}
              className={`group block ${idx === 0 ? 'md:col-span-7' : 'md:col-span-5'} ${idx === 2 ? 'md:col-span-12' : ''}`}
            >
              {idx === 2 ? (
                // Third: horizontal layout
                <div className="flex flex-col md:flex-row gap-5 md:gap-8 bg-white/5 rounded-xl p-4 md:p-5 hover:bg-white/8 transition-colors">
                  <div className="relative md:w-2/5 aspect-[16/9] md:aspect-auto rounded-lg overflow-hidden img-zoom shrink-0">
                    <Image
                      src={article.image || '/placeholder.svg'}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="40vw"
                    />
                  </div>
                  <div className="flex flex-col justify-center py-2">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[oklch(0.78_0.14_80)]">
                      {article.readTime} min · Especial
                    </span>
                    <h3 className="mt-2 text-lg md:text-xl font-serif font-bold text-white leading-tight text-balance group-hover:text-[oklch(0.72_0.14_210)] transition-colors">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/60 leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                    <p className="mt-3 text-xs text-white/40">{article.author}</p>
                  </div>
                </div>
              ) : (
                // First two: image + overlay
                <div className="relative rounded-xl overflow-hidden img-zoom">
                  <div className={`relative ${idx === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                    <Image
                      src={article.image || '/placeholder.svg'}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes={idx === 0 ? '60vw' : '40vw'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[oklch(0.78_0.14_80)]">
                        {article.readTime} min · Especial
                      </span>
                      <h3 className={`mt-2 font-serif font-bold text-white leading-tight text-balance group-hover:text-[oklch(0.72_0.14_210)] transition-colors ${
                        idx === 0 ? 'text-xl md:text-2xl' : 'text-base md:text-lg'
                      }`}>
                        {article.title}
                      </h3>
                      {idx === 0 && (
                        <p className="mt-2 text-sm text-white/60 leading-relaxed line-clamp-2 hidden md:block">
                          {article.excerpt}
                        </p>
                      )}
                      <p className="mt-2 text-xs text-white/40">{article.author}</p>
                    </div>
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
