import { WeddingExperience } from "@/components/wedding-experience";
import { weddingDetails } from "@/data/wedding";
import { calculateCountdown } from "@/lib/countdown";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const initialCountdown = calculateCountdown(weddingDetails.dateISO);
  return <WeddingExperience initialCountdown={initialCountdown} />;
}
