import fs from "node:fs";
import path from "node:path";

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

    if (!mpResponse.ok || payment.status !== "approved") {
      return res.status(403).json({ error: "Pago no aprobado" });
    }

    const filePath = path.join(process.cwd(), "files", "vida-en-orden.pdf");
    const fileBuffer = fs.readFileSync(filePath);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="vida-en-orden.pdf"'
    );

    return res.status(200).send(fileBuffer);
  } catch (error: any) {
    return res.status(500).json({
      error: "No se pudo descargar el PDF",
      detail: error?.message,
    });
  }
}