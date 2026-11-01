import type { ReactNode } from "react";
import type { Language } from "@/data/wedding";

interface SectionHeadingProps {
  language: Language;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  ornament?: ReactNode;
}

export function SectionHeading({
  language,
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  ornament,
}: SectionHeadingProps) {
  const telugu = language === "te";
  return (
    <div className={`section-heading section-heading--${align} section-heading--${tone}`}>
      <div className="section-heading__eyebrow" lang={language}>
        <span className="eyebrow-line" />
        <span>{eyebrow}</span>
        <span className="eyebrow-line" />
      </div>
      <h2 className={`section-heading__title${telugu ? " telugu" : ""}`} lang={language}>{title}</h2>
      {description ? <p className={`section-heading__description${telugu ? " telugu" : ""}`} lang={language}>{description}</p> : null}
      {ornament ? <div className="section-heading__ornament">{ornament}</div> : null}
    </div>
  );
}
