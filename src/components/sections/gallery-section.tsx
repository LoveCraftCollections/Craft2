"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const copy = pageCopy[language];

  const filteredImages =
    category === "all" ? galleryImages : galleryImages.filter((image) => image.category === category);
  const selectedImage = selectedIndex === null ? null : filteredImages[selectedIndex];

  const close = useCallback(() => {
    setSelectedIndex(null);
    lastTriggerRef.current?.focus();
  }, []);

  const step = useCallback(
    (direction: 1 | -1) => {
      setSelectedIndex((current) => {
        if (current === null) return current;
        return (current + direction + filteredImages.length) % filteredImages.length;
      });
    },
    [filteredImages.length],
  );

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.body.classList.add("lightbox-open");
    window.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 60);
    return () => {
      document.body.classList.remove("lightbox-open");
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [selectedIndex, close, step]);

  const selectCategory = (newCategory: GalleryCategory | "all") => {
    setCategory(newCategory);
    setSelectedIndex(null);
  };

  return (
    <section id="gallery" className="gallery-section section-pad">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            language={language}
            eyebrow={copy.galleryEyebrow}
            title={copy.galleryTitle}
            description={copy.galleryText}
          />
        </Reveal>

        <div
          className="gallery-filter"
          role="group"
          aria-label={language === "en" ? "Filter photos by category" : "వర్గం ఆధారంగా చిత్రాలు"}
        >
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

        <div className="gallery-grid">
          {filteredImages.map((image, index) => (
            <button
              key={image.id}
              className={`gallery-item${index === 0 ? " gallery-item--0" : ""}`}
              type="button"
              onClick={(event) => {
                lastTriggerRef.current = event.currentTarget;
                setSelectedIndex(index);
              }}
              aria-label={`${language === "en" ? "Open photo" : "చిత్రం తెరవండి"}: ${image.label[language]}`}
            >
              <Image
                src={image.src}
                alt={image.alt[language]}
                fill
                sizes="(max-width: 767px) 46vw, 32vw"
                className="cover-image"
                loading="lazy"
              />
              <span className="gallery-item__shade" />
              <span className={`gallery-item__label${language === "te" ? " telugu" : ""}`} lang={language}>
                {image.label[language]}
                <b aria-hidden="true">↗</b>
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectedImage ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.label[language]}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div className="lightbox__bar">
            <span className="lightbox__count">
              {String((selectedIndex ?? 0) + 1).padStart(2, "0")} / {String(filteredImages.length).padStart(2, "0")}
            </span>
            <button
              ref={closeButtonRef}
              className="lightbox__close"
              type="button"
              aria-label={copy.photoClose}
              onClick={close}
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <div
            className="lightbox__stage"
            onTouchStart={(event) => {
              const touch = event.touches[0];
              touchStart.current = { x: touch.clientX, y: touch.clientY };
            }}
            onTouchEnd={(event) => {
              const start = touchStart.current;
              if (!start) return;
              const touch = event.changedTouches[0];
              const deltaX = touch.clientX - start.x;
              const deltaY = touch.clientY - start.y;
              touchStart.current = null;
              if (Math.abs(deltaX) > 46 && Math.abs(deltaX) > Math.abs(deltaY)) {
                step(deltaX < 0 ? 1 : -1);
              }
            }}
          >
            <div className="lightbox__image-wrap">
              <Image
                key={selectedImage.id}
                src={selectedImage.src}
                alt={selectedImage.alt[language]}
                fill
                sizes="(max-width: 899px) 96vw, 80vw"
                className="lightbox__image"
                priority
              />
            </div>
          </div>

          <p className={`lightbox__caption${language === "te" ? " telugu" : ""}`} lang={language}>
            {selectedImage.label[language]}
            <span className="lightbox__hint">{copy.swipeHint}</span>
          </p>

          <div className="lightbox__controls">
            <button className="lightbox__arrow" type="button" aria-label={copy.photoPrev} onClick={() => step(-1)}>
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <button className="lightbox__arrow" type="button" aria-label={copy.photoNext} onClick={() => step(1)}>
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
