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

export const metadata: Metadata = {
  title: "JJ Events — Live Events & Experiences",
  description: "JJ Events — professional event planning and production.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="flex-1">{children}</main>

          <footer className="w-full border-t border-border bg-background/70">
            <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-muted-foreground">
              © {new Date().getFullYear()} JJ Events — Professionelle Eventplanung.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
