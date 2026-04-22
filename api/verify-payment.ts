export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const paymentId = req.query.payment_id;
    const accessToken = process.env.MP_ACCESS_TOKEN;

    if (!paymentId) {
      return res.status(400).json({ error: "Falta payment_id" });
    }

    if (!accessToken) {
      return res.status(500).json({ error: "Falta MP_ACCESS_TOKEN" });
    }

    const mpResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const payment: any = await mpResponse.json();

    if (!mpResponse.ok) {
      return res.status(400).json({
        error: "No se pudo consultar el pago",
        detail: payment,
      });
    }

    const externalReference = payment.external_reference || "";
    const [productId = "", source = ""] = externalReference.split("|");

    return res.status(200).json({
      approved: payment.status === "approved",
      status: payment.status,
      status_detail: payment.status_detail,
      payment_id: payment.id,
      value: payment.transaction_amount || 0,
      currency: payment.currency_id || "ARS",
      product_id: productId || "vida-en-orden",
      product_title:
        payment.additional_info?.items?.[0]?.title ||
        "Vida en Orden - Plantilla Digital",
      source,
      external_reference: externalReference,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: "Error verificando el pago",
      detail: error?.message,
    });
  }
}