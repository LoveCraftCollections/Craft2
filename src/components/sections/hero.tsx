"use client";

import Image from "next/image";
import { ArrowDown, CalendarDays, Clock3, MapPin, Sparkles } from "lucide-react";
import { weddingDetails, pageCopy, type Language } from "@/data/wedding";
import { useCountdown } from "@/hooks/use-countdown";
import type { CountdownValue } from "@/lib/countdown";

interface HeroProps {
  language: Language;
  initialCountdown: CountdownValue;
}

const timeUnits = {
  en: ["days", "hours", "minutes", "seconds"],
  te: ["రోజులు", "గంటలు", "నిమిషాలు", "సెకన్లు"],
} as const;

export function Hero({ language, initialCountdown }: HeroProps) {
  const countdown = useCountdown(weddingDetails.dateISO, initialCountdown);
  const copy = pageCopy[language];
  const values = [countdown.days, countdown.hours, countdown.minutes, countdown.seconds];

  return (
    <section id="home" className="hero-section">
      <Image className="hero-section__image" src="/images/konaseema-hero.webp" alt="A traditional wedding mandapam in a Konaseema coconut grove" fill priority sizes="100vw" />
      <div className="hero-section__veil" />
      <div className="hero-section__grain" aria-hidden="true" />
      <div className="hero-section__frame" aria-hidden="true" />
      <div className="hero-section__content">
        <div className={`hero-kicker${language === "te" ? " telugu" : ""}`} lang={language}>
          <span className="hero-kicker__rule" />
          <Sparkles size={13} strokeWidth={1.6} aria-hidden="true" />
          <span>{copy.heroEyebrow}</span>
          <span className="hero-kicker__rule" />
        </div>
        <p className="hero-telugu telugu" lang="te">{copy.heroTelugu}</p>
        <p className={`hero-note${language === "te" ? " telugu" : ""}`} lang={language}>{copy.heroNote}</p>
        <h1 className="hero-names" aria-label="Venu weds Sravya">
          <span>Venu</span>
          <span className="hero-weds">Weds</span>
          <span>Sravya</span>
        </h1>
        <div className="hero-details">
          <span lang={language}><CalendarDays size={15} strokeWidth={1.7} />{weddingDetails.date[language]}</span>
          <i aria-hidden="true" />
          <span lang={language}><Clock3 size={15} strokeWidth={1.7} />{weddingDetails.muhurtham[language]}</span>
          <i aria-hidden="true" />
          <span lang={language}><MapPin size={15} strokeWidth={1.7} />{language === "en" ? "Konaseema, Andhra Pradesh" : "కోనసీమ, ఆంధ్రప్రదేశ్"}</span>
        </div>
        <div className="hero-actions">
          <a className="button button--gold" href="#invitation" lang={language}>{language === "en" ? "Open the invitation" : "ఆహ్వానం చదవండి"}<span aria-hidden="true">↘</span></a>
          <span className="hero-caption" lang={language}>{copy.heroCaption}</span>
        </div>
        <div className="hero-countdown" role="group" aria-label={copy.countdownLabel}>
          <p className={`hero-countdown__label${language === "te" ? " telugu" : ""}`} lang={language}>{copy.countdownLabel}</p>
          <div className="hero-countdown__values" aria-live="off">
            {values.map((value, index) => (
              <div className="countdown-unit" key={timeUnits[language][index]}>
                <span className="countdown-unit__value">{String(countdown.isPast ? 0 : value).padStart(2, "0")}</span>
                <span className={`countdown-unit__label${language === "te" ? " telugu" : ""}`} lang={language}>{timeUnits[language][index]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <a className="hero-scroll" href="#our-story" aria-label={language === "en" ? "Scroll to our story" : "మా పరిచయానికి వెళ్లండి"}>
        <span>{language === "en" ? "SCROLL TO DISCOVER" : "మా కథ తెలుసుకోండి"}</span>
        <span className="hero-scroll__icon"><ArrowDown size={15} /></span>
      </a>
      <div className="hero-location">GODAVARI DELTA <span>·</span> ANDHRA PRADESH <span>·</span> INDIA</div>
    </section>
  );
}
