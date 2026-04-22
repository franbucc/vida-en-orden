import { createClient } from "@supabase/supabase-js";

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

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

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
  } catch (error: any) {
    return res.status(500).json({
      error: "Fallo interno en track-visit",
      detail: error?.message || "Error desconocido",
    });
  }
}