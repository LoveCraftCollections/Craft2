"use client";

import { useEffect, useState } from "react";
import { Flower2, Menu, Music2, Pause, X } from "lucide-react";
import { pageCopy, type Language } from "@/data/wedding";
import { useAmbientAudio } from "@/hooks/use-ambient-audio";

interface SiteHeaderProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

const links = [
  { href: "#our-story", key: "navStory" as const },
  { href: "#invitation", key: "navInvitation" as const },
  { href: "#events", key: "navEvents" as const },
  { href: "#venue", key: "navVenue" as const },
  { href: "#gallery", key: "navGallery" as const },
];

export function SiteHeader({ language, onLanguageChange }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isPlaying: musicOn, toggle: onToggleMusic } = useAmbientAudio();
  const copy = pageCopy[language];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const changeLanguage = () => onLanguageChange(language === "en" ? "te" : "en");
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`} lang={language}>
      <div className="site-header__inner">
        <a className="brand" href="#home" aria-label="Mana Pelli home" onClick={closeMenu}>
          <span className="brand__mark"><Flower2 size={20} strokeWidth={1.5} aria-hidden="true" /></span>
          <span className="brand__text">
            <span className="brand__name">Mana Pelli</span>
            <span className="brand__telugu">మన పెళ్లి</span>
          </span>
        </a>

        <nav className="desktop-nav" aria-label={language === "en" ? "Main navigation" : "ప్రధాన నావిగేషన్"} lang={language}>
          {links.map((link) => <a key={link.href} href={link.href} lang={language}>{copy[link.key]}</a>)}
        </nav>

        <div className="header-actions">
          <button className="language-toggle" type="button" onClick={changeLanguage} aria-label={language === "en" ? "తెలుగు లో చూడండి" : "View in English"}>
            <span className={language === "en" ? "language-toggle__active" : ""}>EN</span>
            <span className="language-toggle__divider">/</span>
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
            {musicOn ? <Pause size={16} /> : <Music2 size={16} />}
            <span className="sr-only">{musicOn ? copy.musicOn : copy.musicOff}</span>
          </button>
          <a className="header-rsvp" href="#rsvp" lang={language}>{copy.rsvp}<span aria-hidden="true">↗</span></a>
          <button
            className="icon-button mobile-menu-toggle"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? (language === "en" ? "Close menu" : "మెను మూసివేయండి") : (language === "en" ? "Open menu" : "మెను తెరవండి")}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      <div className={`mobile-nav${menuOpen ? " mobile-nav--open" : ""}`} aria-hidden={!menuOpen} lang={language}>
        <nav aria-label={language === "en" ? "Mobile navigation" : "మొబైల్ నావిగేషన్"}>
          {links.map((link, index) => (
            <a key={link.href} href={link.href} style={{ transitionDelay: `${index * 45}ms` }} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
              <span>0{index + 1}</span>{copy[link.key]}
            </a>
          ))}
          <a className="mobile-nav__rsvp" href="#rsvp" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>{copy.rsvp}<span>↗</span></a>
          <button className="mobile-nav__music" type="button" onClick={onToggleMusic}>
            {musicOn ? <Pause size={16} /> : <Music2 size={16} />}
            {musicOn ? copy.musicOn : copy.musicOff}
          </button>
        </nav>
        <p className="mobile-nav__tagline telugu" lang="te">{"మన సంప్రదాయం.. మన పెళ్లి.. మన ఆనందం!"}</p>
      </div>
    </header>
  );
}
