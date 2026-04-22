import fs from "node:fs";
import path from "node:path";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const paymentId = req.query.payment_id;
    const fileType = req.query.file || "main";
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

    const externalReference = payment.external_reference || "";
    const [productId = "vida-en-orden"] = externalReference.split("|");

    let fileName = "";

    if (productId === "vida-en-orden") {
      fileName = "vida-en-orden.pdf";
    }

    if (productId === "ebook-calma") {
      fileName =
        fileType === "bonus"
          ? "bonus-pensar.zip"
          : "como-dejar-de-pensar.pdf";
    }

    if (!fileName) {
      return res.status(404).json({ error: "Archivo no encontrado" });
    }

    const filePath = path.join(process.cwd(), "files", fileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "No existe el archivo" });
    }

    const fileBuffer = fs.readFileSync(filePath);

    const isZip = fileName.endsWith(".zip");

    res.setHeader(
      "Content-Type",
      isZip ? "application/zip" : "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileName}"`
    );

    return res.status(200).send(fileBuffer);
  } catch (error: any) {
    return res.status(500).json({
      error: "Error descargando archivo",
      detail: error?.message,
    });
  }
}