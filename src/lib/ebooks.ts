export type Ebook = {
  id: string;
  productId: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  oldPrice?: number;
  currency: "ARS";
  cover: string;
  fileName: string;
  benefits: string[];
};

export const EBOOKS: Ebook[] = [
  {
    id: "ebook-calma",
    productId: "ebook-calma",
    slug: "ebook-calma",
    title: "Ebook Calma Interior",
    shortDescription: "Guía práctica para bajar el estrés y ordenar tu mente.",
    longDescription:
      "Un ebook pensado para ayudarte a recuperar calma, bajar la ansiedad y construir hábitos más livianos para tu día a día.",
    price: 14900,
    oldPrice: 18900,
    currency: "ARS",
    cover: "/ebook-calma.png",
    fileName: "como-dejar-de-pensar.pdf",
    benefits: [
      "Ejercicios simples para aplicar todos los días",
      "Herramientas para bajar el estrés",
      "Contenido claro, práctico y fácil de seguir",
    ],
  },
  {
    id: "ebook-amor-propio",
    productId: "ebook-amor-propio",
    slug: "ebook-amor-propio",
    title: "Ebook Amor Propio",
    shortDescription: "Un recorrido para fortalecer tu autoestima y bienestar.",
    longDescription:
      "Este ebook reúne herramientas y ejercicios para trabajar en tu amor propio, mejorar tu vínculo con vos misma y construir más seguridad personal.",
    price: 14900,
    oldPrice: 21900,
    currency: "ARS",
    cover: "/ebook-amor-propio.png",
    fileName: "ebookybonus-amor-propio.pdf",
    benefits: [
      "Actividades de reflexión y autoconocimiento",
      "Ejercicios para fortalecer la autoestima",
      "Enfoque práctico y cercano",
    ],
  },
  {
  id: "ebook-abraza",
  productId: "ebook-abraza",
  slug: "ebook-abraza",
  title: "Abraza a tu niña interior",
  shortDescription:
    "Una guía para sanar heridas emocionales y volver a elegirte desde el amor propio.",
  longDescription:
    "Un ebook pensado para reconectar con tu historia, abrazar tu niña interior y empezar a sanar desde una mirada más amorosa, consciente y compasiva.",
  price: 14900,
  oldPrice: 31000,
  currency: "ARS",
  cover: "/abraza-6.webp",
  fileName: "ebookybonus-abraza.pdf",
  benefits: [
    "Ejercicios para reconectar con tu historia",
    "Herramientas para trabajar heridas emocionales",
    "Contenido claro, sensible y fácil de aplicar",
  ],
}
];

export function getEbookBySlug(slug: string) {
  return EBOOKS.find((ebook) => ebook.slug === slug);
}