import { WeddingExperience } from "@/components/wedding-experience";
import { weddingDetails } from "@/data/wedding";
import { calculateCountdown } from "@/lib/countdown";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Mana Pelli — Venu weds Sravya",
  description:
    "శ్రీరస్తు శుభమస్తు. The Telugu wedding of Venu and Sravya in a Konaseema coconut grove, with the muhurtham at 10:15 AM.",
  startDate: weddingDetails.dateISO,
  endDate: "2027-02-14T16:30:00+05:30",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  image: [`${siteUrl}/images/og-mana-pelli.jpg`],
  url: siteUrl,
  location: {
    "@type": "Place",
    name: weddingDetails.venue.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Peruru Road",
      addressLocality: "Amalapuram",
      addressRegion: "Andhra Pradesh",
      postalCode: "533201",
      addressCountry: "IN",
    },
  },
  organizer: { "@type": "Organization", name: "Kandukuri & Duvvuri families", url: siteUrl },
};

export default function HomePage() {
  const initialCountdown = calculateCountdown(weddingDetails.dateISO);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <WeddingExperience initialCountdown={initialCountdown} />
    </>
  );
}
