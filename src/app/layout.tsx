import type { Metadata, Viewport } from "next";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/dm-sans";
import "@fontsource/noto-sans-telugu/400.css";
import "@fontsource/noto-sans-telugu/500.css";
import "@fontsource/noto-serif-telugu/400.css";
import "@fontsource/noto-serif-telugu/600.css";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const title = "Mana Pelli — Venu & Sravya";
const description =
  "శ్రీరస్తు శుభమస్తు · A heartfelt invitation to celebrate Venu and Sravya’s wedding in a Konaseema coconut grove on 14 February 2027.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Mana Pelli",
  keywords: ["Mana Pelli", "Telugu wedding", "Konaseema wedding", "Andhra wedding invitation", "Venu weds Sravya"],
  authors: [{ name: "Kandukuri & Duvvuri families" }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, address: false, email: false, date: false },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Mana Pelli",
    title,
    description,
    locale: "en_IN",
    alternateLocale: ["te_IN"],
    images: [
      {
        url: "/images/og-mana-pelli.jpg",
        width: 1200,
        height: 630,
        alt: "A flower-decked Telugu wedding mandapam in a Konaseema coconut grove at golden hour",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/og-mana-pelli.jpg"],
  },
  appleWebApp: { capable: true, title: "Mana Pelli", statusBarStyle: "default" },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
  themeColor: "#28533B",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Art-directed LCP preloads: AVIF only, so no double download. */}
        <link
          rel="preload"
          as="image"
          type="image/avif"
          media="(max-width: 767px)"
          imageSrcSet="/images/hero/hero-portrait-440.avif 440w, /images/hero/hero-portrait-660.avif 660w, /images/hero/hero-portrait-880.avif 880w"
          imageSizes="100vw"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          type="image/avif"
          media="(min-width: 768px)"
          imageSrcSet="/images/hero/hero-landscape-960.avif 960w, /images/hero/hero-landscape-1376.avif 1376w"
          imageSizes="100vw"
          fetchPriority="high"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
