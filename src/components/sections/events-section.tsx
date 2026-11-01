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
          <SectionHeading language={language} eyebrow={copy.eventsEyebrow} title={copy.eventsTitle} description={copy.eventsText} />
        </Reveal>
        <div className="events-timeline">
          <div className="events-timeline__axis" aria-hidden="true"><span /></div>
          {weddingEvents.map((event, index) => (
            <Reveal key={event.id} className={`event-row${index % 2 === 1 ? " event-row--offset" : ""}`} delay={(index % 4) * 0.06} amount={0.12}>
              <span className="event-row__number">{String(index + 1).padStart(2, "0")}</span>
              <div className="event-row__photo">
                <Image src={event.image} alt={event.imageAlt[language]} fill sizes="(max-width: 640px) 82px, 120px" className="cover-image" />
              </div>
              <div className="event-row__content">
                <p className="event-row__time"><Clock3 size={13} />{event.time[language]}</p>
                <h3>{event.title[language]}</h3>
                <p>{event.description[language]}</p>
              </div>
              <span className="event-row__arrow" aria-hidden="true"><ArrowUpRight size={16} /></span>
            </Reveal>
          ))}
        </div>
        <div className="events-footer-note telugu">{language === "en" ? "ప్రతి క్షణం ఒక జ్ఞాపకం. ప్రతి జ్ఞాపకం మనదే." : "ప్రతి క్షణం ఒక జ్ఞాపకం. ప్రతి జ్ఞాపకం మనదే."}</div>
      </div>
    </section>
  );
}
