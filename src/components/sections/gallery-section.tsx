"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { galleryCategories, galleryImages, type GalleryCategory } from "@/data/gallery";
import { pageCopy, type Language } from "@/data/wedding";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

interface GallerySectionProps {
  language: Language;
}

export function GallerySection({ language }: GallerySectionProps) {
  const [category, setCategory] = useState<GalleryCategory | "all">("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const copy = pageCopy[language];
  const filteredImages = category === "all" ? galleryImages : galleryImages.filter((image) => image.category === category);
  const selectedImage = selectedIndex === null ? null : filteredImages[selectedIndex];

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowRight") setSelectedIndex((current) => current === null ? null : (current + 1) % filteredImages.length);
      if (event.key === "ArrowLeft") setSelectedIndex((current) => current === null ? null : (current - 1 + filteredImages.length) % filteredImages.length);
    };
    document.body.classList.add("lightbox-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("lightbox-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedIndex, filteredImages.length]);

  const selectCategory = (newCategory: GalleryCategory | "all") => {
    setCategory(newCategory);
    setSelectedIndex(null);
  };

  return (
    <section id="gallery" className="gallery-section section-pad">
      <div className="section-shell">
        <Reveal>
          <SectionHeading language={language} eyebrow={copy.galleryEyebrow} title={copy.galleryTitle} description={copy.galleryText} />
        </Reveal>
        <div className="gallery-filter" role="group" aria-label={language === "en" ? "Filter gallery by category" : "వర్గం ఆధారంగా చిత్రాలు చూడండి"}>
          {galleryCategories.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={category === item.id}
              lang={language}
              className={category === item.id ? "gallery-filter__button is-active" : "gallery-filter__button"}
              onClick={() => selectCategory(item.id)}
            >
              {copy[item.labelKey]}
            </button>
          ))}
        </div>
        <motion.div layout className="gallery-grid">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.button
                layout
                key={image.id}
                className={`gallery-item gallery-item--${index % 6}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`${language === "en" ? "Open photo" : "చిత్రం తెరవండి"}: ${image.label[language]}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28 }}
              >
                <Image src={image.src} alt={image.alt[language]} fill sizes="(max-width: 700px) 50vw, 32vw" className="cover-image" />
                <span className="gallery-item__shade" />
                <span className="gallery-item__label" lang={language}>{image.label[language]}<b aria-hidden="true">↗</b></span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage ? (
          <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={selectedImage.label[language]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedIndex(null); }}>
            <button className="lightbox__close" type="button" aria-label={language === "en" ? "Close gallery" : "చిత్రాలను మూసివేయండి"} onClick={() => setSelectedIndex(null)}><X /></button>
            <button className="lightbox__arrow lightbox__arrow--left" type="button" aria-label={language === "en" ? "Previous photo" : "మునుపటి చిత్రం"} onClick={() => setSelectedIndex((selectedIndex! - 1 + filteredImages.length) % filteredImages.length)}><ChevronLeft /></button>
            <div className="lightbox__image-wrap">
              <Image src={selectedImage.src} alt={selectedImage.alt[language]} fill sizes="90vw" className="lightbox__image" priority />
              <div className="lightbox__caption">{selectedImage.label[language]} <span>{String(selectedIndex! + 1).padStart(2, "0")} / {String(filteredImages.length).padStart(2, "0")}</span></div>
            </div>
            <button className="lightbox__arrow lightbox__arrow--right" type="button" aria-label={language === "en" ? "Next photo" : "తర్వాతి చిత్రం"} onClick={() => setSelectedIndex((selectedIndex! + 1) % filteredImages.length)}><ChevronRight /></button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
