import Link from "next/link"
import { FeaturesSection } from "@/components/ui/feature"
import CookieBanner from "@/components/ui/cookie"
import IntroAnimation from "@/components/ui/scroll-morph-hero"
import { Logos3 } from "@/components/ui/logos3"
import { GlowingEffectDemo } from "@/components/ui/glowing-effect-demo"

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
      <section id="services" className="px-6 py-24 bg-background dark:bg-black">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold md:text-3xl">Was wir bieten</h2>
            <p className="text-sm text-muted-foreground md:text-base">
              Schneller Überblick über Leistungen und nächste Schritte.
            </p>
          </div>
          <GlowingEffectDemo />
        </div>
      </section>

      {/* Gallery and Contact moved to their own pages */}

      {/* Partners Section */}
      <Logos3 heading="Unsere Technik" />

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

