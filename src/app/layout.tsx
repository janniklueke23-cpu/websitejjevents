import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Header from "@/components/ui/header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "JJ Events — Live Events & Experiences",
  description: "JJ Events — professionelle Eventplanung, Technik und Umsetzung für Live-Erlebnisse.",
  openGraph: {
    title: "JJ Events — Live Events & Experiences",
    description: "Professionelle Eventplanung, moderne Technik und reibungslose Abläufe für dein Event.",
    url: siteUrl,
    siteName: "JJ Events",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JJ Events — Live Events & Experiences",
    description: "Professionelle Eventplanung, moderne Technik und reibungslose Abläufe für dein Event.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "JJ Events",
    url: siteUrl,
    description: "Professionelle Eventplanung, Technik und Umsetzung für Live-Erlebnisse.",
    sameAs: [
      "https://www.facebook.com",
      "https://www.instagram.com",
    ],
  };

  return (
    <html lang="de" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black text-foreground transition-colors duration-300`}>
        <div className="min-h-screen flex flex-col">
          {/* Overlay header for menu bar above hero */}
          <div className="fixed top-0 left-0 w-full z-[150]">
            <Header />
          </div>

          <main className="flex-1">{children}</main>

          <footer className="w-full border-t border-border bg-background/70">
            <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-muted-foreground">
              © {new Date().getFullYear()} JJ Events — Professionelle Eventplanung.
            </div>
          </footer>
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
          />
        </div>
      </body>
    </html>
  );
}
