'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Search, Menu, X, MapPin, ChevronDown, Globe, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CITIES } from '@/lib/mock-data'

const MAIN_NAV = [
  { label: 'Internacional', href: '/categoria/tubarco-internacional', icon: Globe },
  { label: 'Colombia', href: '/categoria/tubarco-colombia' },
  { label: 'Cali', href: '/categoria/tubarco-cali' },
  { label: 'Virales', href: '/categoria/virales', icon: TrendingUp },
  { label: 'Turismo', href: '/categoria/turismo' },
  { label: 'Judicial', href: '/categoria/judicial' },
]

const ESPECIALES = [
  { label: 'Derechos negados en América Latina', href: '/articulo/crimen-organizado-mar-ecuatoriano-pescadores' },
  { label: 'Narcocensura en México', href: '/articulo/narcocensura-mexico-periodistas-democracia' },
  { label: 'COP16', href: '/categoria/cop16' },
]

const REGIONAL = [
  { label: 'TUBARCO CALI', href: '/categoria/tubarco-cali' },
  { label: 'TUBARCO COLOMBIA', href: '/categoria/tubarco-colombia' },
  { label: 'TUBARCO INTERNACIONAL', href: '/categoria/tubarco-internacional' },
  { label: 'TUBARCO VALLE', href: '/categoria/tubarco-valle' },
  { label: 'TU BARCO BOGOTÁ', href: '/categoria/tubarco-bogota' },
]

