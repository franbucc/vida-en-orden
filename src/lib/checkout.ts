import { PRODUCTS } from "./products";

type CheckoutSource =
  | "navbar"
  | "hero"
  | "benefits"
  | "offer_section"
  | "anywhere";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function trackInitiateCheckout(productId: string, source: CheckoutSource) {
  const product = PRODUCTS[productId];
  if (!product || typeof window.fbq !== "function") return;

  window.fbq("track", "InitiateCheckout", {
    content_ids: [product.id],
    content_name: product.title,
    content_type: "product",
    currency: product.currency,
    value: product.price,
    num_items: 1,
    source,
  });
}

export async function startCheckout(
  productId: string,
  source: CheckoutSource
) {
  const product = PRODUCTS[productId];

  if (!product) {
    throw new Error("Producto no encontrado");
  }

  trackInitiateCheckout(productId, source);

  const response = await fetch("/api/create-preference", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
      source,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || "No se pudo iniciar el checkout");
  }

  const checkoutUrl = data.init_point;

  if (!checkoutUrl) {
    throw new Error("Mercado Pago no devolvió una URL de checkout");
  }

  window.location.href = checkoutUrl;
}