"use client";

import { ArrowUp, Flower2, Heart, Share2 } from "lucide-react";
import { weddingDetails, pageCopy, type Language } from "@/data/wedding";

interface SiteFooterProps {
  language: Language;
  onShare: () => void;
}

export function SiteFooter({ language, onShare }: SiteFooterProps) {
  const copy = pageCopy[language];

  const backToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="site-footer" lang={language}>
      <div className="site-footer__toran" aria-hidden="true"><span /><Flower2 /><span /><Flower2 /><span /><Flower2 /><span /></div>
      <div className="site-footer__main">
        <a className="footer-brand" href="#home" aria-label="Mana Pelli home"><span><Flower2 size={19} /></span><b>Mana Pelli</b><small className="telugu">మన పెళ్లి</small></a>
        <p className="site-footer__names">Venu <i>&</i> Sravya</p>
        <p className="site-footer__telugu telugu">{weddingDetails.tagline}</p>
        <p className="site-footer__details">{weddingDetails.date[language]}<span>·</span>{weddingDetails.venue.name}<span>·</span>Konaseema</p>
        <p className="site-footer__closing">{copy.footerNote}</p>
        <div className="site-footer__actions">
          <button className="footer-share" type="button" onClick={onShare}><Share2 size={15} />{language === "en" ? "Share our invitation" : "మా ఆహ్వానాన్ని పంచుకోండి"}</button>
          <button className="footer-top" type="button" onClick={backToTop} aria-label={copy.backTop}><span>{copy.backTop}</span><ArrowUp size={16} /></button>
        </div>
      </div>
      <div className="site-footer__bottom"><span>MADE WITH <Heart size={10} fill="currentColor" /> IN KONASEEMA</span><span>© 2027 MANA PELLI · {language === "en" ? "A DEMO WEDDING INVITATION" : "డెమో పెళ్లి ఆహ్వానం"}</span></div>
    </footer>
  );
}
