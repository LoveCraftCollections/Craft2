"use client";

import { FormEvent, useState } from "react";
import { Check, Heart, Send, Sparkles } from "lucide-react";
import { pageCopy, type Language } from "@/data/wedding";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

interface RsvpWishesSectionProps {
  language: Language;
}

interface Wish {
  name: string;
  message: string;
  date: string;
}

interface RsvpResponse {
  name: string;
  phone: string;
  attendees: number;
  attending: boolean;
  message: string;
  submittedAt: string;
}

const startingWishes: Wish[] = [
  { name: "Ananya & Ravi", message: "May your home always sound like the Godavari at dawn — full of life, gentle joy and stories to share.", date: "With love" },
  { name: "Pedananna & Pedamma", message: "మీ ఇద్దరి జీవితాలు ప్రేమతో, నవ్వులతో, శుభసమృద్ధితో నిండాలని మనస్ఫూర్తిగా ఆశీర్వదిస్తున్నాం.", date: "ఆప్యాయతతో" },
  { name: "Siri", message: "Here’s to a lifetime of little adventures, long lunches and choosing each other every day. So happy for you!", date: "With love" },
];

export function RsvpWishesSection({ language }: RsvpWishesSectionProps) {
  const [wishes, setWishes] = useState<Wish[]>(startingWishes);
  const [rsvpResponse, setRsvpResponse] = useState<RsvpResponse | null>(null);
  const [rsvpSent, setRsvpSent] = useState(false);
  const [wishSent, setWishSent] = useState(false);
  const [rsvpError, setRsvpError] = useState("");
  const [wishError, setWishError] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no">("yes");
  const copy = pageCopy[language];

  const handleRsvp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("guestName") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    if (name.length < 2) {
      setRsvpError(language === "en" ? "Please enter your name." : "దయచేసి మీ పేరు నమోదు చేయండి.");
      return;
    }
    if (!/^\+?[0-9\s()-]{8,16}$/.test(phone)) {
      setRsvpError(language === "en" ? "Please enter a valid phone number." : "దయచేసి సరైన ఫోన్ నంబర్ నమోదు చేయండి.");
      return;
    }

    const response = {
      name,
      phone,
      attendees: attendance === "yes" ? Number(form.get("attendees") ?? 1) : 0,
      attending: attendance === "yes",
      message,
      submittedAt: new Date().toISOString(),
    };
    // Demo integration seam: replace this local dispatch with an API call when a backend is added.
    window.dispatchEvent(new CustomEvent("mana-pelli:rsvp", { detail: response }));
    setRsvpResponse(response);
    setRsvpError("");
    setRsvpSent(true);
    event.currentTarget.reset();
  };

  const handleWish = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("wishName") ?? "").trim();
    const message = String(form.get("wishMessage") ?? "").trim();
    if (name.length < 2 || message.length < 5) {
      setWishError(language === "en" ? "Add your name and a little more to your message." : "దయచేసి మీ పేరు, శుభాకాంక్షలను పూర్తి చేయండి.");
      return;
    }
    setWishes((current) => [{ name, message, date: language === "en" ? "Just now" : "ఇప్పుడే" }, ...current]);
    setWishError("");
    setWishSent(true);
    event.currentTarget.reset();
  };

  return (
    <section id="rsvp" className="rsvp-section section-pad">
      <div className="section-shell">
        <Reveal>
          <SectionHeading language={language} eyebrow={copy.rsvpEyebrow} title={copy.rsvpTitle} description={copy.rsvpText} />
        </Reveal>

        <div className="rsvp-grid">
          <Reveal className="rsvp-panel">
            <div className="rsvp-panel__top"><span className="rsvp-panel__icon"><Sparkles size={18} /></span><span className="rsvp-panel__tag">{language === "en" ? "A KIND REPLY BY 20 JANUARY" : "జనవరి 20 లోపు మీ సమాధానం తెలపండి"}</span></div>
            {rsvpSent ? (
              <div className="form-success" role="status">
                <span className="form-success__icon"><Check size={23} /></span>
                <h3>{language === "en" ? "We’ll save you a seat." : "మీ కోసం ఒక చోటు ఉంచుతాం."}</h3>
                <p>{language === "en" ? `Thank you, ${rsvpResponse?.name}. Our families are looking forward to seeing you in the grove.` : `${rsvpResponse?.name ?? ""} గారూ, మీ సమాధానానికి ధన్యవాదాలు. తోటలో మిమ్మల్ని కలుసుకోవాలని మా కుటుంబాలు ఎదురుచూస్తున్నాయి.`}</p>
                <button className="text-link" type="button" onClick={() => { setRsvpSent(false); setRsvpResponse(null); }}>{language === "en" ? "Update my response" : "నా సమాధానాన్ని మార్చండి"}<span aria-hidden="true">↗</span></button>
              </div>
            ) : (
              <form className="rsvp-form" onSubmit={handleRsvp} noValidate lang={language}>
                <div className="form-field">
                  <label htmlFor="guestName">{copy.guestName}<span>*</span></label>
                  <input id="guestName" name="guestName" type="text" autoComplete="name" placeholder={language === "en" ? "e.g. Ananya Rao" : "ఉదా: అనన్య రావు"} required minLength={2} />
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="phone">{copy.phone}<span>*</span></label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="attendees">{copy.guests}</label>
                    <select id="attendees" name="attendees" defaultValue="2" disabled={attendance === "no"}>
                      {[1, 2, 3, 4, 5, 6].map((number) => <option value={number} key={number}>{number} {language === "en" ? (number === 1 ? "guest" : "guests") : "మంది"}</option>)}
                    </select>
                  </div>
                </div>
                <fieldset className="attendance-fieldset">
                  <legend>{copy.attending}</legend>
                  <div className="attendance-options">
                    <label className={attendance === "yes" ? "attendance-option is-selected" : "attendance-option"}>
                      <input type="radio" name="attendance" value="yes" checked={attendance === "yes"} onChange={() => setAttendance("yes")} />
                      <span className="attendance-option__dot" />{copy.yes}
                    </label>
                    <label className={attendance === "no" ? "attendance-option is-selected" : "attendance-option"}>
                      <input type="radio" name="attendance" value="no" checked={attendance === "no"} onChange={() => setAttendance("no")} />
                      <span className="attendance-option__dot" />{copy.no}
                    </label>
                  </div>
                </fieldset>
                <div className="form-field">
                  <label htmlFor="message">{copy.wishesLabel}</label>
                  <textarea id="message" name="message" rows={2} placeholder={language === "en" ? "A little note for Venu & Sravya…" : "వేణు, శ్రావ్యలకు ఒక చిన్న సందేశం…"} />
                </div>
                {rsvpError ? <p className="form-error" role="alert">{rsvpError}</p> : null}
                <button className="button button--leaf rsvp-submit" type="submit">{copy.sendRsvp}<Send size={15} /></button>
                <p className="form-disclaimer">{copy.localNote}</p>
              </form>
            )}
          </Reveal>

          <Reveal className="wishes-panel" delay={0.1}>
            <div className="wishes-panel__header" lang={language}>
              <div><span className="wishes-panel__heart"><Heart size={18} /></span><h3>{copy.wishesTitle}</h3></div>
              <p>{copy.wishesText}</p>
            </div>
            <div className="wishes-list" aria-live="polite">
              {wishes.map((wish, index) => (
                <article className="wish-card" key={`${wish.name}-${index}`}>
                  <span className="wish-card__quote telugu" aria-hidden="true">“</span>
                  <p>{wish.message}</p>
                  <div><span className="wish-card__name">{wish.name}</span><span className="wish-card__date">{wish.date}</span></div>
                </article>
              ))}
            </div>
            <form className="wish-form" onSubmit={handleWish} noValidate lang={language}>
              <div className="wish-form__row">
                <input name="wishName" type="text" minLength={2} maxLength={40} placeholder={copy.wishName} aria-label={copy.wishName} required />
                <textarea name="wishMessage" rows={1} minLength={5} maxLength={240} placeholder={copy.wishMessage} aria-label={copy.wishMessage} required />
                <button type="submit" aria-label={copy.sendWish}><Send size={16} /></button>
              </div>
              {wishError ? <p className="form-error" role="alert">{wishError}</p> : null}
              {wishSent ? <p className="wish-success" role="status"><Check size={13} />{language === "en" ? "Your wish has been added." : "మీ శుభాకాంక్షలు చేర్చబడ్డాయి."}</p> : null}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
