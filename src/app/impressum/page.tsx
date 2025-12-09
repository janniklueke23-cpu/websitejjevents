export const metadata = {
  title: "Impressum — JJ Events",
}

export default function ImpressumPage() {
  return (
    <main className="px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Impressum</h1>
        <p className="mb-4">JJ Events<br/>Musterstraße 1<br/>12345 Musterstadt</p>

        <p className="mb-2"><strong>Vertreten durch:</strong> Max Mustermann</p>
        <p className="mb-2"><strong>Kontakt:</strong> <a href="mailto:info@jj-events.example" className="underline">info@jj-events.example</a></p>
        <p className="mb-2"><strong>Umsatzsteuer-ID:</strong> DE000000000</p>

        <h2 className="text-lg font-semibold mt-6 mb-2">Haftungsausschluss</h2>
        <p className="text-sm text-muted-foreground">
          Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
        </p>
      </div>
    </main>
  )
}
