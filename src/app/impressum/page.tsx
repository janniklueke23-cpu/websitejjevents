export const metadata = {
  title: "Impressum — JJ Events",
}

export default function ImpressumPage() {
  return (
    <main className="px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Impressum</h1>
        
        <h2 className="text-lg font-semibold mb-3">Angaben gemäß § 5 TMG</h2>
        
        <p className="mb-4">
          <strong>Verantwortlich für den Inhalt:</strong><br/>
          Jannik Lüke
        </p>

        <p className="mb-6">
          <strong>Kontakt:</strong><br/>
          E-Mail: <a href="mailto:JJevents.wue@gmail.com" className="underline">JJevents.wue@gmail.com</a>
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-3">Art der Website</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Es handelt sich um eine nicht-kommerzielle Website, die ausschließlich zu privaten und unterhaltenden Zwecken betrieben wird. 
          Es werden keine Dienstleistungen gegen Entgelt angeboten, und es findet kein geschäftsmäßiger oder gewerblicher Handel statt.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-3">Haftungsausschluss</h2>
        <p className="text-sm text-muted-foreground">
          Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. 
          Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
        </p>
      </div>
    </main>
  )
}
