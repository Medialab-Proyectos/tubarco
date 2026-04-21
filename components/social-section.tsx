import Link from 'next/link'
import { SectionHeader } from './section-header'

const SOCIAL_POSTS = [
  {
    id: '1',
    platform: 'tiktok' as const,
    text: '¿Sabías que Colombia tiene más especies de aves que ningún otro país del mundo? 🦜 #Colombia #Naturaleza #TuBarcoNews',
    handle: '@tubarconews',
    likes: '12.4K',
    href: '#',
  },
  {
    id: '2',
    platform: 'instagram' as const,
    text: 'El corazón de Cali late en el Petronio. 800.000 personas celebraron la cultura del Pacífico. ¿Estuviste ahí? 📷',
    handle: '@tubarconews',
    likes: '8.7K',
    href: '#',
  },
  {
    id: '3',
    platform: 'instagram' as const,
    text: 'Colombia clasifica al Mundial con récord histórico. Una noche que no olvidaremos. ⚽🇨🇴',
    handle: '@tubarconews',
    likes: '34.2K',
    href: '#',
  },
]

const PlatformIcon = ({ platform }: { platform: 'tiktok' | 'instagram' }) => {
  if (platform === 'tiktok') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden>
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.83a8.21 8.21 0 004.79 1.53V6.93a4.85 4.85 0 01-1.02-.24z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

export function SocialSection() {
  return (
    <section className="py-10 bg-secondary/50">
      <div className="max-w-[1400px] mx-auto px-4">
        <SectionHeader title="Síguenos en redes" subtitle="Contenido exclusivo en nuestras plataformas" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SOCIAL_POSTS.map((post) => (
            <Link
              key={post.id}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-card border border-border/60 rounded-xl p-5 card-lift group"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <span
                  className={
                    post.platform === 'tiktok'
                      ? 'text-foreground'
                      : 'text-pink-500'
                  }
                >
                  <PlatformIcon platform={post.platform} />
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {post.handle}
                </span>
                <span className="ml-auto text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50 border border-border px-2 py-0.5 rounded-full">
                  {post.platform}
                </span>
              </div>
              <p className="text-sm text-foreground leading-relaxed line-clamp-3 group-hover:text-[oklch(0.72_0.14_210)] transition-colors">
                {post.text}
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
                <span>❤️</span>
                <span className="font-semibold">{post.likes}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
