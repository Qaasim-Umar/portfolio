import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile, site } from "@/lib/content";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ConsoleSignature } from "@/components/easter-eggs/ConsoleSignature";
import { KonamiEasterEgg } from "@/components/easter-eggs/KonamiEasterEgg";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${profile.name}` },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: profile.name, url: site.url }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: profile.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f2ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0e0d" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-dvh">
        <ThemeScript />

        <a
          href="#main"
          className="sr-only rounded-md border border-primary bg-surface px-3 py-2 font-mono text-sm text-text focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80]"
        >
          Skip to content
        </a>

        {/* Decorative terminal-style scanlines behind everything. */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-grid opacity-40" />

        <ScrollProgress />
        <Nav />
        <main id="main">{children}</main>
        <Footer />

        <ConsoleSignature />
        <KonamiEasterEgg />
      </body>
    </html>
  );
}
