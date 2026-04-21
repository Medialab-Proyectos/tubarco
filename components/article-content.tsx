'use client'

import Link from 'next/link'
import { ChevronLeft, Tag } from 'lucide-react'
import { ArticleReactions } from './article-reactions'
import { NewsCard } from './news-card'
import type { Article } from '@/lib/types'

interface ArticleContentProps {
  article: Article
  categoryLabel: string
  publishedDate: string
  contentParagraphs: string[]
  related: Article[]
}

export function ArticleContent({
  article,
  categoryLabel,
  publishedDate,
  contentParagraphs,
  related,
}: ArticleContentProps) {
  return (
    <main className="min-h-screen bg-background">
      <article className="max-w-3xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
          <Link href="/" className="hover:text-accent transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <Link
            href={`/categoria/${article.category}`}
            className="hover:text-accent transition-colors"
          >
            {categoryLabel}
          </Link>
        </nav>

        {/* Category label */}
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent mb-3">
          {categoryLabel}
        </span>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-serif font-black text-foreground leading-tight text-balance mb-4">
          {article.title}
        </h1>

        {/* Excerpt */}
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5 text-pretty font-light">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-y border-border py-4 mb-6">
          <span className="font-medium text-foreground">{article.author}</span>
          <span>{publishedDate}</span>
          <span className="flex items-center gap-1">
            {article.readTime} min de lectura
          </span>
        </div>

        {/* Article content */}
        <div className="prose prose-neutral max-w-none">
          {contentParagraphs.map((para, i) => (
            <div key={i}>
              <div
                className="text-foreground leading-relaxed text-base md:text-lg [&_p]:mb-5"
                dangerouslySetInnerHTML={{ __html: para }}
              />
            </div>
          ))}
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Tag size={14} className="text-muted-foreground" />
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/buscar?q=${encodeURIComponent(tag)}`}
                className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Reactions & share */}
        <div className="mt-8">
          <ArticleReactions
            slug={article.slug}
            initialLikes={article.likes}
            initialDislikes={article.dislikes}
            title={article.title}
          />
        </div>

        {/* Back link */}
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            <ChevronLeft size={14} />
            Volver al inicio
          </Link>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="border-t border-border py-10">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-lg font-serif font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-accent rounded-full inline-block" />
              También te puede interesar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((r) => (
                <NewsCard key={r.id} article={r} variant="default" />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
