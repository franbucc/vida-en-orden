import { supabase } from "./lib/supabase";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido",
    });
  }

  try {
    const {
      payment_id,
      product_id,
      product_title,
      amount,
      currency,
      status,
      source,
      external_reference,
    } = req.body || {};

    if (!payment_id) {
      return res.status(400).json({
        error: "Falta payment_id",
      });
    }

    const { error } = await supabase.from("sales").upsert(
      {
        payment_id,
        product_id,
        product_title,
        amount,
        currency,
        status,
        source,
        external_reference,
      },
      {
        onConflict: "payment_id",
      }
    );

    if (error) {
      return res.status(500).json({
        error: error.message,
      });
    }

    return res.status(200).json({
      ok: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error?.message || "No se pudo registrar la venta",
    });
  }
}