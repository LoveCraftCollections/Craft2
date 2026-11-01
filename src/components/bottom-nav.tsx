"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Heart, Home, Images, MapPin } from "lucide-react";
import { pageCopy, type Language } from "@/data/wedding";

interface BottomNavProps {
  language: Language;
}

const items = [
  { id: "home", href: "#home", key: "navHome" as const, Icon: Home },
  { id: "events", href: "#events", key: "navEventsShort" as const, Icon: CalendarDays },
  { id: "venue", href: "#venue", key: "navVenueShort" as const, Icon: MapPin },
  { id: "gallery", href: "#gallery", key: "navGalleryShort" as const, Icon: Images },
  { id: "rsvp", href: "#rsvp", key: "rsvpShort" as const, Icon: Heart },
];

/**
 * Thumb-friendly section switcher for phones. Hidden from 900px up where the
 * header navigation takes over, and pushed away whenever a menu, lightbox or
 * the phone keyboard needs the space.
 */
export function BottomNav({ language }: BottomNavProps) {
  const [active, setActive] = useState("home");
  const copy = pageCopy[language];

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-42% 0px -48% 0px", threshold: [0, 0.2, 0.5, 0.9] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="bottom-nav" aria-label={language === "en" ? "Quick sections" : "ముఖ్య విభాగాలు"} lang={language}>
      {items.map(({ id, href, key, Icon }) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            className={`bottom-nav__item${isActive ? " is-active" : ""}`}
            href={href}
            aria-current={isActive ? "true" : undefined}
          >
            <Icon aria-hidden="true" />
            <span>{copy[key]}</span>
          </a>
        );
      })}
    </nav>
  );
}
