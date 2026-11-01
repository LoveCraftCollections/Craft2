"use client";

import { ArrowDownRight, Flower2, Heart, Leaf, Sparkles } from "lucide-react";
import { weddingDetails, pageCopy, type Language } from "@/data/wedding";
import { Reveal } from "@/components/ui/reveal";

interface InvitationSectionProps {
  language: Language;
  onShare: () => void;
}

export function InvitationSection({ language, onShare }: InvitationSectionProps) {
  const copy = pageCopy[language];

  return (
    <section id="invitation" className="invitation-section section-pad">
      <div className="invitation-section__palm invitation-section__palm--left" aria-hidden="true"><Leaf /></div>
      <div className="invitation-section__palm invitation-section__palm--right" aria-hidden="true"><Leaf /></div>
      <Reveal className="invitation-card">
        <div className="invitation-card__inner">
          <div className="invitation-card__topline"><span /><Flower2 size={22} strokeWidth={1.2} /><span /></div>
          <p className="invitation-card__eyebrow">{copy.invitationEyebrow}</p>
          <p className="invitation-card__telugu telugu">శ్రీరస్తు శుభమస్తు</p>
          <h2>{copy.invitationTitle}</h2>
          <p className="invitation-card__inviter telugu">
            {language === "en"
              ? "శ్రీ రాఘవరావు & శ్రీమతి లక్ష్మీదేవి\nశ్రీ సత్యనారాయణమూర్తి & శ్రీమతి పద్మావతి"
              : "శ్రీ రాఘవరావు & శ్రీమతి లక్ష్మీదేవి\nశ్రీ సత్యనారాయణమూర్తి & శ్రీమతి పద్మావతి"}
          </p>
          <p className="invitation-card__message">{copy.invitationText}</p>
          <div className="invitation-card__names">
            <span>Venu</span>
            <span className="invitation-card__ampersand">&</span>
            <span>Sravya</span>
          </div>
          <p className="invitation-card__families">
            {language === "en"
              ? "Kandukuri family  ·  Duvvuri family"
              : "కందుకూరి కుటుంబం  ·  దువ్వూరి కుటుంబం"}
          </p>
          <div className="invitation-card__details">
            <div><span>{language === "en" ? "THE AUSPICIOUS DAY" : "శుభదినం"}</span><strong>{weddingDetails.date[language]}</strong></div>
            <i />
            <div><span>{language === "en" ? "MUHURTHAM" : "ముహూర్తం"}</span><strong>{weddingDetails.muhurtham[language]}</strong></div>
            <i />
            <div><span>{language === "en" ? "AT" : "వేదిక"}</span><strong>{weddingDetails.venue.name}</strong></div>
          </div>
          <p className="invitation-card__closing telugu">{language === "en" ? "మీ రాకతో మా ఆనందం పరిపూర్ణమవుతుంది" : "మీ రాకతో మా ఆనందం పరిపూర్ణమవుతుంది"}</p>
          <p className="invitation-card__small">{copy.invitationClosing}</p>
          <div className="invitation-card__bottomline"><span /><Sparkles size={17} strokeWidth={1.3} /><span /></div>
        </div>
        <div className="invitation-card__seal"><Heart size={14} fill="currentColor" /></div>
      </Reveal>
      <div className="invitation-actions">
        <button className="text-link text-link--light" type="button" onClick={onShare}>{language === "en" ? "Share this invitation on WhatsApp" : "వాట్సాప్‌లో ఆహ్వానం పంపండి"}<ArrowDownRight size={16} /></button>
        <a className="text-link text-link--light" href="#events">{language === "en" ? "See the wedding schedule" : "వేడుకల వివరాలు చూడండి"}<ArrowDownRight size={16} /></a>
      </div>
    </section>
  );
}
