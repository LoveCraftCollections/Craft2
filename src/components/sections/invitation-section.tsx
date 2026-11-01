"use client";

import { CalendarPlus, Flower2, Heart, Leaf, Share2, Sparkles } from "lucide-react";
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
      <div className="invitation-section__palm invitation-section__palm--left" aria-hidden="true">
        <Leaf />
      </div>
      <div className="invitation-section__palm invitation-section__palm--right" aria-hidden="true">
        <Leaf />
      </div>

      <div className="section-shell">
        <Reveal>
          <div className="invitation-card" lang={language}>
            <div className="invitation-card__inner">
              <div className="invitation-card__topline" aria-hidden="true">
                <span />
                <Flower2 size={20} strokeWidth={1.2} />
                <span />
              </div>
              <p className="invitation-card__eyebrow">{copy.invitationEyebrow}</p>
              <p className="invitation-card__telugu" lang="te">
                శ్రీరస్తు శుభమస్తు
              </p>
              <h2 lang={language}>{copy.invitationTitle}</h2>
              <p className="invitation-card__inviter" lang="te">
                {"శ్రీ రాఘవరావు & శ్రీమతి లక్ష్మీదేవి\nశ్రీ సత్యనారాయణమూర్తి & శ్రీమతి పద్మావతి"}
              </p>
              <p className="invitation-card__message" lang={language}>
                {copy.invitationText}
              </p>
              <div className="invitation-card__names">
                <span>Venu</span>
                <span className="invitation-card__ampersand" aria-hidden="true">
                  &
                </span>
                <span>Sravya</span>
              </div>
              <p className="invitation-card__families" lang={language}>
                {language === "en"
                  ? "Kandukuri family  ·  Duvvuri family"
                  : "కందుకూరి కుటుంబం  ·  దువ్వూరి కుటుంబం"}
              </p>
              <div className="invitation-card__details">
                <div>
                  <span lang={language}>{language === "en" ? "THE AUSPICIOUS DAY" : "శుభదినం"}</span>
                  <strong lang={language}>{weddingDetails.date[language]}</strong>
                </div>
                <i aria-hidden="true" />
                <div>
                  <span lang={language}>{language === "en" ? "MUHURTHAM" : "ముహూర్తం"}</span>
                  <strong lang={language}>{weddingDetails.muhurtham[language]}</strong>
                </div>
                <i aria-hidden="true" />
                <div>
                  <span lang={language}>{language === "en" ? "AT" : "వేదిక"}</span>
                  <strong lang={language}>{weddingDetails.venue.name}</strong>
                </div>
              </div>
              <p className="invitation-card__closing" lang="te">
                మీ రాకతో మా ఆనందం పరిపూర్ణమవుతుంది
              </p>
              <p className="invitation-card__small" lang={language}>
                {copy.invitationClosing}
              </p>
              <div className="invitation-card__bottomline" aria-hidden="true">
                <span />
                <Sparkles size={15} strokeWidth={1.3} />
                <span />
              </div>
            </div>
            <div className="invitation-card__seal" aria-hidden="true">
              <Heart size={13} fill="currentColor" />
            </div>
          </div>
        </Reveal>

        <div className="invitation-actions">
          <button className="button button--gold button--full" type="button" onClick={onShare} lang={language}>
            <Share2 size={15} aria-hidden="true" />
            {copy.shareWhatsapp}
          </button>
          <a className="button button--ghost button--full" href="#events" lang={language}>
            {language === "en" ? "See the wedding schedule" : "వేడుకల వివరాలు"}
            <span aria-hidden="true">↘</span>
          </a>
          <a
            className="text-link text-link--light invitation-actions__calendar"
            href={weddingDetails.calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            lang={language}
          >
            <CalendarPlus size={15} aria-hidden="true" />
            {copy.addToCalendar}
          </a>
        </div>
      </div>
    </section>
  );
}
