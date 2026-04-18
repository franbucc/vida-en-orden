import { MercadoPagoConfig, Preference } from "mercadopago";

const PRODUCTS = {
  "vida-en-orden": {
    id: "vida-en-orden",
    title: "Vida en Orden - Plantilla Digital",
    description: "Plantilla digital de finanzas personales",
    price: 18900,
    currency: "ARS",
  },
} as const;

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      return res.status(500).json({ error: "Falta MP_ACCESS_TOKEN" });
    }

    const { productId, source } = req.body || {};
    const product = PRODUCTS[productId as keyof typeof PRODUCTS];

    if (!product) {
      return res.status(400).json({ error: "Producto inválido" });
    }

    const client = new MercadoPagoConfig({ accessToken });
    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            id: product.id,
            title: product.title,
            description: product.description,
            quantity: 1,
            currency_id: product.currency,
            unit_price: product.price,
          },
        ],
        back_urls: {
          success: `${process.env.APP_URL}/gracias`,
          failure: `${process.env.APP_URL}/gracias`,
          pending: `${process.env.APP_URL}/gracias`,
        },
        auto_return: "approved",
        external_reference: `${product.id}|${source}|${Date.now()}`,
      },
    });

    return res.status(200).json({
      id: response.id,
      init_point: response.init_point,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: "No se pudo crear la preferencia",
      detail: error?.message || "Error desconocido",
    });
  }
}