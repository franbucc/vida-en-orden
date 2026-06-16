import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json({ limit: "1mb" }));

const PRODUCTS = {
  "vida-en-orden": {
    id: "vida-en-orden",
    title: "Vida en Orden - Plantilla Digital",
    description: "Plantilla digital de finanzas personales",
    price: 18900,
    currency: "ARS",
  },

  "ebook-calma": {
    id: "ebook-calma",
    title: "Ebook Calma Interior",
    description: "Guía práctica para bajar el estrés y ordenar tu mente",
    price: 14900,
    currency: "ARS",
  },

  "ebook-amor-propio": {
    id: "ebook-amor-propio",
    title: "Ebook Amor Propio",
    description: "Un recorrido para fortalecer tu autoestima y bienestar",
    price: 14900,
    currency: "ARS",
  },

  "ebook-abraza": {
    id: "ebook-abraza",
    title: "Ebook Abraza a tu Niña Interior",
    description: "Ebook + bonus para sanar y reconectar con tu niña interior",
    price: 14900,
    currency: "ARS",
  },
};

const PRODUCT_LINKS = {
  "vida-en-orden": {
    subject: "Tu plantilla Vida en Orden",
    title: "Vida en Orden",
    downloadUrl:
      "https://drive.google.com/drive/folders/1hCAmhvjca-YHOEV1ISkutSQu_VjxGsV5?usp=sharing",
    spreadsheetCopyUrl:
      "https://docs.google.com/spreadsheets/d/19mTpWwRSDrqUrj7Bhl4GcaRdVhjc2UW2yDSEVOcrbKM/copy",
  },

  "ebook-calma": {
    subject: "Tu Ebook Calma Interior",
    title: "Ebook Calma Interior",
    downloadUrl:
      "https://drive.google.com/drive/folders/1gB8KLjIK03rqvFpFBMmXJ616--0X6M2K?usp=sharing",
  },

  "ebook-amor-propio": {
    subject: "Tu Ebook + Bonus Amor Propio",
    title: "Ebook + Bonus Amor Propio",
    downloadUrl:
      "https://drive.google.com/drive/folders/1fMelokxwMGAkqMfqI1OtyKe4RP11HJ31?usp=sharing",
  },

  "ebook-abraza": {
    subject: "Tu Ebook + Bonus Abraza",
    title: "Mi Psicóloga Me Dijo – Programa Elegirme Primero",
    downloadUrl:
      "https://drive.google.com/drive/folders/1sVUdb6WVNFxGa_MbS-6cASHyftF5Yd94?usp=sharing",
  },
};

function getSupabase() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("Falta SUPABASE_URL");
  }

  if (!supabaseServiceRoleKey) {
    throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey);
}

