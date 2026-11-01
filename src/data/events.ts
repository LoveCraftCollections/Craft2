import type { BilingualText } from "@/data/wedding";

export interface WeddingEvent {
  id: string;
  title: BilingualText;
  time: BilingualText;
  description: BilingualText;
  image: string;
  imageAlt: BilingualText;
}

export const weddingEvents: WeddingEvent[] = [
  {
    id: "nischitartham",
    title: { en: "Nischitartham", te: "నిశ్చితార్థం" },
    time: { en: "13 Feb · 6:30 PM", te: "ఫిబ్రవరి 13 · సాయంత్రం 6:30" },
    description: {
      en: "An intimate evening where two families exchange blessings, gifts and the promise of a new beginning.",
      te: "రెండు కుటుంబాలు ఆశీస్సులు, కానుకలు పంచుకుంటూ కొత్త బంధానికి శ్రీకారం చుట్టే ఆత్మీయ సాయంత్రం.",
    },
    image: "/images/couple-portrait.webp",
    imageAlt: { en: "Venu and Sravya in a coconut grove", te: "కొబ్బరితోటలో వేణు, శ్రావ్య" },
  },
  {
    id: "pasupu",
    title: { en: "Pasupu Function", te: "పసుపు వేడుక" },
    time: { en: "14 Feb · 5:30 AM", te: "ఫిబ్రవరి 14 · ఉదయం 5:30" },
    description: {
      en: "A joyful turmeric blessing, with women of the family singing old songs for the bride and groom.",
      te: "ఇంటివారంతా పాత పాటలు పాడుతూ వధూవరులకు పసుపుతో మంగళస్నానం చేయించే ఆనంద వేడుక.",
    },
    image: "/images/sravya-portrait.webp",
    imageAlt: { en: "Sravya wearing a traditional silk saree", te: "సంప్రదాయ పట్టు చీరలో శ్రావ్య" },
  },
  {
    id: "mangala-snanam",
    title: { en: "Mangala Snanam", te: "మంగళ స్నానం" },
    time: { en: "14 Feb · 6:30 AM", te: "ఫిబ్రవరి 14 · ఉదయం 6:30" },
    description: {
      en: "A ritual bath in the soft morning light, a blessing for a fresh, auspicious start.",
      te: "శుభోదయపు వెలుగులో పవిత్ర స్నానం — కొత్త, శుభకరమైన ఆరంభానికి పెద్దల ఆశీర్వాదం.",
    },
    image: "/images/konaseema-river.webp",
    imageAlt: { en: "A quiet canal through the Konaseema palms", te: "కోనసీమ తోటల మధ్య నిశ్శబ్ద కాలువ" },
  },
  {
    id: "edurukolu",
    title: { en: "Edurukolu", te: "ఎదురుకోలు" },
    time: { en: "14 Feb · 8:45 AM", te: "ఫిబ్రవరి 14 · ఉదయం 8:45" },
    description: {
      en: "The bride’s family welcomes the groom with music, flowers and the warmth of a homecoming.",
      te: "సంగీతం, పూలు, ఆప్యాయతలతో వధువు కుటుంబం వరుడికి ఇచ్చే పండుగలాంటి స్వాగతం.",
    },
    image: "/images/konaseema-hero.webp",
    imageAlt: { en: "A flower-decked wedding mandapam among coconut palms", te: "కొబ్బరితోటలో పూలతో అలంకరించిన పెళ్లి పందిరి" },
  },
  {
    id: "jeelakarra-bellam",
    title: { en: "Jeelakarra Bellam", te: "జీలకర్ర బెల్లం" },
    time: { en: "14 Feb · 10:15 AM", te: "ఫిబ్రవరి 14 · ఉదయం 10:15" },
    description: {
      en: "At the sacred muhurtham, cumin and jaggery are placed together — a promise to stay united through every flavour of life.",
      te: "శుభముహూర్తంలో జీలకర్ర, బెల్లం కలిపి ఒకరిపై ఒకరు ఉంచుకుంటూ జీవితంలోని ప్రతి రుచిలో తోడుగా ఉంటామని చేసే ప్రమాణం.",
    },
    image: "/images/mandapam-ceremony.webp",
    imageAlt: { en: "A Telugu wedding ritual beneath the mandapam", te: "పెళ్లి పందిరిలో తెలుగు వివాహ ఆచారం" },
  },
  {
    id: "mangalyadharanam",
    title: { en: "Mangalyadharanam", te: "మాంగల్యధారణ" },
    time: { en: "14 Feb · 10:30 AM", te: "ఫిబ్రవరి 14 · ఉదయం 10:30" },
    description: {
      en: "Three sacred knots, tied to the rhythm of blessings and the joyful notes of mangala vadyam.",
      te: "మంగళ వాద్యాల నడుమ, పెద్దల ఆశీస్సులతో మూడు మంగళసూత్రపు ముడులు వేసే పవిత్ర ఘట్టం.",
    },
    image: "/images/mandapam-ceremony.webp",
    imageAlt: { en: "The sacred Telugu wedding mandapam", te: "పవిత్రమైన తెలుగు పెళ్లి పందిరి" },
  },
  {
    id: "talambralu",
    title: { en: "Talambralu", te: "తలంబ్రాలు" },
    time: { en: "14 Feb · 10:45 AM", te: "ఫిబ్రవరి 14 · ఉదయం 10:45" },
    description: {
      en: "A shower of turmeric-tinted rice, laughter and wishes for a life filled with abundance.",
      te: "పసుపు కలిపిన అక్షింతల జల్లులో నవ్వులు, ఆనందం, శుభసమృద్ధి నిండిన జీవితానికి ఆశీస్సులు.",
    },
    image: "/images/couple-portrait.webp",
    imageAlt: { en: "A tender moment in a Konaseema grove", te: "కోనసీమ తోటలో ఒక ఆప్యాయ క్షణం" },
  },
  {
    id: "appaginthalu",
    title: { en: "Appaginthalu", te: "అప్పగింతలు" },
    time: { en: "14 Feb · 4:30 PM", te: "ఫిబ్రవరి 14 · సాయంత్రం 4:30" },
    description: {
      en: "A tender family farewell as Sravya steps into a new home, carrying every blessing with her.",
      te: "అన్ని ఆశీస్సులను వెంట తీసుకుని శ్రావ్య కొత్త ఇంటికి అడుగుపెట్టే భావోద్వేగమైన కుటుంబ వీడ్కోలు.",
    },
    image: "/images/venu-portrait.webp",
    imageAlt: { en: "Venu in traditional cream and green attire", te: "సంప్రదాయ వస్త్రధారణలో వేణు" },
  },
];
