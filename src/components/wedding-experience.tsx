"use client";

import { useCallback, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/sections/hero";
import { CoupleSection } from "@/components/sections/couple-section";
import { InvitationSection } from "@/components/sections/invitation-section";
import { EventsSection } from "@/components/sections/events-section";
import { VenueSection } from "@/components/sections/venue-section";
import { TraditionsSection } from "@/components/sections/traditions-section";
import { FeastSection } from "@/components/sections/feast-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { RsvpWishesSection } from "@/components/sections/rsvp-wishes-section";
import { SiteFooter } from "@/components/site-footer";
import { weddingDetails, type Language } from "@/data/wedding";
import type { CountdownValue } from "@/lib/countdown";

interface WeddingExperienceProps {
  initialCountdown: CountdownValue;
}

export function WeddingExperience({ initialCountdown }: WeddingExperienceProps) {
  const [language, setLanguage] = useState<Language>("en");

  const shareInvitation = useCallback(() => {
    const invitation = [
      "శ్రీరస్తు శుభమస్తు",
      "Venu Weds Sravya",
      `${weddingDetails.date.en} · Muhurtham at 10:15 AM`,
      `${weddingDetails.venue.name}, ${weddingDetails.venue.address}`,
      typeof window !== "undefined" ? window.location.href.split("#")[0] : "",
    ].filter(Boolean).join("\n");
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(invitation)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">{language === "en" ? "Skip to content" : "విషయానికి వెళ్లండి"}</a>
      <SiteHeader language={language} onLanguageChange={setLanguage} />
      <main id="main-content" lang={language}>
        <Hero language={language} initialCountdown={initialCountdown} />
        <CoupleSection language={language} />
        <InvitationSection language={language} onShare={shareInvitation} />
        <EventsSection language={language} />
        <VenueSection language={language} />
        <TraditionsSection language={language} />
        <FeastSection language={language} />
        <GallerySection language={language} />
        <RsvpWishesSection language={language} />
      </main>
      <SiteFooter language={language} onShare={shareInvitation} />
    </>
  );
}
