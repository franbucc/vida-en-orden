export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    return res.status(200).json({
      MP_ACCESS_TOKEN: Boolean(process.env.MP_ACCESS_TOKEN),
      APP_URL: process.env.APP_URL || null,

      SMTP_HOST: Boolean(process.env.SMTP_HOST),
      SMTP_PORT: process.env.SMTP_PORT || null,
      SMTP_USER: Boolean(process.env.SMTP_USER),
      SMTP_PASS: Boolean(process.env.SMTP_PASS),
      SMTP_FROM: process.env.SMTP_FROM || null,

      SUPABASE_URL: Boolean(process.env.SUPABASE_URL),
      SUPABASE_SERVICE_ROLE_KEY: Boolean(
        process.env.SUPABASE_SERVICE_ROLE_KEY
      ),

      NODE_ENV: process.env.NODE_ENV || null,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: "Error leyendo variables",
      detail: error?.message || "Error desconocido",
    });
  }
}