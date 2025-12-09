'use client'

import ContactForm from "@/components/ui/contact"
import { SplineSceneBasic } from "@/components/ui/spline-demo"
import { Logos3 } from "@/components/ui/logos3"

export default function ContactPage() {
  return (
    <section className="px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-2">Contact JJ Events</h2>
        <p className="text-muted-foreground mb-8">Tell us about your event — we'll reply within 48 hours.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <ContactForm />
          </div>
          <div className="hidden lg:block">
            <SplineSceneBasic />
          </div>
        </div>
      </div>
      
      <Logos3 heading="Unsere Partner" />
    </section>
  )
}

