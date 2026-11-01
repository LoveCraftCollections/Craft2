"use client";

import Image from "next/image";
import { Leaf, Soup, Utensils } from "lucide-react";
import { weddingMenu } from "@/data/food";
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
          <div className="feast-eyebrow"><Utensils size={15} />{copy.foodEyebrow}</div>
          <h2>{copy.foodTitle}<span className="telugu">{language === "en" ? "పెళ్లి పందిరి విందు" : "పెళ్లి పందిరి విందు"}</span></h2>
          <p>{copy.foodText}</p>
          <div className="feast-rule"><span /><Leaf size={19} strokeWidth={1.4} /><span /></div>
          <div className="feast-serving-note"><Soup size={17} /><span>{language === "en" ? "Served fresh on a banana leaf" : "అరటి ఆకుపై తాజాగా వడ్డిస్తాం"}</span></div>
        </Reveal>
        <Reveal className="feast-visual" delay={0.12}>
          <div className="feast-photo">
            <Image
              src="/images/banana-leaf-feast.webp"
              alt={language === "en" ? "A colourful Andhra wedding feast served on fresh banana leaves" : "తాజా అరటి ఆకుపై వడ్డించిన రంగుల ఆంధ్ర పెళ్లి విందు"}
              fill
              sizes="(max-width: 900px) 95vw, 58vw"
              className="cover-image"
            />
            <div className="feast-photo__label"><span>THE ANDHRA THALI</span><small>మా పెళ్లి విందు</small></div>
          </div>
          <div className="feast-menu">
            <h3>{copy.menuTitle}</h3>
            <div className="feast-menu__items">
              {weddingMenu.map((dish, index) => (
                <div className="dish-row" key={dish.name.en}>
                  <span className="dish-row__index">0{index + 1}</span>
                  <span className="dish-row__name">{dish.name[language]}<small>{dish.note[language]}</small></span>
                  <span className="dish-row__leaf" aria-hidden="true"><Leaf size={13} /></span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
