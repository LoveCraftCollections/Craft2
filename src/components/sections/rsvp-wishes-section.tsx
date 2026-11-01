"use client";

import { AlertCircle, Check, Heart, Send, Sparkles } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { pageCopy, type Language } from "@/data/wedding";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

interface RsvpWishesSectionProps {
  language: Language;
}

interface RsvpResponse {
  name: string;
  phone: string;
  attendees: number;
  attending: boolean;
  message: string;
  submittedAt: string;
}

interface Wish {
  name: string;
  message: string;
  date: string;
}

const startingWishes: Wish[] = [
  {
    name: "Ananya & Ravi",
    message: "May your home always sound like the Godavari at dawn — full of life, gentle joy and stories to share.",
    date: "With love",
  },
  {
    name: "Pedananna & Pedamma",
    message: "మీ ఇద్దరి జీవితాలు ప్రేమతో, నవ్వులతో, శుభసమృద్ధితో నిండాలని మనస్ఫూర్తిగా ఆశీర్వదిస్తున్నాం.",
    date: "ఆప్యాయతతో",
  },
  {
    name: "Siri",
    message: "Here’s to a lifetime of little adventures, long lunches and choosing each other every day. So happy for you!",
    date: "With love",
  },
];

export function RsvpWishesSection({ language }: RsvpWishesSectionProps) {
  const [wishes, setWishes] = useState<Wish[]>(startingWishes);
  const [rsvpResponse, setRsvpResponse] = useState<RsvpResponse | null>(null);
  const [rsvpSent, setRsvpSent] = useState(false);
  const [wishSent, setWishSent] = useState(false);
  const [rsvpError, setRsvpError] = useState<{ message: string; field: "name" | "phone" } | null>(null);
  const [wishError, setWishError] = useState("");
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const [attendance, setAttendance] = useState<"yes" | "no">("yes");
  const copy = pageCopy[language];

  const handleRsvp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("guestName") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (name.length < 2) {
      setRsvpError({ message: copy.formNameError, field: "name" });
      nameInputRef.current?.focus();
      return;
    }
    if (!/^\+?[0-9\s()-]{8,16}$/.test(phone)) {
      setRsvpError({ message: copy.formPhoneError, field: "phone" });
      phoneInputRef.current?.focus();
      return;
    }

    const response: RsvpResponse = {
      name,
      phone,
      attendees: attendance === "yes" ? Number(data.get("attendees") ?? 1) : 0,
      attending: attendance === "yes",
      message,
      submittedAt: new Date().toISOString(),
    };
    // Demo integration seam: replace this local dispatch with an API call when a backend is added.
    window.dispatchEvent(new CustomEvent("mana-pelli:rsvp", { detail: response }));
    setRsvpResponse(response);
    setRsvpError(null);
    setRsvpSent(true);
    form.reset();
  };

  const handleWish = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("wishName") ?? "").trim();
    const message = String(data.get("wishMessage") ?? "").trim();
    if (name.length < 2 || message.length < 5) {
      setWishError(copy.formWishError);
      return;
    }
    setWishes((current) => [{ name, message, date: language === "en" ? "Just now" : "ఇప్పుడే" }, ...current]);
    setWishError("");
    setWishSent(true);
    form.reset();
  };

  return (
    <section id="rsvp" className="rsvp-section section-pad">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            language={language}
            eyebrow={copy.rsvpEyebrow}
            title={copy.rsvpTitle}
            description={copy.rsvpText}
          />
        </Reveal>

        <div className="rsvp-grid">
          <Reveal className="rsvp-panel">
            <div className="rsvp-panel__top">
              <span className="rsvp-panel__icon" aria-hidden="true">
                <Sparkles size={17} />
              </span>
              <span className={`rsvp-panel__tag${language === "te" ? " telugu" : ""}`} lang={language}>
                {language === "en" ? "A KIND REPLY BY 20 JANUARY" : "జనవరి 20 లోపు మీ సమాధానం తెలపండి"}
              </span>
            </div>

            {rsvpSent ? (
              <div className="form-success" role="status">
                <span className="form-success__icon" aria-hidden="true">
                  <Check size={22} />
                </span>
                <h3 lang={language}>
                  {language === "en" ? "We’ll save you a seat." : "మీ కోసం ఒక చోటు ఉంచుతాం."}
                </h3>
                <p lang={language}>
                  {language === "en"
                    ? `Thank you, ${rsvpResponse?.name}. Our families are looking forward to seeing you in the grove.`
                    : `${rsvpResponse?.name ?? ""} గారూ, మీ సమాధానానికి ధన్యవాదాలు. తోటలో మిమ్మల్ని కలుసుకోవాలని మా కుటుంబాలు ఎదురుచూస్తున్నాయి.`}
                </p>
                <button
                  className="text-link"
                  type="button"
                  onClick={() => {
                    setRsvpSent(false);
                    setRsvpResponse(null);
                  }}
                >
                  {language === "en" ? "Update my response" : "నా సమాధానాన్ని మార్చండి"}
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            ) : (
              <form className="rsvp-form" onSubmit={handleRsvp} noValidate lang={language}>
                <div className="form-field">
                  <label htmlFor="guestName">
                    {copy.guestName}
                    <span aria-hidden="true">*</span>
                    <span className="sr-only">{copy.requiredField}</span>
                  </label>
                  <input
                    id="guestName"
                    name="guestName"
                    type="text"
                    autoComplete="name"
                    enterKeyHint="next"
                    maxLength={60}
                    placeholder={language === "en" ? "e.g. Ananya Rao" : "ఉదా: అనన్య రావు"}
                    required
                    minLength={2}
                    ref={nameInputRef}
                    aria-invalid={rsvpError?.field === "name" ? true : undefined}
                    aria-describedby={rsvpError?.field === "name" ? "rsvp-error" : undefined}
                    onChange={() => rsvpError?.field === "name" && setRsvpError(null)}
                  />
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="phone">
                      {copy.phone}
                      <span aria-hidden="true">*</span>
                      <span className="sr-only">{copy.requiredField}</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      enterKeyHint="next"
                      maxLength={18}
                      placeholder="+91 98765 43210"
                      required
                      ref={phoneInputRef}
                      aria-invalid={rsvpError?.field === "phone" ? true : undefined}
                      aria-describedby={rsvpError?.field === "phone" ? "rsvp-error" : undefined}
                      onChange={() => rsvpError?.field === "phone" && setRsvpError(null)}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="attendees">{copy.guests}</label>
                    <select id="attendees" name="attendees" defaultValue="2" disabled={attendance === "no"}>
                      {[1, 2, 3, 4, 5, 6].map((number) => (
                        <option value={number} key={number}>
                          {number} {language === "en" ? (number === 1 ? "guest" : "guests") : "మంది"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <fieldset className="attendance-fieldset">
                  <legend lang={language}>{copy.attending}</legend>
                  <div className="attendance-options">
                    <label
                      className={attendance === "yes" ? "attendance-option is-selected" : "attendance-option"}
                      lang={language}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value="yes"
                        checked={attendance === "yes"}
                        onChange={() => setAttendance("yes")}
                      />
                      <span className="attendance-option__dot" aria-hidden="true" />
                      {copy.yes}
                    </label>
                    <label
                      className={attendance === "no" ? "attendance-option is-selected" : "attendance-option"}
                      lang={language}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value="no"
                        checked={attendance === "no"}
                        onChange={() => setAttendance("no")}
                      />
                      <span className="attendance-option__dot" aria-hidden="true" />
                      {copy.no}
                    </label>
                  </div>
                </fieldset>

                <div className="form-field">
                  <label htmlFor="message" lang={language}>
                    {copy.wishesLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    maxLength={400}
                    placeholder={
                      language === "en" ? "A little note for Venu & Sravya…" : "వేణు, శ్రావ్యలకు ఒక చిన్న సందేశం…"
                    }
                  />
                </div>

                {rsvpError ? (
                  <p className="form-error" id="rsvp-error" role="alert">
                    <AlertCircle size={15} aria-hidden="true" />
                    {rsvpError.message}
                  </p>
                ) : null}

                <button className="button button--leaf rsvp-submit" type="submit">
                  {copy.sendRsvp}
                  <Send size={15} aria-hidden="true" />
                </button>
                <p className="form-disclaimer" lang={language}>
                  {copy.localNote}
                </p>
              </form>
            )}
          </Reveal>

          <Reveal className="wishes-panel" delay={0.06}>
            <div className="wishes-panel__header" lang={language}>
              <div>
                <span className="wishes-panel__heart" aria-hidden="true">
                  <Heart size={17} />
                </span>
                <h3 lang={language}>{copy.wishesTitle}</h3>
              </div>
              <p lang={language}>{copy.wishesText}</p>
            </div>

            <div className="wishes-list" aria-live="polite">
              {wishes.map((wish, index) => (
                <article className="wish-card" key={`${wish.name}-${index}`} lang={/[\u0C00-\u0C7F]/.test(wish.message) ? "te" : "en"}>
                  <span className="wish-card__quote" aria-hidden="true">
                    “
                  </span>
                  <p>{wish.message}</p>
                  <div>
                    <span className="wish-card__name">{wish.name}</span>
                    <span className="wish-card__date">{wish.date}</span>
                  </div>
                </article>
              ))}
            </div>

            <form className="wish-form" onSubmit={handleWish} noValidate lang={language}>
              <div className="wish-form__row">
                <input
                  name="wishName"
                  type="text"
                  autoComplete="name"
                  enterKeyHint="next"
                  minLength={2}
                  maxLength={40}
                  placeholder={copy.wishName}
                  aria-label={copy.wishName}
                  aria-invalid={wishError ? true : undefined}
                  aria-describedby={wishError ? "wish-error" : undefined}
                  onChange={() => wishError && setWishError("")}
                  required
                />
                <textarea
                  name="wishMessage"
                  className="wish-input"
                  rows={2}
                  minLength={5}
                  maxLength={240}
                  placeholder={copy.wishMessage}
                  aria-label={copy.wishMessage}
                  aria-invalid={wishError ? true : undefined}
                  aria-describedby={wishError ? "wish-error" : undefined}
                  onChange={() => wishError && setWishError("")}
                  required
                />
                <button type="submit" aria-label={copy.sendWish}>
                  <Send size={16} aria-hidden="true" />
                  <span className="wish-form__submit-label">{copy.sendWish}</span>
                </button>
              </div>
              {wishError ? (
                <p className="form-error" id="wish-error" role="alert">
                  <AlertCircle size={15} aria-hidden="true" />
                  {wishError}
                </p>
              ) : null}
              {wishSent ? (
                <p className="wish-success" role="status">
                  <Check size={13} aria-hidden="true" />
                  {language === "en" ? "Your wish has been added." : "మీ శుభాకాంక్షలు చేర్చబడ్డాయి."}
                </p>
              ) : null}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
