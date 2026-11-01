"use client";

import { ArrowDown, CalendarDays, Clock3, MapPin, Share2, Sparkles } from "lucide-react";
import type { CSSProperties } from "react";
import { weddingDetails, pageCopy, type Language } from "@/data/wedding";
import { heroLandscapeLqip, heroPortraitLqip } from "@/data/hero-lqip";
import { useCountdown } from "@/hooks/use-countdown";
import type { CountdownValue } from "@/lib/countdown";

interface HeroProps {
  language: Language;
  initialCountdown: CountdownValue;
  onShare: () => void;
}

const timeUnits = {
  en: ["days", "hrs", "min", "sec"],
  te: ["రోజులు", "గంటలు", "నిమిషాలు", "సెకన్లు"],
} as const;

const heroMediaVars = {
  "--hero-lqip-portrait": `url(${heroPortraitLqip})`,
  "--hero-lqip-landscape": `url(${heroLandscapeLqip})`,
} as CSSProperties;

export function Hero({ language, initialCountdown, onShare }: HeroProps) {
  const countdown = useCountdown(weddingDetails.dateISO, initialCountdown);
  const copy = pageCopy[language];
  const values = countdown.isPast
    ? [0, 0, 0, 0]
    : [countdown.days, countdown.hours, countdown.minutes, countdown.seconds];

  return (
    <section id="home" className="hero-section" lang={language}>
      {/*
        Art direction rather than one shrunk desktop photo: phones get a
        vertical composition of the mandapam, tablets/desktop the wide frame.
        AVIF first, WebP fallback, and the blur placeholder paints instantly.
      */}
      <div className="hero-section__media" style={heroMediaVars}>
        <picture>
          <source
            media="(min-width: 768px)"
            type="image/avif"
            srcSet="/images/hero/hero-landscape-960.avif 960w, /images/hero/hero-landscape-1376.avif 1376w"
            sizes="100vw"
          />
          <source
            media="(min-width: 768px)"
            type="image/webp"
            srcSet="/images/hero/hero-landscape-960.webp 960w, /images/hero/hero-landscape-1376.webp 1376w"
            sizes="100vw"
          />
          <source
            type="image/avif"
            srcSet="/images/hero/hero-portrait-440.avif 440w, /images/hero/hero-portrait-660.avif 660w, /images/hero/hero-portrait-880.avif 880w"
            sizes="100vw"
          />
          <img
            src="/images/hero/hero-portrait-660.webp"
            srcSet="/images/hero/hero-portrait-440.webp 440w, /images/hero/hero-portrait-660.webp 660w, /images/hero/hero-portrait-880.webp 880w"
            sizes="100vw"
            alt={
              language === "en"
                ? "A flower-decked Telugu wedding mandapam beneath coconut palms, beside a Godavari canal at golden hour"
                : "గోదావరి కాలువ ఒడ్డున, కొబ్బరి తోటల మధ్య పూలతో అలంకరించిన తెలుగు పెళ్లి పందిరి"
            }
            width={880}
            height={1312}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>
      <div className="hero-section__veil" />
      <div className="hero-section__frame" aria-hidden="true" />
      <div className="hero-petals" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="hero-section__content">
        <div className={`hero-kicker${language === "te" ? " telugu" : ""}`}>
          <span className="hero-kicker__rule" aria-hidden="true" />
          <Sparkles size={12} strokeWidth={1.6} aria-hidden="true" />
          <span>{copy.heroEyebrow}</span>
          <span className="hero-kicker__rule" aria-hidden="true" />
        </div>

        <p className="hero-telugu" lang="te">
          {copy.heroTelugu}
        </p>

        <h1 className="hero-names" aria-label="Venu weds Sravya">
          <span>Venu</span>
          <span className="hero-weds" aria-hidden="true">
            weds
          </span>
          <span>Sravya</span>
        </h1>

        <p className={`hero-note${language === "te" ? " telugu" : ""}`}>{copy.heroNote}</p>

        <div className="hero-details">
          <span>
            <CalendarDays size={14} strokeWidth={1.7} aria-hidden="true" />
            {weddingDetails.dateShort[language]}
          </span>
          <i aria-hidden="true" />
          <span>
            <Clock3 size={14} strokeWidth={1.7} aria-hidden="true" />
            {copy.muhurthamLabel} · {weddingDetails.muhurthamShort[language]}
          </span>
          <i aria-hidden="true" />
          <span>
            <MapPin size={14} strokeWidth={1.7} aria-hidden="true" />
            {language === "en" ? "Konaseema, Andhra Pradesh" : "కోనసీమ, ఆంధ్రప్రదేశ్"}
          </span>
        </div>

        <div className="hero-countdown" role="group" aria-label={copy.countdownLabel}>
          <p className={`hero-countdown__label${language === "te" ? " telugu" : ""}`}>
            {countdown.isPast ? copy.countdownToday : copy.countdownLabel}
          </p>
          <div className="hero-countdown__values" aria-live="off">
            {values.map((value, index) => (
              <div className="countdown-unit" key={timeUnits[language][index]}>
                <span className="countdown-unit__value">{String(value).padStart(2, "0")}</span>
                <span className={`countdown-unit__label${language === "te" ? " telugu" : ""}`}>
                  {timeUnits[language][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-actions">
          <a className="button button--gold" href="#invitation">
            {copy.viewInvitation}
            <span aria-hidden="true">↘</span>
          </a>
          <button className="hero-share" type="button" onClick={onShare} aria-label={copy.shareWhatsapp} title={copy.shareWhatsapp}>
            <Share2 size={18} strokeWidth={1.7} aria-hidden="true" />
          </button>
        </div>
      </div>

      <a
        className="hero-scroll"
        href="#our-story"
        aria-label={language === "en" ? "Scroll to our story" : "మా పరిచయానికి వెళ్లండి"}
      >
        <span>{language === "en" ? "SCROLL TO DISCOVER" : "మా కథ"}</span>
        <span className="hero-scroll__icon">
          <ArrowDown size={14} aria-hidden="true" />
        </span>
      </a>

      <div className="hero-location" aria-hidden="true">
        GODAVARI DELTA <span>·</span> ANDHRA PRADESH <span>·</span> INDIA
      </div>
    </section>
  );
}
