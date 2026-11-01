import type { Metadata, Viewport } from "next";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/dm-sans";
import "@fontsource/noto-sans-telugu/400.css";
import "@fontsource/noto-sans-telugu/500.css";
import "@fontsource/noto-sans-telugu/600.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mana Pelli — Venu & Sravya",
  description: "A heartfelt invitation to celebrate Venu and Sravya’s wedding in a Konaseema coconut grove.",
  applicationName: "Mana Pelli",
  keywords: ["Mana Pelli", "Telugu wedding", "Konaseema wedding", "Andhra wedding invitation"],
};

export const viewport: Viewport = {
  themeColor: "#28533B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
