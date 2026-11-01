import type { BilingualText } from "@/data/wedding";

export const weddingMenu: { name: BilingualText; note: BilingualText }[] = [
  { name: { en: "Pulihora", te: "పులిహోర" }, note: { en: "Tangy tamarind rice", te: "చింతపండు పులుపుతో" } },
  { name: { en: "Garelu", te: "గారెలు" }, note: { en: "Crisp, golden vadas", te: "కరకరలాడే మినప గారెలు" } },
  { name: { en: "Pappu", te: "పప్పు" }, note: { en: "Slow-cooked dal, a little ghee", te: "నెయ్యి పరిమళంతో కందిపప్పు" } },
  { name: { en: "Avakaya", te: "ఆవకాయ" }, note: { en: "Our beloved mango pickle", te: "మనసుకు దగ్గరైన మామిడి పచ్చడి" } },
  { name: { en: "Bobbatlu", te: "బొబ్బట్లు" }, note: { en: "Soft, sweet lentil-stuffed flatbread", te: "తీపి పూర్ణంతో మెత్తని బొబ్బట్లు" } },
  { name: { en: "Pootharekulu", te: "పూతరేకులు" }, note: { en: "Delicate paper-thin sweet", te: "సన్నని పొరలతో గోదావరి తీపి" } },
  { name: { en: "Paramannam", te: "పరమాన్నం" }, note: { en: "A festive jaggery payasam", te: "బెల్లం పరిమళంతో పండుగ పాయసం" } },
];

export interface FeastPhoto {
  id: string;
  image: string;
  alt: BilingualText;
  label: BilingualText;
}

/** The mobile-first "vindhu bhojanam" photo grid — four square tiles, two per row. */
export const feastPhotos: FeastPhoto[] = [
  {
    id: "vindhu",
    image: "/images/vindhu-bhojanam.webp",
    alt: {
      en: "A traditional Andhra wedding feast served on a banana leaf with pulihora, garelu, dal and payasam",
      te: "అరటి ఆకుపై పులిహోర, గారెలు, పప్పు, పాయసంతో వడ్డించిన ఆంధ్ర పెళ్లి విందు",
    },
    label: { en: "The full leaf", te: "నిండు ఆకు" },
  },
  {
    id: "bobbatlu",
    image: "/images/bobbatlu.webp",
    alt: {
      en: "A warm stack of bobbatlu with melted ghee, jaggery and jasmine on a banana leaf",
      te: "నెయ్యి, బెల్లం, మల్లెలతో అరటి ఆకుపై వేడి బొబ్బట్ల కుప్ప",
    },
    label: { en: "Bobbatlu & ghee", te: "బొబ్బట్లు, నెయ్యి" },
  },
  {
    id: "paramannam",
    image: "/images/paramannam.webp",
    alt: {
      en: "Paramannam payasam in a brass bowl with cashews, raisins and saffron",
      te: "జీడిపప్పు, ఎండుద్రాక్ష, కుంకుమపువ్వుతో ఇత్తడి గిన్నెలో పరమాన్నం",
    },
    label: { en: "Paramannam", te: "పరమాన్నం" },
  },
  {
    id: "leaf-feast",
    image: "/images/banana-leaf-feast.webp",
    alt: {
      en: "A colourful Andhra wedding meal spread across fresh banana leaves",
      te: "తాజా అరటి ఆకులపై రంగుల ఆంధ్ర పెళ్లి విందు",
    },
    label: { en: "The last handful", te: "చివరి ముద్ద" },
  },
];
