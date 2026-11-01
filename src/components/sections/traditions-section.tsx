"use client";

import Image from "next/image";
import { ArrowUpRight, Flower2 } from "lucide-react";
import { weddingTraditions } from "@/data/traditions";
import { pageCopy, type Language } from "@/data/wedding";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

interface TraditionsSectionProps {
  language: Language;
}

export function TraditionsSection({ language }: TraditionsSectionProps) {
  const copy = pageCopy[language];

  return (
    <section id="traditions" className="traditions-section section-pad">
      <div className="section-shell">
        <Reveal>
          <SectionHeading language={language} eyebrow={copy.traditionsEyebrow} title={copy.traditionsTitle} description={copy.traditionsText} />
        </Reveal>
        <div className="traditions-grid">
          {weddingTraditions.map((tradition, index) => (
            <Reveal key={tradition.number} className={`tradition-card${index === 0 ? " tradition-card--feature" : ""}`} delay={(index % 3) * 0.07} amount={0.16}>
              <div className="tradition-card__image">
                <Image src={tradition.image} alt={tradition.imageAlt[language]} fill sizes="(max-width: 700px) 90vw, 28vw" className="cover-image" />
                <span className="tradition-card__number">{tradition.number}</span>
                <span className="tradition-card__icon"><Flower2 size={17} strokeWidth={1.3} /></span>
              </div>
              <div className="tradition-card__copy">
                <h3>{tradition.title[language]}</h3>
                <p>{tradition.description[language]}</p>
                <span className={`tradition-card__translation${language === "en" ? " tradition-card__translation--telugu" : " tradition-card__translation--english"}`} lang={language === "en" ? "te" : "en"}>{tradition.description[language === "en" ? "te" : "en"]}</span>
              </div>
              <span className="tradition-card__arrow" aria-hidden="true"><ArrowUpRight size={16} /></span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