const TRENDING_TAGS = [
  'Selección Colombia',
  'Petro',
  'Cali',
  'Geopolítica',
  'Economía',
  'Pacífico',
]

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cityOpen, setCityOpen] = useState(false)
  const [especialesOpen, setEspecialesOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    const onClick = () => {
      setCityOpen(false)
      setEspecialesOpen(false)
    }
    if (cityOpen || especialesOpen) {
      document.addEventListener('click', onClick)
      return () => document.removeEventListener('click', onClick)
    }
  }, [cityOpen, especialesOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(query.trim())}`)
      setSearchOpen(false)
      setQuery('')
    }
  }

  return (
    <>
      {/* Breaking news ticker */}
      <div className="bg-[oklch(0.18_0.05_260)] text-white overflow-hidden">
        <div className="flex items-center">
          <div className="shrink-0 bg-[oklch(0.62_0.24_22)] px-3 py-1.5 flex items-center gap-1.5 z-10">
            <span className="w-2 h-2 rounded-full bg-white pulse-live" />
            <span className="text-[11px] font-bold uppercase tracking-widest">En vivo</span>
          </div>
          <div className="overflow-hidden flex-1 whitespace-nowrap py-1.5">
            <div className="ticker-scroll inline-flex gap-12">
              <span className="text-xs text-white/80">
                ⚡ Colombia goleó a Argentina por eliminatorias — jugador albiceleste genera polémica
              </span>
              <span className="text-xs text-white/60">|</span>
              <span className="text-xs text-white/80">
                🌎 ONU debate reparación histórica por esclavitud
              </span>
              <span className="text-xs text-white/60">|</span>
              <span className="text-xs text-white/80">
                📰 Petro endurece postura diplomática con Ecuador
              </span>
              <span className="text-xs text-white/60">|</span>
              <span className="text-xs text-white/80">
                ⚡ Colombia goleó a Argentina por eliminatorias — jugador albiceleste genera polémica
              </span>
              <span className="text-xs text-white/60">|</span>
              <span className="text-xs text-white/80">
                🌎 ONU debate reparación histórica por esclavitud
              </span>
              <span className="text-xs text-white/60">|</span>
              <span className="text-xs text-white/80">
                📰 Petro endurece postura diplomática con Ecuador
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-lg shadow-[oklch(0.22_0.06_260_/_0.08)]'
            : 'bg-white',
        )}
      >
        {/* Brand row */}
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 -ml-2 text-foreground hover:text-[oklch(0.72_0.14_210)] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú"
              id="mobile-menu-toggle"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center select-none group" id="navbar-logo">
              <div className="relative h-8 md:h-10 w-[140px] md:w-[180px]">
                <Image
                  src="/Logoazuil.png"
                  alt="TuBarco"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Desktop utility actions */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Trending tags */}
              <div className="flex items-center gap-1.5 mr-3">
                {TRENDING_TAGS.slice(0, 4).map((tag) => (
                  <Link
                    key={tag}
                    href={`/buscar?q=${encodeURIComponent(tag)}`}
                    className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:border-[oklch(0.72_0.14_210)] hover:text-[oklch(0.72_0.14_210)] hover:bg-[oklch(0.72_0.14_210_/_0.06)] transition-all"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              {/* City filter */}
              <div className="relative">
                <button
                  type="button"
                  id="city-filter-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    setCityOpen(!cityOpen)
                    setEspecialesOpen(false)
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm text-muted-foreground hover:text-[oklch(0.72_0.14_210)] transition-colors rounded-lg hover:bg-muted"
                >
                  <MapPin size={15} />
                  <span className="text-xs font-medium">{selectedCity ?? 'Ciudad'}</span>
                  <ChevronDown
                    size={12}
                    className={cn('transition-transform', cityOpen && 'rotate-180')}
                  />
                </button>
                {cityOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-52 bg-white border border-border rounded-xl shadow-xl shadow-black/8 py-2 z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => {
                        setSelectedCity(null)
                        setCityOpen(false)
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors rounded-lg mx-0"
                    >
                      Todas las ciudades
                    </button>
                    <div className="border-t border-border my-1 mx-3" />
                    {CITIES.map((city) => (
                      <button
                        key={city.slug}
                        onClick={() => {
                          setSelectedCity(city.name)
                          setCityOpen(false)
                          router.push(`/buscar?q=${encodeURIComponent(city.name)}`)
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors"
                      >
                        {city.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search */}
              <form
                onSubmit={handleSearch}
                className={cn(
                  'flex items-center gap-2 transition-all duration-300 overflow-hidden',
                  searchOpen
                    ? 'w-72 bg-muted border border-border rounded-xl px-4 py-2'
                    : 'w-10',
                )}
              >
                <button
                  type="button"
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="text-muted-foreground hover:text-[oklch(0.72_0.14_210)] shrink-0 transition-colors"
                  aria-label="Buscar"
                  id="search-toggle"
                >
                  <Search size={18} />
                </button>
                {searchOpen && (
                  <input
                    ref={searchRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar noticias..."
                    className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
                  />
                )}
              </form>
            </div>

            {/* Mobile search icon */}
            <button
              className="lg:hidden p-2 text-foreground hover:text-[oklch(0.72_0.14_210)] transition-colors"
              onClick={() => router.push('/buscar')}
              aria-label="Buscar"
              id="mobile-search"
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Navigation links — premium underline style */}
        <nav className="hidden lg:block border-t border-border/60 bg-[oklch(0.22_0.06_260)]">
          <div className="max-w-[1400px] mx-auto px-4">
            <ul className="flex items-center gap-0">
              {MAIN_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group relative flex items-center gap-1.5 px-4 py-3 text-[13px] font-semibold uppercase tracking-wider text-white/80 hover:text-white transition-colors whitespace-nowrap"
                  >
                    {link.icon && <link.icon size={14} className="opacity-60" />}
                    {link.label}
                    <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[oklch(0.72_0.14_210)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </Link>
                </li>
              ))}
              {/* Especiales dropdown */}
              <li className="relative">
                <button
                  type="button"
                  id="especiales-dropdown"
                  onClick={(e) => {
                    e.stopPropagation()
                    setEspecialesOpen(!especialesOpen)
                    setCityOpen(false)
                  }}
                  className="group relative flex items-center gap-1 px-4 py-3 text-[13px] font-semibold uppercase tracking-wider text-[oklch(0.78_0.14_80)] hover:text-white transition-colors whitespace-nowrap"
                >
                  ★ Especiales
                  <ChevronDown
                    size={12}
                    className={cn('transition-transform', especialesOpen && 'rotate-180')}
                  />
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[oklch(0.78_0.14_80)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </button>
                {especialesOpen && (
                  <div
                    className="absolute left-0 top-full w-80 bg-white border border-border rounded-xl shadow-xl shadow-black/10 py-2 z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {ESPECIALES.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setEspecialesOpen(false)}
                        className="block px-4 py-3 text-sm text-foreground hover:bg-muted hover:text-[oklch(0.72_0.14_210)] transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
              {/* Spacer */}
              <li className="flex-1" />
              {/* Lo último link */}
              <li>
                <Link
                  href="/recientes"
                  className="flex items-center gap-1.5 px-4 py-3 text-[13px] font-bold uppercase tracking-wider text-[oklch(0.72_0.14_210)] hover:text-white transition-colors whitespace-nowrap"
                >
                  Lo último →
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="lg:hidden border-t border-border bg-white fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto">
            {/* Mobile search */}
            <div className="px-4 py-3 border-b border-border bg-muted/50">
              <form onSubmit={handleSearch} className="flex items-center gap-2 bg-white border border-border rounded-xl px-4 py-2.5">
                <Search size={16} className="text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar noticias..."
                  className="flex-1 bg-transparent text-sm outline-none"
                />
              </form>
            </div>
            
            <div className="px-4 py-3 border-b border-border">
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                Ciudad
              </div>
              <select
                value={selectedCity ?? ''}
                onChange={(e) => setSelectedCity(e.target.value || null)}
                className="w-full px-3 py-2.5 bg-muted border border-border rounded-lg text-sm"
              >
                <option value="">Todas las ciudades</option>
                {CITIES.map((city) => (
                  <option key={city.slug} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <ul className="py-2">
              {MAIN_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3.5 text-sm font-semibold uppercase tracking-wide text-foreground hover:bg-muted hover:text-[oklch(0.72_0.14_210)] transition-colors"
                  >
                    {link.icon && <link.icon size={16} className="text-muted-foreground" />}
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="px-4 py-2 flex items-center gap-2">
                <div className="flex-1 h-px bg-border" />
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                  Secciones
                </span>
                <div className="flex-1 h-px bg-border" />
              </li>
              {REGIONAL.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center px-4 py-3 text-sm font-bold uppercase tracking-wider text-[oklch(0.22_0.06_260)] hover:bg-muted hover:text-[oklch(0.72_0.14_210)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="px-4 py-2 flex items-center gap-2">
                <div className="flex-1 h-px bg-border" />
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                  Especiales
                </span>
                <div className="flex-1 h-px bg-border" />
              </li>
              {ESPECIALES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center px-4 py-3 text-sm text-foreground hover:bg-muted hover:text-[oklch(0.72_0.14_210)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  )
}
