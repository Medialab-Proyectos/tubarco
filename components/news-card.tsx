import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Bot, Clock, Eye, ThumbsUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Article } from '@/lib/types'
import { categoryName } from '@/lib/mock-data'

interface NewsCardProps {
  article: Article
  variant?: 'default' | 'horizontal' | 'compact' | 'featured'
  className?: string
}

export function NewsCard({ article, variant = 'default', className }: NewsCardProps) {
  const dateLabel = format(new Date(article.publishedAt), "d 'de' MMMM, yyyy", {
    locale: es,
  })
  const dateShort = format(new Date(article.publishedAt), 'dd/MM/yyyy', { locale: es })

  if (variant === 'featured') {
    return (
      <Link
        href={`/articulo/${article.slug}`}
        className={cn(
          'group block relative overflow-hidden rounded-xl bg-card img-zoom',
          className
        )}
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <CategoryBadge category={article.category} light />
            <h2 className="mt-2 text-lg md:text-xl lg:text-2xl font-serif font-bold text-white leading-tight text-balance">
              {article.title}
            </h2>
            <p className="mt-2 text-sm text-white/70 line-clamp-2 hidden md:block leading-relaxed">
              {article.excerpt}
            </p>
            <div className="mt-3 flex items-center gap-3 text-white/50 text-xs">
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {article.readTime} min
              </span>
              {article.views && (
                <span className="flex items-center gap-1">
                  <Eye size={11} />
                  {(article.views / 1000).toFixed(1)}K
                </span>
              )}
              <span>{dateLabel}</span>
              {article.isAI && (
                <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full">
                  <Bot size={10} />
                  IA
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'horizontal') {
    return (
      <Link
        href={`/articulo/${article.slug}`}
        className={cn(
          'group flex gap-4 items-start p-3 rounded-xl hover:bg-muted/60 transition-all card-hover',
          className
        )}
      >
        <div className="relative w-28 h-20 shrink-0 rounded-lg overflow-hidden img-zoom">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            sizes="112px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <CategoryBadge category={article.category} small />
          <h3 className="mt-1 text-sm font-semibold text-foreground line-clamp-2 leading-snug text-balance group-hover:text-[oklch(0.72_0.14_210)] transition-colors">
            {article.title}
          </h3>
          <div className="mt-1.5 flex items-center gap-2.5 text-muted-foreground text-[10px]">
            <span>{dateShort}</span>
            {article.views && (
              <span className="flex items-center gap-0.5">
                <Eye size={9} />
                {(article.views / 1000).toFixed(0)}K
              </span>
            )}
            {article.isAI && (
              <span className="flex items-center gap-0.5">
                <Bot size={10} />
                IA
              </span>
            )}
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link
        href={`/articulo/${article.slug}`}
        className={cn(
          'group flex items-start gap-3 py-3.5 border-b border-border/60 last:border-0 hover:bg-muted/40 px-3 -mx-3 rounded-lg transition-colors',
          className
        )}
      >
        <div className="relative w-20 h-14 shrink-0 rounded-lg overflow-hidden img-zoom">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-snug group-hover:text-[oklch(0.72_0.14_210)] transition-colors">
            {article.title}
          </h3>
          <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
            <span>{dateShort}</span>
            {article.views && (
              <span className="flex items-center gap-0.5">
                <Eye size={9} />
                {(article.views / 1000).toFixed(0)}K
              </span>
            )}
          </div>
        </div>
      </Link>
    )
  }

  // Default card — MSN-style card with hover lift
  return (
    <Link
      href={`/articulo/${article.slug}`}
      className={cn(
        'group block rounded-xl overflow-hidden bg-card border border-border/60 card-lift',
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden img-zoom">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Engagement indicator */}
        {article.views && article.views > 10000 && (
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-[9px] font-semibold px-2 py-1 rounded-md">
            <Eye size={10} />
            {(article.views / 1000).toFixed(0)}K
          </div>
        )}
      </div>
      <div className="p-4">
        <CategoryBadge category={article.category} />
        <h3 className="mt-1.5 text-[15px] font-semibold text-foreground line-clamp-2 leading-snug text-balance group-hover:text-[oklch(0.72_0.14_210)] transition-colors">
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>
        <div className="mt-3 flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock size={10} />
            {article.readTime} min
          </span>
          <span>{dateShort}</span>
          {article.isAI && (
            <span className="flex items-center gap-0.5 bg-muted px-1.5 py-0.5 rounded-full">
              <Bot size={9} />
              IA
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

function CategoryBadge({
  category,
  small = false,
  light = false,
}: {
  category: string
  small?: boolean
  light?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-block font-sans font-bold uppercase tracking-wider',
        small ? 'text-[9px]' : 'text-[10px]',
        light ? 'text-[oklch(0.72_0.14_210)]' : 'text-[oklch(0.72_0.14_210)]',
      )}
    >
      {categoryName(category)}
    </span>
  )
}
