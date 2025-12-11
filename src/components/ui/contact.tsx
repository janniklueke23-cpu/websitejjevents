"use client"
import { useState } from "react"
import { LiquidButton } from "./liquid-glass-button"
import { EventTypeDropdown } from "./fluid-dropdown"
import { Calendar, RangeValue } from "./calendar"

export default function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [eventType, setEventType] = useState("Alle Event-Typen")
  const [eventDate, setEventDate] = useState<RangeValue | null>(null)
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          email, 
          eventType, 
          eventDate: eventDate ? {
            start: eventDate.start?.toISOString(),
            end: eventDate.end?.toISOString()
          } : null,
          message 
        }),
      })

      if (res.ok) {
        setStatus("success")
        setName("")
        setEmail("")
        setEventType("Alle Event-Typen")
        setEventDate(null)
        setMessage("")
      } else {
        setStatus("error")
      }
    } catch (err) {
      setStatus("error")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto grid gap-4 bg-card p-6 rounded-lg shadow-sm">
      <div>
        <label className="block text-sm">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 w-full rounded-md border border-border px-3 py-2 bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          className="mt-1 w-full rounded-md border border-border px-3 py-2 bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Event-Typ</label>
        <EventTypeDropdown value={eventType} onChange={setEventType} />
      </div>

      <div className="relative z-10">
        <label className="block text-sm mb-1">Event-Datum</label>
        <Calendar
          value={eventDate}
          onChange={setEventDate}
          allowClear
          showTimeInput={true}
          minValue={new Date()}
        />
      </div>

      <div>
        <label className="block text-sm">Nachricht</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="mt-1 w-full rounded-md border border-border px-3 py-2 bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          rows={6}
        />
      </div>

        <div className="flex items-center gap-4 relative z-0">
          <LiquidButton
            type="submit"
            disabled={status === "sending"}
            size="default"
            variant="default"
          >
            {status === "sending" ? "Senden..." : "Nachricht senden"}
          </LiquidButton>

          {status === "success" && <span className="text-green-600">Danke — wir melden uns bald.</span>}
          {status === "error" && <span className="text-destructive">Fehler beim Senden.</span>}
        </div>
    </form>
  )
}
