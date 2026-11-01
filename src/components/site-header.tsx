"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Flower2, Menu, Music2, Pause, Share2, X } from "lucide-react";
import { pageCopy, type Language } from "@/data/wedding";
import { useAmbientAudio } from "@/hooks/use-ambient-audio";

interface SiteHeaderProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  onShare: () => void;
}

const desktopLinks = [
  { href: "#our-story", key: "navStory" as const },
  { href: "#invitation", key: "navInvitation" as const },
  { href: "#events", key: "navEvents" as const },
  { href: "#venue", key: "navVenue" as const },
  { href: "#gallery", key: "navGallery" as const },
];

const menuLinks = [
  { href: "#home", key: "navHome" as const },
  { href: "#our-story", key: "navStory" as const },
  { href: "#invitation", key: "navInvitation" as const },
  { href: "#events", key: "navEvents" as const },
  { href: "#venue", key: "navVenue" as const },
  { href: "#gallery", key: "navGallery" as const },
];

export function SiteHeader({ language, onLanguageChange, onShare }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isPlaying: musicOn, toggle: onToggleMusic } = useAmbientAudio();
  const copy = pageCopy[language];
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus(), 120);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [menuOpen]);

  useEffect(() => () => document.body.classList.remove("menu-open"), []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const changeLanguage = () => onLanguageChange(language === "en" ? "te" : "en");
  const headerClass = [
    "site-header",
    scrolled ? "site-header--scrolled" : "",
    menuOpen ? "site-header--menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClass} lang={language}>
      <div className="site-header__inner">
        <a className="brand" href="#home" aria-label="Mana Pelli — home" onClick={closeMenu}>
          <span className="brand__mark">
            <Flower2 size={18} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <span className="brand__text">
            <span className="brand__name">Mana Pelli</span>
            <span className="brand__telugu">మన పెళ్లి</span>
          </span>
        </a>

        <nav className="desktop-nav" aria-label={language === "en" ? "Main navigation" : "ప్రధాన నావిగేషన్"}>
          {desktopLinks.map((link) => (
            <a key={link.href} href={link.href} lang={language}>
              {copy[link.key]}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="language-toggle"
            type="button"
            onClick={changeLanguage}
            aria-label={language === "en" ? copy.switchToTelugu : copy.switchToEnglish}
          >
            <span className={language === "en" ? "language-toggle__active" : ""}>EN</span>
            <span className="language-toggle__divider" aria-hidden="true">
              /
            </span>
            <span className={`telugu-inline${language === "te" ? " language-toggle__active" : ""}`}>తె</span>
          </button>

          <button
            className="icon-button music-toggle"
            type="button"
            onClick={onToggleMusic}
            aria-label={musicOn ? copy.musicOn : copy.musicOff}
            aria-pressed={musicOn}
            title={musicOn ? copy.musicOn : copy.musicOff}
          >
            {musicOn ? <Pause size={15} aria-hidden="true" /> : <Music2 size={15} aria-hidden="true" />}
          </button>

          <a className="header-rsvp" href="#rsvp">
            {copy.rsvp}
            <span aria-hidden="true">↗</span>
          </a>

          <button
            ref={menuButtonRef}
            className="icon-button mobile-menu-toggle"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="site-menu"
        ref={menuRef}
        className="site-menu"
        data-open={menuOpen ? "true" : "false"}
        aria-hidden={!menuOpen}
        lang={language}
      >
        <p className={`site-menu__intro${language === "te" ? " telugu" : ""}`}>{copy.menuIntro}</p>

        <nav aria-label={language === "en" ? "Sections" : "విభాగాలు"}>
          <ul className="site-menu__list">
            {menuLinks.map((link, index) => (
              <li key={link.href}>
                <a
                  ref={index === 0 ? firstLinkRef : undefined}
                  className={`site-menu__link${language === "te" ? " telugu" : ""}`}
                  href={link.href}
                  onClick={closeMenu}
                  tabIndex={menuOpen ? 0 : -1}
                  style={{ transitionDelay: menuOpen ? `${80 + index * 45}ms` : "0ms" }}
                >
                  <span className="site-menu__index">0{index + 1}</span>
                  {copy[link.key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-menu__footer">
          <a
            className="site-menu__rsvp"
            href="#rsvp"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
            lang={language}
          >
            {copy.rsvp}
            <span aria-hidden="true">↗</span>
          </a>
          <div className="site-menu__row">
            <button className="site-menu__pill" type="button" onClick={changeLanguage} tabIndex={menuOpen ? 0 : -1}>
              <span aria-hidden="true">అ</span>
              {language === "en" ? "తెలుగులో" : "English"}
            </button>
            <button
              className="site-menu__pill"
              type="button"
              onClick={onToggleMusic}
              aria-pressed={musicOn}
              tabIndex={menuOpen ? 0 : -1}
            >
              {musicOn ? <Pause size={14} aria-hidden="true" /> : <Music2 size={14} aria-hidden="true" />}
              {musicOn ? copy.musicOn : copy.musicOff}
            </button>
            <button className="site-menu__pill" type="button" onClick={onShare} tabIndex={menuOpen ? 0 : -1}>
              <Share2 size={14} aria-hidden="true" />
              {copy.shareWhatsapp}
            </button>
          </div>
          <p className="site-menu__tagline" lang="te">
            మన సంప్రదాయం.. మన పెళ్లి.. మన ఆనందం!
          </p>
        </div>
      </div>
    </header>
  );
}
