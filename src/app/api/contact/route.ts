import { NextResponse } from "next/server"

const TELEGRAM_BOT_TOKEN = "8002398972:AAHxJud8FvkDasIrTzJH1ubj7IWSGT4s8WQ"
const TELEGRAM_CHAT_ID = "8476664956"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Format the event date
    let dateText = "Nicht angegeben"
    if (data.eventDate?.start && data.eventDate?.end) {
      const start = new Date(data.eventDate.start)
      const end = new Date(data.eventDate.end)
      dateText = `${start.toLocaleString('de-DE')} - ${end.toLocaleString('de-DE')}`
    }
    
    // Create Telegram message
    const telegramMessage = `
🎉 *Neue Event-Anfrage*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
🎭 *Event-Typ:* ${data.eventType}
📅 *Event-Datum:* ${dateText}

💬 *Nachricht:*
${data.message}
    `.trim()

    // Send to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: "Markdown"
        })
      }
    )

    const telegramResult = await telegramResponse.json()
    
    if (!telegramResult.ok) {
      console.error("Telegram error:", telegramResult)
      return NextResponse.json({ 
        ok: false, 
        error: "Fehler beim Senden der Nachricht" 
      }, { status: 500 })
    }

    console.log("Contact submission sent to Telegram:", data)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Contact form error:", err)
    return NextResponse.json({ 
      ok: false, 
      error: "Serverfehler" 
    }, { status: 500 })
  }
}
