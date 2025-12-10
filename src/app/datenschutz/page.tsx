export const metadata = {
  title: "Datenschutz — JJ Events",
}

export default function DatenschutzPage() {
  return (
    <main className="px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Datenschutzerklärung</h1>

        <p className="mb-4">
          Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Wir verarbeiten personenbezogene Daten nur im Rahmen der gesetzlichen Bestimmungen.
        </p>

        <h2 className="text-lg font-semibold mt-4 mb-2">Erhebung und Verarbeitung</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Personenbezogene Daten (z. B. Name, E-Mail) werden nur erhoben, wenn Sie diese freiwillig, z. B. im Kontaktformular, angeben.
        </p>

        <h2 className="text-lg font-semibold mt-4 mb-2">Nutzung</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Die Daten werden zum Zweck der Kommunikation und Bearbeitung Ihrer Anfragen verwendet. Eine Weitergabe an Dritte erfolgt nur, wenn dies zur Erfüllung der Dienstleistung erforderlich ist oder wir gesetzlich dazu verpflichtet sind.
        </p>

        <h2 className="text-lg font-semibold mt-4 mb-2">Ihre Rechte</h2>
        <p className="text-sm text-muted-foreground">
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten. Wenden Sie sich dazu an <a href="mailto:JJevents.wue@gmail.com" className="underline">JJevents.wue@gmail.com</a>.
        </p>
      </div>
    </main>
  )
}
