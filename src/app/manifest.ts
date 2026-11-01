import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mana Pelli — Venu & Sravya",
    short_name: "Mana Pelli",
    description:
      "శ్రీరస్తు శుభమస్తు · The wedding invitation of Venu and Sravya, in a Konaseema coconut grove on 14 February 2027.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#FAF7F0",
    theme_color: "#28533B",
    lang: "en-IN",
    dir: "ltr",
    categories: ["lifestyle", "events"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
