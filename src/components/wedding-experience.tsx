"use client";

import { useCallback, useEffect, useState } from "react";
import { BottomNav } from "@/components/bottom-nav";
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
    const url = typeof window === "undefined" ? "" : window.location.href.split("#")[0];
    const invitation = [
      "శ్రీరస్తు శుభమస్తు",
      "Venu Weds Sravya",
      `${weddingDetails.date.en} · Muhurtham at 10:15 AM`,
      `${weddingDetails.venue.name}, ${weddingDetails.venue.address}`,
      url,
    ]
      .filter(Boolean)
      .join("\n");

    // Phones get the native share sheet (WhatsApp, SMS, everything);
    // desktops fall back to a pre-filled WhatsApp message.
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      void navigator
        .share({ title: "Mana Pelli — Venu & Sravya", text: invitation })
        .catch((error: unknown) => {
          // A cancelled share sheet must not bounce the guest into WhatsApp.
          if (error instanceof Error && error.name === "AbortError") return;
          window.open(`https://wa.me/?text=${encodeURIComponent(invitation)}`, "_blank", "noopener,noreferrer");
        });
      return;
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(invitation)}`, "_blank", "noopener,noreferrer");
  }, []);

  // Smooth anchor scrolling that respects the sticky header, and keeps the
  // URL hash clean for sharing (WhatsApp links should never carry #rsvp).
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || anchor.classList.contains("skip-link")) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const section = document.querySelector<HTMLElement>(id);
      if (!section) return;
      event.preventDefault();
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">
        {language === "en" ? "Skip to content" : "విషయానికి వెళ్లండి"}
      </a>
      <SiteHeader language={language} onLanguageChange={setLanguage} onShare={shareInvitation} />
      <main id="main-content" lang={language}>
        <Hero language={language} initialCountdown={initialCountdown} onShare={shareInvitation} />
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
      <BottomNav language={language} />
    </>
  );
}
