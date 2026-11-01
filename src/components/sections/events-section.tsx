"use client";

import Image from "next/image";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { weddingEvents } from "@/data/events";
import { pageCopy, type Language } from "@/data/wedding";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

interface EventsSectionProps {
  language: Language;
}

export function EventsSection({ language }: EventsSectionProps) {
  const copy = pageCopy[language];

  return (
    <section id="events" className="events-section section-pad">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            language={language}
            eyebrow={copy.eventsEyebrow}
            title={copy.eventsTitle}
            description={copy.eventsText}
          />
        </Reveal>

        {/* On phones this is a single vertical thread; on desktop it becomes
            the alternating horizontal timeline. Same markup, different CSS. */}
        <div className="events-timeline">
          <div className="events-timeline__axis" aria-hidden="true">
            <span />
          </div>
          <ol className="events-timeline__list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {weddingEvents.map((event, index) => (
              <li key={event.id}>
                <Reveal className="event-row" delay={Math.min(index % 4, 3) * 0.05} amount={0.08}>
                  <span className="event-row__number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="event-row__photo">
                    <Image
                      src={event.image}
                      alt={event.imageAlt[language]}
                      fill
                      sizes="(max-width: 639px) 88px, 112px"
                      className="cover-image"
                    />
                  </div>
                  <div className="event-row__content">
                    <p className={`event-row__time${language === "te" ? " telugu" : ""}`} lang={language}>
                      <Clock3 size={12} aria-hidden="true" />
                      {event.time[language]}
                    </p>
                    <h3 lang={language}>{event.title[language]}</h3>
                    <p lang={language}>{event.description[language]}</p>
                  </div>
                  <span className="event-row__arrow" aria-hidden="true">
                    <ArrowUpRight size={16} />
                  </span>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <p className="events-footer-note" lang="te">
          ప్రతి క్షణం ఒక జ్ఞాపకం. ప్రతి జ్ఞాపకం మనదే.
        </p>
      </div>
    </section>
  );
}
