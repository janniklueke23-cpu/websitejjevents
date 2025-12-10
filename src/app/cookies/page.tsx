export default function CookiesPage() {
  return (
    <main className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">Cookie-Richtlinie</h1>
      <p className="mb-4">
        Wir verwenden Cookies, um die Nutzererfahrung auf unserer Website zu verbessern. Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden und uns helfen, die Website effizienter zu betreiben und bestimmte Funktionen bereitzustellen.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Welche Cookies verwenden wir?</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Essenzielle Cookies: Notwendig für die grundlegende Funktionalität der Website.</li>
        <li>Leistungs-Cookies: Helfen uns, die Website zu verbessern, indem sie Informationen über die Nutzung sammeln.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">Wie können Sie Cookies verwalten?</h2>
      <p className="mb-4">
        Sie können Ihre Cookie-Einstellungen in Ihrem Browser jederzeit ändern und bereits gespeicherte Cookies löschen. Beachten Sie, dass das Deaktivieren von Cookies die Funktionalität der Website beeinträchtigen kann.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Kontakt</h2>
      <p>
        Bei Fragen zur Cookie-Richtlinie kontaktieren Sie uns bitte über das <a href="/contact" className="underline">Kontaktformular</a>.
      </p>
    </main>
  );
}
