'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Facebook, Instagram, Youtube, Twitter, Mail, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { MOCK_ARTICLES } from '@/lib/mock-data'

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const latest = [...MOCK_ARTICLES]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="mt-0 bg-[oklch(0.22_0.06_260)] text-white">
      {/* Newsletter CTA — premium gradient */}
      <div className="bg-gradient-to-r from-[oklch(0.22_0.06_260)] via-[oklch(0.20_0.08_240)] to-[oklch(0.22_0.06_260)]">
        <div className="max-w-[1400px] mx-auto px-4 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[oklch(0.72_0.14_210)] mb-3">
              <Mail size={12} />
              Newsletter gratuito
            </span>
            <h2 className="font-sans text-2xl md:text-3xl font-black text-white text-balance leading-tight tracking-tight">
              Regístrate para conocer las últimas noticias
            </h2>
            <p className="mt-3 text-sm text-white/50 leading-relaxed">
              Recibe cada mañana las noticias más importantes de Colombia y América Latina en tu correo.
            </p>
          </div>
          <form
            onSubmit={handleSubscribe}
            className="flex w-full md:w-auto items-center gap-2 bg-white/8 border border-white/15 rounded-xl pl-5 pr-1.5 py-1.5"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electrónico"
              className="flex-1 bg-transparent text-sm outline-none py-2 min-w-0 md:min-w-[280px] text-white placeholder:text-white/40"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-[oklch(0.72_0.14_210)] hover:bg-[oklch(0.65_0.14_210)] text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors shrink-0"
            >
              {subscribed ? '¡Gracias!' : 'Regístrate'}
              {!subscribed && <ArrowRight size={14} />}
            </button>
          </form>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="border-t border-white/8">
        <div className="max-w-[1400px] mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* About */}
            <div className="md:col-span-4">
              <Link href="/" className="inline-block" id="footer-logo">
                <div className="relative h-9 w-[160px]">
                  <Image
                    src="/Logoaa.png"
                    alt="TuBarco"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </Link>
              <h3 className="mt-6 font-semibold text-[10px] uppercase tracking-[0.2em] text-white/30">
                Sobre nosotros
              </h3>
              <p className="mt-3 text-sm text-white/50 leading-relaxed">
                TuBarco <span className="text-[oklch(0.72_0.14_210)] font-semibold">#PeriodismoCiudadano</span>, el
                nuevo medio de comunicación donde periodistas y no periodistas podrán tener un
                espacio permanente para divulgar su información.
              </p>
              <div className="mt-6">
                <h3 className="font-semibold text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">
                  Redes
                </h3>
                <div className="flex items-center gap-2">
                  {[
                    { icon: Facebook, label: 'Facebook', href: '#' },
                    { icon: Instagram, label: 'Instagram', href: '#' },
                    { icon: Youtube, label: 'YouTube', href: '#' },
                    { icon: Twitter, label: 'Twitter / X', href: '#' },
                  ].map(({ icon: Icon, label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/6 hover:bg-[oklch(0.72_0.14_210)] hover:text-white transition-all"
                    >
                      <Icon size={16} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Noticias recientes */}
            <div className="md:col-span-4">
              <h3 className="font-semibold text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">
                Noticias
              </h3>
              <ul className="space-y-4">
                {latest.map((article) => (
                  <li key={article.id}>
                    <Link
                      href={`/articulo/${article.slug}`}
                      className="group block text-sm leading-snug text-white/70 hover:text-[oklch(0.72_0.14_210)] transition-colors"
                    >
                      <span className="line-clamp-2 text-balance">{article.title}</span>
                      <span className="block text-xs text-white/30 mt-1">
                        {format(new Date(article.publishedAt), "d 'de' MMMM, yyyy", { locale: es })}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Secciones */}
            <div className="md:col-span-2">
              <h3 className="font-semibold text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">
                Secciones
              </h3>
              <ul className="space-y-2.5 text-sm">
                {[
                  { label: 'Lo último', href: '/recientes' },
                  { label: 'Virales', href: '/categoria/virales' },
                  { label: 'Turismo', href: '/categoria/turismo' },
                  { label: 'Judicial', href: '/categoria/judicial' },
                  { label: 'TUBARCO CALI', href: '/categoria/tubarco-cali' },
                  { label: 'TUBARCO COLOMBIA', href: '/categoria/tubarco-colombia' },
                  { label: 'Internacional', href: '/categoria/tubarco-internacional' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/50 hover:text-[oklch(0.72_0.14_210)] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="md:col-span-2">
              <h3 className="font-semibold text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">
                Legal
              </h3>
              <ul className="space-y-2.5 text-sm">
                {[
                  'Términos y condiciones',
                  'Políticas de privacidad',
                  'Aviso de privacidad',
                  'Política de datos',
                ].map((label) => (
                  <li key={label}>
                    <Link
                      href="#"
                      className="text-white/50 hover:text-[oklch(0.72_0.14_210)] transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/6">
        <div className="max-w-[1400px] mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <p>© 2026. Todos los derechos reservados · TU BARCO Noticias</p>
          <p>
            #PeriodismoCiudadano — Hecho desde{' '}
            <span className="text-[oklch(0.72_0.14_210)]">Cali, Colombia</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
