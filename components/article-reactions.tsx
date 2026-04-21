'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown, Share2, Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ArticleReactionsProps {
  slug: string
  initialLikes: number
  initialDislikes: number
  title: string
}

export function ArticleReactions({
  slug,
  initialLikes,
  initialDislikes,
  title,
}: ArticleReactionsProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [dislikes, setDislikes] = useState(initialDislikes)
  const [reaction, setReaction] = useState<'like' | 'dislike' | null>(null)
  const [copied, setCopied] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)

  const handleLike = () => {
    if (reaction === 'like') {
      setLikes((l) => l - 1)
      setReaction(null)
    } else {
      if (reaction === 'dislike') setDislikes((d) => d - 1)
      setLikes((l) => l + 1)
      setReaction('like')
    }
  }

  const handleDislike = () => {
    if (reaction === 'dislike') {
      setDislikes((d) => d - 1)
      setReaction(null)
    } else {
      if (reaction === 'like') setLikes((l) => l - 1)
      setDislikes((d) => d + 1)
      setReaction('dislike')
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(title + ' — ' + window.location.href)}`,
      '_blank'
    )
  }

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      '_blank'
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-3 py-5 border-y border-border">
      {/* Reactions */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleLike}
          className={cn(
            'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-colors',
            reaction === 'like'
              ? 'bg-primary text-primary-foreground border-primary'
              : 'border-border text-foreground hover:bg-muted'
          )}
        >
          <ThumbsUp size={15} />
          <span>{likes.toLocaleString()}</span>
        </button>
        <button
          onClick={handleDislike}
          className={cn(
            'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-colors',
            reaction === 'dislike'
              ? 'bg-muted-foreground/20 border-muted-foreground text-foreground'
              : 'border-border text-foreground hover:bg-muted'
          )}
        >
          <ThumbsDown size={15} />
          <span>{dislikes.toLocaleString()}</span>
        </button>
      </div>

      {/* Share */}
      <div className="relative ml-auto">
        <button
          onClick={() => setShareOpen(!shareOpen)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <Share2 size={15} />
          Compartir
        </button>
        {shareOpen && (
          <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-lg p-2 flex flex-col gap-1 z-10 min-w-44">
            <button
              onClick={shareWhatsApp}
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md text-foreground transition-colors"
            >
              <span className="text-green-600 font-bold text-base leading-none">W</span>
              WhatsApp
            </button>
            <button
              onClick={shareFacebook}
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md text-foreground transition-colors"
            >
              <span className="text-blue-600 font-bold text-base leading-none">f</span>
              Facebook
            </button>
            <button
              onClick={copyLink}
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md text-foreground transition-colors"
            >
              {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
              {copied ? 'Copiado' : 'Copiar enlace'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
