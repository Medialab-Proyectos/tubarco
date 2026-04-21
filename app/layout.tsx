import type { Metadata } from 'next'
import { Inter, Merriweather } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
})

export const metadata: Metadata = {
  title: 'TuBarco News — Colombia y el Mundo',
  description:
    'La plataforma de noticias moderna para Colombia y América Latina. Cobertura editorial, contenido internacional y lo más reciente de Cali y el país.',
  keywords: ['noticias', 'Colombia', 'Cali', 'internacional', 'América Latina', 'periodismo ciudadano'],
  openGraph: {
    title: 'TuBarco News — Colombia y el Mundo',
    description: 'Noticias de Colombia y América Latina · #PeriodismoCiudadano',
    type: 'website',
    siteName: 'TuBarco News',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TuBarco News',
    description: 'Noticias de Colombia y América Latina',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">{children}</body>
    </html>
  )
}
