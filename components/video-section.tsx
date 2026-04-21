'use client'

import { useState } from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import { Play, Clock, Eye, Youtube, X } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { SectionHeader } from './section-header'
import type { Video } from '@/lib/types'
import { cn } from '@/lib/utils'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function VideoCard({
  video,
  variant = 'default',
  onClick,
}: {
  video: Video
  variant?: 'featured' | 'default'
  onClick: (id: string) => void
}) {
  const timeAgo = formatDistanceToNow(new Date(video.publishedAt), {
    addSuffix: true,
    locale: es,
  })

  if (variant === 'featured') {
    return (
      <button
        onClick={() => onClick(video.youtubeId)}
        className="group w-full text-left rounded-xl overflow-hidden bg-card border border-border/60 card-lift"
      >
        <div className="relative aspect-video overflow-hidden img-zoom">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[oklch(0.62_0.24_22)] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <Play size={24} className="text-white ml-1" fill="white" />
            </div>
          </div>
          <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2.5 py-1 rounded-md font-mono">
            {video.duration}
          </div>
          {/* YouTube badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-md">
            <Youtube size={12} />
            YouTube
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-base text-foreground line-clamp-2 leading-snug text-balance group-hover:text-[oklch(0.72_0.14_210)] transition-colors">
            {video.title}
          </h3>
          <div className="mt-2.5 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye size={12} />
              {video.views}
            </span>
            <span>{timeAgo}</span>
          </div>
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={() => onClick(video.youtubeId)}
      className="group flex gap-3 items-start hover:bg-muted/60 p-2.5 -mx-2.5 rounded-xl transition-colors text-left w-full"
    >
      <div className="relative w-32 shrink-0 aspect-video rounded-lg overflow-hidden">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover"
          sizes="128px"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-[oklch(0.62_0.24_22)] flex items-center justify-center">
            <Play size={12} className="text-white ml-0.5" fill="white" />
          </div>
        </div>
        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1.5 rounded font-mono">
          {video.duration}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-foreground line-clamp-2 leading-snug group-hover:text-[oklch(0.72_0.14_210)] transition-colors">
          {video.title}
        </h4>
        <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-0.5">
            <Eye size={10} />
            {video.views}
          </span>
          <span>{timeAgo}</span>
        </div>
      </div>
    </button>
  )
}

function VideoModal({
  youtubeId,
  onClose,
}: {
  youtubeId: string
  onClose: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
      >
        <X size={20} />
      </button>
      <div
        className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          title="Video"
        />
      </div>
    </div>
  )
}

export function VideoSection() {
  const { data, isLoading } = useSWR<{ videos: Video[] }>('/api/videos', fetcher)
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  if (isLoading || !data) return null

  const [featured, ...rest] = data.videos

  return (
    <section className="py-10">
      <div className="max-w-[1400px] mx-auto px-4">
        <SectionHeader
          title="Videos"
          subtitle="Lo último de nuestro canal de YouTube"
          href="https://youtube.com"
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7">
            <VideoCard
              video={featured}
              variant="featured"
              onClick={setActiveVideo}
            />
          </div>
          <div className="lg:col-span-5 flex flex-col gap-1">
            {rest.map((video) => (
              <div key={video.id}>
                <VideoCard video={video} onClick={setActiveVideo} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {activeVideo && (
        <VideoModal youtubeId={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </section>
  )
}
