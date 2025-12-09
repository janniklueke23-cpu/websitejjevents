import Link from "next/link"
import { FeaturesSection } from "@/components/ui/feature"
import CookieBanner from "@/components/ui/cookie"
import IntroAnimation from "@/components/ui/scroll-morph-hero"
import { Logos3 } from "@/components/ui/logos3"

export default function Home() {
  return (
    <div className="text-foreground">
      {/* Scroll Morph Hero Demo (moved to top) */}
      <section id="demo-hero" className="relative w-screen h-screen overflow-hidden">
        {/* Full-bleed IntroAnimation — fills the viewport */}
        <IntroAnimation />
      </section>
      {/* Hero section removed between IntroAnimation and About as requested */}

      {/* Services */}
      <section id="services" className="px-6 min-h-screen bg-background flex items-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8">Leistungen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold mb-2">Eventplanung</h3>
              <p className="text-sm text-muted-foreground">Komplettes Management von Konzept bis Durchführung.</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold mb-2">Beratung</h3>
              <p className="text-sm text-muted-foreground">Strategische Beratung für Markenauftritte und Programme.</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold mb-2">Organisation</h3>
              <p className="text-sm text-muted-foreground">Technik, Logistik und Ablaufplanung für reibungslose Events.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery and Contact moved to their own pages */}

      {/* Partners Section */}
      <Logos3 heading="Unsere Partner" />

      {/* Footer */}
      <footer className="px-6 py-8">
        <div className="max-w-6xl mx-auto text-sm text-muted-foreground flex flex-col md:flex-row md:justify-between gap-4">
          <div>© {new Date().getFullYear()} JJ Events</div>
          <div className="flex gap-4">
            <Link href="/impressum" className="hover:text-foreground">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-foreground">Datenschutz</Link>
            <a href="#cookies" className="hover:text-foreground">Cookie-Hinweis</a>
          </div>
        </div>
      </footer>

      <CookieBanner />
    </div>
  )
}