function getEmailHtml(productId, product) {
  if (productId === "vida-en-orden") {
    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 620px; margin: 0 auto;">
        <h2 style="font-size: 24px; margin-bottom: 16px;">
          Tu plantilla ya está disponible para descargar.
        </h2>

        <p style="font-weight: bold; text-transform: uppercase; letter-spacing: 0.04em;">
          Accedé desde aquí:
        </p>

        <div style="background: #f6f7f9; border: 1px solid #e5e7eb; border-radius: 14px; padding: 18px; margin: 24px 0;">
          <p style="margin: 0 0 8px;">
            <strong>Plantilla de finanzas personales</strong>
          </p>

          <p style="margin: 0 0 18px; color: #4b5563;">
            PLANTILLA PRO FINAL.pdf
          </p>

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
            Descargar plantilla
          </a>
        </div>

        <p>
          En ese archivo encontrarás un PDF con el instructivo paso a paso de cómo utilizar la plantilla.
          Recordá que para acceder a ella, en la primera página debés clickear el botón que dice
          <strong> OBTENER PLANTILLA</strong>.
        </p>

        <p>
          En caso de que no lo puedas hacer, te dejo el link directo:
        </p>

        <p>
          👉
          <a 
            href="${product.spreadsheetCopyUrl}"
            target="_blank"
            style="color: #18bf74; font-weight: bold;"
          >
            Crear mi copia de la plantilla
          </a>
        </p>

        <p style="background: #fff7ed; border: 1px solid #fed7aa; border-radius: 12px; padding: 14px;">
          <strong>ES MUY IMPORTANTE:</strong>
          una vez que le des click a <strong>crear copia</strong>, guardes ese link único.
          Ese enlace lo tendrás solo vos y guardará las configuraciones que vayas haciendo.
        </p>

        <p>
          <strong>IMPORTANTE:</strong><br />
          Si tenés algún problema con la descarga, respondé a este correo y te ayudamos.
        </p>

        <p>
          También te adjuntamos nuestro número de WhatsApp:
          <br />
          <a 
            href="https://wa.me/541124716725"
            target="_blank"
            style="color: #18bf74; font-weight: bold;"
          >
            11 2471-6725
          </a>
        </p>

        <p>
          <strong>Recomendación:</strong><br />
          Guardá el archivo en un lugar seguro para poder usarlo cuando lo necesites.
        </p>

        <p style="margin-top: 28px;">
          Gracias por confiar en nosotros.
        </p>

        <p>
          — <strong>Equipo Vida en Orden</strong>
        </p>
      </div>
    `;
  }

  return `
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
  `;
}

/* ============================
   MERCADO PAGO
============================ */

app.post("/api/create-preference", async (req, res) => {
  try {
    const accessToken = process.env.MP_ACCESS_TOKEN;

    if (!accessToken) {
      return res.status(500).json({ error: "Falta MP_ACCESS_TOKEN" });
    }

    const { productId, source } = req.body || {};
    const product = PRODUCTS[productId];

    if (!product) {
      return res.status(400).json({ error: "Producto inválido" });
    }

    const appUrl = process.env.APP_URL || "https://www.vidaenorden.com.ar";

    const mpResponse = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
            success: `${appUrl}/gracias`,
            failure: `${appUrl}/gracias`,
            pending: `${appUrl}/gracias`,
          },
          auto_return: "approved",
          external_reference: `${product.id}|${source || "web"}|${Date.now()}`,
        }),
      }
    );

    const data = await mpResponse.json();

    if (!mpResponse.ok) {
      return res.status(500).json({
        error: "No se pudo crear la preferencia",
        detail: data,
      });
    }

    return res.status(200).json({
      id: data.id,
      init_point: data.init_point,
    });
  } catch (error) {
    return res.status(500).json({
      error: "No se pudo crear la preferencia",
      detail: error?.message || "Error desconocido",
    });
  }
});

app.get("/api/verify-payment", async (req, res) => {
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

    const payment = await mpResponse.json();

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
      email: payment.payer?.email || null,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error verificando el pago",
      detail: error?.message || "Error desconocido",
    });
  }
});

/* ============================
   EMAIL DE ENTREGA
============================ */

app.post("/api/send-pdf", async (req, res) => {
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

    const payment = await mpResponse.json();

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

    const product = PRODUCT_LINKS[productId];

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
      html: getEmailHtml(productId, product),
    });

    return res.status(200).json({
      ok: true,
      message: "Email enviado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      error: "No se pudo enviar el email",
      detail: error?.message || "Error desconocido",
    });
  }
});

/* ============================
   SUPABASE / ADMIN
============================ */

app.post("/api/record-sale", async (req, res) => {
  try {
    const supabase = getSupabase();

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
  } catch (error) {
    return res.status(500).json({
      error: error?.message || "No se pudo registrar la venta",
    });
  }
});

app.get("/api/admin-sales", async (req, res) => {
  try {
    const supabase = getSupabase();

    const result = await supabase
      .from("sales")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (result.error) {
      return res.status(500).json({
        error: "Error leyendo sales",
        detail: result.error.message,
      });
    }

    return res.status(200).json({
      sales: result.data || [],
    });
  } catch (error) {
    return res.status(500).json({
      error: "Fallo interno en admin-sales",
      detail: error?.message || "Error desconocido",
    });
  }
});

app.get("/api/admin-stats", async (req, res) => {
  try {
    const supabase = getSupabase();

    const visitsResult = await supabase
      .from("visits")
      .select("*", { count: "exact", head: true });

    if (visitsResult.error) {
      return res.status(500).json({
        error: "Error leyendo visits",
        detail: visitsResult.error.message,
      });
    }

    const salesResult = await supabase
      .from("sales")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (salesResult.error) {
      return res.status(500).json({
        error: "Error leyendo sales",
        detail: salesResult.error.message,
      });
    }

    const visitsCount = visitsResult.count || 0;
    const sales = salesResult.data ?? [];
    const approvedSales = sales.length;

    const revenue = sales.reduce((acc, sale) => {
      return acc + Number(sale.amount || 0);
    }, 0);

    const conversionRate =
      visitsCount > 0
        ? Number(((approvedSales / visitsCount) * 100).toFixed(2))
        : 0;

    return res.status(200).json({
      visits: visitsCount,
      sales: approvedSales,
      revenue,
      conversionRate,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Fallo interno en admin-stats",
      detail: error?.message || "Error desconocido",
    });
  }
});

app.post("/api/track-visit", async (req, res) => {
  try {
    const supabase = getSupabase();
    const { path, referrer, sessionId } = req.body || {};
    const userAgent = req.headers["user-agent"] || null;

    const result = await supabase.from("visits").insert({
      path: path || "/",
      referrer: referrer || null,
      user_agent: userAgent,
      session_id: sessionId || null,
    });

    if (result.error) {
      return res.status(500).json({
        error: "Error insertando visita",
        detail: result.error.message,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({
      error: "Fallo interno en track-visit",
      detail: error?.message || "Error desconocido",
    });
  }
});

/* ============================
   DEBUG
============================ */

app.get("/api/debug-env", (_req, res) => {
  return res.status(200).json({
    MP_ACCESS_TOKEN: Boolean(process.env.MP_ACCESS_TOKEN),
    APP_URL: process.env.APP_URL || null,
    SMTP_HOST: Boolean(process.env.SMTP_HOST),
    SMTP_PORT: process.env.SMTP_PORT || null,
    SMTP_USER: Boolean(process.env.SMTP_USER),
    SMTP_PASS: Boolean(process.env.SMTP_PASS),
    SMTP_FROM: process.env.SMTP_FROM || null,
    SUPABASE_URL: Boolean(process.env.SUPABASE_URL),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    NODE_ENV: process.env.NODE_ENV || null,
  });
});

/* ============================
   FRONTEND VITE
============================ */

app.use(express.static(path.join(__dirname, "dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Vida en Orden corriendo en puerto ${PORT}`);
});