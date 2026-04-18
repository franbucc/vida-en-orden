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
};