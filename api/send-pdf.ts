import fs from "node:fs";
import path from "node:path";
import nodemailer from "nodemailer";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { paymentId, email } = req.body || {};
    const accessToken = process.env.MP_ACCESS_TOKEN;

    if (!paymentId || !email) {
      return res.status(400).json({ error: "Faltan datos" });
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

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const filePath = path.join(process.cwd(), "files", "vida-en-orden.pdf");
    const fileBuffer = fs.readFileSync(filePath);

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Tu plantilla Vida en Orden",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>¡Gracias por tu compra!</h2>
          <p>Te adjuntamos tu plantilla digital <strong>Vida en Orden</strong>.</p>
          <p>También podés descargarla desde la página de gracias mientras tu sesión siga abierta.</p>
        </div>
      `,
      attachments: [
        {
          filename: "vida-en-orden.pdf",
          content: fileBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    return res.status(200).json({
      ok: true,
      message: "PDF enviado correctamente",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: "No se pudo enviar el PDF",
      detail: error?.message,
    });
  }
}