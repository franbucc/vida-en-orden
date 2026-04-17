import { onRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";
import { MercadoPagoConfig, Preference } from "mercadopago";
import cors from "cors";

setGlobalOptions({ region: "southamerica-east1" });

const corsHandler = cors({ origin: true });

const client = new MercadoPagoConfig({
  accessToken: "APP_USR-4209594474345246-041713-d904c1e487f0f2fd061b064ed1e1c686-3344001648",
});

export const createPreference = onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    try {
      const preference = new Preference(client);

      const response = await preference.create({
        body: {
          items: [
            {
              id: "vida-en-orden",
              title: "Vida en Orden - Plantilla Digital",
              description: "Plantilla digital de finanzas personales",
              quantity: 1,
              currency_id: "ARS",
              unit_price: 18900,
            },
          ],
          back_urls: {
            success: "https://vidaenorden.com.ar/gracias",
            failure: "https://vidaenorden.com.ar/error",
            pending: "https://vidaenorden.com.ar/pendiente",
          },
          auto_return: "approved",
        },
      });

      res.status(200).json({
        init_point: response.init_point,
        id: response.id,
      });
    } catch (error) {
      console.error("Error creando preferencia:", error);
      res.status(500).json({
        error: "No se pudo crear el checkout",
      });
    }
  });
});