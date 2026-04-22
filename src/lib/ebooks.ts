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
    fileName: "ebook-calma.pdf",
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
    fileName: "ebook-amor-propio.pdf",
    benefits: [
      "Actividades de reflexión y autoconocimiento",
      "Ejercicios para fortalecer la autoestima",
      "Enfoque práctico y cercano",
    ],
  },
];

export function getEbookBySlug(slug: string) {
  return EBOOKS.find((ebook) => ebook.slug === slug);
}