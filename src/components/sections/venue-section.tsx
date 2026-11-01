"use client";

import Image from "next/image";
import { CarFront, MapPin, Navigation, Trees } from "lucide-react";
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
          <SectionHeading
            language={language}
            eyebrow={copy.venueEyebrow}
            title={copy.venueTitle}
            description={copy.venueText}
          />
        </Reveal>

        <div className="venue-grid">
          <Reveal className="venue-photo" delay={0.04}>
            <Image
              src="/images/konaseema-river.webp"
              alt={
                language === "en"
                  ? "The Godavari delta: a canal winding through Konaseema coconut palms"
                  : "కోనసీమ కొబ్బరితోటల మధ్య గోదావరి కాలువ"
              }
              fill
              sizes="(max-width: 767px) 100vw, 55vw"
              className="cover-image"
            />
            <div className="venue-photo__shade" />
            <div className="venue-photo__badge" aria-hidden="true">
              <Trees size={17} strokeWidth={1.4} />
              <span>
                THE KOBBARITHOTA
                <br />
                <b>KONASEEMA</b>
              </span>
            </div>
            <p className="venue-photo__caption">
              {language === "en"
                ? "A little closer to home, a little closer to the river."
                : "ఇంటికి కొంచెం దగ్గరగా, గోదారికి మరింత దగ్గరగా."}
            </p>
            <div className="venue-photo__pin" aria-hidden="true">
              <MapPin size={19} strokeWidth={1.5} />
            </div>
          </Reveal>

          <Reveal className="venue-info" delay={0.1}>
            <p className={`venue-info__eyebrow${language === "te" ? " telugu" : ""}`} lang={language}>
              <MapPin size={14} aria-hidden="true" />
              {language === "en" ? "OUR CELEBRATION ADDRESS" : "మా వేడుక చిరునామా"}
            </p>
            <h3 lang={language}>{weddingDetails.venue.name}</h3>
            <p className="venue-info__address">{weddingDetails.venue.address}</p>

            <a
              className="button button--leaf venue-info__map"
              href={weddingDetails.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              lang={language}
            >
              <Navigation size={16} aria-hidden="true" />
              {copy.venueDirections}
            </a>

            <div className="venue-notes">
              <h4 lang={language}>{copy.venueNoteTitle}</h4>
              <div className="venue-note">
                <span aria-hidden="true">
                  <CarFront size={16} />
                </span>
                <p lang={language}>{copy.venueParking}</p>
              </div>
              <div className="venue-note">
                <span aria-hidden="true">
                  <Trees size={16} />
                </span>
                <p lang={language}>{copy.venueArrival}</p>
              </div>
            </div>
            <p className="venue-info__telugu" lang="te">
              గోదావరి ఒడిలో.. మా కోనసీమలో..
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
