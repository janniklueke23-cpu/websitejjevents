"use client"
import { useState } from "react"

export default function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })

      if (res.ok) {
        setStatus("success")
        setName("")
        setEmail("")
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
        <label className="block text-sm">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="mt-1 w-full rounded-md border border-border px-3 py-2 bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          rows={6}
        />
      </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-60"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Senden..." : "Nachricht senden"}
          </button>

          {status === "success" && <span className="text-green-600">Danke — wir melden uns bald.</span>}
          {status === "error" && <span className="text-destructive">Fehler beim Senden.</span>}
        </div>
    </form>
  )
}
