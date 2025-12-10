"use client"
import { useState, useEffect } from "react"

export default function CookieBanner() {
  const [accepted, setAccepted] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      const val = localStorage.getItem("jj_events_cookies")
      setAccepted(val === "1")
    } catch (e) {
      setAccepted(false)
    }
  }, [])

  function accept() {
    try {
      localStorage.setItem("jj_events_cookies", "1")
    } catch (e) {
      // ignore
    }
    setAccepted(true)
  }

  // Avoid initial flash before we know localStorage state
  if (accepted === null) return null
  if (accepted) return null

  return (
    <div className="fixed left-4 right-4 bottom-6 md:bottom-8 z-50">
      <div className="max-w-6xl mx-auto bg-card/98 backdrop-blur-sm rounded-lg p-3 flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="text-sm text-muted-foreground mr-4">
          Wir verwenden Cookies, um die Nutzererfahrung zu verbessern. Durch Nutzung stimmen Sie zu.
        </div>
        <div className="flex gap-2">
          <button onClick={accept} className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm">Akzeptieren</button>
          <a href="/cookies" className="px-3 py-1.5 border border-border rounded-md text-muted-foreground text-sm">Mehr</a>
        </div>
      </div>
    </div>
  )
}
