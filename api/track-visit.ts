import { getSupabase } from "./lib/supabase";

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