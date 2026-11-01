"use client";

import Image from "next/image";
import { ArrowUpRight, CarFront, MapPin, Navigation, Trees } from "lucide-react";
import { weddingDetails, pageCopy, type Language } from "@/data/wedding";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

interface VenueSectionProps {
  language: Language;
}

export function VenueSection({ language }: VenueSectionProps) {
  const copy = pageCopy[language];

  return (
    <section id="venue" className="venue-section section-pad">
      <div className="section-shell">
        <Reveal>
          <SectionHeading language={language} eyebrow={copy.venueEyebrow} title={copy.venueTitle} description={copy.venueText} />
        </Reveal>
        <div className="venue-grid">
          <Reveal className="venue-photo" delay={0.06}>
            <Image
              src="/images/konaseema-river.webp"
              alt={language === "en" ? "The Godavari delta: a canal winding through Konaseema coconut palms" : "కోనసీమ కొబ్బరితోటల మధ్య గోదావరి కాలువ"}
              fill
              sizes="(max-width: 900px) 100vw, 60vw"
              className="cover-image"
            />
            <div className="venue-photo__shade" />
            <div className="venue-photo__badge"><Trees size={20} strokeWidth={1.4} /><span>THE KOBBARITHOTA<br /><b>KONASEEMA</b></span></div>
            <div className="venue-photo__caption">A little closer to home, a little closer to the river.</div>
            <div className="venue-photo__pin"><MapPin size={22} strokeWidth={1.4} /></div>
          </Reveal>
          <Reveal className="venue-info" delay={0.15}>
            <div className="venue-info__eyebrow"><MapPin size={15} /> {language === "en" ? "OUR CELEBRATION ADDRESS" : "మా వేడుక చిరునామా"}</div>
            <h3>{weddingDetails.venue.name}</h3>
            <p className="venue-info__address">{weddingDetails.venue.address}</p>
            <a className="button button--leaf venue-info__map" href={weddingDetails.mapsUrl} target="_blank" rel="noreferrer">
              <Navigation size={16} />{copy.venueDirections}<ArrowUpRight size={15} />
            </a>
            <div className="venue-notes">
              <h4>{copy.venueNoteTitle}</h4>
              <div className="venue-note"><span><CarFront size={17} /></span><p>{copy.venueParking}</p></div>
              <div className="venue-note"><span><Trees size={17} /></span><p>{copy.venueArrival}</p></div>
            </div>
            <p className="venue-info__telugu telugu">గోదావరి ఒడిలో.. మా కోనసీమలో..</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
