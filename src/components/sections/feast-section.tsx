"use client";

import Image from "next/image";
import { Leaf, Soup, Utensils } from "lucide-react";
import { feastPhotos, weddingMenu } from "@/data/food";
import { pageCopy, type Language } from "@/data/wedding";
import { Reveal } from "@/components/ui/reveal";

interface FeastSectionProps {
  language: Language;
}

export function FeastSection({ language }: FeastSectionProps) {
  const copy = pageCopy[language];

  return (
    <section id="feast" className="feast-section section-pad">
      <div className="feast-section__leaf-shape" aria-hidden="true" />
      <div className="section-shell feast-shell">
        <Reveal className="feast-intro">
          <p className={`feast-eyebrow${language === "te" ? " telugu" : ""}`} lang={language}>
            <Utensils size={14} aria-hidden="true" />
            {copy.foodEyebrow}
          </p>
          <h2 lang={language}>
            {copy.foodTitle}
            <span lang="te">{language === "en" ? "పెళ్లి పందిరి విందు" : "పెళ్లి పందిరి విందు"}</span>
          </h2>
          <p lang={language}>{copy.foodText}</p>
          <div className="feast-rule" aria-hidden="true">
            <span />
            <Leaf size={17} strokeWidth={1.4} />
            <span />
          </div>
          <p className="feast-serving-note" lang={language}>
            <Soup size={16} aria-hidden="true" />
            {language === "en" ? "Served fresh on a banana leaf" : "అరటి ఆకుపై తాజాగా వడ్డిస్తాం"}
          </p>
        </Reveal>

        <Reveal className="feast-visual" delay={0.08}>
          <div className="feast-gallery" role="group" aria-label={copy.foodGalleryTitle}>
            {feastPhotos.map((photo) => (
              <figure className="feast-tile" key={photo.id}>
                <Image
                  src={photo.image}
                  alt={photo.alt[language]}
                  fill
                  sizes="(max-width: 359px) 92vw, (max-width: 899px) 46vw, 26vw"
                  className="cover-image"
                />
                <figcaption className={`feast-tile__label${language === "te" ? " telugu" : ""}`} lang={language}>
                  {photo.label[language]}
                  <small aria-hidden="true">{language === "en" ? photo.label.te : photo.label.en}</small>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="feast-menu">
            <h3 lang={language}>{copy.menuTitle}</h3>
            <div className="feast-menu__items">
              {weddingMenu.map((dish, index) => (
                <div className="dish-row" key={dish.name.en}>
                  <span className="dish-row__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="dish-row__name" lang={language}>
                    {dish.name[language]}
                    <small>{dish.note[language]}</small>
                  </span>
                  <span className="dish-row__leaf" aria-hidden="true">
                    <Leaf size={12} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
