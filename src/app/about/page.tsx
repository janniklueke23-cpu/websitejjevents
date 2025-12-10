"use client"

import { LampContainer } from "@/components/ui/lamp"
import { GooeyText } from "@/components/ui/gooey-text-morphing"
import { motion } from "framer-motion"
import { Logos3 } from "@/components/ui/logos3"

export default function AboutPage() {
  return (
    <>
      <LampContainer className="min-h-screen">
        <div className="flex flex-col items-center gap-6 px-4">
          <GooeyText
            texts={["JJ Events", "Planung", "Technik", "Umsetzung", "Unvergesslich"]}
            morphTime={1.2}
            cooldownTime={0.35}
            textClassName="text-4xl md:text-6xl font-semibold whitespace-nowrap"
          />
          <motion.p
            initial={{ opacity: 0.4, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.85, ease: "easeInOut" }}
            className="mt-2 max-w-3xl text-center text-base md:text-lg text-slate-200/90"
          >
            JJ Events ist ein erfahrenes Team aus Eventplanern und Produzenten. Wir arbeiten kreativ,
            lösungsorientiert und professionell, damit Ihre Veranstaltung reibungslos und unvergesslich wird.
          </motion.p>
        </div>
      </LampContainer>
      <Logos3 heading="Unsere Technik" />
    </>
  )
}
