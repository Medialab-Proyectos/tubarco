import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { InternacionalSection } from '@/components/internacional-section'
import { AdBanner } from '@/components/ad-banner'
import { EspecialParaTi } from '@/components/especial-para-ti'
import { VideoSection } from '@/components/video-section'
import { ColombiaSection } from '@/components/colombia-section'
import { ReelsSection } from '@/components/reels-section'
import { ViralesSection } from '@/components/virales-section'
import { CaliSection } from '@/components/cali-section'
import { TurismoSection } from '@/components/turismo-section'
import { JudicialSection } from '@/components/judicial-section'
import { SocialSection } from '@/components/social-section'
import { LatestNews } from '@/components/latest-news'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <main>
      <Navbar />

      {/* 1. Hero — top priority MSN-style grid */}
      <HeroSection />

      {/* 2. Internacional — CEO requested international content first */}
      <InternacionalSection />

      {/* Ad placement: between major sections (non-invasive) */}
      <AdBanner />

      {/* 3. Especial Para Ti — editorial highlights */}
      <EspecialParaTi />

      {/* 4. Videos — YouTube integration (CEO requested prominent) */}
      <VideoSection />

      {/* 5. Colombia — nationwide news */}
      <ColombiaSection />

      {/* Ad placement: between sections */}
      <AdBanner />

      {/* 6. Reels — TikTok / short videos (CEO: social presence) */}
      <ReelsSection />

      {/* 7. Virales — trending content */}
      <ViralesSection />

      {/* 8. Cali — local news (further down per CEO) */}
      <CaliSection />

      {/* 9. Turismo — travel & tourism */}
      <TurismoSection />

      {/* 10. Judicial — legal & crime news */}
      <JudicialSection />

      {/* 11. Social media integration (CEO: redes visibility important) */}
      <SocialSection />

      {/* 12. Lo Último — latest 24h news with "Ver más" button */}
      <LatestNews />

      <Footer />
    </main>
  )
}
