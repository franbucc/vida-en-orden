import { MercadoPagoConfig, Preference } from "mercadopago";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const accessToken = process.env.MP_ACCESS_TOKEN;

    if (!accessToken) {
      return res.status(500).json({ error: "Falta MP_ACCESS_TOKEN" });
    }

    const client = new MercadoPagoConfig({
      accessToken,
    });

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            id: "vida-en-orden-pdf",
            title: "Vida en Orden - Plantilla Digital",
            description: "Plantilla digital de finanzas personales",
            quantity: 1,
            currency_id: "ARS",
            unit_price: 18900,
          },
        ],
        back_urls: {
          success: `${process.env.APP_URL}/gracias`,
          failure: `${process.env.APP_URL}/gracias`,
          pending: `${process.env.APP_URL}/gracias`,
        },
        auto_return: "approved",
        external_reference: `vida-en-orden-${Date.now()}`,
      },
    });

    return res.status(200).json({
      id: response.id,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point,
    });
  } catch (error: any) {
    console.error("Error creando preferencia:", error);
    return res.status(500).json({
      error: "No se pudo crear la preferencia",
      detail: error?.message || "Error desconocido",
    });
  }
}