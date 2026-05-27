import nodemailer from "nodemailer";

const PRODUCT_LINKS = {
  "vida-en-orden": {
    subject: "Tu plantilla Vida en Orden",
    title: "Vida en Orden",
    downloadUrl: "https://drive.google.com/drive/folders/1hCAmhvjca-YHOEV1ISkutSQu_VjxGsV5?usp=sharing",
  },

  "ebook-calma": {
    subject: "Tu Ebook Calma Interior",
    title: "Ebook Calma Interior",
    downloadUrl: "https://drive.google.com/drive/folders/1gB8KLjIK03rqvFpFBMmXJ616--0X6M2K?usp=sharing",
  },

  "ebook-amor-propio": {
    subject: "Tu Ebook + Bonus Amor Propio",
    title: "Ebook + Bonus Amor Propio",
    downloadUrl: "https://drive.google.com/drive/folders/1fMelokxwMGAkqMfqI1OtyKe4RP11HJ31?usp=sharing",
  },

  "ebook-abraza": {
    subject: "Tu Ebook + Bonus Abraza",
    title: "Mi Psicóloga Me Dijo – Programa Elegirme Primero",
    downloadUrl:
      "https://drive.google.com/drive/folders/1sVUdb6WVNFxGa_MbS-6cASHyftF5Yd94?usp=sharing",
  },
} as const;

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
      return res
        .status(400)
        .json({ error: "No se encontró email del comprador" });
    }

    const externalReference = payment.external_reference || "";
    const [productId = "vida-en-orden"] = externalReference.split("|");

    const product = PRODUCT_LINKS[productId as keyof typeof PRODUCT_LINKS];

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
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
      subject: product.subject,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 620px; margin: 0 auto;">
          <h2 style="font-size: 24px; margin-bottom: 16px;">
            Gracias por tu compra 🙌
          </h2>

          <p>
            Ya podés acceder a <strong>“${product.title}”</strong> junto con los <strong>4 libros digitales de regalo</strong>.
          </p>

          <p>
            Descargá todo desde este enlace:
          </p>

          <p style="margin: 28px 0;">
            <a 
              href="${product.downloadUrl}"
              target="_blank"
              style="
                background: #18bf74;
                color: #ffffff;
                padding: 14px 24px;
                border-radius: 12px;
                text-decoration: none;
                font-weight: bold;
                display: inline-block;
              "
            >
              Acceder a mi material
            </a>
          </p>

          <p>
            Si el botón no funciona, copiá y pegá este enlace en tu navegador:
          </p>

          <p>
            👉 
            <a 
              href="${product.downloadUrl}"
              target="_blank"
              style="color: #18bf74;"
            >
              ${product.downloadUrl}
            </a>
          </p>

          <p>
            El acceso es inmediato y podés guardarlo en tu celular, tablet o computadora.
          </p>

          <p>
            Si tenés cualquier inconveniente con la descarga, respondé este mail y te ayudamos.
          </p>

          <p>
            También te dejamos a disposición nuestro WhatsApp directo:
            <br />
            <a 
              href="https://wa.me/541124716725"
              target="_blank"
              style="color: #18bf74; font-weight: bold;"
            >
              11 2471-6725
            </a>
          </p>

          <p style="margin-top: 28px;">
            Gracias.
          </p>

          <p>
            Atte,<br />
            <strong>El equipo de Vida En Orden ❤️❤️</strong>
          </p>
        </div>
      `,
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