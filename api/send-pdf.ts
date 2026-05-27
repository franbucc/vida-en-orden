import fs from "node:fs";
import path from "node:path";
import nodemailer from "nodemailer";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { paymentId } = req.body || {};
    const accessToken = process.env.MP_ACCESS_TOKEN;

    if (!paymentId) {
      return res.status(400).json({ error: "Falta paymentId" });
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

    const email = payment.payer?.email;

    if (!email) {
      return res.status(400).json({ error: "No se encontró email del comprador" });
    }

    const externalReference = payment.external_reference || "";
    const [productId = "vida-en-orden"] = externalReference.split("|");

    let subject = "";
    let title = "";
    const attachments: any[] = [];

    if (productId === "vida-en-orden") {
      subject = "Tu plantilla Vida en Orden";
      title = "Vida en Orden";

      attachments.push({
        filename: "vida-en-orden.pdf",
        path: path.join(process.cwd(), "files", "vida-en-orden.pdf"),
        contentType: "application/pdf",
      });
    }

    if (productId === "ebook-calma") {
      subject = "Tu Ebook Calma Interior";
      title = "Ebook Calma Interior";

      attachments.push({
        filename: "como-dejar-de-pensar.pdf",
        path: path.join(process.cwd(), "files", "como-dejar-de-pensar.pdf"),
        contentType: "application/pdf",
      });

      attachments.push({
        filename: "bonus-pensar.zip",
        path: path.join(process.cwd(), "files", "bonus-pensar.zip"),
        contentType: "application/zip",
      });
    }

    if (productId === "ebook-amor-propio") {
  subject = "Tu Ebook + Bonus Amor Propio";
  title = "Ebook + Bonus Amor Propio";

  attachments.push({
    filename: "ebookybonus-amor-propio.zip",
    path: path.join(process.cwd(), "files", "ebookybonus-amor-propio.zip"),
    contentType: "application/zip",
  });
}

    if (productId === "ebook-abraza") {
  subject = "Tu Ebook + Bonus Abraza";
  title = "Ebook + Bonus Abraza";

  attachments.push({
    filename: "ebookybonus-abraza.zip",
    path: path.join(process.cwd(), "files", "ebookybonus-abraza.zip"),
    contentType: "application/zip",
  });
}

    if (!subject || attachments.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    for (const file of attachments) {
      if (!fs.existsSync(file.path)) {
        return res.status(404).json({
          error: `No existe el archivo: ${file.filename}`,
        });
      }
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>¡Gracias por tu compra!</h2>
          <p>Te enviamos adjunto tu producto digital: <strong>${title}</strong>.</p>
          <p>También podés descargarlo desde la página de gracias.</p>
          <p>Ante cualquier inconveniente, respondé este email o escribinos por WhatsApp.</p>
        </div>
      `,
      attachments,
    });

    return res.status(200).json({
      ok: true,
      message: "Email enviado correctamente",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: "No se pudo enviar el email",
      detail: error?.message,
    });
  }
}