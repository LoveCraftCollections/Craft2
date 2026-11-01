import type { BilingualText } from "@/data/wedding";

export type GalleryCategory = "pre" | "decor" | "ceremony" | "family";

export interface GalleryImage {
  id: string;
  category: GalleryCategory;
  label: BilingualText;
  alt: BilingualText;
  src: string;
}

export const galleryCategories: { id: GalleryCategory | "all"; labelKey: "galleryAll" | "galleryPre" | "galleryDecor" | "galleryCeremony" | "galleryFamily" }[] = [
  { id: "all", labelKey: "galleryAll" },
  { id: "pre", labelKey: "galleryPre" },
  { id: "decor", labelKey: "galleryDecor" },
  { id: "ceremony", labelKey: "galleryCeremony" },
  { id: "family", labelKey: "galleryFamily" },
];

export const galleryImages: GalleryImage[] = [
  {
    id: "grove-together",
    category: "pre",
    label: { en: "Among the palms", te: "కొబ్బరితోటలో" },
    alt: { en: "Venu and Sravya in their Konaseema coconut grove", te: "కోనసీమ కొబ్బరితోటలో వేణు, శ్రావ్య" },
    src: "/images/couple-portrait.webp",
  },
  {
    id: "the-mandapam",
    category: "decor",
    label: { en: "The kobbarithota mandapam", te: "కొబ్బరితోట పందిరి" },
    alt: { en: "A jasmine and marigold wedding mandapam in a palm grove", te: "కొబ్బరితోటలో మల్లెలు, బంతులతో అలంకరించిన పెళ్లి పందిరి" },
    src: "/images/konaseema-hero.webp",
  },
  {
    id: "river-light",
    category: "pre",
    label: { en: "A familiar bend in the river", te: "గోదారి మలుపు" },
    alt: { en: "A quiet Godavari canal winding through coconut palms", te: "కొబ్బరితోటల మధ్య ప్రవహించే గోదావరి కాలువ" },
    src: "/images/konaseema-river.webp",
  },
  {
    id: "blessings",
    category: "ceremony",
    label: { en: "Blessings beneath the leaves", te: "ఆకుల పందిరిలో ఆశీస్సులు" },
    alt: { en: "A Telugu wedding ceremony beneath mango leaves and jasmine", te: "మామిడి ఆకులు, మల్లెల పందిరిలో తెలుగు వివాహ వేడుక" },
    src: "/images/mandapam-ceremony.webp",
  },
  {
    id: "sravya",
    category: "family",
    label: { en: "Sravya, our bride", te: "మన వధువు శ్రావ్య" },
    alt: { en: "Sravya in rust-red and gold Andhra silk", te: "ఎరుపు, బంగారు ఆంధ్ర పట్టు చీరలో శ్రావ్య" },
    src: "/images/sravya-portrait.webp",
  },
  {
    id: "venu",
    category: "family",
    label: { en: "Venu, our groom", te: "మన వరుడు వేణు" },
    alt: { en: "Venu in cream handloom and a green angavastram", te: "క్రీమ్ వస్త్రం, ఆకుపచ్చ అంగవస్త్రంలో వేణు" },
    src: "/images/venu-portrait.webp",
  },
  {
    id: "ritual-fire",
    category: "ceremony",
    label: { en: "A promise by the sacred fire", te: "అగ్ని సాక్షిగా ప్రమాణం" },
    alt: { en: "A traditional Andhra wedding ritual around a small sacred fire", te: "పవిత్ర అగ్ని చుట్టూ జరిగే ఆంధ్ర వివాహ ఆచారం" },
    src: "/images/mandapam-ceremony.webp",
  },
  {
    id: "the-feast",
    category: "decor",
    label: { en: "A leaf full of love", te: "ప్రేమతో నిండిన అరటి ఆకు" },
    alt: { en: "A traditional Andhra wedding feast on fresh banana leaves", te: "తాజా అరటి ఆకులపై సంప్రదాయ ఆంధ్ర పెళ్లి విందు" },
    src: "/images/banana-leaf-feast.webp",
  },
];
