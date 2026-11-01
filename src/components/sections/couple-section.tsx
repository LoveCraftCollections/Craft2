"use client";

import Image from "next/image";
import { Flower2, Heart, Leaf } from "lucide-react";
import { weddingDetails, pageCopy, type Language } from "@/data/wedding";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

interface CoupleSectionProps {
  language: Language;
}

export function CoupleSection({ language }: CoupleSectionProps) {
  const copy = pageCopy[language];

  return (
    <section className="couple-section section-pad" id="our-story">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            language={language}
            eyebrow={copy.introEyebrow}
            title={copy.introTitle}
            description={copy.introText}
          />
        </Reveal>

        <div className="couple-story-grid">
          <Reveal className="couple-feature-photo">
            <div className="couple-feature-photo__frame">
              <Image
                src="/images/couple-portrait.webp"
                alt={language === "en" ? "Venu and Sravya in the shade of a Konaseema coconut grove" : "కోనసీమ కొబ్బరితోటలో వేణు, శ్రావ్య"}
                fill
                sizes="(max-width: 900px) 90vw, 44vw"
                className="cover-image"
              />
              <span className="couple-feature-photo__caption"><Flower2 size={15} /> Konaseema, always</span>
              <span className="couple-feature-photo__stamp telugu">ప్రేమతో</span>
            </div>
            <div className="couple-feature-photo__leaf" aria-hidden="true"><Leaf size={42} strokeWidth={1} /></div>
          </Reveal>

          <Reveal className="couple-story-copy" delay={0.08}>
            <div className="story-mark"><Heart size={16} strokeWidth={1.5} /><span>Est. in a coconut grove</span></div>
            <h3>{language === "en" ? "A story that feels like home" : "మన ఇంటిలా అనిపించే పరిచయం"}</h3>
            <p>{language === "en"
              ? "Between the soft green of the palms and the slow rhythm of the Godavari, two families found a little more to celebrate. Venu and Sravya’s story is made of small kindnesses, shared traditions and a place they both call home."
              : "కొబ్బరితోటల పచ్చదనం, గోదావరి నది నెమ్మది ప్రవాహం మధ్య రెండు కుటుంబాలకు సంబరపడటానికి మరో కారణం దొరికింది. వేణు, శ్రావ్యల కథ చిన్న చిన్న ఆప్యాయతలు, పంచుకున్న సంప్రదాయాలు, తమ ఊరిపై ప్రేమతో నిండింది."}</p>
            <div className="couple-profiles">
              <ProfileCard
                name={weddingDetails.bride.fullName}
                label={copy.brideLabel}
                parents={language === "en" ? weddingDetails.bride.parents : weddingDetails.bride.parentsTe}
                introduction={weddingDetails.bride.introduction[language]}
                photo={weddingDetails.bride.photo}
                alt={language === "en" ? "Sravya in traditional Andhra silk" : "సంప్రదాయ ఆంధ్ర పట్టు చీరలో శ్రావ్య"}
              />
              <ProfileCard
                name={weddingDetails.groom.fullName}
                label={copy.groomLabel}
                parents={language === "en" ? weddingDetails.groom.parents : weddingDetails.groom.parentsTe}
                introduction={weddingDetails.groom.introduction[language]}
                photo={weddingDetails.groom.photo}
                alt={language === "en" ? "Venu in cream handloom and a green angavastram" : "క్రీమ్ వస్త్రం, ఆకుపచ్చ అంగవస్త్రంలో వేణు"}
              />
            </div>
            <p className="couple-telugu-line telugu">{weddingDetails.tagline}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

interface ProfileCardProps {
  name: string;
  label: string;
  parents: string;
  introduction: string;
  photo: string;
  alt: string;
}

function ProfileCard({ name, label, parents, introduction, photo, alt }: ProfileCardProps) {
  return (
    <article className="profile-card">
      <div className="profile-card__portrait">
        <Image src={photo} alt={alt} fill sizes="100px" className="cover-image" />
      </div>
      <div className="profile-card__copy">
        <span className="profile-card__label">{label}</span>
        <h4>{name}</h4>
        <p className="profile-card__parents">{parents}</p>
        <p className="profile-card__bio">{introduction}</p>
      </div>
    </article>
  );
}
