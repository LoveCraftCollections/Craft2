import type { BilingualText } from "@/data/wedding";

export interface WeddingTradition {
  number: string;
  title: BilingualText;
  description: BilingualText;
  image: string;
  imageAlt: BilingualText;
}

export const weddingTraditions: WeddingTradition[] = [
  {
    number: "01",
    title: { en: "Jeelakarra Bellam", te: "జీలకర్ర బెల్లం" },
    description: {
      en: "At the muhurtham, the couple place a paste of cumin and jaggery on each other’s heads. Bitter and sweet become one — just as two lives do.",
      te: "శుభముహూర్తంలో వధూవరులు జీలకర్ర, బెల్లం ముద్దను ఒకరి తలపై మరొకరు ఉంచుకుంటారు. తీపి, ఘాటు కలిసి జీవితంలోని ప్రతి అనుభవంలో తోడుంటామని చెబుతాయి.",
    },
    image: "/images/mandapam-ceremony.webp",
    imageAlt: { en: "The wedding ritual beneath flower garlands", te: "పూల మాలల మధ్య జరిగే వివాహ ఆచారం" },
  },
  {
    number: "02",
    title: { en: "Mangalyadharanam", te: "మాంగల్యధారణ" },
    description: {
      en: "Three knots on the mangalsutra mark a sacred bond: a promise between two people, and between two families who now walk together.",
      te: "మంగళసూత్రంలోని మూడు ముడులు ఇద్దరి మధ్య పవిత్ర బంధాన్ని సూచిస్తాయి — రెండు మనసులు, రెండు కుటుంబాలు ఇకపై కలసి నడిచే వాగ్దానం.",
    },
    image: "/images/konaseema-hero.webp",
    imageAlt: { en: "A mandapam decorated with mango leaves and jasmine", te: "మామిడి ఆకులు, మల్లెలతో అలంకరించిన పందిరి" },
  },
  {
    number: "03",
    title: { en: "Talambralu", te: "తలంబ్రాలు" },
    description: {
      en: "The couple shower each other with rice mixed with turmeric and flowers — a playful blessing for prosperity, patience and plenty of laughter.",
      te: "పసుపు కలిపిన అక్షింతలు, పూలతో ఒకరినొకరు ఆశీర్వదించుకుంటారు — శుభసమృద్ధి, సహనం, నవ్వులతో నిండిన జీవితానికి ఇది చిలిపి వాగ్దానం.",
    },
    image: "/images/couple-portrait.webp",
    imageAlt: { en: "A couple sharing a quiet moment in a palm grove", te: "కొబ్బరితోటలో ఆత్మీయంగా ఉన్న జంట" },
  },
  {
    number: "04",
    title: { en: "Saptapadi", te: "సప్తపది" },
    description: {
      en: "Seven steps around the sacred fire, each one a vow for a life of friendship, nourishment, courage, joy and lasting companionship.",
      te: "పవిత్ర అగ్ని చుట్టూ వేసే ఏడు అడుగులు — స్నేహం, పోషణ, ధైర్యం, ఆనందం, జీవితాంతం తోడుగా ఉండే వాగ్దానాలు.",
    },
    image: "/images/mandapam-ceremony.webp",
    imageAlt: { en: "Brass lamps and flowers at a village wedding", te: "గ్రామీణ పెళ్లిలో ఇత్తడి దీపాలు, పూలు" },
  },
  {
    number: "05",
    title: { en: "Appaginthalu", te: "అప్పగింతలు" },
    description: {
      en: "With a full heart, the bride’s family entrusts her to a new home. It is not a goodbye, but the beginning of a wider circle of love.",
      te: "నిండైన మనసుతో వధువును కొత్త ఇంటికి పంపే ఆచారం. ఇది వీడ్కోలు కాదు — ప్రేమ బంధం మరింత విస్తరించే కొత్త ఆరంభం.",
    },
    image: "/images/sravya-portrait.webp",
    imageAlt: { en: "Sravya in traditional Andhra silk", te: "సంప్రదాయ ఆంధ్ర పట్టు చీరలో శ్రావ్య" },
  },
];
