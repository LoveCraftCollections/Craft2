"use client";

import Image from "next/image";
import { Flower2 } from "lucide-react";
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
          <SectionHeading
            language={language}
            eyebrow={copy.traditionsEyebrow}
            title={copy.traditionsTitle}
            description={copy.traditionsText}
          />
        </Reveal>

        <div className="traditions-grid">
          {weddingTraditions.map((tradition, index) => (
            <Reveal
              key={tradition.number}
              className={`tradition-card${index === 0 ? " tradition-card--feature" : ""}`}
              delay={Math.min(index % 3, 2) * 0.05}
              amount={0.12}
            >
              <div className="tradition-card__image">
                <Image
                  src={tradition.image}
                  alt={tradition.imageAlt[language]}
                  fill
                  sizes="(max-width: 639px) 92vw, (max-width: 899px) 46vw, 30vw"
                  className="cover-image"
                />
                <span className="tradition-card__number" aria-hidden="true">
                  {tradition.number}
                </span>
                <span className="tradition-card__icon" aria-hidden="true">
                  <Flower2 size={15} strokeWidth={1.3} />
                </span>
              </div>
              <div className="tradition-card__copy">
                <h3 lang={language}>{tradition.title[language]}</h3>
                <p lang={language}>{tradition.description[language]}</p>
                <span
                  className={`tradition-card__translation${
                    language === "en" ? " tradition-card__translation--telugu" : " tradition-card__translation--english"
                  }`}
                  lang={language === "en" ? "te" : "en"}
                >
                  {tradition.description[language === "en" ? "te" : "en"]}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
