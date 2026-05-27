export type DigitalProduct = {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: "ARS";
  fileName: string;
};

export const PRODUCTS: Record<string, DigitalProduct> = {
  "vida-en-orden": {
    id: "vida-en-orden",
    title: "Vida en Orden - Plantilla Digital",
    description: "Plantilla digital de finanzas personales",
    price: 18900,
    currency: "ARS",
    fileName: "vida-en-orden.pdf",
  },

  "ebook-calma": {
    id: "ebook-calma",
    title: "Ebook Calma Interior",
    description: "Guía práctica para bajar el estrés y ordenar tu mente",
    price: 14900,
    currency: "ARS",
    fileName: "ebook-calma.pdf",
  },

  "ebook-amor-propio": {
    id: "ebook-amor-propio",
    title: "Ebook Amor Propio",
    description: "Un recorrido para fortalecer tu autoestima y bienestar",
    price: 14900,
    currency: "ARS",
    fileName: "ebookybonus-amor-propio.zip",
  },
};